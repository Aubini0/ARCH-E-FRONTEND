import React from "react";
import InviteSection from "@/pages/home/components/RightSection/InviteSection";

const style = {
    container: {
        position: 'absolute',
        top: '24px',
        right: 0
    }
}

interface Props {}

const RightSection: React.FC<Props> = () => {
    return (
        <div style={style.container as React.CSSProperties}>
            <InviteSection />
        </div>
    )
};

export default RightSection;
