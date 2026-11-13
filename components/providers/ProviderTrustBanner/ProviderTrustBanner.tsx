import Link from "next/link";
import ArrowRight from "@/components/icons/arrow-right";
import ShieldCheck from "@/components/icons/shield-check";

/**
 * Franja de confianza al pie de la página: mensaje de verificación de
 * proveedores y enlace visual a PetCare.
 */
export default function ProviderTrustBanner() {
  return (
    <section className="flex flex-col gap-3 rounded-card border border-border bg-surface px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
      <p className="flex items-start gap-3 text-note text-secondary">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-primary-600"
        />
        <span>
          Todos nuestros proveedores están verificados. Tú eliges con
          tranquilidad; nosotros cuidamos de los detalles.
        </span>
      </p>

      <Link
        href="/"
        className="flex shrink-0 items-center gap-1.5 text-note font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        Conoce PetCare
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
