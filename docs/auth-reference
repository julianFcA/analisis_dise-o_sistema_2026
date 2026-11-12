# Auth Reference — PetCare

**Documento:** Especificación visual y funcional de autenticación  
**Proyecto:** PetCare  
**Pantallas:** Login y Register  
**Estado:** Documentación funcional definida; medidas visuales pendientes de verificar.

## Breakpoints de referencia

- Desktop: 1440 px
- Tablet: 768 px
- Mobile: 390 px

---

# 1. Objetivo

Documentar las pantallas de autenticación de PetCare para permitir su implementación en Next.js sin depender de Figma MCP.

Las pantallas deben mantener la identidad visual del proyecto, reutilizar el Design System existente y garantizar una experiencia responsive.

La implementación debe respetar los diseños de Figma y evitar introducir elementos visuales o funcionalidades que no estén contemplados en las referencias.

# 2. Design System y reutilización

Antes de implementar cualquier pantalla, consultar:

- `docs/design-system.md`
- `docs/figma-reference.md`
- `app/globals.css`
- `components/ui/`

## 2.1. Lineamientos generales

- Tipografía: DM Sans.
- Mantener la paleta de colores de PetCare.
- Utilizar los tokens existentes de color, tipografía, espaciado y bordes.
- Mantener la identidad visual del landing.
- Reutilizar componentes existentes siempre que sea posible.
- Evitar duplicar componentes equivalentes.
- No introducir dependencias adicionales sin justificación.

## 2.2. Componentes reutilizables

Identificar y reutilizar según corresponda:

- Button
- Input
- Checkbox
- Componentes de iconografía existentes.

Los componentes deben conservar sus variantes, propiedades y estados definidos en el UI Kit.

---

# 3. Rutas de autenticación

Las pantallas de autenticación deben implementarse como rutas independientes utilizando Next.js App Router.

| Pantalla | Ruta |
|---|---|
| Login | `/login` |
| Register | `/register` |

## 3.1. Requisitos de navegación

- Login debe estar disponible en `/login`.
- Register debe estar disponible en `/register`.
- Cada pantalla debe tener su propio archivo `page.tsx`.
- Ambas páginas deben reutilizar los componentes compartidos de `components/auth/`.
- No implementar ambas pantallas dentro de un único componente utilizando estados condicionales.
- El botón `Crear Cuenta` de Login debe navegar a `/register`.
- El botón `Iniciar sesión` de Register debe navegar a `/login`.
- El Navbar debe mantener sus enlaces de navegación a Inicio y Servicios.
- Las rutas deben quedar preparadas para una futura integración de autenticación.

## 3.2. Estructura de rutas esperada

```text
app/
├── login/
│   └── page.tsx
│
└── register/
    └── page.tsx
```

Las páginas deben limitarse a importar y componer los componentes correspondientes.

No concentrar la implementación completa de los formularios dentro de `page.tsx`.

---

# 4. Estructura compartida de autenticación

Login y Register comparten la misma estructura visual general.

## 4.1. Desktop

**Viewport de referencia:** 1440 px de ancho.

La estructura general está compuesta por:

1. Navbar superior.
2. Contenedor principal de dos columnas.
3. Bloque Social Proof debajo del contenedor principal.

### 4.1.1. Navbar

**Distribución:**

- Logo de PetCare alineado a la izquierda.
- Links de navegación alineados a la derecha.

**Navegación:**

- Inicio
- Servicios

**Consideraciones:**

- Mantener la identidad visual del Navbar del landing.
- Reutilizar estilos y componentes existentes cuando sea posible.
- No incorporar elementos de navegación adicionales que no estén contemplados en el diseño.

### 4.1.2. Contenedor principal

El contenido principal está dividido en dos columnas:

- Columna izquierda: Presentation Panel.
- Columna derecha: Auth Card.

Ambas columnas deben mantener la misma distribución y proporciones en Login y Register, de acuerdo con las referencias de Figma.

## 4.2. Comportamiento responsive compartido

### Tablet

**Viewport de referencia:** 768 px.

- Ocultar completamente la columna izquierda (Presentation Panel).
- Mantener únicamente la card de autenticación.
- Conservar el orden y la estructura interna del formulario.
- Adaptar el ancho de la card al espacio disponible.
- Mantener una presentación centrada.
- Evitar desbordamientos horizontales.

### Mobile

**Viewport de referencia:** 390 px.

