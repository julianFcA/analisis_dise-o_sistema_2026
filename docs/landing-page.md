# Landing Page — Estructura y contenido de las 11 secciones

> Orden de composición en `app/page.tsx` (idéntico al de Figma). Copy textual tomado de `get_design_context` (fidelidad literal). Node IDs: D=Desktop, T=Tablet, M=Mobile (ver `docs/figma-reference.md`).
> Los textos marcados ⏳ están pendientes de extraer de Figma (limitación de llamadas MCP del plan Starter).

---

## 1. Navbar — `components/landing/Navbar.tsx`

**Nodos**: D `126:5501` · T `355:4411` · M `389:6087`

**Estructura**: barra blanca de 96px de alto, `justify-between`.
- **Identidad PetCare**: Emblema 38×38 (fondo `#0b625e`, radio 12, `paw-print` 23px) + "PetCare" (DM Sans ExtraBold 27, `#084c49`, tracking −1).
- **Enlaces** (gap 32): Inicio (activo: Bold 15 `#0b625e` + indicador `#f28c45` 19×3 radio 2), Servicios, Nosotros, Contacto (Medium 15 `#647873`).
- **Acceso** (gap 24): Button Terciary "Iniciar Sesión" + Button Default "Registrarse".
- **Mobile**: solo la identidad (links y acceso `hidden`).

**Interacción**: links con estados hover/focus (variantes del Navigation Item); indicador activo solo en "Inicio". Links → anclas a las secciones (`#servicios`, `#nosotros`, `#contacto`).

---

## 2. HeroSection — `components/landing/HeroSection.tsx`

**Nodos**: D `126:5521` · T `355:4430` · M `389:6106` — fondo `#f4f7f6`, padding-y 52/56, gap 40 (desktop)

**Propuesta de valor** (`126:5522`, ancho 590 D):
- Antetítulo (heart 17px + "SU BIENESTAR, TU TRANQUILIDAD" — Bold 12, tracking 1.3, `#0b625e`)
- H1: **"Encuentra el mejor cuidado para tu mascota en un solo lugar"** (Bold 56/1.08, tracking −2.1, `#084c49`)
- Descripción: **"Desde una consulta hasta un paseo feliz. Conecta con personas que cuidan de tu mascota tanto como tú."** (Regular 18/1.55, `#647873`, ancho 530)
- CTAs (gap 12): Button Secondary "Conoce más" + Button Default "Buscar Servicios"
- Señales de confianza (gap 20): shield-check 17 + "Proveedores verificados" · heart-handshake 17 + "Cuidado con cariño" (Regular 13, `#647873`)

**Vínculo con las mascotas** (`126:5545`, 570×490, solo Desktop): escena SVG 570×460 (`public/illustrations/hero/scene.svg`, export único con `atmosphere`, `left/right-plants`, `bench`, `woman`, `retriever`, `woman-embrace`, `man`, `small-dog`, `cat`, `ground-accents`) + **Nota de bienestar** (`126:5650`, card blanca flotante p-16, radio 16, `--shadow-float`): símbolo 40 (`#fff3e8`, heart 22) + "Más que mascotas, familia." (Bold 14) + "El cuidado que se merecen, cerca de ti." (Regular 12).

**Interacción**: CTAs → "Buscar Servicios" enfoca la sección de búsqueda; "Conoce más" → ancla a "Sobre Nosotros".

---

## 3. QuickSearchSection — `components/landing/QuickSearchSection.tsx`

**Nodos**: D `126:5657` · T `355:4562` · M `389:6238` — fondo `#f4f7f6`, panel blanco p-24 radio 24 `--shadow-float`

