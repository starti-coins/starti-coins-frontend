import { z } from "zod";

export const resetPasswordSchema = z
  .object({
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

export const resetPasswordDefaultValues: ResetPasswordFormData = {
  password: "",
  verifyPassword: "",
};

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
