'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be at most 32 characters")
    .refine((username) => {
      // Reserved usernames (matching backend)
      const RESERVED_USERNAMES = ["admin", "root", "support", "null", "api"];
      const trimmedUsername = username.trim().toLowerCase();
      
      if (RESERVED_USERNAMES.includes(trimmedUsername)) {
        return false;
      }
      
      // Must start with a letter
      if (!/^[a-zA-Z]/.test(username)) {
        return false;
      }
      
      // No consecutive special characters like __, .., --
      if (/[_.-]{2}/.test(username)) {
        return false;
      }
      
      // Cannot end with special character
      if (/[_.-]$/.test(username)) {
        return false;
      }
      
      // Contains only letters, numbers, dots, underscores, and hyphens
      // Updated regex to match backend: ^(?!.*[_.-]{2})(?!.*[_.-]$)[a-zA-Z][a-zA-Z0-9_.-]{2,31}$
      if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(username)) {
        return false;
      }
      
      return true;
    }, {
      message: "Username must start with a letter, contain only letters, numbers, dots, underscores, and hyphens, no consecutive special characters, and cannot end with special characters. Reserved usernames are not allowed."
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;
const extractUsername = (email: string): string => {
  let username = email.split('@')[0].split('+')[0];
  
  // Remove or replace invalid characters, keeping only letters, numbers, dots, underscores, hyphens
  username = username.replace(/[^a-zA-Z0-9._-]/g, '');
  
  // Ensure it starts with a letter
  if (!/^[a-zA-Z]/.test(username)) {
    username = 'user' + username;
  }
  
  // Remove consecutive special characters
  username = username.replace(/[_.-]{2,}/g, '_');
  
  // Remove trailing special characters
  username = username.replace(/[_.-]+$/, '');
  
  // Ensure minimum length
  if (username.length < 3) {
    username = username + '123';
  }
  
  // Ensure maximum length
  if (username.length > 32) {
    username = username.substring(0, 32);
    // Make sure it doesn't end with special character after truncation
    username = username.replace(/[_.-]+$/, '');
  }
  
  // Final validation - if still invalid, create a simple fallback
  if (username.length < 3 || !/^[a-zA-Z]/.test(username)) {
    username = 'user123';
  }
  
  return username;
};

const generateUsernameSuggestions = (baseUsername: string): string[] => {
  const suggestions = [];
  const randomNumbers = Math.floor(Math.random() * 999) + 1;
  
  suggestions.push(`${baseUsername}${randomNumbers}`);
  suggestions.push(`${baseUsername}_${randomNumbers}`);
  suggestions.push(`${baseUsername}.${randomNumbers}`);
  suggestions.push(`${baseUsername}-${randomNumbers}`);
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
};

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  
  const emailValue = watch("email");
  const usernameValue = watch("username");

  const passwordChecks = [
  { label: "At least 8 characters", test: /.{8,}/.test(passwordValue) },
  { label: "At least one lowercase letter", test: /[a-z]/.test(passwordValue) },
  { label: "At least one uppercase letter", test: /[A-Z]/.test(passwordValue) },
  { label: "At least one number", test: /\d/.test(passwordValue) },
  { label: "At least one special character", test: /[^a-zA-Z0-9]/.test(passwordValue) },
];
const router = useRouter();

  // Auto-fill username when email changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && email.includes('@')) {
      const suggestedUsername = extractUsername(email);
      setValue("username", suggestedUsername);
      setUsernameAvailable(null); // Reset availability status
      setUsernameSuggestions([]); // Reset suggestions
    }
    register("email").onChange(e);
  };

  // Check username availability
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      setUsernameSuggestions([]);
      return;
    }

    setCheckingUsername(true);
    try {
      const response = await axiosInstance.post("/api/v1/users/check-username", {
        username: username
      });
      const isAvailable = response.data.data.available;
      setUsernameAvailable(isAvailable);
      
      // Generate suggestions if username is not available
      if (!isAvailable) {
        const suggestions = generateUsernameSuggestions(username);
        setUsernameSuggestions(suggestions);
      } else {
        setUsernameSuggestions([]);
      }
    } catch (err: any) {
      setUsernameAvailable(false);
      console.error("Username check failed:", err);
      // Generate suggestions on error as well
      const suggestions = generateUsernameSuggestions(username);
      setUsernameSuggestions(suggestions);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Handle username change with debounced availability check
  useEffect(() => {
    if (usernameValue && usernameValue.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(usernameValue);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameAvailable(null);
    }
  }, [usernameValue]);

  const onSubmit = async (data: SignupFormData) => {
    // Check if username is available before submitting
    if (usernameAvailable === false) {
      toast.error("Please choose a different username as this one is not available");
      return;
    }
    
    // If we haven't checked username availability yet, check it now
    if (usernameAvailable === null) {
      toast.error("Please wait while we check username availability");
      await checkUsernameAvailability(data.username);
      return;
    }
    
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    
    try {
      const res = await axiosInstance.post("/api/v1/users/register", payload);
      toast.success(res.data.message);
      router.push('/login');
      reset();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full max-w-md">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center mb-2">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm">
                  Sign up to access exclusive features
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  onChange={handleEmailChange}
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
                {checkingUsername && (
                  <p className="text-blue-500 text-sm flex items-center gap-1">
                    <span className="animate-spin">⏳</span> Checking availability...
                  </p>
                )}
                {usernameAvailable === true && (
                  <p className="text-green-500 text-sm flex items-center gap-1">
                    ✓ Username is available
                  </p>
                )}
                {usernameAvailable === false && (
                  <div className="space-y-2">
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      ✗ Username is not available. Please try adding numbers or characters to make it unique.
                    </p>
                    {usernameSuggestions.length > 0 && (
                      <div className="text-sm">
                        <p className="text-gray-600 mb-1">Suggestions:</p>
                        <div className="flex flex-wrap gap-1">
                          {usernameSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setValue("username", suggestion);
                                setUsernameAvailable(null);
                                setUsernameSuggestions([]);
                              }}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

{/* Password */}
<div className="grid gap-2">
  <Label htmlFor="password">Password</Label>
  <div className="relative">
  <Input
    id="password"
    type={showPassword ? "text" : "password"}
    {...register("password")}
    value={passwordValue}
    onChange={(e) => {
      setPasswordValue(e.target.value);
      register("password").onChange(e);
    }}
    placeholder="••••••••"
    className="pr-10" // space for icon
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

  {/* {errors.password && (
    <p className="text-red-500 text-sm">{errors.password.message}</p>
  )} */}

{passwordValue && (
  <ul className="text-sm mt-1 space-y-1">
    {passwordChecks.map((rule, index) => (
      <li
        key={index}
        className={`flex items-center gap-2 ${
          rule.test ? "text-green-600" : "text-gray-500"
        }`}
      >
        {rule.test ? "✔" : "❌"} {rule.label}
      </li>
    ))}
  </ul>
)}
</div>


              <Button 
                type="submit" 
                className="w-full bg-purple-500 hover:bg-yellow-500"
                disabled={usernameAvailable === false || checkingUsername}
              >
                {checkingUsername ? "Checking username..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">Terms of Service</a> and{" "}
        <a href="#" className="underline">Privacy Policy</a>.
      </div>
    </div>
  );
}
