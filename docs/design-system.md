# Design System — PetCare

> Fuente: página "3. UI KIT" del archivo de Figma (frame `COMPONENTES`, node `106:1497`) + extracción con `get_design_context` de los frames del Home Page. Los valores hex/textuales son exactos del diseño.
> Nomenclatura de tokens propuesta para `@theme` en `app/globals.css` (Tailwind v4, CSS-first).

## 1. Variables publicadas en Figma

El archivo publica un conjunto mínimo de variables (detectadas vía `get_variable_defs`):

| Variable Figma | Valor | Uso |
|---|---|---|
| `Primary/500` | `#084c49` | Color primario (botones, títulos, marca, footer) |
| `Medium` (texto) | DM Sans · Medium · 500 · 16px · line-height 24px | Estilo base de botones/inputs |
| `Default` (número) | `16` | Padding-x base de botones, gap base |

El resto del sistema usa valores directos (documentados abajo como tokens del proyecto).

## 2. Paleta de colores

### Primario (teal PetCare)

| Token propuesto | Hex | Uso en el diseño |
|---|---|---|
| `--color-primary-700` | `#063d3a` | Texto de botón Secondary |
| `--color-primary-500` | `#084c49` | Botón Default (fondo y borde), títulos H1/H2, marca, precio, fondo del footer, texto de autor |
| `--color-primary-600` | `#0b625e` | Emblema del logo (fondo), antetítulos uppercase, link activo del nav, texto de badge, iniciales de avatar |
| `--color-body` | `#173d39` | Texto de cuerpo destacado (testimonios, etiquetas de formulario, títulos de campos de búsqueda) |

### Neutros

| Token propuesto | Hex | Uso |
|---|---|---|
| `--color-ink` | `#243238` | Azul-gris oscuro: texto o superficie muy oscura |
| `--color-secondary` | `#647873` | Texto secundario: descripciones, links inactivos del nav, placeholders, unidades de precio, notas |
| `--color-surface-muted` | `#f4f7f6` | Fondo de secciones alternas (Hero, Búsqueda, Testimonios — verificados). Fondo de la sección Contacto: ⏳ pendiente de verificar; la card del formulario sí usa este color (verificado) |
| `--color-surface` | `#ffffff` | Fondos de nav, tarjetas, panel de búsqueda, inputs del formulario |
| `--color-chip` | `#e6f0ed` | Fondo del chip de icono (categorías, beneficios) |
| `--color-avatar-bg` | `#e7f3f2` | Fondo de Avatar con iniciales |
| `--color-border` | `#dce7e3` | Bordes de tarjetas, inputs, select, divisores |
| `--color-border-button` | `#dce3e1` | Borde del botón Secondary |
| `--color-overlay` | `#5f6c72` · 56% | Backdrop del Modal (con `backdrop-filter: blur(16px)`) |

### Acento (cálido)

| Token propuesto | Hex | Uso |
|---|---|---|
| `--color-accent` | `#f28c45` | Indicador activo del nav (píldora 19×3, radio 2) |
| `--color-accent-soft` | `#fff3e8` | Fondo del símbolo (icono heart) de la "Nota de bienestar" |
| `--color-accent-warm` | `#fff0e5` | Fondo cálido suave |
| `--color-accent-strong` | `#c96320` | Acento cálido intenso |

### Apoyo

| Token propuesto | Hex | Uso |
|---|---|---|
| `--color-blue-soft` | `#e9f1fb` | Fondo azul suave |
| `--color-purple` | `#7753a6` | Acento violeta |
| `--color-purple-soft` | `#f0ebf8` | Fondo violeta suave |

### Colores del footer (sobre fondo primario)

| Valor | Uso |
|---|---|
| `rgba(255,255,255,0.09)` | Fondo del emblema del footer |
| `rgba(255,255,255,0.19)` | Borde de botones de redes sociales |
| `rgba(255,255,255,0.13)` | Divisor legal |
| `#c5dcd6` | Texto de enlaces/datos del footer |
| `#ffffff` | Marca y títulos de grupos del footer |

