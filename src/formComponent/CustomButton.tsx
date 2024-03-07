/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@chakra-ui/react";

interface ButtonType {
  type?: "reset" | "submit" | undefined;
  isLoading?: boolean;
  loadingText?: string;
  label: string;
  rest: any;
}
export default function CustomButton({
  type,
  isLoading,
  loadingText,
  label,
  ...rest
}: ButtonType) {
  return (
    <Button
      type={type}
      isLoading={isLoading}
      loadingText={loadingText}
      {...rest}
    >
      {label}
    </Button>
  );
}
