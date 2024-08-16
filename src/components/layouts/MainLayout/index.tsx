import Header from "@/components/shared/Header";
import MobileBottomTabs from "@/components/shared/MobileBottomTabs";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface IMainLayout extends HTMLAttributes<HTMLDivElement> {
  header?: boolean;
  bottomTab?: boolean;
  children: React.ReactNode;
  headerProps?: HTMLAttributes<HTMLDivElement>;
}

const MainLayout: FC<IMainLayout> = ({ header = true, children, headerProps, bottomTab = true, ...props }) => {
  const { isPhone } = useDeviceIndicator();
  return (
    <main {...props} className={cn("w-full h-full", props.className)}>
      {header && <Header {...headerProps} />}
      {children}
      {bottomTab && isPhone && <MobileBottomTabs />}
    </main>
  );
};

export default MainLayout;
