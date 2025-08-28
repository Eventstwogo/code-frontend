// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Calendar,
//   Clock,
//   Hash,
//   MapPin,
//   Ticket,
//   User,
//   Building2,
//   Download,
//   Share2,
// } from "lucide-react";
// import { toast } from "sonner";
// import { useBookingStore } from "@/lib/ZustanStore/bookingStore";
// import { useProfileStore } from "@/lib/ZustanStore/usermanagement";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function BookingConfirmationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId");
//   const [bookingDetails, setBookingDetails] = useState<any>(null);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const { fetchBookingDetails, error: bookingsError } = useBookingStore();
//   const { profile, fetchProfile } = useProfileStore();

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   useEffect(() => {
//     if (orderId) {
//       const loadBookingDetails = async () => {
//         try {
//           const booking = await fetchBookingDetails(orderId);
//           setBookingDetails(booking);
//           toast.success(`Booking details for ${booking?.event.title} loaded!`);
//         } catch (err) {
//           toast.error("Failed to fetch booking details");
//           router.push("/bookings");
//         }
//       };
//       loadBookingDetails();
//     } else {
//       toast.error("No order ID provided");
//       router.push("/bookings");
//     }
//   }, [orderId, fetchBookingDetails, router]);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-AU", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const formatAUD = (amount: number) => {
//     return new Intl.NumberFormat("en-AU", {
//       style: "currency",
//       currency: "AUD",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-emerald-100 text-emerald-800 border-emerald-300";
//       case "processing":
//         return "bg-amber-100 text-amber-800 border-amber-300";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-300";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-300";
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return "bg-green-100 text-green-800 border-green-300";
//       case "pending":
//         return "bg-orange-100 text-orange-800 border-orange-300";
//       case "failed":
//         return "bg-red-100 text-red-800 border-red-300";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-300";
//     }
//   };

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);
//     try {
//       // Simulate PDF generation (integrate with actual PDF generation logic if available)
//       toast.info("Generating PDF...");
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock async operation
//       toast.success("PDF downloaded successfully!");
//     } catch (error) {
//       toast.error("Failed to download PDF");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: `Booking Confirmation for ${bookingDetails?.event.title}`,
//         text: `View your booking details for ${bookingDetails?.event.title} on ${formatDate(bookingDetails?.event.event_date)}.`,
//         url: window.location.href,
//       }).catch(() => {
//         toast.error("Failed to share confirmation");
//       });
//     } else {
//       toast.info("Copying link to clipboard...");
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Link copied to clipboard!");
//     }
//   };

//   const handleAddToCalendar = () => {
//     // Placeholder for calendar integration
//     toast.info("Add to Calendar feature coming soon!");
//   };

//   if (bookingsError) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center px-4">
//         <Card className="max-w-md w-full shadow-lg border-red-300 rounded-2xl">
//           <CardContent className="p-8 text-center">
//             <h3 className="text-xl font-semibold text-red-800 mb-3">
//               Error Loading Booking
//             </h3>
//             <p className="text-red-600 text-sm mb-6">{bookingsError}</p>
//             <div className="flex justify-center gap-4">
//               <Button
//                 onClick={() => router.push("/bookings")}
//                 className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
//                 aria-label="Return to bookings page"
//               >
//                 Back to Bookings
//               </Button>
//               <Button
//                 onClick={() => window.location.reload()}
//                 variant="outline"
//                 className="border-red-300 text-red-700 hover:bg-red-50 rounded-lg"
//                 aria-label="Retry loading booking details"
//               >
//                 Retry
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!bookingDetails) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center px-4">
//         <Card className="max-w-3xl w-full shadow-lg rounded-2xl">
//           <CardContent className="p-8">
//             <div className="space-y-6">
//               <Skeleton className="h-12 w-32 mx-auto" />
//               <Skeleton className="h-8 w-3/4 mx-auto" />
//               <div className="space-y-4">
//                 {[...Array(4)].map((_, i) => (
//                   <Skeleton key={i} className="h-10 w-full" />
//                 ))}
//               </div>
//               <Skeleton className="h-10 w-1/2 mx-auto" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <Card className="bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
//           {/* Hero Section */}
//           <div className="relative h-48 sm:h-64">
//             <Image
//               src={bookingDetails.event.card_image || "/images/event-placeholder.png"}
//               alt={bookingDetails.event.title}
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//             <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
//               <h1 className="text-2xl sm:text-3xl font-bold text-white">
//                 {bookingDetails.event.title}
//               </h1>
//               <p className="text-sm sm:text-base text-gray-200">
//                 Confirmation #{bookingDetails.order_id.slice(-8).toUpperCase()}
//               </p>
//             </div>
//           </div>

