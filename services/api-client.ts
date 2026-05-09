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
    config.headers["Accept-Language"] = "en";
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== "undefined") {
      const { addToast } = await import("@heroui/react");

      if (error.response) {
        const message = error.response.data?.message || "An error occurred";
        const status = error.response.status;

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
    }

    return Promise.reject(error);
  },
);

export const unwrap = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export default apiClient;
