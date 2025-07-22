import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/@ui/tooltip";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  showTooltip?: boolean;
  hasMarks?: boolean;
};

const SliderTooltip = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showTooltip = false, hasMarks = false, ...props }, ref) => {
  const [value, setValue] = React.useState<number[]>(
    props.value
      ? [...props.value]
      : props.defaultValue
      ? [...props.defaultValue]
      : [0]
  );
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const space = props.max && props.step ? props?.max / props.step : 0;

  // Sincronizar estado interno quando o valor externo mudar
  React.useEffect(() => {
    if (props.value) {
      setValue([...props.value]);
    }
  }, [props.value, props.onValueCommit, props.onChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setShowTooltipState(true);
    e.stopPropagation();
  };

  const handlePointerUp = React.useCallback(() => {
    setShowTooltipState(false);
  }, []);

  const handlePointerMove = React.useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);

  React.useEffect(() => {
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  return (
    <div className="grid gap-6 w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={(val) => {
          setValue(val);
          props.onValueChange?.(val);
        }}
        onValueCommit={(val) => {
          setValue(val);
          props.onValueCommit?.(val);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        {hasMarks && (
          <div className="absolute inset-0 flex grow w-full items-center justify-between px-[7px]">
            {Array.from({ length: space + 1 }).map((_, index) => (
              <div
                className="w-1 h-2 rounded-full bg-primary"
                key={index}
              ></div>
            ))}
          </div>
        )}

        <TooltipProvider>
          <Tooltip open={showTooltip && showTooltipState}>
            <TooltipTrigger asChild className="pointer-events-none">
              <SliderPrimitive.Thumb
                className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                onMouseEnter={() => setShowTooltipState(true)}
                onMouseLeave={() => setShowTooltipState(false)}
              />
            </TooltipTrigger>
            {!props.disabled && (
              <TooltipContent>
                <p className="text-md font-bold">{value[0]}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </SliderPrimitive.Root>
    </div>
  );
});

SliderTooltip.displayName = "SliderTooltip";
export default SliderTooltip;