- Ocultar completamente la columna izquierda (Presentation Panel).
- Mantener únicamente la card de autenticación.
- Conservar el orden de todos los elementos del formulario.
- Adaptar la card al ancho disponible.
- Respetar el padding lateral de la página.
- Mantener inputs y botones dentro del ancho disponible.
- Evitar desbordamientos horizontales.

La visibilidad de Social Proof en Tablet y Mobile queda pendiente de confirmar con Figma.

---

# 5. Login

## 5.1. Columna izquierda — Presentation Panel

### Estilo visual

- Fondo verde muted.
- Bordes redondeados.
- Contenido organizado verticalmente.
- Elementos principales centrados.
- Mantener la identidad visual de PetCare.

### Contenido

**Eyebrow:**

`SU BIENESTAR NOS CONECTA`

**Título:**

`Bienvenido a PetCare`

**Descripción:**

`Encuentra los mejores servicios para tu mascota en un solo lugar.`

### Ilustración

**Ruta del recurso:**

`/illustrations/auth/auth.svg`

**Consideraciones:**

- Ilustración centrada dentro del panel.
- Mantener proporciones originales.
- Evitar deformaciones o recortes no contemplados.
- Utilizar el recurso local.

### Beneficios

Se presentan tres elementos en una misma fila horizontal:

1. Cuidado
2. Salud
3. Bienestar

**Composición:**

- Icono Check a la izquierda.
- Texto correspondiente a la derecha.
- Color verde principal.
- Alineación horizontal.

**Distribución:**

- Los tres beneficios deben estar organizados horizontalmente.
- Mantener una separación uniforme.
- No organizarlos verticalmente.

## 5.2. Columna derecha — Login Card

### Estilo visual

- Card con bordes redondeados.
- Borde sutil.
- Sombra suave.
- Contenido organizado verticalmente.

### Encabezado

**Título:**

`Iniciar sesión`

**Descripción:**

`Qué bueno tenerte de vuelta. Tu mascota te espera.`

### Formulario

#### Campo 1 — Email

- Label correspondiente.
- Input de correo electrónico.
- Icono de correo dentro del campo, alineado a la izquierda.
- Reutilizar el componente Input existente.

#### Campo 2 — Password

- Label correspondiente.
- Input de contraseña.
- Icono de candado a la izquierda.
- Control de visibilidad de contraseña a la derecha.
- Permitir alternar entre contraseña visible y oculta.

### Fila de opciones

Contiene dos elementos:

**Izquierda:**
- Checkbox `Recordarme`.

**Derecha:**
- Link `¿Olvidaste tu contraseña?`.

**Distribución:**

- Horizontal.
- Alineación vertical centrada.
- Separación mediante `justify-between`.

### Botón principal

- Componente Button existente.
- Variante Primary.
- Ancho completo.
- Texto: `Ingresar`.

### Separador

**Ubicación:**

Después del botón Primary `Ingresar` y antes del botón Secondary `Crear Cuenta`.

**Composición:**

- Línea horizontal a la izquierda.
- Texto centrado.
- Línea horizontal a la derecha.

**Texto:**

`¿Es tu primera vez aquí?`

**Consideraciones visuales:**

- Las líneas deben ocupar el espacio disponible.
- El texto debe conservar su ancho natural.
- Distribución horizontal mediante Flexbox.
- Mantener separación uniforme entre líneas y texto.
- Líneas con el color de borde sutil del Design System.
- Texto con estilo tipográfico secundario.

Este separador es un elemento visual, no un botón ni un enlace.

### Botón secundario

- Componente Button existente.
- Variante Secondary.
- Ancho completo.
- Texto: `Crear Cuenta`.

**Navegación:**

Al hacer clic, debe dirigir a `/register`.

### Texto de confianza

`Tus datos seguros, tu mascota en buenas manos.`

- Texto centrado.
- Estilo tipográfico secundario.
- Separación visual respecto al botón anterior.

---

# 6. Register

Register comparte la misma estructura general de Login.

No se debe crear un layout visual completamente diferente. Se deben reutilizar los mismos patrones, estilos y componentes, adaptando únicamente el contenido y los elementos del formulario.

## 6.1. Columna izquierda — Presentation Panel

### Estilo visual

Mantiene el mismo diseño de Login:

- Fondo verde muted.
- Bordes redondeados.
- Contenido organizado verticalmente.
- Elementos principales centrados.

### Contenido

**Eyebrow:**

`SU BIENESTAR NOS CONECTA`

**Título:**

`Únete a PetCare`

**Descripción:**

