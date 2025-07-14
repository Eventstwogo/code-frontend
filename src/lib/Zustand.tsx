import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt from "jsonwebtoken";

interface ThemeColors {
  topBarColor: string;
  sidebarColor: string;
  sidebarBackground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
}

interface AuthState {
  userId: string | null;
  role: string | null;
  exp: number | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

interface StoreState extends AuthState {
  themeColors: ThemeColors;
  updateThemeColor: (key: keyof ThemeColors, value: string) => void;
  resetTheme: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // 🔹 Auth State
      userId: null,
      role: null,
      exp: null,
      isAuthenticated: false,

      login: (token: string) => {
        try {
          const decoded: any = jwt.decode(token);
      console.log(decoded)
          if (decoded?.user_id && decoded?.role_id) {
            set({
              userId: decoded.user_id,
              role: decoded.role_id,
              exp: decoded.exp,
              isAuthenticated: true,
            });
            localStorage.setItem("token", token);
          }
        } catch (err) {
          console.error("JWT decode error:", err);
        }
      },

      logout: () => {
        set({ userId: null, role: null, exp: null, isAuthenticated: false });
        localStorage.removeItem("token");
      },

      checkAuth: () => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded: any = jwt.decode(token);
            if (decoded?.user_id && decoded?.role_id) {
              set({
                userId: decoded.user_id,
                role: decoded.role_id,
                exp: decoded.exp,
                isAuthenticated: true,
              });
            } else {
              localStorage.removeItem("token");
            }
          } catch {
            localStorage.removeItem("token");
          }
        }
      },

      // 🔹 Theme Colors
      themeColors: {
        topBarColor: "",
        sidebarColor: "",
        sidebarBackground: "",
        primary: "240 5.9% 10%",
        primaryForeground: "0 0% 98%",
        secondary: "240 4.8% 95.9%",
        secondaryForeground: "240 5.9% 10%",
      },

      updateThemeColor: (key, value) =>
        set((state) => ({
          themeColors: {
            ...state.themeColors,
            [key]: value,
          },
        })),

      resetTheme: () =>
        set(() => ({
          themeColors: {
            topBarColor: "",
            sidebarColor: "",
            sidebarBackground: "",
            primary: "240 5.9% 10%",
            primaryForeground: "0 0% 98%",
            secondary: "240 4.8% 95.9%",
            secondaryForeground: "240 5.9% 10%",
          },
        })),
    }),
    {
      name: "app-store", // Local storage key
    }
  )
);

export default useStore;
