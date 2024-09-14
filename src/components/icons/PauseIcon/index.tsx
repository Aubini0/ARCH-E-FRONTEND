import React, { FC } from "react";

interface IPauseIcon extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
}

export const PauseIcon: FC<IPauseIcon> = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) => (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Stop">
    <path id="Vector" d="M14 3.5V12.5C14 12.7652 13.8946 13.0196 13.7071 13.2071C13.5196 13.3946 13.2652 13.5 13 13.5H4C3.73478 13.5 3.48043 13.3946 3.29289 13.2071C3.10536 13.0196 3 12.7652 3 12.5V3.5C3 3.23478 3.10536 2.98043 3.29289 2.79289C3.48043 2.60536 3.73478 2.5 4 2.5H13C13.2652 2.5 13.5196 2.60536 13.7071 2.79289C13.8946 2.98043 14 3.23478 14 3.5Z" fill="white"/>
    </g>
  </svg>
);
