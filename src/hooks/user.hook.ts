/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById, updateUser } from "@/services/UserService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_BY_ID", userId],
    queryFn: async () => await getUserById(userId),
    enabled: !!userId,
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (userData) => await updateUser(userData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
