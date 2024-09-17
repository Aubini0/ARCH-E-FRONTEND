import React from "react";
import { LogoIcon } from "@/components/icons/LogoIcon";

const Header = () => {
    return (
        <div className="h-[24px] bg-opacity-10 flex items-center" style={{background: 'rgba(143, 143, 143, .2)'}}>
            <div className="px-[8px] mr-[12px] mb-[4px]"><LogoIcon/></div>
        </div>
    )
};

export default Header;
