/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_BY_ID", userId],
    queryFn: async () => await getUserById(userId),
    enabled: !!userId,
    refetchOnMount: "always",
    staleTime: 0,
  });
};
