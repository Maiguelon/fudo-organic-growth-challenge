import React from 'react'
import { AlertTriangle, Clock, RotateCcw, Smartphone, TrendingDown, DollarSign } from 'lucide-react'
import type { BleedBreakdown } from '../types'

interface ReportSummaryProps {
  breakdown: BleedBreakdown
  restaurantName: string
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({
  breakdown,
  restaurantName,
}) => {
  const fudoMonthlyCost = 50
  const roiMultiplier = Math.max(1, Math.round(breakdown.totalBleedMonthlyUSD / fudoMonthlyCost))

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Top Warning Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xs sm:text-xs uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-md inline-block mb-1">
                Diagnóstico de Fuga Operativa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                {restaurantName}
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-rose-100 font-medium block">
              Pérdida económica calculada
            </span>
            <div className="text-3xl sm:text-5xl font-black tracking-tight flex items-baseline gap-1">
              <span>${breakdown.totalBleedMonthlyUSD.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-normal text-rose-200">USD/mes</span>
            </div>
            <span className="text-xs text-rose-200 font-medium">
              ≈ ${breakdown.totalBleedAnnualUSD.toLocaleString()} USD al año
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="p-6 sm:p-8">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-500" />
          Desglose de la fuga por focos de fricción
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Delays */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                ${breakdown.delayBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Demoras en cocina y salón
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tiempos de espera prolongados detectados en reseñas. Clientes insatisfechos que deciden no regresar y mesas que rotan más lento.
            </p>
          </div>

          {/* Card 2: Order & Billing Errors */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-rose-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                ${breakdown.orderErrorBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Errores de comanda y cuenta
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Platos equivocados que deben rehacerse, mermas de insumos no cobradas y descuentos aplicados en caja por disculpas al cliente.
            </p>
          </div>

          {/* Card 3: Digital / PDF Friction */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                ${breakdown.digitalMenuBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Menú en PDF / Canal delivery
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {breakdown.digitalMenuBleedMonthlyUSD > 0
                ? 'Pérdida por comensales que abandonan pedidos delivery al encontrarse una carta estática o pesada en celular.'
                : 'Menú digital interactivo activo: bajo riesgo de abandono en canales directos.'}
            </p>
          </div>
        </div>

        {/* ROI comparison callout */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                La suscripción a Fudo ($50 USD/mes) se amortiza {roiMultiplier}x
              </p>
              <p className="text-xs text-slate-600">
                Recuperando apenas una fracción de las comandas perdidas cubres el software y ganas control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
