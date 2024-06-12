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
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to log into your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input autoComplete="off" label="Email" id="current" type="email" />
        </div>
        <div className="space-y-1">
          <Input
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
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full">Login</Button>
        <Button variant={"secondary"} className="w-full gap-1">
          <FcGoogle className="text-lg" />
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
