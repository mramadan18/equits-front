import Link from "next/link";
import { MainRoutes } from "@/types";
import Image from "next/image";

interface CardImageProps {
  projectId: number;
  image?: string;
  title: string;
}

export const CardImage = ({ image, title, projectId }: CardImageProps) => (
  <Link
    href={`${MainRoutes.PROJECTS}/${projectId}`}
    className="relative w-full h-[220px]"
  >
    <Image
      src={`${image}`}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
    />
  </Link>
);
