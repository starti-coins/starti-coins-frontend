import { isValidCPF } from "@/utils/cpf";
import { z } from "zod";

export const accountSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(3, "Nome completo é obrigatório"),
  registration: z
    .string()
    .min(10, "Matrícula contém 10 dígitos")
    .max(10, "Matrícula deve conter 10 dígitos"),
  period: z.string().min(1, "Período atual é obrigatório"),
  cpf: z
    .string()
    .refine((cpf: string) => !cpf.match(/[^\d]+/g), "Apenas números")
    .refine((cpf: string) => isValidCPF(cpf), "CPF inválido"),
  rg: z.string().min(8, "RG inválido").max(12, "RG inválido"),
});

export type Account = z.infer<typeof accountSchema>;
