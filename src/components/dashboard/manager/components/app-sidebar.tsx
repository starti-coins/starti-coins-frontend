"use client";

import Image from "next/image";

import { NavMain } from "@/components/dashboard/manager/components/nav-main";
import { NavUser } from "@/components/dashboard/manager/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/@ui/sidebar";
import { ChartArea, ClipboardList, FileBadge, House } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: House,
    },
    {
      title: "Tarefas criadas",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Projetos",
      url: "#",
      icon: FileBadge,
    },
    {
      title: "Relatórios",
      url: "#",
      icon: ChartArea,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className="pr-1">
                  <div className="bg-tertiary text-primary-foreground flex !size-5 items-center justify-center rounded-md">
                    <Image
                      src="/img/logo.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="!size-4"
                    />
                  </div>
                </div>
                <span className="text-base font-semibold">Starti Coins</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
