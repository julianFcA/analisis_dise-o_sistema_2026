import type { ComponentType, SVGProps } from "react";
import Facebook from "@/components/icons/facebook";
import HeartHandshake from "@/components/icons/heart-handshake";
import Instagram from "@/components/icons/instagram";
import ShieldCheck from "@/components/icons/shield-check";
import Stethoscope from "@/components/icons/stethoscope";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Dato destacado del proveedor (años, mascotas, satisfacción). */
export interface ProviderStat {
  value: string;
  label: string;
}

/** Servicio ofrecido por el proveedor. */
export interface ProviderService {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: IconComponent;
}

/** Fila del horario de atención. */
export interface ProviderOpeningHour {
  days: string;
  hours: string;
}

/** Red social mostrada como acción visual. */
export interface ProviderSocial {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface Provider {
  /** Segmento dinámico de la ruta (`/providers/[id]`). */
  slug: string;
  name: string;
  category: string;
  /** Categoría corta usada como antetítulo en la página de dirección. */
  categoryLabel: string;
  /** Sello de proveedor verificado. */
  verified: boolean;
  /** Lema corto mostrado bajo el nombre (página de dirección). */
  tagline: string;
  rating: string;
  reviewCount: number;
  location: string;
  description: string;
  image: { src: string; alt: string };
  stats: readonly ProviderStat[];
  priceFromLabel: string;
  priceFrom: string;
  responseTime: string;
  address: readonly string[];
  phone: string;
  email: string;
  openingHours: readonly ProviderOpeningHour[];
  openingHoursNote: string;
  services: readonly ProviderService[];
  socials: readonly ProviderSocial[];
}

/**
 * Proveedor estático de referencia de esta fase (sin backend, fetch ni
 * persistencia). Reemplazar por la fuente real cuando exista la integración.
 */
export const provider: Provider = {
  slug: "clinica-veterinaria-huellas",
  name: "Clínica Veterinaria Huellas",
  category: "Veterinaria · Cuidado integral",
  categoryLabel: "Salud y bienestar",
  verified: true,
  tagline: "Cuidamos de su salud, contigo.",
  rating: "4,9",
  reviewCount: 128,
  location: "Colombia",
  description:
    "Más de 10 años cuidando de perros y gatos como parte de nuestra familia. Un equipo cercano, atención sin prisas y medicina preventiva para acompañarlos en cada etapa.",
  image: {
    src: "/images/provider.png",
    alt: "Veterinaria atendiendo a un perro golden retriever en la clínica",
  },
  stats: [
    { value: "10+", label: "años de experiencia" },
    { value: "1.200+", label: "mascotas atendidas" },
    { value: "98 %", label: "familias satisfechas" },
  ],
  priceFromLabel: "Consultas desde",
  priceFrom: "50.000",
  responseTime: "Habitualmente responde en menos de 2 h",
  address: ["Calle N° Calle N° – N°", "28010 · Colombia"],
  phone: "+34 910 123 456",
  email: "hola@clinicahuellas.es",
  openingHours: [
    { days: "Lunes a viernes", hours: "09:00–20:00" },
    { days: "Sábados", hours: "10:00–14:00" },
    { days: "Domingos", hours: "Cerrado" },
  ],
  openingHoursNote:
    "Atención con cita previa para cuidar mejor de ti.",
  services: [
    {
      id: "consulta-integral",
      name: "Consulta veterinaria integral",
      description: "Revisión general · 45 min",
      price: "45 €",
      icon: Stethoscope,
    },
    {
      id: "vacunacion",
      name: "Vacunación y prevención",
      description: "Protección a su medida · 30 min",
      price: "Desde 30 €",
      icon: ShieldCheck,
    },
    {
      id: "nutricion",
      name: "Asesoría nutricional",
      description: "Alimentación personalizada · 30 min",
      price: "35 €",
      icon: HeartHandshake,
    },
  ],
  socials: [
    { label: "Instagram", href: "#", icon: Instagram },
    { label: "Facebook", href: "#", icon: Facebook },
  ],
};
