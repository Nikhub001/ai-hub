import { useState, useMemo } from 'react'
import { tools, categories } from './data/tools'

function ToolCard({ tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 flex flex-col gap-3 hover:border-purple-500/60 hover:bg-gray-800/90 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">{tool.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 border border-green-700/40 rounded-full">
              {tool.badge}
            </span>
          </div>
        </div>
        <span className="text-gray-500 group-hover:text-purple-400 transition-colors text-lg mt-1">↗</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {tool.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-gray-700/60 text-gray-400 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </a>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = tools
    if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      )
    }
    return result
  }, [activeCategory, search])

  const activeCat = categories.find(c => c.id === activeCategory)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-950 to-blue-900/20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/40 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-6">
            <span>⚡</span> Только бесплатные инструменты
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            FreeAI
          </h1>
          <p className="text-xl font-semibold text-gray-300 mb-2">Все бесплатные AI инструменты в одном месте</p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
            Не знаешь какой AI использовать? Здесь собраны лучшие — для картинок, кода, музыки, видео и не только. Всё бесплатно.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Поиск инструментов..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800/80 border border-gray-700/60 rounded-2xl pl-11 pr-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-gray-800 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-200">
            {search ? `Результаты: "${search}"` : activeCat?.label}
          </h2>
          <span className="text-sm text-gray-500">{filtered.length} инструментов</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-lg">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-12 py-8 text-center text-gray-600 text-sm">
        <p>FreeAI — {tools.length} бесплатных AI инструментов 🚀</p>
      </footer>
    </div>
  )
}
