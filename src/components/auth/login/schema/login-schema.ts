import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(12, "Senha deve ter no máximo 12 caracteres"),
});

export const loginDefaultValues: LoginFormData = {
  email: "",
  password: "",
};

export type LoginFormData = z.infer<typeof loginSchema>;
