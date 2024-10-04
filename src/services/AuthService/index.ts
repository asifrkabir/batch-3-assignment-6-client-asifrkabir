/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/lib/NexiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { ILoginResponse } from "@/types/auth.type";
import { IApiResponse } from "@/types";
import httpStatus from "http-status";

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
    const { data } = await nexiosInstance.post<IApiResponse<ILoginResponse>>(
      "/auth/login",
      userData
    );

    if (data.statusCode === httpStatus.OK) {
      cookies().set("accessToken", data.data?.accessToken as string);
      cookies().set("refreshToken", data.data?.accessToken as string);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken?.userId,
      name: decodedToken?.name,
      email: decodedToken?.email,
      profilePicture: decodedToken?.profilePicture,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
