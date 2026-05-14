"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "@heroui/react";
import { AuthInitializer } from "@/components/auth/AuthInitializer";
import { TourGuide } from "@/components/shared/TourGuide";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: string;
}) {
  const router = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <HeroUIProvider navigate={router.push}>
          <AuthInitializer session={session} />
          <TourGuide />
          {children}
          <ToastProvider
            placement="top-center"
            toastProps={{
              hideIcon: true,
              classNames: {
                title: "whitespace-normal line-clamp-none text-center",
              },
            }}
          />
        </HeroUIProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
