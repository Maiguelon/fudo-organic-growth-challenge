import type { BleedBreakdown, BleedVariables, CurrentSystemType, ICPCategory, LeadSimulationPayload, OperationalAnswers } from '../types'

/**
 * Motor de cálculo de fuga operativa para restaurantes.
 * Todas las fórmulas son deterministas y transparentes.
 */
export function calculateBleed(
  answers: OperationalAnswers,
  variables: BleedVariables
): BleedBreakdown {
  const { monthlyOrders, averageTicketUSD } = variables

  // 1. Fuga por Demoras y Rotación de Mesas
  // = Pedidos mensuales * % de mesas que experimentan demora excesiva * % de comensales que no regresan * Ticket Promedio
  const delayBleedMonthlyUSD = Math.round(
    monthlyOrders *
      (variables.delayRatePercent / 100) *
      (variables.delayChurnRatePercent / 100) *
      averageTicketUSD
  )

  // 2. Fuga por Errores de Comanda y Facturación
  // = Pedidos mensuales * % de pedidos con error de comanda/cocina * (Ticket Promedio * Factor de costo de reposición/descuento)
  const orderErrorBleedMonthlyUSD = Math.round(
    monthlyOrders *
      (variables.orderErrorRatePercent / 100) *
      (averageTicketUSD * variables.orderErrorCostFactor)
  )

  // 3. Fuga por Canal Digital / Menú Estático en PDF
  // Si no tiene menú digital interactivo, un % de comensales abandona el pedido delivery/takeaway
  const digitalMenuBleedMonthlyUSD = answers.hasDigitalMenu
    ? 0
    : Math.round(
        monthlyOrders *
          (variables.digitalDropoffRatePercent / 100) *
          averageTicketUSD
      )

  const totalBleedMonthlyUSD = delayBleedMonthlyUSD + orderErrorBleedMonthlyUSD + digitalMenuBleedMonthlyUSD
  const totalBleedAnnualUSD = totalBleedMonthlyUSD * 12

  // Determinación de segmento ICP
  const icpCategory = determineICPCategory(answers, monthlyOrders, averageTicketUSD)

  return {
    delayBleedMonthlyUSD,
    orderErrorBleedMonthlyUSD,
    digitalMenuBleedMonthlyUSD,
    totalBleedMonthlyUSD,
    totalBleedAnnualUSD,
    icpCategory,
    variables,
  }
}

/**
 * Determina si el restaurante es ICP Ideal, Software Satisfecho o No-ICP
 */
export function determineICPCategory(
  answers: OperationalAnswers,
  monthlyOrders: number,
  averageTicketUSD: number
): ICPCategory {
  const estimatedMonthlyGMV = monthlyOrders * averageTicketUSD

  // Negocio micro o hobbista (factura menos de 1.800 USD o menos de 500 pedidos/mes con ticket bajo)
  if (estimatedMonthlyGMV < 1800 || monthlyOrders < 500) {
    return 'non_icp'
  }

  // Ya tiene software y está conforme -> Oportunidad de canal complementario
  if (answers.currentSystem === 'software_happy') {
    return 'software_satisfied'
  }

  // ICP Ideal: Volumen respetable, gestión en papel/excel o insatisfecho con su software
  return 'icp_ideal'
}

/**
 * Genera el payload de lead simulado para visualizar en el modal al hacer clic en "Crear cuenta Fudo"
 */
export function generateLeadSimulationPayload(
  answers: OperationalAnswers,
  breakdown: BleedBreakdown
): LeadSimulationPayload {
  const gmv = breakdown.variables.monthlyOrders * breakdown.variables.averageTicketUSD

  let icpTier = 'Tier 1 - Alta Prioridad (ICP Ideal)'
  let recommendedProduct = 'Fudo Plan Pro (POS + Control de Stock + Comanderas de Cocina)'
  let primaryBottleneck = 'Gestión manual en papel provocando demoras y errores de facturación'

  if (breakdown.icpCategory === 'software_satisfied') {
    icpTier = 'Tier 2 - Oportunidad de Upsell / Canal Digital'
    recommendedProduct = 'Fudo Tienda Online & Menú Digital QR (Sin comisiones)'
    primaryBottleneck = 'Fricción en canal digital por menú PDF estático en redes'
  } else if (breakdown.icpCategory === 'non_icp') {
    icpTier = 'Tier 3 - No-ICP (Lead para Recursos Gratuitos)'
    recommendedProduct = 'Plantilla de Control en Excel + Cursos Fudo Academy'
    primaryBottleneck = 'Volumen bajo de pedidos para costear SaaS de $50 USD/mes'
  }

  const systemLabels: Record<CurrentSystemType, string> = {
    paper: 'Papel y comanda manuscrita',
    excel: 'Planillas Excel / Manual',
    software_unhappy: 'Software POS actual (desea cambiar)',
    software_happy: 'Software POS actual (satisfecho)',
  }

  return {
    restaurantName: answers.restaurantName,
    country: answers.country,
    city: answers.city,
    icpTier,
    estimatedMonthlyBleedUSD: breakdown.totalBleedMonthlyUSD,
    estimatedAnnualBleedUSD: breakdown.totalBleedAnnualUSD,
    monthlyOrders: breakdown.variables.monthlyOrders,
    averageTicketUSD: breakdown.variables.averageTicketUSD,
    estimatedMonthlyGMV: gmv,
    currentSystem: systemLabels[answers.currentSystem] || answers.currentSystem,
    primaryBottleneck,
    recommendedProduct,
    simulationTimestamp: new Date().toISOString(),
  }
}
