// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { Menu } from 'lucide-react';
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function ProfileDashboard() {
//   const [activeSection, setActiveSection] = useState<'profile' | 'bookings' | 'payments' | 'addresses' | 'settings'>('profile');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   const [user, setUser] = useState({
//     name: 'Jane Doe',
//     email: 'jane@example.com',
//     membership: 'Platinum',
//     avatar: '/images/avatar-placeholder.png',
//     phone: '+1 234 567 890',
//     city: 'New York',
//     country: 'USA',
//     joined: 'January 2022',
//   });

//   const [bookings] = useState([
//     {
//       id: 1,
//       movie: 'Oppenheimer',
//       poster: '/images/oppenheimer.jpg',
//       date: '2025-07-21',
//       time: '7:30 PM',
//       seats: 'B12, B13',
//       theatre: 'PVR Cinemas, Mall Road',
//       status: 'Confirmed',
//     },
//     {
//       id: 2,
//       movie: 'Barbie',
//       poster: '/images/barbie.jpg',
//       date: '2025-07-02',
//       time: '5:00 PM',
//       seats: 'A1, A2',
//       theatre: 'INOX, City Center',
//       status: 'Cancelled',
//     },
//   ]);

//   const [paymentMethods] = useState([
//     { id: 1, type: 'Visa', last4: '1234', expiry: '04/27' },
//     { id: 2, type: 'MasterCard', last4: '5678', expiry: '09/26' },
//   ]);

//   const [addresses] = useState([
//     { id: 1, label: 'Home', details: '123 Main Street, New York, USA' },
//     { id: 2, label: 'Work', details: '456 Office Park, New York, USA' },
//   ]);

//   const [editName, setEditName] = useState(user.name);
//   const [editEmail, setEditEmail] = useState(user.email);
//   const [newAvatar, setNewAvatar] = useState<string>('');

//   const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewAvatar(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileUpdate = () => {
//     setUser((prev) => ({
//       ...prev,
//       name: editName,
//       email: editEmail,
//       avatar: newAvatar || prev.avatar
//     }));
//     setNewAvatar('');
//     alert('Profile updated!');
//   };

//   const handleDeleteAccount = () => {
    
//       router.push('/');
 
//   };

//   const renderSidebarContent = () => (
//     <>
//       <div className="flex items-center space-x-4 p-4">
//         <Image
//           src={user.avatar}
//           alt={user.name}
//           width={50}
//           height={50}
//           className="rounded-full border"
//         />
//         <div>
//           <p className="font-bold">{user.name}</p>
//           <p className="text-xs text-muted-foreground">{user.membership} Member</p>
//         </div>
//       </div>
//       <Separator />
//       <nav className="flex flex-col space-y-3 text-sm px-4 py-4">
//         {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
//           <button
//             key={section}
//             onClick={() => {
//               setActiveSection(section as any);
//               setMobileMenuOpen(false);
//             }}
//             className={
//               activeSection === section
//                 ? 'text-purple-600 font-semibold text-left'
//                 : 'text-gray-700 text-left'
//             }
//           >
//             {section[0].toUpperCase() + section.slice(1)}
//           </button>
//         ))}
//       </nav>
//     </>
//   );

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-gray-50">
//       {/* Mobile Topbar */}
//       <div className="md:hidden flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white">
//         <div className="flex items-center space-x-2">
//           <Image
//             src={user.avatar}
//             alt={user.name}
//             width={36}
//             height={36}
//             className="rounded-full"
//           />
//           <p className="font-medium text-sm">{user.name}</p>
//         </div>
//         <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
//       </div>

//       {/* Mobile Bottom Drawer Sidebar */}
//       {mobileMenuOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-white z-50 rounded-t-xl shadow-xl md:hidden">
//           <div className="flex justify-between items-center p-4 border-b">
//             <p className="font-semibold text-lg">Menu</p>
//             <button onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-500">Close</button>
//           </div>
//           {renderSidebarContent()}
//         </div>
//       )}

//       <div className="flex flex-1">
//         {/* Desktop/Tablet Sidebar */}
//         <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-md sticky top-16  overflow-y-auto">
//           {renderSidebarContent()}
//         </aside>

//         {/* Main Content */}
//         <section className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 mt-[64px] md:mt-0">
//           {activeSection === 'profile' && (
//             <Card>
//               <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-center">
//                 <Image src={user.avatar} alt={user.name} width={120} height={120} className="rounded-full border" />
//                 <div className="text-center md:text-left">
//                   <h2 className="text-2xl font-bold">{user.name}</h2>
//                   <p className="text-sm text-muted-foreground">{user.email}</p>
//                   <p className="text-sm text-muted-foreground">{user.phone}</p>
//                   <p className="text-sm text-muted-foreground">{user.city}, {user.country}</p>
//                   <p className="text-xs text-gray-400">Member since {user.joined}</p>
//                   <span className="inline-block rounded-full bg-purple-100 text-purple-700 text-xs px-3 py-1 mt-2">
//                     {user.membership} Member
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'bookings' && (
//             <Card>
//               <CardContent className="p-8">
//                 <h3 className="text-xl font-semibold mb-6">My Bookings</h3>
//                 {bookings.map((b) => (
//                   <div key={b.id} className="flex items-start gap-4 border rounded-lg p-4 mb-4 bg-white shadow-sm">
//                     <Image src={b.poster} alt={b.movie} width={100} height={150} className="rounded" />
//                     <div className="flex-1">
//                       <h4 className="text-lg font-medium">{b.movie}</h4>
//                       <p className="text-sm">{b.date} at {b.time}</p>
//                       <p className="text-sm">Seats: {b.seats}</p>
//                       <p className="text-sm">{b.theatre}</p>
//                       <p className={b.status === 'Confirmed' ? 'text-green-600 text-sm font-medium' : 'text-red-500 text-sm font-medium'}>
//                         Status: {b.status}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'payments' && (
//             <Card>
//               <CardContent className="p-8">
//                 <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
//                 {paymentMethods.map((m) => (
//                   <div key={m.id} className="flex items-center justify-between border rounded-lg p-4 mb-3 bg-white shadow-sm">
//                     <div>
//                       <p className="font-medium">{m.type} ending in ****{m.last4}</p>
//                       <p className="text-sm text-muted-foreground">Expires {m.expiry}</p>
//                     </div>
//                     <span className="text-xs text-purple-600 cursor-pointer">Remove</span>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'addresses' && (
//             <Card>
//               <CardContent className="p-8">
//                 <h3 className="text-xl font-semibold mb-6">Addresses</h3>
//                 {addresses.map((a) => (
//                   <div key={a.id} className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
//                     <p className="font-medium">{a.label}</p>
//                     <p className="text-sm text-muted-foreground">{a.details}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//         {activeSection === 'settings' && (
//   <div className="space-y-6">
//     {/* Profile Settings Card */}
//     <Card className="shadow-md">
//       <CardContent className="p-8 space-y-6">
//         <h3 className="text-xl font-semibold">Profile Settings</h3>
//         <p className="text-sm text-muted-foreground">
//           Update your profile details and photo.
//         </p>

//         <div className="space-y-4">
//           <div className="flex items-center gap-6">
//             <Image
//               src={newAvatar || user.avatar}
//               alt={user.name}
//               width={80}
//               height={80}
//               className="rounded-full border"
//             />
//             <Input type="file" accept="image/*" onChange={handleAvatarUpload} />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               type="text"
//               placeholder="Name"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               value={editEmail}
//               onChange={(e) => setEditEmail(e.target.value)}
//             />
//           </div>
//           <Button onClick={handleProfileUpdate} className="mt-2">
//             Save Changes
//           </Button>
//         </div>
//       </CardContent>
//     </Card>

//     {/* Reset Password Card */}
//     <Card className="shadow-md border-yellow-100">
//       <CardContent className="p-8 space-y-4">
//         <h3 className="text-xl font-semibold text-yellow-600">Reset Password</h3>
//         <p className="text-sm text-muted-foreground">
//           For security, you must confirm before resetting your password.
//         </p>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="secondary">Reset Password</Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Reset your password?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 A reset link will be sent to your registered email address. This action is safe and cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
                
//               >
//                 Confirm
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>

//     {/* Delete Account Card */}
//     <Card className="shadow-md border-red-200">
//       <CardContent className="p-8 space-y-4">
//         <h3 className="text-xl font-semibold text-red-700">Delete Account</h3>
//         <p className="text-sm text-muted-foreground">
//           This action is irreversible. Please confirm before proceeding.
//         </p>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="destructive">Delete Account</Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will permanently delete your account and all associated data. This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={handleDeleteAccount}
//               >
//                 Confirm Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>
//   </div>
// )}

//         </section>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Menu } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";

export default function ProfileDashboard() {
  const [activeSection, setActiveSection] = useState<'profile' | 'bookings' | 'payments' | 'addresses' | 'settings'>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    membership: 'Platinum',
    avatar: '/images/avatar-placeholder.png',
    phone: '+1 234 567 890',
    city: 'New York',
    country: 'USA',
    joined: 'January 2022',
  });

  const [bookings] = useState([
    {
      id: 1,
      movie: 'Oppenheimer',
      poster: '/images/oppenheimer.jpg',
      date: '2025-07-21',
      time: '7:30 PM',
      seats: 'B12, B13',
      theatre: 'PVR Cinemas, Mall Road',
      status: 'Confirmed',
    },
    {
      id: 2,
      movie: 'Barbie',
      poster: '/images/barbie.jpg',
      date: '2025-07-02',
      time: '5:00 PM',
      seats: 'A1, A2',
      theatre: 'INOX, City Center',
      status: 'Cancelled',
    },
  ]);

  const [paymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '1234', expiry: '04/27' },
    { id: 2, type: 'MasterCard', last4: '5678', expiry: '09/26' },
  ]);

  const [addresses] = useState([
    { id: 1, label: 'Home', details: '123 Main Street, New York, USA' },
    { id: 2, label: 'Work', details: '456 Office Park, New York, USA' },
  ]);

  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [newAvatar, setNewAvatar] = useState<string>('');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = () => {
    setUser((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
      avatar: newAvatar || prev.avatar
    }));
    setNewAvatar('');
    alert('Profile updated!');
  };

  const handleDeleteAccount = () => {
    router.push('/');
  };

  const renderSidebarContent = () => (
    <>
      <div className="flex items-center space-x-4 p-4">
        <Image
          src={user.avatar}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full border"
        />
        <div>
          <p className="font-bold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.membership} Member</p>
        </div>
      </div>
      <Separator />
      <nav className="flex flex-col space-y-3 text-sm px-4 py-4">
        {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section as any);
              setMobileMenuOpen(false);
            }}
            className={
              activeSection === section
                ? 'text-purple-600 font-semibold text-left'
                : 'text-gray-700 text-left'
            }
          >
            {section[0].toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Mobile Topbar */}
      <div className="md:hidden h-16 flex items-center justify-between px-4 border-b shadow-sm bg-white">
        <div className="flex items-center space-x-2">
          <Image
            src={user.avatar}
            alt={user.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <p className="font-medium text-sm">{user.name}</p>
        </div>
        <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <p className="font-semibold text-lg">Menu</p>
            <button onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-500">Close</button>
          </div>
          {renderSidebarContent()}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-md overflow-y-auto">
          {renderSidebarContent()}
        </aside>

        <section className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {activeSection === 'profile' && (
            <Card>
              <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-center">
                <Image src={user.avatar} alt={user.name} width={120} height={120} className="rounded-full border" />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                  <p className="text-sm text-muted-foreground">{user.city}, {user.country}</p>
                  <p className="text-xs text-gray-400">Member since {user.joined}</p>
                  <span className="inline-block rounded-full bg-purple-100 text-purple-700 text-xs px-3 py-1 mt-2">
                    {user.membership} Member
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'bookings' && (
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">My Bookings</h3>
                {bookings.map((b) => (
                  <div key={b.id} className="flex items-start gap-4 border rounded-lg p-4 mb-4 bg-white shadow-sm">
                    <Image src={b.poster} alt={b.movie} width={100} height={150} className="rounded" />
                    <div className="flex-1">
                      <h4 className="text-lg font-medium">{b.movie}</h4>
                      <p className="text-sm">{b.date} at {b.time}</p>
                      <p className="text-sm">Seats: {b.seats}</p>
                      <p className="text-sm">{b.theatre}</p>
                      <p className={b.status === 'Confirmed' ? 'text-green-600 text-sm font-medium' : 'text-red-500 text-sm font-medium'}>
                        Status: {b.status}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === 'payments' && (
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
                {paymentMethods.map((m) => (
                  <div key={m.id} className="flex items-center justify-between border rounded-lg p-4 mb-3 bg-white shadow-sm">
                    <div>
                      <p className="font-medium">{m.type} ending in ****{m.last4}</p>
                      <p className="text-sm text-muted-foreground">Expires {m.expiry}</p>
                    </div>
                    <span className="text-xs text-purple-600 cursor-pointer">Remove</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === 'addresses' && (
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Addresses</h3>
                {addresses.map((a) => (
                  <div key={a.id} className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
                    <p className="font-medium">{a.label}</p>
                    <p className="text-sm text-muted-foreground">{a.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              {/* Profile Settings */}
              <Card className="shadow-md">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-xl font-semibold">Profile Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <Image
                        src={newAvatar || user.avatar}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full border"
                      />
                      <Input type="file" accept="image/*" onChange={handleAvatarUpload} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
 <Card className="shadow-md border-yellow-100">
       <CardContent className="p-8 space-y-4">
         <h3 className="text-xl font-semibold text-yellow-600">Reset Password</h3>
         <p className="text-sm text-muted-foreground">
           For security, you must confirm before resetting your password.
         </p>
         <AlertDialog>
          <AlertDialogTrigger asChild>
             <Button variant="secondary">Reset Password</Button>
           </AlertDialogTrigger>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>Reset your password?</AlertDialogTitle>
               <AlertDialogDescription>
                 A reset link will be sent to your registered email address. This action is safe and cannot be undone.
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>

              {/* Delete Account */}
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
                        <AlertDialogAction onClick={handleDeleteAccount}>
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