//           <CardContent className="p-6 sm:p-8">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <Image
//                 src="https://events2go.syd1.cdn.digitaloceanspaces.com/events2go.png"
//                 alt="Events2Go Logo"
//                 width={140}
//                 height={70}
//                 className="mx-auto mb-4"
//               />
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                 Booking Confirmation
//               </h2>
//               <p className="text-gray-600 mt-2 text-sm sm:text-base">
//                 Thank you for booking with {bookingDetails.event.organizer_name}!
//               </p>
//             </div>

//             {/* Event Details */}
//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Calendar className="w-6 h-6 text-blue-600" />
//                 Event Details
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <span className="text-sm text-gray-500 block">Date</span>
//                     <p className="text-gray-900 font-medium">
//                       {formatDate(bookingDetails.event.event_date)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <span className="text-sm text-gray-500 block">Time</span>
//                     <p className="text-gray-900 font-medium">
//                       {bookingDetails.event.event_time} ({bookingDetails.event.event_duration})
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <span className="text-sm text-gray-500 block">Venue</span>
//                     <p className="text-gray-900 font-medium">
//                       {bookingDetails.event.address}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Building2 className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <span className="text-sm text-gray-500 block">Organizer</span>
//                     <p className="text-gray-900 font-medium">
//                       {bookingDetails.event.organizer_name}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Summary */}
//             <div className="bg-blue-50 rounded-xl p-6 mb-6">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Ticket className="w-6 h-6 text-blue-600" />
//                 Booking Summary
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">Order ID</span>
//                   <span className="font-mono text-sm text-gray-900 bg-white px-3 py-1 rounded-lg">
//                     {bookingDetails.order_id}
//                   </span>
//                 </div>
//                 {bookingDetails.payment_reference && (
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-500">Payment Reference</span>
//                     <span className="font-mono text-sm text-gray-900 bg-white px-3 py-1 rounded-lg">
//                       {bookingDetails.payment_reference}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">Booking Status</span>
//                   <Badge className={`${getStatusColor(bookingDetails.booking_status)} font-medium text-sm px-3 py-1`}>
//                     {bookingDetails.booking_status}
//                   </Badge>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">Payment Status</span>
//                   <Badge className={`${getPaymentStatusColor(bookingDetails.payment_status)} font-medium text-sm px-3 py-1`}>
//                     {bookingDetails.payment_status}
//                   </Badge>
//                 </div>
//                 <div className="mt-4">
//                   <h4 className="text-sm font-semibold text-gray-900 mb-3">
//                     Tickets
//                   </h4>
//                   {bookingDetails.seat_categories.map((seat: any, index: number) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div>
//                         <span className="font-medium text-gray-900">{seat.label}</span>
//                         <span className="text-sm text-gray-500 ml-2">× {seat.num_seats}</span>
//                       </div>
//                       <span className="font-bold text-blue-600">
//                         {formatAUD(seat.price_per_seat * seat.num_seats)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center pt-4 border-t border-blue-200">
//                   <span className="text-lg font-bold text-gray-900">Total</span>
//                   <span className="text-xl font-bold text-blue-600">
//                     {formatAUD(bookingDetails.total_amount)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
//               <Button
//                 onClick={handleDownloadPDF}
//                 disabled={isDownloading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 flex items-center gap-2"
//                 aria-label="Download booking confirmation as PDF"
//               >
//                 <Download className="w-5 h-5" />
//                 {isDownloading ? "Downloading..." : "Download PDF"}
//               </Button>
//               <Button
//                 onClick={handleShare}
//                 variant="outline"
//                 className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg px-6 flex items-center gap-2"
//                 aria-label="Share booking confirmation"
//               >
//                 <Share2 className="w-5 h-5" />
//                 Share Confirmation
//               </Button>
//               <Button
//                 onClick={handleAddToCalendar}
//                 variant="outline"
//                 className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg px-6 flex items-center gap-2"
//                 aria-label="Add event to calendar"
//               >
//                 <Calendar className="w-5 h-5" />
//                 Add to Calendar
//               </Button>
//             </div> */}

