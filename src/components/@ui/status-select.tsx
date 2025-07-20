import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SelectProps } from "@radix-ui/react-select";

function StatusSelect({
  ...props
}: React.ComponentProps<React.FC<SelectProps>>) {
  return (
    <Select {...props}>
      <SelectTrigger id="status" className="w-full">
        <SelectValue placeholder="Selecione um status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Done">Done</SelectItem>
        <SelectItem value="In Process">In Progress</SelectItem>
        <SelectItem value="Not Started">Not Started</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default StatusSelect;
