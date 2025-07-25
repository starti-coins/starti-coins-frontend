"use client";

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/@ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/@ui/sidebar";
import Link from "next/link";
import { useLogout } from "@/hooks/account/use-logout";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const router = useRouter();
  const { logout } = useLogout();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    await logout().then(() => {
      router.push("/login");
    });
  };

  const fallback = user.name.split(" ").map((n) => n[0]);

  const fallbackInitials =
    fallback.at(0)?.toUpperCase() + (fallback.at(-1)?.toUpperCase() || "");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg font-medium">
                  {fallbackInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg font-medium">
                    {fallbackInitials}{" "}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => router.push("/perfil")}>
                <Link href="/perfil" className="flex items-center gap-2 w-full">
                  <IconUserCircle />
                  Conta
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <NotificationCard>
                  <IconNotification />
                  Notificações
                </NotificationCard>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <IconLogout />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = (url: string) => pathName === url;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => router.push(item.url)}
                className={`font-medium ${
                  isActive(item.url)
                    ? "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                    : "cursor-pointer"
                }`}
              >
                {item.icon && (
                  <item.icon
                    className="!size-[18px] -ml-[0.7px]"
                    {...(isActive(item.url) && { strokeWidth: 3 })}
                  />
                )}
                <span className="">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
