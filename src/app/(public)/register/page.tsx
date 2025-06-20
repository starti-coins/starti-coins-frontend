import AuthSider from "@/components/auth";
import { RegisterForm } from "@/components/auth/register/register-form";

export default function RegisterPage() {
  return (
    <AuthSider>
      <RegisterForm />
    </AuthSider>
  );
}
