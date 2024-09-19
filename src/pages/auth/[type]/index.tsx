import AuthForm from "@/components/pages/Auth";
import { AnimatedInput } from "@/components/ui/animated-input";
import withAuth from "@/hoc/WithAuth";
import React from "react";

const Auth = () => {
  return (
    <div className="w-screen min-h-screen bg-white dark:bg-dark-background flex items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default Auth;
