import axios from "axios";
import { addToast } from "@heroui/react";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const locale = window.location.pathname.split("/")[1] || "en";

    config.headers["Accept-Language"] = locale;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "An error occurred";
      const status = error.response.status;

      // Only toast if it's a client/server error and not 401 (usually handled by auth)
      if (status >= 400) {
        addToast({
          title: message,
          color: "danger",
        });
      }
    } else if (error.request) {
      addToast({
        title: "Network error. Please check your connection.",
        color: "danger",
      });
    }

    return Promise.reject(error);
  },
);

export const unwrap = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export default apiClient;
