import { useState } from 'react'
import type { PresetScenario } from './types'
import { PRESET_SCENARIOS } from './data/presets'
import { HeroSearch } from './components/HeroSearch'
import { DiagnosticScanner } from './components/DiagnosticScanner'
import { calculateBleed } from './lib/calculator'

type AppStep = 'search' | 'scanner' | 'report'

export function App() {
  const [step, setStep] = useState<AppStep>('search')
  const [selectedScenario, setSelectedScenario] = useState<PresetScenario>(PRESET_SCENARIOS[0])

  const handleSelectScenario = (scenario: PresetScenario) => {
    setSelectedScenario(scenario)
    setStep('scanner')
  }

  const handleScannerComplete = (updatedScenario: PresetScenario) => {
    setSelectedScenario(updatedScenario)
    setStep('report')
  }

  const handleReset = () => {
    setStep('search')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-lg">
              F
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight">Fudo</span>
              <span className="text-xs ml-1.5 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                Auditoría Operativa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="hidden sm:inline-block text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● +80.000 restaurantes confían en Fudo
            </span>
            {step !== 'search' && (
              <button
                onClick={handleReset}
                className="text-amber-700 hover:text-amber-800 underline cursor-pointer"
              >
                Nueva consulta
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="flex-1">
        {step === 'search' && (
          <HeroSearch onSelectScenario={handleSelectScenario} />
        )}

        {step === 'scanner' && (
          <DiagnosticScanner
            scenario={selectedScenario}
            onComplete={handleScannerComplete}
            onCancel={handleReset}
          />
        )}

        {step === 'report' && (
          <div className="py-12 px-4 max-w-4xl mx-auto text-center">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Reporte preliminar para {selectedScenario.name}
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Fuga estimada:{' '}
                <strong className="text-amber-600">
                  ${calculateBleed(selectedScenario.answers, selectedScenario.variables).totalBleedMonthlyUSD} USD/mes
                </strong>
              </p>
              <button
                onClick={() => setStep('scanner')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Volver a calibrar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Fudo SaaS Gastronómico. Diseñado para optimizar la rentabilidad en LatAm.</p>
      </footer>
    </div>
  )
}

export default App
