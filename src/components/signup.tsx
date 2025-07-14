// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden p-0 max-w-md">
//         <CardContent className="p-6 md:p-8">
//           <form>
//             <div className="flex flex-col gap-5">
//               <div className="flex flex-col items-center text-center">
//                 <h1 className="text-2xl font-bold">Create your account</h1>
//                 <p className="text-muted-foreground text-balance">
//                   Sign up to explore Acme Inc’s wonderfully powerful features
//                 </p>
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="Jane Doe"
//                   required
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="jane@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-purple-500 hover:bg-yellow-500"
//               >
//                 Create Account
//               </Button>

//               <div className="text-center text-sm">
//                 Already have an account?{" "}
//                 <a href="#" className="underline underline-offset-4">
//                   Log in
//                 </a>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
//         By continuing, you enthusiastically agree to our{" "}
//         <a href="#">Terms of Service</a> and{" "}
//         <a href="#">Privacy Policy</a>.
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

// ✅ Define strong Zod schema
const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name must be at most 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Data:", data);
    reset()
    
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

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

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

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
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
