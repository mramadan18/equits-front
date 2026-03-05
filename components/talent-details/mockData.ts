import { TalentDetailsData, PersonYouMayNeed } from "./types";

export const MOCK_TALENT_DETAILS: TalentDetailsData = {
  id: 1,
  coverImage: "/images/idea-2.png", // Or some default wide image
  avatar: "/images/idea-1.png",
  name: "Remon Eskander",
  verified: true,
  role: "Junior Product Manager",
  organization: "Equits",
  university: "Beni Suif University",
  location: "Egypt, Cairo",
  tags: ["TLNT", "INVS"],
  about:
    "Product Manager with 2+ years of experience leading early-stage digital products from concept to launch, driving adoption, retention, and measurable growth. Skilled in data-driven decision making, cross-functional collaboration, and building scalable, high-impact product solutions.",
  experiences: [
    {
      id: 1,
      image: "/images/idea-3.png",
      role: "Founder & Product Manager",
      organization: "Erazone",
      description:
        "Define the vision and business strategy, build the core team, and lead the product from concept to launch. Translate the vision into a clear roadmap, prioritize high-impact features, and drive execution using data to achieve product-market fit and scalable growth.",
      likes: 68,
      comments: 27,
      rating: 4.8,
    },
    {
      id: 2,
      image: "/images/idea-3.png",
      role: "Founder & Product Manager",
      organization: "Erazone",
      description:
        "Define the vision and business strategy, build the core team, and lead the product from concept to launch. Translate the vision into a clear roadmap, prioritize high-impact features, and drive execution using data to achieve product-market fit and scalable growth.",
      likes: 68,
      comments: 27,
      rating: 4.8,
    },
  ],
};

export const MOCK_PEOPLE_YOU_MAY_NEED: PersonYouMayNeed[] = [
  {
    id: 1,
    avatar: "/images/idea-1.png",
    name: "Alaa Ayman",
    verified: true,
    role: "Job Title",
    level: "ExLv",
    organization: "Organization",
    description:
      "Backend Developer experienced building scalable systems, optimizing performance, and delivering reliable, high-impact backend solutions using data-driven approaches.",
  },
  {
    id: 2,
    avatar: "/images/idea-2.png",
    name: "Arwa Gamal",
    verified: true,
    role: "Junior FrontEnd",
    level: "",
    organization: "Equits",
    description:
      "Front-End Developer experienced creating responsive, user-friendly interfaces, optimizing performance, and delivering high-quality web experiences with modern frameworks.",
  },
  {
    id: 3,
    avatar: "/images/idea-3.png",
    name: "Adham Ali",
    verified: true,
    role: "Student BackEnd",
    level: "",
    organization: "Faculty of computers and AI",
    description:
      "Backend Developer experienced building robust, scalable APIs, improving system performance, and delivering reliable backend solutions using modern technologies.",
  },
];
