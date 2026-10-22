import { PRESET_SCENARIOS } from '../data/presets'
import { calculateBleed } from './calculator'

// Verificación de los 3 casos
const asador = PRESET_SCENARIOS[0]
const asadorResult = calculateBleed(asador.answers, asador.variables)
console.assert(asadorResult.icpCategory === 'icp_ideal', 'Asador should be icp_ideal')
console.assert(asadorResult.totalBleedMonthlyUSD > 800, 'Asador monthly bleed should be > 800 USD')
console.assert(asadorResult.scores.delay.score < 5, 'Asador delay score should be critical')

const sushi = PRESET_SCENARIOS[1]
const sushiResult = calculateBleed(sushi.answers, sushi.variables)
console.assert(sushiResult.icpCategory === 'software_satisfied', 'Sushi should be software_satisfied')
// Confirm math fix for Sushi: should NOT be 2394 USD, but around 300-500 USD
console.assert(sushiResult.totalBleedMonthlyUSD < 600, 'Sushi monthly bleed should be realistic (< 600 USD)')
console.assert(sushiResult.scores.delay.score >= 8, 'Sushi delay score should be excellent in salon')

const cafe = PRESET_SCENARIOS[2]
const cafeResult = calculateBleed(cafe.answers, cafe.variables)
console.assert(cafeResult.icpCategory === 'non_icp', 'Cafe should be non_icp')
console.assert(cafeResult.totalBleedMonthlyUSD < 60, 'Cafe monthly bleed should be < 60 USD')

export {}
