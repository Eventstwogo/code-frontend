import { create } from 'zustand';
import axiosInstance from '@/lib/axiosInstance';

type BookingEvent = {
  booking_id: number;
  event_title: string;
  event_card_image: string;
  slot_time: string;
  booking_date: string;
  total_price: number;
  booking_status: string;
  num_seats: number;
};

type BookingData = {
  events: BookingEvent[];
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
};

type BookingStore = {
  bookings: BookingData | null;
  loading: boolean;
  error: string | null;
  fetchBookings: (userId: string) => Promise<void>;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: null,
  loading: false,
  error: null,

  fetchBookings: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/v1/bookings/user/${userId}`);
      const bookingData = response.data?.data;

      set({ bookings: bookingData, loading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || 'Failed to fetch bookings.',
        loading: false,
      });
    }
  },
}));