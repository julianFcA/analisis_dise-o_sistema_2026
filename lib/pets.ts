import petsData from "@/data/pets.json";

/** Estado de salud mostrado en las tarjetas de mascota. */
export type PetHealth = "healthy" | "follow-up";

/** Registro de `data/pets.json` (única fuente de datos de mascotas). */
export interface Pet {
  id: string;
  name: string;
  /** Tipo de mascota (Perro, Gato…). */
  species: string;
  breed: string;
  /** Sexo (Hembra / Macho). */
  sex: string;
  /** Edad ya formateada para la interfaz (p. ej. "3 años"). */
  age: string;
  health: PetHealth;
  /** Ruta local del asset (`public/images/pets/…`). */
  image: string;
  imageAlt: string;
}

/**
 * Mascotas del hogar. El JSON es la única fuente de esta fase: no hay fetch,
 * backend ni persistencia. My Pets y Solicitar Servicio lo comparten para no
 * duplicar el dataset.
 */
export const pets: readonly Pet[] = petsData.pets.map((pet) => ({
  ...pet,
  health: pet.health as PetHealth,
}));

/** `"Golden Retriever · Hembra · 3 años"` (resumen de una línea). */
export function describePet(pet: Pet): string {
  return [pet.breed, pet.sex, pet.age].join(" · ");
}
