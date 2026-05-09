import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontAlexandria } from "@/config/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL("https://equits.net"),
  title: {
    default: "Equits - Where Ideas Meet Talent",
    template: `%s - Equits`,
  },
  description:
    "Equits is a free platform connecting entrepreneurs with talented professionals. Pitch your startup ideas, build teams, and bring your vision to life.",
  keywords: [
    "startup",
    "entrepreneur",
    "pitch",
    "business plan",
    "co-founder",
    "talent",
    "innovation",
    "equits",
  ],
  authors: [{ name: "Equits" }],
  creator: "Equits",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Equits",
    title: "Equits - Where Ideas Meet Talent",
    description:
      "Pitch your startup ideas, find co-founders, and build your dream team. Completely free.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Equits Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Equits - Where Ideas Meet Talent",
    description:
      "Pitch your startup ideas, find co-founders, and build your dream team.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeCookies = await cookies();
  const session = storeCookies.get("jwt")?.value;
  const isVerified = storeCookies.get("isVerified")?.value === "true";

  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontAlexandria.className}>
        <NextIntlClientProvider messages={messages} locale={"en-US"}>
          <Providers session={session}>
            <div className="relative flex flex-col min-h-screen pb-16 lg:pb-0">
              <Navbar session={session} isVerified={isVerified} />
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
