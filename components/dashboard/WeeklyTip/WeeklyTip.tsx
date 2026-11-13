import Heart from "@/components/icons/heart";

/**
 * Consejo de la semana: bloque destacado en color suave bajo la lista de
 * mascotas, con el patrón símbolo + título + apoyo de la "Nota de bienestar"
 * del Home (`docs/design-system.md` §6).
 */
export default function WeeklyTip() {
  return (
    <aside
      aria-labelledby="weekly-tip-title"
      className="flex items-start gap-3 rounded-card bg-accent-soft p-4"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-emblem bg-surface text-accent">
        <Heart aria-hidden="true" className="size-4" />
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <p
          id="weekly-tip-title"
          className="text-label font-bold text-primary-500"
        >
          Consejo de la semana
        </p>
        <p className="text-note text-secondary">
          Revisa sus patas después de cada paseo para detectar irritaciones.
        </p>
      </div>
    </aside>
  );
}
