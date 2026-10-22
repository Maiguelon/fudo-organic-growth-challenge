import type { BleedBreakdown, BleedVariables, CategoryScore, CurrentSystemType, ICPCategory, LeadSimulationPayload, OperationalAnswers } from '../types'

function createCategoryScore(score: number): CategoryScore {
  const rounded = Math.max(1.0, Math.min(10.0, Number(score.toFixed(1))))
  if (rounded < 4.5) {
    return {
      score: rounded,
      label: 'Crítico',
      colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
    }
  }
  if (rounded < 7.5) {
    return {
      score: rounded,
      label: 'Mejorable',
      colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
    }
  }
  return {
    score: rounded,
    label: rounded >= 8.8 ? 'Excelente' : 'Bueno',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  }
}

/**
 * Motor de cálculo de fuga operativa para restaurantes.
 * Corrige el cálculo de canal digital aplicándolo únicamente sobre el volumen delivery real.
 */
export function calculateBleed(
  answers: OperationalAnswers,
  variables: BleedVariables
): BleedBreakdown {
  const { monthlyOrders, averageTicketUSD } = variables
  const deliveryShare = (variables.deliverySharePercent || 30) / 100
  const salonShare = Math.max(0, 1 - deliveryShare)

  // 1. Fuga por Demoras y Rotación de Mesas (Aplica principalmente a salón)
  const salonOrders = monthlyOrders * salonShare
  const delayBleedMonthlyUSD = Math.round(
    salonOrders *
      (variables.delayRatePercent / 100) *
      (variables.delayChurnRatePercent / 100) *
      averageTicketUSD
  )

  // 2. Fuga por Errores de Comanda y Facturación
  const orderErrorBleedMonthlyUSD = Math.round(
    monthlyOrders *
      (variables.orderErrorRatePercent / 100) *
      (averageTicketUSD * variables.orderErrorCostFactor)
  )

  // 3. Fuga por Canal Digital / Menú Estático en PDF
  // IMPORTANTE: Se calcula exclusivamente sobre el % de pedidos delivery/digitales, no sobre el 100% del salón
  const deliveryOrders = monthlyOrders * deliveryShare
  const digitalMenuBleedMonthlyUSD = answers.hasDigitalMenu
    ? 0
    : Math.round(
        deliveryOrders *
          (variables.digitalDropoffRatePercent / 100) *
          averageTicketUSD
      )

  const totalBleedMonthlyUSD = delayBleedMonthlyUSD + orderErrorBleedMonthlyUSD + digitalMenuBleedMonthlyUSD
  const totalBleedAnnualUSD = totalBleedMonthlyUSD * 12

  // Cálculo de notas de 1 a 10 para cada dimensión
  // Demoras: a mayor tasa de demora y abandono, menor nota
  const delayScoreVal = 10 - ((variables.delayRatePercent * (variables.delayChurnRatePercent / 100)) * 5.2)
  const delayScore = createCategoryScore(delayScoreVal)

  // Comandas y Facturación: a mayor tasa de error, menor nota
  const orderErrorScoreVal = 10 - (variables.orderErrorRatePercent * 2.1)
  const orderErrorScore = createCategoryScore(orderErrorScoreVal)

  // Menú y Canal Digital
  const digitalScoreVal = answers.hasDigitalMenu
    ? 9.5
    : Math.max(1.8, 7.0 - (variables.digitalDropoffRatePercent * 1.1))
  const digitalMenuScore = createCategoryScore(digitalScoreVal)

  // Nota Global
  const overallVal = (delayScore.score + orderErrorScore.score + digitalMenuScore.score) / 3
  const overallScore = createCategoryScore(overallVal)

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
    scores: {
      delay: delayScore,
      orderError: orderErrorScore,
      digitalMenu: digitalMenuScore,
      overall: overallScore,
    },
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
    primaryBottleneck = 'Fricción en canal digital por menú PDF estático en WhatsApp / Redes'
  } else if (breakdown.icpCategory === 'non_icp') {
    icpTier = 'Tier 3 - No-ICP (Lead Filtrado - Autoatención)'
    recommendedProduct = 'Plantilla Excel de Control de Inventario + Calculadora de Rentabilidad de Platos'
    primaryBottleneck = 'Volumen insuficiente para amortizar SaaS de $50 USD/mes'
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
