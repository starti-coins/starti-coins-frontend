import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const resetPasswordDefaultValues = {
  email: "",
};

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
