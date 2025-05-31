import axios, { AxiosError } from "axios";

import AppError from "@/helpers/error/app-error";
import { ServerError } from "@/lib/types/server-errors";

const APIClient = axios.create({
  baseURL: `${process.env.WEB_API_URL ?? "/"}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

APIClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ServerError>) => {
    if (
      (error.code === "ECONNABORTED" && error.message.includes("timeout")) ||
      !error.response
    ) {
      return Promise.reject(
        AppError.Unknown(AppError.messages.UNAVAILABLE_SERVICE)
      );
    }

    let formattedError;
    const serverError = error.response.data;

    switch (error.response.status) {
      case 400:
        formattedError = AppError.BadRequest(AppError.messages.UNAUTHORIZED);
        break;
      case 401:
        formattedError = AppError.Unauthorized(AppError.messages.UNAUTHORIZED);
        break;
      case 404:
        formattedError = AppError.NotFound(serverError.message);
        break;
      case 422:
        formattedError = AppError.UnprocessableEntity(serverError.message);
        break;
      case 500:
        formattedError = AppError.Unknown(serverError.message);
        break;
      case 501:
        formattedError = AppError.Unknown(serverError.message);
        break;
      case 502:
        formattedError = AppError.Unknown(serverError.message);
        break;
      case 503:
        formattedError = AppError.Unknown(
          AppError.messages.UNAVAILABLE_SERVICE
        );
        break;
      default:
        formattedError = AppError.Unknown;
        break;
    }

    return Promise.reject(formattedError);
  }
);

export default APIClient;
