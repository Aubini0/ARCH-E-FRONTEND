import {ClockIcon} from "@/components/icons/ClockIcon";
import {CoffeeIcon} from "@/components/icons/CoffeeIcon";
import React, {useState} from "react";
import TabCountTime from "@/pages/home/components/Stopwatch/TabCountTime";

const style = {
    border: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        flex: "1 0 0"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        flex: "1 0 0"
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
        backdropFilter: "blur(5px)"
    },
    tabs: {
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        borderRadius: "99px",
        background: "#383838"
    },
    tabActive: {
        width: '138px',
        display: "flex",
        padding: "12px 24px 12px 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        flex: "1 0 0",
        borderRadius: "99px",
        background: "#18181B"
    },
    tab: {
        width: '138px',
        display: "flex",
        padding: "12px 24px 12px 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        flex: "1 0 0",
        borderRadius: "99px",
        cursor: "pointer"
    },
    p: {
        color: "#848585",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "-0.176px"
    },
    pActive: {
        color: "#FFF",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "-0.176px"
    },
    clockView: {
        display: "flex",
        height: "64px",
        padding: "8px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
        borderRadius: "11px",
        background: "rgba(24, 24, 27, 0.35)",
        backdropFilter: "blur(5px)"
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
        letterSpacing: "-0.072px"
    },
    number: {
        color: "#FFF",
        fontFamily: "Poppins",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "-0.252px"
    }
}

const StopWatch = () => {
    const [isTab, setIsTab] = useState(1)
    const [hours, setHours] = useState<{hours: number | string, minutes: number | string }>({hours: '00', minutes: '00'})
    const [isShowSetting, setIsShowSetting] = useState(false)
    return (
        <div style={style.border as React.CSSProperties}>
            <div style={style.container as React.CSSProperties}>
                <div style={style.clock as React.CSSProperties}>
                    <div style={style.tabs as React.CSSProperties}>
                        <div onClick={() => setIsTab(1)} style={isTab === 1 ? style.tabActive : style.tab as React.CSSProperties}>
                            <div style={{color: isTab === 1 ? '#fff' : '#848585'}}><ClockIcon /></div>
                            <p style={isTab === 1 ? style.pActive : style.p as React.CSSProperties}>Ongoing</p>
                        </div>
                        <div onClick={() => setIsTab(2)} style={isTab === 2 ? style.tabActive : style.tab as React.CSSProperties}>
                            <div style={{color: isTab === 2 ? '#fff' : '#848585'}}><CoffeeIcon /></div>
                            <p style={isTab === 2 ? style.pActive : style.p as React.CSSProperties}>Break</p>
                        </div>
                    </div>
                    <div>
                        {isTab === 1 ? <TabCountTime onShowSetting={() => setIsShowSetting(!isShowSetting)} onChange={(e) => setHours(e)} /> : <></>}
                    </div>
                </div>
            </div>
            {isShowSetting ? 
                <>
                    <div style={style.clockView as React.CSSProperties}>
                        <div style={style.hours as React.CSSProperties}>
                            <div style={style.text as React.CSSProperties}>
                                Hours
                            </div>
                            <div style={style.number as React.CSSProperties}>
                                {hours.hours}
                            </div>
                        </div>
                        <div style={style.hours as React.CSSProperties}>
                            <div style={style.text as React.CSSProperties}>
                                Minutes
                            </div>
                            <div style={style.number as React.CSSProperties}>
                                {hours.minutes}
                            </div>
                        </div>
                    </div>
                </> : <></> 
            }
        </div>
    )
};

export default StopWatch;