- **Categorías rápidas** (gap 28): Tag selected **"Todos los servicios"** + Tags default **"Veterinaria", "Peluquería", "Paseo", "Entrenamiento", "Cuidado Temporal"** (14px; selected → `#e6f0ed`/Bold `#0b625e`).
- **Divisor** 1px `#dce7e3`.
- **Criterios de búsqueda** (gap 24, `flex-1`): 3 campos (icono 22 + etiqueta Bold 13 `#173d39` + valor Regular 14 `#647873`):
  1. `search` — "¿Qué necesita tu mascota?" / "Selecciona un servicio"
  2. `map-pin` — "¿Dónde?" / "Ciudad o zona"
  3. `calendar-days` — "¿Cuándo?" / "Elige una fecha"
  + Button Default "Buscar".
- Mobile: chips con scroll horizontal; campos apilados; botón 200px centrado (ver `docs/responsive.md` §3).

**Interacción**: selección única de categoría (Tag selected); los 3 criterios como controles de formulario editables (input texto, input ubicación, input fecha); "Buscar" valida que haya servicio seleccionado.

---

## 4. CategoriesSection — `components/landing/CategoriesSection.tsx`

**Nodos**: D `126:5696` · T `355:4598` · M `389:6274` — py 64/72, gap 32

**Encabezado** (SectionHeading): "PARA CADA NECESIDAD" / **"Todo su cuidado, conectado"** / "Encuentra el servicio ideal para cada etapa de su vida."

**Catálogo** (5 tarjetas, gap 16): blanca, borde `#dce7e3`, radio 16, p-24, `--shadow-card`; chip icono 52 (`#e6f0ed`, radio 16, icono 26) + nombre (Bold 17 `#084c49`) + descripción (Regular 13 `#647873`) + `arrow-up-right` 18.

| Icono | Nombre | Descripción |
|---|---|---|
| `stethoscope` | Veterinaria | Salud en buenas manos |
| `scissors` | Peluquería | Para verse y sentirse bien |
| `footprints` | Paseo | Aventuras al aire libre |
| `graduation-cap` | Entrenamiento | Aprender juntos, sin prisa |
| `house-heart` | Cuidado Temporal | Un hogar cuando no estás |

**Interacción**: tarjeta clicable (hover con estados del kit) → filtraría la búsqueda por esa categoría (frontend: selecciona el Tag correspondiente en QuickSearch).

---

## 5. ReasonsSection — `components/landing/ReasonsSection.tsx`

**Nodos**: D `126:5747` · T `355:4649` · M `389:6325` — encabezado centrado (sin descripción), 4 beneficios

**Estructura del beneficio** (D: 270px): icono 30 centrado + título (23px alto D) + descripción (44px alto D).
- Iconos: `shield-check`, `calendar-check`, `clipboard-list`, `messages-square`.
- Títulos/descripciones: ⏳ pendientes de extraer del nodo `126:5747` (dimensiones conocidas: D título 270×23, desc 270×44; M 342×23/44).
- Estilo asumido según patrones del kit: título Bold `#084c49`, descripción Regular `#647873` — **verificar al extraer**.

**Interacción**: sección estática (sin interacción).

---

## 6. ServicesSection — `components/landing/ServicesSection.tsx`

**Nodos**: D `126:5772` · T `355:4674` · M `389:6350` — py 80, gap 32

**Encabezado**: "UN BUEN COMIENZO" / **"Servicios destacados"** / "Descubre opciones de cuidado cerca de ti y elige la mejor para tu compañero." (botón "Ver todos" oculto en el diseño — no renderizar).

**Tarjetas de servicio** (3, gap 24): blanca, borde `#dce7e3`, radio 24, `--shadow-card`; foto 230px object-cover + Badge categoría (píldora blanca píldora px12 py7, Bold 12 `#0b625e`, top-left 16) + botón favorito (círculo blanco 34, `heart` 18, top-right 16); cuerpo p-24: nombre (Bold 21, tracking −0.5, `#084c49`), proveedor (Regular 14 `#173d39`), ubicación (`map-pin` 14 + Regular 13 `#647873`), divisor, precio (Bold 24 `#084c49` + unidad Regular 12 `#647873`) + Button Secondary "Ver Detalle".

