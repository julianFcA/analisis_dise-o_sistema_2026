import PawPrint from "@/components/icons/paw-print";

/** Tamaños `Size` del Avatar del UI Kit (node 101:423). */
export type AvatarSize = 64 | 48 | 40 | 32;

/**
 * Contenido del Avatar: `initials` y `pawIcon` son mutuamente excluyentes
 * ("Use Show initials and Show paw icon to choose the content; enable one
 * at a time" — descripción oficial del kit, docs/figma-reference.md §4).
 */
export type AvatarProps = {
  size: AvatarSize;
  /** Iniciales centradas (p. ej. "AC" en los testimonios). */
  initials: string;
  className?: string;
} | {
  size: AvatarSize;
  /** Variante con icono de huella (`showPawIcon`). */
  pawIcon: true;
  className?: string;
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  64: "size-16",
  48: "size-12",
  40: "size-10",
  32: "size-8",
};

/* ⏳ Tamaño del icono de la variante `pawIcon` pendiente de verificar en el
   kit (101:423): proporción 50% del avatar como criterio de implementación. */
const PAW_SIZE_CLASSES: Record<AvatarSize, string> = {
  64: "size-8",
  48: "size-6",
  40: "size-5",
  32: "size-4",
};

/** Anatomía documentada (§5.9): círculo, fondo #e7f3f2 con iniciales,
    iniciales DM Sans Bold 16 color #0b625e, centradas. */
export default function Avatar(props: AvatarProps) {
  const { size, className } = props;

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg text-primary-600",
        SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {"initials" in props ? (
        <span className="text-avatar-initials font-bold" aria-hidden="true">
          {props.initials}
        </span>
      ) : (
        <PawPrint className={PAW_SIZE_CLASSES[size]} aria-hidden="true" />
      )}
    </span>
  );
}
