import { ResetIcon } from "@/components/icons/ResetIcon";
import { PauseIcon } from "@/components/icons/PauseIcon";
import React, { useEffect, useState } from "react";
import { SettingIcon } from "@/components/icons/SettingIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";

const style = {
  clock: {
    color: "FFF",
    textAlign: "center",
    fontFamily: '"IBM Plex Sans"',
    fontSize: "68px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "100%",
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    alignSelf: "stretch",
    marginTop: "16px",
  },
  iconCircle: {
    display: "flex",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    borderRadius: "99px",
    background: "#E9EFF4",
    cursor: "pointer",
  },
  actionIcon: {
    display: "flex",
    padding: "12px 40px 12px 32px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "99px",
    background: "#18181B",
    width: "180px",
    cursor: "pointer",
  },
  p: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.176px",
  },
};

interface Props {
  onShowSetting?: () => void;
  time: number;
  setTime: (value: any) => void;
  running: boolean;
  setRunning: (value: boolean) => void;
  startTimeRef: any;
  handleReset: () => void;
}

const TabCountTime: React.FC<Props> = ({ onShowSetting, handleReset, startTimeRef, time, setTime, running, setRunning }) => {
  React.useEffect(() => {
    let startTime: number;
    let interval: any;
    if (running) {
      startTime = Date.now();
      interval = setInterval(() => {
        const timeElapsed = Date.now() - startTime;
        setTime((prevTime: number) => Math.max(prevTime - timeElapsed, 0));
        startTime = Date.now();
        if (time <= 1000) {
          setRunning(false);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  return (
    <>
      <div className="text-white" style={style.clock as React.CSSProperties}>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
      <div style={style.action as React.CSSProperties}>
        <div onClick={handleReset} style={style.iconCircle as React.CSSProperties}>
          <ResetIcon />
        </div>
        <div
          onClick={() => {
            setRunning(!running);
            startTimeRef.current = null;
          }}
          style={style.actionIcon as React.CSSProperties}
        >
          {running ? (
            <>
              <PauseIcon />
              <div style={style.p as React.CSSProperties}>Stop</div>
            </>
          ) : (
            <>
              <PlayIcon />
              <div style={style.p as React.CSSProperties}>Start</div>
            </>
          )}
        </div>
        <div onClick={() => onShowSetting && onShowSetting()} style={style.iconCircle as React.CSSProperties}>
          <SettingIcon />
        </div>
      </div>
    </>
  );
};

export default TabCountTime;
