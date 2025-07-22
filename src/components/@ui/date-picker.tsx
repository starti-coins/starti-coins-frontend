"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { FieldPath, UseFormReturn } from "react-hook-form";

export type DatePickerProps<T extends Record<string, unknown>> = {
  label: string;
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  buttonTriggerProps?: React.ComponentProps<typeof Button>;
};

export function FormDatePicker<T extends Record<string, unknown>>({
  label,
  name,
  form,
  calendarProps,
  buttonTriggerProps,
}: DatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        const dateValue = value ? new Date(value as string) : undefined;

        return (
          <FormItem>
            <FormLabel htmlFor="description">{label}</FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="block font-normal text-foreground hover:bg-background"
                    {...buttonTriggerProps}
                  >
                    <div className="w-full flex items-center justify-between gap-2 text-sm">
                      {dateValue ? dateValue.toLocaleDateString() : "Selecione"}
                      <ChevronDownIcon size={12} />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    {...calendarProps}
                    mode="single"
                    selected={new Date(value as string)}
                    captionLayout="dropdown"
                    onSelect={(newDate) => {
                      onChange(newDate);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
