"use client";

import { Avatar, Button } from "@heroui/react";
import { MainRoutes } from "@/types";
import Link from "next/link";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface TeamMemberCardProps {
  userId: number;
  avatar?: string | null;
  firstName: string;
  lastName: string;
  // jobTitle?: string | null;
  /** Badge label shown below the name (e.g. "Owner", "Designer") */
  badge: string;
  /** Visual variant — owner gets primary colors, members get neutral */
  variant?: "owner" | "member";
  /** Status of the membership (ACCEPTED, PENDING, DECLINED) */
  status?: string;
  /** Show the delete button on hover */
  canRemove?: boolean;
  isRemoving?: boolean;
  onRemove?: () => void;
}

const CARD_BASE =
  "flex flex-col items-center text-center gap-4 p-5 bg-gray-50/50 hover:bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full relative";

const BADGE_STYLES = {
  owner:
    "text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full",
  member:
    "text-[10px] font-bold text-zinc-600 uppercase tracking-wider bg-zinc-200/60 px-2.5 py-1 rounded-full",
  invited:
    "text-[10px] font-bold text-warning-600 uppercase tracking-wider bg-warning-100 px-2.5 py-1 rounded-full",
  declined:
    "text-[10px] font-bold text-danger-600 uppercase tracking-wider bg-danger-100 px-2.5 py-1 rounded-full",
} as const;

export function TeamMemberCard({
  userId,
  avatar,
  firstName,
  lastName,
  badge,
  variant = "member",
  status = "ACCEPTED",
  canRemove = false,
  isRemoving = false,
  onRemove,
}: TeamMemberCardProps) {
  const t = useTranslations("ProjectDetails.team");
  const isPending = status === "PENDING";
  const isDeclined = status === "DECLINED";
  const isNotAccepted = isPending || isDeclined;

  return (
    <div className={`${CARD_BASE} ${isNotAccepted ? "opacity-75" : ""}`}>
      {/* Avatar */}
      <Avatar
        src={avatar || undefined}
        color={isNotAccepted ? "default" : "primary"}
        showFallback
        className="w-16 h-16 text-large shrink-0 border-3 border-white shadow-md group-hover:scale-105 transition-transform"
      />

      {/* Info */}
      <div className="flex flex-col items-center gap-1.5 w-full overflow-hidden">
        <span className="font-bold text-dark text-base truncate w-full group-hover:text-primary transition-colors">
          {firstName} {lastName}
        </span>
        <div className="flex flex-col items-center gap-1.5 w-full">
          <span className={BADGE_STYLES[variant]}>{badge}</span>
          {isPending && (
            <span className={BADGE_STYLES.invited}>{t("invited")}</span>
          )}
          {isDeclined && (
            <span className={BADGE_STYLES.declined}>{t("declined")}</span>
          )}
        </div>
      </div>

      {/* Profile link */}
      <Button
        as={Link}
        href={`${MainRoutes.TALENTS}/${userId}`}
        isIconOnly
        size="sm"
        color="primary"
        variant="flat"
        radius="full"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
      >
        <FiArrowRight size={18} />
      </Button>

      {/* Delete button (owner-only action) */}
      {canRemove && (
        <div className="absolute top-3 left-3 z-10">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="danger"
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-8 h-8 min-w-8"
            onPress={onRemove}
            isLoading={isRemoving}
          >
            <FiTrash2 size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
