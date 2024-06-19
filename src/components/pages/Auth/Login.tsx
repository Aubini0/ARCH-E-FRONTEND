import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface ILogin {
  handleGoToSignUp?: () => void;
  onLogin?: () => void;
}

const formSchema = z.object({
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password should contain at least one uppercase, one lowercase, on special character and one number",
  }),
});

type FormType = z.infer<typeof formSchema>;

const Login: FC<ILogin> = ({ onLogin }) => {
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
          description: `${
            error.response?.data.error || "Something went wrong"
          }. Unable to sign up`,
          action: (
            <ToastAction
              onClick={() => onSubmit(getValues())}
              className="bg-red-500 border-red-500 hover:bg-red-500"
              altText="Try Again"
            >
              Try Again
            </ToastAction>
          ),
          itemID: "sign-in",
        });
      },
    });
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to log into your account.
        </CardDescription>
      </CardHeader>
      <CardContent onSubmit={handleSubmit(onSubmit)}>
        <form className="space-y-2">
          <div className="space-y-1">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  error={fieldState.error}
                  autoComplete="off"
                  label="Email"
                  id="email"
                  type="email"
                />
              )}
            />
          </div>
          <div className="space-y-1">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => {
                return (
                  <Input
                    {...field}
                    inputSuffix={
                      passwordVisible ? (
                        <FaRegEye onClick={() => setPasswordVisible(false)} />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => setPasswordVisible(true)}
                        />
                      )
                    }
                    autoComplete="off"
                    label="Password"
                    id="new-password"
                    type={passwordVisible ? "text" : "password"}
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-col !mt-8 gap-3">
            <Button type="submit" isLoading={isLoading} className="w-full">
              Login
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full gap-1"
            >
              <FcGoogle className="text-lg" />
              Login with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
