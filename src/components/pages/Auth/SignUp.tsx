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
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input label="First name" id="firstName" />
          </div>
          <div className="flex-1">
            <Input label="Last name" id="lastName" />
          </div>
        </div>
        <div className="space-y-1">
          <Input label="Email" id="current" type="email" />
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
        <Button className="w-full">Sign Up</Button>
        <Button variant={"secondary"} className="w-full gap-1">
          <FcGoogle className="text-lg" />
          Sign Up with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
