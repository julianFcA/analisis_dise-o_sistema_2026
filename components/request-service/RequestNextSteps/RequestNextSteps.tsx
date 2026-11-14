import ClipboardList from "@/components/icons/clipboard-list";

/**
 * Card informativa bajo el resumen: explica qué ocurre después de enviar la
 * solicitud. Sin acciones ni lógica adicional.
 */
export default function RequestNextSteps() {
  return (
    <section
      aria-labelledby="request-next-steps-title"
      className="flex min-w-0 gap-3 rounded-card-lg border border-border bg-surface p-5 shadow-card"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-emblem bg-chip text-primary-600">
        <ClipboardList aria-hidden="true" className="size-5" />
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <h2
          id="request-next-steps-title"
          className="text-nav font-bold text-primary-500"
        >
          ¿Qué pasa después?
        </h2>
        <p className="text-note text-secondary">
          Tu solicitud quedará pendiente. Te avisaremos cuando el proveedor
          confirme y podrás seguirla en tu historial.
        </p>
      </div>
    </section>
  );
}
