# Arquitectura del proyecto — PetCare Landing Page

## 1. Estructura de carpetas (aprobada)

Adaptada a la organización existente del repositorio (App Router en raíz, sin `src/`, alias `@/*` → raíz):

```text
analisis_dise-o_sistema_2026/
├── app/
│   ├── layout.tsx            # RootLayout: DM Sans (next/font), metadata "PetCare", lang="es"
│   ├── page.tsx              # SOLO composición: importa las 11 secciones en orden Figma
│   ├── globals.css           # Tailwind v4: @import "tailwindcss" + @theme con tokens
│   └── favicon.ico
├── components/
│   ├── ui/                   # Primitivas reutilizables del design system (desde el UI Kit)
│   │   ├── Button.tsx        # type: default|secondary|terciary|delete · state: default|focused|disabled|loading · showLeftIcon/showRightIcon/showText/label
│   │   ├── Badge.tsx         # type: default|pending|canceled|review|disabled
│   │   ├── Tag.tsx           # state: default|selected (píldora de filtros)
│   │   ├── Avatar.tsx        # size: 64|48|40|32 · initials | pawIcon (mutuamente excluyentes)
│   │   ├── Input.tsx         # state: default|focused|error (+ variante textarea)
│   │   ├── Select.tsx        # estado closed/focused/open/disabled (dropdown en cliente)
│   │   ├── Checkbox.tsx      # checked|unchecked
│   │   ├── SectionHeading.tsx  # antetítulo + título + descripción (patrón repetido en 6 secciones)
│   │   ├── NavigationItem/
│   │   │   └── NavigationItem.tsx  # link de nav: active + hover/focus por CSS (estados reales)
│   │   ├── NavBar/
│   │   │   └── NavBar.tsx          # shell del nav: inicio + items + acciones (slots; fullWidth para la app)
│   │   ├── SearchBar/
│   │   │   └── SearchBar.tsx       # patrón Search Bar: icono 22 + etiqueta + valor (o campo con borde)
│   │   └── Aside/
│   │       └── Aside.tsx           # contenedor estructural de navegación lateral
│   ├── layout/               # Shells de aplicación (estructura global; no son secciones)
│   │   └── AppLayout/
│   │       └── AppLayout.tsx       # app autenticada: Aside + NavBar superior + <main>{children}
│   ├── landing/              # Una sección del Home Page por archivo (orden de Figma)
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── QuickSearchSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── ReasonsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   └── icons/                # Iconos SVG descargados de Figma (heart.tsx, map-pin.tsx, …)
├── public/
│   ├── illustrations/hero/   # SVGs que componen la ilustración del Hero (atmosphere, woman, man, …)
│   └── images/               # Raster: fotos de servicios, foto "Sobre Nosotros"
├── docs/                     # Documentación técnica (fuente canónica)
│   ├── design-system.md
│   ├── figma-reference.md
│   ├── responsive.md
│   ├── landing-page.md
│   └── architecture.md
├── AGENTS.md                 # Reglas para agentes
├── PROMPT_LANDING.MD         # Enunciado original de la tarea (no modificar)
├── next.config.ts            # No modificar sin razón técnica
├── tsconfig.json             # Alias @/* (ya configurado)
└── eslint.config.mjs
```

### Reglas de la estructura

1. `app/page.tsx` **solo** importa y ordena secciones — prohibido markup de sección en él.
2. Cada sección vive en su propio `.tsx` dentro de `components/landing/`.
3. Las primitivas reutilizables se importan desde `components/ui/` (o `components/icons/`). Si una sección necesita un sub-componente específico no reutilizable, puede ir en `components/landing/<seccion>/` (subcarpeta) — evaluar antes si corresponde a `ui/`.
4. Separación estricta sección/primitiva: si un elemento se usa en 2+ secciones → `ui/`; si solo en una → puede ser local de la sección.
5. Los componentes **nuevos** de `ui/` usan una carpeta por componente (`ui/<Nombre>/<Nombre>.tsx`); los primitivos previos (`Button`, `Input`, `Tag`…) permanecen como archivos planos en `ui/`.
5. Los iconos SVG de Figma se guardan en `components/icons/` como componentes React tipados que conservan el `width`/`height` original (permite tree-shaking y className para color/tamaño). Los SVGs que componen la **ilustración del Hero no son iconos**: se guardan como archivos estáticos en `public/illustrations/hero/` y se referencian como imágenes (posicionamiento absoluto según el diseño).