| Categoría | Nombre | Proveedor | Ubicación | Precio | Unidad | Foto |
|---|---|---|---|---|---|---|
| Veterinaria | Consulta de bienestar | Clínica Huellas | Colombia | 60.000 | / consulta | img 1 |
| Peluquería | Baño y corte con cariño | Mimo Peluquería Canina | Colombia | 80.000 | / sesión | img 2 |
| Paseo | Un paseo a su ritmo | Lucía · Paseadora | Colombia | 15.000 | / 60 min | img 3 |

**Nota de ejemplo**: "Servicios, proveedores y precios de ejemplo. El importe final se confirma en el detalle del servicio." (Regular 12 `#647873`).

**Interacción**: botón favorito con toggle (estado activo → corazón relleno, color a definir según kit); "Ver Detalle" hover/focus.

---

## 7. AboutSection — `components/landing/AboutSection.tsx`

**Nodos**: D `126:5853` · T `355:4749` · M `389:6425`

**Cuidado compartido** (imagen D 544×412, T/M 720×412 / 342): foto "Propietaria con su mascota" (rounded-rectangle) + **Mensaje de comunidad** (chip flotante bottom-left 24: `paw-print` 20 + frase Regular 18 — texto ⏳ pendiente de `126:5853`).

**Nuestra misión** (D 584px):
- Encabezado: antetítulo (131px ancho, texto ⏳) + título 2 líneas (84px alto, texto ⏳)
- Misión (81px alto D, texto ⏳) + Propósito (54px alto D, texto ⏳)
- Button Default 184.6×44 (label ⏳ — alto 44px, distinto del estándar 40)

**Interacción**: botón → ancla/CTA (frontend). Textos y estilos finos del chip: **extraer de `126:5853` antes de implementar**.

---

## 8. HowItWorksSection — `components/landing/HowItWorksSection.tsx`

**Nodos**: D `126:5870` · T `355:4763` · M `389:6439`

**Encabezado** (centrado): antetítulo + título + descripción (textos ⏳ de `126:5870`).

**Pasos** (4; D 276px en fila, M apilados 342):
- **Secuencia**: círculo "Número del paso" 48×48 (números "1"–"4"; estilo del círculo ⏳ — presumiblemente chip `#e6f0ed` o primario) + `arrow-right` 22px a la derecha (solo pasos 1–3).
- **Acción** (Bold, D 26px alto) + **Instrucción** (Regular, D 48px alto). Textos ⏳.

**Interacción**: sección estática.

---

## 9. TestimonialsSection — `components/landing/TestimonialsSection.tsx`

**Nodos**: D `126:5906` · T `355:4799` · M `389:6475` — fondo `#f4f7f6`, encabezado centrado, nota centrada

**Encabezado**: "HISTORIAS DE NUESTRA COMUNIDAD" / **"Tranquilidad que se comparte"** (centrado).

**Tarjetas** (3, gap 24): blanca, p-28, radio 24, `--shadow-card`, gap 24: 5 × `star` 15px · experiencia (Regular 16/1.65 `#173d39`, min-h 128 D) · familia: Avatar 48 (iniciales) + nombre (Bold 15 `#084c49`) + servicio (Regular 12 `#647873`).

| Iniciales | Nombre | Servicio | Experiencia |
|---|---|---|---|
| AC | Ana y Coco | Cuidado Temporal | "Me daba nervios dejar a Coco por primera vez. Poder conocer a su cuidadora antes me dio mucha tranquilidad. ¡Volvió feliz!" |
| ML | Marcos y Luna | Paseo | "Encontré a alguien que entiende la energía de Luna. Ahora sus paseos tienen un lugar fijo en nuestra rutina y ella lo disfruta muchísimo." |
| EM | Elena y Milo | Veterinaria | "Tener las solicitudes y el historial de Milo juntos me ayuda a organizarme. Encontré una consulta cerca de casa sin complicaciones." |

