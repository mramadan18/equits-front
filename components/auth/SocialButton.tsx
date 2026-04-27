import { Button, ButtonProps } from "@heroui/button";
import { FcGoogle } from "react-icons/fc";

interface SocialButtonProps extends ButtonProps {
  text: string;
}

export const SocialButton = ({ text, ...props }: SocialButtonProps) => {
  return (
    <Button
      variant="bordered"
      size="lg"
      radius="sm"
      className="w-full relative border-default-200 bg-transparent font-medium"
      {...props}
    >
      <FcGoogle className="text-xl absolute start-4" />
      <span className="font-bold text-gray text-sm select-none">{text}</span>
    </Button>
  );
};
