import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

type SeatCategory = {
  seat_category_id: string;
  label: string;
  num_seats: number;
  price_per_seat: number;
  total_price: number;
};

type EventData = {
  event_id: string;
  title: string;
  slug: string;
  organizer_name: string;
  location: string | null;
  address: string;
  event_date: string;
  event_time: string;
  event_duration: string;
  booking_date: string;
  card_image: string;
};

export type BookingEvent = {
  order_id: string;
  booking_status: string;
  payment_status: string;
  payment_reference: string | null;
  total_amount: number;
  created_at: string;
  updated_at: string;
  event: EventData;
  seat_categories: SeatCategory[];
};

type PaginationData = {
  current_page: number;
  total_pages: number;
  total_count: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
};

type BookingData = {
  user_id: string;
  bookings: BookingEvent[];
  pagination: PaginationData;
};

type BookingStore = {
  bookings: BookingData | null;
  loading: boolean;
  error: string | null;
  fetchBookings: (userId: string) => Promise<void>;
  fetchBookingDetails: (orderId: string) => Promise<BookingEvent | null>;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: null,
  loading: false,
  error: null,

  fetchBookings: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/v1/new-bookings/user/${userId}`);
      const bookingData: BookingData = response.data?.data;
      set({ bookings: bookingData, loading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch bookings.",
        loading: false,
      });
    }
  },

  fetchBookingDetails: async (orderId: string) => {
    try {
      const response = await axiosInstance.get(`/api/v1/new-bookings/${orderId}`);
      const bookingDetail: BookingEvent = response.data?.data;
      return bookingDetail;
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch booking details.",
      });
      return null;
    }
  },
}));
