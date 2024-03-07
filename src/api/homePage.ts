/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./api";
import { WorkoutHttpClient } from "./axiosSetup";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const fetchWorkout = () => {
  return WorkoutHttpClient.get(api.getWorkouts);
};

const useFetchWorkout = () => {
  return useQuery([api.getWorkouts], fetchWorkout, {
    select: (response) => response?.data?.workouts,
    onError: (error: AxiosError) => {
      toast.error(error?.message, {
        style: {
          backgroundColor: "red",
          borderRadius: "10px",
          color: "white",
        },
      });
    },
  });
};

const createWorkout = (data: any) => {
  return WorkoutHttpClient.post(api.createWorkout, data);
};

const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation(createWorkout, {
    onSuccess: () => {
      toast.success("Workout added", {
        style: {
          backgroundColor: "green",
          borderRadius: "10px",
          color: "white",
        },
      });
      queryClient.invalidateQueries([api.getWorkouts]);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message, {
        style: {
          backgroundColor: "red",
          borderRadius: "10px",
          color: "white",
        },
      });
    },
  });
};

export { useFetchWorkout, useCreateWorkout };
