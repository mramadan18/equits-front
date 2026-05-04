import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const storeCookies = await cookies();
  const locale = storeCookies.get("NEXT_LOCALE")?.value || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
