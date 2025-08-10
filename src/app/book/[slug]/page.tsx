// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axiosInstance from '@/lib/axiosInstance';
// import useStore from '@/lib/Zustand';
// import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
// import { BsCalendar2EventFill } from 'react-icons/bs';

// interface BookingPageProps {
//   params: {
//     slug: string;
//   };
// }

// interface Slot {
//   slot_id: string;
//   slot_name: string;
//   start_time: string;
//   end_time: string;
//   price: number;
//   available_seats: number;
//   total_seats: number;
// }

// interface BookingData {
//   event_id: string;
//   slot_id: string;
//   selected_date: string;
//   seats_count: number;
// }

// const BookingPage = ({ params }: BookingPageProps) => {
//   const { slug } = params;
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { userId, isAuthenticated, checkAuth } = useStore();
//   console.log(userId,isAuthenticated)
//   const [event, setEvent] = useState<any>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [selectedSlot, setSelectedSlot] = useState<string>('');
//   const [seatsCount, setSeatsCount] = useState<number>(1);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [slotId, setSlotId] = useState<string>('');
//   const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState<any>(null);
//   const [showBookingDetails, setShowBookingDetails] = useState(false);

//   // Get selected date and slot_id from URL params if available
//   useEffect(() => {
//     const dateParam = searchParams.get('date');
//     const slotIdParam = searchParams.get('slug_id');
    
//     console.log('URL Params:', { dateParam, slotIdParam });
    
//     if (dateParam) {
//       console.log('Setting selectedDate from URL:', dateParam);
//       setSelectedDate(dateParam);
//     }
//     if (slotIdParam) {
//       setSlotId(slotIdParam);
//     }
//     setUrlParamsProcessed(true);
//   }, [searchParams]);


//   // Check authentication on component mount
//   useEffect(() => {
//     const initializeAuth = async () => {
//       console.log('🔄 Initializing authentication check in BookingPage...');
//       await checkAuth();
//       setAuthChecked(true);
//     };

//     initializeAuth();
//   }, []);

//   // Redirect if not authenticated (only after auth check is complete)
//   useEffect(() => {
//     if (authChecked && !isAuthenticated && !userId) {
//       console.log('🚫 Not authenticated, redirecting to login');
//       router.push('/login');
//       return;
//     }
//   }, [authChecked, isAuthenticated, userId, router]);

//   // Fetch event details
//   const fetchEvent = async () => {
//     try {
//       const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`);
//       const eventData = response.data.data;
//       setEvent(eventData);
      
//       // Only set event start date if no date is selected from URL params
//       if (!selectedDate) {
//         const eventDate = new Date(eventData.start_date).toISOString().split('T')[0];
//         console.log('Setting selectedDate from event start_date:', eventDate);
//         setSelectedDate(eventDate);
//       } else {
//         console.log('selectedDate already set, not overriding:', selectedDate);
//       }
//     } catch (error) {
//       console.error('Error fetching event:', error);
//     }
//   };

//   // Fetch available slots for selected date using the new API
//  const fetchSlots = async () => {
//   if (!slotId || !selectedDate) return;

//   try {
//     setLoading(true);
//     console.log('Fetching slots for:', { slotId, selectedDate });

//     const response = await axiosInstance.get(
//       `/api/v1/slots/date-details/${slotId}/${selectedDate}`
//     );
//     console.log('Slots API Response:', response.data);

//     if (response.data && response.data.data && response.data.data.slots_data) {
//       const rawSlots = response.data.data.slots_data;

//       // Convert slot_1, slot_2, etc. into array with slot_number
//       const slotsData = Object.entries(rawSlots).map(([key, value]) => ({
//         ...value,
//         slot_number: key, // e.g., 'slot_1'
//       }));

//       setSlots(slotsData);

//       // Auto-select first slot if only one exists
//       if (slotsData.length === 1) {
//         setSelectedSlot(slotsData[0].slot_number); // select slot by slot_number
//       }
//     } else {
//       // Fallback: Generate sample slots
    
