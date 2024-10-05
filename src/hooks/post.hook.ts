import { getAllPosts } from "@/services/PostService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: async () => {
      return await getAllPosts();
    },
  });
};