`Conecta con servicios de confianza y dale a tu mascota el cuidado que merece.`

### Ilustración

**Ruta del recurso:**

`/illustrations/auth/auth.svg`

- Reutilizar la misma ilustración de Login.
- Mantener proporciones originales.
- Centrar dentro del panel.

### Beneficios

Mantener los mismos tres elementos de Login:

1. Cuidado
2. Salud
3. Bienestar

**Composición:**

- Icono Check a la izquierda.
- Texto a la derecha.
- Color verde principal.
- Los tres beneficios organizados horizontalmente.

## 6.2. Columna derecha — Register Card

### Estilo visual

Mantiene el mismo patrón visual de Login Card:

- Bordes redondeados.
- Borde sutil.
- Sombra suave.
- Contenido organizado verticalmente.
- Mismos criterios de espaciado y alineación.

### Encabezado

**Título:**

`Crear Cuenta`

**Descripción:**

`Empieza a cuidar de quien más quieres.`

### Formulario

El formulario contiene cuatro campos, organizados en el siguiente orden:

#### Campo 1 — Nombre Completo

- Label: `Nombre Completo`.
- Input para introducir el nombre completo.

#### Campo 2 — Email

- Label correspondiente.
- Input de correo electrónico.
- Icono de correo dentro del campo, alineado a la izquierda.

#### Campo 3 — Contraseña

- Label: `Contraseña`.
- Input de contraseña.
- Icono de candado a la izquierda.
- Control de visibilidad de contraseña a la derecha.

#### Campo 4 — Confirmar contraseña

- Label: `Confirmar contraseña`.
- Input de contraseña.
- Mantener el patrón visual del campo Password.
- Icono de candado a la izquierda.
- Control de visibilidad a la derecha.

### Checkbox de aceptación

Después de los campos del formulario se presenta un checkbox con el siguiente texto:

`Acepto los Términos y Condiciones y la Política de Privacidad.`

**Consideraciones:**

- Utilizar el componente Checkbox existente.
- Mantener el texto asociado al checkbox.
- `Términos y Condiciones` y `Política de Privacidad` deben conservar su presentación como enlaces si así aparece en Figma.
- Permitir seleccionar y deseleccionar el checkbox.

### Botón principal

- Componente Button existente.
- Variante Primary.
- Ancho completo.
- Texto: `Crear cuenta`.

### Separador

**Ubicación:**

Después del botón Primary `Crear cuenta` y antes del botón Secondary `Iniciar sesión`.

**Composición:**

- Línea horizontal a la izquierda.
- Texto centrado.
- Línea horizontal a la derecha.

**Texto:**

`¿Ya tienes una cuenta?`

**Consideraciones visuales:**

- Las líneas deben ocupar el espacio disponible.
- El texto debe conservar su ancho natural.
- Distribución horizontal mediante Flexbox.
- Mantener separación uniforme entre líneas y texto.
- Líneas con el color de borde sutil del Design System.
- Texto con estilo tipográfico secundario.

Este separador es un elemento visual, no un botón ni un enlace.

### Botón secundario

- Componente Button existente.
- Variante Secondary.
- Ancho completo.
- Texto: `Iniciar sesión`.

**Navegación:**

Al hacer clic, debe dirigir a `/login`.

## 6.3. Social Proof

Register conserva el mismo bloque Social Proof de Login.

### Ubicación

Debajo del contenedor completo de las dos columnas.

No forma parte de Register Card.

### Composición

**Icono:**

- Icono de usuarios.
- Color verde principal.
- Ubicado dentro de un contenedor circular.

**Contenedor del icono:**

- Forma circular.
- Fondo verde muted.
- Icono centrado.

**Texto:**

`Más de 1.000 propietarios conectados con proveedores de confianza.`

### Distribución

- Elementos organizados verticalmente.
- Icono en la parte superior.
- Texto debajo del icono.
- Contenido centrado.

## 6.4. Responsive — Register

### Tablet

- Ocultar completamente Presentation Panel.
- Mostrar únicamente Register Card.
- Mantener los cuatro campos.
- Conservar el checkbox de aceptación.
- Mantener ambos botones y el separador.
- Adaptar el ancho de la card al espacio disponible.
- Evitar desbordamientos horizontales.

### Mobile

- Ocultar completamente Presentation Panel.
- Mostrar únicamente Register Card.
- Conservar el orden de los cuatro campos.
- Mantener el checkbox de aceptación.
- Permitir que el texto del checkbox ocupe varias líneas si es necesario.
- Mantener botones a ancho completo.
- Adaptar la card al espacio disponible.
- Respetar el padding lateral de la página.

