# Arquitectura del proyecto — PetCare Landing Page

## 1. Estructura de carpetas

Adaptada a la organización existente del repositorio (App Router en raíz, sin `src/`, alias `@/*` → raíz):

```text
analisis_dise-o_sistema_2026/
├── app/
│   ├── layout.tsx            # RootLayout: DM Sans (next/font), metadata "PetCare", lang="es"
│   ├── page.tsx              # SOLO composición: importa las 11 secciones en orden Figma
│   ├── (app)/                # Rutas de la aplicación autenticada (sin segmento en la URL)
│   │   ├── layout.tsx        # compone AppLayout (Aside + Navbar + main)
│   │   ├── dashboard/
│   │   │   └── page.tsx      # /dashboard: SOLO composición de los bloques del Dashboard
│   │   ├── my-pets/
│   │   │   └── page.tsx      # /my-pets: SOLO composición de los bloques de Mis Mascotas
│   │   └── services/
│   │       └── page.tsx      # /services: SOLO composición del catálogo de servicios
│   ├── globals.css           # Tailwind v4: @import "tailwindcss" + @theme con tokens
│   └── favicon.ico
├── components/
│   ├── ui/                   # Primitivas reutilizables del design system (desde el UI Kit)
│   │   ├── Button.tsx        # type: default|secondary|terciary|delete · state: default|focused|disabled|loading · showLeftIcon/showRightIcon/showText/label
│   │   ├── Badge.tsx         # type: success|pending|canceled|review|disabled (+ showIndicator)
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
│   ├── dashboard/            # Bloques de contenido del Dashboard (app autenticada)
│   │   ├── DashboardHeader/        # bienvenida (eyebrow + H1 + descripción)
│   │   ├── DashboardHero/          # banner: mensaje + foto + CTA + sello de confianza
│   │   ├── DashboardStats/         # 3 cards KPI
│   │   ├── UpcomingAppointment/    # próxima cita
│   │   ├── MyPets/                 # lista de mascotas + consejo
│   │   ├── RecommendedServices/    # cuadrícula de servicios
│   │   ├── WeeklyTip/              # consejo de la semana
│   │   └── DashboardSectionHeader/ # encabezado compartido de las tarjetas
│   ├── my-pets/              # Bloques de contenido de Mis Mascotas (app autenticada)
│   │   ├── MyPetsHeader/           # H1, descripción y CTA "Agregar Mascota"
│   │   ├── MyPetsStats/            # 3 cards KPI (mascotas, solicitudes, próxima cita)
│   │   ├── PetList/                # encabezado con contador y estado vacío
│   │   ├── EmptyPetsState/         # ilustración `dog_cat.svg` + mensaje + CTA
│   │   ├── PetCard/                # foto, badge de tipo, estado, datos y acciones
│   │   ├── UpcomingRequest/        # próxima solicitud con fecha y enlace
│   │   ├── AddPetModal/            # modal "Registrar Nueva Mascota" (formulario + dropzone)
│   │   └── PetWellbeingCard/       # consejo de bienestar
│   ├── services/             # Bloques del catálogo de servicios (app autenticada)
│   │   ├── ServicesHeader/         # eyebrow + H1 + descripción + bloque de confianza
│   │   ├── ServiceCategories/      # tabs de categoría (filtran el catálogo)
│   │   ├── ServicesFilters/        # sidebar de filtros combinados (categoría, precio, disponibilidad, ubicación, calificación)
│   │   ├── ServicesToolbar/        # contador dinámico + búsqueda activa + ordenamiento
│   │   ├── ServiceCard/            # card de servicio (imagen, badge, favorito, datos, precio, CTA)
│   │   ├── ServicesGrid/           # grid de cards + estado vacío
│   │   ├── ServicesEmpty/          # estado vacío con "Limpiar filtros"
│   │   ├── ServicesPagination/     # paginación funcional del resultado filtrado
│   │   ├── ServicesInfo/           # información inferior (confianza + nota de precios)
│   │   └── ServicesExplorer/       # estado y composición cliente de toda la página
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
│   └── images/               # Raster: fotos de servicios, "Sobre Nosotros" y mascotas (`pets/`)
├── data/
│   └── services.json         # Dataset local del catálogo de servicios (única fuente de datos)
├── lib/
│   ├── cn.ts                 # unión de clases Tailwind
│   └── services.ts           # tipos del JSON, filtros combinados, ordenamiento y formato
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
| `Badge` | `type`, `showIndicator?`, `children`, `className?` | Estático; `showIndicator` añade el punto decorativo (`aria-hidden`) con el color del estado |
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
| `Modal` | `children`, `className?` | Overlay fijo de pantalla completa (`--color-overlay` + `backdrop-blur-lg`) con `children` centrado y libre. Sin estado, portal, focus trap, Escape ni animaciones |

### Contratos de layout (`components/layout/`)

| Componente | Props mínimas | Comportamiento |
|---|---|---|
### Bloques del Dashboard (`components/dashboard/`)

| Componente | Props | Comportamiento |
|---|---|---|
| `DashboardHeader` | — | Bienvenida (eyebrow + `<h1>` + descripción) |
| `DashboardHero` | — | Banner primario con badge, título, descripción, CTA y foto (`next/image`) + sello de confianza |
| `DashboardStats` | — | Tres cards KPI estáticas (icono, número, etiqueta, chevron) |
| `UpcomingAppointment` | — | Encabezado AGENDA y tarjeta de la próxima cita (fecha, estado, servicio, hora, ubicación, profesional) |
| `MyPets` | — | Encabezado FAMILIA, lista de mascotas y `WeeklyTip`; sin CRUD |
| `RecommendedServices` | — | Encabezado PARA ELLOS y cuadrícula 2→1 de servicios |
| `WeeklyTip` | — | Bloque destacado en `--color-accent-soft` |
| `DashboardSectionHeader` | `eyebrow`, `title`, `action?` | Encabezado reutilizable de las tarjetas (Bold 12 uppercase + Bold 22 + acción) |

Los bloques son Server Components sin estado: los datos son estáticos de referencia, sin backend, autenticación ni lógica real (alcance de la fase).

| `AppLayout` | `children?` | Shell de la app autenticada: `Aside` oscuro de 256px (`md`+, sticky a toda altura), `NavBar` superior a la derecha y `<main>` con el contenido de la ruta. Solo estructura: sin contenido de página, datos ni lógica de autenticación. En mobile el Aside se oculta (sin drawer definido todavía). Las rutas internas futuras lo consumen como `app/(app)/layout.tsx`. El item activo se deriva de `usePathname()` según el `href` de cada ruta |

### Bloques de Mis Mascotas (`components/my-pets/`)

| Componente | Props | Comportamiento |
|---|---|---|
| `MyPetsHeader` | — | Client Component: `<h1>` "Mis Mascotas", descripción y CTA "Agregar Mascota", que abre `AddPetModal` (el estado de apertura vive aquí) |
| `AddPetModal` | `open`, `onClose` | Formulario "Registrar Nueva Mascota" dentro del `Modal` del kit: nombre, especie, raza dependiente de la especie, edad, peso y dropzone de foto opcional. Valida en cliente, cierra con X/Cancelar/Escape (limpiando el formulario) y simula el guardado con el estado `loading` de `Button`; sin API ni persistencia |
| `MyPetsStats` | — | Tres cards KPI estáticas (total, solicitudes activas, próxima cita) |
| `PetList` | — | Encabezado con contador y `EmptyPetsState` (sin control de orden mientras no haya mascotas) |
| `EmptyPetsState` | — | Client Component: estado vacío centrado con `dog_cat.svg` decorativo, título, descripción y CTA "Agregar mi primera mascota" (`Button` Default), que abre `AddPetModal` (el estado de apertura vive aquí) |
| `PetCard` | `pet: Pet` | Foto (`next/image`) con `Badge` de tipo, estado de salud, raza/edad, registro y acciones Editar/Eliminar (visuales) |
| `UpcomingRequest` | — | Próxima solicitud con fecha, estado y enlace "Ver solicitud" |
| `PetWellbeingCard` | — | Bloque destacado en `--color-chip` con consejo de bienestar |

Salvo `MyPetsHeader`, `EmptyPetsState` y `AddPetModal` (Client Components por el estado de apertura del modal y del formulario), los bloques son Server Components sin estado: datos estáticos de referencia, sin CRUD, backend ni autenticación. Las fotos se sirven desde `public/images/pets/`. Mientras el escenario esté vacío (`PET_COUNT === 0`), la página oculta la próxima solicitud y el bloque de bienestar porque dependen de datos de mascotas.

### Bloques de Servicios (`/services`)

| Componente | Props | Comportamiento |
|---|---|---|
| `ServicesHeader` | — | `<h1>` de la ruta, antetítulo, descripción y bloque de confianza |
| `ServiceCategories` | `value`, `onChange` | Tabs de categoría (`Tag`); en mobile/tablet se desplazan horizontalmente |
| `ServicesFilters` | `filters`, `totalCount`, `categoryCounts`, `locations`, `priceBounds`, `onChange`, `onClear`, `onClose?`, `onApply?`, `className?` | Sidebar propio de Services (no es el Aside global); comunica cambios parciales del estado. `onClose`/`onApply` añaden el cierre y el botón "Aplicar filtros" que solo se pintan por debajo de `xl` |
| `ServicesToolbar` | `resultCount`, `sort`, `onSortChange`, `query`, `onClearQuery` | Contador dinámico (`aria-live`), término de búsqueda activo y `Select` de orden |
| `ServiceCard` | `service`, `favorite`, `onToggleFavorite` | Card con `next/image`, `Badge` de categoría, favorito (`aria-label`/`aria-pressed`), proveedor verificado, ubicación + distancia, precio/unidad, rating y CTA |
| `ServicesGrid` | `services`, `favorites`, `onToggleFavorite`, `onClearFilters` | 1 columna → 2 (`sm`) → 3 (`2xl`); delega el estado vacío en `ServicesEmpty` |
| `ServicesEmpty` | `onClear` | Mensaje de "sin resultados" + "Limpiar filtros" |
| `ServicesPagination` | `page`, `totalItems`, `onPageChange` | Calcula páginas desde `totalItems`, resumen "Mostrando X–Y de Z" y botones con `aria-current` |
| `ServicesInfo` | — | Franja informativa inferior (proveedores verificados + nota de precios) |
| `ServicesExplorer` | — | Client Component: estado de filtros, orden, página y favoritos; compone categorías + grid y resuelve `?q=`. Por debajo de `xl` los filtros se abren como hoja inferior (overlay, deslizamiento, foco, Escape y bloqueo de scroll); el botón de apertura muestra el número de filtros activos y va acompañado de "Limpiar filtros" |

### Bloques del detalle de servicio (`/services/[serviceId]`)

| Componente | Props | Comportamiento |
|---|---|---|
| `ServiceBreadcrumb` | `serviceTitle` | Ruta Inicio › Servicios › servicio actual (`aria-current="page"` en el último elemento) |
| `ServiceGallery` | `service` | Client Component: galería de 4 fotos locales; píldora "Cuidado de confianza" y favorito (`aria-pressed`) sobre la foto principal |
| `ServiceInfo` | `service` | Columna derecha: antetítulo con icono, `<h1>`, rating, descripción, duración/ciudad, proveedor, flexibilidad y CTA a `?service=` |
| `ServiceProviderCard` | `provider` | Chip de icono, nombre con verificación y enlace "Conocer al proveedor" a `/providers/[slug]` |
| `ServiceAvailability` | — | Bloque "Flexibilidad para ti" (horario se acuerda tras la solicitud) |
| `ServiceBenefits` | — | "Todo lo que necesita para estar bien": dos beneficios y nota previa a la visita |
| `ServiceReview` | — | Reseña de referencia en formato cita con `Avatar` (sin datos de reviews en el dataset) |
| `ServiceFooter` | — | Línea legal + enlaces Privacidad / Términos de uso / Ayuda |

`Gallery` (`components/ui/`) admite `badge`/`action` opcionales para superponer contenido en la foto principal y muestra el contador `n/total`.

### Bloques de Dirección del Proveedor (`/providers/[id]/direccion`)

| Componente | Props | Comportamiento |
|---|---|---|
| `ProviderAddressHeader` | — | `<h1>`, descripción y sello "Cerca de tu mascota" (dos columnas desde `md`) |
| `ProviderAddressCard` | — | Identidad del proveedor (categoría, verificación, nombre, lema) y bloques de contacto: dirección, ciudad, teléfono, correo y horarios, leídos de `components/providers/data.ts` |
| `ProviderMap` | — | Client Component: card "Aquí nos encontrarás" con `MapPreview`, ciudad, dirección, acción "Copiar" al portapapeles y "Ampliar mapa" que abre la vista grande en el `Modal` del kit (Escape y bloqueo de scroll como en `Gallery`) |
| `ProviderVisitInfo` | — | Banner "Una visita sin complicaciones" con tres beneficios (Metro, acceso adaptado y cita previa): encabezado a la izquierda y beneficios en fila con divisores desde `xl` |
| `MapPreview` (`ui/`) | `label?`, `markerTitle?`, `markerMeta?`, `className?` | Maqueta estática de mapa en SVG: manzanas giradas, avenida diagonal, zona verde, rótulos de calles, escala y atribución; marcador naranja con rótulo del proveedor, estación de metro y controles visuales. Sin librerías, tiles ni API; el marcador queda centrado en mobile y desplazado desde `md` |

La ruta conserva el nombre de segmento `[id]` de `/providers/[id]` y muestra la página 404 si el `id` no coincide con el `slug` del dataset. Se llega a ella desde la card "Ven a conocernos" (`ProviderLocation`) del detalle del proveedor.

**Fuente de datos**: `data/services.json` (48 registros) vía `lib/services.ts`, que expone los tipos (`Service`, `ServiceFilterState`), las constantes de facetas (`SERVICE_CATEGORIES`, `SERVICE_LOCATIONS`, `SERVICE_PRICE_BOUNDS`, `SERVICE_PAGE_SIZE`…), `filterServices` (búsqueda + filtros combinados), `sortServices` y los formateadores de precio/distancia. No hay fetch, backend ni persistencia.

**Flujo de datos**: `JSON → búsqueda/categoría → filtros del sidebar → ordenamiento → paginación → ServiceCard`. La búsqueda del Navbar (`AppSearchForm`) navega a `/services?q=<término>`; al cambiar cualquier filtro, búsqueda u orden la página vuelve a 1 (se deriva de la clave de la combinación activa, sin efectos).

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
