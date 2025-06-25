import { isValidCPF } from "@/utils/cpf";
import { z } from "zod";

export const registerSchema = z
  .object({
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
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(12, "Senha deve ter no máximo 12 caracteres"),
    verifyPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "As senhas não coincidem",
  });

export const registerDefaultValues: RegisterFormData = {
  email: "",
  name: "",
  registration: "",
  period: "",
  cpf: "",
  rg: "",
  password: "",
  verifyPassword: "",
};

export type RegisterFormData = z.infer<typeof registerSchema>;
