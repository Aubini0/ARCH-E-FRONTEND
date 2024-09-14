import {ArrowTopIcon} from "@/components/icons/ArrowTopIcon";
import React, {useState} from "react";
import styled from "styled-components";

const style = {
    container: {
        display: "flex",
        width: "280px",
        padding: "16px 16px 24px 16px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "24px",
        background: "#18181B",
        marginTop: '2px'
    },
    label: {
        color: "#FFF",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "32px",
        letterSpacing: "-0.196px"
    },
    dropdown: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        borderRadius: "12px",
        border: "#3D3D3D",
    },
    input: {
        display: "flex",
        padding: "8px 12px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        cursor: 'pointer'
    },
    item: {
        display: "flex",
        padding: "8px 12px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        cursor: 'pointer',
    },
    input_text: {
        color: "#FFF",
        fontFamily: "Poppins",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "32px",
        letterSpacing: "-0.252px"
    }
}

interface Props {}

const ChooseRoom: React.FC<Props> = () => {
    const [isShow, setIsShow] = useState(true)
    return (
        <div className="chooseRoom" style={style.container as React.CSSProperties}>
            <div style={style.label as React.CSSProperties}>🏡 Your rooms:</div>
            <div style={{...style.dropdown, background: isShow ? "#27272A" : ''} as React.CSSProperties}>
                <div className="chooseRoom_item" onClick={() => setIsShow(!isShow)} style={style.input as React.CSSProperties}>
                    <div style={style.input_text}>Aubin’s Room</div>
                    {/* <div style={{transform: isShow ? '' : 'rotateX(150deg)'}}><ArrowTopIcon /></div> */}
                </div>
                {/* {isShow ? 
                    <>
                        <div className="chooseRoom_item" style={style.item as React.CSSProperties}>
                            <div style={style.input_text}>Aubin’s Room 01</div>
                        </div>
                        <div className="chooseRoom_item" style={style.item as React.CSSProperties}>
                            <div style={style.input_text}>Aubin’s Room 02</div>
                        </div>
                    </> : <></>
                } */}
            </div>
        </div>
    )
};

export default ChooseRoom;
