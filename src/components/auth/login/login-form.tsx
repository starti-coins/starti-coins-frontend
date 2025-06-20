"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/@ui/button";
import { AdornedInput, Input } from "@/components/@ui/input";
import { Label } from "@/components/@ui/label";
import Link from "next/link";

export function LoginForm({
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
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground text-sm">
          Informe seu email institucional para fazer o login na plataforma
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@aluno.ifal.edu.br"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <AdornedInput
            id="password"
            type="password"
            placeholder="Digite sua senha"
            required
            passwordAdornment
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-800/90 mt-4"
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Ainda não possui uma conta?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
