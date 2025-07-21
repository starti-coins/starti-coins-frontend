import { ForwardRefExoticComponent, RefAttributes } from "react";
import { PopoverTriggerProps } from "@radix-ui/react-popover";
import { BellDot } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/@ui/card";
import { Button } from "@/components/@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function NotificationCard({
  children,
  className,
}: React.ComponentProps<
  ForwardRefExoticComponent<
    PopoverTriggerProps & RefAttributes<HTMLButtonElement>
  >
>) {
  const notifications = [
    {
      id: 1,
      message: "New message from Jane",
      description: "Hey, just wanted to follow up on our meeting yesterday.",
    },
    {
      id: 2,
      message: "Project update",
      description: "The project deadline has been extended by one week.",
    },
    {
      id: 3,
      message: "System maintenance",
      description: "Scheduled maintenance will occur tonight at 11 PM.",
    },
  ];
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          className,
          "w-full hover:bg-accent cursor-pointer focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        )}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent asChild side="right" align="end" sideOffset={14}>
        <Card className="w-full max-w-sm">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold">
              Notificações
            </CardTitle>
            <CardDescription>Você tem 3 novas notificações.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 mb-4"
              >
                <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                  <BellDot className="text-primary size-5" />
                </div>
                <div className="space-y-1 truncate">
                  <p className="font-medium">{notification.message}</p>
                  <p
                    className="text-muted-foreground text-sm truncate"
                    title={notification.description}
                  >
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end p-0">
            <Button variant="outline">Marcar todas como lidas</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
