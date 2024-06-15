import Header from "@/components/shared/Header";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface IMainLayout extends HTMLAttributes<HTMLDivElement> {
  header?: boolean;
  children: React.ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ header = true, children, ...props }) => {
  return (
    <main {...props} className={cn("w-full h-full", props.className)}>
      {header && <Header />}
      {children}
    </main>
  );
};

export default MainLayout;
