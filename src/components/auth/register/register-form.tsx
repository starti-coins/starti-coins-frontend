"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import FormSelect from "@/components/@ui/form-select";
import { Account, accountSchema } from "@/models/account";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      cpf: "",
      email: "",
      name: "",
      period: "",
      registration: "",
      rg: "",
    },
  });

  const handleRegister = async (formData: Account) => {
    try {
      const authService = new AuthService();

      await authService.register(formData);

      notification.success("Cadastro realizado com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      notification.formattedError(error);
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
        onSubmit={form.handleSubmit(handleRegister)}
        {...props}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="text-muted-foreground text-sm">
            Informe seus dados para criar sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nome completo</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="José da Silva"
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
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="registration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="registration">Matrícula</FormLabel>
                  <FormControl>
                    <Input
                      id="registration"
                      type="text"
                      placeholder="2020001122"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSelect<Account>
              name="period"
              label="Período atual"
              groupLabel="Períodos"
              form={form}
              items={[
                { value: "1", label: "1º Período" },
                { value: "2", label: "2º Período" },
                { value: "3", label: "3º Período" },
                { value: "4", label: "4º Período" },
                { value: "5", label: "5º Período" },
                { value: "6", label: "6º Período" },
                { value: "7", label: "7º Período" },
                { value: "8", label: "8º Período" },
              ]}
            />
            {/* <PeriodSelect
              label="Período atual"
              form={form as unknown as UseFormReturn}
            /> */}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <FormControl>
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="18352235412"
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
              name="rg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="rg">RG</FormLabel>
                  <FormControl>
                    <Input
                      id="rg"
                      type="text"
                      placeholder="53125846"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Senha</FormLabel>
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
          /> */}
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-800/90 mt-4"
          >
            Cadastrar-se
          </Button>
        </div>
        <div className="text-center text-sm">
          Já possui uma conta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
