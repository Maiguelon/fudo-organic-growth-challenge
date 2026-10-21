import React, { useState, useEffect } from 'react'
import { CheckCircle2, Loader2, DollarSign, ShoppingBag, Terminal, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react'
import type { CurrentSystemType, PresetScenario } from '../types'

interface DiagnosticScannerProps {
  scenario: PresetScenario
  onComplete: (updatedScenario: PresetScenario) => void
  onCancel: () => void
}

export const DiagnosticScanner: React.FC<DiagnosticScannerProps> = ({
  scenario,
  onComplete,
  onCancel,
}) => {
  // Calibration form state
  const [monthlyOrders, setMonthlyOrders] = useState(scenario.answers.monthlyOrders)
  const [averageTicketUSD, setAverageTicketUSD] = useState(scenario.answers.averageTicketUSD)
  const [currentSystem, setCurrentSystem] = useState<CurrentSystemType>(scenario.answers.currentSystem)
  const [hasDigitalMenu, setHasDigitalMenu] = useState(scenario.answers.hasDigitalMenu)

  // Simulation steps progress
  const [scanStep, setScanStep] = useState(1)

  useEffect(() => {
    const timer1 = setTimeout(() => setScanStep(2), 700)
    const timer2 = setTimeout(() => setScanStep(3), 1400)
    const timer3 = setTimeout(() => setScanStep(4), 2100)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create updated scenario with calibrated inputs
    const updated: PresetScenario = {
      ...scenario,
      answers: {
        ...scenario.answers,
        monthlyOrders,
        averageTicketUSD,
        currentSystem,
        hasDigitalMenu,
      },
      variables: {
        ...scenario.variables,
        monthlyOrders,
        averageTicketUSD,
      },
    }
    onComplete(updated)
  }

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Escaneo en curso
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Analizando {scenario.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {scenario.city}, {scenario.countryName} • Ficha pública con {scenario.totalReviews} reseñas
            </p>
          </div>
          <button
            onClick={onCancel}
            type="button"
            className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
          >
            Cambiar restaurante
          </button>
        </div>

        {/* Scan Status Steps */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-xs">
            {scanStep >= 1 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
            )}
            <span className={scanStep >= 1 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
              Google Maps conectado
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {scanStep >= 2 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
            )}
            <span className={scanStep >= 2 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
              NLP en {scenario.reviews.length}+ reseñas críticas
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {scanStep >= 3 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
            )}
            <span className={scanStep >= 3 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
              Inspección de menú digital
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {scanStep >= 4 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
            )}
            <span className={scanStep >= 4 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
              Listo para calibrar
            </span>
          </div>
        </div>
      </div>

      {/* Calibration Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Calibra tus números para calcular tu fuga exacta
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Para estimar con precisión matemática el dinero que se pierde en demoras y errores, ajusta los valores de tu operación:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Input 1: Monthly Orders */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  Volumen mensual (mesas / pedidos)
                </span>
                <span className="text-amber-700 font-bold text-sm sm:text-base">
                  {monthlyOrders.toLocaleString()} / mes
                </span>
              </label>
              <p className="text-2xs sm:text-xs text-slate-500 mb-3">
                Aprox. {Math.round(monthlyOrders / 30)} comandas o mesas diarias.
              </p>
              <input
                type="range"
                min="100"
                max="6000"
                step="50"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-2xs text-slate-400 mt-1">
                <span>100 (micro)</span>
                <span>2.500 (mediano)</span>
                <span>6.000+ (alto volumen)</span>
              </div>
            </div>

            {/* Input 2: Average Ticket */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Ticket promedio por comensal
                </span>
                <span className="text-emerald-700 font-bold text-sm sm:text-base">
                  ${averageTicketUSD} USD
                </span>
              </label>
              <p className="text-2xs sm:text-xs text-slate-500 mb-3">
                Gasto promedio por persona o pedido despachado.
              </p>
              <input
                type="range"
                min="2"
                max="60"
                step="1"
                value={averageTicketUSD}
                onChange={(e) => setAverageTicketUSD(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-2xs text-slate-400 mt-1">
                <span>$2 (café al paso)</span>
                <span>$18 (salón estándar)</span>
                <span>$60 (alta gama)</span>
              </div>
            </div>
          </div>

          {/* Input 3: Current POS/Order System */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 mb-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              ¿Cómo tomas y despachas los pedidos hoy en cocina y caja?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-all ${
                currentSystem === 'paper' 
                  ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 shadow-2xs' 
                  : 'border-slate-200 bg-white hover:bg-slate-100/60 text-slate-700'
              }`}>
                <span>📝 Papel y comanda manuscrita</span>
                <input
                  type="radio"
                  name="currentSystem"
                  checked={currentSystem === 'paper'}
                  onChange={() => setCurrentSystem('paper')}
                  className="accent-amber-600"
                />
              </label>

              <label className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-all ${
                currentSystem === 'excel' 
                  ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 shadow-2xs' 
                  : 'border-slate-200 bg-white hover:bg-slate-100/60 text-slate-700'
              }`}>
                <span>📊 Planillas de Excel / Registro manual</span>
                <input
                  type="radio"
                  name="currentSystem"
                  checked={currentSystem === 'excel'}
                  onChange={() => setCurrentSystem('excel')}
                  className="accent-amber-600"
                />
              </label>

              <label className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-all ${
                currentSystem === 'software_unhappy' 
                  ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 shadow-2xs' 
                  : 'border-slate-200 bg-white hover:bg-slate-100/60 text-slate-700'
              }`}>
                <span>⚠️ Software POS actual (quiero cambiar)</span>
                <input
                  type="radio"
                  name="currentSystem"
                  checked={currentSystem === 'software_unhappy'}
                  onChange={() => setCurrentSystem('software_unhappy')}
                  className="accent-amber-600"
                />
              </label>

              <label className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-all ${
                currentSystem === 'software_happy' 
                  ? 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-950 shadow-2xs' 
                  : 'border-slate-200 bg-white hover:bg-slate-100/60 text-slate-700'
              }`}>
                <span>✅ Software POS actual (estoy conforme)</span>
                <input
                  type="radio"
                  name="currentSystem"
                  checked={currentSystem === 'software_happy'}
                  onChange={() => setCurrentSystem('software_happy')}
                  className="accent-indigo-600"
                />
              </label>
            </div>
          </div>

          {/* Input 4: Digital Menu Channel */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                ¿Cuentas con Menú Digital Interactivo para pedidos directos?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasDigitalMenu(!hasDigitalMenu)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    hasDigitalMenu
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  {hasDigitalMenu ? 'Sí, tengo carta digital' : 'No, uso PDF / foto estática'}
                </button>
              </div>
            </label>
            <p className="text-2xs text-slate-500 mt-1">
              Las cartas en PDF o fotos en historias de Instagram pierden hasta un 25% de ventas por abandono en smartphones.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/25 cursor-pointer"
            >
              <span>Ver reporte de dinero perdido y auditoría completa</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
