import { ApiResponse } from "@/types/api";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  locale?: string;
}

export async function fetchServer<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { params, locale, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = new Headers(fetchOptions.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (locale) {
    headers.set("Accept-Language", locale);
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error [${response.status}] ${url}:`, data);
      throw new Error(data.message || "An error occurred during fetch");
    }

    return data;
  } catch (error) {
    console.error(`Fetch Error ${url}:`, error);
    throw error;
  }
}
