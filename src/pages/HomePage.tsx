/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
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
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import WorkoutForm from "../formComponent/WorkoutForm";
import { useForm } from "react-hook-form";
import { CustomModal } from "../formComponent/CustomModal";

export default function HomePage() {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    console.log(data);
    mutateAsync(data);
    reset();
  };

  const columns = useMemo(() => COLUMNS, []);
  const table = useReactTable({
    data: workouts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <Flex flexDir={"column"} pb={4}>
      <Button minW={"200px"} w={"20px"} onClick={onOpen} mb={4}>
        Add Workout
      </Button>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
        handleClose={handleClose}
        loading={adding}
        heading="Add Workouts"
        loadingText="Adding"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      >
        <>
          <WorkoutForm name="title" control={control} placeholder="Title" />
          <WorkoutForm name="reps" control={control} placeholder="Reps" />
          <WorkoutForm name="load" control={control} placeholder="Load" />
        </>
      </CustomModal>

      <TableContainer
        border={"1px solid"}
        borderColor={"purple"}
        borderRadius={"10px"}
      >
        <Table>
          <Thead border={1} bg={"gray.200"}>
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
          {!workouts && (
            <Tbody>
              <Tr>
                <Td>
                  <Text>No data found</Text>
                </Td>
              </Tr>
            </Tbody>
          )}
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
              {table.getRowModel()?.rows?.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Flex>
  );
}
