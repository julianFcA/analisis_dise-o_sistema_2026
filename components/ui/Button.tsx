import type { MouseEventHandler, ReactNode } from "react";

/** Variantes `Type` del Button del UI Kit (node 83:1384). */
export type ButtonType = "default" | "secondary" | "terciary" | "delete";

/** Estados `State` del Button del UI Kit (node 83:1384). */
export type ButtonState = "default" | "focused" | "disabled" | "loading";

export interface ButtonProps {
  /** Texto del botón (prop `label` del kit). */
  label: string;
  /** Variante visual del kit. */
  type?: ButtonType;
  /** Estado visual del kit. `disabled` y `loading` deshabilitan el control. */
  state?: ButtonState;
  /** Icono del slot izquierdo (`showLeftIcon` en el kit, 20px). */
  leftIcon?: ReactNode;
  /** Icono del slot derecho (`showRightIcon` en el kit, 20px). */
  rightIcon?: ReactNode;
  /** Renderiza el texto (prop `showText` del kit). Si es `false`, el botón
   * queda solo-icono y `label` pasa a ser su nombre accesible. */
  showText?: boolean;
  /** Si se define, renderiza un `<a href>` en lugar de `<button>`. */
  href?: string;
  /** Convierte el `<button>` en `type="submit"` (formulario de contacto). */
  submit?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

/* Anatomía documentada (docs/design-system.md §5.2): min-h 40px, px 16,
   radio 9, borde 0.8px, texto DM Sans Medium 16/24, sombra en Default. */
const BASE_CLASSES = [
  "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap",
  "rounded-button border-[0.8px] px-4",
  "text-control font-medium",
  "transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
].join(" ");

/** Estado `Focused` simulado estáticamente (mismo criterio que :focus-visible). */
const FOCUSED_CLASSES = "outline-2 outline-offset-2 outline-primary-600";

const VARIANT_CLASSES: Record<ButtonType, string> = {
  default:
    "bg-primary-500 border-primary-500 text-surface shadow-button hover:bg-primary-700 hover:border-primary-700",
  secondary:
    "bg-surface border-border-button text-primary-700 hover:bg-surface-muted",
  terciary:
    "bg-transparent border-transparent text-primary-500 hover:bg-chip",
  // ⏳ Delete (83:1390): estilo no verificado aún en Figma (límite de llamadas
  // del plan Starter). Provisionalmente usa los tokens del patrón Secondary;
  // ajustar este registro al verificar el kit.
  delete:
    "bg-surface border-border-button text-primary-700 hover:bg-surface-muted",
};

/** Spinner del estado `Loading` (⏳ visual del kit pendiente de verificar). */
function Spinner() {
  return (
    <svg
      className="size-5 shrink-0 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}

export default function Button({
  label,
  type = "default",
  state = "default",
  leftIcon,
  rightIcon,
  showText = true,
  href,
  submit,
  className,
  onClick,
}: ButtonProps) {
  const isLoading = state === "loading";
  const isDisabled = state === "disabled" || isLoading;
  const ariaLabel = showText ? undefined : label;

  const classes = [BASE_CLASSES, VARIANT_CLASSES[type], className];
  if (state === "focused") classes.push(FOCUSED_CLASSES);
  const buttonClassName = classes.filter(Boolean).join(" ");

  const content = (
    <>
      {isLoading ? <Spinner /> : leftIcon}
      {showText ? <span>{label}</span> : null}
      {rightIcon}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={buttonClassName} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={buttonClassName}
    >
      {content}
    </button>
  );
}