## 3. Tipografía

**Familia única: DM Sans** (variable font de Google, `opsz 14`), cargada con `next/font/google` → `DM_Sans`. No usar otras familias.

| Rol | Peso | Tamaño | Line-height | Tracking | Color |
|---|---|---|---|---|---|
| Marca "PetCare" | ExtraBold 800 | 27px | normal | −1px | `#084c49` (nav) / blanco (footer) |
| H1 Hero | Bold 700 | 56px | 1.08 | −2.1px | `#084c49` |
| H2 Título de sección | Bold 700 | 36px | 1.18 | −1.1px | `#084c49` |
| Antetítulo (eyebrow) | Bold 700, UPPERCASE | 12px | normal | +1.3px (hero) / +1.8px (secciones) | `#0b625e` |
| Descripción de sección | Regular 400 | 16px | 1.6 | 0 | `#647873` |
| Cuerpo hero | Regular 400 | 18px | 1.55 | 0 | `#647873` |
| Nombre de servicio (card) | Bold 700 | 21px | normal | −0.5px | `#084c49` |
| Título de categoría (card) | Bold 700 | 17px | normal | 0 | `#084c49` |
| Nav link | Medium 500 / Bold (activo) | 15px | normal | 0 | `#647873` / `#0b625e` |
| Autor de testimonio | Bold 700 | 15px | normal | 0 | `#084c49` |
| Botones / select / inputs | Medium 500 | 16px | 24px | 0 | blanco / `#063d3a` |
| Texto de testimonio | Regular 400 | 16px | 1.65 | 0 | `#173d39` |
| Título de formulario | Bold 700 | 22px | normal | 0 | `#084c49` |
| Proveedor (card servicio) | Regular 400 | 14px | normal | 0 | `#173d39` |
| Placeholders / valores input | Regular 400 | 14px | normal | 0 | `#647873` |
| Cuerpo de filtro (tag) | Medium 500 (normal) / Bold (selected) | 14px | normal | 0 | `#647873` / `#0b625e` |
| Etiqueta de campo de formulario | Bold 700 | 13px | normal | 0 | `#173d39` |
| Etiqueta de campo de búsqueda | Bold 700 | 13px | normal | 0 | `#173d39` |
| Señales de confianza / ubicación | Regular 400 | 13px | normal | 0 | `#647873` |
| Nota de bienestar (título / apoyo) | Bold 700 / Regular 400 | 14px / 12px | normal | 0 | `#084c49` / `#647873` |
| Badge de categoría (foto) | Bold 700 | 12px | normal | 0 | `#0b625e` |
| Iniciales de avatar | Bold 700 | 16px | 13.5px | 0 | `#0b625e` |
| Unidad de precio / nota legal | Regular 400 | 12px | normal / 1.5 | 0 | `#647873` / `#c5dcd6` (footer) |
| Precio | Bold 700 | 24px | normal | 0 | `#084c49` |

Pesos utilizados: **400 (Regular), 500 (Medium), 700 (Bold), 800 (ExtraBold)** — todos disponibles en la variable font DM Sans.

## 4. Layout, espaciado y forma

### Contenedor y padding horizontal

| Breakpoint | Padding-x de sección | Contenido |
|---|---|---|
| Desktop (≥1280, ref. 1440) | `120px` | ancho útil 1200px |
| Tablet (≥768, ref. 768) | `24px` | ancho útil 720px |
| Mobile (<768, ref. 390) | `24px` | ancho útil 342px |

### Espaciados recurrentes

