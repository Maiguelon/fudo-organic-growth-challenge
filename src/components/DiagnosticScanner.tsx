import React, { useState, useEffect } from 'react'
import { CheckCircle2, Loader2, DollarSign, ShoppingBag, Terminal, Smartphone, ArrowRight, ShieldCheck, Circle, XCircle } from 'lucide-react'
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

  // Simulation steps progress (0: step 1 spinning, 1: step 2 spinning, 2: step 3 spinning, 3: step 4 spinning, 4: all completed)
  const [scanStepIndex, setScanStepIndex] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setScanStepIndex(1), 700)
    const timer2 = setTimeout(() => setScanStepIndex(2), 1400)
    const timer3 = setTimeout(() => setScanStepIndex(3), 2100)
    const timer4 = setTimeout(() => setScanStepIndex(4), 2800)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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

  const stepsConfig = [
    { label: 'Google Maps conectado', loadingLabel: 'Buscando ficha de Google Maps...' },
    { label: `NLP en ${scenario.reviews.length}+ reseñas críticas`, loadingLabel: 'Escaneando quejas de clientes...' },
    { label: 'Inspección de menú digital', loadingLabel: 'Revisando menú en Instagram/WhatsApp...' },
    { label: 'Listo para calibrar', loadingLabel: 'Calibrando datos operativos...' },
  ]

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Top Banner with Progressive Live Scraping Illusion */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              {scanStepIndex < 4 ? (
                <span className="text-2xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
                  Escaneando presencia online...
                </span>
              ) : (
                <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Escaneo de presencia completado
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Analizando {scenario.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {scenario.city} • Ficha pública con {scenario.totalReviews} reseñas
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

        {/* Scan Status Steps with Live Progressive Spinner */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {stepsConfig.map((step, idx) => {
            const isCompleted = scanStepIndex > idx
            const isCurrentlyLoading = scanStepIndex === idx

            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs transition-all ${
                  isCompleted
                    ? 'text-slate-800 font-semibold'
                    : isCurrentlyLoading
                    ? 'text-amber-800 font-bold'
                    : 'text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrentlyLoading ? (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="truncate">
                  {isCurrentlyLoading ? step.loadingLabel : step.label}
                </span>
              </div>
            )
          })}
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
                  ? 'border-amber-600 bg-amber-50/70 font-semibold text-amber-950 shadow-2xs' 
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
                  ? 'border-amber-600 bg-amber-50/70 font-semibold text-amber-950 shadow-2xs' 
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
                  ? 'border-amber-600 bg-amber-50/70 font-semibold text-amber-950 shadow-2xs' 
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
                  ? 'border-indigo-600 bg-indigo-50/70 font-semibold text-indigo-950 shadow-2xs' 
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

          {/* Input 4: Digital Menu Channel with TWO CLEAR YES/NO BUTTONS */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                ¿Cuentas con Menú Digital Interactivo para recibir pedidos?
              </span>
            </label>
            <p className="text-2xs sm:text-xs text-slate-500 mb-3">
              (En lugar de enviar un archivo PDF o foto de la carta por WhatsApp o Instagram)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option: YES */}
              <button
                type="button"
                onClick={() => setHasDigitalMenu(true)}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasDigitalMenu
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${hasDigitalMenu ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span>Sí, tengo carta digital interactiva</span>
              </button>

              {/* Option: NO */}
              <button
                type="button"
                onClick={() => setHasDigitalMenu(false)}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !hasDigitalMenu
                    ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
              >
                <XCircle className={`w-4 h-4 shrink-0 ${!hasDigitalMenu ? 'text-amber-600' : 'text-slate-300'}`} />
                <span>No, uso PDF o foto de la carta</span>
              </button>
            </div>
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
