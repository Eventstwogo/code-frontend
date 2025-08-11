// Common types used across the application

export interface Category {
  category_id: number;
  category_name: string;
  category_slug: string;
  category_img_thumbnail?: string;
  events?: Event[];
}

export interface Event {
  event_id: number;
  event_title: string;
  event_slug: string;
  card_image: string;
  duration?: number;
  event_date?: string;
  event_time?: string;
  description?: string;
  price?: number;
  location?: string;
}

export interface SubCategory {
  subcategory_id: number;
  subcategory_name: string;
  subcategory_slug: string;
  subcategory_img_thumbnail?: string;
  events?: Event[];
}

export interface BookingEvent {
  booking_id: number;
  event_title: string;
  event_card_image: string;
  slot_time: string;
  booking_date: string;
  total_price: number;
  booking_status: string;
  num_seats: number;
}

export interface BookingData {
  events: BookingEvent[];
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  profile_picture?: string;
}

export interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
  };
  message?: string;
}

export interface RewardItem {
  imageUrl: string;
  title?: string;
}