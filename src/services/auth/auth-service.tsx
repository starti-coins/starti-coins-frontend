import { Account } from "@/models/account";
import StorageHelper from "@/helpers/storage/storage-helper";
import Auth from "@/interfaces/auth";

import APIClient from "../api/client";

class AuthService implements Auth {
  async login(email: string, password: string): Promise<boolean> {
    await APIClient.post("/auth/login", {
      email,
      password,
    });
    return true;
  }

  async logout(): Promise<void> {
    await APIClient.post("/auth/logout");
  }

  async findProfile(): Promise<Account> {
    const response = await APIClient.get<Account>("/accounts/profile");
    const profile = response.data;
    StorageHelper.setJSON("account", profile);

    return profile;
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
