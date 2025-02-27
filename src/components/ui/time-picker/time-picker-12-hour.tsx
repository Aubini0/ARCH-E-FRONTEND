"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./period-select";
import { Period } from "./time-picker-utils";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  showLabel?: false;
  disabled?: boolean;
}

export function TimePicker12({ date, setDate, showLabel, disabled }: TimePickerProps) {
  const [period, setPeriod] = React.useState<Period>("PM");

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        {showLabel && (
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        )}
        <TimePickerInput disabled={disabled} picker="12hours" period={period} date={date} setDate={setDate} ref={hourRef} onRightFocus={() => minuteRef.current?.focus()} />
      </div>
      <div className="grid gap-1 text-center">
        {showLabel && (
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
        )}
        <TimePickerInput
          disabled={disabled}
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        {showLabel && (
          <Label htmlFor="period" className="text-xs">
            Period
          </Label>
        )}
        <TimePeriodSelect disabled={disabled} period={period} setPeriod={setPeriod} date={date} setDate={setDate} ref={periodRef} onLeftFocus={() => secondRef.current?.focus()} />
      </div>
    </div>
  );
}
