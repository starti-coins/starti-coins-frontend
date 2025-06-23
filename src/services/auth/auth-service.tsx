import { Account } from "@/models/account";
import Auth from "@/interfaces/auth";
import APIClient from "../api/client";
import StorageHelper from "@/helpers/storage/storage-helper";

class AuthService implements Auth {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await APIClient.post("/auth/login", {
        email,
        password,
      });

      StorageHelper.setJSON("account", response.data, true);
    } catch (error) {
      document.cookie = `token=${"asd"}; path=/; max-age=86400; secure; samesite=strict`;
      console.log(error);
    }

    return true;
  }

  async logout(): Promise<void> {
    await APIClient.post("/auth/logout");
  }

  async register(account: Account): Promise<boolean> {
    await APIClient.post("/auth/register", account);

    return true;
  }

  async forgotPassword(_email: string): Promise<boolean> {
    await APIClient.post("/auth/reset-password", {
      email: _email,
    });

    return true;
  }

  async verifyPasswordToken(_token: string): Promise<boolean> {
    const response = await APIClient.get(`/auth/reset-password/${_token}`);

    return response.status === 200;
  }

  async resetPassword(_token: string, __newPassword: string): Promise<boolean> {
    await APIClient.put(`/auth/reset-password/${_token}`, {
      new_password: __newPassword,
    });

    return true;
  }
}

export default AuthService;
