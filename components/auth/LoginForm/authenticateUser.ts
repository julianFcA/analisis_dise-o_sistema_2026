/**
 * Autenticación simulada del flujo de demostración de Login.
 *
 * No hay backend todavía: `authenticateUser` compara contra unas credenciales
 * de prueba y resuelve tras una demora artificial para poder observar el
 * estado `loading`. Cuando exista la API real basta con reemplazar su cuerpo
 * por una petición (`fetch("/api/auth/login")`) manteniendo la misma firma,
 * sin tocar el formulario.
 */

/**
 * Credenciales de demostración del frontend. NO son credenciales reales:
 * solo permiten recorrer el flujo Login → Dashboard.
 */
export const DEMO_CREDENTIALS = {
  email: "andrea@petcare.com",
  password: "PetCare123",
} as const;

/** Longitud mínima de contraseña del proyecto (validación local del login). */
export const PASSWORD_MIN_LENGTH = 8;

/** Demora artificial de la petición simulada (ms). */
const SIMULATED_REQUEST_DELAY = 900;

export interface LoginFieldErrors {
  email?: string;
  password?: string;
}

export type LoginResult =
  | { ok: true }
  | { ok: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validación local de los campos del login. Devuelve un objeto vacío cuando
 * ambos campos son válidos.
 */
export function validateLoginFields({
  email,
  password,
}: {
  email: string;
  password: string;
}): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = "La contraseña no es válida.";
  }

  return errors;
}

/**
 * Simula la petición de autenticación. Si las credenciales coinciden resuelve
 * `{ ok: true }`; en caso contrario devuelve un mensaje general que no revela
 * cuál de los dos campos es incorrecto.
 */
export async function authenticateUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_REQUEST_DELAY));

  const isValid =
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password;

  if (!isValid) {
    return {
      ok: false,
      message: "El correo o la contraseña no son correctos.",
    };
  }

  return { ok: true };
}
