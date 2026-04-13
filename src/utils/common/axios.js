import axios from 'axios';

export const loadUser = async () => {
  try {
    const token = localStorage.getItem("token");
    return token || null;
  } catch (error) {
    console.error("Error loading user token:", error);
    return null;
  }
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await loadUser();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor — refresh token flow
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config;

    // ✅ 401 — token expired, try refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // infinite loop தவிர்க்க

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // refresh token இல்லை → logout
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // ✅ New access token get பண்ணு
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = response.data.token; // ✅ backend AuthResponse.token

        // ✅ New token save
        localStorage.setItem("token", newAccessToken);

        // ✅ Original request retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Refresh token also expired → logout
        console.log("Refresh token expired — logging out");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // ✅ 403 — forbidden → logout
    if (status === 403) {
      console.log("Forbidden — logging out");
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const axiosPost = (api, payload) => apiClient.post(api, payload);
export const axiosPut = (api, payload) => apiClient.put(api, payload);
export const axiosGet = (api, params = {}) => apiClient.get(api, { params });
export const axiosDelete = (api, payload = {}) => apiClient.delete(api, { data: payload });

export const axiosPostNoAuth = (api, payload) => axios.post(`${process.env.REACT_APP_BACKEND_URL}${api}`, payload);
export const axiosGetNoAuth = (api, config = {}) => axios.get(`${process.env.REACT_APP_BACKEND_URL}${api}`, config);
export const axiosPutNoAuth = (api, payload) => axios.put(`${process.env.REACT_APP_BACKEND_URL}${api}`, payload);
export const axiosDeleteNoAuth = (api, payload) => axios.delete(`${process.env.REACT_APP_BACKEND_URL}${api}`, { data: payload });