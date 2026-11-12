"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Eye from "@/components/icons/eye";
import EyeOff from "@/components/icons/eye-off";
import Lock from "@/components/icons/lock";

export interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
}

/**
 * Campo de contraseña compartido por Login y Register
 * (docs/auth-reference §5.2 / §6.2): reutiliza el Input del Design System
 * con icono de candado a la izquierda y control de visibilidad a la derecha.
 */
export default function PasswordField({
  label,
  value,
  onChange,
  name,
  autoComplete,
  placeholder,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      startIcon={<Lock />}
      placeholder={placeholder}
      endIcon={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={visible}
          className="flex size-9 items-center justify-center rounded-full text-secondary transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </button>
      }
    />
  );
}