## 2. Convenciones de código

- **Lenguaje**: TypeScript strict. Props tipadas con tipos/interfaces exportados. Sin `any` innecesario.
- **Componentes**: function components con `export default`. Nombre de archivo = nombre del componente (PascalCase).
- **Importaciones**: siempre con alias `@/` (p. ej. `import Button from "@/components/ui/Button"`).
- **Estilos**: Tailwind v4 **solo con clases utilitarias + tokens de `@theme`** (p. ej. `bg-primary-500`, `text-secondary`, `shadow-card`). Nada de `styled-components`, CSS modules ni estilos inline (salvo posicionamiento absoluto de la ilustración del hero si es indispensable).
- **Tokens**: definidos una única vez en `app/globals.css` (`@theme`), con los nombres de `docs/design-system.md` §2–4. Clases arbitrarias tipo `bg-[#...]` prohibidas en componentes (usar el token; si falta un token, añadirlo a `@theme` y documentarlo).
- **Modo claro único**: eliminar el `prefers-color-scheme: dark` heredado del template en `globals.css`.
- **Next.js 16**: leer `node_modules/next/dist/docs/` antes de tocar APIs del framework (ver AGENTS.md). Usar helpers globales `LayoutProps`/`PageProps`. Imágenes raster con `next/image` (con `width`/`height` o `fill` según contexto).
- **Server Components por defecto**; marcar `"use client"` únicamente donde haya estado/interactividad (QuickSearch, ContactSection, ServicesSection favoritos, Navbar estados) — mantener las secciones estáticas como Server Components.

## 3. Contratos de componentes `ui/`

| Componente | Props mínimas | Comportamiento |
|---|---|---|
| `Button` | `type`, `label`, `state?`, `showLeftIcon?`, `showRightIcon?`, `showText?`, `className?`, `onClick?`, `href?` | Render `<a>` si `href`, si no `<button>`. Estados visuales del kit (disabled deshabilita, loading muestra spinner). |
| `Badge` | `type`, `children` | Estático |
| `Tag` | `selected`, `children`, `onClick?` | Botón toggleable, selección única dentro del grupo (gestionada por la sección) |
| `Avatar` | `size`, `initials?`, `pawIcon?` | `initials` y `pawIcon` mutuamente excluyentes (regla oficial del kit) |
| `Input` | `label`, `placeholder?`, `value?`, `error?`, `onChange?`, `textarea?` | Label + control + mensaje de error (estado `Error` del kit) |
| `Select` | `label`, `options: string[]`, `value?`, `onChange?` | Dropdown nativo o custom con estados Closed/Open/Focused del kit |
| `Checkbox` | `checked`, `onChange`, `children` | Casilla 17×17 + etiqueta |
| `SectionHeading` | `eyebrow`, `title`, `description?`, `align?: "left"|"center"` | Patrones tipográficos del design-system |
| `NavigationItem` | `label`, `href`, `active?`, `icon?`, `trailing?`, `tone?: "surface"|"on-primary"`, `className?`, `onClick?` | Link (`next/link`). `active` = estado de navegación actual (Bold + indicador); `Hovered`/`Focused` se resuelven con `:hover` / `:focus-visible`. `tone` elige la superficie: navbar claro (`surface`) o Aside oscuro (`on-primary`, fila con icono y barra vertical) |
| `NavBar` | `start`, `children?` (`<li>`), `navLabel?`, `navClassName?`, `actions?`, `fullWidth?`, `className?` | Shell estructural del nav (alto 96). Contenedor de página del Landing por defecto; `fullWidth` lo expande a todo el ancho para el Navbar de la app interna. El consumidor decide el contenido y la visibilidad responsive de cada slot |
| `SearchBar` | `icon`, `label?`, `field?`, `className?` + props nativas del `<input>` (incl. `ref`) | Icono 22 + etiqueta Bold 13 + valor Regular 14. Con `field`: campo compacto de 40px con borde y sin etiqueta visible (Navbar de la app) |
| `Aside` | `label?`, `children`, `className?` | Contenedor `<aside>` en columna. Sin estilos visuales propios: la especificación del node `130:977` está pendiente de verificar |

