/*
  Presentaciones de ejemplo extraídas de reportes reales (proyectos.rtf).
  Siguen la convención de Markdown que consume el parser:
    #  Título        -> portada
    >  Cliente · desc -> subtítulo de portada
    ## Sección        -> una diapositiva por sección
*/

export const AFILIACION = `# Afiliación Única
> Círculo Azteca · Atención multicanal sin fricción entre SAC, ZEUS y WhatsApp

## Datos Generales
**Cliente** Canal de Adquisición — Círculo Azteca
**Proyecto** Afiliación Única

Optimizamos la experiencia del cliente y de los asesores identificando puntos de fricción en el turnador como punto de entrada y en herramientas como **SAC**, **ZEUS** y **WhatsApp**. Trabajamos en la integración del flujo de préstamo para garantizar una experiencia más fluida y eficiente, definiendo soluciones con base en investigación y pruebas de usabilidad.

### Servicios
- Diseño de experiencia UX
- Diseño de interfaz UI
- UX Writing
- Diseño de servicios digitales
- Pruebas de usabilidad

### Metodologías
- Design Thinking
- Doble Diamante
- Lean UX / Agile UX
- Jobs To Be Done
- Diseño centrado en el usuario
- Atomic Design

## Objetivo y Reto
### Objetivo
Identificar puntos de fricción en el uso de las herramientas actuales (SAC, ZEUS y WhatsApp), mejorar procesos y entregar soluciones que incrementen la satisfacción del cliente y la productividad de los asesores.

### Reto
Resolver inconsistencias en los procesos de atención multicanal, integrando herramientas como ZEUS, SAC y WhatsApp con el sistema de turnadores, además de superar desafíos de accesibilidad y comunicación en sucursales.

## Proceso
**¿Qué nos pidieron?** Diseñar flujos eficientes que permitan una atención más rápida y clara para clientes y asesores, usando las herramientas existentes.

**¿Cómo lo resolvimos?**

1. Realizamos un research inicial con entrevistas, pruebas de usabilidad y A/B testing.
2. Diseñamos un Customer Journey para mapear las interacciones cliente-asesor en distintos escenarios.
3. Validamos los diseños a través de iteraciones con asesores y clientes reales.
4. Optimizamos los flujos de atención asegurando la integración con ZEUS, SAC y WhatsApp.

## Resultados
El proyecto mejoró la experiencia del cliente y la eficiencia de los asesores mediante flujos optimizados, reducción de tiempos y eliminación de fricciones en las herramientas clave.

### Usabilidad
Incremento en la claridad del flujo gracias a la integración de Zeus en el turnador y menor confusión respecto a su uso.

### Tiempos
Reducción de tiempos promedio en la atención de turnos en un **30%**.

### Impacto del negocio
Mejora en la percepción del servicio y mayor eficiencia operativa de los asesores, optimizando su tiempo.

## Datos Cuantitativos
Durante las pruebas en sitio web, WhatsApp y turnador se recolectaron métricas clave de desempeño y comprensión del usuario.

- 100% — Tasa de éxito en tareas asignadas
- 8.1/10 — Facilidad de uso (turno preferente)
- 9.5/10 — Facilidad de uso (prueba de productos)
- 17.7% — Clics erróneos detectados

> "El sitio me guió de manera clara en el flujo."

Calificación recogida con Maze, incluyendo mapas de calor que ayudaron a identificar patrones de uso y puntos de fricción.

## Antes y Después
**Evolución del Turnador y Perfilador.** Antes de UiX, la gestión de turnos en sucursal se hacía manualmente en una libreta física, generando ineficiencias y una experiencia poco clara.

Implementamos un turnador digital mediante código QR en sucursales y un perfilador digital accesible desde la web de Banco Azteca, que permite solicitar turno de forma remota desde móvil y escritorio.

1. Antes de UiX — libreta física
2. MVP — turnador digital QR
3. Versión final — perfilador web
`;

export const RECLUTALIA = `# Reclutalia
> Grupo Salinas · Contratación 100% digital de 22 días a 3 días

## Datos Generales
**Cliente** Juan Carlos Rodríguez — Grupo Salinas
**Proyecto** Reclutalia

Plataforma de reclutamiento que usa tecnología avanzada para automatizar procesos clave como la verificación de datos y el filtrado de candidatos. Con un enfoque centrado en la experiencia del usuario, agilizamos las contrataciones reduciendo el tiempo de espera a tan solo tres días.

### Servicios
- Diseño de experiencia UX
- Diseño de interfaz UI
- UX Writing
- Diseño de servicios digitales
- Pruebas de usabilidad

### Metodologías
- Design Thinking
- Doble Diamante
- Lean UX / Agile UX
- Jobs To Be Done
- Service Design

## Objetivo y Reto
### Objetivo
Desarrollar y consolidar una plataforma de reclutamiento que reduzca el tiempo de contratación, mejorando la eficiencia del proceso y la experiencia de candidatos, reclutadores y empresas.

### Reto
Conectar y centralizar todos los sistemas de Grupo Salinas en un solo lugar; desarrollar filtrado y verificación automáticos, rápidos y precisos; y crear una plataforma fácil de usar que garantice su adopción.

## Proceso
**¿Qué nos pidieron?** Una plataforma que integre todos los procesos y sistemas de atracción de talento, reúna ofertas y candidatos de Grupo Salinas, asegure al mejor talento y sea 100% digital y móvil.

**¿Cómo lo resolvimos?**

1. Centralizamos y conectamos todos los procesos y data en una plataforma única.
2. Implementamos validaciones y filtros inteligentes para asegurar la selección del mejor talento.
3. Garantizamos visibilidad y transparencia en cada etapa, informando a todos en tiempo real.
4. Desarrollamos una solución 100% digital y móvil, eliminando fricciones.

## Resultados
### Usabilidad
La plataforma intuitiva mejora la navegación y autonomía de los usuarios, facilitando una experiencia fluida y eficiente.

### Tiempos
La automatización y centralización reducen drásticamente los tiempos de contratación.

### Impacto del negocio
Mejoramos sus métricas de contratación de forma sustancial en sucursales y corporativo.

## Datos Cuantitativos
- 22→3 — Días de contratación en Sucursales
- 47→15 — Días de contratación en Corporativo

Reducción de la tasa de abandono en los tres procesos: atracción, selección y contratación.

## Material para Presumir
Features destacadas de la plataforma:

- Compatibilidad del perfil con lo buscado en la vacante
- Estado de la solicitud de vacante siempre visible
- Vista mobile que mantiene visible toda la información necesaria
- Validación para evitar robo de identidad o estafas
- Filtros inteligentes con palabras clave
- One click para iniciar el proceso
`;

export const EXAMPLES = [AFILIACION, RECLUTALIA];
