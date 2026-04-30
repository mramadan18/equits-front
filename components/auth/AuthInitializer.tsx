"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMe } from "@/hooks/api/useAuth";

export const AuthInitializer = ({ session }: { session?: string }) => {
  const { setUser } = useAuthStore();
  const { data: user, isSuccess, isError } = useMe({ enabled: !!session });

  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
    } else if (isError || !session) {
      setUser(null);
    }
  }, [isSuccess, user, isError, session, setUser]);

  return null;
};
