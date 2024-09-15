import React, { FC } from "react";

interface IPlayIcon extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
}

export const PlayIcon: FC<IPlayIcon> = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) => (
  <svg aria-hidden="true" width="17" height="16" fill="#ffffff" viewBox="0 0 17 18"><path d="M3 2.87a1 1 0 0 1 1.55-.83l9.2 6.13a1 1 0 0 1 0 1.66l-9.2 6.13A1 1 0 0 1 3 15.13z"></path></svg>
);
