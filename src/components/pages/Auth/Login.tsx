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
import logoImage from "@/assets/images/logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset, getValues } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading } = useSignIn();

  const onSubmit = (data: FormType) => {
    mutate(data, {
      onSuccess: (data) => {
        const { success, token, data: userData } = data;
        if (success) {
          reset();
          dispatch(setSignInModal({ open: false }));
          dispatch(
            setAuth({
              access_token: token,
              auth: true,
              user: userData,
              loading: false,
            })
          );
          onLogin && onLogin();
          queryClient.resetQueries();
        }
      },
      onError: (error) => {
        toast({
          title: error.response?.data.error || "Something went wrong",
          description: `${error.response?.data.error || "Something went wrong"}. Unable to sign up`,
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
    <Card className={cn("text-black dark:text-white w-full md:w-[400px] border-none")}>
      <CardHeader className="p-[40px] flex flex-row items-center justify-center">
        {/* <Image src={logoImage} alt="Logo Image" width={50} height={50} /> */}
        <h4 className="font-semibold !m-0 text-2xl">Sign In</h4>
      </CardHeader>
      <CardContent className="pb-[40px] px-[40px]" onSubmit={handleSubmit(onSubmit)}>
        <form className="space-y-4">
          <div>
            <Controller control={control} name="email" render={({ field, fieldState }) => <Input {...field} error={fieldState.error} autoComplete="off" label="Email" id="email" type="email" />} />
          </div>
          <div>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => {
                return (
                  <Input
                    {...field}
                    inputSuffix={passwordVisible ? <FaRegEye onClick={() => setPasswordVisible(false)} /> : <FaRegEyeSlash onClick={() => setPasswordVisible(true)} />}
                    autoComplete="off"
                    label="Password"
                    id="new-password"
                    type={passwordVisible ? "text" : "password"}
                  />
                );
              }}
            />
          </div>
          {/* <div className="text-right underline font-onest font-semibold !mt-2 text-black dark:text-white">Forgot password?</div> */}
          <div className="flex flex-col gap-6">
            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign In
            </Button>
            {/* <div className="flex items-center dark:text-white text-black h-[12px] gap-3">
              <div className="w-full h-[1px] bg-secondary flex-1"></div>
              <div>or</div>
              <div className="w-full h-[1px] bg-secondary flex-1"></div>
            </div>
            <Button type="button" className="w-full gap-1">
              <FcGoogle className="text-lg" />
              Continue with Google
            </Button> */}
          </div>
          <div className="w-full text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <button onClick={() => handleGoToSignUp && handleGoToSignUp()} className="underline outline-none border-none text-black dark:text-white font-semibold">
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
