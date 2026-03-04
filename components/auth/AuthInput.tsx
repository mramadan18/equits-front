import { Input, InputProps } from "@heroui/input";

export const AuthInput = (props: InputProps) => {
  return (
    <Input
      variant="bordered"
      radius="sm"
      size="lg"
      {...props}
      classNames={{
        inputWrapper:
          "border-default-200 bg-transparent text-default-700 shadow-none",
        ...props.classNames,
      }}
    />
  );
};
