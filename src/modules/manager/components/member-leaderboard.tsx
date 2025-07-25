"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/@ui/avatar";
import { Badge } from "@/components/@ui/badge";
import { Button } from "@/components/@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/@ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/@ui/table";
import {
  Trophy,
  Medal,
  Award,
  Download,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useMemo, useState } from "react";
import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";

// Dados mockados para o leaderboard
const leaderboardData = [
  {
    position: 1,
    name: "Ana Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 127,
    team: "Frontend",
    period: "4º Período",
    hoursWorked: 245.5,
  },
  {
    position: 2,
    name: "Carlos Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 118,
    team: "Backend",
    period: "3º Período",
    hoursWorked: 238.2,
  },
  {
    position: 3,
    name: "Maria Oliveira",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 112,
    team: "Mobile",
    period: "4º Período",
    hoursWorked: 225.8,
  },
  {
    position: 4,
    name: "João Pereira",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 98,
    team: "DevOps",
    period: "2º Período",
    hoursWorked: 198.4,
  },
  {
    position: 5,
    name: "Lucia Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 89,
    team: "Frontend",
    period: "3º Período",
    hoursWorked: 187.6,
  },
  {
    position: 6,
    name: "Pedro Lima",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 84,
    team: "Backend",
    period: "1º Período",
    hoursWorked: 172.3,
  },
  {
    position: 7,
    name: "Sofia Rodrigues",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 76,
    team: "Mobile",
    period: "2º Período",
    hoursWorked: 156.9,
  },
  {
    position: 8,
    name: "Rafael Alves",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 71,
    team: "DevOps",
    period: "1º Período",
    hoursWorked: 148.7,
  },
];

type SortField = "position" | "name" | "tasksCompleted" | "hoursWorked";
type SortDirection = "asc" | "desc";

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return (
        <span className="font-bold text-muted-foreground">#{position}</span>
      );
  }
};

const getTeamColor = (team: string) => {
  const colors = {
    Frontend: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Backend: "bg-green-100 text-green-800 hover:bg-green-200",
    Mobile: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    DevOps: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  };
  return colors[team as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const getPeriodColor = (period: string) => {
  const colors = {
    "1º Período": "bg-red-100 text-red-800",
    "2º Período": "bg-yellow-100 text-yellow-800",
    "3º Período": "bg-blue-100 text-blue-800",
    "4º Período": "bg-green-100 text-green-800",
  };
  return colors[period as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export default function MemberLeaderboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "position",
    direction: "asc",
  });

  const downloadReport = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setShowDownloadButton(false);

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "report.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowDownloadButton(true);
      });
  }, [ref]);

  const sortedData = useMemo(() => {
    const sorted = [...leaderboardData].sort((a, b) => {
      const { field, direction } = sortConfig;
      let aValue: string | number;
      let bValue: string | number;

      switch (field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "tasksCompleted":
          aValue = a.tasksCompleted;
          bValue = b.tasksCompleted;
          break;
        case "hoursWorked":
          aValue = a.hoursWorked;
          bValue = b.hoursWorked;
          break;
        case "position":
        default:
          aValue = a.position;
          bValue = b.position;
          break;
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    // Recalcular posições se não estiver ordenando por posição
    if (sortConfig.field !== "position") {
      return sorted.map((user, index) => ({
        ...user,
        currentPosition: index + 1,
      }));
    }

    return sorted.map((user) => ({ ...user, currentPosition: user.position }));
  }, [sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  return (
    <div ref={ref} className="container">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Ranking de Produtividade
            </div>
            {showDownloadButton && (
              <Button
                variant="dashed"
                className="ml-auto"
                onClick={downloadReport}
              >
                <div id="download-button" className="flex items-center gap-2">
                  <Download />
                  <span className="hidden sm:inline">Baixar relatório</span>
                </div>
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Classificação dos colaboradores baseada em tarefas concluídas e
            horas trabalhadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {leaderboardData.reduce(
                    (sum, user) => sum + user.tasksCompleted,
                    0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de tarefas concluídas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {leaderboardData
                    .reduce((sum, user) => sum + user.hoursWorked, 0)
                    .toFixed(1)}
                  h
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de horas trabalhadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {(
                    leaderboardData.reduce(
                      (sum, user) => sum + user.hoursWorked,
                      0
                    ) / leaderboardData.length
                  ).toFixed(1)}
                  h
                </div>
                <p className="text-xs text-muted-foreground">
                  Média de horas por usuário
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">
                    <button
                      onClick={() => handleSort("position")}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Posição
                      {getSortIcon("position")}
                    </button>
                  </TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead className="text-center">Tarefas</TableHead>
                  <TableHead className="text-center">Time</TableHead>
                  <TableHead className="text-center">Período</TableHead>
                  <TableHead className="flex justify-center">
                    <button
                      onClick={() => handleSort("hoursWorked")}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Horas
                      {getSortIcon("hoursWorked")}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((user) => (
                  <TableRow
                    key={user.position}
                    className={user.position <= 3 ? "bg-muted/50" : ""}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {getPositionIcon(user.position)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="font-semibold">
                        {user.tasksCompleted}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={getTeamColor(user.team)}
                      >
                        {user.team}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={getPeriodColor(user.period)}
                      >
                        {user.period}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {user.hoursWorked.toFixed(1)}h
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
