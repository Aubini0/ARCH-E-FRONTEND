import React, { useEffect, useState } from "react";

const style = {
  container: {
    position: "absolute",
    top: "20px",
    left: 20,
  },
  container2: {
    display: "flex",
    padding: "20px",
    minHeight: "43px",
    alignItems: "center",
    borderRadius: "40px",
    margin: "20.5px 20px 0 0",
    minWidth: "320px",
  },
};

interface Props {
  onClick: () => void;
}
interface dateType {
  hours: string | number;
  minutes: string | number;
  ampm: string;
}

interface calType {
  mounthName: string;
  dayNumber: string | number;
  dayName: string;
}

const MinimizeClock: React.FC<Props> = ({ onClick }) => {
  const [date, setDate] = useState<dateType | null>();
  const [mount, setMount] = useState(false);
  const [calendarData, setCalendarData] = useState<calType | null>();

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const d = new Date();
    let mounthName = month[d.getMonth()];
    let dayName = days[d.getDay()];
    setCalendarData({
      mounthName,
      dayName,
      dayNumber: d.getDate(),
    });
  }, []);
  const formatAMPM = (date: Date) => {
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    let time = {
      hours,
      minutes,
      ampm,
    };
    setDate(time);
    return time;
  };

  const tick = () => {
    formatAMPM(new Date());
  };

  useEffect(() => {
    formatAMPM(new Date());
    const timer = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    setMount(true);
  }, []);
  return (
    <div onClick={onClick} style={{ ...(style.container as React.CSSProperties), zoom: "67%", zIndex: 99 }}>
      <div style={{ backdropFilter: "blur(5px)" }} className="rounded-full">
        <div
          className="text-white border border-[#2D2D2D] cursor-pointer hover:bg-[#27272a] dark:!bg-secondary/30 bg-secondary/30 flex gap-2 justify-center font-semibold items-center"
          style={style.container2 as React.CSSProperties}
        >
          {mount && (
            <>
              <div>
                {`
           ${calendarData?.dayName}
           ${calendarData?.mounthName}
           ${calendarData?.dayNumber}`}
              </div>
              <div>
                {`${date?.hours} :
        ${date?.minutes}
        ${date?.ampm?.toUpperCase()}`}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimizeClock;
