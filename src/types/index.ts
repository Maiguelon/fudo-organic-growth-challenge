export type CountryCode = 'AR' | 'MX' | 'CO' | 'CL' | 'BR'

export type CurrentSystemType = 
  | 'paper' // Papel y comanda manual
  | 'excel' // Planillas Excel
  | 'software_unhappy' // Software pero busca cambiar
  | 'software_happy' // Software y está conforme

export type ICPCategory = 
  | 'icp_ideal' // Alto volumen, dolor operacional, sin POS o insatisfecho
  | 'software_satisfied' // Tiene POS, conforme, pero fuga en delivery/menú digital
  | 'non_icp' // Micro local, bajo volumen, hobbista

export interface OperationalAnswers {
  restaurantName: string
  country: CountryCode
  city: string
  monthlyOrders: number // Pedidos o mesas atendidas al mes
  averageTicketUSD: number // Ticket promedio en USD
  currentSystem: CurrentSystemType
  hasDigitalMenu: boolean // Si tiene menú interactivo vs PDF estático
}

export interface ReviewEvidence {
  id: string
  author: string
  rating: number // 1 to 5
  date: string
  text: string
  highlightedText: string
  category: 'delay' | 'order_error' | 'billing' | 'digital'
}

export interface BleedVariables {
  monthlyOrders: number
  averageTicketUSD: number
  delayRatePercent: number // % de clientes afectados por demoras (ej: 4%)
  delayChurnRatePercent: number // % de esos clientes insatisfechos que deciden no volver
  orderErrorRatePercent: number // % de pedidos con error de comanda/cocina
  orderErrorCostFactor: number // Fracción del ticket perdida en reponer/descuento (ej: 0.5)
  digitalDropoffRatePercent: number // % de ventas delivery perdidas por menú en PDF estático
}

export interface BleedBreakdown {
  delayBleedMonthlyUSD: number
  orderErrorBleedMonthlyUSD: number
  digitalMenuBleedMonthlyUSD: number
  totalBleedMonthlyUSD: number
  totalBleedAnnualUSD: number
  icpCategory: ICPCategory
  variables: BleedVariables
}

export interface PresetScenario {
  id: string
  name: string
  city: string
  country: CountryCode
  countryName: string
  typeTag: string
  rating: number
  totalReviews: number
  answers: OperationalAnswers
  variables: BleedVariables
  reviews: ReviewEvidence[]
  notes: string
}

export interface LeadSimulationPayload {
  restaurantName: string
  country: CountryCode
  city: string
  icpTier: string
  estimatedMonthlyBleedUSD: number
  estimatedAnnualBleedUSD: number
  monthlyOrders: number
  averageTicketUSD: number
  estimatedMonthlyGMV: number
  currentSystem: string
  primaryBottleneck: string
  recommendedProduct: string
  simulationTimestamp: string
}
