"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginDefaultValues,
  LoginFormData,
  loginSchema,
} from "./schema/login-schema";
import AuthService from "@/services/auth/auth-service";
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
import { notification } from "@/hooks/use-notification";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const authService = new AuthService();

      await authService.login(formData.email, formData.password);

      router.refresh();
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
        onSubmit={form.handleSubmit(handleLogin)}
        {...props}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground text-sm">
            Informe seu email institucional para fazer o login na plataforma
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
                    type="email"
                    placeholder="m@aluno.ifal.edu.br"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
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
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
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
    </Form>
  );
}
