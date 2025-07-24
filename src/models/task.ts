import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  due_date: z.date(),
  assignment_date: z.date().default(() => new Date()),
  completion_date: z.date().optional(),
  hours: z.number(),
  coins: z.number().min(0, "Valor de moedas não pode ser negativo"),
  status: z.string().min(1, "Status é obrigatório"),
  responsible_id: z.string().optional(),
  level: z
    .number()
    .min(1, "Nível deve ser pelo menos 1")
    .max(5, "Nível não pode ser maior que 5"),
});

export type Task = z.infer<typeof taskSchema>;
