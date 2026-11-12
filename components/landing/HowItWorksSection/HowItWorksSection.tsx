import SectionHeading from "@/components/ui/SectionHeading";
import ArrowRight from "@/components/icons/arrow-right";

interface Step {
  action: string;
  instruction: string;
}

/**
 * Los 4 pasos documentados (docs/landing-page.md §8).
 *
 * ⏳ El copy (acción e instrucción de cada paso, además del encabezado) no
 * está disponible: el nodo `126:5870` no se pudo extraer (Figma MCP
 * rate-limited) y la documentación lo marca pendiente. Se usan marcadores
 * explícitos para no inventar contenido.
 */
const STEPS: readonly Step[] = [
  { action: "Registrar mascota", instruction: "Crea su perfil y cuéntanos sus necesidades y preferencias." },
  { action: "Buscar servicio", instruction: "Explora proveedores, compara opciones y encuentra su cuidado ideal." },
  { action: "Solicitar servicio", instruction: "Selecciona la fecha, el horario y envía tu solicitud al proveedor." },
  { action: "Gestionar historial", instruction: "Revisa tus solicitudes y consulta sus cuidados en un solo lugar." },
];

/**
 * Cómo Funciona (docs/landing-page.md §8 — nodos D `126:5870` ·
 * T `355:4763` · M `389:6439`): encabezado centrado y 4 pasos.
 *
 * Desktop/Tablet en fila de 4 (276px / 156px, gap 32); Mobile apilado
 * (342px, gap 32) (docs/responsive.md §8). Cada paso: indicador 48×48 con
 * radio 16 y el número + `arrow-right` 22 a la derecha (solo pasos 1–3),
 * acción Bold (alto 26px) e instrucción Regular (alto 48px).
 *
 * Indicador: verde claro (`--color-chip`) con número `--color-primary-600`;
 * el paso 1 usa verde primario (`--color-primary-500`) con número blanco.
 * Flecha: gris-verde apagado (`--color-border`, #dce7e3).
 */
export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="center"
            eyebrow="ASÍ DE SENCILLO"
            title="Cómo Funciona"
            description="Menos complicaciones para ti. Más bienestar para tu mascota."
          />

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.action} className="flex flex-col gap-4">
                {/* Secuencia: número del paso + conector (los pasos 1–3). */}
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      "flex size-12 shrink-0 items-center justify-center rounded-chip text-service-name font-bold",
                      index === 0
                        ? "bg-primary-500 text-surface"
                        : "bg-chip text-primary-600",
                    ].join(" ")}
                  >
                    {index + 1}
                  </span>
                  {index < STEPS.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="shrink-0 text-border"
                    />
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-category-title font-bold leading-6.5 text-primary-500">
                    {step.action}
                  </h3>
                  <p className="text-description leading-normal text-secondary">
                    {step.instruction}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
