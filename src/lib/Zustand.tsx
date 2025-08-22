import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt from "jsonwebtoken";
import axiosInstance from "./axiosInstance";

interface AuthState {
  userId: string | null;
  role: string | null;
  exp: number | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  login: (accessToken: string, refreshToken: string, sessionId: string) => void;
  logout: () => void;
  refreshTokenIfNeeded: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

interface ThemeColors {
  topBarColor: string;
  sidebarColor: string;
  sidebarBackground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
}

interface StoreState extends AuthState {
  themeColors: ThemeColors;
  updateThemeColor: (key: keyof ThemeColors, value: string) => void;
  resetTheme: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      userId: null,
      role: null,
      exp: null,
      isAuthenticated: false,
      sessionId: null,

      login: (accessToken, refreshToken, sessionId) => {
        try {
          const decoded: any = jwt.decode(accessToken);
          if (decoded?.uid) {
            set({
              userId: decoded.uid,
              role: decoded.rid,
              exp: decoded.exp,
              isAuthenticated: true,
              sessionId,
            });
            sessionStorage.setItem("token", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("sessionId", sessionId);
          }
        } catch (err) {
          console.error("JWT decode error:", err);
        }
      },

      logout: () => {
        set({
          userId: null,
          role: null,
          exp: null,
          isAuthenticated: false,
          sessionId: null,
        });
        sessionStorage.clear();
      },

      refreshTokenIfNeeded: async () => {
        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) return false;

        if (!token) return false;

        try {
          const decoded: any = jwt.decode(token);
          if (!decoded?.exp) return false;

          const timeLeft = decoded.exp - Date.now() / 1000;
          if (timeLeft > 300) return true; // still valid

          // Refresh via axiosInstance
          const response = await axiosInstance.post("/api/v1/users/token/refresh", {
            refresh_token: refreshToken,
          });
          const { access_token, refresh_token: newRefreshToken, session_id } = response.data.data;

          sessionStorage.setItem("token", access_token);
          sessionStorage.setItem("refreshToken", newRefreshToken);
          sessionStorage.setItem("sessionId", session_id.toString());

          const newDecoded: any = jwt.decode(access_token);
          if (newDecoded?.uid) {
            set({
              userId: newDecoded.uid,
              role: newDecoded.rid,
              exp: newDecoded.exp,
              isAuthenticated: true,
              sessionId: session_id.toString(),
            });
          }

          return true;
        } catch (err) {
          sessionStorage.clear();
          set({
            userId: null,
            role: null,
            exp: null,
            isAuthenticated: false,
            sessionId: null,
          });
          return false;
        }
      },

      checkAuth: async () => {
        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (token) {
          const decoded: any = jwt.decode(token);
          if (decoded?.uid) {
            const currentTime = Date.now() / 1000;
            if (decoded.exp > currentTime) {
              set({
                userId: decoded.uid,
                role: decoded.rid,
                exp: decoded.exp,
                isAuthenticated: true,
                sessionId: sessionStorage.getItem("sessionId"),
              });
              if (decoded.exp - currentTime < 300) {
                await get().refreshTokenIfNeeded();
              }
              return;
            }
          }
        }

        if (refreshToken) {
          await get().refreshTokenIfNeeded();
        } else {
          set({
            userId: null,
            role: null,
            exp: null,
            isAuthenticated: false,
            sessionId: null,
          });
          sessionStorage.clear();
        }
      },

      // Theme defaults
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
        set((state) => ({ themeColors: { ...state.themeColors, [key]: value } })),

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
      name: "theme-store",
      partialize: (state) => ({ themeColors: state.themeColors }),
    }
  )
);

export default useStore;
