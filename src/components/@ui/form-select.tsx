import React from "react";
import { SelectProps } from "@radix-ui/react-select";
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
import { UseFormReturn, FieldPath } from "react-hook-form";
import { cn } from "@/lib/utils";

type FormSelectProps<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  label: string;
  items: Array<{ value: string; label: string; disabled?: boolean }>;
  groupLabel?: string;
  className?: string;
  selectTriggerProps?: SelectProps;
};

function FormSelect<T extends Record<string, unknown>>({
  name,
  form,
  label,
  items,
  className,
  groupLabel,
  selectTriggerProps,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="form-select">{label}</FormLabel>
          <Select
            required
            onValueChange={field.onChange}
            defaultValue={String(field.value)}
            value={String(field.value)}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "w-full min-w-0 shadow-none cursor-pointer",
                  className
                )}
                {...selectTriggerProps}
              >
                <SelectValue
                  id="form-select"
                  placeholder="Selecione"
                  className="truncate"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{groupLabel}</SelectLabel>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value.toString()}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
