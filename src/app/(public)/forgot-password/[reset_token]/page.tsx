import AuthSider from "@/components/auth";
import { ResetPasswordForm } from "@/components/auth/reset-password/reset-password-form";
import AuthService from "@/services/auth/auth-service";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ reset_token: string }>;
}) {
  const { reset_token } = await params;

  const authService = new AuthService();
  const isValidToken = await authService
    .verifyPasswordToken(reset_token)
    .catch(() => true);

  if (!isValidToken) {
    return (
      <AuthSider>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Token inválido</h1>
          <p className="mt-2 text-gray-600">
            O token fornecido para redefinição de senha é inválido ou expirou.
          </p>
        </div>
      </AuthSider>
    );
  }
  return (
    <AuthSider>
      <ResetPasswordForm token={reset_token} />
    </AuthSider>
  );
}
