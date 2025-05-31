import { Account } from "@/models/account";

interface Auth {
  login(email: string, password: string): Promise<boolean>;
  findProfile(): Promise<Account>;
  forgotPassword(email: string): Promise<boolean>;
  verifyPasswordToken(token: string): Promise<boolean>;
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  logout(): Promise<void>;
}

export default Auth;
