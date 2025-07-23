// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import jwt from "jsonwebtoken";

// interface ThemeColors {
//   topBarColor: string;
//   sidebarColor: string;
//   sidebarBackground: string;
//   primary: string;
//   primaryForeground: string;
//   secondary: string;
//   secondaryForeground: string;
// }

// interface AuthState {
//   userId: string | null;
//   role: string | null;
//   exp: number | null;
//   isAuthenticated: boolean;
//   sessionId: string | null;
//   login: (accessToken: string, refreshToken: string, sessionId: string) => void;
//   logout: () => void;
//   checkAuth: () => void;
// }

// interface StoreState extends AuthState {
//   themeColors: ThemeColors;
//   updateThemeColor: (key: keyof ThemeColors, value: string) => void;
//   resetTheme: () => void;
// }

// const useStore = create<StoreState>()(
//   persist(
//     (set) => ({
//       // 🔹 Auth State
//       userId: null,
//       role: null,
//       exp: null,
//       isAuthenticated: false,
//       sessionId: null,

//       login: (accessToken: string, refreshToken: string, sessionId: string) => {
//         try {
//           const decoded: any = jwt.decode(accessToken);
//           console.log(decoded)
//           if (decoded?.uid ) {
//             set({
//               userId: decoded.uid,
//               role: decoded.rid,
//               exp: decoded.exp,
//               isAuthenticated: true,
//               sessionId: sessionId,
//             });
//             localStorage.setItem("token", accessToken);
//             localStorage.setItem("refreshToken", refreshToken);
//             localStorage.setItem("sessionId", sessionId);
//           }
//         } catch (err) {
//           console.error("JWT decode error:", err);
//         }
//       },

//       logout: () => {
//         set({ userId: null, role: null, exp: null, isAuthenticated: false, sessionId: null });
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("sessionId");
//       },

//       checkAuth: () => {
//         if (typeof window === "undefined") return;

//         const token = localStorage.getItem("token");
//         const sessionId = localStorage.getItem("sessionId");
        
//         if (token) {
//           try {
//             const decoded: any = jwt.decode(token);
//             if (decoded?.uid ) {
//               // Check if token is expired
//               const currentTime = Date.now() / 1000;
//               if (decoded.exp > currentTime) {
//                 // Token is still valid
//                 set({
//                   userId: decoded.uid,
//                   role: decoded.rid,
//                   exp: decoded.exp,
//                   isAuthenticated: true,
//                   sessionId: sessionId,
//                 });
//                 console.log("User authenticated with valid token");
//               } else {
//                 // Token is expired, clear everything
//                 console.log("Token expired, clearing authentication");
//                 set({ userId: null, role: null, exp: null, isAuthenticated: false, sessionId: null });
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("refreshToken");
//                 localStorage.removeItem("sessionId");
//                 localStorage.removeItem("id");
//               }
//             } else {
//               // Invalid token structure
//               console.log("Invalid token structure");
//               set({ userId: null, role: null, exp: null, isAuthenticated: false, sessionId: null });
//               localStorage.removeItem("token");
//               localStorage.removeItem("refreshToken");
//               localStorage.removeItem("sessionId");
//               localStorage.removeItem("id");
//             }
//           } catch {
//             // JWT decode error
//             console.log("JWT decode error");
//             set({ userId: null, role: null, exp: null, isAuthenticated: false, sessionId: null });
//             localStorage.removeItem("token");
//             localStorage.removeItem("refreshToken");
//             localStorage.removeItem("sessionId");
//             localStorage.removeItem("id");
//           }
//         } else {
//           // No token found
//           console.log("No token found");
//           set({ userId: null, role: null, exp: null, isAuthenticated: false, sessionId: null });
//         }
//       },

//       // 🔹 Theme Colors
//       themeColors: {
//         topBarColor: "",
//         sidebarColor: "",
//         sidebarBackground: "",
//         primary: "240 5.9% 10%",
//         primaryForeground: "0 0% 98%",
//         secondary: "240 4.8% 95.9%",
//         secondaryForeground: "240 5.9% 10%",
//       },

//       updateThemeColor: (key, value) =>
//         set((state) => ({
//           themeColors: {
//             ...state.themeColors,
//             [key]: value,
//           },
//         })),

//       resetTheme: () =>
//         set(() => ({
//           themeColors: {
//             topBarColor: "",
//             sidebarColor: "",
//             sidebarBackground: "",
//             primary: "240 5.9% 10%",
//             primaryForeground: "0 0% 98%",
//             secondary: "240 4.8% 95.9%",
//             secondaryForeground: "240 5.9% 10%",
//           },
//         })),
//     }),
//     {
//       name: "app-store", // Local storage key
//     }
//   )
// );

// export default useStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt from "jsonwebtoken";

// 🎨 Theme type
interface ThemeColors {
  topBarColor: string;
  sidebarColor: string;
  sidebarBackground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
}

