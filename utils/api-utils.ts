import { ApiResponse } from "@/types/api";
import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

interface FetchOptions extends RequestInit {
  params?: Record<
    string,
    string | number | boolean | undefined | null | string[]
  >;
  locale?: string;
}

export async function fetchServer<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { params, locale, ...fetchOptions } = options;
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  let url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          const filteredValue = value.filter(
            (v) => v !== undefined && v !== null && v !== "",
          );
          if (filteredValue.length > 0) {
            searchParams.append(key, filteredValue.join(","));
          }
        } else {
          searchParams.append(key, String(value));
        }
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
  if (token) {
    headers.set("Authorization", `Bearer ${token.value}`);
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
