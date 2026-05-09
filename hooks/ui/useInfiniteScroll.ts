import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  /** Whether there are more pages to load */
  hasNextPage: boolean;
  /** Whether a fetch is currently in progress */
  isFetchingNextPage: boolean;
  /** Function to call to load the next page */
  fetchNextPage: () => void;
  /** Distance from the bottom (in pixels) to trigger loading. Default: 300 */
  threshold?: number;
}

/**
 * Custom hook that uses IntersectionObserver to trigger infinite scroll.
 * Returns a ref to attach to a sentinel element at the bottom of your list.
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 300,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `0px 0px ${threshold}px 0px`,
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, threshold]);

  return sentinelRef;
};
