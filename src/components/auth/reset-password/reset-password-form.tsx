"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordDefaultValues,
  ResetPasswordFormData,
  resetPasswordSchema,
} from "./schema/reset-password-schema";
import AuthService from "@/services/auth/auth-service";
import { Button } from "@/components/@ui/button";
import { Input } from "@/components/@ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@ui/form";
import { notification } from "@/hooks/use-notification";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const handleResetPassword = async (formData: ResetPasswordFormData) => {
    try {
      const authService = new AuthService();

      await authService.forgotPassword(formData.email);

      notification.success(
        "Se o email informado estiver cadastrado, você receberá um link para redefinir sua senha."
      );
    } catch (error) {
      notification.error(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col gap-6 px-8 py-12 rounded-md border w-full max-w-md",
          className
        )}
        onSubmit={form.handleSubmit(handleResetPassword)}
        {...props}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Recuperar senha</h1>
          <p className="text-muted-foreground text-sm">
            Informe seu email institucional cadastrado anteriormente. Você
            receberá um link para redefinir sua senha.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="text"
                    placeholder="m@aluno.ifal.edu.br"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
}
