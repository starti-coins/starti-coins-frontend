import { queryOptions } from "@tanstack/react-query";
import { MutationVariables, mutationOptions } from "../utils";
import { Account } from "@/models/account";
import AuthService from "@/services/auth/auth-service";

const service = new AuthService();

export const getAuthBaseQueryKey = () => ["auth"];

export const getAccountOptions = () =>
  queryOptions({
    queryKey: [...getAuthBaseQueryKey(), "accountProfile"],
    queryFn: () => service.getCachedAccount(),
  });

export const registerOptions = () =>
  mutationOptions({
    mutationKey: [...getAuthBaseQueryKey(), "register"],
    mutationFn: ({ payload }: MutationVariables<void, Partial<Account>>) =>
      service.register(payload),
  });

export interface APILoginPayload {
  email: string;
  password: string;
}

export const loginOptions = () =>
  mutationOptions({
    mutationKey: [...getAuthBaseQueryKey(), "login"],
    mutationFn: ({ payload }: MutationVariables<void, APILoginPayload>) =>
      service.login(payload.email, payload.password),
  });

export const logoutOptions = () =>
  mutationOptions({
    mutationKey: [...getAuthBaseQueryKey(), "logout"],
    mutationFn: () => service.logout(),
  });

export interface APIForgotPasswordPayload {
  email: Account["email"];
}

export const forgotPasswordOptions = () =>
  mutationOptions({
    mutationKey: [...getAuthBaseQueryKey(), "forgotPassword"],
    mutationFn: ({
      payload,
    }: MutationVariables<void, APIForgotPasswordPayload>) =>
      service.forgotPassword(payload.email),
  });

export interface APIResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const resetPasswordOptions = () =>
  mutationOptions({
    mutationKey: [...getAuthBaseQueryKey(), "resetPassword"],
    mutationFn: ({
      payload,
    }: MutationVariables<void, APIResetPasswordPayload>) =>
      service.resetPassword(payload.token, payload.newPassword),
  });
