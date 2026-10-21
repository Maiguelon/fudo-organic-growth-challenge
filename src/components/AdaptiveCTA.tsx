import React from 'react'
import { Sparkles, ArrowRight, ShieldCheck, Download, ExternalLink, Smartphone, CheckCircle } from 'lucide-react'
import type { BleedBreakdown } from '../types'

interface AdaptiveCTAProps {
  breakdown: BleedBreakdown
  onOpenLeadModal: () => void
}

export const AdaptiveCTA: React.FC<AdaptiveCTAProps> = ({
  breakdown,
  onOpenLeadModal,
}) => {
  const { icpCategory, totalBleedMonthlyUSD } = breakdown

  // 1. ICP Ideal
  if (icpCategory === 'icp_ideal') {
    return (
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calificación: Candidato Ideal para Fudo POS & Comanderas</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Frena la fuga de ${totalBleedMonthlyUSD.toLocaleString()} USD/mes con Fudo
          </h3>

          <p className="mt-3 text-sm sm:text-base text-amber-100 leading-relaxed">
            Elimina las comandas en papel, agiliza la salida de platos a la mesa y toma el control total de tu caja e inventario por solo $50 USD/mes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-amber-800 font-extrabold rounded-2xl text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Crear cuenta Fudo (Prueba 14 días gratis)</span>
              <ArrowRight className="w-5 h-5 text-amber-600" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-2xs text-amber-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-200" />
              <span>Sin tarjeta de crédito requerida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-200" />
              <span>Configuración inicial en 15 minutos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-200" />
              <span>Soporte prioritario en WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 2. Software Satisfecho (Tiene otro POS pero fuga en canal digital / delivery)
  if (icpCategory === 'software_satisfied') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-indigo-800/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-4 border border-indigo-400/20">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>Módulo Complementario: Fudo Tienda & Menú Digital</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Conserva tu POS actual y optimiza tu canal de ventas digital
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Tu salón funciona de forma prolija, pero detectamos fricción en tu menú de redes sociales y pedidos delivery. No necesitas migrar tu software: activa la carta digital autogestionable de Fudo para recibir pedidos directos sin comisiones.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Activar Menú Digital Fudo (Demo)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-2xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Compatible con cualquier POS existente. Funciona en paralelo sin fricción técnica.</span>
          </div>
        </div>
      </div>
    )
  }

  // 3. Non-ICP (Micro-local sin volumen para pagar SaaS)
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-4">
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Etapa de Despegue: Recursos Gratuitos</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Empieza ordenando tu negocio con nuestras plantillas gratuitas
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Tu volumen actual todavía no amortiza una suscripción de $50 USD/mes. Te recomendamos comenzar organizando tu stock y margen con nuestras herramientas y plantillas de Excel 100% gratuitas:
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://www.fu.do/recursos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors cursor-pointer group"
          >
            <span>📥 Plantilla Excel de Control de Inventario</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
          </a>

          <a
            href="https://www.fu.do/recursos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors cursor-pointer group"
          >
            <span>🧮 Calculadora de Comisiones de Delivery</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
          </a>
        </div>
      </div>
    </div>
  )
}
