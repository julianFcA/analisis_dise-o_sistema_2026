import type { ComponentType, SVGProps } from "react";
import PawPrint from "@/components/icons/paw-print";
import Instagram from "@/components/icons/instagram";
import Facebook from "@/components/icons/facebook";
import Linkedin from "@/components/icons/linkedin";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

interface LinkGroup {
  title: string;
  links: readonly string[];
}

/** Redes sociales documentadas (docs/landing-page.md §11). */
const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

/** Los 3 grupos de enlaces documentados (docs/landing-page.md §11). */
const LINK_GROUPS: readonly LinkGroup[] = [
  {
    title: "Explora PetCare",
    links: ["Inicio", "Servicios", "Nosotros", "Contacto"],
  },
  {
    title: "Nuestros servicios",
    links: ["Veterinaria", "Peluquería", "Paseo", "Entrenamiento", "Cuidado Temporal"],
  },
  {
    title: "¿Hablamos?",
    links: [
      "hola@petcare.example",
      "+34 900 000 000",
      "Lun–Vie · 9:00 a 18:00",
      "Centro de ayuda",
    ],
  },
];

/** Enlaces legales documentados (docs/landing-page.md §11). */
const LEGAL_LINKS: readonly string[] = [
  "Privacidad",
  "Términos y condiciones",
  "Cookies",
];

const LINK_CLASSES = [
  "text-control-sm text-footer-text transition-colors",
  "hover:text-surface",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface",
].join(" ");

/**
 * Pie de página (docs/landing-page.md §11 — nodos D `126:6026` ·
 * T `355:4913` · M `389:6589`): fondo `#084c49`, pt 64, pb 28.
 *
 * Desktop (xl): 4 columnas — Acerca de PetCare 300px + 3 grupos de 236px
 * con gap 64 (300 + 3×236 + 3×64 = 1200). Tablet (md): Acerca de 247px +
 * 3 grupos de 149.67px con gap 8 (247 + 3×149.67 + 3×8 = 720). Mobile:
 * apilado — Acerca de 247px + los 3 grupos a 342px (docs/responsive.md §11).
 *
 * Divisor y fila legal: derechos reservados a la izquierda y políticas a la
 * derecha; en mobile los enlaces legales envuelven bajo los derechos.
 *
 * ⏳ El gap vertical entre el bloque superior, el divisor y la fila legal no
 * está documentado: se usan 48px y 24px respectivamente.
 */
export default function FooterSection() {
  return (
    <footer className="bg-primary-500 pt-16 pb-7 text-footer-text">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-[247px_repeat(3,minmax(0,1fr))] md:items-start md:gap-2 xl:grid-cols-[300px_repeat(3,minmax(0,1fr))] xl:gap-16">
          {/* Acerca de PetCare: identidad + propósito + redes. */}
          <div className="flex w-[247px] flex-col gap-4 md:w-auto">
            <a
              href="#"
              className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
            >
              <span className="flex size-[38px] items-center justify-center rounded-emblem bg-white/9 text-surface">
                <PawPrint aria-hidden="true" className="size-[23px]" />
              </span>
              <span className="text-brand font-extrabold text-surface">PetCare</span>
            </a>

            <p className="text-control-sm leading-6">
              Cuidamos lo que más quieres, conectándote con el cuidado que tu
              mascota merece.
            </p>

            <ul className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/19 text-surface transition-colors hover:bg-white/9 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
                  >
                    <Icon aria-hidden="true" className="size-4.25" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Grupos de enlaces. */}
          {LINK_GROUPS.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-4"
            >
              <h3 className="text-nav font-bold text-surface">{group.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={LINK_CLASSES}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divisor + fila legal. */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/13 pt-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-note text-footer-text">
            © 2026 PetCare. Todos los derechos reservados.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-note text-footer-text transition-colors hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
