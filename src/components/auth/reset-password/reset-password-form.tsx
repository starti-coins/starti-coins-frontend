"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/@ui/button";
import { Input } from "@/components/@ui/input";
import { Label } from "@/components/@ui/label";
import Link from "next/link";
import { notification } from "@/hooks/use-notification";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    notification.success("Link de recuperação enviado com sucesso!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 px-8 py-12 rounded-md border w-full max-w-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Recuperar senha</h1>
        <p className="text-muted-foreground text-sm">
          Informe seu email institucional para recuperar sua senha. Você
          receberá um link para redefinir sua senha no email informado.
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
        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-800/90 mt-4"
        >
          Enviar link de recuperação
        </Button>
      </div>
      <div className="text-center text-sm">
        Já possui uma conta e sabe a senha?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Faça o login
        </Link>{" "}
        ou{" "}
        <Link href="/register" className="underline underline-offset-4">
          crie uma nova conta
        </Link>
      </div>
    </form>
  );
}
