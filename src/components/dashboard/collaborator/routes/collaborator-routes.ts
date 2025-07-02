"use client";

import { ChartArea, ClipboardList, FileBadge, House } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Minhas tarefas",
    url: "/minhas-tarefas",
    icon: ClipboardList,
  },
  {
    title: "Projetos",
    url: "/projetos",
    icon: FileBadge,
  },
  {
    title: "Loja de prêmios",
    url: "/loja",
    icon: ClipboardList,
  },
  {
    title: "Histórico de compras",
    url: "/historico",
    icon: ChartArea,
  },
];
