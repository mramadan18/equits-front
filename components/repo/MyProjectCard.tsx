"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";
import {
  FaEdit,
  FaClock,
  FaIndustry,
  FaMapMarkerAlt,
  FaChartLine,
} from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineCurrencyDollar } from "react-icons/hi";
import { Project } from "@/types/api";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

/* ── status config ─────────────────────────────────────── */
const STATUS_CFG: Record<
  string,
  {
    label: string;
    color: "default" | "warning" | "success" | "danger";
    dot: string;
  }
> = {
  DRAFT: { label: "Draft", color: "default", dot: "bg-gray4" },
  PENDING_APPROVAL: {
    label: "Pending",
    color: "warning",
    dot: "bg-amber-400",
  },
  PUBLISHED: { label: "Published", color: "success", dot: "bg-emerald-500" },
  REJECTED: { label: "Rejected", color: "danger", dot: "bg-red-500" },
};

/* ── helpers ───────────────────────────────────────────── */
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const fmtCurrency = (v: string | number | null) => {
  if (!v) return null;
  const n = Number(v);
  if (isNaN(n)) return null;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
};

const humanStage = (s: string) =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* ── component ─────────────────────────────────────────── */
export const MyProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();
  const locale = useLocale();
  const cfg = STATUS_CFG[project.status] ?? STATUS_CFG.DRAFT;

  const handleEdit = () => {
    if (project.status === "DRAFT") {
      router.push(`/${locale}/projects/new?id=${project.id}`);
    }
  };

  const funding = fmtCurrency(project.fundingAsk);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      {/* ── cover strip ─────────────────────────────────── */}
      <div className="relative h-36 w-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 overflow-hidden">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title || "Cover"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            color={cfg.color}
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
      </div>

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
              {project.title || "Untitled Project"}
            </h3>
            {project.tagline && (
              <p className="text-xs text-gray2 mt-0.5 truncate">
                {project.tagline}
              </p>
            )}
          </div>

          {project.status === "DRAFT" && (
            <Tooltip content="Resume editing" placement="top">
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="flat"
                color="primary"
                className="shrink-0"
                onPress={handleEdit}
              >
                <FaEdit size={14} />
              </Button>
            </Tooltip>
          )}
        </div>

        {/* description */}
        <p className="text-sm text-gray leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {project.elevatorPitch ||
            project.problem ||
            "No description provided yet."}
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
              {project.updatedAt ? fmtDate(project.updatedAt) : "Just now"}
            </span>
          </div>

          {funding && (
            <div className="flex items-center gap-1">
              <HiOutlineCurrencyDollar className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-dark">{funding}</span>
              <span className="text-[10px] text-gray4 font-medium">ask</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
