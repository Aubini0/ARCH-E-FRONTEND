import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import z from "zod";
import { emailRegex, passwordRegex } from "@/constants/regex";
import { useAppDispatch } from "@/store/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/hooks/api/auth";
import { setAuth } from "@/redux/auth/authSlice";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { AnimatedInput } from "@/components/ui/animated-input";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

interface ILogin {
  handleGoToSignUp?: () => void;
  onLogin?: () => void;
}

const formSchema = z.object({
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
  password: z.string().regex(passwordRegex, {
    message: "Password should contain at least one uppercase, one lowercase, on special character and one number",
  }),
});

type FormType = z.infer<typeof formSchema>;

const Login: FC<ILogin> = ({ onLogin, handleGoToSignUp }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset, getValues } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading } = useSignIn();

  const onSubmit = (data: FormType) => {
    mutate(data, {
      onSuccess: (data) => {
        const { success, access_token, data: userData } = data;
        if (success) {
          reset();
          dispatch(setSignInModal({ open: false }));
          dispatch(
            setAuth({
              access_token,
              auth: true,
              user: JSON.parse(userData),
              loading: false,
            })
          );
          router.replace("/");
          onLogin && onLogin();
          queryClient.resetQueries();
        }
      },
      onError: (error) => {
        toast({
          title: error.response?.data.message || "Something went wrong",
          description: `${error.response?.data.message || "Something went wrong"}. Unable to sign in`,
          action: (
            <ToastAction onClick={() => onSubmit(getValues())} className="bg-red-500 border-red-500 hover:bg-red-500" altText="Try Again">
              Try Again
            </ToastAction>
          ),
          itemID: "sign-in",
        });
      },
    });
  };

  return (
    <div className="flex lg:min-w-[800px] my-5">
      <div className="flex-1 relative xl:min-h-[500px] rounded-3xl overflow-hidden">
        <Image src={"/images/auth-banner.png"} fill alt="auth banner" className="object-cover" />
      </div>
      <div
        className={cn(
          "text-black flex-1 flex flex-col justify-center bg-white border border-gray-200 dark:border-transparent dark:bg-dark-background dark:text-white w-full md:w-[400px] rounded-3xl font-poppins py-10"
        )}
      >
        <div className="flex flex-col items-center justify-center mb-10">
          <Image onClick={() => router.push("/")} src={theme === "dark" ? "/images/logo.png" : "/images/logo-light.png"} alt="Logo Image" width={50} height={50} className="cursor-pointer" />
          <h4 className="font-medium font-poppins text-[20px] mt-4">Welcome To Arche</h4>
        </div>
        <div className="px-10">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => <AnimatedInput {...field} error={fieldState.error} autoComplete="off" label="Email" id="email" type="email" placeholder="nickboston@example.com" />}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => {
                  return <AnimatedInput {...field} autoComplete="off" label="Password" id="new-password" type={passwordVisible ? "text" : "password"} error={error} placeholder="********" />;
                }}
              />
            </div>
            <div className="flex flex-col !mt-6 gap-6">
              <Button type="submit" isLoading={isLoading} className="w-full">
                Login
              </Button>
            </div>
            <div className="w-full">
              <p className="text-gray-600 dark:text-white font-medium text-sm">
                Don&apos;t have an account?{" "}
                <button onClick={() => handleGoToSignUp && handleGoToSignUp()} className="outline-none border-none text-primary font-semibold">
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
