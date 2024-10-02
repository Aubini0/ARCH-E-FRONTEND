import { ClockIcon } from "@/components/icons/ClockIcon";
import { CoffeeIcon } from "@/components/icons/CoffeeIcon";
import React, { useState } from "react";
import TabCountTime from "./TabCountTime";
import useLocalStorage from "use-local-storage";
import Draggable from "react-draggable";

const style = {
  border: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    flex: "1 0 0",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #2D2D2D",
    borderRadius: "16px",
    gap: "8px",
    flex: "1 0 0",
  },
  clock: {
    display: "flex",
    padding: "24px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    alignSelf: "stretch",
    borderRadius: "16px",
    background: "rgba(24, 24, 27, 0.35)",
    backdropFilter: "blur(5px)",
  },
  tabs: {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "99px",
    background: "#383838",
  },
  tabActive: {
    width: "138px",
    display: "flex",
    padding: "12px 24px 12px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "99px",
    background: "#18181B",
  },
  tab: {
    width: "138px",
    display: "flex",
    padding: "12px 24px 12px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "99px",
    cursor: "pointer",
  },
  p: {
    color: "#848585",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.176px",
  },
  pActive: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.176px",
  },
  clockView: {
    display: "flex",
    height: "64px",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    alignSelf: "stretch",
    border: "1px solid #2D2D2D",
    borderRadius: "11px",
    background: "rgba(24, 24, 27, 0.35)",
    backdropFilter: "blur(5px)",
  },
  hours: {
    display: "flex",
    padding: "4px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 0 0",
    borderRadius: "32px",
    border: "1px solid #595959",
    background: "#383838",
  },
  text: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.072px",
  },
  number: {
    color: "#FFF",
    outline: "none",
    border: "none",
    background: "transparent",
    maxWidth: "24px",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.252px",
  },
};
interface Props {
  setTimerPosition: (data: { x: number; y: number }) => void;
  timerPosition: { x: number; y: number };
}
const StopWatch = ({ timerPosition, setTimerPosition }: Props) => {
  const [isTab, setIsTab] = useState(1);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [localSavedTime, setLocalSavedTime] = useLocalStorage("local_saved_time", '[{"minutes": "10", "seconds": "00"}, {"minutes": "10", "seconds": "00"}]');
  const [jsonLocalTime, setJsonLocalTime] = useState([
    { minutes: "10", seconds: "00" },
    { minutes: "10", seconds: "00" },
  ]);

  const startTimeRef = React.useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const handleClickTab = (tab: number) => {
    if (tab != isTab) {
      setIsTab(tab);
      setRunning(false);
      handleReset();
      startTimeRef.current = null;
    }
  };
  const handleReset = () => {
    const localTime = jsonLocalTime[isTab - 1];
    const totalSeconds = parseInt(localTime?.minutes) * 60 + parseInt(localTime?.seconds);
    setTime(totalSeconds * 1000);
    setJsonLocalTime(jsonLocalTime);
  };
  React.useEffect(() => {
    const parsedTime = localSavedTime
      ? JSON.parse(localSavedTime)
      : [
          { minutes: "00", seconds: "00" },
          { minutes: "00", seconds: "00" },
        ];
    if (Array?.isArray(parsedTime)) {
      const localTime = parsedTime[isTab - 1];
      const totalSeconds = parseInt(localTime?.minutes) * 60 + parseInt(localTime?.seconds);
      setTime(totalSeconds * 1000);
      setJsonLocalTime(parsedTime);
    } else {
      setLocalSavedTime('[{"minutes": "10", "seconds": "00"}, {"minutes": "10", "seconds": "00"}]');
    }
  }, [localSavedTime, isTab]);

  const handleSaveTimer = (value: string, key: string) => {
    let numericValue = Math.min(Math.max(parseInt(value, 10), 0), 59);
    const paddedValue = String(numericValue).padStart(2, "0");
    const updatedTime = [...jsonLocalTime];
    updatedTime[isTab - 1] = { ...updatedTime[isTab - 1], [key]: paddedValue };
    setJsonLocalTime(updatedTime);
    setLocalSavedTime(JSON.stringify(updatedTime));
  };

  return (
    <Draggable
      position={timerPosition}
      onDrag={(e, ui) => {
        setTimerPosition({ x: timerPosition?.x + ui.deltaX, y: timerPosition?.y + ui.deltaY });
      }}
      scale={1}
    >
      <div className="cursor-grab absolute top-[35rem] " style={style.border as React.CSSProperties}>
        <div style={style.container as React.CSSProperties}>
          <div style={style.clock as React.CSSProperties}>
            <div style={style.tabs as React.CSSProperties}>
              <div onClick={() => handleClickTab(1)} style={isTab === 1 ? style.tabActive : (style.tab as React.CSSProperties)}>
                <div style={{ color: isTab === 1 ? "#fff" : "#848585" }}>
                  <ClockIcon />
                </div>
                <p style={isTab === 1 ? style.pActive : (style.p as React.CSSProperties)}>Ongoing</p>
              </div>
              <div onClick={() => handleClickTab(2)} style={isTab === 2 ? style.tabActive : (style.tab as React.CSSProperties)}>
                <div style={{ color: isTab === 2 ? "#fff" : "#848585" }}>
                  <CoffeeIcon />
                </div>
                <p style={isTab === 2 ? style.pActive : (style.p as React.CSSProperties)}>Break</p>
              </div>
            </div>
            <div>
              {
                <TabCountTime
                  startTimeRef={startTimeRef}
                  running={running}
                  setRunning={setRunning}
                  time={time}
                  setTime={setTime}
                  onShowSetting={() => setIsShowSetting(!isShowSetting)}
                  handleReset={handleReset}
                />
              }
            </div>
          </div>
        </div>
        {isShowSetting ? (
          <>
            <div style={style.clockView as React.CSSProperties}>
              <div style={style.hours as React.CSSProperties}>
                <div style={style.text as React.CSSProperties}>Minutes</div>
                <input max={59} onChange={(e) => handleSaveTimer(e?.target?.value, "minutes")} value={jsonLocalTime[isTab - 1]?.minutes} type="number" style={style.number as React.CSSProperties} />
              </div>
              <div style={style.hours as React.CSSProperties}>
                <div style={style.text as React.CSSProperties}>Seconds</div>
                <input onChange={(e) => handleSaveTimer(e?.target?.value, "seconds")} max={59} type="number" value={jsonLocalTime[isTab - 1]?.seconds} style={style.number as React.CSSProperties} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Draggable>
  );
};

export default StopWatch;
