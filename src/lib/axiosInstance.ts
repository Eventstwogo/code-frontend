import axios, { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from "axios";

let refreshPromise: Promise<void> | null = null;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
});

// Request interceptor: attach access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: InternalAxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = sessionStorage.getItem("refreshToken");
            if (!refreshToken) throw new Error("No refresh token available");

            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/token/refresh`,
              { refresh_token: refreshToken },
              { headers: new AxiosHeaders({ "Content-Type": "application/json" }) }
            );

            const { access_token, refresh_token: newRefreshToken, session_id } = response.data.data;

            sessionStorage.setItem("token", access_token);
            sessionStorage.setItem("refreshToken", newRefreshToken);
            sessionStorage.setItem("sessionId", session_id.toString());
          } catch (err) {
            sessionStorage.clear();
            return Promise.reject(err);
          } finally {
            refreshPromise = null;
          }
        })();
      }

      await refreshPromise;

      // Retry original request with new token
      const newToken = sessionStorage.getItem("token");
      if (!originalRequest.headers) originalRequest.headers = new AxiosHeaders();
      if (newToken) originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
