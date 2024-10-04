/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/lib/NexiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post("/auth/register", userData);
    console.log(data);

    // if (data.success) {
    //   cookies().set("accessToken", data?.data?.accessToken);
    //   cookies().set("refreshToken", data?.data?.refreshToken);
    // }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    console.log(nexiosInstance);
    const data = await nexiosInstance.post("/auth/login", userData);

    return data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  cookies().set("accessToken", accessToken);
  cookies().set("refreshToken", refreshToken);
};
