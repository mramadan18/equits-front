"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTour } from "@/hooks/ui/useTour";
import {
  HOME_TOUR_STEPS,
  PROJECT_DETAILS_TOUR_STEPS,
  TALENTS_TOUR_STEPS,
} from "@/config/tour-steps";
import { useAuthStore } from "@/stores/useAuthStore";

export const TourGuide = () => {
  const pathname = usePathname();
  const { startTour, hasSeenTour } = useTour();
  const { isHydrated, user } = useAuthStore();

  useEffect(() => {
    if (!isHydrated || !user) return;

    const timer = setTimeout(() => {
      if (pathname === "/home") {
        if (
          !hasSeenTour("home") &&
          document.querySelector("#navbar-pitch-button")
        ) {
          startTour(HOME_TOUR_STEPS, "home");
        }
      } else if (pathname === "/talents") {
        if (
          !hasSeenTour("talents") &&
          document.querySelector("#talents-search-bar")
        ) {
          startTour(TALENTS_TOUR_STEPS, "talents");
        }
      } else if (pathname.startsWith("/projects/")) {
        if (pathname !== "/projects/new" && !hasSeenTour("project_details")) {
          // Check if the project header is actually in the DOM
          if (document.querySelector("#project-header")) {
            startTour(PROJECT_DETAILS_TOUR_STEPS, "project_details");
          }
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname, isHydrated, user, startTour, hasSeenTour]);

  return null; // This component doesn't render anything visible
};
