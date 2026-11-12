# Implementación del Home Page – Figma a Next.js

Quiero que implementes el Home Page de este proyecto Next.js utilizando como referencia un diseño existente en Figma.

El archivo de Figma es compartido y tengo acceso como colaborador, por lo que puede que no aparezca directamente entre mis archivos propios. Debes acceder mediante la URL proporcionada y utilizar Figma MCP para consultar su contenido.

El proyecto cuenta con un UI Kit y un sistema de diseño previamente definido. Tu objetivo es trasladar fielmente ese diseño a código, manteniendo la consistencia visual, la reutilización de componentes y la adaptabilidad responsive.

---

## 1. Referencias de Figma

**Archivo de diseño:**

- URL del archivo: [https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?m=auto&t=GgVWPslAWodNWWJ6-6]

### Página del UI Kit

- Nombre de la página: 3. UI KIT
- Page ID: https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=106-1496

**Frame general de componentes:**

- Nombre del frame: COMPONENTES
- Frame ID / Node ID: 106-1497
- URL directa: https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=106-1497&t=jDaq1nutzDKkiKIz-4

Este frame contiene la colección de componentes del sistema de diseño, incluyendo sus variantes, estados y propiedades.

Debes inspeccionarlo para:

1. Identificar todos los componentes disponibles.
2. Reconocer sus variantes y estados.
3. Analizar su anatomía, estructura y propiedades.
4. Identificar cuáles corresponden a los elementos utilizados en el Home Page.
5. Determinar qué componentes pueden reutilizarse directamente y cuáles requieren una adaptación para el contexto de la página.

**Importante:** no basta con identificar visualmente los componentes. Utiliza las herramientas de Figma MCP para inspeccionar su estructura y propiedades cuando estén disponibles. Prioriza la reutilización de los componentes existentes frente a la creación de nuevos.

**Home Page – Desktop:**

- Resolución de referencia: 1440 px.
- Página: 4. Wireframe baja fidelidad / 5. Diseño alta fidelidad
- Frame ID / Node ID: 126-5500
- URL directa del frame: https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=126-5500&t=jDaq1nutzDKkiKIz-0

**Home Page – Tablet:**

- Resolución de referencia: 768 px.
- Página: 4. Wireframe baja fidelidad / 5. Diseño alta fidelidad
- Frame ID / Node ID: 355-4410
- URL directa del frame: https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=355-4410&t=jDaq1nutzDKkiKIz-0
**Home Page – Mobile:**

- Resolución de referencia: 390 px.
- Página: 4. Wireframe baja fidelidad / 5. Diseño alta fidelidad
- Frame ID / Node ID: 389-6086
- URL directa del frame: https://www.figma.com/design/GyodZakXoH4EMdXC7wBFsD/Dise%C3%B1o-Alta-Fidelidad?node-id=389-6086&t=jDaq1nutzDKkiKIz-0

Los tres frames representan la misma página en diferentes resoluciones. Debes analizarlos conjuntamente para comprender los cambios de distribución, jerarquía, dimensiones y comportamiento responsive.

---

## 2. Análisis previo del archivo de Figma

Antes de comenzar a desarrollar, utiliza Figma MCP para:

1. Acceder al archivo compartido mediante la URL proporcionada.
2. Localizar la página del UI Kit.
3. Inspeccionar los componentes, variantes, propiedades y estilos disponibles.
4. Identificar las variables de diseño (Design Tokens).
5. Analizar los tres frames del Home Page.
6. Obtener capturas de referencia de cada frame.
7. Identificar los recursos gráficos, imágenes, iconos y elementos visuales utilizados.
8. Comprender las diferencias entre las tres versiones responsive.

No asumas que el diseño está en la primera página del archivo. Utiliza las referencias proporcionadas para localizar cada recurso.

Si algún recurso no está accesible por permisos, informa cuál es y solicita lo necesario. No inventes información ni sustituyas el diseño por una interpretación propia.

## 3. Respeto al UI Kit y Design System

El UI Kit es la fuente principal de referencia para toda la implementación.

Debes respetar:

**Colores**
- Utilizar las variables y colores existentes.
- Mantener los colores semánticos y sus respectivos estados.
- Evitar introducir colores arbitrarios.

**Tipografía**
- Respetar las familias tipográficas.
- Mantener tamaños, pesos, alturas de línea y jerarquías.
- Configurar correctamente las fuentes en el proyecto.

**Espaciados**
- Respetar paddings, margins, gaps y dimensiones.
- Mantener las proporciones y alineaciones del diseño.
- Evitar valores arbitrarios cuando existan tokens equivalentes.

**Componentes**
- Reutilizar los componentes existentes del UI Kit.
- Respetar sus variantes y propiedades.
- Mantener consistencia en botones, inputs, cards, navegación y demás elementos.
- Evitar duplicar componentes que ya estén definidos.

Si un elemento del Home Page no existe en el UI Kit, puedes construirlo siguiendo sus mismos lineamientos visuales.

## 4. Breakpoints y diseño responsive

El proyecto debe contemplar los siguientes tamaños de referencia:

| Dispositivo | Ancho de referencia |
|---|---:|
| Desktop | 1440 px |
| Tablet | 768 px |
| Mobile | 390 px |

Utiliza los tres frames de Figma como referencia visual principal.

Es importante que no te limites a reducir proporcionalmente el diseño Desktop.

Debes interpretar cómo cambia la composición en cada resolución:

