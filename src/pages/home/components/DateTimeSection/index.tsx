import React from "react";
import Clock from "@/pages/home/components/Clock";
import Calendar from "@/pages/home/components/Calendar";
import {PlusIconWhite} from "@/components/icons/PlusIconWhite";
import StopWatch from "@/pages/home/components/Stopwatch";

const style = {
    container: {
        display: 'flex',
        width: '324px',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        gap: '24px',
        flexWrap: 'wrap',
        marginTop: '92px',
        marginLeft: '68px'
    },
    addNoteButton: {
        display: "flex",
        padding: "var(--Spacing-5, 20px)",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        flexShrink: 0,
        borderRadius: "99px",
        background: "rgba(24, 24, 27, 0.35)",
        backdropFilter: "blur(5px)"
    },
    addNoteText: {
        color: "var(--Color-White-0, #FFF)",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        textTransform: "uppercase"
    },
    addNotePlus: {
        width: "24px",
        height: "24px",
        flexShrink: 0,
        borderRadius: "99px",
        background: "#383838",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: 'pointer',
    }
}

const DateTimeSection = () => {
    return (
        <div style={style.container as React.CSSProperties}>
            <div>
                <Clock />
            </div>
            <div>
                <Calendar />
            </div>
            <div style={style.addNoteButton as React.CSSProperties}>
                <div style={style.addNoteText as React.CSSProperties}>
                    add note
                </div>
                <div style={style.addNotePlus as React.CSSProperties}>
                    <PlusIconWhite />
                </div>
            </div>
            <div>
                <StopWatch />
            </div>
        </div>
    )
};

export default DateTimeSection;
