import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SelectProps } from "@radix-ui/react-select";

export function ResponsibleSelect({
  ...props
}: React.ComponentProps<React.FC<SelectProps>>) {
  return (
    <Select {...props}>
      <SelectTrigger id="responsible" className="w-full">
        <SelectValue placeholder="Selecione um responsável" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
        <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
        <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
      </SelectContent>
    </Select>
  );
}
