'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaDownload, FaShare } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
interface BookingDetails {
  bookingId: string;
  eventTitle: string;
  eventImage: string;
  eventAddress: string;
  selectedDate: string;
  slotName: string;
  startTime: string;
  endTime: string;
  numberOfTickets: number;
  pricePerTicket: number;
  totalAmount: number;
  bookingDate: string;
  userEmail?: string;
  bookingStatus?: string;
  eventId?: string;
  slotId?: string;
}

const BookingSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get booking ID from URL parameters
        const bookingId = searchParams.get('booking_id') || searchParams.get('booking)Id');

        if (!bookingId) {
          // Try to get from localStorage as fallback
          const savedBookingDetails = localStorage.getItem('lastBookingDetails');
          if (savedBookingDetails) {
            setBookingDetails(JSON.parse(savedBookingDetails));
          } else {
            setError('No booking ID provided');
          }
          return;
        }

        // Fetch booking details from API
        const response = await axiosInstance.get(`/api/v1/bookings/${bookingId}`);
        
        if (response.data.statusCode === 200 && response.data.data) {
          const booking = response.data.data;
          
          // Transform API response to match our interface
          const bookingDetails: BookingDetails = {
            bookingId: booking.booking_id?.toString() || bookingId,
            eventTitle: booking.event?.title || 'Event',
            eventImage: booking.event?.card_image ? `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/${booking.event.card_image}` : '/images/placeholder.svg',
            eventAddress: booking.event?.address || 'Address not available',
            selectedDate: booking.booking_date || '',
            slotName: booking.slot || 'Standard Slot',
            startTime: booking.slot_time?.split(' - ')[0] || '',
            endTime: booking.slot_time?.split(' - ')[1] || '',
            numberOfTickets: booking.num_seats || 1,
            pricePerTicket: booking.price_per_seat || 0,
            totalAmount: booking.total_price || 0,
            bookingDate: booking.created_at || new Date().toISOString(),
            userEmail: booking.user?.email,
            bookingStatus: booking.booking_status || 'confirmed',
            eventId: booking.event?.event_id,
            slotId: booking.slot
          };

          setBookingDetails(bookingDetails);
          
          // Save to localStorage for future reference
          localStorage.setItem('lastBookingDetails', JSON.stringify(bookingDetails));
        } else {
          setError('Booking not found');
        }
      } catch (error: any) {
        console.error('Error fetching booking details:', error);
        
        // Try localStorage as fallback
        const savedBookingDetails = localStorage.getItem('lastBookingDetails');
        if (savedBookingDetails) {
          setBookingDetails(JSON.parse(savedBookingDetails));
        } else {
          setError(error.response?.data?.message || 'Failed to load booking details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [searchParams]);

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
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDownloadTicket = () => {
    // Implement ticket download functionality
    toast.success('Ticket download functionality will be implemented here');
  };

  const handleShareBooking = () => {
    if (navigator.share && bookingDetails) {
      navigator.share({
        title: `Booking Confirmed - ${bookingDetails.eventTitle}`,
        text: `I've booked tickets for ${bookingDetails.eventTitle} on ${formatDate(bookingDetails.selectedDate)}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Booking link copied to clipboard!');
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleViewMyBookings = () => {
    router.push('/Profile?tab=bookings');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <div className="text-xl text-gray-600">Loading booking details...</div>
        </div>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <FaTicketAlt className="text-2xl text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Error Loading Booking' : 'Booking Details Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find your booking details. Please check your booking ID or try again."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your tickets have been successfully booked</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <img 
              src={bookingDetails.eventImage} 
              alt={bookingDetails.eventTitle}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{bookingDetails.eventTitle}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{bookingDetails.eventAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BsCalendar2EventFill className="text-purple-500" />
                  <span>{formatDate(bookingDetails.selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-purple-500" />
                  <span>{formatTime(bookingDetails.startTime)} - {formatTime(bookingDetails.endTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold">{bookingDetails.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slot:</span>
                  <span className="font-semibold">{bookingDetails.slotName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Tickets:</span>
                  <span className="font-semibold">{bookingDetails.numberOfTickets}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Ticket:</span>
                  <span className="font-semibold">₹{bookingDetails.pricePerTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-semibold">{formatDate(bookingDetails.bookingDate)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">₹{bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaDownload />
            Download Ticket
          </button>
          <button
            onClick={handleShareBooking}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaShare />
            Share Booking
          </button>
          <button
            onClick={handleViewMyBookings}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTicketAlt />
            My Bookings
          </button>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Email Confirmation Notice */}
        {bookingDetails.userEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <MdEmail className="text-xl" />
              <span className="font-semibold">Email Confirmation Sent</span>
            </div>
            <p className="text-blue-700 mt-1">
              A confirmation email with your ticket details has been sent to {bookingDetails.userEmail}
            </p>
          </div>
        )}

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Information:</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Please arrive at the venue at least 15 minutes before the event starts</li>
            <li>• Carry a valid ID proof along with your ticket</li>
            <li>• Screenshots of tickets are not valid for entry</li>
            <li>• For any queries, contact our support team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BookingSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
};

export default BookingSuccessPage;