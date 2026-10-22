import React from 'react'
import { AlertTriangle, Clock, RotateCcw, Smartphone, TrendingDown, DollarSign, Award } from 'lucide-react'
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
  const { scores } = breakdown

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-2xs uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-md inline-block">
                  Diagnóstico de Fuga Operativa
                </span>
                <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-white text-slate-900 inline-flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3 text-amber-600" />
                  Nota Global: {scores.overall.score}/10 ({scores.overall.label})
                </span>
              </div>
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

      {/* Breakdown Grid with 1-10 Scores */}
      <div className="p-6 sm:p-8">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-500" />
          Desglose de la fuga y evaluación operativa (1 a 10)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Delays */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                {/* 1-10 Score Badge */}
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.delay.colorClass}`}>
                  Nota: {scores.delay.score}/10 • {scores.delay.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Demoras en cocina y salón
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Tiempos de espera prolongados detectados en reseñas. Clientes insatisfechos que deciden no regresar y mesas que rotan más lento.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span>${breakdown.delayBleedMonthlyUSD.toLocaleString()} USD/mes</span>
            </div>
          </div>

          {/* Card 2: Order & Billing Errors */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-rose-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                {/* 1-10 Score Badge */}
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.orderError.colorClass}`}>
                  Nota: {scores.orderError.score}/10 • {scores.orderError.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Errores de comanda y cuenta
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Platos equivocados que deben rehacerse, mermas de insumos no cobradas y descuentos aplicados en caja por disculpas al cliente.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-rose-900">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span>${breakdown.orderErrorBleedMonthlyUSD.toLocaleString()} USD/mes</span>
            </div>
          </div>

          {/* Card 3: Digital / PDF Friction */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                {/* 1-10 Score Badge */}
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.digitalMenu.colorClass}`}>
                  Nota: {scores.digitalMenu.score}/10 • {scores.digitalMenu.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Menú en PDF / Canal delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {breakdown.digitalMenuBleedMonthlyUSD > 0
                  ? `Calculado sobre pedidos delivery estimados (~${Math.round(breakdown.variables.monthlyOrders * ((breakdown.variables.deliverySharePercent || 30) / 100))} pedidos/mes). Clientes que abandonan al ver un PDF estático en móvil.`
                  : 'Menú digital interactivo activo: bajo riesgo de abandono en pedidos online.'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span>${breakdown.digitalMenuBleedMonthlyUSD.toLocaleString()} USD/mes</span>
            </div>
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
