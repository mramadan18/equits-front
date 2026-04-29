"use client";

import { useActiveDraft, useCreateProject } from "@/hooks/api/useProject";
import { useRouter } from "@/i18n/navigation";
import { DraftHeader } from "../../../../components/projects/draft-project/DraftHeader";
import { DraftCard } from "../../../../components/projects/draft-project/DraftCard";
import { DraftLoading } from "../../../../components/projects/draft-project/DraftLoading";
import { EmptyDrafts } from "../../../../components/projects/draft-project/EmptyDrafts";
import { MainRoutes } from "@/types";

export default function ExistingPitchPage() {
  const { data: response, isLoading } = useActiveDraft();
  const { mutateAsync: createProject, isPending: isCreating } =
    useCreateProject();
  const drafts = response?.data || [];
  const router = useRouter();

  const handleStartNew = async () => {
    try {
      const res = await createProject();
      if (res.data?.id) {
        router.push(`${MainRoutes.NEW_PROJECT}?id=${res.data.id}`);
      }
    } catch {}
  };

  const handleContinue = (id: number) => {
    router.push(`${MainRoutes.DRAFT_PROJECTS}/${id}`);
  };

  return (
    <div className="container py-12 px-4">
      <DraftHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <DraftLoading />
        ) : drafts.length > 0 ? (
          drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              onContinue={handleContinue}
            />
          ))
        ) : (
          <EmptyDrafts isCreating={isCreating} onStartNew={handleStartNew} />
        )}
      </div>
    </div>
  );
}
