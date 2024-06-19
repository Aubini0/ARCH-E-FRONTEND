import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useState } from "react";
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

  return (
    <Tabs
      value={tab}
      defaultValue={tab}
      className={cn(
        "md:w-[450px] font-onest px-3 pt-6 pb-0 rounded-[30px] w-full",
        !isDrawer && "border-2 border-secondary"
      )}
    >
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab, i) => (
          <TabsTrigger
            onClick={() => setTab(tab.value)}
            key={i}
            value={tab.value}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => {
        return (
          <TabsContent key={i} value={tab.value}>
            {tab.element}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default AuthForm;
