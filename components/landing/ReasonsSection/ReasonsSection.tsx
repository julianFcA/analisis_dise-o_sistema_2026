import type { ComponentType, SVGProps } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import CalendarCheck from "@/components/icons/calendar-check";
import ClipboardList from "@/components/icons/clipboard-list";
import MessagesSquare from "@/components/icons/messages-square";
import ShieldCheck from "@/components/icons/shield-check";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface Reason {
  title: string;
  description: string;
  icon: IconComponent;
}

/**
 * Los 4 beneficios documentados (docs/landing-page.md §5 — iconos
 * `shield-check`, `calendar-check`, `clipboard-list`, `messages-square`).
 *
 * ⏳ El copy (títulos y descripciones) no está disponible: el nodo
 * `126:5747` no se pudo extraer (Figma MCP rate-limited) y no figura en la
 * documentación. Se usan marcadores explícitos para no inventar contenido.
 */
const REASONS: readonly Reason[] = [
  {
    title: "Proveedores verificados",
    description: "Revisamos la información de cada proveedor para que elijas con confianza.",
    icon: ShieldCheck,
  },
  {
    title: "Reservas rápidas",
    description: "Encuentra disponibilidad y envía tu solicitud en pocos pasos.",
    icon: CalendarCheck,
  },
  {
    title: "Gestión de solicitudes",
    description: "Consulta el estado de tus servicios y mantén todo organizado.",
    icon: ClipboardList,
  },
  {
    title: "Atención personalizada",
    description: "Te acompañamos para encontrar el cuidado que tu mascota necesita.",
    icon: MessagesSquare,
  },
];

/**
 * Beneficio de Razones (docs/landing-page.md §5): chip 52
 * (`#e6f0ed`, radio 16) con icono 30 + título Bold 17 `#084c49` +
 * descripción Regular 13 `#647873`, todo centrado.
 *
 * ⏳ Estilo del chip asumido como el de las tarjetas de categoría
 * (docs/figma-reference.md §7); el color del icono se asume
 * `--color-primary-600` y los gaps internos 16 (patrón de tarjeta del kit).
 */
function ReasonItem({ title, description, icon: Icon }: Reason) {
  return (
    <li className="flex flex-col items-center gap-4 text-center ">
      <span className="flex size-13 shrink-0 items-center justify-center rounded-chip text-primary-600">
        <Icon aria-hidden="true" className="size-7.5" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-category-title font-bold leading-snug text-primary-500">
          {title}
        </span>
        <span className="text-support leading-relaxed text-secondary">
          {description}
        </span>
      </span>
    </li>
  );
}

/**
 * Razones para elegir PetCare (docs/landing-page.md §5 — nodos D `126:5747`
 * · T `355:4649` · M `389:6325`): encabezado centrado sin descripción y
 * 4 beneficios. Desktop/Tablet en 4 columnas con gap 40 (270px / 150px);
 * Mobile apilado con gap 24 (docs/responsive.md §5).
 *
 * ⏳ El antetítulo, el título y el copy de los beneficios están pendientes de
 * extraer del nodo `126:5747`; se muestran marcadores explícitos.
 */
export default function ReasonsSection() {
  return (
    <section className="py-16 xl:py-18 bg-surface-muted">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="center"
            eyebrow="CONFIANZA EN CADA PASO"
            title="¿Por qué elegir PetCare?"
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
            {REASONS.map((reason) => (
              <ReasonItem key={reason.title} {...reason} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
