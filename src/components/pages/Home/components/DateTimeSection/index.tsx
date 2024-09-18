import React from "react";
import { PlusIconWhite } from "@/components/icons/PlusIconWhite";
import { NotebookPen } from "lucide-react";
import Clock from "../Clock";
import Calendar from "../Calendar";
import StopWatch from "../Stopwatch";

const style = {
  container: {
    display: "flex",
    width: "324px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: "24px",
    flexWrap: "wrap",
    marginTop: "92px",
    marginLeft: "68px",
  },
  addNoteButton: {
    display: "flex",
    padding: "var(--Spacing-5, 20px)",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    borderRadius: "99px",
    background: "rgba(24, 24, 27, 0.35)",
    backdropFilter: "blur(5px)",
  },
  addNoteText: {
    color: "var(--Color-White-0, #FFF)",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    textTransform: "uppercase",
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
    cursor: "pointer",
  },
};

const DateTimeSection = ({ hideTimer }: { hideTimer: string }) => {
  return (
    <div style={style.container as React.CSSProperties}>
      <div>
        <Clock />
      </div>
      <div>
        <Calendar />
      </div>
      {hideTimer != "true" && (
        <div>
          <StopWatch />
        </div>
      )}
    </div>
  );
};

export default DateTimeSection;
