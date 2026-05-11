"use client";

import { Button, useDisclosure, addToast } from "@heroui/react";
import { Project } from "@/types/api";
import { useTranslations } from "next-intl";
import { FiUsers, FiPlus } from "react-icons/fi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import {
  useRemoveProjectMember,
  useProjectMembers,
} from "@/hooks/api/useProject";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { TeamMemberCard } from "./TeamMemberCard";
import { AddTeamMemberModal } from "./AddTeamMemberModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ─── Constants ───────────────────────────────────────────────
const SWIPER_BREAKPOINTS = {
  640: { slidesPerView: 2.5 },
  1024: { slidesPerView: 3.5 },
} as const;

// ─── Component ───────────────────────────────────────────────
export function IdeaTeam({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.team");
  const { user } = useAuthStore();

  // ── Derived state ──
  const isOwner = user?.id === project.ownerId;
  const owner = project.owner;

  // ── Intersection Observer ──
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Load slightly before it comes into view
  });

  // ── Data fetching ──
  const {
    data: membersRes,
    isLoading: membersLoading,
    refetch: membersRefetch,
  } = useProjectMembers(project.id, { enabled: inView });
  const members = membersRes?.data || [];

  // ── Modals ──
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  // ── Member removal ──
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const { mutate: removeMember, isPending: isRemoving } =
    useRemoveProjectMember();

  const handleRemoveMember = (userId: number) => {
    setUserIdToDelete(userId);
    onDeleteModalOpen();
  };

  const confirmRemoveMember = () => {
    if (!userIdToDelete) return;

    removeMember(
      { projectId: project.id, userId: userIdToDelete },
      {
        onSuccess: (res) => {
          addToast({ title: res.message as string, color: "success" });
          onDeleteModalOpenChange();
          membersRefetch();
        },
      },
    );
  };

  // ── Early returns ──
  if (membersLoading) return null;
  if (!owner && members.length === 0 && !isOwner) return null;

  return (
    <div ref={ref} className="flex flex-col gap-6 w-full min-h-[100px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <FiUsers className="text-xl" />
          </div>
          <h3 className="text-base sm:text-xl font-semibold text-dark">
            {t("title")}
          </h3>
          <span className="text-xs font-semibold text-gray2 bg-gray-50 px-2 py-1 rounded-lg">
            {inView ? 1 + members.length : "..."}
          </span>
        </div>

        {isOwner && (
          <Button
            color="primary"
            variant="flat"
            startContent={<FiPlus />}
            onPress={onAddModalOpen}
            className="font-medium"
          >
            {t("addMember")}
          </Button>
        )}
      </div>

      {/* Slider / Content */}
      {!inView || membersLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[200px] h-[180px] bg-gray-100 animate-pulse rounded-2xl shrink-0"
            />
          ))}
        </div>
      ) : (
        <Swiper
          key={`${project.id}-${members.length}`}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.8}
          breakpoints={SWIPER_BREAKPOINTS}
          grabCursor
          className="w-full !pb-4"
        >
          {/* Owner slide */}
          {owner && (
            <SwiperSlide className="!h-auto">
              <TeamMemberCard
                userId={owner.id}
                avatar={owner.avatar}
                firstName={owner.firstName}
                lastName={owner.lastName}
                badge={t("owner")}
                variant="owner"
              />
            </SwiperSlide>
          )}

          {/* Member slides */}
          {members.map((member) => (
            <SwiperSlide key={member.id} className="!h-auto">
              <TeamMemberCard
                userId={member.userId}
                avatar={member.avatar}
                firstName={member.firstName}
                lastName={member.lastName}
                badge={member.role}
                status={member.status}
                variant="member"
                canRemove={isOwner}
                isRemoving={isRemoving}
                onRemove={() => handleRemoveMember(member.userId)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Owner-only modals */}
      {isOwner && (
        <>
          <AddTeamMemberModal
            isOpen={isAddModalOpen}
            onOpenChange={onAddModalOpenChange}
            projectId={project.id}
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onOpenChange={onDeleteModalOpenChange}
            title={t("removeMember")}
            description={t("removeConfirm")}
            onConfirm={confirmRemoveMember}
            isLoading={isRemoving}
            confirmationText="Delete"
          />
        </>
      )}
    </div>
  );
}
