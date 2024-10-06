import {
  getAllPosts,
  getAllPostsForNewsfeed,
  getPostByIdForUser,
} from "@/services/PostService";
import { IQueryParam } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["ALL_POSTS"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetAllPostsForNewsfeed = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["ALL_POSTS_NEWSFEED"],
    queryFn: async () => await getAllPostsForNewsfeed(params),
    enabled: false,
  });
};

export const useGetPostByIdForUser = (postId: string) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => await getPostByIdForUser(postId),
  });
};
