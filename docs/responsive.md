# Estrategia Responsive — PetCare Home Page

## 1. Breakpoints

**Decisión aprobada**: usar los **breakpoints por defecto de Tailwind CSS v4** (el proyecto no tenía ninguno definido).

| Prefijo | Min-width | Layout aplicado | Referencia Figma |
|---|---|---|---|
| (base) | < 768px | **Mobile** | Frame 390px (`389:6086`) |
| `md` | ≥ 768px | **Tablet** | Frame 768px (`355:4410`) — coincidencia exacta |
| `xl` | ≥ 1280px | **Desktop** | Frame 1440px (`126:5500`) |

Justificación: `md` coincide exactamente con la referencia tablet (768). El layout desktop funciona sin cambios estructurales desde 1280 hasta anchos superiores (el contenido útil se mantiene en 1200px centrado, con padding 120px a la referencia 1440 y márgenes fluidos por encima). La página debe verse correcta en **todos** los anchos, no solo en las 3 referencias.

Puntos de validación obligatorios: **390, 768, 1440** + intermedios **1024, 1280, 1920**.

## 2. Enfoque

- **Mobile-first**: estilos base = layout mobile; aplicar `md:` y `xl:` para tablet y desktop.
- **No reducir proporcionalmente**: cada breakpoint re-interpreta la composición (columnas → filas, orientación de tarjetas, visibilidad) según la tabla siguiente.
- El alto de los frames Figma (Desktop 5235 / Tablet 5970 / Mobile 9197) es referencial, no fijo: el alto real depende del contenido fluido.

## 3. Reglas generales por breakpoint

| Regla | Mobile (<768) | Tablet (md) | Desktop (xl) |
|---|---|---|---|
| Padding-x de sección | 24px | 24px | 120px |
| Ancho útil (referencia) | 342px | 720px | 1200px |
| Nav | **Solo logo** | Logo + links + 2 botones | Logo + links + 2 botones |
| Nota | Sin overflow horizontal (los elementos que excedan usan scroll interno, p. ej. filtros) | — | Contenido centrado, máx. 1200px |

## 4. Comportamiento por sección (de los 3 frames de Figma)

### 1. Navegación principal — D `126:5501` / T `355:4411` / M `389:6087`
- **Desktop/Tablet**: logo (izq), 4 links centrados (Inicio activo con indicador `#f28c45`), 2 botones (Terciary "Iniciar Sesión" + Default "Registrarse") a la derecha. Alto total 96px, fondo blanco.
- **Mobile**: **solo el logo** (enlaces y acceso ocultos en el diseño; sin hamburguesa — decisión aprobada). Padding-x 24.

### 2. Bienvenida (Hero) — D `126:5521` / T `355:4430` / M `389:6106`
- **Desktop**: 2 columnas — Propuesta de valor 590px + ilustración 570px (con "Nota de bienestar" flotante). Fondo `#f4f7f6`.
- **Tablet**: 1 columna (720px); **ilustración oculta**; título a ancho completo.
- **Mobile**: 1 columna (342px); los 2 CTA pasan de anchos naturales a **165px c/u** (flex 1); señales de confianza se mantienen en fila (332px).
- Título: D 56px ancho 590 / T 56px ancho 720 / M 56px→172px de alto (envuelve a ~3 líneas; el tamaño de fuente no cambia en el diseño).

### 3. Búsqueda rápida — D `126:5657` / T `355:4562` / M `389:6238`
- Panel blanco p-24, radio 24, `--shadow-float`, siempre a ancho útil completo.
- **Desktop** (171px de alto interno): filtros en fila (gap 28) + divisor + 3 campos `flex-1` en fila (gap 24) + botón "Buscar" inline a la derecha.
- **Tablet** (235px): filtros en fila + divisor + 3 campos de 208px en fila + **botón 200px en segunda fila, centrado** (x=260 en el panel de 720px → (720−200)/2).
- **Mobile** (363px): filtros con **scroll horizontal** (los 6 chips exceden 342px; contenedor 294px con overflow-x y scroll interno) + divisor + **3 campos apilados** (294px, gap 24) + botón 200px centrado (x=71 relativo).

