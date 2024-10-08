/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IUser } from "@/types";

export const getUserById = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IUser>>(
      `/users/${userId}`
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
