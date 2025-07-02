"use client";

import { ChartArea, ClipboardList, FileBadge, House } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: House,
  },
  {
    title: "Tarefas criadas",
    url: "/tarefas-criadas",
    icon: ClipboardList,
  },
  {
    title: "Projetos",
    url: "/projetos",
    icon: FileBadge,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: ChartArea,
  },
];