---

# 7. Assets e iconografía

## 7.1. Ilustraciones

Recurso disponible:

`public/illustrations/auth/auth.svg`

Se utiliza en el Presentation Panel de ambas pantallas.

## 7.2. Iconografía

Reutilizar los iconos disponibles en el proyecto.

Iconos requeridos:

- Check.
- Mail.
- Lock.
- Eye.
- Users.

No incorporar bibliotecas adicionales de iconos sin justificación.

---

# 8. Estructura de componentes propuesta

La implementación debe mantener una arquitectura organizada y reutilizable.

Estructura sugerida:

```text
components/
├── ui/
│   ├── Button/
│   ├── Input/
│   └── Checkbox/
│
└── auth/
    ├── AuthNavbar/
    │   └── AuthNavbar.tsx
    │
    ├── AuthLayout/
    │   └── AuthLayout.tsx
    │
    ├── AuthBrandPanel/
    │   └── AuthBrandPanel.tsx
    │
    ├── LoginForm/
    │   └── LoginForm.tsx
    │
    ├── RegisterForm/
    │   └── RegisterForm.tsx
    │
    ├── AuthDivider/
    │   └── AuthDivider.tsx
    │
    └── SocialProof/
        └── SocialProof.tsx
```

La estructura es una propuesta inicial y puede ajustarse durante el análisis de implementación.

### Responsabilidades sugeridas

- `AuthNavbar`: navegación superior de autenticación.
- `AuthLayout`: estructura compartida de las pantallas.
- `AuthBrandPanel`: panel de presentación reutilizable con contenido configurable.
- `LoginForm`: formulario de inicio de sesión.
- `RegisterForm`: formulario de registro.
- `AuthDivider`: separador reutilizable con texto configurable.
- `SocialProof`: bloque inferior compartido.

Las páginas deben limitarse a componer los componentes necesarios.

### Regla obligatoria de organización

Cada componente debe tener su propia carpeta y su archivo `.tsx` dentro de ella.

No crear archivos de componentes directamente en la raíz de `components/auth/`.

No duplicar estructuras que puedan resolverse mediante componentes compartidos y propiedades.

---

# 9. Funcionalidad y alcance

La implementación debe contemplar únicamente las interacciones visuales y locales definidas para las pantallas.

## 9.1. Login

- Introducción de correo electrónico.
- Introducción de contraseña.
- Alternar visibilidad de contraseña.
- Seleccionar y deseleccionar Recordarme.
- Navegación mediante el enlace de recuperación de contraseña.
- Navegación hacia Register mediante Crear Cuenta.

## 9.2. Register

- Introducción del nombre completo.
- Introducción del correo electrónico.
- Introducción de contraseña.
- Confirmación de contraseña.
- Alternar visibilidad de los campos de contraseña.
- Seleccionar y deseleccionar el checkbox de aceptación.
- Navegación hacia Login mediante Iniciar sesión.

## 9.3. Consideraciones generales

- No implementar backend.
- No conectar servicios de autenticación.
- No almacenar información de usuarios.
- No inventar flujos de recuperación de contraseña.
- Mantener las acciones de navegación preparadas para su integración posterior.
- Los enlaces de términos y privacidad deben quedar preparados para recibir sus respectivas rutas cuando estén definidas.
- Las validaciones locales, si se implementan, deben limitarse a los requisitos visuales y funcionales básicos del formulario.

---

# 10. Pendientes de verificar en Figma

Los siguientes datos deben confirmarse mediante las referencias visuales antes de la implementación definitiva.

## 10.1. Login Desktop

- Altura del Navbar.
- Ancho y proporción de las dos columnas.
- Separación entre columnas.
- Padding interno del Presentation Panel.
- Dimensiones de la ilustración.
- Espaciado entre eyebrow, título y descripción.
- Tamaños tipográficos.
- Separación entre los tres beneficios.
- Ancho y padding de Login Card.
- Radio exacto de los bordes.
- Características de la sombra.
- Altura de inputs y botones.
- Espaciado entre elementos del formulario.
- Estilo exacto del separador.
- Separación entre las dos columnas y Social Proof.

## 10.2. Register Desktop

