import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const forgotPasswordDefaultValues: ForgotPasswordFormData = {
  email: "",
};

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
