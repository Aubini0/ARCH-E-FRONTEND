import React, { useEffect, useState } from "react";

const style = {
    clock: {
        alignSelf: 'stretch',
        color: '#FFF',
        textAlign: 'center',
        fontFamily: "IBM Plex Sans",
        fontSize: '74px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '100%',
        position: 'relative',
        width: '150px',
        height: '74px'
    },
    ampm: {
        position: 'absolute',
        right: '6px',
        top: '13px',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: '16px',
    }
}

interface dateType {
    hours: string | number
    minutes: string | number
    ampm: string
}


const Clock = () => {
    const [date, setDate] = useState<dateType | null>()
    const formatAMPM = (date: Date) => {
        let hours: string | number = date.getHours();
        let minutes: string | number = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        hours = hours < 10 ? '0'+hours : hours;
        let time = {
            hours,
            minutes,
            ampm
        }
        setDate(time)
        return time;
    }

    const tick = () => {
        formatAMPM(new Date)
    }
    
    useEffect(() => {
        formatAMPM(new Date)
        const timer = setInterval(() => tick(), 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])   

    return (
        <div>
            <div style={style.clock as React.CSSProperties}>{date?.hours}<div style={style.ampm as React.CSSProperties}>{date?.ampm?.toUpperCase()}</div></div>
            <div style={{...style.clock, fontWeight: '400'} as React.CSSProperties}>{date?.minutes}</div>
        </div>
    )
};

export default Clock;
