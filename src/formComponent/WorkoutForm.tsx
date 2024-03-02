/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, Input } from "@chakra-ui/react";

import { Control, Controller } from "react-hook-form";

type InputFieldProps = {
  name: string;
  control: Control<any>;
  placeholder: string;
};
export default function WorkoutForm({
  name,
  control,
  placeholder,
}: InputFieldProps) {
  return (
    <>
      <FormControl mb={4} w={80}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Input {...field} placeholder={placeholder} />}
        />
      </FormControl>
    </>
  );
}
