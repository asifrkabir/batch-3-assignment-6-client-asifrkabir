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
import { useUserLogin } from "@/hooks/auth.hook";
import { loginValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { ILoginResponse } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";
import { Label } from "../ui/label";
import httpStatus from "http-status";
import { toast } from "sonner";
import { setTokens } from "@/services/AuthService";

const defaultValues = {
  email: "john.user@example.com",
  password: "password123",
};

export function LoginForm() {
  const { mutate: handleUserLogin } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data, {
      onSuccess: (res: IApiResponse<ILoginResponse>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Login successful!");
          setTokens(res.data!.accessToken, res.data!.refreshToken);
        } else {
          toast.error(res.message);
        }
      },
      onError: () => {
        toast.error("Login failed. Please try again later");
      },
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
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
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
