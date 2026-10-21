import React from 'react'
import { Star, MessageSquareQuote, ShieldAlert } from 'lucide-react'
import type { ReviewEvidence } from '../types'

interface EvidenceFeedProps {
  reviews: ReviewEvidence[]
  restaurantName: string
}

export const EvidenceFeed: React.FC<EvidenceFeedProps> = ({
  reviews,
  restaurantName,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
            Evidencia encontrada
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-amber-600" />
            Reseñas públicas con fricciones operativas detectadas
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Detectamos en el perfil público de {restaurantName} menciones que impactan directamente en la retención de clientes:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => {
          const isBad = rev.rating <= 3
          return (
            <div
              key={rev.id}
              className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all ${
                isBad
                  ? 'border-rose-200 bg-rose-50/30'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block leading-tight">
                      {rev.author}
                    </span>
                    <span className="text-2xs text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-700 text-xs leading-relaxed italic mb-3">
                "{rev.text}"
              </p>

              {rev.highlightedText && (
                <div className="p-2 rounded-lg bg-rose-100/70 border border-rose-200/80 text-rose-900 text-2xs font-medium flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Punto de fuga detectado:</strong> "{rev.highlightedText}"
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
