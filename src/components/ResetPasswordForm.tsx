// 'use client';

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // Optional: Uncomment if using Next.js routing
// // import Link from "next/link";

// export function ResetPasswordForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Please enter your email.");
//       return;
//     }

//     // TODO: Call your API endpoint here
//     console.log("Reset link sent to:", email);
//     alert("Password reset link sent!");
//     setEmail("");
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden w-full max-w-md mx-auto">
//         <CardContent className="p-6 md:p-8">
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="text-center space-y-2">
//                 <h1 className="text-2xl font-bold">Reset your password</h1>
//                 <p className="text-muted-foreground">
//                   Enter your current password and new password  to reset your password.
//                 </p>
//               </div>

//               <div className="grid gap-3">
//                 <Label htmlFor="email">Current password</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="*************"
//                   required
//                 />
//               </div>
//                <div className="grid gap-3">
//                 <Label htmlFor="email">New password</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="*************"
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full bg-purple-600 hover:bg-yellow-500 transition-colors">
//                 Update password
//               </Button>

//               <div className="text-center text-sm">
//                 Remember your password?{" "}
//                 {/* Uncomment this line if using Next.js routing */}
//                 {/* <Link href="/login" className="underline underline-offset-4">Back to login</Link> */}
//                 <a href="#" className="underline underline-offset-4 hover:text-purple-600">
//                   Back to login
//                 </a>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="text-center text-xs text-muted-foreground">
//         By continuing, you agree to our{" "}
//         <a href="#" className="underline hover:text-primary">Terms of Service</a>{" "}
//         and{" "}
//         <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
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

// ✅ Define Zod schema for email and password
const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

type ResetPasswordFormData = z.infer<typeof schema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Password reset data:", data);
    alert("Password reset email sent!");
    reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden w-full max-w-md mx-auto">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email and new password to reset it.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="********"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-yellow-500 transition-colors"
              >
                Update password
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <a href="#" className="underline underline-offset-4 hover:text-purple-600">
                  Back to login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-primary">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
