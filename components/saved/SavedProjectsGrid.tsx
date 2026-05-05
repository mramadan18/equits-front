import { Project } from "@/types/api";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { FaBookmark, FaStar, FaRegHeart, FaRegComment } from "react-icons/fa";
import { Button } from "@heroui/button";
import { useToggleWishlist } from "@/hooks/api/useWishlist";

const SavedProjectCard = ({ project }: { project: Project }) => {
  const { mutate: toggleWishlist, isPending } = useToggleWishlist();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(project.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-default-100 hover:border-default-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      <Link
        href={`${MainRoutes.PROJECTS}/${project.id}`}
        className="relative h-48 w-full block overflow-hidden bg-default-100"
      >
        <Image
          src={project.cover || ""}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-dark shadow-sm">
          {project.stage}
        </div>
      </Link>
      <Button
        isIconOnly
        radius="full"
        size="sm"
        className="absolute top-3 right-3 bg-white shadow-sm text-primary hover:bg-gray-100 z-10"
        onClick={handleToggleWishlist}
        isLoading={isPending}
      >
        <FaBookmark size={14} />
      </Button>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`${MainRoutes.PROJECTS}/${project.id}`}>
          <h3 className="font-bold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-default-500 line-clamp-2 mb-3 flex-1">
          {project.elevatorPitch}
        </p>

        <div className="flex items-center justify-between mb-3 text-default-500 text-xs">
          <div className="flex items-center gap-1.5">
            <FaStar className="text-warning text-[14px]" />
            <span className="font-medium text-dark">{project.rating || 0}</span>
            <span className="text-default-400">
              ({project.reviewsCount || 0})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <FaRegHeart className="text-[14px]" />
              <span className="font-medium text-dark">
                {project.likesCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComment className="text-[14px]" />
              <span className="font-medium text-dark">
                {project.commentsCount || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center pt-3 border-t border-default-100">
          <div className="text-xs text-default-500">
            <span className="block mb-0.5 uppercase tracking-wider text-[10px]">
              Funding Ask
            </span>
            <span className="font-bold text-dark text-sm">
              {formatCurrency(project.fundingAsk || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SavedProjectsGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <SavedProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
