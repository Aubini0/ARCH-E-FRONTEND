import {ResetIcon} from "@/components/icons/ResetIcon";
import {PauseIcon} from "@/components/icons/PauseIcon";
import React, {useEffect, useState} from "react";
import {SettingIcon} from "@/components/icons/SettingIcon";
import {PlayIcon} from "@/components/icons/PlayIcon";

const style = {
    clock: {
        color: "FFF",
        textAlign: "center",
        fontFamily: '"IBM Plex Sans"',
        fontSize: "68px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "100%"
    },
    action: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
        marginTop: '16px'
    },
    iconCircle: {
        display: "flex",
        padding: "8px",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        borderRadius: "99px",
        background: "#E9EFF4",
        cursor: "pointer"
    },
    actionIcon:  {
        display: "flex",
        padding: "12px 40px 12px 32px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        flex: "1 0 0",
        borderRadius: "99px",
        background: "#18181B",
        width: '180px',
        cursor: "pointer"
    },
    p: {
        color: "#FFF",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "-0.176px"
    }
}

interface Props {
    onChange?: (e : {hours: number | string, minutes: number | string }) => void
    onShowSetting?: () => void
}

const TabCountTime: React.FC<Props> = ({onChange, onShowSetting}) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        let interval: any;
        if (running) {
        interval = setInterval(() => {
            onChange && onChange({
                hours: ("0" + Math.floor((time / 1440000) % 60)).slice(-2),
                minutes: ("0" + Math.floor((time / 60000) % 60)).slice(-2)
            })
            setTime((prevTime) => prevTime + 10);
        }, 10);
        } else if (!running) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);
    return (
        <>
            <div style={style.clock as React.CSSProperties}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </div>
            <div style={style.action as React.CSSProperties}>
                <div onClick={() => setTime(0)} style={style.iconCircle as React.CSSProperties}>
                    <ResetIcon />
                </div>
                <div onClick={() => setRunning(!running)} style={style.actionIcon as React.CSSProperties}>
                    {running ? 
                        <>
                            <PauseIcon />
                            <div style={style.p as React.CSSProperties}>
                                Stop
                            </div>
                        </> : 
                        <>
                            <PlayIcon />
                            <div style={style.p as React.CSSProperties}>
                                Start
                            </div>
                        </>
                    }
                </div>
                <div onClick={() => onShowSetting && onShowSetting()} style={style.iconCircle as React.CSSProperties}>
                    <SettingIcon />
                </div>
            </div>
        </>
    )
};

export default TabCountTime;