- Distribución de columnas.
- Alineación y orden de los elementos.
- Dimensiones de contenedores.
- Navegación.
- Tamaños de imágenes.
- Tipografía.
- Espaciados.
- Visibilidad de elementos.
- Comportamiento de componentes.

Los valores indicados son resoluciones de referencia, no necesariamente los únicos anchos admitidos. La página debe funcionar correctamente también en tamaños intermedios y superiores.

Utiliza los breakpoints existentes en el proyecto si ya están definidos. Si no existen, configura los necesarios tomando como referencia los tamaños indicados.

## 5. Implementación en Next.js

Antes de escribir código, inspecciona la estructura existente del proyecto.

Respeta las tecnologías y convenciones ya configuradas.

Consideraciones:

- Utilizar React y TypeScript si están configurados.
- Utilizar Tailwind CSS si ya está integrado.
- Mantener una arquitectura organizada y escalable.
- Separar componentes cuando tenga sentido reutilizarlos.
- Evitar concentrar toda la implementación en un único archivo.
- Mantener el código limpio, legible y reutilizable.
- Reutilizar los recursos gráficos de Figma.
- No instalar dependencias adicionales sin justificar su necesidad.
- No modificar configuraciones existentes sin una razón técnica.

### Arquitectura y organización de componentes

La landing page debe construirse mediante una arquitectura modular, separando cada sección visual en un componente independiente.

**Estructura de carpetas sugerida:**

```text
src/
├── app/
│   └── page.tsx
│
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── FooterSection.tsx
│   │
│   └── ui/
│       └── [componentes reutilizables del UI Kit]
│
└── ...
```

*Nota: los nombres y la cantidad de componentes son ilustrativos. Debes ajustarlos a las secciones reales identificadas en el diseño de Figma.*

**Directrices de implementación:**

1. Cada sección de la landing page debe tener su propio archivo `.tsx` dentro de `components/landing/`.
2. Evita construir toda la landing page directamente en `app/page.tsx`. Este archivo debe encargarse principalmente de importar y organizar las secciones.
3. Los elementos visuales reutilizables, como botones, tarjetas, badges, inputs y otros componentes del UI Kit, deben importarse desde `components/ui/` o desde la ubicación donde esté organizado el sistema de diseño.
4. Si una sección necesita componentes internos específicos, puedes crear una subcarpeta para mantener organizada su estructura.
5. Mantén una separación clara entre componentes de sección y componentes UI reutilizables.
6. Evita duplicar código o crear componentes innecesarios. Prioriza la reutilización y la consistencia visual.
7. Cada componente debe tener responsabilidades claras y facilitar su mantenimiento y evolución.

**Composición de la página:**

`app/page.tsx` debe funcionar como punto de composición de la landing page, importando las secciones en el mismo orden establecido en Figma.

**Importante:** esta estructura debe respetar la arquitectura existente del proyecto. Antes de crear carpetas o archivos, inspecciona la organización actual y adapta la propuesta cuando sea necesario. No dupliques componentes que ya existan.

## 6. Fidelidad visual

El resultado debe mantener la mayor fidelidad posible respecto a los tres diseños originales.

Presta especial atención a:

- Jerarquía visual.
- Proporciones.
- Tipografía.
- Colores.
- Espaciados.
- Dimensiones.
- Alineaciones.
- Bordes y sombras.
- Iconografía.
- Tratamiento de imágenes.

No realices rediseños, modificaciones creativas ni cambios visuales que no estén contemplados en Figma.

No reemplaces componentes del UI Kit por alternativas visualmente diferentes.

## 7. Validación y pruebas

Una vez implementado el Home Page:

1. Ejecuta el proyecto.
2. Comprueba la versión Desktop a 1440 px.
3. Comprueba la versión Tablet a 768 px.
4. Comprueba la versión Mobile a 390 px.
5. Realiza pruebas adicionales en tamaños intermedios.
6. Compara las capturas del navegador con los frames correspondientes de Figma.
7. Corrige las diferencias visuales identificadas.
8. Comprueba que no existan desbordamientos horizontales.
9. Verifica que los componentes funcionen correctamente.
10. Comprueba que no existan errores de compilación ni errores relevantes en consola.

## 8. Metodología de trabajo

Trabaja en el siguiente orden:

**Fase 1 – Inspección**
- Analizar la estructura del proyecto.
- Acceder al archivo compartido de Figma.
- Inspeccionar el UI Kit.
- Analizar los tres frames responsive.

**Fase 2 – Planificación**
- Proponer la estructura de componentes.
- Identificar qué componentes del UI Kit se reutilizarán.
- Definir cómo se implementarán los estilos y tokens.
- Identificar los recursos gráficos necesarios.

**Fase 3 – Implementación**
- Desarrollar el Home Page.
- Reutilizar los componentes disponibles.
- Implementar los tres comportamientos responsive.

**Fase 4 – Validación**
- Ejecutar el proyecto.
- Comparar visualmente las tres resoluciones.
- Corregir inconsistencias.
- Presentar un resumen de lo implementado.

Antes de comenzar la implementación, presenta el análisis y el plan de trabajo.

Una vez aprobado el plan, procede con el desarrollo.

---

**Restricción importante:** No modifiques el archivo original de Figma ni sus componentes. Figma debe utilizarse exclusivamente como fuente de referencia para esta tarea. Todas las modificaciones deben realizarse en el proyecto de código.