import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontAlexandria } from "@/config/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ToastProvider } from "@heroui/toast";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "Equits",
    template: `%s - Equits`,
  },
  description: "Equits",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    // { media: "(prefers-color-scheme: dark)", color: "black" }, // TODO: remove this when we have a way to switch themes
    { media: "(prefers-color-scheme: dark)", color: "white" },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const storeCookies = await cookies();
  const session = storeCookies.get("jwt")?.value;
  const isVerified = storeCookies.get("isVerified")?.value === "true";

  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head />
      <body className={fontAlexandria.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "light",
              forcedTheme: "light", // TODO: remove this when we have a way to switch themes
            }}
            session={session}
            locale={locale}
          >
            <div className="relative flex flex-col min-h-screen pb-16 lg:pb-0">
              <Navbar session={session} isVerified={isVerified} />
              <main className="flex-grow w-full flex flex-col items-center">
                {children}
              </main>
              <Footer />
              <ToastProvider placement="top-center" />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