- Altura de la card en relación con Login.
- Espaciado entre los cuatro campos.
- Altura y distribución del checkbox.
- Tratamiento visual de los enlaces de términos y privacidad.
- Separación entre checkbox y botón principal.
- Espaciado entre separador y botón secundario.
- Posible ajuste de la distribución vertical de las dos columnas.

## 10.3. Tablet y Mobile

- Padding lateral de la página.
- Ancho máximo de las cards.
- Posición vertical de los formularios.
- Espaciados adaptados.
- Comportamiento del Navbar.
- Visibilidad de Social Proof.
- Comportamiento del texto del checkbox en Mobile.

## 10.4. Contenido

- Confirmar los textos exactos.
- Verificar los estados visuales de los campos.
- Confirmar los estilos de los enlaces.
- Confirmar las rutas de navegación.
- Confirmar las rutas de términos y privacidad cuando estén definidas.

No inventar valores para los elementos pendientes. Utilizar los valores existentes del Design System únicamente cuando correspondan.

---

# 11. Criterios de aceptación

## 11.1. Login

- [ ] La ruta `/login` funciona correctamente.
- [ ] El Navbar coincide con la referencia.
- [ ] El Presentation Panel tiene la composición correcta.
- [ ] La ilustración local se visualiza correctamente.
- [ ] Los tres beneficios están organizados horizontalmente.
- [ ] La Login Card mantiene el estilo visual definido.
- [ ] Los campos utilizan los componentes existentes.
- [ ] Los iconos están correctamente posicionados.
- [ ] El control de visibilidad de contraseña funciona.
- [ ] La fila Recordarme / Olvidaste tu contraseña está alineada correctamente.
- [ ] El botón Ingresar ocupa todo el ancho.
- [ ] El separador tiene dos líneas y el texto centrado.
- [ ] El botón Crear Cuenta utiliza la variante Secondary.
- [ ] Crear Cuenta navega a `/register`.
- [ ] El texto de confianza está correctamente ubicado.
- [ ] Social Proof está debajo de las dos columnas.
- [ ] Tablet oculta el Presentation Panel.
- [ ] Mobile oculta el Presentation Panel.
- [ ] No existen desbordamientos horizontales.

## 11.2. Register

- [ ] La ruta `/register` funciona correctamente.
- [ ] El Navbar mantiene la misma estructura de Login.
- [ ] El Presentation Panel mantiene el mismo estilo visual.
- [ ] Los textos del encabezado corresponden a Register.
- [ ] La ilustración local se visualiza correctamente.
- [ ] Los tres beneficios están organizados horizontalmente.
- [ ] La Register Card mantiene el estilo visual de Login Card.
- [ ] Los cuatro campos aparecen en el orden especificado.
- [ ] Los campos de contraseña tienen control de visibilidad.
- [ ] El checkbox de aceptación está correctamente ubicado.
- [ ] Los enlaces de términos y privacidad tienen el tratamiento correspondiente.
- [ ] El botón Crear cuenta utiliza la variante Primary.
- [ ] El separador tiene dos líneas y el texto centrado.
- [ ] El botón Iniciar sesión utiliza la variante Secondary.
- [ ] Iniciar sesión navega a `/login`.
- [ ] Social Proof está debajo de las dos columnas.
- [ ] Tablet oculta el Presentation Panel.
- [ ] Mobile oculta el Presentation Panel.
- [ ] El texto del checkbox se adapta al ancho disponible.
- [ ] No existen desbordamientos horizontales.

## 11.3. Validación general

- [ ] Se reutilizan los componentes del Design System.
- [ ] Se respetan los tokens existentes.
- [ ] La arquitectura mantiene componentes organizados por carpetas.
- [ ] Las rutas son independientes.
- [ ] No se modifica el landing aprobado.
- [ ] No se introducen dependencias innecesarias.
- [ ] TypeScript pasa sin errores.
- [ ] Lint pasa sin errores.
- [ ] Build finaliza correctamente.

---

# 12. Reglas generales de implementación

1. Leer la documentación antes de escribir código.
2. Revisar los componentes existentes antes de crear otros nuevos.
3. Mantener los tokens del Design System.
4. No modificar el landing terminado.
5. No modificar componentes existentes sin una justificación concreta.
6. No inventar contenido, medidas ni elementos visuales.
7. Mantener los assets locales.
8. Respetar la estructura de carpetas definida.
9. Implementar una pantalla a la vez.
10. Ejecutar validaciones de TypeScript, lint y build al finalizar.

## Flujo de trabajo

Documentación → Análisis → Aprobación → Implementación → Validación → Ajustes visuales.