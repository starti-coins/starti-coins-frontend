import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeClosed } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

type AdornedInputProps =
  | (React.ComponentProps<"input"> & {
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
      passwordAdornment?: undefined;
    })
  | (React.ComponentProps<"input"> & {
      startAdornment?: React.ReactNode;
      endAdornment?: undefined;
      passwordAdornment?: boolean;
    });

function AdornedInput({
  className,
  type,
  startAdornment,
  endAdornment,
  passwordAdornment,
  ...props
}: AdornedInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {startAdornment && (
        <span className="text-muted-foreground">{startAdornment}</span>
      )}
      <Input
        className={cn("flex-1", className)}
        type={passwordAdornment ? (showPassword ? "text" : "password") : type}
        {...props}
      />
      {passwordAdornment && (
        <Button
          type="button"
          variant="ghost"
          className="size-6 text-muted-foreground absolute right-2 rounded-sm"
          onClick={handleClick}
        >
          {showPassword ? (
            <Eye className="size-4" />
          ) : (
            <EyeClosed className="size-4" />
          )}
        </Button>
      )}
      {endAdornment && (
        <span className="text-muted-foreground ">{endAdornment}</span>
      )}
    </div>
  );
}

export { Input, AdornedInput };
