'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaTimesCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRedo, FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { MdSupportAgent, MdRefresh } from 'react-icons/md';
import axiosInstance from '@/lib/axiosInstance';

interface FailureDetails {
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
  errorMessage: string;
  errorCode?: string;
  transactionId?: string;
  bookingId?: string;
  eventId?: string;
  slotId?: string;
  eventSlug?: string;
}

const BookingFailurePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [failureDetails, setFailureDetails] = useState<FailureDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFailureDetails = async () => {
      try {
        setLoading(true);
        
        // Check if we have a booking ID to fetch from API
        const bookingId = searchParams.get('booking_id');
        
        if (bookingId) {
          try {
            // Try to fetch booking details from API (might be a failed booking)
            const response = await axiosInstance.get(`/api/v1/bookings/${bookingId}`);
            
            if (response.data.statusCode === 200 && response.data.data) {
              const booking = response.data.data;
              
              setFailureDetails({
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
                errorMessage: booking.booking_status === 'failed' ? 
                  (booking.failure_reason || 'Booking failed') : 
                  'An unexpected error occurred during booking',
                errorCode: booking.error_code || 'BOOKING_FAILED',
                transactionId: booking.paypal_order_id,
                eventId: booking.event?.event_id,
                eventSlug: booking.event?.slug,
                slotId: booking.slot_id || booking.slot
              });
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('Could not fetch booking from API, using URL parameters');
          }
        }
        
        // Fallback to URL parameters
        const eventTitle = searchParams.get('eventTitle');
        const eventImage = searchParams.get('eventImage');
        const eventAddress = searchParams.get('eventAddress');
        const selectedDate = searchParams.get('selectedDate');
        const slotName = searchParams.get('slotName');
        const startTime = searchParams.get('startTime');
        const endTime = searchParams.get('endTime');
        const numberOfTickets = searchParams.get('numberOfTickets');
        const pricePerTicket = searchParams.get('pricePerTicket');
        const totalAmount = searchParams.get('totalAmount');
        const errorMessage = searchParams.get('errorMessage');
        const errorCode = searchParams.get('errorCode');
        const transactionId = searchParams.get('transactionId');

        if (eventTitle) {
          setFailureDetails({
            bookingId: bookingId || undefined,
            eventTitle: eventTitle,
            eventImage: eventImage || '/images/placeholder.svg',
            eventAddress: eventAddress || 'Address not available',
            selectedDate: selectedDate || '',
            slotName: slotName || 'Standard Slot',
            startTime: startTime || '',
            endTime: endTime || '',
            numberOfTickets: parseInt(numberOfTickets || '1'),
            pricePerTicket: parseFloat(pricePerTicket || '0'),
            totalAmount: parseFloat(totalAmount || '0'),
            errorMessage: errorMessage || 'An unexpected error occurred during booking',
            errorCode: errorCode || undefined,
            transactionId: transactionId || undefined,
            eventSlug: searchParams.get('eventSlug') || undefined,
            eventId: searchParams.get('eventId') || undefined,
            slotId: searchParams.get('slotId') || undefined
          });
        } else {
          // Try to get from localStorage as fallback
          const savedFailureDetails = localStorage.getItem('lastBookingFailure');
          if (savedFailureDetails) {
            setFailureDetails(JSON.parse(savedFailureDetails));
          }
        }
      } catch (error) {
        console.error('Error in fetchFailureDetails:', error);
        // Try localStorage as final fallback
        const savedFailureDetails = localStorage.getItem('lastBookingFailure');
        if (savedFailureDetails) {
          setFailureDetails(JSON.parse(savedFailureDetails));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFailureDetails();
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
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

  const handleRetryBooking = () => {
    // Navigate back to the booking page with the same parameters
    if (failureDetails) {
      if (failureDetails.eventSlug) {
        // Use the event slug from the API response
        const params = new URLSearchParams({
          date: failureDetails.selectedDate,
        });
        
        // Add slot ID if available
        if (failureDetails.slotId) {
          params.append('slug_id', failureDetails.slotId);
        }
        
        router.push(`/book/${failureDetails.eventSlug}?${params.toString()}`);
      } else if (failureDetails.eventId) {
        // Fallback to event ID if slug is not available
        const params = new URLSearchParams({
          date: failureDetails.selectedDate,
        });
        
        // Add slot ID if available
        if (failureDetails.slotId) {
          params.append('slotId', failureDetails.slotId);
        }
        
        router.push(`/book/${failureDetails.eventId}?${params.toString()}`);
      } else {
        // Final fallback - go to home page to find the event
        router.push('/');
      }
    } else {
      // If no failure details, go to home
      router.push('/');
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleContactSupport = () => {
    // Navigate to contact/support page or open support chat
    router.push('/contact');
  };

  const getErrorIcon = () => {
    return <FaTimesCircle className="text-4xl text-red-600" />;
  };

  const getErrorTitle = () => {
    if (failureDetails?.errorCode) {
      switch (failureDetails.errorCode) {
        case 'PAYMENT_FAILED':
          return 'Payment Failed';
        case 'SEATS_UNAVAILABLE':
          return 'Seats No Longer Available';
        case 'EVENT_CANCELLED':
          return 'Event Cancelled';
        case 'NETWORK_ERROR':
          return 'Connection Error';
        default:
          return 'Booking Failed';
      }
    }
    return 'Booking Failed';
  };

  const getErrorDescription = () => {
    if (failureDetails?.errorCode) {
      switch (failureDetails.errorCode) {
        case 'PAYMENT_FAILED':
          return 'Your payment could not be processed. Please check your payment details and try again.';
        case 'SEATS_UNAVAILABLE':
          return 'The selected seats are no longer available. Please choose different seats or time slot.';
        case 'EVENT_CANCELLED':
          return 'This event has been cancelled by the organizer. You will receive a full refund if any payment was made.';
        case 'NETWORK_ERROR':
          return 'There was a connection issue. Please check your internet connection and try again.';
        default:
          return failureDetails?.errorMessage || 'An unexpected error occurred during booking.';
      }
    }
    return failureDetails?.errorMessage || 'An unexpected error occurred during booking.';
  };

  const getSuggestedActions = () => {
    if (failureDetails?.errorCode) {
      switch (failureDetails.errorCode) {
        case 'PAYMENT_FAILED':
          return [
            'Check your payment method details',
            'Ensure sufficient balance in your account',
            'Try using a different payment method',
            'Contact your bank if the issue persists'
          ];
        case 'SEATS_UNAVAILABLE':
          return [
            'Try selecting different seats',
            'Choose a different time slot',
            'Check for other available dates',
            'Book quickly as seats are filling fast'
          ];
        case 'EVENT_CANCELLED':
          return [
            'Look for similar events',
            'Check for rescheduled dates',
            'Contact support for refund details',
            'Subscribe to notifications for future events'
          ];
        case 'NETWORK_ERROR':
          return [
            'Check your internet connection',
            'Try refreshing the page',
            'Clear your browser cache',
            'Try using a different browser'
          ];
        default:
          return [
            'Try booking again',
            'Check your internet connection',
            'Contact support if the issue persists',
            'Try using a different browser'
          ];
      }
    }
    return [
      'Try booking again',
      'Check your internet connection',
      'Contact support if the issue persists'
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!failureDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Booking Information Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find any booking details.</p>
          <button
            onClick={handleBackToHome}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Failure Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            {getErrorIcon()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{getErrorTitle()}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{getErrorDescription()}</p>
        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="flex items-start gap-6 mb-6">
            <img 
              src={failureDetails.eventImage} 
              alt={failureDetails.eventTitle}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{failureDetails.eventTitle}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{failureDetails.eventAddress}</span>
                </div>
                {failureDetails.selectedDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <BsCalendar2EventFill className="text-purple-500" />
                    <span>{formatDate(failureDetails.selectedDate)}</span>
                  </div>
                )}
                {failureDetails.startTime && failureDetails.endTime && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-purple-500" />
                    <span>{formatTime(failureDetails.startTime)} - {formatTime(failureDetails.endTime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Attempted Booking Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Slot:</span>
                  <span className="font-semibold">{failureDetails.slotName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Tickets:</span>
                  <span className="font-semibold">{failureDetails.numberOfTickets}</span>
                </div>
                {failureDetails.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-semibold text-sm">{failureDetails.transactionId}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Ticket:</span>
                  <span className="font-semibold">₹{failureDetails.pricePerTicket}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-red-600">₹{failureDetails.totalAmount}</span>
                </div>
                {failureDetails.errorCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Error Code:</span>
                    <span className="font-semibold text-red-600">{failureDetails.errorCode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleRetryBooking}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaRedo />
            Try Again
          </button>
          <button
            onClick={handleContactSupport}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdSupportAgent />
            Contact Support
          </button>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaHome />
            Back to Home
          </button>
        </div>

        {/* Suggested Actions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FaExclamationTriangle className="text-yellow-600" />
            <h4 className="font-semibold text-yellow-800">What you can do:</h4>
          </div>
          <ul className="text-yellow-700 space-y-2">
            {getSuggestedActions().map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <MdSupportAgent className="text-xl" />
            <span className="font-semibold">Need Help?</span>
          </div>
          <p className="text-blue-700 text-sm">
            If you continue to experience issues, our support team is here to help. 
            Contact us with your transaction details for quick assistance.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-blue-600 text-sm">Support Hours: 24/7</span>
            <span className="text-blue-600 text-sm">•</span>
            <span className="text-blue-600 text-sm">Response Time: Within 2 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFailurePage;