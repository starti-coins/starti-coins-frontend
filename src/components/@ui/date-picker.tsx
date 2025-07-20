"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({
  date,
  calendarProps,
  buttonTriggerProps,
}: {
  date?: Date | undefined;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  buttonTriggerProps?: React.ComponentProps<typeof Button>;
}) {
  const [open, setOpen] = React.useState(false);
  const [_date, _setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    if (date) {
      _setDate(date);
    }
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="block font-normal"
          {...buttonTriggerProps}
        >
          <div className="w-full flex items-center justify-between gap-2">
            {_date ? _date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="single"
          selected={_date}
          captionLayout="dropdown"
          onSelect={(newDate) => {
            _setDate(newDate);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
