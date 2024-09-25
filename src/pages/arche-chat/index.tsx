import Queries from "@/components/pages/Queries";
import withAuth from "@/hoc/WithAuth";
import { useGetSessionId } from "@/hooks/api/auth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const { mutateAsync: getSessionId } = useGetSessionId();
  const router = useRouter();
  const passed_query = router.query.passed_query;

  const handleGetSessionid = async () => {
    try {
      localStorage.removeItem("queries");
      const res = await getSessionId();
      router.replace(`/sessions/${res.data.session_id}${passed_query ? `?passed_query=${passed_query}` : ""}`);
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    handleGetSessionid();
  }, []);

  return <Queries session_id={undefined} />;
};

export default withAuth(Home);
