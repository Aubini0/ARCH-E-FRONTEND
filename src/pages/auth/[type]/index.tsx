import AuthForm from "@/components/pages/Auth";
import { AnimatedInput } from "@/components/ui/animated-input";
import React from "react";

const Auth = () => {
  return (
    <div className="w-screen min-h-screen bg-off-white dark:bg-secondary flex items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default Auth;
