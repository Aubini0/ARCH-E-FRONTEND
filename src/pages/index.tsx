import Queries from "@/components/pages/Queries";
import { useGetSessionId } from "@/hooks/api/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const { mutateAsync: getSessionId } = useGetSessionId();
  const router = useRouter();

  const handleGetSessionid = async () => {
    try {
      const res = await getSessionId();
      router.replace(`/sessions/${res.data.session_id}`);
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    handleGetSessionid();
  }, []);

  return <Queries session_id={undefined} />;
};

export default Home;