- Gap entre tarjetas: `16px` (categorías) / `24px` (servicios, testimonios, campos de búsqueda)
- Gap interno de encabezado de sección (antetítulo→título→descripción): `16px`
- Padding de tarjeta: `24px` (categoría, servicio) / `28px` (testimonio) / `32px` (panel búsqueda, formulario)
- Gap entre bloques de sección: `32px` (general), `20px` dentro del formulario
- Espaciado vertical de secciones (desktop): `py 64–80px` (varía por sección; ver metadatos en Figma)

### Radios

| Elemento | Radio |
|---|---|
| Botones | `9px` |
| Inputs / select / textarea | `10px` |
| Checkbox | `4px` |
| Chip de icono (categoría/beneficio) | `16px` |
| Tarjeta de categoría / Nota de bienestar / Emblema | `16px` / `16px` / `12px` |
| Tarjeta de servicio / Testimonio / Panel de búsqueda / Formulario | `24px` |
| Badge, botón favorito, tags, redes sociales, avatar | `100px` (píldora/círculo) |

### Bordes y divisores

- Borde de tarjeta/input: `1px solid #dce7e3`
- Borde de botón: `0.8px` (Secondary `#dce3e1`, Default `#084c49`, Terciary transparente)
- Divisores: `1px` de alto, `#dce7e3` (claro) / `rgba(255,255,255,0.13)` (footer)

### Sombras

| Token propuesto | Valor | Uso |
|---|---|---|
| `--shadow-button` | `0 6px 7px rgba(11,98,94,0.19)` | Botón Default (primario) |
| `--shadow-card` | `0 6px 24px rgba(8,76,73,0.04)` | Tarjetas de categoría, servicio y testimonio |
| `--shadow-float` | `0 12px 40px rgba(8,76,73,0.07)` | Panel de búsqueda, Nota de bienestar |

## 5. Componentes del UI Kit (frame `COMPONENTES`, node `106:1497`)

Catálogo completo por sección del UI Kit, con variantes y propiedades. ✅ = requerido para el Home Page.

### 5.1 Navigation Item — `62:100` ✅
- Variantes: `Type=Default | Hovered | Focused` (216×46 en el kit)
- En el Home: links del nav (15px) con indicador activo (píldora `#f28c45` 19×3, radio 2) bajo el link activo.
- Implementado en `components/ui/NavigationItem/`. `active` representa el estado de navegación actual; `Hovered` y `Focused` se resuelven con los estados CSS `:hover` y `:focus-visible` (los valores finos de esas variantes siguen ⏳ pendientes de verificar). No se impone la altura 216×46 del kit: el indicador se ancla al alto del propio link.

### 5.2 Button — `83:1384` ✅ (el más usado)
- **Type**: `Default` (fondo/borde `#084c49`, texto blanco, `--shadow-button`) · `Secondary` (fondo blanco, borde `#dce3e1`, texto `#063d3a`) · `Terciary` (fondo/borde transparente, texto `#084c49`) · `Delete`
- **State**: `Default | Focused | Disabled | Loading`
- **Props**: `label`, `showLeftIcon`, `showRightIcon`, `showText`, `className`
- Anatomía: `min-h 40px` (44px en "Sobre Nosotros"), `px 16`, radio `9px`, borde `0.8px`, gap iconos `8–10px`, icono 20px, texto DM Sans Medium 16/24.
- Usos en el Home: nav (Terciary "Iniciar Sesión", Default "Registrarse"), hero (Secondary "Conoce más", Default "Buscar Servicios"), búsqueda (Default "Buscar"), cards servicio (Secondary "Ver Detalle"), misión (Default, etiqueta ⏳ pendiente de verificar en Figma — alto 44px confirmado por metadatos), formulario (Default "Enviar mensaje").

### 5.3 Input — `96:361` ✅
- Variantes: `State=Default | Focused | Error` (650×60.5 en kit)
- En el Home (formulario): altura 48px, fondo blanco, borde `#dce7e3`, radio 10, padding 14, placeholder Regular 14 `#647873`; etiqueta Bold 13 `#173d39` con `*`. Textarea = variante alta (112px).
- Requiere: estados focus/error con mensajes de validación en cliente.

