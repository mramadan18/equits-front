import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // const storeCookies = await cookies();
  // const locale = storeCookies.get("NEXT_LOCALE")?.value || "en";

  return {
    locale: "en",
    messages: (await import(`../messages/en.json`)).default,
  };
});
