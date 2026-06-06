"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useIndustries } from "@/hooks/api/useLookup";
import { useUpdateInterests } from "@/hooks/api/useProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import { addToast } from "@heroui/react";
import { MainRoutes } from "@/types";

export const useInterestsController = () => {
  const t = useTranslations("Interests");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = searchParams.get("callbackUrl") || MainRoutes.HOME;
  const isSettings = pathname.startsWith("/settings");

  const { user, isHydrated } = useAuthStore();
  const { data: industriesData, isLoading: isLoadingLookup } = useIndustries();
  const { mutate: updateInterests, isPending: isUpdating } =
    useUpdateInterests();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isHydrated && user?.interests) {
      setSelectedIds(user.interests.map((ind) => ind.id));
    }
  }, [user, isHydrated]);

  const industries = useMemo(() => {
    return industriesData?.data || [];
  }, [industriesData]);

  // Filter industries based on search query
  const filteredIndustries = useMemo(() => {
    if (!searchQuery) return industries;
    return industries.filter((ind) =>
      ind.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [industries, searchQuery]);

  const toggleInterest = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isDirty = useMemo(() => {
    const initialIds = user?.interests?.map((ind) => ind.id) || [];
    if (initialIds.length !== selectedIds.length) return true;
    const sortedInitial = [...initialIds].sort();
    const sortedSelected = [...selectedIds].sort();
    return sortedInitial.some((val, idx) => val !== sortedSelected[idx]);
  }, [user, selectedIds]);

  const handleCancel = () => {
    if (user?.interests) {
      setSelectedIds(user.interests.map((ind) => ind.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSave = () => {
    if (selectedIds.length === 0) {
      addToast({
        title: t("minSelection"),
        color: "warning",
      });
      return;
    }

    updateInterests(selectedIds, {
      onSuccess: () => {
        addToast({
          title: t("success"),
          color: "success",
        });
        if (isSettings) {
          router.refresh();
        } else {
          router.push(callbackUrl);
        }
      },
      onError: (err) => {
        addToast({
          title: err.message || t("error"),
          color: "danger",
        });
      },
    });
  };

  const handleSkip = () => {
    router.push(callbackUrl);
  };

  return {
    t,
    isLoading: isLoadingLookup,
    isUpdating,
    selectedIds,
    searchQuery,
    setSearchQuery,
    filteredIndustries,
    toggleInterest,
    handleSave,
    handleSkip,
    isDirty,
    handleCancel,
    isSettings,
  };
};
