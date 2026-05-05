import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { fontAlexandria } from "@/config/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     // { media: "(prefers-color-scheme: dark)", color: "black" }, // TODO: remove this when we have a way to switch themes
//     { media: "(prefers-color-scheme: dark)", color: "white" },
//   ],
// };

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
      <head />
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
