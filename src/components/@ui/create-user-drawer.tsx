"use client";

import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, accountSchema } from "@/models/account";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import { Button } from "./button";
import { Separator } from "./separator";
import { Input } from "./input";
import { useCreateUserDrawer } from "@/contexts/create-entity-drawer/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import FormSelect from "./form-select";
import { useRegisterAccount } from "@/hooks/account/use-register";
import { z } from "zod";

export function CreateUserDrawer({ children }: PropsWithChildren) {
  const { userDrawerOpen, setUserDrawerOpen } = useCreateUserDrawer();
  const { register, registerPending } = useRegisterAccount();
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={userDrawerOpen}
      onOpenChange={setUserDrawerOpen}
    >
      {children}
      <CreateTaskDrawerContent
        edit
        loading={registerPending}
        onSubmitAction={register}
      />
    </Drawer>
  );
}

const createUserSchema = accountSchema.omit({
  id_usuario: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const CreateTaskDrawerContent = ({
  edit = false,
  loading = false,
  onSubmitAction,
}: {
  item?: Account;
  edit?: boolean;
  loading?: boolean;
  onSubmitAction: (data: CreateUser) => void;
}) => {
  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      nome: "",
      matricula: "",
      cpf: "",
      status: true,
      rg: "",
      cargo: "COLABORADOR",
      periodo: 1,
    },
  });

  const createUser = () => {
    const data = form.getValues();

    onSubmitAction(data);
    Object.keys(data).forEach((d) => form.resetField(d as keyof CreateUser));
  };

  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Criação de um usuário</DrawerTitle>
        <DrawerDescription>
          Adicione as informações do usuário que deseja criar.
        </DrawerDescription>
      </DrawerHeader>
      <Separator />
      <div className="flex flex-col gap-4 overflow-y-auto p-4 text-sm h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createUser)}
            className="flex flex-col gap-2 justify-between h-full"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="nome">Nome</FormLabel>
                      <FormControl>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Informe o nome completo"
                          disabled={!edit}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
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
                          placeholder="Informe o email"
                          disabled={!edit}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormSelect<CreateUser>
                  name="cargo"
                  label="Cargo"
                  groupLabel="Cargos"
                  form={form}
                  selectTriggerProps={{
                    disabled: !edit,
                  }}
                  items={
                    [
                      { value: "COLABORADOR", label: "Colaborador" },
                      { value: "TECH_LEAD", label: "Tech Lead" },
                      { value: "GESTOR_RH", label: "Gestor de RH" },
                    ] satisfies { value: Account["cargo"]; label: string }[]
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormSelect<CreateUser>
                  name="periodo"
                  label="Período"
                  groupLabel="Períodos"
                  form={form}
                  selectTriggerProps={{
                    disabled: !edit,
                  }}
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
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="matricula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="matricula">Matrícula</FormLabel>
                      <FormControl>
                        <Input
                          id="matricula"
                          type="text"
                          placeholder="Informe a matrícula"
                          disabled={!edit}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
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
                          placeholder="Informe o CPF"
                          disabled={!edit}
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
                          placeholder="Informe o RG"
                          disabled={!edit}
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
            <DrawerFooter>
              <Button type="submit" loading={loading} disabled={loading}>
                Salvar
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </div>
    </DrawerContent>
  );
};
