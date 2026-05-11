"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  User,
  Avatar,
  Chip,
  addToast,
} from "@heroui/react";
import { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiUserPlus,
  FiArrowLeft,
  FiBriefcase,
  FiCheck,
} from "react-icons/fi";
import { useSearchTalents } from "@/hooks/api/useProfile";
import {
  useAddProjectMember,
  useProjectMembers,
  useProject,
  useRemoveProjectMember,
} from "@/hooks/api/useProject";
import { User as UserType } from "@/types/api";
import { useTranslations } from "next-intl";

// ─── Types ───────────────────────────────────────────────────
interface AddTeamMemberModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projectId: number;
}

// ─── Sub-components ──────────────────────────────────────────

/** Search results list item */
function TalentListItem({
  talent,
  status,
  t,
  onSelect,
  onCancel,
}: {
  talent: UserType;
  status: string | null;
  t: any;
  onSelect: (talent: UserType) => void;
  onCancel: (id: number) => void;
}) {
  const isExisting = status === "ACCEPTED" || status === "OWNER";
  const isPending = status === "PENDING";

  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-xl transition-all border border-transparent ${
        isExisting
          ? "opacity-60 cursor-not-allowed bg-zinc-50/50 dark:bg-zinc-800/30"
          : "hover:bg-primary-50 dark:hover:bg-primary-500/10 cursor-pointer hover:border-primary-100 dark:hover:border-primary-500/20"
      }`}
      onClick={() => !isExisting && !isPending && onSelect(talent)}
    >
      <User
        name={`${talent.firstName} ${talent.lastName}`}
        description={talent.jobTitle}
        avatarProps={{ src: talent.avatar || undefined }}
      />
      {isExisting ? (
        <Chip size="sm" variant="flat" color="default">
          {status === "OWNER" ? t("owner") : t("alreadyMember")}
        </Chip>
      ) : isPending ? (
        <div className="flex items-center gap-2">
          <Chip size="sm" variant="flat" color="warning">
            {t("invited")}
          </Chip>
          <Button
            size="sm"
            color="danger"
            variant="light"
            onPress={() => {
              onCancel(talent.id);
            }}
            className="h-7 px-2 min-w-0"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          color="primary"
          variant="light"
          isIconOnly
          aria-label="Select Member"
          onPress={() => onSelect(talent)}
          className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"
        >
          <FiUserPlus className="text-lg" />
        </Button>
      )}
    </div>
  );
}

/** Empty state when search yields no results */
function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
        <FiSearch className="text-xl text-zinc-400" />
      </div>
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        No talents found
      </p>
      <p className="text-xs text-zinc-500 mt-1">
        Try adjusting your search query.
      </p>
    </div>
  );
}

/** Loading spinner */
function SearchSpinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── Hooks ───────────────────────────────────────────────────

/** Custom hook encapsulating debounced search state */
function useDebouncedSearch(delay = 500) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), delay);
    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  const reset = useCallback(() => {
    setSearchQuery("");
    setDebouncedSearch("");
  }, []);

  /** True when the debounced value has caught up to the input */
  const isSettled = debouncedSearch === searchQuery;

  return { searchQuery, setSearchQuery, debouncedSearch, reset, isSettled };
}

// ─── Main Component ──────────────────────────────────────────
export function AddTeamMemberModal({
  isOpen,
  onOpenChange,
  projectId,
}: AddTeamMemberModalProps) {
  const t = useTranslations("ProjectDetails.team");

  // ── Local state ──
  const [selectedTalent, setSelectedTalent] = useState<UserType | null>(null);
  const [projectRole, setProjectRole] = useState("");
  const { searchQuery, setSearchQuery, debouncedSearch, reset, isSettled } =
    useDebouncedSearch();

  // ── Data fetching ──
  const { data: talentsData, isLoading: isSearching } = useSearchTalents(
    debouncedSearch,
    isOpen && !selectedTalent,
  );
  const { data: membersRes } = useProjectMembers(projectId, {
    enabled: isOpen,
  });
  const { data: projectRes } = useProject(projectId, { enabled: isOpen });
  const { mutate: addMember, isPending: isSubmitting } = useAddProjectMember();
  const { mutate: removeMember } = useRemoveProjectMember();

  // ── Derived data ──
  const talents = talentsData?.data || [];
  const members = membersRes?.data || [];
  const project = projectRes?.data;

  const getMemberStatus = useCallback(
    (talentId: number) => {
      if (project?.ownerId === talentId) return "OWNER";
      const member = members.find((m) => m.userId === talentId);
      return member?.status || null;
    },
    [members, project?.ownerId],
  );

  const handleCancelInvitation = (talentId: number) => {
    const member = members.find((m) => m.userId === talentId);
    if (!member) return;

    removeMember(
      { projectId, userId: member.userId },

      {
        onSuccess: (res) => {
          addToast({ title: res.message as string, color: "success" });
        },
      },
    );
  };

  const showEmptyState =
    !isSearching &&
    isSettled &&
    searchQuery.length >= 2 &&
    talents.length === 0;

  // ── Handlers ──
  const handleClose = useCallback(() => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedTalent(null);
      setProjectRole("");
      reset();
    }, 300);
  }, [onOpenChange, reset]);

  const handleConfirm = () => {
    if (!selectedTalent || !projectRole.trim()) return;

    addMember(
      {
        projectId,
        userId: selectedTalent.id,
        role: projectRole.trim(),
      },
      {
        onSuccess: (res) => {
          addToast({ title: res.message as string, color: "success" });
          handleClose();
        },
      },
    );
  };

  // ── Render ──
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      size="md"
      backdrop="blur"
      classNames={{
        base: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {/* ── Header ── */}
            <ModalHeader className="flex flex-col gap-1 px-6 py-4">
              {selectedTalent ? (
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setSelectedTalent(null)}
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    <FiArrowLeft className="text-lg" />
                  </Button>
                  <span className="text-lg font-semibold tracking-tight">
                    Assign Project Role
                  </span>
                </div>
              ) : (
                <span className="text-lg font-semibold tracking-tight">
                  {t("addMember")}
                </span>
              )}
            </ModalHeader>

            {/* ── Body ── */}
            <ModalBody className="px-6 py-4">
              {!selectedTalent ? (
                /* Step 1: Search */
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t("searchDescription")}
                  </p>
                  <Input
                    placeholder={t("searchPlaceholder")}
                    startContent={<FiSearch className="text-zinc-400" />}
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    variant="bordered"
                    radius="lg"
                    isClearable
                    classNames={{
                      inputWrapper:
                        "border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 hover:border-primary-500 transition-colors",
                    }}
                  />
                  <div className="flex flex-col gap-2 mt-2 max-h-[300px] overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {isSearching ? (
                      <SearchSpinner />
                    ) : talents.length > 0 ? (
                      talents.map((talent) => (
                        <TalentListItem
                          key={talent.id}
                          talent={talent}
                          status={getMemberStatus(talent.id)}
                          t={t}
                          onSelect={setSelectedTalent}
                          onCancel={handleCancelInvitation}
                        />
                      ))
                    ) : showEmptyState ? (
                      <EmptySearchState />
                    ) : null}
                  </div>
                </div>
              ) : (
                /* Step 2: Assign Role */
                <div className="flex flex-col items-center text-center py-4 gap-6 animate-appearance-in">
                  <div className="flex flex-col items-center gap-3 w-full">
                    <Avatar
                      src={selectedTalent.avatar || undefined}
                      className="w-20 h-20 text-large ring-4 ring-primary-50 dark:ring-primary-500/10 shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {selectedTalent.firstName} {selectedTalent.lastName}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {selectedTalent.jobTitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-left">
                    <Input
                      label="Project Role"
                      labelPlacement="outside"
                      placeholder="e.g. Lead Designer, Frontend Developer"
                      startContent={<FiBriefcase className="text-zinc-400" />}
                      value={projectRole}
                      onValueChange={setProjectRole}
                      variant="bordered"
                      radius="lg"
                      classNames={{
                        label:
                          "font-medium text-zinc-700 dark:text-zinc-300 mb-1",
                        inputWrapper:
                          "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
                      }}
                    />
                    <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                      Specify the role this member will play in this specific
                      project. This helps organize the team structure.
                    </p>
                  </div>
                </div>
              )}
            </ModalBody>

            {/* ── Footer ── */}
            <ModalFooter className="px-6 py-4">
              {!selectedTalent ? (
                <Button color="danger" variant="light" onPress={handleClose}>
                  Cancel
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button
                    color="default"
                    variant="flat"
                    onPress={() => setSelectedTalent(null)}
                    className="flex-1 font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleConfirm}
                    isLoading={isSubmitting}
                    isDisabled={!projectRole.trim()}
                    className="flex-1 font-medium shadow-md shadow-primary-500/20"
                    endContent={!isSubmitting && <FiCheck />}
                  >
                    Add to Team
                  </Button>
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
