import { useVerifyAccess } from "@/hooks/api/auth";
import { queryToString } from "@/lib/utils";
import { setAuth } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

interface IAuthPersist {
  children: React.ReactNode;
}

const AuthPersist: FC<IAuthPersist> = ({ children }) => {
  const router = useRouter();
  const token = queryToString(router.query.token);
  const authType = queryToString(router.query.auth_type);
  const isGoogleTokenPresent = token && authType === "1" ? true : false;
  const dispatch = useAppDispatch();
  useVerifyAccess({
    queryKey: "current_user",
    refetchOnWindowFocus: false,
    enabled: !isGoogleTokenPresent,
    retry: false,
    onSuccess: (data) => {
      dispatch(
        setAuth({
          access_token: data.token,
          auth: true,
          user: JSON.parse(data.data),
          loading: false,
        })
      );
    },
    onError: () => {
      dispatch(
        setAuth({
          access_token: null,
          auth: false,
          user: null,
          loading: false,
        })
      );
    },
  });
  return children;
};

export default AuthPersist;
