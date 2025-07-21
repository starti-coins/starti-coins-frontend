"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "@/components/auth/register/schema/register-schema";
import { Badge } from "@/components/@ui/badge";
import { Button } from "@/components/@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/@ui/card";
import { Input } from "@/components/@ui/input";
import { Separator } from "@/components/@ui/separator";
import { Account } from "@/models/account";
import {
  User,
  Edit,
  Calendar,
  Mail,
  CreditCard,
  FileText,
  Hash,
  KeyRound,
  CircleX,
} from "lucide-react";
import PeriodSelect from "@/components/@ui/period-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@ui/form";
import { cn } from "@/lib/utils";

function ProfileForm({ userData }: { userData: Account }) {
  const [edit, setEdit] = useState(false);

  const optionalSchema = registerSchema._def.schema.partial();
  const form = useForm<Partial<RegisterFormData>>({
    resolver: zodResolver(optionalSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      registration: userData.registration,
      period: userData.period,
      cpf: userData.cpf,
      rg: userData.rg,
    },
  });

  const editClassnames = `!text-sm shadow-none text-gray-900 ${
    !edit ? "pointer-events-none border-none p-0" : ""
  }`;
  const labelClassnames = `text-sm font-medium text-gray-500 ${
    !edit ? "-mb-4" : "-mb-2"
  }`;

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEdit(true);
    const input = document.getElementById("name-input");
    setTimeout(() => {
      input?.focus();
    }, 100);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset({
      name: userData.name,
      email: userData.email,
      registration: userData.registration,
      period: userData.period,
      cpf: userData.cpf,
      rg: userData.rg,
    });
    setEdit(false);
  };

  const updateAccount = () => {
    setEdit(false);

    if (JSON.stringify(form.getValues()) === JSON.stringify(userData)) {
      // No changes, do nothing
      return;
    }
    console.log("Form data to save:", form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateAccount)}>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Informações do usuário
            </h1>
            <p className="text-gray-600">
              Visualize e gerencie suas informações pessoais
            </p>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-6 flex-wrap flex-col-reverse md:gap-2 md:flex-nowrap md:flex-row">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 aspect-square items-center justify-center rounded-full bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle
                      className="text-xl"
                      title={form.getValues().name}
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="!w-full !min-w-full">
                            <FormControl>
                              <Input
                                className={cn(
                                  editClassnames,
                                  "!w-full !min-w-full truncate"
                                )}
                                id="name"
                                type="text"
                                required
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardTitle>
                    <CardDescription className={!edit ? "-mt-2" : ""}>
                      Colaborador
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1 justify-between md:justify-end w-full md:w-auto">
                  {!edit ? (
                    <>
                      <Button size="sm" type="button" onClick={handleEditClick}>
                        <div className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </div>
                      </Button>
                      <Link
                        href="/forgot-password"
                        className="text-sm px-3 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                      >
                        <div className="flex my-1.5 items-center gap-2">
                          <KeyRound size={14} />
                          Alterar senha
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button size="sm" type="submit">
                        <div className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Salvar
                        </div>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleCancel}
                      >
                        <div className="flex items-center gap-2">
                          <CircleX className="-ml-1" />
                          Cancelar
                        </div>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Informações Acadêmicas
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <FormField
                      control={form.control}
                      name="registration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="registration"
                            className={labelClassnames}
                          >
                            Matrícula
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={editClassnames}
                              id="registration"
                              type="text"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium -mt-1 text-gray-500">
                        Período
                      </p>
                      {edit ? (
                        <PeriodSelect
                          label=""
                          className="-mt-2"
                          form={form as unknown as UseFormReturn}
                        />
                      ) : (
                        <Badge variant="secondary" className="mt-1">
                          {userData.period}º Período
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Informações de Contato
                </h3>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="email" className={labelClassnames}>
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={editClassnames}
                            id="email"
                            type="text"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Documentos
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cpf" className={labelClassnames}>
                            CPF
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={editClassnames}
                              id="cpf"
                              type="text"
                              disabled={edit}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <FormField
                      control={form.control}
                      name="rg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="rg" className={labelClassnames}>
                            RG
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={editClassnames}
                              id="rg"
                              type="text"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm;
