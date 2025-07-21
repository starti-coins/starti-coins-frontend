import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type PeriodSelectProps = {
  form: UseFormReturn;
  label: string;
  className?: string;
};

function PeriodSelect({ form, label, className }: PeriodSelectProps) {
  return (
    <FormField
      control={form.control}
      name="period"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="period">{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={cn("w-full min-w-0 shadow-none", className)}
              >
                <SelectValue placeholder="Selecione" className="truncate" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Períodos</SelectLabel>
                <SelectItem value="1">1º</SelectItem>
                <SelectItem value="2">2º</SelectItem>
                <SelectItem value="3">3º</SelectItem>
                <SelectItem value="4">4º</SelectItem>
                <SelectItem value="5">5º</SelectItem>
                <SelectItem value="6">6º</SelectItem>
                <SelectItem value="7">7º</SelectItem>
                <SelectItem value="8">8º</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PeriodSelect;
