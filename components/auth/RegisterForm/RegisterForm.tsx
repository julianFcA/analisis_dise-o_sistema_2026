"use client";

import { useState, type FormEvent } from "react";
import AuthCard from "@/components/auth/AuthCard/AuthCard";
import AuthDivider from "@/components/auth/AuthDivider/AuthDivider";
import PasswordField from "@/components/auth/PasswordField/PasswordField";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Mail from "@/components/icons/mail";

/**
 * Formulario de Register (docs/auth-reference §6.2).
 *
 * Interacciones locales únicamente: cuatro campos controlados, visibilidad
 * de las contraseñas y checkbox de aceptación. No hay backend ni
 * simulación de registro: el submit solo evita la recarga de la página.
 */
export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthCard
      title="Crear Cuenta"
      description="Empieza a cuidar de quien más quieres."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Campos, en el orden documentado. */}
        <div className="flex flex-col gap-5">
          <Input
            label="Nombre Completo"
            name="name"
            autoComplete="name"
            value={fullName}
            onChange={setFullName}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            startIcon={<Mail />}
          />
          <PasswordField
            label="Contraseña"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
          />
          <PasswordField
            label="Confirmar contraseña"
            name="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        {/* Aceptación de términos y privacidad. */}
        <Checkbox checked={accepted} onChange={setAccepted}>
          Acepto los{" "}
          {/* ⏳ Rutas de términos y privacidad pendientes de definición. */}
          <a
            href="#"
            className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-500"
          >
            Términos y Condiciones
          </a>{" "}
          y la{" "}
          <a
            href="#"
            className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-500"
          >
            Política de Privacidad
          </a>
          .
        </Checkbox>

        <Button type="default" label="Crear cuenta" submit className="w-full" />

        <AuthDivider>¿Ya tienes una cuenta?</AuthDivider>

        <Button
          type="secondary"
          label="Iniciar sesión"
          href="/login"
          className="w-full"
        />
      </form>
    </AuthCard>
  );
}
