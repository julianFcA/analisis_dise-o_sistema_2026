import { extendTailwindMerge } from "tailwind-merge";

/**
 * Los tokens de `@theme` (`text-control`, `rounded-button`, `bg-surface`…)
 * no están en la escala por defecto de Tailwind. Sin registrarlos,
 * `tailwind-merge` no distingue tamaño de color ni radio custom, y una
 * clase de la instancia no puede reemplazar a la del componente.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "brand",
        "h1",
        "h2",
        "eyebrow",
        "eyebrow-hero",
        "hero-body",
        "description",
        "testimonial",
        "service-name",
        "category-title",
        "nav",
        "testimonial-author",
        "control",
        "control-sm",
        "tag",
        "form-title",
        "label",
        "support",
        "badge",
        "note",
        "avatar-initials",
        "price",
      ],
      color: [
        "primary-500",
        "primary-600",
        "primary-700",
        "body",
        "secondary",
        "surface",
        "surface-muted",
        "chip",
        "avatar-bg",
        "border",
        "border-button",
        "accent",
        "accent-soft",
        "footer-text",
        "form-input",
        "form-surface",
        "form-border",
        "form-border-dashed",
        "form-cancel",
      ],
      radius: ["button", "input", "checkbox", "chip", "card", "card-lg", "emblem"],
      shadow: ["button", "card", "float"],
    },
  },
});

/** Une clases de Tailwind. Las que van al final ganan el conflicto. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes);
}
