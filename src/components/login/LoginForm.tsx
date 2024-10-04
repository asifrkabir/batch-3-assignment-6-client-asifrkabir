"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import { loginValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { ILoginResponse } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";
import { Label } from "../ui/label";
import React from "react";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

const defaultValues = {
  email: "john.user4@example.com",
  password: "password123",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: setUserLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data, {
      onSuccess: (res: IApiResponse<ILoginResponse>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Login successful!");
          setUserLoading(true);
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              resolver={zodResolver(loginValidationSchema)}
            >
              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <div>
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <AppInput
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </AppForm>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
