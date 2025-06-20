import AuthSider from "@/components/auth";
import { ResetPasswordForm } from "@/components/auth/reset-password/reset-password-form";

function ForgotPasswordPage() {
  return (
    <AuthSider>
      <ResetPasswordForm />
    </AuthSider>
  );
}

export default ForgotPasswordPage;
