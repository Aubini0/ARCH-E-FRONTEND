import ConversationPage from "@/components/pages/Conversation";
import withAuth from "@/hoc/WithAuth";
import React from "react";

const Conversation = () => {
  return <ConversationPage />;
};

export default withAuth(Conversation);
