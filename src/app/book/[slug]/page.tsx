'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import useStore from '@/lib/Zustand';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { BsCalendar2EventFill } from 'react-icons/bs';

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
  available_seats: number;
  total_seats: number;
}

interface BookingData {
  event_id: string;
  slot_id: string;
  selected_date: string;
  seats_count: number;
}

const BookingPage = ({ params }: BookingPageProps) => {
  const { slug } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, isAuthenticated } = useStore();
  
  const [event, setEvent] = useState<any>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [seatsCount, setSeatsCount] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotId, setSlotId] = useState<string>('');

  // Get selected date and slot_id from URL params if available
  useEffect(() => {
    const dateParam = searchParams.get('date');
    const slotIdParam = searchParams.get('slug_id');
    
    console.log('URL Params:', { dateParam, slotIdParam });
    
    if (dateParam) {
      setSelectedDate(dateParam);
    }
    if (slotIdParam) {
      setSlotId(slotIdParam);
    }
  }, [searchParams]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !userId) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, userId, router]);

  // Fetch event details
  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`);
      const eventData = response.data.data;
      setEvent(eventData);
      
      // If no date selected, use event start date
      if (!selectedDate) {
        const eventDate = new Date(eventData.start_date).toISOString().split('T')[0];
        setSelectedDate(eventDate);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  // Fetch available slots for selected date using the new API
 const fetchSlots = async () => {
  if (!slotId || !selectedDate) return;

  try {
    setLoading(true);
    console.log('Fetching slots for:', { slotId, selectedDate });

    const response = await axiosInstance.get(
      `/api/v1/slots/date-details/${slotId}/${selectedDate}`
    );
    console.log('Slots API Response:', response.data);

    if (response.data && response.data.data && response.data.data.slots_data) {
      const rawSlots = response.data.data.slots_data;

      // Convert slot_1, slot_2, etc. into array with slot_number
      const slotsData = Object.entries(rawSlots).map(([key, value]) => ({
        ...value,
        slot_number: key, // e.g., 'slot_1'
      }));

      setSlots(slotsData);

      // Auto-select first slot if only one exists
      if (slotsData.length === 1) {
        setSelectedSlot(slotsData[0].slot_number); // select slot by slot_number
      }
    } else {
      // Fallback: Generate sample slots
      const sampleSlots = [
        {
          slot_number: 'slot_1',
          slot_name: 'Event Session',
          start_time: '18:00:00',
          end_time: '21:00:00',
          price: 1000,
          available_seats: 50,
          total_seats: 100
        }
      ];
      setSlots(sampleSlots);
    }
  } catch (error) {
    console.error('Error fetching slots:', error);

    const sampleSlots = [
      {
        slot_number: 'slot_1',
        slot_name: 'Event Session',
        start_time: '18:00:00',
        end_time: '21:00:00',
        price: 1000,
        available_seats: 50,
        total_seats: 100
      }
    ];
    setSlots(sampleSlots);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  useEffect(() => {
    if (slotId && selectedDate) {
      fetchSlots();
    }
  }, [slotId, selectedDate]);

  const handleBooking = async () => {
    if (!selectedSlot || !event) {
      alert('Please select a time slot');
      return;
    }

    const bookingData: BookingData = {
      event_id: event.event_id,
      slot_id: selectedSlot || slotId, // Use selectedSlot if available, otherwise use slotId from URL
      selected_date: selectedDate,
      seats_count: seatsCount
    };

    try {
      setBookingLoading(true);
      const response = await axiosInstance.post('/api/v1/bookings', bookingData);
      
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        alert('Booking successful!');
        router.push('/profile'); // Redirect to profile or booking confirmation page
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Slots Selection */}
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
                  key={slot.slot_id}
                onClick={() => {
  console.log(slot.slot_number);
  setSelectedSlot(slot.slot_number);
}}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSlot === slot.slot_id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${slot.available_seats === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{slot.slot_name}</h3>
                    <span className="text-lg font-bold text-purple-600">
                      ₹{slot.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock />
                    <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className={`${slot.available_seats > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                      {slot.capacity} seats available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seats Selection */}
        {selectedSlot && (
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
  const selectedSlotData = slots.find(s => s.slot_number === selectedSlot);
  console.log('Selected Slot:', selectedSlot);
  console.log('Matched Slot Data:', selectedSlotData);
  if (selectedSlotData && seatsCount < selectedSlotData.available_seats) {
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
              const selectedSlotData = slots.find(s => s.slot_id === selectedSlot);
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
                    <span className="text-purple-600">₹{totalPrice}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Book Button */}
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
      </div>
    </div>
  );
};

export default BookingPage;