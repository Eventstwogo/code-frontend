
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
// import { toast } from 'sonner';
// import axiosInstance from '@/lib/axiosInstance';
// import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import useStore from '@/lib/Zustand';
// // lib/validations/profileSchema.ts
// import { z } from "zod";

//  const profileSchema = z.object({
//   first_name: z.string().min(1, "First name is required").regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),
//   last_name: z.string().min(1, "Last name is required").regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),
//   username: z.string().min(1, "Username is required").regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),
//   email: z.string().email("Invalid email address"),
// });

// export type ProfileSchemaType = z.infer<typeof profileSchema>;

// const ProfileSettings = () => {
//   const { profile, fetchProfile } = useProfileStore();
//   const [newAvatar, setNewAvatar] = useState<string | null>(null);
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const router = useRouter();
//   const { logout } = useStore();


// const handleLogout = async () => {
//   try {
//     await axiosInstance.post('/api/v1/users/logout'); // backend logout
//     logout() // clear Zustand state
//     localStorage.removeItem('auth_token'); // clear local storage if used
//     toast.success('Logged out successfully!');
//     router.push('/'); // redirect to login
//   } catch (error: any) {
//     toast.error(error?.response?.data?.detail || 'Logout failed. Try again.');
//   }
// };

// const handleDeleteAccount = async () => {
//   try {
//     await axiosInstance.delete('/api/v1/users/profile/');
//     toast.success("Account deleted successfully!");

//     logout(); // Clear Zustand state
//     localStorage.removeItem('auth_token');
//     router.push('/'); // Redirect to homepage or login
//   } catch (error: any) {
//     toast.error(error?.response?.data?.detail || 'Account deletion failed.');
//   }
// };

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProfileSchemaType>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       first_name: '',
//       last_name: '',
//       username: '',
//       email: '',
//     },
//   });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     if (profile) {
//       setValue('first_name', profile?.first_name || '');
//       setValue('last_name', profile?.last_name || '');
//       setValue('username', profile?.username || '');
//       setValue('email', profile?.email || '');
//     }
//   }, [profile]);

//   const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setNewAvatar(URL.createObjectURL(file));
//     setAvatarFile(file);
//   };

//   const handleSaveAvatar = async () => {
//     if (!avatarFile) return toast.warning("No image selected.");

//     const formData = new FormData();
//     formData.append('profile_picture', avatarFile);

//     try {
//       await axiosInstance.patch('/api/v1/users/profile/picture', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       toast.success("Profile picture updated!");
//       setAvatarFile(null);
//       setNewAvatar(null);
//     } catch (error: any) {
//       toast.error(error?.response?.data?.detail || "Failed to update avatar.");
//     }
//   };

//   const onSubmit = async (data: ProfileSchemaType) => {
//     try {
//       await axiosInstance.put('/api/v1/users/profile/', data);
//       toast.success("Profile details updated!");
//       fetchProfile();
//     } catch (error: any) {
//       toast.error(error?.response?.data?.detail || "Profile update failed.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <Card className="shadow-md">
//         <CardContent className="p-8 space-y-6">
//           <h3 className="text-xl font-semibold">Profile Settings</h3>
//           <div className="space-y-4">
//             <div className="flex items-center gap-6">
//               {newAvatar ? (
//                 <Image src={newAvatar} alt="Preview" width={80} height={80} className="rounded-full border" />
//               ) : (
//                 <Image
//                   src={profile?.profile_picture || "/images/avatar-placeholder.png"}
//                   alt={profile?.username || ""}
//                   width={80}
//                   height={80}
//                   className="rounded-full border"
//                 />
//               )}
//               <Input type="file" accept="image/*" onChange={handleAvatarUpload} />
//             </div>

//             {newAvatar && (
//               <Button onClick={handleSaveAvatar} type="button" variant="secondary">
//                 Save Profile Picture
//               </Button>
//             )}

//            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   <div className="space-y-1.5">
//     <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
//       First Name
//     </label>
//     <Input id="first_name" placeholder="First Name" {...register("first_name")} />
//     {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
//   </div>
//   <div className="space-y-1.5">
//     <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
//       Last Name
//     </label>
//     <Input id="last_name" placeholder="Last Name" {...register("last_name")} />
//     {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
//   </div>
//   <div className="space-y-1.5">
//     <label htmlFor="username" className="text-sm font-medium text-gray-700">
//       Username
//     </label>
//     <Input id="username" placeholder="Username" {...register("username")} />
//     {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
//   </div>
//   <div className="space-y-1.5">
//     <label htmlFor="email" className="text-sm font-medium text-gray-700">
//       Email
//     </label>
//     <Input id="email" placeholder="Email" type="email" {...register("email")} />
//     {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
//   </div>
// </div>


