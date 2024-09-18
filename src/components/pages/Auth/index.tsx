import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useMemo, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

interface IAuthForm {
  isDrawer?: boolean;
}

const AuthForm: FC<IAuthForm> = ({ isDrawer = false }) => {
  const router = useRouter();
  const tabs = [
    {
      name: "Login",
      element: <Login handleGoToSignUp={() => router.push("/auth/register")} />,
      value: "login",
    },
    {
      name: "Sign Up",
      element: <SignUp handleGoToLogin={() => router.push("/auth/login")} />,
      value: "register",
    },
  ];

  const currentTab = useMemo(() => tabs.find((tb) => `/auth/${tb.value}` === router.asPath), [tabs]);

  return currentTab?.element;
};

export default AuthForm;
