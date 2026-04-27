import axios from "axios";

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

export default apiClient;
