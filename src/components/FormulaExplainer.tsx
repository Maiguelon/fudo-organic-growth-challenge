import React from 'react'
import { Calculator, Sliders, Info } from 'lucide-react'
import type { BleedVariables } from '../types'

interface FormulaExplainerProps {
  variables: BleedVariables
  hasDigitalMenu: boolean
  onVariablesChange: (newVars: BleedVariables) => void
}

export const FormulaExplainer: React.FC<FormulaExplainerProps> = ({
  variables,
  hasDigitalMenu,
  onVariablesChange,
}) => {
  const handleSlider = (key: keyof BleedVariables, value: number) => {
    onVariablesChange({
      ...variables,
      [key]: value,
    })
  }

  const deliveryOrders = Math.round(variables.monthlyOrders * ((variables.deliverySharePercent || 30) / 100))
  const salonOrders = variables.monthlyOrders - deliveryOrders

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
            Transparencia Metodológica
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600" />
            ¿De dónde sale este número? Fórmula matemática desglosada
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            No usamos cifras inventadas. Puedes ajustar cualquier variable en vivo y ver cómo recalcula la fuga al instante:
          </p>
        </div>
      </div>

      {/* Mathematical Box */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 mb-8 font-mono text-xs sm:text-sm shadow-inner overflow-x-auto">
        <div className="text-amber-400 font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
          <span>Fuga Mensual Total (USD)</span> = <span>Fuga_Demoras</span> + <span>Fuga_Comandas</span> + <span>Fuga_Menú</span>
        </div>

        <div className="space-y-2 border-t border-slate-800 pt-3 text-2xs sm:text-xs text-slate-300">
          <div>
            <span className="text-amber-400 font-semibold">1. Fuga_Demoras</span> = Pedidos_Salón ({salonOrders}) × %Demora ({variables.delayRatePercent}%) × %Abandono ({variables.delayChurnRatePercent}%) × Ticket (${variables.averageTicketUSD})
          </div>
          <div>
            <span className="text-rose-400 font-semibold">2. Fuga_Comandas</span> = Pedidos_Totales ({variables.monthlyOrders}) × %Error ({variables.orderErrorRatePercent}%) × (Ticket × {variables.orderErrorCostFactor})
          </div>
          <div>
            <span className="text-blue-400 font-semibold">3. Fuga_Menú</span> = {hasDigitalMenu ? '0 (Cuenta con menú interactivo)' : `Pedidos_Delivery (${deliveryOrders}) × %Caída_PDF (${variables.digitalDropoffRatePercent}%) × Ticket ($${variables.averageTicketUSD})`}
          </div>
        </div>
      </div>

      {/* Live Sliders to Adjust Inputs */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-4 h-4 text-amber-600" />
          <h4 className="text-sm font-bold text-slate-900">
            Ajusta los parámetros para tu caso específico en tiempo real:
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          {/* Slider 1: Ticket Promedio */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Ticket promedio por comensal</span>
              <span className="text-emerald-700 font-bold">${variables.averageTicketUSD} USD</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="1"
              value={variables.averageTicketUSD}
              onChange={(e) => handleSlider('averageTicketUSD', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-slate-400 mt-1">
              <span>$3 USD</span>
              <span>$30 USD</span>
              <span>$60 USD</span>
            </div>
          </div>

          {/* Slider 2: Pedidos Mensuales */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Pedidos o mesas mensuales</span>
              <span className="text-amber-700 font-bold">{variables.monthlyOrders.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={variables.monthlyOrders}
              onChange={(e) => handleSlider('monthlyOrders', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-slate-400 mt-1">
              <span>100 pedidos</span>
              <span>2.500 pedidos</span>
              <span>5.000 pedidos</span>
            </div>
          </div>

          {/* Slider 3: % Error en Comandas */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Tasa estimada de error en comanda/cocina</span>
              <span className="text-rose-700 font-bold">{variables.orderErrorRatePercent}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="8"
              step="0.1"
              value={variables.orderErrorRatePercent}
              onChange={(e) => handleSlider('orderErrorRatePercent', Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-slate-400 mt-1">
              <span>0.2% (operación con POS)</span>
              <span>3.5% (promedio papel)</span>
              <span>8% (desborde total)</span>
            </div>
          </div>

          {/* Slider 4: % Caída en Delivery por Menú PDF */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>% Caída en pedidos delivery por menú PDF</span>
              <span className="text-blue-700 font-bold">{variables.digitalDropoffRatePercent}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="8"
              step="0.1"
              value={variables.digitalDropoffRatePercent}
              onChange={(e) => handleSlider('digitalDropoffRatePercent', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-slate-400 mt-1">
              <span>0.5% (mínimo abandono)</span>
              <span>2.5% (promedio PDF)</span>
              <span>8% (carta ilegible)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Al mover los deslizadores, el reporte superior e inferior se recalculan automáticamente en memoria.</span>
        </div>
      </div>
    </div>
  )
}
