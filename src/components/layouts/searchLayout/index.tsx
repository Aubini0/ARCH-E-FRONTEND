import EmailTrigger from "@/components/pages/Email";
import SeachHeader from "@/components/shared/Header/searchHeader";
import MobileBottomTabs from "@/components/shared/MobileBottomTabs";
import { Sidebar } from "@/components/shared/sidebar/sidebar";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface IMainLayout extends HTMLAttributes<HTMLDivElement> {
  header?: boolean;
  bottomTab?: boolean;
  children: React.ReactNode;
  headerProps?: HTMLAttributes<HTMLDivElement>;
  emailTrigger?: boolean;
}

const SearchLayout: FC<IMainLayout> = ({ header = true, children, headerProps, bottomTab = true, emailTrigger = false, ...props }) => {
  const { isPhone } = useDeviceIndicator();
  return (
    <main {...props} className={cn("w-full h-full", props.className)}>
      {header && <SeachHeader {...headerProps} />}
      <div className="flex">
        <div className="max-w-[350px] border border-l border-[#27272A] w-full">
          <Sidebar />
        </div>
        {children}
      </div>
      {bottomTab && isPhone && <MobileBottomTabs />}
      {emailTrigger && <EmailTrigger />}
    </main>
  );
};

export default SearchLayout;