//             {/* Footer */}
//             <div className="text-center border-t border-gray-200 pt-6">
//               <p className="text-sm text-gray-600 mb-4">
//                 Please present this confirmation at the venue entrance. For any inquiries, contact support at{" "}
//                 <a href="mailto:support@events2go.com" className="text-blue-600 hover:underline">
//                   support@events2go.com
//                 </a>.
//               </p>
//               <Button
//                 onClick={() => router.push("/Profile/Bookings")}
//                 variant="outline"
//                 className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6"
//                 aria-label="Return to bookings page"
//               >
//                 Back to Bookings
//               </Button>
//               <div className="mt-6 text-sm text-gray-500">
//                 <p>Powered by Events2Go</p>
//                 {/* <div className="flex justify-center gap-4 mt-2">
//                   <a href="https://twitter.com/events2go" className="text-blue-600 hover:underline" aria-label="Follow Events2Go on Twitter">Twitter</a>
//                   <a href="https://facebook.com/events2go" className="text-blue-600 hover:underline" aria-label="Follow Events2Go on Facebook">Facebook</a>
//                   <a href="https://instagram.com/events2go" className="text-blue-600 hover:underline" aria-label="Follow Events2Go on Instagram">Instagram</a>
//                 </div> */}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useBookingStore } from "@/lib/ZustanStore/bookingStore";
import { useProfileStore } from "@/lib/ZustanStore/usermanagement";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const { fetchBookingDetails, error: bookingsError } = useBookingStore();
  const { fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (orderId) {
      const loadBookingDetails = async () => {
        try {
          const booking = await fetchBookingDetails(orderId);
          setBookingDetails(booking);
          toast.success(`Booking details for ${booking?.event.title} loaded!`);
        } catch (err) {
          toast.error("Failed to fetch booking details");
          router.push("/bookings");
        }
      };
      loadBookingDetails();
    } else {
      toast.error("No order ID provided");
      router.push("/bookings");
    }
  }, [orderId, fetchBookingDetails, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes} PM`;
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (bookingsError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              Error Loading Booking
            </h3>
            <p className="text-red-600 text-sm mb-6">{bookingsError}</p>
            <Button
              onClick={() => router.push("/Profile/Bookings")}
              className="bg-blue-600 text-white rounded-lg px-6"
            >
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-32 mx-auto" />
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/2 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/Profile/Bookings")}
          className="flex justify-start gap-2 text-gray-700 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bookings
        </Button>
        <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="https://events2go.syd1.cdn.digitaloceanspaces.com/events2go.png"
                alt="Logo"
                width={90}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Movie/Event Details */}
            <div className="bg-purple-100 border border-purple-200 p-4 rounded-lg mb-6 text-center">
              <h1 className="text-xl font-bold mb-1">
                {bookingDetails.event.title} (U)
              </h1>
              <p className="text-sm text-gray-700">
                {bookingDetails.event.language || "English"}
              </p>
              <p className="text-sm text-gray-700">
                {formatDate(bookingDetails.event.event_date)} •{" "}
                {formatTime(bookingDetails.event.event_time)}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {bookingDetails.event.address}
              </p>
            </div>

            {/* Event Poster + Tickets Info */}
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src={
                  bookingDetails.event.card_image ||
                  "/images/event-placeholder.png"
                }
                alt={bookingDetails.event.title}
                width={160}
                height={160}
                className="rounded-lg shadow-md mb-4"
              />
              <div>
                <p className="text-sm text-gray-600">
                  {bookingDetails.seat_categories.reduce(
                    (acc: number, seat: any) => acc + seat.num_seats,
                    0
                  )}{" "}
                  Ticket(s)
                </p>
                <p className="text-sm font-semibold">
                  {bookingDetails.seat_categories
                    .map((seat: any) => seat.label)
                    .join(", ")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Booking ID:{" "}
                  <span className="font-medium">{bookingDetails.order_id}</span>
                </p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-purple-100 border border-purple-200 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-gray-900">
                {formatINR(bookingDetails.total_amount)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
