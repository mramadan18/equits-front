"use client";

import { useState, useMemo } from "react";
import { Button } from "@heroui/react";
import { User } from "@/types/api";
import { HiOutlineUser } from "react-icons/hi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Link from "next/link";
import { MainRoutes } from "@/types";

interface ProfileAboutProps {
  talent: User;
  t: (key: string) => string;
  isOwnProfile: boolean;
}

const TEXT_COLLAPSE_THRESHOLD = 300;

/**
 * Extract YouTube video ID from various YouTube URL formats.
 */
function extractYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // youtube.com/watch?v=ID
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.has("v")
    ) {
      return parsed.searchParams.get("v");
    }
    // youtu.be/ID
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    // youtube.com/embed/ID
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/embed/")[1];
    }
  } catch {
    // not a valid url
  }
  return null;
}

export const ProfileAbout = ({
  talent,
  t,
  isOwnProfile,
}: ProfileAboutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const overview = talent?.overview || "";
  const isLongText = overview.length > TEXT_COLLAPSE_THRESHOLD;
  const displayText =
    isLongText && !isExpanded
      ? overview.slice(0, TEXT_COLLAPSE_THRESHOLD) + "..."
      : overview;

  const youtubeId = useMemo(
    () => extractYoutubeId(talent?.videoLink),
    [talent?.videoLink],
  );

  const hasContent = overview || youtubeId;

  return (
    <div className="pt-6 mt-6 border-t border-gray3">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
          <HiOutlineUser className="text-lg text-primary" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-dark tracking-tight">
          {t("about")}
        </h2>
      </div>

      {hasContent ? (
        <div className="flex flex-col gap-6">
          {/* Overview Text */}
          {overview && (
            <div>
              <p className="text-gray2 leading-[1.8] text-sm whitespace-pre-line">
                {displayText}
              </p>
              {isLongText && (
                <Button
                  variant="light"
                  color="primary"
                  size="sm"
                  className="mt-2 px-0 min-w-0 h-auto text-sm font-semibold bg-transparent hover:bg-transparent! gap-1"
                  onPress={() => setIsExpanded(!isExpanded)}
                  endContent={
                    isExpanded ? (
                      <IoChevronUp className="text-xs" />
                    ) : (
                      <IoChevronDown className="text-xs" />
                    )
                  }
                >
                  {isExpanded ? "Show less" : "Read more"}
                </Button>
              )}
            </div>
          )}

          {/* YouTube Video Embed */}
          {youtubeId && (
            <div className="group/video relative w-full rounded-xl overflow-hidden shadow-md border border-gray3/80 bg-black">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                  title="Video introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="relative rounded-xl border border-dashed border-gray4/50 bg-gradient-to-br from-gray3/50 to-gray3/20 px-6 py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-gray3 flex items-center justify-center mx-auto mb-3">
            <HiOutlineUser className="text-xl text-gray4" />
          </div>
          <p className="text-gray4 text-sm font-medium mb-1">{t("noAbout")}</p>
          {isOwnProfile && (
            <Button
              as={Link}
              href={MainRoutes.SETTINGS_OVERVIEW}
              variant="flat"
              color="primary"
              size="sm"
              radius="full"
              className="mt-3 font-semibold"
            >
              Add your bio
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
