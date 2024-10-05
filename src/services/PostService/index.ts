/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IPost } from "@/types";

export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IPost[]>>("/posts");

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const getAllPostsForNewsfeed = async () => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IPost[]>>(
      "/posts/newsfeed"
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const getPostByIdForUser = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IPost>>(
      `/posts/newsfeed/${postId}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};
