import { Project } from "@/types/api";
import { formatCurrency } from "@/utils";
import { Button } from "@heroui/button";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { useToggleWishlist } from "@/hooks/api/useWishlist";
import { useAuthStore } from "@/stores/useAuthStore";
import { addToast } from "@heroui/toast";

export const FeedIdeaCard = ({ idea }: { idea: Project }) => {
  const { mutate: toggleWishlist, isPending } = useToggleWishlist();
  const { user } = useAuthStore();
  const isSaved = user?.wishlistIds?.includes(idea.id) ?? false;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      addToast({
        title: "Please log in to save projects",
        color: "warning",
      });
      return;
    }

    toggleWishlist(idea.id);
  };

  return (
    <div className="group bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-5 border border-default-100 hover:border-default-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Thumbnail area */}
        <div className="relative w-full sm:w-64 h-48 sm:h-36 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-default-100">
          <Link href={`${MainRoutes.PROJECTS}/${idea.id}`}>
            <Image
              src={`${idea?.cover}`}
              alt={`${idea?.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-dark shadow-sm">
            {idea.stage}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <Link href={`${MainRoutes.PROJECTS}/${idea.id}`}>
                <h3 className="text-lg sm:text-xl font-bold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-1">
                  {idea.title}
                </h3>
              </Link>
              <div className="text-xs text-default-500 mt-1.5 flex items-center gap-1.5">
                <span>Updated {moment(idea.updatedAt).fromNow()}</span>
              </div>
            </div>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              size="sm"
              className={`${isSaved ? "text-primary" : "text-default-400"} hover:text-dark hover:bg-default-100 -mt-1 -mr-1`}
              onClick={handleToggleWishlist}
              isLoading={isPending}
            >
              {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-default-600 leading-relaxed line-clamp-2 mb-4">
            {idea.elevatorPitch}
          </p>

          {/* Footer Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-default-100">
            {/* Social Stats */}
            <div className="flex items-center gap-3">
              {/* {idea?.likes && idea.likes.length > 0 && (
                <AvatarGroup isBordered max={3} size="sm">
                  {idea.likes.map((like) => (
                    <Avatar
                      key={like.user.id}
                      src={`${like.user?.avatar}`}
                      name={`${like.user?.firstName} ${like.user?.lastName}`}
                      fallback={`${like.user?.firstName?.charAt(0)}`}
                      className={{
                        base: "size-4!",
                      }}
                    />
                  ))}
                </AvatarGroup>
              )} */}
              <div className="flex items-center gap-1.5 text-xs text-default-500 font-medium tracking-wide">
                <span>{idea?.likesCount || 0} Likes</span>
                <span className="w-1 h-1 rounded-full bg-default-300" />
                <span>{idea?.commentsCount || 0} Comments</span>
              </div>
            </div>

            {/* Funding Ask */}
            <div className="flex flex-col items-end ml-auto">
              <span className="text-xs text-default-500 font-medium uppercase tracking-wider mb-0.5">
                Funding Ask
              </span>
              <span className="text-lg sm:text-xl font-bold text-dark leading-none">
                {formatCurrency(idea?.fundingAsk || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
