"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
  resetPasswordDefaultValues,
} from "./schema/reset-password-schema";
import { Button } from "@/components/@ui/button";
import { AdornedInput, Input } from "@/components/@ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@ui/form";
import { useResetPassword } from "@/hooks/account/use-reset-password";

export function ResetPasswordForm({
  className,
  token,
  ...props
}: React.ComponentProps<"form"> & { token: string }) {
  const { resetPassword } = useResetPassword();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const handleResetPassword = async (formData: ResetPasswordFormData) => {
    await resetPassword({
      token,
      newPassword: formData.password,
    });
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
          <h1 className="text-3xl font-bold">Redefinir senha</h1>
          <p className="text-muted-foreground text-sm">
            Crie sua nova senha. Utilize uma senha robusta.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Senha</FormLabel>
                <FormControl>
                  <AdornedInput
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    required
                    passwordAdornment
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verifyPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="verifyPassword">Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    id="verifyPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-800/90 mt-4"
          >
            Redefinir senha
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
