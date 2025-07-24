import { Account } from "@/models/account";
import Auth from "@/interfaces/auth";
import APIClient from "../api/client";
import StorageHelper from "@/helpers/storage/storage-helper";
import { generateToken, verifyToken } from "@/lib/token/token";

class AuthService implements Auth {
  async getCachedAccount(): Promise<Account | undefined> {
    const token = StorageHelper.getCookie("token");

    if (!token) {
      return undefined;
    }

    const { payload: account } = await verifyToken(token);
    return account.data as Account;
  }

  async login(email: string, password: string): Promise<boolean> {
    const response = await APIClient.post("/usuarios/login", {
      email,
      senha: password,
    });

    const token = await generateToken(response.data.user, "3d");
    StorageHelper.setCookie("token", token, 3);

    return true;
  }

  async logout(): Promise<void> {
    StorageHelper.removeCookie("token");
  }

  async register(account: Partial<Account>): Promise<boolean> {
    await APIClient.post("/usuarios", account);

    return true;
  }

  async forgotPassword(_email: string): Promise<boolean> {
    await APIClient.post(`/usuarios/reset-senha?email=${_email}`);

    return true;
  }

  async verifyPasswordToken(_token: string): Promise<boolean> {
    const response = await APIClient.get(`/auth/reset-password/${_token}`);

    return response.status === 200;
  }

  async resetPassword(_token: string, __newPassword: string): Promise<boolean> {
    await APIClient.put(`/usuarios/reset-senha/${_token}`, {
      novaSenha: __newPassword,
    });

    return true;
  }
}

export default AuthService;
