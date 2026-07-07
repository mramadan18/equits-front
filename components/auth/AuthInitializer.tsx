"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMe } from "@/hooks/api/useAuth";

export const AuthInitializer = ({ session }: { session?: string }) => {
  const { setUser, isAuthenticated } = useAuthStore();

  // If there is no active session cookie but the client-side Zustand store
  // still has a stale authentication state, clear it immediately during the
  // render phase to prevent queries/components from rendering with it.
  if (!session && isAuthenticated) {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  }

  const { data: user, isSuccess, isError } = useMe({ enabled: !!session });

  useEffect(() => {
    if (!session) {
      setUser(null);
      return;
    }

    if (isSuccess && user) {
      setUser(user);
    } else if (isError) {
      setUser(null);
    }
  }, [session, isSuccess, user, isError, setUser]);

  return null;
};
