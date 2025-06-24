"use client";

import AppError from "@/helpers/error/app-error";
import { ExternalToast, toast } from "sonner";

/**
 * Exibe uma notificação de erro usando o componente `toast`.
 *
 * @param error - O erro a ser exibido. Espera-se que seja do tipo `AppError` ou contenha uma propriedade `message`.
 */
function formattedError(error: unknown, config?: ExternalToast) {
  toast.error((error as AppError).message, config);
}

/**
 * Displays a debug notification toast with the provided message.
 *
 * @param message - The debug message to display in the notification.
 */
function debug(message: string) {
  toast("Debugging information", {
    description: message,
    duration: 5000,
    icon: "🛠️",
    richColors: true,
  });
}

/**
 * An object providing notification methods.
 * Must be used within a `Client Component`.
 */
export const notification = {
  formattedError,
  debug,
  ...toast,
};