### 5.4 Select — `99:738` ✅
- Variantes: `State=Closed | Focused | Open | Disabled` (502×58.5 en kit)
- En el Home (Asunto): Closed → 48px, blanco, borde `#dce7e3`, radio 10, valor placeholder + `chevron-down` 16px a la derecha. Implementar apertura (dropdown) en cliente.

### 5.5 Checkbox — `97:343` ✅
- Variantes: `State=Checked | Unchecked`
- En el Home (consentimiento): casilla 17×17, radio 4, blanco + borde `#dce7e3`; texto Regular 12/1.5 `#647873`. Obligatorio para enviar el formulario.

### 5.6 Radio — `97:358` / Switch — `98:485` (no usados en el Home)
- Radio: `Selected | Unselected`. Switch: `On | Off`.

### 5.7 Badge — `83:814` ✅
- Variantes: `Type=Success | Pending | Canceled | Review | Disabled` (62×28 en kit) — el Kit nombra la variante base `Default`; el proyecto la implementa como `success` (fondo suave + texto del estado).
- En el Home: badge de categoría sobre la foto del servicio → píldora blanca, radio 100, `px 12 py 7`, texto Bold 12 `#0b625e` (badge sin `type`).
- Implementado en `components/ui/Badge.tsx`. Cada variante usa tokens existentes (§2); el indicador opcional (`showIndicator`) es un punto de 6px (`size-1.5`) con el color sólido del estado y `aria-hidden`:

| Variante | Background | Text | Indicator |
|---|---|---|---|
| `success` | `--color-chip` | `--color-primary-600` | `--color-primary-600` |
| `pending` | `--color-purple-soft` | `--color-purple` | `--color-purple` |
| `canceled` | `--color-accent-soft` | `--color-accent-strong` | `--color-accent-strong` |
| `review` | `--color-blue-soft` | `--color-blue-steel` | `--color-blue-steel` |
| `disabled` | `--color-border` | `--color-secondary` | `--color-secondary` |
| _sin `type`_ | `--color-surface` | `--color-primary-600` | `--color-primary-600` |

⏳ El sistema no define un token de error/peligro (rojo). `canceled` usa el tono de aviso cálido existente (`accent-soft` + `accent-strong`); si se quiere un rojo semántico real habría que añadir tokens nuevos.

### 5.8 Tag — `100:401` ✅
- Variantes: `State=Default | Selected` (41.6×25.6 en kit)
- En el Home (filtros de búsqueda): píldora radio 100, `py 8`, texto 14. Selected → fondo `#e6f0ed` + texto Bold `#0b625e`; Default → fondo transparente + texto Medium `#647873`.

### 5.9 Avatar — `101:423` ✅
- Variantes: `Size=64 | 48 | 40 | 32`; contenido: `showInitials` / `showPawIcon` (**mutuamente excluyentes**, según descripción oficial del componente en Figma).
- Anatomía: círculo (radio = 50%), fondo `#e7f3f2` (con iniciales) — iniciales DM Sans Bold 16, color `#0b625e`, centradas. En testimonios: `Size=48` con iniciales ("AC", "ML", "EM").
- Categorías documentadas: Person · Pet · Clinic.

### 5.10 Alert — `102:427` (no usado en el Home)
- Variantes: `Type=Success | Warning | Info | Error`.

### 5.11 Tabs & Breadcrumb (no usados en el Home)
- Tab items y Breadcrumb items de navegación contextual.

### 5.12 Card — patrón `106:1759` ✅ (como guía)
- Ejemplo del kit: tarjeta de perfil de mascota (icono + badge de estado + título + metadatos + botón full-width). Sirve de referencia de composición para la tarjeta de servicio del Home.

