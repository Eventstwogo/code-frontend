// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Card, CardContent } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Menu } from 'lucide-react';
// import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
// import ProfileSettings from '@/components/Profile/settings';

// export default function ProfileDashboard() {
//   const [activeSection, setActiveSection] = useState<'profile' | 'bookings' | 'payments' | 'addresses' | 'settings'>('profile');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { profile, fetchProfile } = useProfileStore();
//    useEffect(() => {
//     fetchProfile();
//   }, []);

//   const renderSidebarContent = () => (
//     <>
//       <div className="flex items-center space-x-4 p-4">
//         <Image
//           src={profile?.profile_picture || 'https://assets.monica.im/tools-web/_next/static/media/profile_mobile.294b55f3.webp'}
//           alt={profile?.username || ''}
//           width={50}
//           height={50}
//           className="rounded-full border"
//         />
//         <div>
//           <p className="font-bold">{profile?.username}</p>
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

//   const bookings = [
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
//   ];

//   const paymentMethods = [
//     { id: 1, type: 'Visa', last4: '1234', expiry: '04/27' },
//     { id: 2, type: 'MasterCard', last4: '5678', expiry: '09/26' },
//   ];

//   const addresses = [
//     { id: 1, label: 'Home', details: '123 Main Street, New York, USA' },
//     { id: 2, label: 'Work', details: '456 Office Park, New York, USA' },
//   ];

//   return (
//     <div className="flex flex-col h-full bg-gray-50">
//       {/* Mobile Topbar */}
//       <div className="md:hidden h-16 flex items-center justify-between px-4 border-b shadow-sm bg-white">
//         <div className="flex items-center space-x-2">
//           <Image src={profile?.profile_picture || 'https://assets.monica.im/tools-web/_next/static/media/profile_mobile.294b55f3.webp'} alt={profile?.username || ''} width={36} height={36} className="rounded-full" />
//           <p className="font-medium text-sm">{profile?.username}</p>
//         </div>
//         <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
//       </div>

//       {/* Mobile Drawer */}
//       {mobileMenuOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
//           <div className="flex justify-between items-center p-4 border-b">
//             <p className="font-semibold text-lg">Menu</p>
//             <button onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-500">Close</button>
//           </div>
//           {renderSidebarContent()}
//         </div>
//       )}

//       {/* Main Layout */}
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-md overflow-y-auto">
//           {renderSidebarContent()}
//         </aside>

//         <section className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
//           {activeSection === 'profile' && (
//             <Card>
//               <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-center">
//                 <Image src={profile?.profile_picture || 'https://assets.monica.im/tools-web/_next/static/media/profile_mobile.294b55f3.webp'} alt={profile?.username || ''} width={120} height={120} className="rounded-full border" />
//                 <div className="text-center md:text-left">
//                   <h2 className="text-2xl font-bold">{profile?.username}</h2>
//                   <p className="text-sm text-muted-foreground">{profile?.email}</p>
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

//           {activeSection === 'settings' && (
//            <ProfileSettings/>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Menu } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import ProfileSettings from '@/components/Profile/settings';
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
import useStore from '@/lib/Zustand';
import { Button } from '@/components/ui/button';
export default function ProfileDashboard() {
  const [activeSection, setActiveSection] = useState<'profile' | 'bookings' | 'payments' | 'addresses' | 'settings'>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  const { logout } = useStore();

  const handleLogout = async () => {
    try {
      // await axiosInstance.post('/api/v1/users/logout');
      logout();
      localStorage.removeItem('auth_token');
      toast.success('Logged out successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Logout failed. Try again.');
    }
  };
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center space-x-4 ">
        <div className='relative w-[50px] h-[50px]'>
 <Image
          src={profile?.profile_picture || 'placeholder.svg'}
          alt={profile?.username || 'User'}
        fill
          className="rounded-full border object-cover"
        />
        </div>
       
        <div>
          <p className="font-bold text-lg">{profile?.username}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <nav className="flex flex-col space-y-2 mb-5">
        {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section as any);
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 rounded-lg transition-colors ${
              activeSection === section
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {section[0].toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>
        <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You’ll be redirected to the login page and your session will end.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Confirm Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-10">
      <div className="flex w-full max-w-7xl min-h-screen bg-white shadow rounded-lg overflow-hidden ">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 border-r">
          {renderSidebarContent()}
        </aside>

        {/* Mobile Topbar */}
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white h-16 flex items-center justify-between px-4 shadow z-10">
          <div className="flex items-center gap-3">
            <div className='relative w-[50px] h-[50px]'>
  <Image
              src={profile?.profile_picture || 'placeholder.svg'}
              alt={profile?.username || 'User'}
        fill
              className="rounded-full"
            />
            </div>
          
            <span className="font-medium text-sm">{profile?.username}</span>
          </div>
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-500">Close</button>
            </div>
            {renderSidebarContent()}
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <section className="max-w-4xl mx-auto space-y-6">
            {activeSection === 'profile' && (
              <Card>
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className='relative w-[120px] h-[120px]'>
 <Image
                    src={profile?.profile_picture || 'placeholder.svg'}
                    alt={profile?.username || 'User'}
                   fill
                    className="rounded-full border object-cover "
                  />
                  </div>
                 
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">{profile?.username}</h2>
                    <p className="text-sm text-gray-500">{profile?.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'bookings' && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">My Bookings</h3>
                  {/* Add booking details here */}
                  <p className="text-gray-500">You have no bookings yet.</p>
                </CardContent>
              </Card>
            )}

            {activeSection === 'payments' && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Payment Methods</h3>
                  {/* Add payment details here */}
                  <p className="text-gray-500">No saved payment methods.</p>
                </CardContent>
              </Card>
            )}

            {activeSection === 'addresses' && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">My Addresses</h3>
                  {/* Add address details here */}
                  <p className="text-gray-500">No saved addresses.</p>
                </CardContent>
              </Card>
            )}

            {activeSection === 'settings' && <ProfileSettings />}
          </section>
        </main>
      </div>
    </div>
  );
}
