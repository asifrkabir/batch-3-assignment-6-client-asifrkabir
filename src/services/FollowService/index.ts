/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, ICreateFollow, IFollow } from "@/types";

export const follow = async (followData: ICreateFollow) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IFollow>>(
      `/follows/${followData.following}`
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