### 5.13 Modal — `106:1812` ✅ (overlay)
- Overlay de pantalla completa: fondo `#5f6c72` al 56% (`--color-overlay`) + `backdrop-filter: blur(16px)`; se pinta por encima del contenido (`z-60`).
- Implementado en `components/ui/Modal/` como primitiva estructural: recibe `children` libre (título, formulario, acciones…) y `className?` opcional. Sin estado, portal, focus trap, cierre con Escape ni animaciones en esta fase.
- Consumidor de referencia: "Registrar Nueva Mascota" (`components/my-pets/AddPetModal/`). Escape y el cierre los resuelve el consumidor, no la primitiva.
- Tokens del formulario del modal (§2): campos `--color-form-input` (#f1f3f5), dropzone `--color-form-surface` (#f8f9fa) con borde dashed `--color-form-border-dashed` (#cbd5e1), divisores y bordes `--color-form-border` (#dee2e6) y texto de "Cancelar" `--color-form-cancel` (#c86d3b). El resto de la pieza usa los tokens existentes (`primary-500`, `body`, `secondary`, `chip`, `surface`, `radius-card`, `shadow-float`).

### 5.14 Datatable — `106:1830` (no usado en el Home)

### 5.15 Feature Card — `106:1936` ✅ (adaptado)
- Anatomía del kit: chip de icono 42px + título 14 + descripción + botón flecha 27px, en fila.
- En el Home se usa su anatomía para la **Tarjeta de categoría** (desktop: vertical, icono 52 con chip `#e6f0ed` radio 16, título 17, descripción 13, `arrow-up-right` 18px).

### 5.16 Search Bar — `73:2911` ✅ (adaptado)
- Referencia para los campos de la Búsqueda rápida: icono 22px + etiqueta Bold 13 `#173d39` + valor Regular 14 `#647873`. Campo sin borde sobre el panel blanco; `⏳` color del icono no capturado (se usa `#0b625e`).
- Implementado en `components/ui/SearchBar/` como componente reutilizable; los tres campos de la Búsqueda rápida lo consumen.

### 5.17 Nav Bar — `73:2921` / Aside — `130:977` (no usados en el Home — app interna)
- **Nav Bar**: implementado en `components/ui/NavBar/` como shell estructural (identidad + items + acciones sobre el contenedor de página). El Navbar del Home lo compone con `NavigationItem`.
- **Aside**: implementado en `components/ui/Aside/` como contenedor `<aside>` en columna, sin estilos visuales propios (la especificación del node `130:977` sigue ⏳ pendiente). No se integra en el Home.

## 6. Patrones compuestos del Home (no existen como componente en el kit)

Construirlos en `components/ui/` o dentro de la sección, siguiendo los lineamientos anteriores:

- **SectionHeading**: antetítulo (Bold 12 uppercase, tracking 1.8, `#0b625e`) + título (Bold 36, `#084c49`, tracking −1.1) + descripción opcional (Regular 16, `#647873`), gap 16. Alineación izquierda (centrada en Testimonios).
- **Tarjeta de categoría**: blanca, borde `#dce7e3`, radio 16, padding 24, `--shadow-card`; chip icono 52 + info + arrow.
- **Tarjeta de servicio**: blanca, borde, radio **24**, `--shadow-card`; foto 230px (object-cover) + badge + favorito; cuerpo padding 24 con nombre/proveedor/ubicación, divisor, precio + botón.
- **Tarjeta de testimonio**: blanca, radio 24, padding 28, `--shadow-card`; 5 estrellas 15px, texto 16/1.65 `#173d39` (min-h 128 desktop), familia con Avatar 48 + nombre + servicio.
- **Nota de bienestar** (hero): blanca, radio 16, padding 16, `--shadow-float`; símbolo 40 con fondo `#fff3e8` radio 12 + heart 22; título 14 + apoyo 12.
- **Medio de contacto** (Hablemos): símbolo 44 (chip) + icono 20 + título Bold 13 `#173d39`... (ver `docs/landing-page.md` § Contacto; especificación completa pendiente de verificar en Figma).
