"use client";

import AppError from "@/helpers/error/app-error";
import React from "react";
import { toast } from "sonner";
/**
 * HandlePromise hook handles displaying notifications based on the result of a promise.
 * If the promise fails, it displays an error message using the toast notification.
 *
 * @param {Promise<unknown>} promise - A promise that is not used in this component but can be used for additional logic if needed.
 */
export function HandlePromise(promise: Promise<unknown>) {
  React.useEffect(() => {
    (async () => {
      try {
        await promise;
      } catch (error) {
        toast.error((error as AppError).message);
      }
    })();
  });
}
