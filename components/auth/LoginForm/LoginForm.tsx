"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard/AuthCard";
import AuthDivider from "@/components/auth/AuthDivider/AuthDivider";
import PasswordField from "@/components/auth/PasswordField/PasswordField";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Mail from "@/components/icons/mail";
import {
  authenticateUser,
  validateLoginFields,
  type LoginFieldErrors,
} from "./authenticateUser";

/**
 * Formulario de Login (docs/auth-reference §5.2).
 *
 * Flujo de demostración: validación local de los campos, autenticación
 * simulada (credenciales de prueba en `authenticateUser.ts`) con estado
 * `loading` y redirección a `/dashboard`. El módulo de autenticación está
 * aislado detrás de `authenticateUser`, de modo que puede sustituirse por una
 * petición real sin rehacer el formulario.
 */
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Al corregir un valor desaparece su error y el error general. */
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((current) => (current.email ? { ...current, email: undefined } : current));
    setFormError(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((current) =>
      current.password ? { ...current, password: undefined } : current,
    );
    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Evita peticiones simultáneas mientras el login está en progreso.
    if (loading) return;

    const nextErrors = validateLoginFields({ email, password });
    setErrors(nextErrors);
    setFormError(null);

    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);

    const result = await authenticateUser({ email, password });

    if (!result.ok) {
      setLoading(false);
      setFormError(result.message);
      return;
    }

    // Se mantiene el loading hasta que la navegación desmonta la pantalla.
    router.push("/dashboard");
  };

  return (
    <AuthCard
      title="Iniciar sesión"
      description="Qué bueno tenerte de vuelta. Tu mascota te espera."
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={loading || undefined}
        className="flex flex-col gap-5"
      >
        {/* Campos. */}
        <div className="flex flex-col gap-5">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            startIcon={<Mail />}
            placeholder="correo@ejemplo.com"
            error={errors.email}
            required
            disabled={loading}
          />
          <PasswordField
            label="Contraseña"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
            error={errors.password}
            required
            disabled={loading}
          />
        </div>

        {/* Recordarme + recuperación de contraseña. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Checkbox checked={remember} onChange={setRemember} disabled={loading}>
            Recordarme
          </Checkbox>
          {/* ⏳ Ruta de recuperación pendiente de definición. */}
          <a
            href="#"
            className="text-control-sm font-medium text-primary-600 underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Error general de autenticación (no revela qué campo falla). */}
        {formError ? (
          <p
            role="alert"
            className="rounded-input border border-accent bg-accent-soft px-3.5 py-2.5 text-note text-accent-strong"
          >
            {formError}
          </p>
        ) : null}

        <Button
          type="default"
          label="Ingresar"
          submit
          state={loading ? "loading" : "default"}
          className="w-full"
        />

        <AuthDivider>¿Es tu primera vez aquí?</AuthDivider>

        <Button
          type="secondary"
          label="Crear Cuenta"
          href="/register"
          state={loading ? "disabled" : "default"}
          className="w-full"
        />

        <p className="text-center text-note text-secondary">
          Tus datos seguros, tu mascota en buenas manos.
        </p>
      </form>
    </AuthCard>
  );
}
