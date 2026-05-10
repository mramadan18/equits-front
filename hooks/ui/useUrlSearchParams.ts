import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useUrlSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset page when filtering changes
      if (key !== "page" && params.has("page")) {
        params.set("page", "1");
      }

      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const updateParams = useCallback(
    (newParams: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      let hasChanges = false;

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          if (params.has(key)) {
            params.delete(key);
            hasChanges = true;
          }
        } else if (params.get(key) !== value) {
          params.set(key, value);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        if (!("page" in newParams) && params.has("page")) {
          params.set("page", "1");
        }
        router.push(pathname + "?" + params.toString(), { scroll: false });
      }
    },
    [router, pathname, searchParams],
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const clearParams = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return { getParam, updateParam, updateParams, clearParams, searchParams };
}
