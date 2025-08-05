// 'use client';

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";

// // ✅ Define strong Zod schema
// const signupSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Full Name must be at least 3 characters")
//     .max(50, "Full Name must be at most 50 characters")
//     .regex(/^[a-zA-Z\s]+$/, "Full Name can only contain letters and spaces"),
//   email: z
//     .string()
//     .email("Invalid email address"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/\d/, "Password must contain at least one number")
//     .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
// });

// type SignupFormData = z.infer<typeof signupSchema>;

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = (data: SignupFormData) => {
//     console.log("Signup Data:", data);
//     reset()
    
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden p-0 w-full max-w-md">
//         <CardContent className="p-6 md:p-8">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-4">
//               <div className="flex flex-col items-center text-center mb-2">
//                 <h1 className="text-2xl font-bold">Create your account</h1>
//                 <p className="text-muted-foreground text-sm">
//                   Sign up to access exclusive features
//                 </p>
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   {...register("name")}
//                   placeholder="Jane Doe"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm">{errors.name.message}</p>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   {...register("email")}
//                   placeholder="jane@example.com"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   {...register("password")}
//                   placeholder="••••••••"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">{errors.password.message}</p>
//                 )}
//               </div>

//               <Button type="submit" className="w-full bg-purple-500 hover:bg-yellow-500">
//                 Create Account
//               </Button>

//               <div className="text-center text-sm">
//                 Already have an account?{" "}
//                 <Link href="/login" className="underline underline-offset-4">
//                   Log in
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="text-muted-foreground text-center text-xs">
//         By continuing, you agree to our{" "}
//         <a href="#" className="underline">Terms of Service</a> and{" "}
//         <a href="#" className="underline">Privacy Policy</a>.
//       </div>
//     </div>
//   );
// }


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
import { useState } from "react";
const signupSchema = z.object({
  first_name: z.string()
    .min(2, "First Name must be at least 2 characters")
    .max(30, "First Name must be at most 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "First Name can only contain letters and spaces"),
  last_name: z.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(30, "Last Name must be at most 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last Name can only contain letters and spaces"),

  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;
const extractUsername = (email: string): string => {
  return email.split('@')[0]
    .replace(/[.\-_]/g, ' '); // Replace dots, hyphens, and underscores with spaces
};
export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [passwordValue, setPasswordValue] = useState("");
  const passwordChecks = [
  { label: "At least 8 characters", test: /.{8,}/.test(passwordValue) },
  { label: "At least one lowercase letter", test: /[a-z]/.test(passwordValue) },
  { label: "At least one uppercase letter", test: /[A-Z]/.test(passwordValue) },
  { label: "At least one number", test: /\d/.test(passwordValue) },
  { label: "At least one special character", test: /[^a-zA-Z0-9]/.test(passwordValue) },
];
const router=useRouter()
  const onSubmit = async (data: SignupFormData) => {
     const username = extractUsername(data.email);
    const payload = {
      username,
      email:data.email,
      password:data.password,
      first_name:data.first_name,
      last_name:data.last_name,
    }
    try {
      const res = await axiosInstance.post("/api/v1/users/register", payload);
      toast.success(res.data.message);
      router.push('/login')
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

              {/* First Name */}
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" {...register("first_name")} placeholder="Jane" />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" {...register("last_name")} placeholder="Doe" />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                )}
              </div>

              {/* Username */}
            

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

{/* Password */}
<div className="grid gap-2">
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    type="password"
    {...register("password")}
    value={passwordValue}
    onChange={(e) => {
      setPasswordValue(e.target.value);
      register("password").onChange(e);
    }}
    placeholder="••••••••"
  />
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


              <Button type="submit" className="w-full bg-purple-500 hover:bg-yellow-500">
                Create Account
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
