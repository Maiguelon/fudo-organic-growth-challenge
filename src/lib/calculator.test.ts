import { PRESET_SCENARIOS } from '../data/presets'
import { calculateBleed } from './calculator'

// Verificación de los 3 casos
const asador = PRESET_SCENARIOS[0]
const asadorResult = calculateBleed(asador.answers, asador.variables)
console.assert(asadorResult.icpCategory === 'icp_ideal', 'Asador should be icp_ideal')
console.assert(asadorResult.totalBleedMonthlyUSD > 800, 'Asador monthly bleed should be > 800 USD')

const sushi = PRESET_SCENARIOS[1]
const sushiResult = calculateBleed(sushi.answers, sushi.variables)
console.assert(sushiResult.icpCategory === 'software_satisfied', 'Sushi should be software_satisfied')

const cafe = PRESET_SCENARIOS[2]
const cafeResult = calculateBleed(cafe.answers, cafe.variables)
console.assert(cafeResult.icpCategory === 'non_icp', 'Cafe should be non_icp')
console.assert(cafeResult.totalBleedMonthlyUSD < 100, 'Cafe monthly bleed should be < 100 USD')

export {}
