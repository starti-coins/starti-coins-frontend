"use client";

import AppError from "@/helpers/error/app-error";
import { toast } from "sonner";

/**
 * Exibe uma notificação de erro usando o componente `toast`.
 *
 * @param error - O erro a ser exibido. Espera-se que seja do tipo `AppError` ou contenha uma propriedade `message`.
 */
function error(error: unknown) {
  toast.error((error as AppError).message);
}

/**
 * Displays a success notification with the provided message.
 *
 * @param message - The message to display in the success toast notification.
 */
function success(message: string) {
  toast.success(message);
}

/**
 * Displays an informational toast notification with the provided message.
 *
 * @param message - The message to display in the info toast notification.
 */
function info(message: string) {
  toast.info(message);
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
  error,
  success,
  info,
  debug,
};
