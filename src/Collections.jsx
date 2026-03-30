import { Link } from 'react-router-dom'
import { collections } from './data/collections'
import { tools } from './data/tools'

export default function Collections({ lang = 'ru', isDark = true }) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0f0a1e 0%, #030712 50%, #0a0f1e 100%)'}}>
      {/* Full page glow orbs */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-20 -right-20 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 pt-14 pb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm mb-6 transition-colors">
            ← {lang === 'ru' ? 'Назад' : 'Back'}
          </Link>
          <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
            {lang === 'ru' ? '✦ Коллекции' : '✦ Collections'}
          </h1>
          <p className="text-gray-400 text-base">
            {lang === 'ru'
              ? 'Подборки лучших AI инструментов под каждую задачу'
              : 'Curated AI tool picks for every use case'}
          </p>
        </div>
      </div>

      {/* Collections grid */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {collections.map(col => {
            const colTools = tools.filter(t => col.toolIds.includes(t.id))
            return (
              <Link
                key={col.id}
                to={`/collections/${col.id}`}
                state={{ lang, isDark }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-900/60 hover:border-gray-600/60 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Gradient bar top */}
                <div className={`h-1 w-full bg-gradient-to-r ${col.color}`} />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{col.emoji}</span>
                    <div>
                      <h2 className="text-white font-bold text-lg leading-tight">
                        {lang === 'ru' ? col.titleRu : col.titleEn}
                      </h2>
                      <p className="text-gray-400 text-sm mt-0.5">
                        {lang === 'ru' ? col.descRu : col.descEn}
                      </p>
                    </div>
                  </div>
                  {/* Tool icons preview */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {colTools.slice(0, 6).map(t => (
                      <span key={t.id} className="w-8 h-8 flex items-center justify-center bg-gray-800/80 rounded-lg text-base" title={t.name}>
                        {t.icon}
                      </span>
                    ))}
                    {colTools.length > 6 && (
                      <span className="text-xs text-gray-500">+{colTools.length - 6}</span>
                    )}
                    <span className="ml-auto text-xs text-gray-500">
                      {colTools.length} {lang === 'ru' ? 'инструментов' : 'tools'} →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
