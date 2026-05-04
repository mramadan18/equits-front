import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // Disable automatic locale detection to prevent next-intl from issuing
  // redirects using request.url (which can expose the internal port on Railway).
  localeDetection: false,
});
