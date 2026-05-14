import { useCallback } from "react";
import { driver, Driver, Config } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_SEEN_KEY = "equits_tour_seen";

export const useTour = () => {
  const startTour = useCallback((steps: Config["steps"], tourKey: string) => {
    const driverObj: Driver = driver({
      showProgress: true,
      steps: steps,
      animate: true,
      overlayColor: "#000",
      overlayOpacity: 0.75,
      popoverClass: "equits-tour-popover",
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Got it!",
      allowClose: true,
      onDestroyed: () => {
        localStorage.setItem(`${TOUR_SEEN_KEY}_${tourKey}`, "true");
      },
    });

    // Ensure we are on the client and elements might need a frame to be ready
    requestAnimationFrame(() => {
      driverObj.drive();
    });
  }, []);

  const hasSeenTour = (tourKey: string) => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(`${TOUR_SEEN_KEY}_${tourKey}`) === "true";
  };

  const resetTour = (tourKey?: string) => {
    if (tourKey) {
      localStorage.removeItem(`${TOUR_SEEN_KEY}_${tourKey}`);
    } else {
      // Clear all tours if no key provided
      Object.keys(localStorage)
        .filter((key) => key.startsWith(TOUR_SEEN_KEY))
        .forEach((key) => localStorage.removeItem(key));
    }
  };

  return { startTour, hasSeenTour, resetTour };
};
