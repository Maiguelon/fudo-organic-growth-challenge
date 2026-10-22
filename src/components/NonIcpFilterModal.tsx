import React from 'react'
import { X, ShieldCheck, TrendingDown, Users, FileSpreadsheet, Check } from 'lucide-react'

interface NonIcpFilterModalProps {
  toolName: string
  restaurantName: string
  onClose: () => void
}

export const NonIcpFilterModal: React.FC<NonIcpFilterModalProps> = ({
  toolName,
  restaurantName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs uppercase tracking-wider font-bold bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">
                  Embudo Protegido
                </span>
                <span className="text-2xs text-slate-400">Filtrado de No-ICP</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                CAC Optimizado: Prospecto Derivado a Autoservicio
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

        {/* Strategic Callout Banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              <strong>Demostración de Growth:</strong> El restaurante <strong>{restaurantName}</strong> fue calificado automáticamente como <strong>No-ICP</strong> (micro-local con volumen bajo que no amortiza una suscripción de $50 USD/mes).
            </div>
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">Estado del Lead</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5 block">Filtrado con Éxito</span>
              <span className="text-2xs text-slate-500">No satura al equipo comercial</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">CAC Evitado</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                ~$200 USD
              </span>
              <span className="text-2xs text-slate-500">Costo de venta ahorrado</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-2xs uppercase font-semibold">Recurso Asignado</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block line-clamp-1">
                {toolName}
              </span>
              <span className="text-2xs text-emerald-600 font-medium">100% Autoservicio</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <Users className="w-4 h-4 text-slate-600" />
              ¿Por qué esta decisión reduce el costo por cliente pago?
            </h4>
            <p className="leading-relaxed text-slate-600">
              Las herramientas gratuitas tradicionales colapsaban a ventas con consultas de emprendimientos sin presupuesto. Al detectar en la calibración un volumen transaccional micro, la herramienta:
            </p>
            <ul className="space-y-1.5 text-slate-700 pl-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>No ofrece llamada ni demo de ventas</strong>, evitando quemar tiempo comercial.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Entrega valor inmediato</strong> con <em>{toolName}</em> para fidelizar orgánicamente.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Protege el ratio de conversión a pago</strong> del funnel principal de Fudo.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Acceso simulado a: {toolName}
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
