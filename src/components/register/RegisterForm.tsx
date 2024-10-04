"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useUserRegistration } from "@/hooks/auth.hook";
import { registerValidationSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import React from "react";
import AppTextarea from "../form/AppTextarea";
import { IRegisterResponse } from "@/types/auth.type";
import { IApiResponse } from "@/types";
import httpStatus from "http-status";

const defaultValues = {
  name: "John User 5",
  email: "john.user5@example.com",
  password: "password123",
  bio: "This is my bio",
};

export function RegisterForm() {
  const { setIsLoading: setUserLoading } = useUser();
  const {
    mutate: handleUserRegister,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const registrationData = {
      ...data,
    };

    formData.append("data", JSON.stringify(registrationData));

    handleUserRegister(formData, {
      onSuccess: (res: IApiResponse<IRegisterResponse>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Registration successful!");
          setUserLoading(true);
        } else {
          console.log(res);
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Registration failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // You can redirect or perform another action after successful registration
    }
  }, [isSuccess]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              resolver={zodResolver(registerValidationSchema)}
            >
              <AppInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                required
              />

              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <AppInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />

              <AppTextarea
                name="bio"
                label="Bio"
                type="text"
                placeholder="Enter your bio"
              />

              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </AppForm>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
