import Queries from "@/components/pages/Queries";
import withAuth from "@/hoc/WithAuth";
import { useRouter } from "next/router";
import React from "react";

const SessionPage = () => {
  const router = useRouter();
  const session_id = router.query.id as string;
  return <Queries session_id={session_id} />;
};

export default withAuth(SessionPage);