### 4. Categorías de servicios — D `126:5696` / T `355:4598` / M `389:6274`
- **Desktop**: 5 tarjetas **verticales** (≈227×207) en fila (gap 16): chip icono 52 arriba, nombre 17, descripción 13, arrow abajo-izquierda.
- **Tablet**: grid **2 columnas** (352×100, gap 16px horizontal y vertical): tarjeta **horizontal** — chip 52 izq (x24), info centrada verticalmente (x96), arrow derecha (x310). 5 tarjetas → 2+2+1.
- **Mobile**: lista **1 columna** de tarjetas horizontales (mismas 352×100 del diseño, adaptar a ancho fluido 342), gap 16.

### 5. Razones para elegir PetCare — D `126:5747` / T `355:4649` / M `389:6325`
- Encabezado centrado (antetítulo + título), sin descripción.
- **Desktop**: 4 beneficios en fila (270px c/u, gap 40): icono 30 centrado + título + descripción (2 líneas).
- **Tablet**: 4 en fila comprimida (150px, gap 40) — textos envuelven a más líneas.
- **Mobile**: **apilados** (342px, gap 24/153→129px alto): icono centrado + título + descripción, todo centrado.

### 6. Servicios destacados — D `126:5772` / T `355:4674` / M `389:6350`
- **Desktop**: 3 tarjetas (384px, gap 24): foto 384×230 + info (nombre 21, proveedor, ubicación) + divisor + precio/botón justificados.
- **Tablet**: 3 tarjetas (224px, gap 24): nombre envuelve (54px), foto 224×230; en "Precio y acción" (176px) el botón pasa junto al precio (x88).
- **Mobile**: tarjetas **apiladas** (342px, gap 24): igual anatomía desktop a ancho menor; botón x178.4 junto al precio.
- Botón "Ver todos" del encabezado: **oculto en los 3 diseños** (no implementar, salvo indicación contraria).
- Nota de ejemplo bajo el catálogo (12px `#647873`) presente en los 3 breakpoints.

### 7. Sobre Nosotros — D `126:5853` / T `355:4749` / M `389:6425`
- **Desktop**: 2 columnas — imagen 544×412 (con chip "Mensaje de comunidad" flotante abajo-izq) + misión 584px (antetítulo, título 2 líneas, misión, propósito, botón 44px).
- **Tablet**: **apilado** — imagen 720×412 arriba (y=32), misión 720 debajo (y=468).
- **Mobile**: apilado — imagen 342 (el chip de comunidad sube a y=235 dentro de la foto), misión 342 con textos envueltos.

### 8. Cómo Funciona — D `126:5870` / T `355:4763` / M `389:6439`
- **Desktop**: 4 pasos en fila (276px, gap 32): fila secuencia (círculo 48 + `arrow-right` 22 a la derecha) + acción + instrucción.
- **Tablet**: 4 en fila (156px, gap 32) — textos envuelven (acción hasta 52px, instrucción 96px).
- **Mobile**: **apilados** (342px, gap 32): flecha `arrow-right` sigue visible (alineada a la derecha del paso 1–3; el paso 4 no la lleva en ningún breakpoint).
- El último paso **nunca** lleva `arrow-right` (en los 3 frames).

### 9. Testimonios — D `126:5906` / T `355:4799` / M `389:6475`
- Fondo `#f4f7f6`; encabezado **centrado**; nota inferior centrada.
- **Desktop**: 3 tarjetas en fila (384×295, gap 24, p-28): estrellas, experiencia (min-h 128), familia (Avatar 48 + nombre + servicio).
- **Tablet**: **apiladas** a 720px (203px alto, gap 24): experiencia en 1–2 líneas (52px), familia a y=127.
- **Mobile**: apiladas 342px (255px alto): experiencia 104px (4 líneas).

