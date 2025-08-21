import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance"; // or wherever you define your axios instance

type ProfileData = {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
};

type ProfileStore = {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/v1/users/profile");
      const profileData = response.data?.data;

      set({ profile: profileData, loading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch profile.",
        loading: false,
      });
    }
  },
}));
