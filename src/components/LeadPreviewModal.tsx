import React, { useState } from 'react'
import { X, Check, Copy, Database, Sparkles, AlertCircle } from 'lucide-react'
import type { LeadSimulationPayload } from '../types'

interface LeadPreviewModalProps {
  payload: LeadSimulationPayload
  onClose: () => void
}

export const LeadPreviewModal: React.FC<LeadPreviewModalProps> = ({
  payload,
  onClose,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs uppercase tracking-wider font-bold bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded">
                  Simulación de Lead Fudo
                </span>
                <span className="text-2xs text-slate-400">Payload CRM</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Datos Calificados del Prospecto
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong>Aviso de demostración:</strong> Estos son los datos enriquecidos y calificados que la herramienta transferiría al CRM / Base de Datos de Fudo cuando el dueño hace clic en "Crear cuenta". Permite al equipo comercial o al onboarding automatizado contactarlo sabiendo exactamente cuánto dinero pierde y qué módulo necesita.
          </div>
        </div>

        {/* Lead Content */}
        <div className="p-6 space-y-6">
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">Calificación ICP</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">{payload.icpTier.split(' - ')[0]}</span>
              <span className="text-2xs text-amber-600 font-medium">{payload.icpTier.split(' - ')[1]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">Fuga Calculada</span>
              <span className="font-bold text-rose-600 text-sm mt-0.5 block">
                ${payload.estimatedMonthlyBleedUSD.toLocaleString()} USD/mes
              </span>
              <span className="text-2xs text-slate-500">GMV ≈ ${Math.round(payload.estimatedMonthlyGMV).toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">Producto Recomendado</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block line-clamp-2">
                {payload.recommendedProduct}
              </span>
            </div>
          </div>

          {/* JSON Payload viewer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Objeto JSON generado en tiempo real:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-2xs sm:text-xs font-mono overflow-x-auto max-h-60 border border-slate-800">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Simulación generada a las {new Date(payload.simulationTimestamp).toLocaleTimeString()}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
