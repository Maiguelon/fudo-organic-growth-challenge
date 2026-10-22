import React from 'react'
import { AlertTriangle, Clock, RotateCcw, Smartphone, TrendingDown, DollarSign, Award, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react'
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
  const overall = scores.overall.score

  // Dynamic Theme based on Overall Score
  const getBannerTheme = () => {
    if (overall >= 9.0) {
      return {
        gradient: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900',
        iconBg: 'bg-emerald-500/30 text-emerald-100',
        Icon: CheckCircle2,
        badgeBg: 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/30',
        badgeText: 'Operación Altamente Optimizada',
        lossSubtext: 'Fuga residual estimada',
      }
    }
    if (overall >= 7.5) {
      return {
        gradient: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900',
        iconBg: 'bg-blue-500/30 text-blue-100',
        Icon: ShieldCheck,
        badgeBg: 'bg-blue-400/20 text-blue-100 border border-blue-400/30',
        badgeText: 'Diagnóstico Operativo Favorable',
        lossSubtext: 'Fuga moderada calculada',
      }
    }
    if (overall >= 4.5) {
      return {
        gradient: 'bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900',
        iconBg: 'bg-amber-500/30 text-amber-100',
        Icon: AlertCircle,
        badgeBg: 'bg-amber-400/20 text-amber-100 border border-amber-400/30',
        badgeText: 'Diagnóstico de Fuga Operativa Moderada',
        lossSubtext: 'Pérdida económica calculada',
      }
    }
    return {
      gradient: 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-700',
      iconBg: 'bg-rose-500/30 text-rose-100',
      Icon: AlertTriangle,
      badgeBg: 'bg-rose-400/20 text-rose-100 border border-rose-400/30',
      badgeText: 'Diagnóstico de Fuga Operativa Crítica',
      lossSubtext: 'Pérdida económica calculada',
    }
  }

  const theme = getBannerTheme()

  // Dynamic Descriptions for Cards
  const getDelayDescription = () => {
    if (scores.delay.score >= 7.5) {
      return 'Tiempos de preparación y salida de platos consistentes y ágiles. Operación de salón fluida con muy bajo abandono de comensales.'
    }
    if (scores.delay.score >= 4.5) {
      return 'Demoras ocasionales en horas pico. Oportunidad de sincronizar comanderas para acelerar la rotación de mesas.'
    }
    return 'Tiempos de espera prolongados detectados en reseñas. Clientes insatisfechos que deciden no regresar y mesas que rotan más lento.'
  }

  const getOrderErrorDescription = () => {
    if (scores.orderError.score >= 7.5) {
      return 'Altísima precisión en comanderas y cobranza. Despacho coordinado con cocina con casi nulos platos rehechos o quejas en la adición.'
    }
    if (scores.orderError.score >= 4.5) {
      return 'Desfases esporádicos entre comandas y facturación. Pequeñas mermas operativas corregibles con mayor control de caja.'
    }
    return 'Platos equivocados que deben rehacerse, mermas de insumos no cobradas y descuentos aplicados en caja por disculpas al cliente.'
  }

  const getDigitalDescription = () => {
    if (breakdown.digitalMenuBleedMonthlyUSD === 0) {
      return 'Menú digital interactivo activo. Tus clientes piden de forma rápida con fotos, sin demoras de descarga en el celular ni fricción.'
    }
    if (scores.digitalMenu.score >= 4.5) {
      return `Carta estática en PDF detectada. Genera cierta fricción de lectura en móviles sobre los pedidos delivery estimados (~${Math.round(breakdown.variables.monthlyOrders * ((breakdown.variables.deliverySharePercent || 30) / 100))} pedidos/mes).`
    }
    return 'Fuga severa en canal digital: la carta en PDF pesada o foto borrosa provoca que los comensales desistan de pedir y compren a la competencia.'
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Dynamic Top Banner */}
      <div className={`${theme.gradient} p-6 sm:p-8 text-white transition-all`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} backdrop-blur-md flex items-center justify-center shrink-0`}>
              <theme.Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-2xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-md inline-block ${theme.badgeBg}`}>
                  {theme.badgeText}
                </span>
                <span className="text-2xs font-bold px-2.5 py-0.5 rounded-md bg-white text-slate-900 inline-flex items-center gap-1 shadow-xs">
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
            <span className="text-xs text-white/80 font-medium block">
              {theme.lossSubtext}
            </span>
            <div className="text-3xl sm:text-5xl font-black tracking-tight flex items-baseline gap-1">
              <span>${breakdown.totalBleedMonthlyUSD.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-normal text-white/80">USD/mes</span>
            </div>
            <span className="text-xs text-white/70 font-medium">
              ≈ ${breakdown.totalBleedAnnualUSD.toLocaleString()} USD al año
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Grid with Dynamic 1-10 Scores & Texts */}
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
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.delay.colorClass}`}>
                  Nota: {scores.delay.score}/10 • {scores.delay.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Demoras en cocina y salón
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {getDelayDescription()}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span className={breakdown.delayBleedMonthlyUSD > 100 ? 'text-amber-800' : 'text-slate-700'}>
                ${breakdown.delayBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
            </div>
          </div>

          {/* Card 2: Order & Billing Errors */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-rose-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.orderError.colorClass}`}>
                  Nota: {scores.orderError.score}/10 • {scores.orderError.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Errores de comanda y cuenta
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {getOrderErrorDescription()}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span className={breakdown.orderErrorBleedMonthlyUSD > 100 ? 'text-rose-800' : 'text-slate-700'}>
                ${breakdown.orderErrorBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
            </div>
          </div>

          {/* Card 3: Digital / PDF Friction */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${scores.digitalMenu.colorClass}`}>
                  Nota: {scores.digitalMenu.score}/10 • {scores.digitalMenu.label}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Menú en PDF / Canal delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {getDigitalDescription()}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="text-slate-500 font-medium">Impacto estimado:</span>
              <span className={breakdown.digitalMenuBleedMonthlyUSD > 0 ? 'text-blue-800' : 'text-emerald-700'}>
                ${breakdown.digitalMenuBleedMonthlyUSD.toLocaleString()} USD/mes
              </span>
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
