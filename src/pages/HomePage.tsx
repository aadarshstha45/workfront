/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useCreateWorkout, useFetchWorkout } from "../api/homePage";
import { COLUMNS } from "../data/columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import WorkoutForm from "../formComponent/WorkoutForm";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

export default function HomePage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const displayFrom = () => {
    setShowForm(!showForm);
  };
  const { data: workouts, isLoading } = useFetchWorkout();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      reps: "",
      load: "",
    },
  });

  const { mutateAsync, isLoading: adding } = useCreateWorkout();
  const onSubmit = async (data: any) => {
    mutateAsync(data);
    queryClient.invalidateQueries(workouts);
    reset();
    await queryClient.refetchQueries(workouts);
  };

  const columns = useMemo(() => COLUMNS, []);
  const table = useReactTable({
    data: workouts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Flex flexDir={"column"} justify={"end"} pb={4}>
      <Button minW={"200px"} w={"20px"} onClick={displayFrom} mb={4}>
        {showForm ? "Cancel" : "Add Workout"}
      </Button>
      {showForm ? (
        <form id="workoutForm" onSubmit={handleSubmit(onSubmit)}>
          <WorkoutForm name="title" control={control} placeholder="title" />
          <WorkoutForm name="reps" control={control} placeholder="reps" />
          <WorkoutForm name="load" control={control} placeholder="load" />
          <Button type="submit" isLoading={adding}>
            Add
          </Button>
        </form>
      ) : null}

      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  <Text>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        {isLoading ? (
          <Tbody>
            <Tr>
              <Td>
                <Text>Loading...</Text>
              </Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Flex>
  );
}
