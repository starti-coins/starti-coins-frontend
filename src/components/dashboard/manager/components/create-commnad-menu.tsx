"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserPlus } from "lucide-react";
import { IconNotification, IconUserCircle } from "@tabler/icons-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/@ui/command";
import { Button } from "@/components/@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/@ui/tooltip";
import { useSuperKey } from "@/hooks/use-super-key";

type CommandMenuProps = React.ComponentProps<typeof Button> &
  React.PropsWithChildren;

export function CreateCommandMenu({ children, ...rest }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const superKey = useSuperKey();

  const handleClickButton = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button {...rest} onClick={handleClickButton}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-accent-foreground"
          arrowClassname="bg-accent-foreground fill-accent-foreground"
        >
          <p>{superKey.symbol}K</p>
        </TooltipContent>
      </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Pesquise por atalhos..." />
        <CommandList>
          <CommandEmpty>Sem resultados.</CommandEmpty>
          <CommandGroup heading="Criar">
            <CommandItem>
              <Image
                src="/img/icons/add-project.svg"
                alt="user acetive icon"
                width={16}
                height={16}
                className="min-w-[16px] min-h-[16px] text-accent-foreground"
              />
              <span>Novo projeto</span>
            </CommandItem>
            <CommandItem>
              <Image
                src="/img/icons/add-task.svg"
                alt="user acetive icon"
                width={16}
                height={16}
                className="min-w-[16px] min-h-[16px] text-accent-foreground"
              />
              <span>Nova tarefa</span>
            </CommandItem>
            <CommandItem>
              <UserPlus />
              <span>Novo usuário</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navegar">
            <CommandItem>
              <IconNotification />
              <span>Notificações</span>
            </CommandItem>
            <CommandItem>
              <IconUserCircle />
              <span>Conta</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
