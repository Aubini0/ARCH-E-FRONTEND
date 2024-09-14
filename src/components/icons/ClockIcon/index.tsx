import React, { FC } from "react";

interface IClockIcon extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
}

export const ClockIcon: FC<IClockIcon> = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) => (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Timer">
    <path id="Vector" d="M8.5 2.5C7.31331 2.5 6.15328 2.85189 5.16658 3.51118C4.17989 4.17047 3.41085 5.10754 2.95673 6.2039C2.5026 7.30026 2.38378 8.50666 2.61529 9.67054C2.8468 10.8344 3.41825 11.9035 4.25736 12.7426C5.09648 13.5818 6.16558 14.1532 7.32946 14.3847C8.49335 14.6162 9.69975 14.4974 10.7961 14.0433C11.8925 13.5892 12.8295 12.8201 13.4888 11.8334C14.1481 10.8467 14.5 9.68669 14.5 8.5C14.4982 6.90926 13.8655 5.38419 12.7406 4.25937C11.6158 3.13455 10.0907 2.50182 8.5 2.5ZM11.3538 6.35375L8.85375 8.85375C8.8073 8.90021 8.75215 8.93706 8.69145 8.9622C8.63075 8.98734 8.5657 9.00028 8.5 9.00028C8.43431 9.00028 8.36925 8.98734 8.30855 8.9622C8.24786 8.93706 8.19271 8.90021 8.14625 8.85375C8.0998 8.8073 8.06295 8.75215 8.03781 8.69145C8.01266 8.63075 7.99972 8.5657 7.99972 8.5C7.99972 8.4343 8.01266 8.36925 8.03781 8.30855C8.06295 8.24786 8.0998 8.19271 8.14625 8.14625L10.6463 5.64625C10.6927 5.5998 10.7479 5.56294 10.8086 5.5378C10.8693 5.51266 10.9343 5.49972 11 5.49972C11.0657 5.49972 11.1308 5.51266 11.1915 5.5378C11.2521 5.56294 11.3073 5.5998 11.3538 5.64625C11.4002 5.69271 11.4371 5.74786 11.4622 5.80855C11.4873 5.86925 11.5003 5.9343 11.5003 6C11.5003 6.0657 11.4873 6.13075 11.4622 6.19145C11.4371 6.25215 11.4002 6.3073 11.3538 6.35375ZM6.5 1C6.5 0.867392 6.55268 0.740215 6.64645 0.646447C6.74022 0.552678 6.86739 0.5 7 0.5H10C10.1326 0.5 10.2598 0.552678 10.3536 0.646447C10.4473 0.740215 10.5 0.867392 10.5 1C10.5 1.13261 10.4473 1.25979 10.3536 1.35355C10.2598 1.44732 10.1326 1.5 10 1.5H7C6.86739 1.5 6.74022 1.44732 6.64645 1.35355C6.55268 1.25979 6.5 1.13261 6.5 1Z" fill="currentColor"/>
    </g>
  </svg>
);