### 10. Contacto — D `126:5969` / T `355:4859` / M `389:6535`
- Fondo de la sección: ⏳ pendiente de verificar en Figma (`126:5969`). La **card del formulario** usa `#f4f7f6` (verificado).
- **Desktop**: 2 columnas — Hablemos 440px (encabezado + 3 medios de contacto + nota) + Formulario 672px (card `#f4f7f6` p-32, radio 24).
- **Tablet/Mobile**: **apilado** — Hablemos 720/342 + Formulario debajo (720/342).
- Formulario: "Datos personales" (nombre + correo) **siempre a 2 columnas** (D 296+296 / T 320+320 / M 131+131 — en mobile son inputs estrechos pero en fila, según diseño); asunto (select), mensaje (textarea), consentimiento y botón a ancho completo.

### 11. Pie de página — D `126:6026` / T `355:4913` / M `389:6589`
- Fondo `#084c49`, texto `#c5dcd6`.
- **Desktop**: 4 columnas — Acerca de (300px: logo + propósito + 3 redes) + 3 grupos de enlaces (236px c/u, gap 64) + divisor + fila legal (derechos izq / políticas der).
- **Tablet**: mismas 4 columnas comprimidas (Acerca de 247 + grupos 149.67, gap 8px entre grupos — vs. 64px en desktop).
- **Mobile**: **apilado** — Acerca de (247) + 3 grupos a 342 en columna (y=212/402/628) + legal (los enlaces legales pueden envolver bajo los derechos).
- Redes sociales: 3 chips 36px (instagram, facebook, linkedin).

## 5. Casos especiales

1. **Nav mobile**: solo logo (enlaces y botones `hidden` en Figma). Implementar con `hidden md:flex`.
2. **Ilustración del hero**: `hidden xl:block` (solo desktop).
3. **Filtros de búsqueda mobile**: `overflow-x-auto` con `whitespace-nowrap` en los chips.
4. **Inputs del formulario en mobile**: mantener 2 columnas (131px c/u) según diseño — no apilar.
5. **Imagen "Sobre Nosotros"**: altura 412 fija en D/T; en M recortar (el diseño mantiene 412 con overflow).
6. **Sin overflow horizontal global**: cualquier elemento que exceda el ancho útil (solo filtros) debe resolver con scroll interno.

## 6. Página interna — Mis Mascotas (`/my-pets`)

Se renderiza dentro de `AppLayout`: Aside fijo de 256px desde `md`, Navbar superior y `<main>` fluido con padding 24 → 48 (`xl`). En mobile el Aside se oculta y el contenido usa el ancho completo con padding 24.

| Bloque | Mobile (<768) | Tablet (`md`, 768–1279) | Desktop (`xl`, ≥1280) |
|---|---|---|---|
| Encabezado + CTA | Apilado; botón a ancho completo | Título izq. + botón der. | Igual que tablet |
| Cards KPI | 1 columna | 2 columnas; la tercera ocupa la fila completa | 3 columnas |
| Encabezado de la lista + "Ordenar por" | Apilados; el badge envuelve | Apilados (control en su propia línea) | Fila con el control a la derecha |
| Área de mascotas | Estado vacío centrado; ilustración al ancho disponible | Estado vacío centrado | Estado vacío centrado |
| Próxima solicitud + bienestar | Oculto en vacío; apilados si hay mascotas | Oculto en vacío; apilados si hay mascotas | Oculto en vacío; 2 columnas (`2fr / 1fr`) si hay mascotas |

El estado vacío mantiene la composición vertical (imagen → título → descripción → CTA) centrada en los tres breakpoints. La ilustración conserva su proporción y el botón nunca genera overflow horizontal. El bloque inferior (próxima solicitud + bienestar) solo se compone cuando existen mascotas.
