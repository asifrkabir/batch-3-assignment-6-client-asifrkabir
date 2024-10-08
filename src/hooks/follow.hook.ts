/* eslint-disable @typescript-eslint/no-explicit-any */
import { follow } from "@/services/FollowService";
import { IFollow } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useFollow = () => {
  return useMutation<any, Error, IFollow>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (followData) => await follow(followData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
