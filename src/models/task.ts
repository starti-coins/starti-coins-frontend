import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  responsible: z.string().optional(),
  level: z
    .number()
    .min(1, "Nível deve ser pelo menos 1")
    .max(5, "Nível não pode ser maior que 5"),
  date: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
