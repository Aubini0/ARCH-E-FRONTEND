import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { emailRegex, passwordRegex } from "@/constants/regex";
import { useSignUp } from "@/hooks/api/auth";
import { cn } from "@/lib/utils";
import { setAuth } from "@/redux/auth/authSlice";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

interface ISignUp {
  handleGoToLogin?: () => void;
  onSignUp?: () => void;
}

const formSchema = z.object({
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
  full_name: z.string({ required_error: "Full Name is required" }),
  password: z.string({ required_error: "Password is required" }).regex(passwordRegex, {
    message: "Password should contain at least 6 characters",
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
  const router = useRouter();
  const { theme } = useTheme();

  const { mutate, isLoading } = useSignUp();

  const onSubmit = async (data: FormType) => {
    try {
      mutate(data, {
        onSuccess: (data) => {
          const { success, access_token, data: userData } = data;
          if (success) {
            reset();
            dispatch(setSignInModal({ open: false }));
            // dispatch(setEditProfile({ open: true }));
            dispatch(
              setAuth({
                access_token,
                auth: true,
                user: JSON.parse(userData),
                loading: false,
              })
            );
            router.replace("/");
            onSignUp && onSignUp();
            // handleGoToLogin && handleGoToLogin();
          }
        },
        onError: (error) => {
          toast({
            title: error.response?.data.message || "Something went wrong",
            description: `${error.response?.data.message || "Something went wrong"}. Unable to sign up`,
            action: (
              <ToastAction className="bg-red-500" altText="Try Again">
                Try Again
              </ToastAction>
            ),
          });
        },
      });
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        toast({
          title: error.message || "Something went wrong",
          description: `${error.message || "Something went wrong"}. Unable to sign up`,
          action: (
            <ToastAction onClick={() => onSubmit(getValues())} className="bg-red-500" altText="Try Again">
              Try Again
            </ToastAction>
          ),
          itemID: "sign-up",
        });
      }
    }
  };

  return (
    <div className="flex md:min-w-[900px] my-5 gap-24">
      <div className="flex-1 mt-auto mb-10 relative aspect-square w-fit h-fit rounded-3xl overflow-hidden">
        <Image src={"/images/auth-banner.png"} fill alt="auth banner" className="object-cover" />
      </div>
      <div
        className={cn(
          "text-black flex-1 flex flex-col justify-center bg-white border border-gray-200 dark:border-transparent dark:bg-dark-background dark:text-white w-full md:w-[400px] rounded-3xl font-poppins py-10"
        )}
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <Image onClick={() => router.push("/")} src={theme === "dark" ? "/images/logo.png" : "/images/logo-light.png"} alt="Logo Image" width={50} height={50} className="cursor-pointer" />
          <h4 className="font-medium font-poppins text-[20px] mt-4">Welcome To Arche</h4>
        </div>
        <div className="px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Controller
                control={control}
                name="full_name"
                render={({ field, fieldState }) => <AnimatedInput {...field} error={fieldState.error} label="Name" id="name" placeholder="Enter your name" />}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => <AnimatedInput {...field} error={fieldState.error} label="Email" id="email" placeholder="Enter your email" />}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <AnimatedInput
                    {...field}
                    error={fieldState.error}
                    autoComplete="off"
                    label="Password"
                    id="new"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    inputSuffix={
                      <div onClick={() => setPasswordVisible((pv) => !pv)}>
                        {passwordVisible ? <FaRegEye className="text-gray-200 text-lg" /> : <FaRegEyeSlash className="text-gray-200 text-lg" />}
                      </div>
                    }
                  />
                )}
              />
            </div>
            {/* <div>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field, fieldState }) => (
                  <AnimatedInput {...field} error={fieldState.error} autoComplete="off" label="Confirm Password" id="new" type={passwordVisible ? "text" : "password"} placeholder="*******" />
                )}
              />
            </div> */}
            <div className="flex flex-col !mt-6 gap-6">
              <Button type="submit" isLoading={isLoading} className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="w-full">
              <p className="text-gray-600 dark:text-white font-medium text-sm">
                Already have an account?{" "}
                <button type="button" onClick={() => handleGoToLogin && handleGoToLogin()} className="outline-none border-none text-primary font-semibold">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
