# Referencia de Figma — PetCare Home Page

> Figma se utiliza **exclusivamente como fuente de referencia y verificación (solo lectura)**. Nunca modificar el archivo, sus componentes ni sus variables.

## 1. Archivo

| Campo | Valor |
|---|---|
| Nombre | Diseño Alta Fidelidad |
| URL | https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad |
| fileKey | `GyodZakXoH4EMdXC7wBFsD` |
| Página del UI Kit | "3. UI KIT" (node `106:1496`) |
| Página del Home | "4. Wireframe baja fidelidad / 5. Diseño alta fidelidad" |
| Acceso | Archivo compartido (acceso como colaborador; puede no aparecer entre los archivos propios — acceder siempre por URL/fileKey) |

## 2. Frames del Home Page (3 breakpoints)

| Frame | Node ID | Resolución | Ancho × alto | URL |
|---|---|---|---|---|
| Desktop | `126:5500` | 1440px | 1440 × 5235 | https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=126-5500 |
| Tablet | `355:4410` | 768px | 768 × 5970 | https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=355-4410 |
| Mobile | `389:6086` | 390px | 390 × 9197 | https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=389-6086 |

Formato de URL de nodo: `...?node-id=<id con "-">`. Para herramientas MCP usar formato con `:` (p. ej. `126:5500`).

## 3. Secciones del Home Page — Node IDs por breakpoint

| # | Sección | Desktop | Tablet | Mobile |
|---|---|---|---|---|
| 1 | Navegación principal | `126:5501` | `355:4411` | `389:6087` |
| 2 | Bienvenida (Hero) | `126:5521` | `355:4430` | `389:6106` |
| 3 | Búsqueda rápida | `126:5657` | `355:4562` | `389:6238` |
| 4 | Categorías de servicios | `126:5696` | `355:4598` | `389:6274` |
| 5 | Razones para elegir PetCare | `126:5747` | `355:4649` | `389:6325` |
| 6 | Servicios destacados | `126:5772` | `355:4674` | `389:6350` |
| 7 | Sobre Nosotros | `126:5853` | `355:4749` | `389:6425` |
| 8 | Cómo Funciona | `126:5870` | `355:4763` | `389:6439` |
| 9 | Testimonios | `126:5906` | `355:4799` | `389:6475` |
| 10 | Contacto | `126:5969` | `355:4859` | `389:6535` |
| 11 | Pie de página | `126:6026` | `355:4913` | `389:6589` (nombre "Footer") |

Sub-nodos clave (Desktop):
- Hero: Propuesta de valor `126:5522` · Ilustración `126:5545` · Nota de bienestar `126:5650`
- Búsqueda: Buscador `126:5658` · Criterios `126:5673`
- Formulario de contacto `126:5998` · Hablemos `126:5970`
- Presentación de servicios (botón "Ver todos" oculto) `126:5773`

## 4. UI Kit — referencias

Frame general de componentes: **COMPONENTES** — node `106:1497` (1402 × 8834.6).

| Sección del kit | Node ID | Componente(s) |
|---|---|---|
| 1. Navegación | `106:1554` | Navigation Item `62:100` (variantes: `57:82` Default, `368:6940` Hovered, `62:101` Focused) |
| 2. Botones | `106:1562` | Button set `83:1384` |
| 3. Inputs | `106:1570` | Input set `96:361` (Default `96:346`, Focused `96:352`, Error `96:360`) |
| 4. Select & Dropdown | `106:1590` | Select set `99:738` (Closed `99:734`, Focused `99:735`, Open `99:736`, Disabled `99:737`) |
| 5. Selection controls | `106:1610` | Checkbox `97:343` · Radio `97:358` · Switch `98:485` |
| 6. Badges & Tags | `106:1630` | Badge set `83:814` · Tag set `100:401` |
| 7. Avatars | `106:1658` | Avatar set `101:423` (64 `101:419`, 48 `101:420`, 40 `101:421`, 32 `101:422`) |
| 8. Alerts | `106:1678` | Alert set `102:427` |
| 9. Tabs & Breadcrumb | `106:1698` | Tab/Breadcrumb items |
| 10. Card | `106:1739` | Tarjeta perfil mascota `106:1759` |
| 11. Modal | `106:1792` | Modal confirmación `106:1812` |
| 12. Datatable | `106:1823` | Tabla + filtros |
| 13. Feature Cards | `106:1929` | Article pattern `106:1936+` |
| 14. Search Bar | `106:4292` | Search Bar `73:2911` |
| 15. Nav Bar | `130:785` | NavBar `73:2921` |
| 16. Aside | `106:4183` | Aside `130:977` |
| (oculto) Product patterns | `106:2021` | — |
| Footer del kit | `106:2099` | — |

Variantes del **Button set** (`83:1384`): Type `Default` `83:1383` · `Secondary` `83:1388` · `Terciary` `83:1389` · `Delete` `83:1390` — combinados con State Default/Focused (`83:1486`, `87:1532`, `87:1551`…) / Disabled (`87:1617`…) / Loading (`87:1639`…).

**Descripción oficial del componente Avatar** (desde Figma): *"Avatar sizes: 64, 48, 40, 32. Use Show initials and Show paw icon to choose the content; enable one at a time."*

## 5. Inventario de assets

### 5.1 Ilustración del hero (solo Desktop; SVG único exportado de Figma)

`public/illustrations/hero/scene.svg` — escena completa 570×460 exportada de `126:5545` (nodo de composición `126:5547`): `atmosphere`, `left-plants`, `right-plants`, `bench`, `woman`, `retriever`, `woman-embrace`, `man`, `small-dog`, `cat`, `ground-accents`.

