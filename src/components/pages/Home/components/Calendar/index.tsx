import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { Calendar as CalendarPicker } from "@nextui-org/react";

const style = {
  container: {
    width: "150px",
    height: "150px",
    flexShrink: "0",
    borderRadius: "16px",
    background: "rgba(24, 24, 27, 0.35)",
    backdropFilter: "blur(5px)",
    position: "relative",
    textAlign: "center",
  },
  dayName: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "16px",
    paddingTop: "26px",
  },
  dayNumber: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontSize: "56px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "100%",
    marginTop: "5px",
  },
  mounthName: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "16px",
    marginTop: "3px",
  },
  calendar: {
    display: "inline-flex",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    borderRadius: "99px",
    background: "#E9EFF4",
    position: "absolute",
    right: "6px",
    top: "6px",
    cursor: "pointer",
  },
  calendarPicker: {
    position: "absolute",
    top: "45px",
    left: "120px",
    zIndex: 2,
  },
};

interface dateType {
  mounthName: string;
  dayNumber: string | number;
  dayName: string;
}

const Calendar = () => {
  const [date, setDate] = useState<dateType | null>();
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const d = new Date();
    let mounthName = month[d.getMonth()];
    let dayName = days[d.getDay()];
    setDate({
      mounthName,
      dayName,
      dayNumber: d.getDate(),
    });
  }, []);

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={style.container as React.CSSProperties}>
          {/* <div onClick={() => setIsOpen(!isOpen)} style={style.calendar as React.CSSProperties}>
            <CalendarIcon />
          </div> */}
          <div style={style.dayName as React.CSSProperties}>{date?.dayName}</div>
          <div style={style.dayNumber as React.CSSProperties}>{date?.dayNumber}</div>
          <div onClick={() => console.log()} style={style.mounthName as React.CSSProperties}>
            {date?.mounthName}
          </div>
        </div>
        {isOpen ? (
          <>
            <div style={style.calendarPicker as React.CSSProperties}>
              <CalendarPicker
                onChange={(e) =>
                  setDate({
                    dayNumber: e.day,
                    dayName: days[new Date(`${e.month}/${e.day}/${e.year}`).getDay()],
                    mounthName: month[e.month],
                  })
                }
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {isOpen ? (
        <>
          <div onClick={() => setIsOpen(!isOpen)} style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", top: 0, left: 0 }}></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Calendar;
