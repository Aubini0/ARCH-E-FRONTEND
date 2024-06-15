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
import { emailRegex, passwordRegex } from "@/constants/regex";
import { useSignUp } from "@/hooks/api/auth";
import { setAuth } from "@/redux/auth/authSlice";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
  password: z
    .string({ required_error: "Password is required" })
    .regex(passwordRegex, {
      message:
        "Password should contain at least one uppercase, one lowercase, on special character and one number",
    }),
  age: z.number({ required_error: "Age is required" }).min(0),
});

type FormType = z.infer<typeof formSchema>;

const SignUp: FC<ISignUp> = ({ handleGoToLogin, onSignUp }) => {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormType>({
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
            toast.error(error.response?.data.error || "Something went wrong");
          },
        }
      );
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        toast.error(error.message || "Can't fetch location");
      }
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1">
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
          <div className="space-y-1">
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
              name="age"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  error={fieldState.error}
                  onChange={(e) => field.onChange(+e.target.value)}
                  label="Age"
                  id="age"
                  type="number"
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
          <div className="flex-col flex gap-3">
            <Button isLoading={isLoading} className="w-full">
              Sign Up
            </Button>
            <Button variant={"secondary"} className="w-full gap-1">
              <FcGoogle className="text-lg" />
              Sign Up with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