Decisión aprobada: se exporta **un solo SVG** en vez de 11 archivos posicionados individualmente. La escena es puramente decorativa y no se reutiliza fuera del Hero, así que aplanarla elimina el riesgo de descolocación y la dependencia de las posiciones exactas de `get_design_context`. La **Nota de bienestar** (`126:5650`) se excluye del SVG: está implementada como HTML real (texto accesible) en `components/landing/hero/HeroIllustration.tsx`.

El SVG conserva sus atributos raíz `width="570" height="460"` (regla de `AGENTS.md` §4); no se modifica el archivo original.

### 5.2 Iconos SVG (trazo tipo Lucide)

| Grupo | Iconos |
|---|---|
| Marca/confianza | `paw-print` (emblema), `heart`, `shield-check`, `heart-handshake` |
| Búsqueda | `search`, `map-pin`, `calendar-days` |
| Categorías | `stethoscope`, `scissors`, `footprints`, `graduation-cap`, `house-heart`, `arrow-up-right` |
| Beneficios | `shield-check`, `calendar-check`, `clipboard-list`, `messages-square` |
| Servicios | `heart` (favorito), `map-pin` |
| Cómo funciona | `arrow-right` + números de paso (texto) |
| Testimonios | `star` (×5) |
| Contacto | `mail`, `phone`, `clock-3`, `chevron-down` |
| Footer | `paw-print`, `instagram`, `facebook`, `linkedin` |
| Botones (kit) | `plus` (icono opcional 20px) |
| Avatar (kit) | `paw icon` (variante showPawIcon) |

### 5.3 Imágenes raster

| Imagen | Contexto | Formato |
|---|---|---|
| 3 fotos de servicios | Tarjetas de "Servicios destacados" (384×230 desktop, object-cover) | PNG |
| 1 foto "Propietaria con su mascota" | Sobre Nosotros (544×412 desktop) | PNG (rounded-rectangle) |
| 3 avatares de testimonios | En el diseño se resuelven con **iniciales** (Avatar 48, fondo `#e7f3f2`) — no hay fotos de avatar | — |

## 6. Flujo de verificación (Figma MCP)

1. `create_session` con fileKey `GyodZakXoH4EMdXC7wBFsD` (una sesión por tarea; reutilizar el `sessionId` en todas las llamadas).
2. `get_design_context` del nodo de la sección (param `skillNames: "resource:figma-design-to-code"`, `clientFrameworks: "react,next.js"`). El código devuelto es **referencia a adaptar**, no código final: convertir al stack del proyecto y a los tokens de `docs/design-system.md`.
3. `get_screenshot` del nodo para comparación visual (o captura incluida en `get_design_context`).
4. `download_assets` para exportar SVGs/imágenes del nodo → guardar según tipo: `components/icons/` (iconos, como componentes React), `public/images/` (fotografías raster), `public/illustrations/hero/` (SVGs de la ilustración del Hero). Las URLs temporales de assets **caducan** (7 días) — nunca dejarlas en el código.
5. Comparar el render local (1440/768/390) contra la captura y corregir diferencias.

⚠️ **Límite de uso**: el plan Starter de Figma MCP tiene límite de llamadas por período. Priorizar: `get_design_context` de secciones pendientes (ver §7) → `download_assets` → `get_screenshot` solo si es necesario.

## 7. Pendiente de verificar en Figma (extracción con `get_design_context` pendiente)

Especificación visual completa ya obtenida para: Navegación (Desktop y Mobile), Bienvenida, Búsqueda rápida, Categorías, Servicios destacados, Testimonios, card del Formulario de contacto y Footer (todos Desktop).

Queda pendiente extraer el design context de estos nodos (la estructura y dimensiones **sí** están documentadas — ver `docs/landing-page.md` y `docs/responsive.md` — pero faltan valores finos de color/relleno de algunos sub-elementos):

| Nodo | Sección | Qué falta |
|---|---|---|
| `126:5747` | Razones para elegir PetCare | Estilo del chip de icono de beneficios (se asume patrón `#e6f0ed`/52px como categorías) |
| `126:5650` | Hero — Nota de bienestar | Color exacto del heart (se asume `--color-accent`). Posición decidida: centrada horizontalmente y alineada al borde inferior del área 570×490 |
| `126:5657` | Búsqueda rápida | Color de los iconos de campo (se asume `--color-primary-600`), padding-x de los Tag (se asume 12) y espaciado vertical de la sección (se asume 0 arriba / 52–56 abajo, continuando el ritmo del Hero). Chips en Tablet: se permite wrap (la altura documentada de 235px implica una sola fila) |
| `126:5853` | Sobre Nosotros | Estilo del chip "Mensaje de comunidad" sobre la foto y etiqueta del botón de misión (alto 44px ya confirmado) |
| `126:5870` | Cómo Funciona | Estilo del círculo numerado de pasos y color de `arrow-right` |
| `126:5969` | Contacto (marco de sección) | Fondo de la sección completa (la card del formulario `126:5998` sí está verificada: `#f4f7f6`) |
| `126:5970` | Hablemos (Contacto) | Estilo del símbolo 44px de medios de contacto y nota |
| `126:5998` / `99:736` | Select "Asunto" | Opciones del dropdown (solo se verificó el estado Closed del kit) |
| Tablet/Mobile | Todas | `get_design_context` de frames `355:4410` y `389:6086` (se dispone de metadatos estructurales completos; extraer valores finos al implementar cada variante) |

Los textos/copy de esas 4 secciones también se obtendrán de esos nodos (los metadatos no incluyen contenido de texto).
