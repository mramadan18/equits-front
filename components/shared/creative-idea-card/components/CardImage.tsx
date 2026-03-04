import Image from "next/image";

interface CardImageProps {
  image: string;
  title: string;
}

export const CardImage = ({ image, title }: CardImageProps) => (
  <div className="relative w-full h-[220px]">
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
    />
  </div>
);
