# AGENTS.md — Guía de Arquitectura y Mantenimiento

> **Proyecto:** Herramienta de Diagnóstico de Fuga Operativa y Captación Calificada para Fudo (SaaS Gastronómico).  
> **Target:** Restaurantes en Argentina, México, Colombia, Chile y Brasil.  
> **Objetivo:** Adquisición de clientes calificados (ICP) que conviertan a suscripciones de \$50 USD/mes, reduciendo el CAC orgánico y filtrando no-ICPs.

---

## 1. Contexto de Negocio y Misión

Fudo cuenta con un tráfico orgánico mensual significativo (~80.000 visitas/mes). Las herramientas gratuitas pasadas (plantillas de Excel, creador de sitios, análisis superficial de Google Maps) generaban uso pero no clientes pagos debido a:
1. **Desalineación de intención:** Atraían usuarios que buscaban soluciones de marketing/redes sociales en vez de software de gestión operativa y punto de venta.
2. **Selección adversa:** Captaban negocios sin presupuesto ni volumen transaccional que evitan pagar software.

### Esta Solución:
Una herramienta interactiva que:
- Inicia con un gancho de baja fricción: nombre del restaurante (con 3 presets representativos o cualquier nombre personalizado).
- Escanea presencia digital e identifica reseñas reales con fricciones operativas (*demoras de cocina*, *errores de facturación/comandas*, *menú estático en PDF*).
- Hace preguntas de calibración en tiempo real (volumen de pedidos, ticket promedio, sistema actual).
- **Calcula de forma transparente el dinero perdido mensual ($\text{USD/mes}$)** desglosando la fórmula matemática.
- Permite ajustar los parámetros en vivo mediante *sliders* reactivos.
- Enruta al usuario según su calificación:
  - **ICP Ideal (Alto volumen, comanda en papel/descontrol):** CTA directo a crear cuenta Fudo (muestra el modal con el payload del lead simulado).
  - **Software Satisfecho (Tiene otro POS pero delivery/carta ineficiente):** CTA a módulo complementario Fudo Tienda / Menú Digital.
  - **No-ICP (Micro-local sin volumen):** Redirección a herramientas y plantillas gratuitas para no saturar al equipo de ventas.

---

## 2. Stack Tecnológico y Despliegue

- **Framework:** React 19 + TypeScript + Vite.
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`).
- **Iconografía:** `lucide-react`.
- **Hosting / Deploy:** **Cloudflare Pages**.
  - Build command: `npm run build`
  - Output directory: `dist`
  - SPA Fallback: Archivo `public/_redirects` (`/* /index.html 200`).
- **Entorno Windows:** Siempre usar `npm.cmd` o `npx.cmd` si se ejecutan comandos en terminal PowerShell para evitar bloqueos de directivas de ejecución (`.ps1`).

---

## 3. Estructura de Directorios

```text
src/
├── types/             # Definiciones TypeScript (Diagnóstico, Presets, Respuestas, LeadPayload)
├── data/              # Presets de prueba y palabras clave de fricción operativa
├── lib/               # Motor de cálculo matemático (fórmulas transparentes de fuga)
├── components/        # Componentes modulares de interfaz
│   ├── HeroSearch.tsx          # Buscador con presets rápidos y soporte de nombre custom
│   ├── DiagnosticScanner.tsx   # Animación de análisis y preguntas de calibración
│   ├── ReportSummary.tsx       # Métrica principal de dinero perdido
│   ├── EvidenceFeed.tsx        # Reseñas encontradas con quejas operativas destacadas
│   ├── FormulaExplainer.tsx    # Explicación de la fórmula con sliders interactivos
│   ├── LeadPreviewModal.tsx    # Modal que expone los datos del lead simulado hacia Fudo
│   └── AdaptiveCTA.tsx         # Enrutamiento según ICP vs No-ICP vs Software Satisfecho
├── App.tsx            # Orquestador del flujo de estado principal
├── index.css          # Tailwind CSS imports y estilos base
└── main.tsx           # Punto de entrada
```

---

## 4. Reglas para Futuras Modificaciones (Guidelines para Agentes)

1. **Transparencia en la Fórmula:** Nunca mostrar un valor de pérdida estimado sin explicar de dónde sale cada variable (ticket promedio, frecuencia de error, volumen de comandas). Cualquier cambio en la fórmula debe reflejarse tanto en `src/lib/calculator.ts` como en `FormulaExplainer.tsx`.
2. **Reactividad Dinámica:** Toda modificación en los inputs del usuario (sliders de ticket, pedidos, porcentaje de error) debe recalcular el reporte en tiempo real sin recargar la página.
3. **Preservar el Enrutamiento Inteligente:** No enviar a todos los usuarios al mismo CTA. Fudo cuida su CAC y tasa de conversión protegiendo al equipo de ventas de prospectos sin presupuesto.
4. **Modo Custom:** El usuario puede ingresar cualquier nombre de restaurante; la herramienta debe asignar valores base coherentes para nombres fuera de los presets.
5. **Modal de Lead Simulado:** El botón de "Crear cuenta Fudo" debe abrir una ventana modal que visualice claramente el JSON/objeto con los datos del lead simulado que viajarían a la base de datos de Fudo.
6. **Commits Atómicos:** Todo cambio significativo debe acompañarse de su commit en Git con mensaje descriptivo.
