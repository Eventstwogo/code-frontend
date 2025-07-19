'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) {
    toast.error('Please enter your email.');
    return;
  }

  console.log('hello');
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append('email', email);

    await axiosInstance.post('/api/v1/users/forgot-password', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success('Email sent successfully! Check your inbox.');
    setEmail('');
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || 'Failed to send reset email.'
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 ">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive password reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </div>
  )
}


// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
 
// export default function forget({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Forgot Password</CardTitle>
//           <CardDescription>
//             Enter your email address and we’ll send you a link to reset your password.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full">
//                 Send Reset Link
//               </Button>
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Remember your password?{" "}
//               <a href="#" className="underline underline-offset-4">
//                 Back to login
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
 
 