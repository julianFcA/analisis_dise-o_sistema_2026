import AuthLayout from "@/components/auth/AuthLayout/AuthLayout";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel/AuthBrandPanel";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

/**
 * Pantalla de Login (docs/auth-reference §5).
 * La página solo compone la estructura compartida y el formulario.
 */
export default function LoginPage() {
  return (
    <AuthLayout
      panel={
        <AuthBrandPanel
          title="Bienvenido a PetCare"
          description="Encuentra los mejores servicios para tu mascota en un solo lugar."
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
