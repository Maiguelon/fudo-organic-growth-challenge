import React, { useState } from 'react'
import { Search, MapPin, Sparkles, ArrowRight, Target, Layers, Filter } from 'lucide-react'
import type { CountryCode, PresetScenario } from '../types'
import { PRESET_SCENARIOS, createCustomScenario } from '../data/presets'

interface HeroSearchProps {
  onSelectScenario: (scenario: PresetScenario) => void
}

const COUNTRIES: { code: CountryCode; name: string; cityDefault: string; flag: string }[] = [
  { code: 'AR', name: 'Argentina', cityDefault: 'Buenos Aires', flag: '🇦🇷' },
  { code: 'MX', name: 'México', cityDefault: 'Ciudad de México', flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia', cityDefault: 'Bogotá', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', cityDefault: 'Santiago', flag: '🇨🇱' },
  { code: 'BR', name: 'Brasil', cityDefault: 'São Paulo', flag: '🇧🇷' },
]

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSelectScenario }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('AR')
  const [selectedCity, setSelectedCity] = useState('Buenos Aires')

  const handleCountryChange = (countryCode: CountryCode) => {
    setSelectedCountry(countryCode)
    const countryObj = COUNTRIES.find(c => c.code === countryCode)
    if (countryObj) {
      setSelectedCity(countryObj.cityDefault)
    }
  }

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
      const custom = createCustomScenario(searchTerm, selectedCity, selectedCountry)
      onSelectScenario(custom)
    }
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Top Tagline */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-semibold mb-5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Auditoría de Fuga Operativa en Vivo para Restaurantes</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
        ¿Cuánta plata se te escapa al mes por <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">desorden operativo</span>?
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Ingresa el nombre de tu restaurante. Escaneamos tus reseñas en Google Maps, demoras de cocina y fricción en delivery para calcular tu <strong>pérdida económica mensual exacta</strong>.
      </p>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Country Selector */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 sm:w-44">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
              className="bg-transparent border-none outline-none w-full text-slate-800 cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Restaurant Input */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe cualquier nombre (ej: Don Julio, Tacos DF...)"
              className="w-full pl-10 pr-4 py-3 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 cursor-pointer shrink-0"
          >
            <span>Auditar local</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Highly Visible Preset Scenarios Selector */}
      <div className="mt-10 max-w-4xl mx-auto text-left">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-600" />
            O explora los 3 escenarios representativos de calificación:
          </span>
          <span className="text-2xs text-slate-400 hidden sm:inline">
            Haz clic en un caso para ver su diagnóstico en vivo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Preset 1: Target Principal */}
          <div
            onClick={() => onSelectScenario(PRESET_SCENARIOS[0])}
            className="p-4 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Target className="w-3 h-3 text-amber-600" />
                Target Principal (ICP)
              </span>
              <span className="text-2xs font-semibold text-slate-400">AR 🇦🇷</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
              Parrilla El Asador Criollo
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-snug">
              Alto volumen (~2.600 pedidos/mes), comanda manual en papel y quejas de demora en cocina.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-semibold text-amber-700">
              <span>Fuga alta (~$1.100 USD/m)</span>
              <span className="group-hover:translate-x-1 transition-transform">Ver flujo →</span>
            </div>
          </div>

          {/* Preset 2: Target Secundario */}
          <div
            onClick={() => onSelectScenario(PRESET_SCENARIOS[1])}
            className="p-4 rounded-2xl bg-white border border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Layers className="w-3 h-3 text-indigo-600" />
                Target Secundario
              </span>
              <span className="text-2xs font-semibold text-slate-400">CO 🇨🇴</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
              Sushi Fusion & Rolls
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-snug">
              Tiene software POS y está conforme. Fuga acotada en pedidos delivery por carta PDF en WhatsApp.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-semibold text-indigo-700">
              <span>Upsell canal online (~$380 USD/m)</span>
              <span className="group-hover:translate-x-1 transition-transform">Ver flujo →</span>
            </div>
          </div>

          {/* Preset 3: Fuera de Target */}
          <div
            onClick={() => onSelectScenario(PRESET_SCENARIOS[2])}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-500" />
                Fuera de Target
              </span>
              <span className="text-2xs font-semibold text-slate-400">CL 🇨🇱</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-slate-700 transition-colors">
              Cafecito de Paso
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-snug">
              Micro-local al paso (14 cafés/día). No amortiza SaaS; se canaliza a recursos y plantillas gratis.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-semibold text-slate-600">
              <span>Autofiltrado para cuidar CAC</span>
              <span className="group-hover:translate-x-1 transition-transform">Ver flujo →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
