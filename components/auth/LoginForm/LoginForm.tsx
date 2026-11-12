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
 * Formulario de Login (docs/auth-reference §5.2).
 *
 * Interacciones locales únicamente: campos controlados, visibilidad de la
 * contraseña y checkbox Recordarme. No hay backend ni simulación de
 * autenticación: el submit solo evita la recarga de la página.
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthCard
      title="Iniciar sesión"
      description="Qué bueno tenerte de vuelta. Tu mascota te espera."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Campos. */}
        <div className="flex flex-col gap-5">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            startIcon={<Mail />}
            placeholder="correo@ejemplo.com"
          />
          <PasswordField
            label="Contraseña"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {/* Recordarme + recuperación de contraseña. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Checkbox checked={remember} onChange={setRemember}>
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

        <Button type="default" label="Ingresar" submit className="w-full" />

        <AuthDivider>¿Es tu primera vez aquí?</AuthDivider>

        <Button
          type="secondary"
          label="Crear Cuenta"
          href="/register"
          className="w-full"
        />

        <p className="text-center text-note text-secondary">
          Tus datos seguros, tu mascota en buenas manos.
        </p>
      </form>
    </AuthCard>
  );
}
