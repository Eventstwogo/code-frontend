import axiosInstance from './axiosInstance';
import useStore from './Zustand';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  uid?: string | number;
  rid?: string | number;
  exp?: number;
  [key: string]: unknown;
}

export const logoutUser = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (refreshToken) {
      try {
        await axiosInstance.post('/api/v1/users/token/revoke', { refresh_token: refreshToken });
        console.log('Refresh token revoked successfully');
      } catch (err) {
        console.error('Error revoking token:', err);
      }
    }
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    const { logout } = useStore.getState();
    logout();
    sessionStorage.clear();
    window.location.href = '/';
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as JWTPayload | null;
    if (!decoded || !decoded.exp) return true;
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

// Optional manual refresh
export const refreshTokenIfNeeded = async (): Promise<boolean> => {
  try {
    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!token || !refreshToken) return false;

    const decoded = jwt.decode(token) as JWTPayload | null;
    if (!decoded?.exp) return false;

    const timeLeft = decoded.exp - Date.now() / 1000;
    if (timeLeft > 300) return false; // still valid

    const response = await axiosInstance.post('/api/v1/users/token/refresh', { refresh_token: refreshToken });
    const { access_token, refresh_token: newRefreshToken, session_id } = response.data.data;

    sessionStorage.setItem('token', access_token);
    sessionStorage.setItem('refreshToken', newRefreshToken);
    sessionStorage.setItem('sessionId', session_id.toString());

    const { login } = useStore.getState();
    login(access_token, newRefreshToken, session_id.toString());

    return true;
  } catch (err) {
    await logoutUser();
    return false;
  }
};
