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
import { Menu, Calendar, Clock, Hash, CreditCard } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import { useBookingStore } from '@/lib/ZustanStore/bookingStore';
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
  const { bookings, loading: bookingsLoading, error: bookingsError, fetchBookings } = useBookingStore();
console.log(bookings);
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.user_id) {
      fetchBookings(profile.user_id);
    }
  }, [profile?.user_id, fetchBookings]);

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
       <p className="font-bold text-lg">
  {profile?.username
    ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
    : ''}
</p>
        </div>
      </div>
      <Separator className="my-4" />
      <nav className="flex flex-col space-y-2 mb-5">
        {['profile', 'bookings',  'settings'].map((section) => (
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout (< 768px) */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src={profile?.profile_picture || '/placeholder.svg'}
                  alt={profile?.username || 'User'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
              <p className="font-medium text-sm sm:text-base truncate max-w-32 sm:max-w-none">
  {profile?.username
    ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
    : ''}
</p>
                <p className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">
                  {profile?.email}
                </p>
              </div>
            </div>
            <Menu 
              className="w-6 h-6 cursor-pointer text-gray-600" 
              onClick={() => setMobileMenuOpen(true)} 
            />
          </div>
        </header>

        {/* Mobile Content */}
        <main className="px-4 py-6 space-y-6">
          {activeSection === 'profile' && (
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={profile?.profile_picture || '/placeholder.svg'}
                      alt={profile?.username || 'User'}
                      fill
                      className="rounded-full border-2 object-cover"
                    />
                  </div>
                  <div>
                   <h2 className="text-xl sm:text-2xl font-bold">
  {profile?.username
    ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
    : ''}
</h2>
                    <p className="text-sm text-gray-500">{profile?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'bookings' && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">My Bookings</h3>
                {bookingsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : bookingsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-500 text-sm">{bookingsError}</p>
                  </div>
                ) : bookings && bookings.events.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.events.map((booking) => (
                      <div key={booking.booking_id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex gap-4">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                            <Image
                              src={booking.event_card_image}
                              alt={booking.event_title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base truncate">
                              {booking.event_title}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3 text-purple-600" />
                              <p className="text-xs sm:text-sm text-gray-600">
                                {new Date(booking.booking_date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-purple-600" />
                              <p className="text-xs sm:text-sm text-gray-600">
                                {booking.slot_time}
                              </p>

                            </div>
                            <div className="flex items-center gap-1">
                                          <Hash className="w-3 h-3 text-purple-600" />
                                          <span>Booking ID: {booking.booking_id}</span>
                                        </div>
                                <div className="flex items-center gap-1">
                             
                              <p className="text-xs sm:text-sm text-gray-600">
                                {booking.num_seats} Tickets
                              </p>

                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm sm:text-base font-semibold text-purple-600">
                                ${booking.total_price.toLocaleString()}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                booking.booking_status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.booking_status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {bookings.total_pages > 1 && (
                      <div className="text-center pt-4">
                        <p className="text-sm text-gray-500">
                          Showing {bookings.events.length} of {bookings.total_items} bookings
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎫</span>
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base">You have no bookings yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeSection === 'payments' && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">Payment Methods</h3>
                <p className="text-gray-500 text-sm sm:text-base">No saved payment methods.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === 'addresses' && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">My Addresses</h3>
                <p className="text-gray-500 text-sm sm:text-base">No saved addresses.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === 'settings' && <ProfileSettings />}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
          <div className="grid grid-cols-5 gap-1 px-2 py-2">
            {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as any)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
                  activeSection === section
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xs font-medium capitalize truncate">
                  {section === 'payments' ? 'Pay' : section === 'addresses' ? 'Addr' : section}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-4/5 max-w-sm h-full shadow-xl">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              {renderSidebarContent()}
            </div>
            <div 
              className="flex-1" 
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Tablet & Desktop Layout (≥ 768px) */}
      <div className="hidden md:flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 lg:w-72 xl:w-80 bg-white border-r shadow-sm">
          <div className="sticky top-0 h-screen overflow-y-auto">
            {renderSidebarContent()}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-none lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto p-6 lg:p-8 xl:p-10">
            <div className="space-y-6 lg:space-y-8">
              {activeSection === 'profile' && (
                <Card>
                  <CardContent className="p-6 lg:p-8 xl:p-10">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
                      <div className="relative w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex-shrink-0">
                        <Image
                          src={profile?.profile_picture || '/placeholder.svg'}
                          alt={profile?.username || 'User'}
                          fill
                          className="rounded-full border-2 object-cover"
                        />
                      </div>
                      <div className="text-center lg:text-left space-y-2">
                       <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
  {profile?.username
    ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
    : ''}
</h2>
                        <p className="text-base lg:text-lg text-gray-500">
                          {profile?.email}
                        </p>
                        <div className="pt-4 space-y-2">
                          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-sm lg:text-base text-gray-600">
                            <span>Member since: January 2024</span>
                            <span className="hidden lg:inline">•</span>
                            <span>Total bookings: {bookings?.total_items || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'bookings' && (
                <Card>
                  <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">My Bookings</h3>
                      {bookings && bookings.total_items > 0 && (
                        <Button className="w-full sm:w-auto">View All Bookings</Button>
                      )}
                    </div>
                    {bookingsLoading ? (
                      <div className="flex justify-center py-12 lg:py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                      </div>
                    ) : bookingsError ? (
                      <div className="text-center py-12 lg:py-16">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl lg:text-3xl text-red-500">⚠️</span>
                        </div>
                        <h4 className="text-lg lg:text-xl font-medium mb-2 text-red-600">Error Loading Bookings</h4>
                        <p className="text-red-500 text-sm lg:text-base">{bookingsError}</p>
                      </div>
                    ) : bookings && bookings.events.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid gap-6">
                          {bookings.events.map((booking) => (
                            <div key={booking.booking_id} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex gap-6">
                                <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                                  <Image
                                    src={booking.event_card_image}
                                    alt={booking.event_title}
                                    fill
                                    className="rounded-lg object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1">
                                      <h4 className="text-lg lg:text-xl font-semibold mb-2">
                                        {booking.event_title}
                                      </h4>
                                      <div className="space-y-2 text-sm lg:text-base text-gray-600">
                                        <div className="flex items-center gap-2">
                                          <Calendar className="w-4 h-4 text-purple-600" />
                                          <span>
                                            {new Date(booking.booking_date).toLocaleDateString('en-US', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric'
                                            })}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Clock className="w-4 h-4 text-purple-600" />
                                          <span>{booking.slot_time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Hash className="w-4 h-4 text-purple-600" />
                                          <span>Booking ID: {booking.booking_id}</span>
                                        </div>
                                          <div className="flex items-center gap-2">
                                        
                                          <span>Tickets: {booking.num_seats}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                      <div className="text-right">
                                        <p className="text-2xl lg:text-3xl font-bold text-purple-600">
                                          ${booking.total_price.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                      </div>
                                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        booking.booking_status === 'approved' 
                                          ? 'bg-green-100 text-green-800' 
                                          : booking.booking_status === 'pending'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}>
                                        {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {bookings.total_pages > 1 && (
                          <div className="text-center pt-6 border-t">
                            <p className="text-gray-500 mb-4">
                              Showing {bookings.events.length} of {bookings.total_items} bookings
                            </p>
                            <Button variant="outline">Load More Bookings</Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 lg:py-16">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl lg:text-3xl">🎫</span>
                        </div>
                        <h4 className="text-lg lg:text-xl font-medium mb-2">No bookings yet</h4>
                        <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
                          When you book events, they'll appear here. Start exploring events to make your first booking!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeSection === 'payments' && (
                <Card>
                  <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">Payment Methods</h3>
                      <Button className="w-full sm:w-auto">Add Payment Method</Button>
                    </div>
                    <div className="text-center py-12 lg:py-16">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl lg:text-3xl">💳</span>
                      </div>
                      <h4 className="text-lg lg:text-xl font-medium mb-2">No payment methods</h4>
                      <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
                        Add a payment method to make booking events quick and easy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'addresses' && (
                <Card>
                  <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">My Addresses</h3>
                      <Button className="w-full sm:w-auto">Add Address</Button>
                    </div>
                    <div className="text-center py-12 lg:py-16">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl lg:text-3xl">📍</span>
                      </div>
                      <h4 className="text-lg lg:text-xl font-medium mb-2">No saved addresses</h4>
                      <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
                        Save your addresses to make event booking faster and more convenient.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'settings' && <ProfileSettings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
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


// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Menu } from 'lucide-react';
// import axiosInstance from '@/lib/axiosInstance';
// import { toast } from 'sonner';
// import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
// import ProfileSettings from '@/components/Profile/settings';
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
// } from '@/components/ui/alert-dialog';
// import useStore from '@/lib/Zustand';
// import { Button } from '@/components/ui/button';
// export default function ProfileDashboard() {
//   const [activeSection, setActiveSection] = useState<'profile' | 'bookings' | 'payments' | 'addresses' | 'settings'>('profile');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();
//   const { profile, fetchProfile } = useProfileStore();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const { logout } = useStore();

//   const handleLogout = async () => {
//     try {
//       // await axiosInstance.post('/api/v1/users/logout');
//       logout();
//       localStorage.removeItem('auth_token');
//       toast.success('Logged out successfully!');
//       router.push('/');
//     } catch (error: any) {
//       toast.error(error?.response?.data?.detail || 'Logout failed. Try again.');
//     }
//   };
//   const renderSidebarContent = () => (
//     <div className="flex flex-col h-full p-4">
//       <div className="flex items-center space-x-4 ">
//         <div className='relative w-[50px] h-[50px]'>
//  <Image
//           src={profile?.profile_picture || 'placeholder.svg'}
//           alt={profile?.username || 'User'}
//         fill
//           className="rounded-full border object-cover"
//         />
//         </div>
       
//         <div>
//        <p className="font-bold text-lg">
//   {profile?.username
//     ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
//     : ''}
// </p>
//         </div>
//       </div>
//       <Separator className="my-4" />
//       <nav className="flex flex-col space-y-2 mb-5">
//         {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
//           <button
//             key={section}
//             onClick={() => {
//               setActiveSection(section as any);
//               setMobileMenuOpen(false);
//             }}
//             className={`text-left px-3 py-2 rounded-lg transition-colors ${
//               activeSection === section
//                 ? 'bg-purple-100 text-purple-700 font-semibold'
//                 : 'hover:bg-gray-100 text-gray-700'
//             }`}
//           >
//             {section[0].toUpperCase() + section.slice(1)}
//           </button>
//         ))}
//       </nav>
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button variant="outline">Logout</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   You’ll be redirected to the login page and your session will end.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={handleLogout}>Confirm Logout</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Layout (< 768px) */}
//       <div className="md:hidden">
//         {/* Mobile Header */}
//         <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
//           <div className="flex items-center justify-between px-4 py-3">
//             <div className="flex items-center gap-3">
//               <div className="relative w-8 h-8 sm:w-10 sm:h-10">
//                 <Image
//                   src={profile?.profile_picture || '/placeholder.svg'}
//                   alt={profile?.username || 'User'}
//                   fill
//                   className="rounded-full object-cover"
//                 />
//               </div>
//               <div>
//               <p className="font-medium text-sm sm:text-base truncate max-w-32 sm:max-w-none">
//   {profile?.username
//     ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
//     : ''}
// </p>
//                 <p className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">
//                   {profile?.email}
//                 </p>
//               </div>
//             </div>
//             <Menu 
//               className="w-6 h-6 cursor-pointer text-gray-600" 
//               onClick={() => setMobileMenuOpen(true)} 
//             />
//           </div>
//         </header>

//         {/* Mobile Content */}
//         <main className="px-4 py-6 space-y-6">
//           {activeSection === 'profile' && (
//             <Card>
//               <CardContent className="p-4 sm:p-6">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="relative w-20 h-20 sm:w-24 sm:h-24">
//                     <Image
//                       src={profile?.profile_picture || '/placeholder.svg'}
//                       alt={profile?.username || 'User'}
//                       fill
//                       className="rounded-full border-2 object-cover"
//                     />
//                   </div>
//                   <div>
//                    <h2 className="text-xl sm:text-2xl font-bold">
//   {profile?.username
//     ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
//     : ''}
// </h2>
//                     <p className="text-sm text-gray-500">{profile?.email}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'bookings' && (
//             <Card>
//               <CardContent className="p-4 sm:p-6 space-y-4">
//                 <h3 className="text-lg sm:text-xl font-semibold">My Bookings</h3>
//                 <p className="text-gray-500 text-sm sm:text-base">You have no bookings yet.</p>
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'payments' && (
//             <Card>
//               <CardContent className="p-4 sm:p-6 space-y-4">
//                 <h3 className="text-lg sm:text-xl font-semibold">Payment Methods</h3>
//                 <p className="text-gray-500 text-sm sm:text-base">No saved payment methods.</p>
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'addresses' && (
//             <Card>
//               <CardContent className="p-4 sm:p-6 space-y-4">
//                 <h3 className="text-lg sm:text-xl font-semibold">My Addresses</h3>
//                 <p className="text-gray-500 text-sm sm:text-base">No saved addresses.</p>
//               </CardContent>
//             </Card>
//           )}

//           {activeSection === 'settings' && <ProfileSettings />}
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
//           <div className="grid grid-cols-5 gap-1 px-2 py-2">
//             {['profile', 'bookings', 'payments', 'addresses', 'settings'].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => setActiveSection(section as any)}
//                 className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
//                   activeSection === section
//                     ? 'bg-purple-100 text-purple-700'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 <span className="text-xs font-medium capitalize truncate">
//                   {section === 'payments' ? 'Pay' : section === 'addresses' ? 'Addr' : section}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </nav>

//         {/* Mobile Drawer */}
//         {mobileMenuOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
//             <div className="bg-white w-4/5 max-w-sm h-full shadow-xl">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <span className="text-lg font-semibold">Menu</span>
//                 <button 
//                   onClick={() => setMobileMenuOpen(false)} 
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
//               {renderSidebarContent()}
//             </div>
//             <div 
//               className="flex-1" 
//               onClick={() => setMobileMenuOpen(false)}
//             />
//           </div>
//         )}
//       </div>

//       {/* Tablet & Desktop Layout (≥ 768px) */}
//       <div className="hidden md:flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="w-64 lg:w-72 xl:w-80 bg-white border-r shadow-sm">
//           <div className="sticky top-0 h-screen overflow-y-auto">
//             {renderSidebarContent()}
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="max-w-none lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto p-6 lg:p-8 xl:p-10">
//             <div className="space-y-6 lg:space-y-8">
//               {activeSection === 'profile' && (
//                 <Card>
//                   <CardContent className="p-6 lg:p-8 xl:p-10">
//                     <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
//                       <div className="relative w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex-shrink-0">
//                         <Image
//                           src={profile?.profile_picture || '/placeholder.svg'}
//                           alt={profile?.username || 'User'}
//                           fill
//                           className="rounded-full border-2 object-cover"
//                         />
//                       </div>
//                       <div className="text-center lg:text-left space-y-2">
//                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
//   {profile?.username
//     ? profile.username.charAt(0).toUpperCase() + profile.username.slice(1)
//     : ''}
// </h2>
//                         <p className="text-base lg:text-lg text-gray-500">
//                           {profile?.email}
//                         </p>
//                         <div className="pt-4 space-y-2">
//                           <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-sm lg:text-base text-gray-600">
//                             <span>Member since: January 2024</span>
//                             <span className="hidden lg:inline">•</span>
//                             <span>Total bookings: 0</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeSection === 'bookings' && (
//                 <Card>
//                   <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">My Bookings</h3>
//                       <Button className="w-full sm:w-auto">View All Bookings</Button>
//                     </div>
//                     <div className="text-center py-12 lg:py-16">
//                       <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                         <span className="text-2xl lg:text-3xl">🎫</span>
//                       </div>
//                       <h4 className="text-lg lg:text-xl font-medium mb-2">No bookings yet</h4>
//                       <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
//                         When you book events, they'll appear here. Start exploring events to make your first booking!
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeSection === 'payments' && (
//                 <Card>
//                   <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">Payment Methods</h3>
//                       <Button className="w-full sm:w-auto">Add Payment Method</Button>
//                     </div>
//                     <div className="text-center py-12 lg:py-16">
//                       <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                         <span className="text-2xl lg:text-3xl">💳</span>
//                       </div>
//                       <h4 className="text-lg lg:text-xl font-medium mb-2">No payment methods</h4>
//                       <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
//                         Add a payment method to make booking events quick and easy.
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeSection === 'addresses' && (
//                 <Card>
//                   <CardContent className="p-6 lg:p-8 xl:p-10 space-y-6">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">My Addresses</h3>
//                       <Button className="w-full sm:w-auto">Add Address</Button>
//                     </div>
//                     <div className="text-center py-12 lg:py-16">
//                       <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                         <span className="text-2xl lg:text-3xl">📍</span>
//                       </div>
//                       <h4 className="text-lg lg:text-xl font-medium mb-2">No saved addresses</h4>
//                       <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
//                         Save your addresses to make event booking faster and more convenient.
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeSection === 'settings' && <ProfileSettings />}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
