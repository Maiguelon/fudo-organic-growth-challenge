import React, { useState } from 'react'
import { Search, MapPin, Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react'
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
      // Default to Preset 1 if empty
      onSelectScenario(PRESET_SCENARIOS[0])
      return
    }

    // Check if matches an existing preset
    const matched = PRESET_SCENARIOS.find(
      p => p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
    if (matched) {
      onSelectScenario(matched)
    } else {
      // Create custom scenario for ANY typed name
      const custom = createCustomScenario(searchTerm, selectedCity, selectedCountry)
      onSelectScenario(custom)
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs sm:text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Auditoría de Fuga Operativa en Vivo para Gastronómicos</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
        ¿Cuánta plata se te escapa al mes por <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">desorden operativo</span>?
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Ingresa el nombre de tu restaurante. Escaneamos tus reseñas en Google Maps, demoras de cocina y fricción en delivery para calcular tu <strong>pérdida económica mensual exacta</strong>.
      </p>

      {/* Search Box */}
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
              placeholder="Ej: Parrilla Don Julio, Sushi House..."
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

      {/* Preset Fast Picks */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
        <span className="font-medium flex items-center gap-1">
          <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" />
          O explora 3 casos reales de demostración:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectScenario(preset)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 transition-colors text-xs font-medium cursor-pointer shadow-2xs"
            >
              {preset.name} <span className="text-slate-400">({preset.city})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
