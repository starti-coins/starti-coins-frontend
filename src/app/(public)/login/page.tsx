import AuthSider from "@/components/auth";
import { LoginForm } from "@/components/auth/login/login-form";

export default function LoginPage() {
  return (
    <AuthSider>
      <LoginForm />
    </AuthSider>
  );
}
