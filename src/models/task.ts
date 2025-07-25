import { z } from "zod";

export const taskSchema = z.object({
  id_tarefa: z.number(),
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  data_limite: z.date().min(new Date(), "Data de entrega deve ser no futuro"),
  data_atribuicao: z.date(),
  data_envio: z.date().optional(),
  quantidade_horas: z.coerce.number().min(1, "Deve ser pelo menos 1 hora"),
  quantidade_moedas: z.coerce.number().min(1, "Deve ser pelo menos 1 moeda"),
  status_tarefa: z.coerce.boolean(),
  id_projeto: z.number().optional(),
  id_responsavel: z.coerce.number().min(1, "Responsável é obrigatório"),
  dificuldade: z
    .number()
    .min(1, "Nível deve ser pelo menos 1")
    .max(5, "Nível não pode ser maior que 5"),
});

export type Task = z.infer<typeof taskSchema>;
