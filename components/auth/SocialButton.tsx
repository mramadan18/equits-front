import { Button } from "@heroui/button";
import { FcGoogle } from "react-icons/fc";

interface SocialButtonProps {
  text: string;
  onClick?: () => void;
}

export const SocialButton = ({ text, onClick }: SocialButtonProps) => {
  return (
    <Button
      variant="bordered"
      size="lg"
      radius="sm"
      className="w-full relative border-default-200 bg-transparent font-medium"
      onClick={onClick}
    >
      <FcGoogle className="text-xl absolute start-4" />
      <span className="font-bold text-gray text-sm select-none">{text}</span>
    </Button>
  );
};