### Contratos de layout (`components/layout/`)

| Componente | Props mínimas | Comportamiento |
|---|---|---|
| `AppLayout` | `children?` | Shell de la app autenticada: `Aside` oscuro de 256px (`md`+, sticky a toda altura), `NavBar` superior a la derecha y `<main>` con el contenido de la ruta. Solo estructura: sin contenido de página, datos ni lógica de autenticación. En mobile el Aside se oculta (sin drawer definido todavía). Las rutas internas futuras lo consumen como `app/(app)/layout.tsx` |

## 4. Interactividad requerida (frontend, sin backend)

Alcance aprobado: **comportamiento en cliente, sin backend, autenticación ni persistencia**.

| Elemento | Interacción |
|---|---|
| Navbar links | Hover/focus (estados Navigation Item), indicador activo, scroll a anclas |
| QuickSearch | Selección única de Tag; 3 campos editables (servicio, ubicación, fecha); validación al "Buscar" |
| Categories cards | Hover clicable; click selecciona el Tag equivalente en QuickSearch |
| Services favoritos | Toggle corazón (estado normal ↔ guardado) |
| Contact form | Validación en cliente: nombre, email (formato), asunto (select), mensaje, checkbox obligatorio; estados Error de Input; botón Loading al enviar (simulado); feedback de éxito (patrón Alert Success) |
| Footer / enlaces | Hover; hrefs placeholder |

Estado compartido entre secciones (p. ej. categoría seleccionada desde Categories → QuickSearch): resolver con composición en `page.tsx` (estado en un cliente-component wrapper) o mantenerlo local por sección — decidir al implementar buscando la opción más simple.

## 5. Datos y contenido

- El copy de las secciones vive **dentro de cada componente de sección** (landing page estática de una sola página). Si un listado se repite o crece (categorías, servicios, testimonios), extraer a un array local tipado dentro del archivo de la sección (p. ej. `const SERVICES: Service[] = [...]`).
- No crear capa de datos ni fetch: todo el contenido es estático del diseño.

## 6. Restricciones

- No instalar dependencias adicionales sin justificar necesidad (actualmente solo `next`, `react`, `react-dom`).
- No modificar `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` sin razón técnica documentada.
- No modificar el archivo de Figma (solo lectura).
- Fuentes: únicamente DM Sans vía `next/font/google` (reemplaza a Geist del template en `layout.tsx`).
- Eliminar assets del template no usados (`next.svg`, `vercel.svg`, etc.) solo cuando se confirme que no se usan.

## 7. Flujo de validación (por cambio visual)

1. `npm run dev` — sin errores de compilación ni de consola.
2. Verificar **1440 / 768 / 390** contra las capturas/frames de Figma (`docs/figma-reference.md` §6).
3. Verificar intermedios **1024 / 1280 / 1920**.
4. Comprobar: sin overflow horizontal (`document.documentElement.scrollWidth <= innerWidth`), componentes interactivos operativos, contraste y estados correctos.
5. `npm run lint` + `npm run build` sin errores.
