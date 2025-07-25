"use client";

import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task, taskSchema } from "@/models/task";
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
import { Textarea } from "./textarea";
import { FormDatePicker } from "./date-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Info } from "lucide-react";
import { useCreateTaskDrawer } from "@/contexts/create-entity-drawer/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import FormSelect from "./form-select";
import SliderTooltip from "./checkpoint-slider";
import { z } from "zod";

export function CreateTaskDrawer({ children }: PropsWithChildren) {
  const { taskDrawerOpen, setTaskDrawerOpen } = useCreateTaskDrawer();
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={taskDrawerOpen}
      onOpenChange={setTaskDrawerOpen}
    >
      {children}
      <CreateTaskDrawerContent
        edit
        onSubmitAction={(data) => console.log(data)}
      />
    </Drawer>
  );
}

const createTaskSchema = taskSchema.omit({
  id_tarefa: true,
  data_atribuicao: true,
});
type CreateTask = z.infer<typeof createTaskSchema>;

export const CreateTaskDrawerContent = ({
  item,
  edit = false,
  onSubmitAction,
}: {
  item?: Task;
  edit?: boolean;
  onSubmitAction: (data: CreateTask) => void;
}) => {
  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      titulo: item?.titulo || "",
      descricao: item?.descricao || "",
      data_limite: item?.data_limite,
      quantidade_horas: item?.quantidade_horas || 0,
      quantidade_moedas: item?.quantidade_moedas || 0,
      status_tarefa: item?.status_tarefa || false,
      id_responsavel: item?.id_responsavel || 0,
      dificuldade: item?.dificuldade || 0,
    },
  });

  const updateTask = () => {
    const data = form.getValues();

    onSubmitAction({ ...data, id_responsavel: +data.id_responsavel! });
    Object.keys(data).forEach((d) => form.resetField(d as keyof CreateTask));
  };

  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Detalhes da tarefa</DrawerTitle>
        <DrawerDescription>
          Você pode visualizar informações da sua tarefa por aqui
        </DrawerDescription>
      </DrawerHeader>
      <Separator />
      <div className="flex flex-col gap-4 overflow-y-auto p-4 text-sm h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateTask)}
            className="flex flex-col gap-2 justify-between h-full"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="titulo">Título</FormLabel>
                      <FormControl>
                        <Input
                          id="titulo"
                          type="text"
                          placeholder="Título da tarefa"
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
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="descricao">Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          id="descricao"
                          placeholder="Descrição da tarefa"
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
                <FormSelect<CreateTask>
                  name="status_tarefa"
                  label="Status"
                  groupLabel="Statuses"
                  form={form}
                  items={[
                    { value: "true", label: "Concluído" },
                    { value: "false", label: "Em Andamento" },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormSelect<CreateTask>
                  name="id_responsavel"
                  label="Responsável"
                  groupLabel="Responsáveis"
                  form={form}
                  selectTriggerProps={{
                    disabled: !edit,
                  }}
                  items={[
                    { value: "0", label: "Selecione", disabled: true },
                    { value: "1", label: "User 1" },
                    { value: "2", label: "User 2" },
                    { value: "3", label: "User 3" },
                    { value: "4", label: "Eddie Lake" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                  <FormDatePicker<CreateTask>
                    name="data_limite"
                    label="Data de entrega"
                    form={form}
                    buttonTriggerProps={{
                      disabled: !edit,
                    }}
                  />
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger asChild>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 -mt-2 ml-1">
                        <Info size={12} />
                        Penalidade
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-sm">
                      Se a atividade for entregue após esta data, haverá
                      penalidade na quantidade de compensação recebida.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="dificuldade"
                    render={({ field }) => {
                      const { value, onChange } = field;

                      return (
                        <FormItem className="w-full">
                          <FormLabel>Dificuldade</FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center gap-1 mx-4">
                              <span
                                className={`${
                                  edit
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {form.getValues("dificuldade") || 0}/5
                              </span>
                              <SliderTooltip
                                id="SliderTemperature"
                                max={5}
                                step={1}
                                hasMarks={true}
                                showTooltip={true}
                                disabled={!edit}
                                value={[value || 0]}
                                onValueChange={(value) => onChange(value[0])}
                                onValueCommit={(value) => onChange(value[0])}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="quantidade_horas"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="quantidade_horas">Horas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            id="quantidade_horas"
                            placeholder="Horas estimadas"
                            disabled={!edit}
                            required
                            onFocus={(e) => e.currentTarget.select()}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="quantidade_moedas"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="quantidade_moedas">
                          Moedas
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            id="quantidade_moedas"
                            placeholder="Qtd. moedas"
                            disabled={!edit}
                            required
                            onFocus={(e) => e.currentTarget.select()}
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
            <DrawerFooter>
              <Button type="submit">Salvar</Button>
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
