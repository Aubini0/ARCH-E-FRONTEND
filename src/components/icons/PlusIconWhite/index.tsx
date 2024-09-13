import React, { FC } from "react";

interface IPlusIconWhite extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
}

export const PlusIconWhite: FC<IPlusIconWhite> = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Plus">
    <path id="Vector" d="M10.9786 6.35355C11.0723 6.25979 11.125 6.13261 11.125 6C11.125 5.86739 11.0723 5.74021 10.9786 5.64645C10.8848 5.55268 10.7576 5.5 10.625 5.5H7V1.875C7 1.74239 6.94732 1.61522 6.85355 1.52145C6.75979 1.42768 6.63261 1.375 6.5 1.375C6.36739 1.375 6.24021 1.42768 6.14645 1.52145C6.05268 1.61521 6 1.74239 6 1.875V5.5H2.375C2.24239 5.5 2.11521 5.55268 2.02145 5.64645C1.92768 5.74021 1.875 5.86739 1.875 6C1.875 6.13261 1.92768 6.25979 2.02145 6.35355C2.11522 6.44732 2.24239 6.5 2.375 6.5H6V10.125C6 10.2576 6.05268 10.3848 6.14645 10.4786C6.24021 10.5723 6.36739 10.625 6.5 10.625C6.63261 10.625 6.75979 10.5723 6.85355 10.4786C6.94732 10.3848 7 10.2576 7 10.125V6.5H10.625C10.7576 6.5 10.8848 6.44732 10.9786 6.35355Z" fill="white" stroke="white" stroke-width="0.25"/>
    </g>
  </svg>

  
);
