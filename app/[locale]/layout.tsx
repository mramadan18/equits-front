import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontAlexandria } from "@/config/fonts";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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
          >
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow w-full flex flex-col items-center">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
