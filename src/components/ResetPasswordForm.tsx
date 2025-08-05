

// 'use client';

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // ✅ Define Zod schema for email and password
// const schema = z.object({
//   email: z
//     .string()
//     .email("Please enter a valid email address"),
//   newPassword: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[a-z]/, "Must contain at least one lowercase letter")
//     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//     .regex(/\d/, "Must contain at least one number")
//     .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
// });

// type ResetPasswordFormData = z.infer<typeof schema>;

// export function ResetPasswordForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = (data: ResetPasswordFormData) => {
//     console.log("Password reset data:", data);
//     alert("Password reset email sent!");
//     reset();
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden w-full max-w-md mx-auto">
//         <CardContent className="p-6 md:p-8">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-5">
//               <div className="text-center space-y-2">
//                 <h1 className="text-2xl font-bold">Reset your password</h1>
//                 <p className="text-muted-foreground text-sm">
//                   Enter your email and new password to reset it.
//                 </p>
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="jane@example.com"
//                   {...register("email")}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="newPassword">New password</Label>
//                 <Input
//                   id="newPassword"
//                   type="password"
//                   placeholder="********"
//                   {...register("newPassword")}
//                 />
//                 {errors.newPassword && (
//                   <p className="text-red-500 text-sm">
//                     {errors.newPassword.message}
//                   </p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-purple-600 hover:bg-yellow-500 transition-colors"
//               >
//                 Update password
//               </Button>

//               <div className="text-center text-sm">
//                 Remember your password?{" "}
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
import { toast } from "sonner";
import useStore from "@/lib/Zustand";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const schema = z.object({
 
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

type ResetPasswordFormData = z.infer<typeof schema>;

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });
const {userId}=useStore()
const router=useRouter()
const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!userId) {
      toast.error("User ID missing in query parameters.");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("current_password", data.currentPassword);
      formData.append("new_password", data.newPassword);

      await axiosInstance.post(`/api/v1/users/change-password?user_id=${userId}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Password updated successfully.");
      router.push('/login')
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to update password.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden w-full max-w-md mx-auto">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Change Your Password</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your current and new password.
                </p>
              </div>

            

            <div className="grid gap-2">
  <Label htmlFor="currentPassword">Current Password</Label>
  <div className="relative">
    <Input
      id="currentPassword"
      type={showCurrent ? "text" : "password"}
      placeholder="********"
      {...register("currentPassword")}
      className="pr-10"
    />
    <button
      type="button"
      onClick={() => setShowCurrent(!showCurrent)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      tabIndex={-1}
    >
      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
  {errors.currentPassword && (
    <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
  )}
</div>


         <div className="grid gap-2">
  <Label htmlFor="newPassword">New Password</Label>
  <div className="relative">
    <Input
      id="newPassword"
      type={showNew ? "text" : "password"}
      placeholder="********"
      {...register("newPassword")}
      className="pr-10"
    />
    <button
      type="button"
      onClick={() => setShowNew(!showNew)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      tabIndex={-1}
    >
      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
  {errors.newPassword && (
    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
  )}
</div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-yellow-500 transition-colors"
              >
                Update Password
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-purple-600">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-primary">Terms of Service</a> and{" "}
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
