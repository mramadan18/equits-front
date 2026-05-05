import { Button, ButtonProps } from "@heroui/react";

export const AuthSubmitButton = (props: ButtonProps) => {
  const { className, ...rest } = props;

  return (
    <Button
      type="submit"
      fullWidth
      color="primary"
      size="lg"
      radius="sm"
      className={`font-bold ${className || ""}`}
      {...rest}
    />
  );
};
