"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ scale: 0 }}
        animate={{
          scale: props.checked ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current relative z-10"
        asChild
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          className="size-3.5"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.path
            d="M4 12L9 17L20 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