(Las comillas tipográficas "" forman parte del copy.)

**Nota**: "Testimonios ilustrativos de la experiencia PetCare." (Regular 12 `#647873`, centrado).

---

## 10. ContactSection — `components/landing/ContactSection.tsx`

**Nodos**: D `126:5969` (Hablemos `126:5970` + Formulario `126:5998`) · T `355:4859` · M `389:6535` — fondo de la sección ⏳ pendiente de verificar en Figma (`126:5969`)

**Hablemos** (D 440px):
- Encabezado: antetítulo + título (84px alto) + descripción (52px) — textos ⏳ de `126:5970`.
- **Datos de contacto** (3 medios, gap vertical 68→44px): símbolo 44 (icono 20) + título Bold 13 + detalle Regular 20 → `mail` / `phone` / `clock-3` (textos ⏳ — en footer figuran "hola@petcare.example", "+34 900 000 000", "Lun–Vie · 9:00 a 18:00" como referencia).
- Nota (Regular 12/16px `#647873`, texto ⏳).
- Estilo del símbolo 44: **verificar en `126:5970`** (presumiblemente chip `#e6f0ed`).

**Formulario de contacto** (D 672px; card `#f4f7f6` p-32, radio 24, gap 20):
- Título: **"Envíanos un mensaje"** (Bold 22 `#084c49`)
- **Datos personales** (2 col, gap 16): "Nombre *" (placeholder "Tu nombre") · "Correo electrónico *" (placeholder "tu@correo.com")
- **Asunto**: "¿En qué podemos ayudarte? *" — Select (placeholder "Selecciona un tema" + `chevron-down` 16). Opciones del dropdown: ⏳ (usar las categorías/temas del diseño al extraer `126:5998`/`99:736`).
- **Mensaje**: "Mensaje *" — textarea 112px (placeholder "Cuéntanos un poco más…")
- **Consentimiento**: Checkbox 17×17 (borde `#dce7e3`, radio 4) + "He leído y acepto la política de privacidad." (Regular 12/1.5 `#647873`)
- Button Default **"Enviar mensaje"**

**Interacción (validación en cliente)**: nombre requerido; correo con formato válido; asunto requerido (select con dropdown); mensaje requerido; checkbox obligatorio. Estados Input `Error` con mensaje; botón `Loading` al "enviar" (simulado, sin backend) y mensaje de éxito (Alert Success del kit como patrón).

---

## 11. FooterSection — `components/landing/FooterSection.tsx`

**Nodos**: D `126:6026` · T `355:4913` · M `389:6589` — fondo `#084c49`, pt 64, pb 28

**Acerca de PetCare** (D 300px): Emblema 38 (fondo `rgba(255,255,255,0.09)`, `paw-print` blanco) + "PetCare" (ExtraBold 27 blanco) + propósito: **"Cuidamos lo que más quieres, conectándote con el cuidado que tu mascota merece."** (Regular 14/1.7 `#c5dcd6`) + redes (3 chips 36, borde `rgba(255,255,255,0.19)`: `instagram`, `facebook`, `linkedin` 17px).

**Grupos de enlaces** (Regular 14 `#c5dcd6`; título Bold 15 blanco):
1. **Explora PetCare**: Inicio · Servicios · Nosotros · Contacto
2. **Nuestros servicios**: Veterinaria · Peluquería · Paseo · Entrenamiento · Cuidado Temporal
3. **¿Hablamos?**: hola@petcare.example · +34 900 000 000 · Lun–Vie · 9:00 a 18:00 · Centro de ayuda

**Legal**: divisor `rgba(255,255,255,0.13)` + "© 2026 PetCare. Todos los derechos reservados." (izq) + Privacidad · Términos y condiciones · Cookies (der) — Regular 12 `#c5dcd6`.

**Interacción**: links hover (aclarar a blanco); enlaces legales y de grupo → hrefs placeholder (`#`).
