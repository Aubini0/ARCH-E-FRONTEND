import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useMemo, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { cn } from "@/lib/utils";

interface IAuthForm {
  isDrawer?: boolean;
}

const AuthForm: FC<IAuthForm> = ({ isDrawer = false }) => {
  const tabs = [
    {
      name: "Login",
      element: <Login handleGoToSignUp={() => setTab("signup")} />,
      value: "login",
    },
    {
      name: "Sign Up",
      element: <SignUp handleGoToLogin={() => setTab("login")} />,
      value: "signup",
    },
  ];

  const [tab, setTab] = useState(tabs[0].value);

  const currentTab = useMemo(
    () => tabs.find((tb) => tb.value === tab),
    [tabs, tab]
  );

  return currentTab?.element;
};

export default AuthForm;
