import { Button } from "@heroui/button";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";

export interface FeedIdea {
  id: string | number;
  title: string;
  stage: string;
  description: string;
  likes: number;
  comments: number;
  fundingAsk: string;
  image: string;
  updatedAt: string;
}

export const FeedIdeaCard = ({ idea }: { idea: FeedIdea }) => {
  return (
    <div className="bg-white rounded-xl border border-gray2 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray2">
          Updated {idea.updatedAt}
        </span>
        <Button
          isIconOnly
          radius="full"
          variant="light"
          className="text-gray2 transition-colors"
        >
          <FaRegBookmark size={24} />
        </Button>
      </div>

      {/* Main Body */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="relative w-full md:w-56 h-48 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border">
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Title & Stage */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-dark leading-tight">
              {idea.title}
            </h3>
            <span className="px-3 py-1 bg-gray3 text-dark text-xs font-medium rounded-full">
              {idea.stage}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray2 leading-relaxed mb-6">
            {idea.description}
          </p>

          {/* Bottom Bar (Stats & Ask) */}
          <div className="flex justify-between items-end mt-auto pt-2 border-t border-transparent">
            {/* Social Stats */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                  <Image
                    src="/images/idea-1.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                  <Image
                    src="/images/idea-2.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                  <Image
                    src="/images/idea-3.png"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-xs text-gray2 font-medium ml-2">
                {idea.likes} Likes <span className="mx-1.5 font-bold">·</span>{" "}
                {idea.comments} Comments
              </div>
            </div>

            {/* Funding Ask */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-dark">
                {idea.fundingAsk}
              </span>
              <span className="text-sm text-gray2 font-medium mb-1">
                Funding Ask
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
