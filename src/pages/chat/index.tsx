import MainLayout from "@/components/layouts/MainLayout";
import { ChatLayout } from "@/components/pages/Chat/chat-layout";
import React from "react";

const Chat = () => {
  return (
    <MainLayout headerProps={{ className: "py-2" }} className="min-h-screen">
      <ChatLayout navCollapsedSize={3} />
    </MainLayout>
  );
};

export default Chat;
