import {
  getAllPosts,
  getAllPostsForNewsfeed,
  getPostByIdForUser,
} from "@/services/PostService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["ALL_POSTS"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetAllPostsForNewsfeed = () => {
  return useQuery({
    queryKey: ["ALL_POSTS_NEWSFEED"],
    queryFn: async () => await getAllPostsForNewsfeed(),
  });
};

export const useGetPostByIdForUser = (postId: string) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => await getPostByIdForUser(postId),
  });
};
