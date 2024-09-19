import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { ComponentType } from "react";

interface AuthProps {}

const withAuth = <P extends object>(Component: ComponentType<P & AuthProps>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { auth, loading } = useAppSelector((state) => state.auth);

    if (loading) {
      return null;
    }

    if (!loading && !auth) {
      router.replace(`/auth/login`);
      return null;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};

export default withAuth;
