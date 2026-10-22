import React, { useState } from 'react'
import { Search, Sparkles, ArrowRight, Target, Layers, Filter } from 'lucide-react'
import type { PresetScenario } from '../types'
import { PRESET_SCENARIOS, createCustomScenario } from '../data/presets'

interface HeroSearchProps {
  onSelectScenario: (scenario: PresetScenario) => void
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSelectScenario }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      onSelectScenario(PRESET_SCENARIOS[0])
      return
    }

    const matched = PRESET_SCENARIOS.find(
      p => p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
    if (matched) {
      onSelectScenario(matched)
    } else {
      const custom = createCustomScenario(searchTerm)
      onSelectScenario(custom)
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Top Tagline */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-semibold mb-5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Auditoría de Fuga Operativa en Vivo</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
        ¿Cuánta plata se te escapa al mes por <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">desorden operativo</span>?
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Ingresa el nombre de tu restaurante. Escaneamos tus reseñas en Google Maps, demoras de cocina y fricción en delivery para calcular tu <strong>pérdida económica mensual exacta</strong>.
      </p>

      {/* Simplified Search Input Box (No country dropdown) */}
      <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe el nombre de tu restaurante (ej: Don Julio, Tacos DF...)"
              className="w-full pl-10 pr-4 py-3 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 cursor-pointer shrink-0"
          >
            <span>Auditar local</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Clean 3 Preset Scenarios (Concise, no extra noise) */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          O explora uno de los 3 casos de demostración:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Preset 1: Target Principal */}
          <button
            type="button"
            onClick={() => onSelectScenario(PRESET_SCENARIOS[0])}
            className="p-4 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer text-left group flex flex-col justify-between"
          >
            <div>
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1 mb-2">
                <Target className="w-3 h-3 text-amber-600" />
                Target Principal
              </span>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                Parrilla El Asador Criollo
              </h3>
            </div>
            <div className="mt-3 flex items-center gap-1 text-2xs font-semibold text-amber-700">
              <span>Probar caso</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Preset 2: Target Secundario */}
          <button
            type="button"
            onClick={() => onSelectScenario(PRESET_SCENARIOS[1])}
            className="p-4 rounded-2xl bg-white border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer text-left group flex flex-col justify-between"
          >
            <div>
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1 mb-2">
                <Layers className="w-3 h-3 text-indigo-600" />
                Target Secundario
              </span>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
                Sushi Fusion & Rolls
              </h3>
            </div>
            <div className="mt-3 flex items-center gap-1 text-2xs font-semibold text-indigo-700">
              <span>Probar caso</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Preset 3: Fuera de Target */}
          <button
            type="button"
            onClick={() => onSelectScenario(PRESET_SCENARIOS[2])}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer text-left group flex flex-col justify-between"
          >
            <div>
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 inline-flex items-center gap-1 mb-2">
                <Filter className="w-3 h-3 text-slate-500" />
                Fuera de Target
              </span>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-slate-800 transition-colors">
                Cafecito de Paso
              </h3>
            </div>
            <div className="mt-3 flex items-center gap-1 text-2xs font-semibold text-slate-600">
              <span>Probar caso</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
