"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/@ui/button";
import { AdornedInput, Input } from "@/components/@ui/input";
import { Label } from "@/components/@ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../@ui/select";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "flex flex-col gap-6 px-8 py-12 rounded-md border w-full max-w-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <p className="text-muted-foreground text-sm">
          Informe seus dados para criar sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Nome completo</Label>
          <Input id="email" type="text" placeholder="José da Silva" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="matricula">Matrícula</Label>
            <Input
              id="matricula"
              type="text"
              placeholder="2020001122"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="periodo">Período atual</Label>
            <Select>
              <SelectTrigger id="periodo" className="w-full min-w-0">
                <SelectValue placeholder="Selecione" className="truncate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Períodos</SelectLabel>
                  <SelectItem value="1">1º</SelectItem>
                  <SelectItem value="2">2º</SelectItem>
                  <SelectItem value="3">3º</SelectItem>
                  <SelectItem value="4">4º</SelectItem>
                  <SelectItem value="5">5º</SelectItem>
                  <SelectItem value="6">6º</SelectItem>
                  <SelectItem value="7">7º</SelectItem>
                  <SelectItem value="8">8º</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" type="text" placeholder="18352235412" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rg">RG</Label>
            <Input id="rg" type="text" placeholder="53125846" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <AdornedInput
            id="password"
            type="password"
            placeholder="Digite sua senha"
            required
            passwordAdornment
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="verify-password">Confirmar senha</Label>
          <Input
            id="verify-password"
            type="password"
            placeholder="Confirme sua senha"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-800/90 mt-4"
        >
          Cadastrar-se
        </Button>
      </div>
      <div className="text-center text-sm">
        Ja possui uma conta?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
