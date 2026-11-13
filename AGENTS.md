# AGENTS.md — PetCare Landing Page

Guía de reglas para agentes que trabajan en este repositorio. Léela completa antes de escribir código.

## 1. Qué es este proyecto

Implementación del **Home Page de PetCare** (plataforma ficticia para encontrar y reservar servicios de cuidado de mascotas) a partir de un diseño de alta fidelidad en Figma. El diseño incluye un UI Kit propio ("PetCare Design System · v1.0") y 3 frames responsive (Desktop 1440 / Tablet 768 / Mobile 390).

## 2. Stack tecnológico (no modificar sin justificación técnica)

- **Next.js 16.4.6** — App Router, directorio `app/` en la raíz (sin `src/`)
- **React 19.3** + **TypeScript 5** (strict)
- **Tailwind CSS 4.3** — configuración CSS-first vía `@theme` en `app/globals.css` (no existe `tailwind.config.*`)
- Alias de importación: `@/*` → raíz del proyecto (definido en `tsconfig.json`)
- Helpers tipados globales de Next 16: `LayoutProps<'/ruta'>`, `PageProps<'/ruta'>` (sin import)

## 3. Fuente de verdad

1. **Primera fuente de consulta**: la documentación en `docs/` (este directorio es la fuente canónica para futuras tareas).
   - `docs/design-system.md` — tokens, componentes, variantes y propiedades
   - `docs/figma-reference.md` — referencias de nodos de Figma, assets y flujo de verificación
   - `docs/responsive.md` — breakpoints y comportamiento por resolución
   - `docs/landing-page.md` — estructura, contenido e interacciones de las 11 secciones
   - `docs/architecture.md` — arquitectura de carpetas y convenciones de código
2. **Fuente de verificación visual**: el archivo de Figma (ver `docs/figma-reference.md`). Figma es **solo lectura**: nunca modificar el archivo ni sus componentes.

Ante conflicto entre documentación y Figma, verificar en Figma y actualizar la documentación en el mismo cambio.

## 4. Reglas de fidelidad del diseño

- Usar **exclusivamente** los tokens de `docs/design-system.md` (colores, tipografía, radios, sombras). Prohibido introducir colores o tamaños arbitrarios.
- Tipografía: **DM Sans** (única familia), cargada con `next/font/google` en `app/layout.tsx`.
- Reutilizar los componentes de `components/ui/`; no duplicar componentes existentes ni sustituirlos por alternativas visuales diferentes.
- Si un elemento no existe en el UI Kit, construirlo siguiendo sus lineamientos (patrones de tarjeta, chip de icono, encabezado de sección).
- Modo **claro únicamente** (el diseño no define modo oscuro).
- Descargar todos los assets estáticos de Figma a local según su tipo: `components/icons/` (iconos → componentes React), `public/images/` (fotografías y recursos raster), `public/illustrations/hero/` (SVGs de la ilustración del Hero). Nunca dejar URLs temporales de Figma en el código.
- Los SVG deben conservar sus atributos `width`/`height` raíz; no aplicar `100%×100%` genérico.

## 5. Arquitectura (resumen — detalle en `docs/architecture.md`)

```text
app/                  # layout (fuentes, metadata) + page.tsx (solo composición)
components/ui/        # componentes reutilizables del design system (Button, Badge, Tag, Avatar, Input, Select, Checkbox, SectionHeading…)
components/landing/   # una sección del Home Page por archivo (Navbar, HeroSection, …)
components/icons/     # iconos SVG reutilizables (componentes React)
public/illustrations/hero/  # SVGs que componen la ilustración del Hero
public/images/        # fotografías y recursos raster (fotos de servicios)
docs/                 # documentación técnica (fuente canónica)
```

- `app/page.tsx` **solo** importa y ordena las secciones. Nada de markup de sección allí.
- Cada sección es un componente independiente en `components/landing/`.
- Separación estricta: sección (`landing/`) vs. primitiva reutilizable (`ui/`).

## 6. Interactividad (frontend únicamente)

Los componentes interactivos deben comportarse en el frontend: estados (hover, focus, disabled, loading), **validaciones de formulario en cliente**, selección de filtros/tags, apertura de dropdown, toggle de favoritos. **No implementar** backend, autenticación, persistencia de datos ni llamadas a API que no estén en el alcance del diseño.

## 7. Responsive

- Breakpoints: **defaults de Tailwind** — `base` (<768) = Mobile (ref. 390), `md` (≥768) = Tablet (ref. 768), `xl` (≥1280) = Desktop (ref. 1440).
- Enfoque mobile-first. La página debe funcionar en tamaños intermedios y superiores (validar 1024, 1280, 1920).
- Nav en mobile: **solo logo** (decisión aprobada — el diseño no incluye menú hamburguesa).
- Detalle completo por sección en `docs/responsive.md`.

## 8. Comandos

```bash
npm run dev     # servidor de desarrollo (http://localhost:3000)
npm run build   # build de producción
npm run lint    # eslint
```

## 9. Reglas de trabajo

- Antes de escribir código en una sección: consultar `docs/landing-page.md` + verificar el nodo de Figma correspondiente (`docs/figma-reference.md`).
- Mantener el código limpio y legible; TypeScript strict sin `any` innecesario.
- No instalar dependencias adicionales sin justificar su necesidad.
- No modificar configuraciones existentes sin razón técnica.
- Al terminar cambios visuales: validar en 1440/768/390 + intermedios, sin overflow horizontal, sin errores de compilación ni de consola.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
