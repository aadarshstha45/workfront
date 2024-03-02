/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "react-query";
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
      toast.error(error?.message);
    },
  });
};

const createWorkout = (data: any) => {
  return WorkoutHttpClient.post(api.createWorkout, data);
};

const useCreateWorkout = () => {
  return useMutation(createWorkout, {
    onSuccess: () => {
      toast.success("Workout added");
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });
};

export { useFetchWorkout, useCreateWorkout };
