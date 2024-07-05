import Header from "@/components/shared/Header";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface IMainLayout extends HTMLAttributes<HTMLDivElement> {
  header?: boolean;
  children: React.ReactNode;
  headerProps?: HTMLAttributes<HTMLDivElement>;
}

const MainLayout: FC<IMainLayout> = ({
  header = true,
  children,
  headerProps,
  ...props
}) => {
  return (
    <main {...props} className={cn("w-full h-full", props.className)}>
      {header && <Header {...headerProps} />}
      {children}
    </main>
  );
};

export default MainLayout;
