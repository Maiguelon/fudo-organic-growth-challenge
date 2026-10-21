# AGENTS.md — Guía de Arquitectura, Mantenimiento y Despliegue

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
├── types/
│   └── index.ts               # Definiciones TypeScript (Diagnóstico, Presets, Respuestas, LeadSimulationPayload)
├── data/
│   └── presets.ts             # 3 Escenarios de prueba (Asador Criollo, Sushi Fusion, Cafecito) + createCustomScenario()
├── lib/
│   ├── calculator.ts          # Motor matemático de cálculo determinista y transparente
│   └── calculator.test.ts     # Verificación unitaria de lógica
├── components/
│   ├── HeroSearch.tsx         # Buscador con presets rápidos, selector de país y soporte de nombre custom
│   ├── DiagnosticScanner.tsx  # Pantalla de análisis simulado y preguntas de calibración
│   ├── ReportSummary.tsx      # Métrica destacada de dinero perdido y desglose por focos
│   ├── EvidenceFeed.tsx       # Reseñas encontradas con quejas operativas destacadas
│   ├── FormulaExplainer.tsx   # Explicación de la fórmula con sliders interactivos en tiempo real
│   ├── AdaptiveCTA.tsx        # Enrutamiento adaptativo según ICP vs No-ICP vs Software Satisfecho
│   └── LeadPreviewModal.tsx   # Modal que visualiza el JSON del lead simulado transferido a Fudo
├── App.tsx                    # Orquestador del flujo y estado reactivo global
├── index.css                  # Tailwind CSS imports y estilos base
└── main.tsx                   # Punto de entrada
```

---

## 4. Los 3 Escenarios Preconfigurados + Modo Custom

1. **Preset 1 — ICP Ideal (`Parrilla El Asador Criollo` - Buenos Aires, AR):**
   * Alto volumen (~2.600 pedidos/mes), ticket \$18 USD, comandas en papel.
   * Reseñas reales con quejas de demoras de 50 minutos y errores en la cuenta.
   * Fuga alta (> \$1.000 USD/mes).
   * **CTA:** Crear cuenta Fudo (Prueba de 14 días).
2. **Preset 2 — Software Satisfecho (`Sushi Fusion & Rolls` - Bogotá, CO):**
   * Volumen medio-alto (~1.800 pedidos/mes), ticket \$24 USD, software POS existente con el cual están conformes.
   * Fricción principal en carta estática de PDF pesada en Linktree/WhatsApp.
   * Fuga en canal digital (~ \$340 USD/mes).
   * **CTA:** Módulo Fudo Tienda Online / Menú Digital QR (sin necesidad de cambiar su POS).
3. **Preset 3 — No-ICP (`Cafecito de Paso` - Santiago, CL):**
   * Micro-local al paso (14 cafés/día), ticket \$3.5 USD.
   * Fuga insignificante (~ \$35 USD/mes). No amortiza un SaaS de \$50 USD/mes.
   * **CTA:** Enrutamiento a plantillas de Excel gratuitas y calculadora de comisiones para no saturar al equipo de ventas.
4. **Modo Custom (`createCustomScenario`):**
   * Permite ingresar cualquier nombre y ciudad (en AR, MX, CO, CL o BR).
   * Genera un escenario base con valores promedio que el usuario puede ajustar libremente.

---

## 5. Fórmula Matemática de Fuga Operativa

$$\text{Fuga Total (USD/mes)} = \text{Fuga Demoras} + \text{Fuga Comandas} + \text{Fuga Menú Digital}$$

* **Fuga Demoras:**
  $$\text{Pedidos Mensuales} \times \left(\frac{\% \text{Demora}}{100}\right) \times \left(\frac{\% \text{Abandono}}{100}\right) \times \text{Ticket Promedio}$$
* **Fuga Comandas y Errores:**
  $$\text{Pedidos Mensuales} \times \left(\frac{\% \text{Error Comanda}}{100}\right) \times (\text{Ticket Promedio} \times \text{Factor Reposición } [0.5])$$
* **Fuga Menú Digital (si usa PDF estático):**
  $$\text{Pedidos Mensuales} \times \left(\frac{\% \text{Caída PDF}}{100}\right) \times \text{Ticket Promedio}$$

*Nota:* Los sliders en `FormulaExplainer.tsx` recalculan estas variables de inmediato en memoria.

---

## 6. Instrucciones para Ejecutar y Desplegar

### Desarrollo Local:
```bash
npm.cmd run dev
```

### Build de Producción y Verificación:
```bash
npm.cmd run build
npm.cmd run preview
```

### Despliegue en Cloudflare Pages:
1. Conectar el repositorio en el panel de **Cloudflare Pages**.
2. **Build settings:**
   - Framework preset: `None` o `Vite`.
   - Build command: `npm run build`
   - Build output directory: `dist`
3. El archivo `public/_redirects` gestiona automáticamente el fallback para cualquier ruta del SPA.
