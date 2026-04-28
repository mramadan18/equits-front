import { FeedIdeaCard, FeedIdea } from "./FeedIdeaCard";

const MOCK_FEED: FeedIdea[] = [
  {
    id: 1,
    title: "Academic Social Media",
    stage: "MVP",
    description:
      "Define the vision and business strategy, build the core team, and lead the product from concept to launch. Translate the vision into a clear roadmap, prioritize high-impact features, and drive execution using data to achieve product-market fit and scalable growth.",
    likes: 68,
    comments: 27,
    fundingAsk: "$4k",
    image: "/images/idea-1.png",
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "The Tech Arm",
    stage: "Prototype",
    description:
      "Define the vision and business strategy, build the core team, and lead the product from concept to launch. Translate the vision into a clear roadmap, prioritize high-impact features, and drive execution using data to achieve product-market fit and scalable growth.",
    likes: 68,
    comments: 27,
    fundingAsk: "$7k",
    image: "/images/idea-2.png",
    updatedAt: "2 hours ago",
  },
  {
    id: 3,
    title: "Virtual Gym",
    stage: "Prototype",
    description:
      "Define the vision and business strategy, build the core team, and lead the product from concept to launch. Translate the vision into a clear roadmap, prioritize high-impact features, and drive execution using data to achieve product-market fit and scalable growth.",
    likes: 68,
    comments: 27,
    fundingAsk: "$5k",
    image: "/images/idea-3.png",
    updatedAt: "2 hours ago",
  },
];

export const FeedGrid = () => {
  return (
    <div className="flex flex-col gap-6">
      {MOCK_FEED.map((idea) => (
        <FeedIdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};
