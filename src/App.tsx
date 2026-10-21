import { useState, useMemo } from 'react'
import type { BleedVariables, PresetScenario } from './types'
import { PRESET_SCENARIOS } from './data/presets'
import { HeroSearch } from './components/HeroSearch'
import { DiagnosticScanner } from './components/DiagnosticScanner'
import { ReportSummary } from './components/ReportSummary'
import { EvidenceFeed } from './components/EvidenceFeed'
import { FormulaExplainer } from './components/FormulaExplainer'
import { AdaptiveCTA } from './components/AdaptiveCTA'
import { LeadPreviewModal } from './components/LeadPreviewModal'
import { calculateBleed, generateLeadSimulationPayload } from './lib/calculator'

type AppStep = 'search' | 'scanner' | 'report'

export function App() {
  const [step, setStep] = useState<AppStep>('search')
  const [selectedScenario, setSelectedScenario] = useState<PresetScenario>(PRESET_SCENARIOS[0])
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  // Reactive variables that user can adjust in real time via sliders
  const [activeVariables, setActiveVariables] = useState<BleedVariables>(PRESET_SCENARIOS[0].variables)

  const handleSelectScenario = (scenario: PresetScenario) => {
    setSelectedScenario(scenario)
    setActiveVariables(scenario.variables)
    setStep('scanner')
  }

  const handleScannerComplete = (updatedScenario: PresetScenario) => {
    setSelectedScenario(updatedScenario)
    setActiveVariables(updatedScenario.variables)
    setStep('report')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setStep('search')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reactively calculate bleed breakdown whenever activeVariables or scenario answers change
  const currentBreakdown = useMemo(() => {
    return calculateBleed(selectedScenario.answers, activeVariables)
  }, [selectedScenario.answers, activeVariables])

  // Lead simulation payload for modal
  const leadPayload = useMemo(() => {
    return generateLeadSimulationPayload(selectedScenario.answers, currentBreakdown)
  }, [selectedScenario.answers, currentBreakdown])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* Global Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={handleReset}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
              F
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base">Fudo</span>
              <span className="text-2xs ml-1.5 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-full font-semibold">
                Diagnóstico de Fuga Operativa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            <span className="hidden md:inline-block text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● +80.000 visitas/mes en AR, MX, CO, CL y BR
            </span>
            {step !== 'search' && (
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer text-xs font-semibold"
              >
                Auditar otro local
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
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
          <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* 1. Main Loss Metric Summary */}
            <ReportSummary
              breakdown={currentBreakdown}
              restaurantName={selectedScenario.name}
            />

            {/* 2. Public Evidence Reviews */}
            <EvidenceFeed
              reviews={selectedScenario.reviews}
              restaurantName={selectedScenario.name}
            />

            {/* 3. Mathematical Formula Transparency & Dynamic Sliders */}
            <FormulaExplainer
              variables={activeVariables}
              hasDigitalMenu={selectedScenario.answers.hasDigitalMenu}
              onVariablesChange={setActiveVariables}
            />

            {/* 4. Adaptive ICP-Based CTA */}
            <AdaptiveCTA
              breakdown={currentBreakdown}
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Simulated Lead Payload Modal */}
      {isLeadModalOpen && (
        <LeadPreviewModal
          payload={leadPayload}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Fudo SaaS Gastronómico • Diseñado para reducir el CAC orgánico con leads calificados.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Argentina</span>
            <span>•</span>
            <span>México</span>
            <span>•</span>
            <span>Colombia</span>
            <span>•</span>
            <span>Chile</span>
            <span>•</span>
            <span>Brasil</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
