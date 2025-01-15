import axios from "axios";
import useContextValue from "./useContextValue";

const API_BASE_URL = import.meta.env.VITE_API_LINK;

// Public API instance
const publicAPI = axios.create({
  baseURL: API_BASE_URL,
});

// Hook to use public API
const usePublicAPI = () => {
  return publicAPI;
};

// Secure API instance
const secureAPI = axios.create({
  baseURL: API_BASE_URL,
});

// Hook to use secure API
const useSecureAPI = () => {
  const { signOutUser } = useContextValue();
  // add request interceptor to add access token to the header
  secureAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Adding response interceptor to handle errors
  secureAPI.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) signOutUser();
      return Promise.reject(error);
    }
  );

  return secureAPI;
};

export { usePublicAPI, useSecureAPI };