//             <Button type="submit">Save Changes</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Reset Password */}
//       <Card className="shadow-md border-yellow-100">
//         <CardContent className="p-8 space-y-4">
//           <h3 className="text-xl font-semibold text-yellow-600">Reset Password</h3>
//           <p className="text-sm text-muted-foreground">For security, you must confirm before resetting your password.</p>
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button variant="secondary">Reset Password</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Reset your password?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   A reset link will be sent to your registered email address. This action is safe and cannot be undone.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//              <Link href='/ChangePassword' >   <AlertDialogAction >Confirm</AlertDialogAction></Link>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </CardContent>
//       </Card>

//       {/* Delete Account */}
//      {/* Delete Account */}
// <Card className="shadow-md border-red-200">
//   <CardContent className="p-8 space-y-4">
//     <h3 className="text-xl font-semibold text-red-700">Delete Account</h3>
//     <p className="text-sm text-muted-foreground">This action is irreversible. Please confirm before proceeding.</p>
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructive">Delete Account</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This will permanently delete your account and all associated data. This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleDeleteAccount}>Confirm Delete</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   </CardContent>
// </Card>

//       {/* Logout Section */}
// <Card className="shadow-md border-gray-200">
//   <CardContent className="p-8 space-y-4">
//     <h3 className="text-xl font-semibold text-gray-700">Logout</h3>
//     <p className="text-sm text-muted-foreground">
//       Click below to securely log out of your account.
//     </p>

//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Logout</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
//           <AlertDialogDescription>
//             You’ll be redirected to the login page and your session will end.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleLogout}>Confirm Logout</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   </CardContent>
// </Card>

//     </form>
//   );
// };

// export default ProfileSettings;


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import useStore from '@/lib/Zustand';

const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .regex(/^[A-Za-z ]+$/, 'Only letters and spaces allowed'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z ]+$/, 'Only letters and spaces allowed'),
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(/^[A-Za-z ]+$/, 'Only letters and spaces allowed'),
  email: z.string().email('Invalid email address'),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const { profile, fetchProfile } = useProfileStore();
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const router = useRouter();
  const { logout } = useStore();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/v1/users/logout');
      logout();
      localStorage.removeItem('auth_token');
      toast.success('Logged out successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Logout failed. Try again.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete('/api/v1/users/profile/');
      toast.success('Account deleted successfully!');
      logout();
      localStorage.removeItem('auth_token');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Account deletion failed.');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setValue('first_name', profile.first_name || '');
      setValue('last_name', profile.last_name || '');
      setValue('username', profile.username || '');
      setValue('email', profile.email || '');
    }
  }, [profile]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const handleSaveAvatar = async () => {
    if (!avatarFile) return toast.warning('No image selected.');

    const formData = new FormData();
    formData.append('profile_picture', avatarFile);

    try {
      await axiosInstance.patch('/api/v1/users/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile picture updated!');
      setAvatarFile(null);
      setNewAvatar(null);
      fetchProfile();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Failed to update avatar.');
    }
  };

  const onSubmit = async (data: ProfileSchemaType) => {
    try {
      await axiosInstance.put('/api/v1/users/profile/', data);
      toast.success('Profile details updated!');
      fetchProfile();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Profile update failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Card className="shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-blue-700">Profile Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              {newAvatar ? (
                <Image src={newAvatar} alt="Preview" width={100} height={100} className="rounded-full border shadow-md" />
              ) : (
                <div className="w-[100px] h-[100px] relative">
                <Image
                  src={profile?.profile_picture || 'placeholder.svg'}
                  alt={profile?.username || ''}
                fill
                  className="rounded-full border shadow-md object-cover"
                />
                </div>
              )}
              <Input type="file" accept="image/*" onChange={handleAvatarUpload} className="w-full max-w-xs" />
            </div>
            {newAvatar && (
              <Button onClick={handleSaveAvatar} type="button" variant="secondary">
                Save Profile Picture
              </Button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input {...register('first_name')} placeholder="First Name" />
                {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input {...register('last_name')} placeholder="Last Name" />
                {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input {...register('username')} placeholder="Username" />
                {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <Input {...register('email')} placeholder="Email" type="email" />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div className="text-right">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-yellow-100">
        <CardContent className="p-8 space-y-4">
          <h3 className="text-xl font-semibold text-yellow-600">Update Password</h3>
          <p className="text-sm text-muted-foreground">
            For security, you must confirm before resetting your password.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Update Password</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update your password?</AlertDialogTitle>
                <AlertDialogDescription>
                  A reset link will be sent to your registered email address. This action is safe and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Link href="/ChangePassword">
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card className="shadow-md border-red-200">
        <CardContent className="p-8 space-y-4">
          <h3 className="text-xl font-semibold text-red-700">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            This action is irreversible. Please confirm before proceeding.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>Confirm Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

     
    </form>
  );
};

export default ProfileSettings;