// 🔐 Auth type
interface AuthState {
  userId: string | null;
  role: string | null;
  exp: number | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  login: (accessToken: string, refreshToken: string, sessionId: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshTokenIfNeeded: () => Promise<boolean>;
}

// 🔁 Combined store
interface StoreState extends AuthState {
  themeColors: ThemeColors;
  updateThemeColor: (key: keyof ThemeColors, value: string) => void;
  resetTheme: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // ➤ Auth state
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
            // 👉 Use sessionStorage (per-tab isolation)
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
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("sessionId");
      },

      checkAuth: async () => {
        if (typeof window === "undefined") return;

        console.log("🔍 Checking authentication...");
        const token = sessionStorage.getItem("token");
        const sessionId = sessionStorage.getItem("sessionId");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (token) {
          try {
            const decoded: any = jwt.decode(token);
            console.log("🔓 Decoded token:", decoded);
            
            if (decoded?.uid) {
              const currentTime = Date.now() / 1000;
              
              if (decoded.exp > currentTime) {
                console.log("✅ Token is valid, setting auth state");
                set({
                  userId: decoded.uid,
                  role: decoded.rid,
                  exp: decoded.exp,
                  isAuthenticated: true,
                  sessionId,
                });
                console.log("User authenticated successfully");
                
                // Check if token needs refresh (expires in next 5 minutes)
                const timeUntilExpiry = decoded.exp - currentTime;
                if (timeUntilExpiry < 300) {
                  console.log("🔄 Token expires soon, refreshing...");
                  await get().refreshTokenIfNeeded();
                }
                return;
              } else {
                console.log("⏰ Token expired, attempting to refresh...");
                // Try to refresh the token
                const refreshSuccess = await get().refreshTokenIfNeeded();
                if (!refreshSuccess) {
                  console.log("❌ Token refresh failed, clearing session");
                  set({
                    userId: null,
                    role: null,
                    exp: null,
                    isAuthenticated: false,
                    sessionId: null,
                  });
                  sessionStorage.clear();
                }
              }
            } else {
              console.log("❌ Invalid token structure");
              set({
                userId: null,
                role: null,
                exp: null,
                isAuthenticated: false,
                sessionId: null,
              });
              sessionStorage.clear();
            }
          } catch (error) {
            console.log("❌ JWT decode error:", error);
            set({
              userId: null,
              role: null,
              exp: null,
              isAuthenticated: false,
              sessionId: null,
            });
            sessionStorage.clear();
          }
        } else if (refreshToken) {
          console.log("❌ No access token found, but refresh token exists. Attempting refresh...");
          const refreshSuccess = await get().refreshTokenIfNeeded();
          if (!refreshSuccess) {
            console.log("❌ Refresh failed, clearing session");
            set({
              userId: null,
              role: null,
              exp: null,
              isAuthenticated: false,
              sessionId: null,
            });
            sessionStorage.clear();
          }
        } else {
          console.log("❌ No tokens found");
          set({
            userId: null,
            role: null,
            exp: null,
            isAuthenticated: false,
            sessionId: null,
          });
        }
      },

      refreshTokenIfNeeded: async () => {
        if (typeof window === "undefined") return false;

        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          console.log("❌ No refresh token found");
          return false;
        }

        try {
          console.log("🔄 Attempting to refresh access token...");
          
          // If we have a token, check if it needs refreshing
          if (token) {
            const decoded: any = jwt.decode(token);
            if (decoded?.exp) {
              const currentTime = Date.now() / 1000;
              const timeUntilExpiry = decoded.exp - currentTime;
              
              // Only refresh if token expires in the next 5 minutes or is already expired
              if (timeUntilExpiry >= 300) {
                console.log("✅ Token is still valid, no refresh needed");
                return true;
              }
            }
          }
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/token/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.NEXT_PUBLIC_API_GATEWAY_KEY || '',
            },
            body: JSON.stringify({
              refresh_token: refreshToken,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            
            if (data.data) {
              console.log("✅ Access token refreshed successfully");
              
              const { access_token, refresh_token: newRefreshToken, session_id } = data.data;
              
              // Update tokens in sessionStorage
              sessionStorage.setItem('token', access_token);
              sessionStorage.setItem('refreshToken', newRefreshToken);
              sessionStorage.setItem('sessionId', session_id.toString());
              
              // Update the store with new token data
              const newDecoded: any = jwt.decode(access_token);
              if (newDecoded?.uid && newDecoded?.rid) {
                set({
                  userId: newDecoded.uid,
                  role: newDecoded.rid,
                  exp: newDecoded.exp,
                  isAuthenticated: true,
                  sessionId: session_id.toString(),
                });
              }
              
              return true;
            } else {
              console.log("❌ Refresh token response not successful:", data);
              return false;
            }
          } else {
            console.log("❌ Refresh token request failed:", response.status);
            return false;
          }
        } catch (error) {
          console.error("❌ Error refreshing token:", error);
          return false;
        }
      },

      // 🎨 Theme state (stored in localStorage)
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
      name: "theme-store", // Only theme is persisted in localStorage
      partialize: (state) => ({ themeColors: state.themeColors }), // Only persist theme
    }
  )
);

export default useStore;
