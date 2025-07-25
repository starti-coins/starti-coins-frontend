import { isValidCPF } from "@/utils/cpf";
import { z } from "zod";

export const accountSchema = z.object({
  id_usuario: z.number(),
  email: z.string().email("Email inválido"),
  nome: z.string().min(3, "Nome completo é obrigatório"),
  matricula: z
    .string()
    .min(10, "Matrícula contém 10 dígitos")
    .max(10, "Matrícula deve conter 10 dígitos"),
  periodo: z.coerce.number(),
  cpf: z
    .string()
    .refine((cpf: string) => !cpf.match(/[^\d]+/g), "Apenas números")
    .refine((cpf: string) => isValidCPF(cpf), "CPF inválido"),
  rg: z.string().min(8, "RG inválido").max(12, "RG inválido"),
  cargo: z.enum(["GESTOR_RH", "TECH_LEAD", "COLABORADOR"]),
  status: z.boolean(),
});

export type Account = z.infer<typeof accountSchema>;
