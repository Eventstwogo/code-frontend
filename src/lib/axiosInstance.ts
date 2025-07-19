// // lib/axiosInstance.ts

// import axios from 'axios';


// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in your .env.local file
//   headers: {
//     'Content-Type': 'application/json',
//     'api-key': process.env.NEXT_PUBLIC_API_GATEWAY_KEY, // Add the API key here
//   },
//   withCredentials: true,
// });




// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     // Ensure the API key is always included
//     config.headers['api-key'] = process.env.NEXT_PUBLIC_API_GATEWAY_KEY;
//     //console.log("Request Headers:", config.headers);
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// // Add a response interceptor to handle token refresh
// // axiosInstance.interceptors.response.use(
// //   response => response,
// //   async error => {
// //     if (error.response.status === 401) { // Unauthorized
// //       try {
// //         const refreshResponse = await axios.post('/refresh-token/', {}, {
// //           withCredentials: true
// //         });
// //         const newToken = refreshResponse.data.token;
// //         localStorage.setItem('token', newToken);
// //         error.config.headers['Authorization'] = `Bearer ${newToken}`;
// //         return axiosInstance(error.config);
// //       } catch (refreshError) {
// //         localStorage.removeItem('token');
// //         //  window.location.href = '/'; // Redirect to login
// //         return Promise.reject(refreshError);
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // Prevent retry loop or refresh attempt on login endpoint
//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/login')
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshResponse = await axios.post('/refresh-token/', {}, {
//           withCredentials: true,
//         });
//         const newToken = refreshResponse.data.token;
//         localStorage.setItem('token', newToken);
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('token');
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


// export default axiosInstance;


// lib/axiosInstance.ts

import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in your .env.local file
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.NEXT_PUBLIC_API_GATEWAY_KEY, // Add the API key here
  },
  withCredentials: true,
});




axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Ensure the API key is always included
    config.headers['api-key'] = process.env.NEXT_PUBLIC_API_GATEWAY_KEY;
    //console.log("Request Headers:", config.headers);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) { // Unauthorized
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/token/refresh`,
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.NEXT_PUBLIC_API_GATEWAY_KEY,
            }
          }
        );

        const { access_token, refresh_token: newRefreshToken, session_id } = refreshResponse.data.data;
        
        // Update tokens in localStorage
        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('sessionId', session_id.toString());

        // Retry the original request with new token
        error.config.headers['Authorization'] = `Bearer ${access_token}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        // Clear all tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('id');
        // window.location.href = '/'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
