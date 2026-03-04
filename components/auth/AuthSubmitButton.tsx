import { Button, ButtonProps } from "@heroui/button";

export const AuthSubmitButton = (props: ButtonProps) => {
  const { className, ...rest } = props;
  return (
    <Button
      fullWidth
      color="primary"
      size="lg"
      radius="sm"
      className={`font-bold ${className || ""}`}
      {...rest}
    />
  );
};
