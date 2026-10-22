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
- Asigna una **calificación operativa de 1 a 10** para cada foco de fricción (*Demoras*, *Comandas*, *Menú Digital*) y una nota global.
- Enruta al usuario según su calificación:
  - **Target Principal / ICP Ideal (Parrilla El Asador):** Alto volumen, comanda en papel $\rightarrow$ CTA directo a crear cuenta Fudo (muestra el modal con el payload del lead simulado).
  - **Target Secundario / Upsell (Sushi Fusion):** Tiene otro POS y está conforme, pero pierde ventas en delivery por menú PDF $\rightarrow$ CTA a módulo complementario Fudo Tienda / Menú Digital.
  - **Fuera de Target / No-ICP (Cafecito de Paso):** Micro-local sin volumen $\rightarrow$ Redirección a herramientas gratuitas reales (*Calculadora de Rentabilidad de Platos* y *Plantilla Excel de Control de Inventario*) disparando un modal de **Protección de Embudo y Reducción de CAC**.

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
│   └── index.ts               # Definiciones TypeScript (Diagnóstico, Presets, Respuestas, LeadSimulationPayload, CategoryScore)
├── data/
│   └── presets.ts             # 3 Escenarios de prueba (Asador Criollo, Sushi Fusion, Cafecito) + createCustomScenario()
├── lib/
│   ├── calculator.ts          # Motor matemático de cálculo determinista, notas de 1 a 10 y generación de payloads
│   └── calculator.test.ts     # Verificación unitaria de lógica
├── components/
│   ├── HeroSearch.tsx         # Buscador con presets rápidos destacados (Target Principal, Secundario, No-ICP)
│   ├── DiagnosticScanner.tsx  # Pantalla de análisis simulado y preguntas de calibración
│   ├── ReportSummary.tsx      # Métrica destacada de dinero perdido y notas operativas de 1 a 10
│   ├── EvidenceFeed.tsx       # Reseñas encontradas con quejas operativas destacadas
│   ├── FormulaExplainer.tsx   # Explicación de la fórmula con sliders interactivos en tiempo real
│   ├── AdaptiveCTA.tsx        # Enrutamiento adaptativo según ICP vs No-ICP vs Software Satisfecho
│   ├── LeadPreviewModal.tsx   # Modal que visualiza el JSON del lead simulado transferido a Fudo
│   └── NonIcpFilterModal.tsx  # Modal que explica cómo se protegió el CAC filtrando leads no viables
├── App.tsx                    # Orquestador del flujo y estado reactivo global
├── index.css                  # Tailwind CSS imports y estilos base
└── main.tsx                   # Punto de entrada
```

---

## 4. Los 3 Escenarios Preconfigurados + Modo Custom

1. **Preset 1 — Target Principal / ICP Ideal (`Parrilla El Asador Criollo` - Buenos Aires, AR):**
   * Alto volumen (~2.600 pedidos/mes), ticket \$18 USD, comandas en papel.
   * Reseñas reales con quejas de demoras de 50 minutos y errores en la cuenta.
   * Nota: 2.8/10 (Crítico).
   * Fuga alta (> \$1.000 USD/mes).
   * **CTA:** Crear cuenta Fudo (Prueba de 14 días).
2. **Preset 2 — Target Secundario / Upsell (`Sushi Fusion & Rolls` - Bogotá, CO):**
   * Volumen medio-alto (~1.800 pedidos/mes), ticket \$24 USD, software POS existente con el cual están conformes.
   * Fricción principal en carta estática de PDF pesada en WhatsApp/Linktree (~35% pedidos delivery).
   * Salón calificado en 9.2/10 (Excelente), Menú digital en 4.5/10 (Mejorable).
   * Fuga acotada exclusivamente al canal digital (~ \$380 USD/mes).
   * **CTA:** Módulo Fudo Tienda Online / Menú Digital QR (sin necesidad de cambiar su POS).
3. **Preset 3 — Fuera de Target / No-ICP (`Cafecito de Paso` - Santiago, CL):**
   * Micro-local al paso (14 cafés/día), ticket \$3.5 USD.
   * Fuga insignificante (~ \$32 USD/mes). No amortiza un SaaS de \$50 USD/mes.
   * **CTA:** Enrutamiento a herramientas reales (*Calculadora de Rentabilidad de Platos* y *Plantilla Excel de Control de Inventario*), activando el modal de CAC protegido.
4. **Modo Custom (`createCustomScenario`):**
   * Permite ingresar cualquier nombre y ciudad (en AR, MX, CO, CL o BR).
   * Genera un escenario base con valores promedio que el usuario puede ajustar libremente.

---

## 5. Fórmula Matemática de Fuga Operativa

$$\text{Fuga Total (USD/mes)} = \text{Fuga Demoras} + \text{Fuga Comandas} + \text{Fuga Menú Digital}$$

* **Fuga Demoras (Salón):**
  $$\text{Pedidos Salón} \times \left(\frac{\% \text{Demora}}{100}\right) \times \left(\frac{\% \text{Abandono}}{100}\right) \times \text{Ticket Promedio}$$
* **Fuga Comandas y Errores:**
  $$\text{Pedidos Mensuales} \times \left(\frac{\% \text{Error Comanda}}{100}\right) \times (\text{Ticket Promedio} \times \text{Factor Reposición } [0.5])$$
* **Fuga Menú Digital (Delivery):**
  $$\text{Pedidos Delivery} \times \left(\frac{\% \text{Caída PDF}}{100}\right) \times \text{Ticket Promedio}$$

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
