import { Activity } from 'lucide-react'

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Fudo Growth Diagnostic</h1>
        <p className="text-sm text-slate-600">Entorno inicializado correctamente con Vite, Tailwind CSS y soporte Cloudflare Pages.</p>
      </div>
    </div>
  )
}

export default App
