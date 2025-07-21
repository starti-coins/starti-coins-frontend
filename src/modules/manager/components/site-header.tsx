"use client";

import { useEffect } from "react";
import { useCoins } from "@/contexts/coins/hooks";
import { Separator } from "@/components/@ui/separator";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarTrigger,
  useSidebar,
} from "@/components/@ui/sidebar";
import StorageHelper from "@/helpers/storage/storage-helper";
import { Coins, PlusCircle, Search } from "lucide-react";
import { Label } from "@/components/@ui/label";
import { CreateCommandMenu } from "./create-command-menu";

export function SiteHeader() {
  const { setOpen } = useSidebar();
  const coins = useCoins();

  useEffect(() => {
    const sidebarShouldBeClosed =
      StorageHelper.get("sidebar_state") === "false";

    if (sidebarShouldBeClosed) {
      setOpen(false);
    }
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-2 md:px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="flex justify-between items-center w-full gap-2 mx-0 md:mx-2 lg:mx-4">
          <CreateCommandMenu asChild size="sm" className="flex">
            <PlusCircle /> Criar
          </CreateCommandMenu>

          <SidebarGroup className="py-0 max-w-[220px] md:max-w-[320px] lg:max-w-[480px]">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Pesquisar..."
                className="pl-8 rounded-full truncate"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="flex items-center gap-2">
            <span className="text-coin font-bold md:text-xl">{coins}</span>
            <Coins className="text-coin" />
          </div>
        </div>
      </div>
    </header>
  );
}
