import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { emailRegex, passwordRegex } from "@/constants/regex";
import { useSignUp } from "@/hooks/api/auth";
import { setAuth } from "@/redux/auth/authSlice";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import logoImage from "@/assets/images/logo.png";

interface ISignUp {
  handleGoToLogin?: () => void;
  onSignUp?: () => void;
}

const formSchema = z.object({
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
  full_name: z.string({ required_error: "Full Name is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .regex(passwordRegex, {
      message:
        "Password should contain at least one uppercase, one lowercase, on special character and one number",
    }),
});

type FormType = z.infer<typeof formSchema>;

const SignUp: FC<ISignUp> = ({ handleGoToLogin, onSignUp }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { control, handleSubmit, reset, getValues } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const handleFetchLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      let lat, lng: number | undefined;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          resolve({ lat, lng });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  const { mutate, isLoading } = useSignUp();

  const onSubmit = async (data: FormType) => {
    try {
      const location = await handleFetchLocation();
      mutate(
        {
          ...data,
          lat: location.lat,
          long: location.lng,
        },
        {
          onSuccess: (data) => {
            const { success, token, data: userData } = data;
            if (success) {
              reset();
              dispatch(setSignInModal({ open: false }));
              // dispatch(setEditProfile({ open: true }));
              dispatch(
                setAuth({
                  access_token: token,
                  auth: true,
                  user: userData,
                  loading: false,
                })
              );
              onSignUp && onSignUp();
              // handleGoToLogin && handleGoToLogin();
            }
          },
          onError: (error) => {
            toast({
              title: error.response?.data.error || "Something went wrong",
              description: `${
                error.response?.data.error || "Something went wrong"
              }. Unable to sign up`,
              action: (
                <ToastAction className="bg-red-500" altText="Try Again">
                  Try Again
                </ToastAction>
              ),
            });
          },
        }
      );
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        toast({
          title: error.message || "Something went wrong",
          description: `${
            error.message || "Something went wrong"
          }. Unable to sign up`,
          action: (
            <ToastAction
              onClick={() => onSubmit(getValues())}
              className="bg-red-500"
              altText="Try Again"
            >
              Try Again
            </ToastAction>
          ),
          itemID: "sign-up",
        });
      }
    }
  };

  return (
    <Card className="border-secondary w-full md:w-[400px]">
      <CardHeader className="p-[40px] flex flex-row items-center justify-between">
        <Image src={logoImage} alt="Logo Image" width={50} height={50} />
        <h4 className="font-semibold !m-0 text-2xl">Sign Up</h4>
      </CardHeader>
      <CardContent className="pb-[40px] px-[40px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              control={control}
              name="full_name"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  error={fieldState.error}
                  label="Name"
                  id="name"
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  error={fieldState.error}
                  label="Email"
                  id="email"
                />
              )}
            />
          </div>
          <div className="space-y-1">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  error={fieldState.error}
                  inputSuffix={
                    passwordVisible ? (
                      <FaRegEye onClick={() => setPasswordVisible(false)} />
                    ) : (
                      <FaRegEyeSlash onClick={() => setPasswordVisible(true)} />
                    )
                  }
                  autoComplete="off"
                  label="Password"
                  id="new"
                  type={passwordVisible ? "text" : "password"}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign Up
            </Button>
            <div className="flex items-center h-[12px] gap-3">
              <div className="w-full h-[1px] bg-secondary flex-1"></div>
              <div>or</div>
              <div className="w-full h-[1px] bg-secondary flex-1"></div>
            </div>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full gap-1"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </Button>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => handleGoToLogin && handleGoToLogin()}
                className="underline outline-none border-none text-white font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
