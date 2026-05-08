"use client";

import { Button, Chip, Tooltip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import {
  FaEdit,
  FaClock,
  FaIndustry,
  FaMapMarkerAlt,
  FaChartLine,
  FaTrash,
} from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineCurrencyDollar } from "react-icons/hi";
import { Project } from "@/types/api";
import { useTranslations, useFormatter } from "next-intl";
import { useMemo } from "react";
import { MainRoutes } from "@/types";
import Link from "next/link";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useDeleteProject } from "@/hooks/api/useProject";
import { fmtCurrency, humanStage } from "@/utils/formatters";

export const MyProjectCard = ({ project }: { project: Project }) => {
  const t = useTranslations("Repo.card");
  const format = useFormatter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        onOpenChange();
      },
    });
  };

  const statusCfg = useMemo(
    () => ({
      DRAFT: { label: t("status.draft"), color: "default", dot: "bg-gray4" },
      PENDING_APPROVAL: {
        label: t("status.pending"),
        color: "warning",
        dot: "bg-amber-400",
      },
      PUBLISHED: {
        label: t("status.published"),
        color: "success",
        dot: "bg-emerald-500",
      },
      REJECTED: {
        label: t("status.rejected"),
        color: "danger",
        dot: "bg-red-500",
      },
    }),
    [t],
  );

  const cfg =
    statusCfg[project.status as keyof typeof statusCfg] ?? statusCfg.DRAFT;

  const funding = fmtCurrency(project.fundingAsk);

  return (
    <>
      <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-start">
        {/* ── cover strip ─────────────────────────────────── */}
        <Link
          href={`/${MainRoutes.PROJECTS}/${project.id}`}
          className="block relative h-36 w-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 overflow-hidden"
        >
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title || t("untitled")}
              fill
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <HiOutlineDocumentText className="w-12 h-12 text-primary/20" />
            </div>
          )}

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* status chip – top-right */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
            <Chip
              size="sm"
              color={cfg.color as any}
              variant="flat"
              classNames={{
                base: "backdrop-blur-md bg-white/80 border border-white/40 shadow-sm",
                content: "font-semibold text-xs tracking-wide",
              }}
              startContent={
                <span
                  className={`inline-block w-2 h-2 rounded-full ${cfg.dot} mr-1 rtl:ml-1 rtl:mr-0`}
                />
              }
            >
              {cfg.label}
            </Chip>
          </div>
        </Link>

        {/* ── logo avatar (overlaps cover) ────────────────── */}
        <div className="relative px-5">
          <div className="absolute -top-8 left-5 rtl:left-auto rtl:right-5 w-16 h-16 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center">
            {project.logo ? (
              <Image
                src={project.logo}
                alt="Logo"
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-primary/60">
                {(project.title ?? "P")[0].toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* ── body ────────────────────────────────────────── */}
        <div className="pt-10 px-5 pb-5 flex flex-col gap-3.5">
          {/* title row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-dark truncate leading-snug">
                {project.title || t("untitled")}
              </h3>
              {project.tagline && (
                <p className="text-xs text-gray2 mt-0.5 truncate">
                  {project.tagline}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Tooltip content={t("delete")} placement="top">
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  variant="flat"
                  color="danger"
                  onPress={onOpen}
                >
                  <FaTrash size={14} />
                </Button>
              </Tooltip>
              <Tooltip content={t("resumeEditing")} placement="top">
                <Button
                  as={Link}
                  href={`${MainRoutes.NEW_PROJECT}?id=${project.id}`}
                  isIconOnly
                  size="sm"
                  radius="full"
                  variant="flat"
                  color="primary"
                >
                  <FaEdit size={14} />
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* description */}
          <p className="text-sm text-gray leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {project.elevatorPitch || project.problem || t("noDescription")}
          </p>

          {/* meta pills */}
          <div className="flex flex-wrap gap-2">
            {project.stage && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[11px] font-semibold">
                <FaChartLine className="w-3 h-3" />
                {humanStage(project.stage)}
              </span>
            )}
            {project.industry?.name && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray3 text-gray2 text-[11px] font-semibold">
                <FaIndustry className="w-3 h-3" />
                {project.industry.name}
              </span>
            )}
            {project.serviceArea && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray3 text-gray2 text-[11px] font-semibold">
                <FaMapMarkerAlt className="w-3 h-3" />
                {humanStage(project.serviceArea)}
              </span>
            )}
          </div>

          {/* divider */}
          <div className="h-px bg-gray-100 my-0.5" />

          {/* bottom bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray4 text-[11px]">
              <FaClock className="w-3 h-3" />
              <span>
                {project.updatedAt
                  ? format.dateTime(new Date(project.updatedAt), {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : t("justNow")}
              </span>
            </div>

            {funding && (
              <div className="flex items-center gap-1">
                <HiOutlineCurrencyDollar className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-bold text-dark">{funding}</span>
                <span className="text-xxs text-gray4 font-medium">
                  {t("ask")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t("deleteProjectTitle", { defaultMessage: "Delete Project" })}
        description={t("deleteProjectDescription", {
          defaultMessage:
            "Are you sure you want to delete this project? This action cannot be undone.",
        })}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmLabel={t("delete", { defaultMessage: "Delete" })}
        confirmationText="Delete"
        color="danger"
      />
    </>
  );
};
