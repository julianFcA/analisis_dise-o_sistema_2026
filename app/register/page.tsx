import AuthLayout from "@/components/auth/AuthLayout/AuthLayout";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel/AuthBrandPanel";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";

/**
 * Pantalla de Register (docs/auth-reference §6).
 * La página solo compone la estructura compartida y el formulario.
 */
export default function RegisterPage() {
  return (
    <AuthLayout
      panel={
        <AuthBrandPanel
          title="Únete a PetCare"
          description="Conecta con servicios de confianza y dale a tu mascota el cuidado que merece."
        />
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
