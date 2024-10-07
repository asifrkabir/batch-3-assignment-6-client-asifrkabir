/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPost,
  getAllPosts,
  getAllPostsForNewsfeed,
  getPostByIdForUser,
} from "@/services/PostService";
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  });
};

export const useGetPostByIdForUser = (postId: string) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => await getPostByIdForUser(postId),
  });
};

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
