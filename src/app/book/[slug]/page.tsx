
'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import useStore from '@/lib/Zustand';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SeatCategory {
  seat_category_id: string;
  label: string;
  price: number;
  totalTickets: number;
  booked: number;
  held: number;
  available: number;
}

interface Slot {
  slot_id: string;
  slot_name: string;
  start_time: string;
  end_time: string;
  duration: string;
  date: string;
  seatCategories: SeatCategory[];
}

const BookingPageContent = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, isAuthenticated, checkAuth } = useStore();
  const [event, setEvent] = useState<any>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedSeatCategory, setSelectedSeatCategory] = useState<string>('');
  const [seatsCount, setSeatsCount] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotId, setSlotId] = useState<string>('');
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { profile, fetchProfile } = useProfileStore();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0); // Changed to store percentage
  const [couponStatus, setCouponStatus] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  useEffect(() => {
    if (selectedSlot && selectedSeatCategory) {
      const selectedSlotData = slots.find((s) => s.slot_name === selectedSlot);
      const selectedCategoryData = selectedSlotData?.seatCategories.find(
        (c) => c.seat_category_id === selectedSeatCategory
      );

      if (selectedCategoryData) {
        const basePrice = selectedCategoryData.price * seatsCount;
        const discountAmount = couponStatus && isCouponApplied ? (discountPercentage / 100) * basePrice : 0;
        const finalPrice = basePrice - discountAmount;
        setTotalPrice(finalPrice >= 0 ? finalPrice : 0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [selectedSlot, selectedSeatCategory, seatsCount, slots, discountPercentage, couponStatus, isCouponApplied]);

  // Reset coupon and discount when slot or seat category changes
  useEffect(() => {
    setCouponCode('');
    setDiscountPercentage(0);
    setCouponStatus(false);
    setIsCouponApplied(false);
  }, [selectedSlot, selectedSeatCategory]);

  useEffect(() => {
    const dateParam = searchParams.get('date');
    const slotIdParam = searchParams.get('slug_id');
    if (dateParam) {
      setSelectedDate(dateParam);
    }
    if (slotIdParam) {
      setSlotId(slotIdParam);
    }
    setUrlParamsProcessed(true);
  }, [searchParams]);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !isAuthenticated && !userId) {
      router.push('/login');
      return;
    }
  }, [authChecked, isAuthenticated, userId, router]);

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/new-events/slug/${slug}`);
      const eventData = response.data.data;
      setEvent(eventData);
      if (!selectedDate) {
        const eventDate = new Date(eventData.event_dates[0]).toISOString().split('T')[0];
        setSelectedDate(eventDate);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  
  //   if (!event || !event.slots || !event.slots[0] || !event.slots[0].slot_data) {
  //     return [];
  //   }

  //   const slotData = event.slots[0].slot_data[selectedDate];
  //   if (!slotData) {
  //     return [];
  //   }

  //   return slotData.map((slot: any) => ({
  //     slot_id: slot.slot_id,
  //     slot_name: `${slot.slot_id}`,
  //     start_time: slot.time,
  //     end_time: slot.end_time,
  //     duration: slot.duration,
  //     date: selectedDate,
  //     seatCategories: slot.seatCategories.map((category: any) => ({
  //       seat_category_id: category.seat_category_id,
  //       label: category.label,
  //       price: category.price,
  //       totalTickets: category.totalTickets,
  //       booked: category.booked,
  //       held: category.held,
  //       available: category.totalTickets - category.booked - category.held,
  //     })),
  //   }));
  // };

const parseSlots = (event: any, selectedDate: string) => {
  if (!event || !event.slots || !event.slots[0] || !event.slots[0].slot_data) {
    return [];
  }

  const slotData = event.slots[0].slot_data[selectedDate];
  if (!slotData) {
    return [];
  }

  // Current date and time in IST
  const now = new Date(); // Current date: 2025-08-20 17:24:00 IST
  const currentDateStr = now.toISOString().split('T')[0]; // e.g., "2025-08-20"
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

  return slotData
    .filter((slot: any) => {
      // Parse slot start time (e.g., "10:00 AM")
      const timeParts = slot.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeParts) {
        return false; // Invalid time format
      }

      let [_, hours, minutes, period] = timeParts;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);

      // Convert 12-hour format to 24-hour format
      if (period.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }

      const slotTimeInMinutes = hours * 60 + minutes;

      // Check if slot is in the future
      if (selectedDate < currentDateStr) {
        return false; // Past date
      }
      if (selectedDate === currentDateStr && slotTimeInMinutes <= currentTime) {
        return false; // Past time on current date
      }
      return true; // Future slot
    })
    .map((slot: any) => ({
      slot_id: slot.slot_id,
      slot_name: `${slot.slot_id}`,
      start_time: slot.time,
      end_time: slot.end_time,
      duration: slot.duration,
      date: selectedDate,
      seatCategories: slot.seatCategories.map((category: any) => ({
        seat_category_id: category.seat_category_id,
        label: category.label,
        price: category.price,
        totalTickets: category.totalTickets,
        booked: category.booked,
        held: category.held,
        available: category.totalTickets - category.booked - category.held,
      })),
    }));
};
  const getAvailableDates = (event: any) => {
    if (!event || !event.slots || !event.slots[0] || !event.slots[0].slot_data) {
      return [];
    }
    return Object.keys(event.slots[0].slot_data).sort();
  };

  useEffect(() => {
    if (slug && urlParamsProcessed && authChecked && isAuthenticated) {
      fetchEvent();
      fetchProfile();
    }
  }, [slug, urlParamsProcessed, authChecked, isAuthenticated]);

  useEffect(() => {
    if (event && !selectedDate) {
      const availableDates = getAvailableDates(event);
      if (availableDates.length > 0) {
        setSelectedDate(availableDates[0]);
      }
    }
  }, [event, selectedDate]);

  useEffect(() => {
    setSeatsCount(1);
    setSelectedSeatCategory('');
  }, [selectedSlot]);

  useEffect(() => {
    if (event && selectedDate) {
      const parsedSlots = parseSlots(event, selectedDate);
      setSlots(parsedSlots);
      if (parsedSlots.length === 1) {
        setSelectedSlot(parsedSlots[0].slot_id);
      }
      setLoading(false);
    }
  }, [event, selectedDate]);
console.log('slots', slots);
  const handleBooking = async () => {
    if (!selectedSlot || !selectedSeatCategory || !event) {
      toast.error('Please select a time slot and seat category');
      return;
    }

    const selectedSlotDetails = slots.find(slot => slot.slot_name === selectedSlot);
    const selectedCategory = selectedSlotDetails?.seatCategories.find(
      category => category.seat_category_id === selectedSeatCategory
    );

    if (!selectedCategory) {
      toast.error('Invalid seat category selected');
      return;
    }

    const apiPayload = {
      user_ref_id: userId,
      event_ref_id: event.event_id,
      total_price: totalPrice,
      slot_ref_id: selectedSlot,
      event_date: selectedDate,
      coupon_status: couponStatus,
      seatCategories: [{
        seat_category_ref_id: selectedCategory.seat_category_id,
        price_per_seat: selectedCategory.price,
        num_seats: seatsCount,
      }]
    };

    
    try {
      setBookingLoading(true);

      const response = await axiosInstance.post(
        "/api/v1/new-bookings/book",
        apiPayload
      );

      const { data, message } = response.data;

      if (data?.approval_url) {
        // Paid booking flow → Redirect to PayPal approval page
        window.location.href = data.approval_url;

      } else if (data?.redirect_url && data?.status === "APPROVED" && data?.payment_status === "COMPLETED") {
        // Free booking flow → Redirect to booking success page
        toast.success(message || "Booking confirmed without payment!");
        window.location.href = data.redirect_url;

      } else {
        toast.error("Unexpected booking response. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Booking failed. Please try again.";
      toast.error(`Booking Failed: ${errorMessage}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const validateCoupon = async () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
    const payload = {
      coupon_code: couponCode,
      event_id: event?.event_id,
      number_of_tickets: seatsCount,
    };
    try {
      const response = await axiosInstance.post('/api/v1/coupons/coupons/validate', payload);
      const discountPercentage = response.data.data.discount;
      setDiscountPercentage(discountPercentage); // Store percentage
      setCouponStatus(true);
      setIsCouponApplied(true);
      toast.success(`Coupon applied! You get a ${discountPercentage}% discount`);
    } catch (error: any) {
      setCouponStatus(false);
      setDiscountPercentage(0);
      setIsCouponApplied(false);
      const errorMessage = error.response?.data?.message || 'Invalid coupon code';
      toast.error(errorMessage);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
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
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BsCalendar2EventFill className="text-purple-500" />
                  <span>{formatDate(selectedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
      {slots.map((slot) => {
        // Check if slot has any available seats
        const totalAvailableSeats = slot.seatCategories.reduce(
          (sum, category) => sum + category.available,
          0
        );
        const isDisabled = totalAvailableSeats === 0;

        return (
          <div
            key={slot.slot_name}
            onClick={() => {
              if (!isDisabled) {
                setSelectedSlot(slot.slot_name);
                setSelectedSeatCategory('');
              }
            }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              isDisabled
                ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                : selectedSlot === slot.slot_name
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FaClock />
              <span>
                {slot.start_time} - {slot.end_time}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Duration: {slot.duration}</span>
            </div>
            {isDisabled && (
              <div className="text-sm text-red-600 mt-2">No seats available</div>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>
        )}

        {!showBookingDetails && selectedSlot && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Seat Category</h2>
            {slots.find((slot) => slot.slot_name === selectedSlot)?.seatCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No seat categories available for this slot
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {slots
  .find((slot) => slot.slot_name === selectedSlot)
  ?.seatCategories.map((category) => (
    <div
      key={category.seat_category_id}
      onClick={() => {
        if (category.available > 0) {
          setSelectedSeatCategory(category.seat_category_id);
        }
      }}
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selectedSeatCategory === category.seat_category_id
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 hover:border-purple-300'
      } ${category.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{category.label}</h3>
        <span className="text-lg font-bold text-purple-600">${category.price}</span>
      </div>
      <div className="text-sm">
        <span
          className={`${
            category.available > 10 ? 'text-green-600' : 'text-orange-600'
          }`}
        >
          {category.available} seats available
        </span>
      </div>
    </div>
  ))}
              </div>
            )}
          </div>
        )}

        {!showBookingDetails && selectedSlot && selectedSeatCategory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Number of Seats</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={isCouponApplied
          
                }
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{seatsCount}</span>
              <button
                onClick={() => {
                  const selectedSlotData = slots.find((s) => s.slot_name === selectedSlot);
                  const selectedCategoryData = selectedSlotData?.seatCategories.find(
                    (c) => c.seat_category_id === selectedSeatCategory
                  );
                  if (
                    selectedCategoryData &&
                    seatsCount < selectedCategoryData.available &&
                    seatsCount < 6
                  ) {
                    setSeatsCount(seatsCount + 1);
                  }
                }}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={isCouponApplied || seatsCount >= 6}
              >
                +
              </button>
            </div>
          </div>
          {isCouponApplied && (
  <p className="text-sm text-gray-600 mt-2">
    Seat count cannot be changed while a coupon is applied. Remove the coupon to adjust the number of seats.
  </p>
)}
        )}

        {selectedSlot && selectedSeatCategory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            {(() => {
              const selectedSlotData = slots.find((s) => s.slot_name === selectedSlot);
              const selectedCategoryData = selectedSlotData?.seatCategories.find(
                (c) => c.seat_category_id === selectedSeatCategory
              );
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
                    <span>
                      {selectedSlotData
                        ? `${(selectedSlotData.start_time)} - ${(
                            selectedSlotData.end_time
                          )}`
                        : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat Category:</span>
                    <span>{selectedCategoryData?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span>{seatsCount}</span>
                  </div>
                  {couponStatus && isCouponApplied && (
                    <div className="flex justify-between">
                      <span>Discount ({discountPercentage}%):</span>
                      <span className="text-red-600">-${((discountPercentage / 100) * (selectedCategoryData?.price * seatsCount)).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              );
            })()}

            {!isCouponApplied && (
              <div className="mt-6">
                <Label>Coupon</Label>
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  className="mt-2"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={() => validateCoupon()} className="mt-4" disabled={!couponCode || bookingLoading}>
                  Apply Coupon
                </Button>
              </div>
            )}
            {isCouponApplied && (
              <div className="mt-6">
                <p className="text-green-600">Coupon "{couponCode}" applied successfully!</p>
                <Button
                  onClick={() => {
                    setCouponCode('');
                    setDiscountPercentage(0);
                    setCouponStatus(false);
                    setIsCouponApplied(false);
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Remove Coupon
                </Button>
              </div>
            )}
          </div>
        )}

        {!showBookingDetails && (
          <div className="text-center">
            <button
              onClick={handleBooking}
              disabled={!selectedSlot || !selectedSeatCategory || bookingLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold text-lg ${
                !selectedSlot || !selectedSeatCategory || bookingLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {bookingLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        )}

        {showBookingDetails && bookingDetails && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-600">Booking Details</h2>
              <button
                onClick={() => {
                  setShowBookingDetails(false);
                  setBookingDetails(null);
                  setSelectedSlot('');
                  setSelectedSeatCategory('');
                  setSeatsCount(1);
                }}
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
                  <p><span className="font-medium">Seat Category:</span> {bookingDetails.slotDetails.seatCategory}</p>
                  <p>
                    <span className="font-medium">Available Seats:</span>{' '}
                    {bookingDetails.slotDetails.availableSeats} / {bookingDetails.slotDetails.totalSeats}
                  </p>
                  <p>
                    <span className="font-medium">Number of Tickets:</span>{' '}
                    {bookingDetails.bookingSummary.numberOfTickets}
                  </p>
                  <p>
                    <span className="font-medium">Price per Ticket:</span> $
                    {bookingDetails.bookingSummary.pricePerTicket}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Total Amount:</span>{' '}
                    <span className="text-green-600 font-bold">
                      {totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking page...</p>
          </div>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
};

export default BookingPage;