//     }
//   } catch (error) {
//     console.error('Error fetching slots:', error);

   
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     if (slug && urlParamsProcessed && authChecked && isAuthenticated) {
//       fetchEvent();
//     }
//   }, [slug, urlParamsProcessed, authChecked, isAuthenticated]);

//   useEffect(() => {
//     if (slotId && selectedDate) {
//       fetchSlots();
//     }
//   }, [slotId, selectedDate]);

//   const handleBooking = async () => {
//     if (!selectedSlot || !event) {
//       alert('Please select a time slot');
//       return;
//     }

//     // Find the selected slot details
//     const selectedSlotDetails = slots.find(slot => slot.slot_number === (selectedSlot || slotId));

//     const bookingData: BookingData = {
//       event_id: event.event_id,
//       slot_id: selectedSlot || slotId, // Use selectedSlot if available, otherwise use slotId from URL
//       selected_date: selectedDate,
//       seats_count: seatsCount
//     };

//     // Calculate total amount
//     const totalAmount = selectedSlotDetails ? selectedSlotDetails.price * seatsCount : 0;

//     // Prepare detailed booking information for display
//     const detailedBookingInfo = {
//       bookingData: bookingData,
//       userDetails: {
//         userId: userId,
//         isAuthenticated: isAuthenticated
//       },
//       eventDetails: {
//         eventId: event.event_id,
//         eventTitle: event.event_title,
//         eventImage: event.card_image,
//         address: event.extra_data?.address
//       },
//       slotDetails: {
//         slotId: selectedSlot || slotId,
//         slotName: selectedSlotDetails?.slot_name || 'Unknown Slot',
//         slotNumber: selectedSlotDetails?.slot_id || 'Unknown',
//         startTime: selectedSlotDetails?.start_time || '',
//         endTime: selectedSlotDetails?.end_time || '',
//         pricePerTicket: selectedSlotDetails?.price || 0,
//         availableSeats: selectedSlotDetails?.capacity || 0,
//         totalSeats: selectedSlotDetails?.capacity || 0
//       },
//       bookingSummary: {
//         selectedDate: selectedDate,
//         numberOfTickets: seatsCount,
//         pricePerTicket: selectedSlotDetails?.price || 0,
//         totalAmount: totalAmount,
//         formattedDate: formatDate(selectedDate),
//         formattedTime: selectedSlotDetails ? `${formatTime(selectedSlotDetails.start_time)} - ${formatTime(selectedSlotDetails.end_time)}` : ''
//       },
//       timestamp: new Date().toISOString()
//     };

//     try {
//       setBookingLoading(true);
      
//       // Display the booking details immediately
//       setBookingDetails(detailedBookingInfo);
//       setShowBookingDetails(true);
      
//       // Uncomment the lines below if you want to actually make the API call
//       /*
//       const response = await axiosInstance.post('/api/v1/bookings', bookingData);
      
//       if (response.data.statusCode === 200 || response.data.statusCode === 201) {
//         alert('Booking successful!');
//         // You can add the API response to the booking details if needed
//         setBookingDetails({
//           ...detailedBookingInfo,
//           apiResponse: response.data
//         });
//       }
//       */
      
//     } catch (error: any) {
//       console.error('Booking error:', error);
//       alert(error.response?.data?.message || 'Booking failed. Please try again.');
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (timeString: string) => {
//     const time = new Date(`2000-01-01T${timeString}`);
//     return time.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Show loading while checking authentication
//   if (!authChecked) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Checking authentication...</div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading event details...</div>
//       </div>
//     );
//   }
// console.log(slots)
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-start gap-6">
//             <img 
//               src={event.card_image} 
//               alt={event.event_title}
//               className="w-32 h-48 object-cover rounded-lg"
//             />
//             <div className="flex-1">
//               <h1 className="text-3xl font-bold mb-2">{event.event_title}</h1>
//               <p className="text-gray-600 mb-4">{event.extra_data?.description}</p>
              
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <FaMapMarkerAlt className="text-purple-500" />
//                   <span>{event.extra_data?.address}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <BsCalendar2EventFill className="text-purple-500" />
//                   <span>{formatDate(selectedDate)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Date Selection */}
//         {!showBookingDetails && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Select Date</h2>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             min={new Date().toISOString().split('T')[0]}
//             className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
//         )}

//         {/* Slots Selection */}
//         {!showBookingDetails && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
          
//           {loading ? (
//             <div className="text-center py-8">Loading available slots...</div>
//           ) : slots.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No slots available for the selected date
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {slots.map((slot) => (
//                 <div
//                   key={slot.slot_number}
//                 onClick={() => {
//   console.log(slot.slot_number);
//   setSelectedSlot(slot.slot_number);
// }}
//                   className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                     selectedSlot === slot.slot_number
//                       ? 'border-purple-500 bg-purple-50'
//                       : 'border-gray-200 hover:border-purple-300'
//                   } ${slot.available_seats === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold">{slot.slot_name}</h3>
//                     <span className="text-lg font-bold text-purple-600">
//                       ₹{slot.price}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                     <FaClock />
//                     <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
//                   </div>
                  
//                   <div className="text-sm">
//                     <span className={`${slot.capacity > 10 ? 'text-green-600' : 'text-orange-600'}`}>
//                       {slot.capacity} seats available
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         )}

//         {/* Seats Selection */}
//         {!showBookingDetails && selectedSlot && (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Number of Seats</h2>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
//                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
//               >
//                 -
//               </button>
//               <span className="text-xl font-semibold w-12 text-center">{seatsCount}</span>
//            <button
//   onClick={() => {
//   const selectedSlotData = slots.find(s => s.slot_number === selectedSlot);
//   console.log('Selected Slot:', selectedSlot);
//   console.log('Matched Slot Data:', selectedSlotData);
//   if (selectedSlotData && seatsCount < selectedSlotData.capacity) {
//     setSeatsCount(seatsCount + 1);
//   }
// }}
//   className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
// >
//   +
// </button>

//             </div>
//           </div>
//         )}

//         {/* Booking Summary */}
//         {selectedSlot && (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
//             {(() => {
//               const selectedSlotData = slots.find(s => s.slot_number === selectedSlot);
//               const totalPrice = selectedSlotData ? selectedSlotData.price * seatsCount : 0;
              
//               return (
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Event:</span>
//                     <span className="font-semibold">{event.event_title}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Date:</span>
//                     <span>{formatDate(selectedDate)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Time:</span>
//                     <span>{selectedSlotData ? `${formatTime(selectedSlotData.start_time)} - ${formatTime(selectedSlotData.end_time)}` : ''}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Seats:</span>
//                     <span>{seatsCount}</span>
//                   </div>
//                   <div className="flex justify-between text-lg font-bold border-t pt-2">
//                     <span>Total:</span>
//                     <span className="text-purple-600">₹{totalPrice}</span>
//                   </div>
//                 </div>
//               );
//             })()}
//           </div>
//         )}

//         {/* Book Button */}
//         {!showBookingDetails && (
//         <div className="text-center">
//           <button
//             onClick={handleBooking}
//             disabled={!selectedSlot || bookingLoading}
//             className={`px-8 py-3 rounded-lg text-white font-semibold text-lg ${
//               !selectedSlot || bookingLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-purple-600 hover:bg-purple-700'
//             }`}
//           >
//             {bookingLoading ? 'Booking...' : 'Confirm Booking'}
//           </button>
//         </div>
//         )}

//         {/* Booking Details Display */}
//         {showBookingDetails && bookingDetails && (
//           <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold text-green-600">Booking Details</h2>
//               <button
//                 onClick={() => setShowBookingDetails(false)}
//                 className="text-gray-500 hover:text-gray-700 text-xl font-bold"
//               >
//                 ×
//               </button>
//             </div>
            

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Event Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Event:</span> {bookingDetails.eventDetails.eventTitle}</p>
//                   <p><span className="font-medium">Date:</span> {bookingDetails.bookingSummary.formattedDate}</p>
//                   <p><span className="font-medium">Time:</span> {bookingDetails.bookingSummary.formattedTime}</p>
//                   <p><span className="font-medium">Venue:</span> {bookingDetails.eventDetails.address}</p>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Booking Summary</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">User ID:</span> {bookingDetails.userDetails.userId}</p>
//                   <p><span className="font-medium">Slot Name:</span> {bookingDetails.slotDetails.slotName}</p>
//                   <p><span className="font-medium">Slot ID:</span> {bookingDetails.slotDetails.slotId}</p>
//                   <p><span className="font-medium">Available Seats:</span> {bookingDetails.slotDetails.availableSeats} / {bookingDetails.slotDetails.totalSeats}</p>
//                   <p><span className="font-medium">Number of Tickets:</span> {bookingDetails.bookingSummary.numberOfTickets}</p>
//                   <p><span className="font-medium">Price per Ticket:</span> ₹{bookingDetails.bookingSummary.pricePerTicket}</p>
//                   <p className="text-lg"><span className="font-bold">Total Amount:</span> <span className="text-green-600 font-bold">₹{bookingDetails.bookingSummary.totalAmount}</span></p>
//                 </div>
//               </div>
//             </div>

//             {/* Raw JSON Display */}
//             {/* <div className="mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Raw JSON Data</h3>
//               <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-96">
//                 <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//                   {JSON.stringify(bookingDetails, null, 2)}
//                 </pre>
//               </div>
//             </div> */}

//             {/* Action Buttons */}
//             <div className="mt-4 text-center space-x-4">
             
//               <button
//                 onClick={() => {
//                   setShowBookingDetails(false);
//                   setBookingDetails(null);
//                   setSelectedSlot('');
//                   setSeatsCount(1);
//                 }}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Make Another Booking
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import useStore from '@/lib/Zustand';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface BookingPageProps {
  params: {
    slug: string;
  };
}
 
interface Slot {
  slot_id: string;
  slot_name: string;
  start_time: string;
  end_time: string;
  price: number;
  capacity: number;
  duration: number;
  date: string;
}
 
interface BookingData {
  event_id: string;
  slot_id: string;
  slot_name: string;
  selected_date: string;
  seats_count: number;
}
 
const BookingPageContent = ({ params }: BookingPageProps) => {
  const { slug } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, isAuthenticated, checkAuth } = useStore();
  console.log(userId,isAuthenticated)
  const [event, setEvent] = useState<any>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [seatsCount, setSeatsCount] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotId, setSlotId] = useState<string>('');
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  
  // Alert Dialog states
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');
  
  const { profile, fetchProfile } = useProfileStore();
 
  // Get selected date and slot_id from URL params if available
  useEffect(() => {
    const dateParam = searchParams.get('date');
    const slotIdParam = searchParams.get('slug_id');
   
    console.log('URL Params:', { dateParam, slotIdParam });
   
    if (dateParam) {
      console.log('Setting selectedDate from URL:', dateParam);
      setSelectedDate(dateParam);
    }
    if (slotIdParam) {
      setSlotId(slotIdParam);
    }
    setUrlParamsProcessed(true);
  }, [searchParams]);
 
 
  // Check authentication on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing authentication check in BookingPage...');
      await checkAuth();
      setAuthChecked(true);
    };
 
    initializeAuth();
  }, []);
 
  // Redirect if not authenticated (only after auth check is complete)
  useEffect(() => {
    if (authChecked && !isAuthenticated && !userId) {
      console.log('🚫 Not authenticated, redirecting to login');
      router.push('/login');
      return;
    }
  }, [authChecked, isAuthenticated, userId, router]);
 
  // Fetch event details
  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`);
      const eventData = response.data.data;
      setEvent(eventData);
     
      // Only set event start date if no date is selected from URL params
      if (!selectedDate) {
        const eventDate = new Date(eventData.start_date).toISOString().split('T')[0];
        console.log('Setting selectedDate from event start_date:', eventDate);
        setSelectedDate(eventDate);
      } else {
        console.log('selectedDate already set, not overriding:', selectedDate);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };
 
  // Parse slots from event data
  const parseSlots = (event: any, selectedDate: string) => {
    if (!event || !event.slots || !event.slots[0] || !event.slots[0].slot_data) {
      return [];
    }
 
    const slotData = event.slots[0].slot_data;
    const dateSlots = slotData[selectedDate];
   
    if (!dateSlots) {
      return [];
    }
 
    // Convert slot_1, slot_2, etc. into array format
    const slotsArray = Object.entries(dateSlots).map(([slotKey, slotValue]: [string, any]) => ({
      slot_id: event.slots[0].slot_id,
      slot_name: slotKey, // slot_1, slot_2, etc.
      start_time: slotValue.start_time,
      end_time: slotValue.end_time,
      price: slotValue.price,
      capacity: slotValue.capacity,
      duration: slotValue.duration,
      date: selectedDate
    }));
 
    return slotsArray;
  };
 
  // Get available dates from event data
  const getAvailableDates = (event: any) => {
    if (!event || !event.slots || !event.slots[0] || !event.slots[0].slot_data) {
      return [];
    }
 
    const slotData = event.slots[0].slot_data;
    console.log(slotData)
    return Object.keys(slotData).sort();
  };
 
 
  useEffect(() => {
    if (slug && urlParamsProcessed && authChecked && isAuthenticated) {
      fetchEvent();
      fetchProfile()
    }
  }, [slug, urlParamsProcessed, authChecked, isAuthenticated]);
 
  // Set initial date if not provided in URL params
  useEffect(() => {
    if (event && !selectedDate) {
      const availableDates = getAvailableDates(event);
      if (availableDates.length > 0) {
        console.log('Setting initial date:', availableDates[0]);
        setSelectedDate(availableDates[0]);
      }
    }
  }, [event, selectedDate]);
   useEffect(() => {
    setSeatsCount(1);
  }, [selectedSlot]);
  useEffect(() => {
    if (event && selectedDate) {
      console.log('Parsing slots for date:', selectedDate);
      const parsedSlots = parseSlots(event, selectedDate);
      console.log('Parsed slots:', parsedSlots);
      setSlots(parsedSlots);
     
      // Auto-select first slot if only one exists
      if (parsedSlots.length === 1) {
        setSelectedSlot(parsedSlots[0].slot_name);
      }
      setLoading(false);
    }
  }, [event, selectedDate]);
 
  const handleBooking = async () => {
    if (!selectedSlot || !event) {
      alert('Please select a time slot');
      return;
    }
 
    // Find the selected slot details
    const selectedSlotDetails = slots.find(slot => slot.slot_name === selectedSlot);
    
    // Calculate total amount
    const pricePerSeat = selectedSlotDetails?.price || 0;
    const totalPrice = pricePerSeat * seatsCount;

    // Prepare API payload according to your specification
    const apiPayload = {
      user_id: userId,
      event_id: event.event_id,
      num_seats: seatsCount,
      price_per_seat: pricePerSeat,
      total_price: totalPrice,
      slot: selectedSlot, // Using slot name (slot_1, slot_2, etc.)
      booking_date: selectedDate
    };
 
    try {
      setBookingLoading(true);
      
      console.log('Making booking API call with payload:', apiPayload);
      
      // Make the API call
      const response = await axiosInstance.post('/api/v1/bookings', apiPayload);
      
      console.log('Booking API response:', response.data);
      
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        // Store booking ID and show confirmation dialog
        const responseBookingId = response.data.data?.booking_id || response.data.booking_id || '';
        setBookingId(responseBookingId);
        setShowConfirmDialog(true);
        
        // Prepare detailed booking information for display
        const detailedBookingInfo = {
          apiResponse: response.data,
          bookingData: apiPayload,
          userDetails: {
            username: profile?.username,
            userId: userId,
            isAuthenticated: isAuthenticated
          },
          eventDetails: {
            eventId: event.event_id,
            eventTitle: event.event_title,
            eventImage: event.card_image,
            address: event.extra_data?.address
          },
          slotDetails: {
            slotId: selectedSlotDetails?.slot_id || event.slot_id,
            slotName: selectedSlotDetails?.slot_name || 'Unknown Slot',
            slotNumber: selectedSlot,
            startTime: selectedSlotDetails?.start_time || '',
            endTime: selectedSlotDetails?.end_time || '',
            pricePerTicket: pricePerSeat,
            availableSeats: selectedSlotDetails?.capacity || 0,
            totalSeats: selectedSlotDetails?.capacity || 0,
            duration: selectedSlotDetails?.duration || 0
          },
          bookingSummary: {
            selectedDate: selectedDate,
            numberOfTickets: seatsCount,
            pricePerTicket: pricePerSeat,
            totalAmount: totalPrice,
            formattedDate: formatDate(selectedDate),
            formattedTime: selectedSlotDetails ? `${formatTime(selectedSlotDetails.start_time)} - ${formatTime(selectedSlotDetails.end_time)}` : ''
          },
          timestamp: new Date().toISOString()
        };
        
        // Display the booking details
        setBookingDetails(detailedBookingInfo);
        setShowBookingDetails(true);
        
      } else {
        // API returned success status but not 200/201
        const errorMessage = response.data.message || 'Booking failed. Please try again.';
        window.alert(`Booking Failed: ${errorMessage}`);
      }
     
    } catch (error: any) {
      console.error('Booking error:', error);
      
      // Error popup
      const errorMessage = error.response?.data?.message || 'Booking failed. Please try again.';
      window.alert(`Booking Failed: ${errorMessage}`);
      
    } finally {
      setBookingLoading(false);
    }
  };

  // Handle Yes response - send booking_status: 1
  const handleConfirmYes = async () => {
    setShowConfirmDialog(false);
    
    try {
      const statusPayload = {
        booking_status: "approved"
      };
      
      console.log(`Calling status API: /api/v1/bookings/status/${bookingId} with payload:`, statusPayload);
      
      const response = await axiosInstance.patch(`/api/v1/bookings/status/${bookingId}`, statusPayload);
      
      console.log('Status API response:', response.data);
      
     toast.success('Booking confirmed successfully!');
      
    } catch (error: any) {
      console.error('Status API error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update booking status';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  // Handle No response - send booking_status: -1
  const handleConfirmNo = async () => {
    setShowConfirmDialog(false);
    
    try {
      const statusPayload = {
        booking_status: "failed"
      };
      
      console.log(`Calling status API: /api/v1/bookings/status/${bookingId} with payload:`, statusPayload);
      
      const response = await axiosInstance.patch(`/api/v1/bookings/status/${bookingId}`, statusPayload);
      
      console.log('Status API response:', response.data);
      
      toast.success('Booking cancelled successfully!');
      
    } catch (error: any) {
      console.error('Status API error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update booking status';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
 
  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
 
  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Checking authentication...</div>
      </div>
    );
  }
 
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading event details...</div>
      </div>
    );
  }
console.log(slots)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={event.card_image}
              alt={event.event_title}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{event.event_title}</h1>
              <p className="text-gray-600 mb-4">{event.extra_data?.description}</p>
             
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{event.extra_data?.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BsCalendar2EventFill className="text-purple-500" />
                  <span>{formatDate(selectedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Date Selection */}
        {!showBookingDetails && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          {event ? (
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-fit"
            >
              <option value="">Select a date</option>
              {getAvailableDates(event).map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-gray-500">Loading available dates...</div>
          )}
        </div>
        )}
 
        {/* Slots Selection */}
        {!showBookingDetails && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
         
          {loading ? (
            <div className="text-center py-8">Loading available slots...</div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No slots available for the selected date
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <div
                  key={slot.slot_name}
                  onClick={() => {
                    console.log('Selected slot:', slot.slot_name);
                    setSelectedSlot(slot.slot_name);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSlot === slot.slot_name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${slot.capacity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{slot.slot_name}</h3>
                    <span className="text-lg font-bold text-purple-600">
                      ${slot.price}
                    </span>
                  </div>
                 
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock />
                    <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
                  </div>
                 
                  <div className="text-sm">
                    <span className={`${slot.capacity > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                      {slot.capacity} seats available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
 
        {/* Seats Selection */}
             {!showBookingDetails && selectedSlot && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Number of Seats</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{seatsCount}</span>
           <button
  onClick={() => {
  const selectedSlotData = slots.find(s => s.slot_name === selectedSlot);

  if (selectedSlotData && seatsCount < selectedSlotData.capacity) {
    setSeatsCount(seatsCount + 1);
  }
}}
  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
>
  +
</button>

             </div>
           </div>
        )}
 
        {/* Booking Summary */}
        {selectedSlot && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            {(() => {
              const selectedSlotData = slots.find(s => s.slot_name === selectedSlot);
              const totalPrice = selectedSlotData ? selectedSlotData.price * seatsCount : 0;
             
              return (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Event:</span>
                    <span className="font-semibold">{event.event_title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedSlotData ? `${formatTime(selectedSlotData.start_time)} - ${formatTime(selectedSlotData.end_time)}` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span>{seatsCount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-purple-600">${totalPrice}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
 
        {/* Book Button */}
        {!showBookingDetails && (
        <div className="text-center">
          <button
            onClick={handleBooking}
            disabled={!selectedSlot || bookingLoading}
            className={`px-8 py-3 rounded-lg text-white font-semibold text-lg ${
              !selectedSlot || bookingLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {bookingLoading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
        )}
 
        {/* Booking Details Display */}
        {showBookingDetails && bookingDetails && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-600">Booking Details</h2>
              <button
                onClick={() => setShowBookingDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
           
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Event Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Event:</span> {bookingDetails.eventDetails.eventTitle}</p>
                  <p><span className="font-medium">Date:</span> {bookingDetails.bookingSummary.formattedDate}</p>
                  <p><span className="font-medium">Time:</span> {bookingDetails.bookingSummary.formattedTime}</p>
                  <p><span className="font-medium">Venue:</span> {bookingDetails.eventDetails.address}</p>
                </div>
              </div>
             
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Booking Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">User name:</span> {bookingDetails.userDetails.username}</p>
                  <p><span className="font-medium">Slot Name:</span> {bookingDetails.slotDetails.slotName}</p>
             
                  <p><span className="font-medium">Available Seats:</span> {bookingDetails.slotDetails.availableSeats} / {bookingDetails.slotDetails.totalSeats}</p>
                  <p><span className="font-medium">Number of Tickets:</span> {bookingDetails.bookingSummary.numberOfTickets}</p>
                  <p><span className="font-medium">Price per Ticket:</span> ${bookingDetails.bookingSummary.pricePerTicket}</p>
                  <p className="text-lg"><span className="font-bold">Total Amount:</span> <span className="text-green-600 font-bold">${bookingDetails.bookingSummary.totalAmount}</span></p>
                </div>
              </div>
            </div>
 
            {/* Raw JSON Display */}
            {/* <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Raw JSON Data</h3>
              <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(bookingDetails, null, 2)}
                </pre>
              </div>
            </div> */}
 
            {/* Action Buttons */}
            <div className="mt-4 text-center space-x-4">
             
              <button
                onClick={() => {
                  setShowBookingDetails(false);
                  setBookingDetails(null);
                  setSelectedSlot('');
                  setSeatsCount(1);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Dialog - Shows after booking API success */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Booking Created</AlertDialogTitle>
              <AlertDialogDescription>
                Your booking has been created. Do you want to confirm it?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleConfirmNo}>No</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmYes}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
 
const BookingPage = ({ params }: BookingPageProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking page...</p>
        </div>
      </div>
    }>
      <BookingPageContent params={params} />
    </Suspense>
  );
};

export default BookingPage;
 