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
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { FormDatePicker } from "./date-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Info } from "lucide-react";
import { useCreateEntityDrawer } from "@/contexts/create-entity-drawer/hooks";
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

export function CreateTaskDrawer({ children }: PropsWithChildren) {
  const { taskDrawerOpen, setTaskDrawerOpen } = useCreateEntityDrawer();
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

export const CreateTaskDrawerContent = ({
  item,
  edit = false,
  onSubmitAction,
}: {
  item?: Task;
  edit?: boolean;
  onSubmitAction: (data: Partial<Task>) => void;
}) => {
  const partialSchema = taskSchema.partial();
  const form = useForm<Partial<Task>>({
    resolver: zodResolver(partialSchema),
    defaultValues: {
      title: item?.title ?? "",
      description: item?.description ?? "",
      status: item?.status ?? "",
      responsible: item?.responsible ?? "",
      level: item?.level || 0,
      date: item?.date,
    },
  });

  const updateTask = () => {
    const data = form.getValues();
    delete data.id;

    onSubmitAction(data);
    Object.keys(data).forEach((d) => form.resetField(d as keyof Task));
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Título</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
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
                <FormSelect<Partial<Task>>
                  name="status"
                  label="Status"
                  groupLabel="Statuses"
                  form={form}
                  selectTriggerProps={{
                    disabled: !edit,
                  }}
                  items={[
                    { value: "Done", label: "Concluído" },
                    { value: "In Process", label: "Em Andamento" },
                    { value: "Not Started", label: "Não Iniciado" },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormSelect<Partial<Task>>
                  name="responsible"
                  label="Responsável"
                  groupLabel="Responsáveis"
                  form={form}
                  selectTriggerProps={{
                    disabled: !edit,
                  }}
                  items={[
                    { value: "user1", label: "User 1" },
                    { value: "user2", label: "User 2" },
                    { value: "user3", label: "User 3" },
                    { value: "Eddie Lake", label: "Eddie Lake" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                  <FormDatePicker<Partial<Task>>
                    name="date"
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
                  <Label>Dificuldade</Label>

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => {
                      const { value, onChange } = field;

                      return (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex flex-col items-center gap-1 mx-4">
                              <span
                                className={`${
                                  edit
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {form.getValues("level") || 0}/5
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
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="p-4 pt-0">
          <Separator className="mb-3" />
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <h4 className="text-sm font-medium text-destructive mb-2">
              Erros no formulário:
            </h4>
            <ul className="text-xs text-destructive space-y-1">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <li key={field} className="flex items-start gap-1">
                  <span className="text-destructive">•</span>
                  <span>
                    <strong className="capitalize">{field}:</strong>{" "}
                    {error?.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </DrawerContent>
  );
};
