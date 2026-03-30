import { Link, useParams } from 'react-router-dom'
import { collections } from './data/collections'
import { tools } from './data/tools'
import { useState } from 'react'

export default function Collection() {
  const { id } = useParams()
  const [lang] = useState(() => localStorage.getItem('freeai_lang') || 'ru')
  const [isDark] = useState(() => localStorage.getItem('freeai_theme') !== 'light')
  const col = collections.find(c => c.id === id)
  if (!col) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Not found</div>

  const colTools = tools.filter(t => col.toolIds.includes(t.id))

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f0a1e 0%, #030712 50%, #0a0f1e 100%)'}}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${col.color}`} />
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
          <Link to="/collections" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm mb-6 transition-colors">
            ← {lang === 'ru' ? 'Все коллекции' : 'All collections'}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{col.emoji}</span>
            <div>
              <h1 className="text-3xl font-black text-white">
                {lang === 'ru' ? col.titleRu : col.titleEn}
              </h1>
              <p className="text-gray-400 mt-1">
                {lang === 'ru' ? col.descRu : col.descEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colTools.map(tool => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-gray-800/50 bg-gray-900/60 hover:border-purple-500/40 hover:bg-gray-800/60 transition-all p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{tool.name}</div>
                  <div className="text-xs text-green-400">{lang === 'ru' ? tool.badgeRu : tool.badgeEn}</div>
                </div>
                {tool.vpn && <span className="text-xs text-orange-400 flex-shrink-0">🔒 VPN</span>}
              </div>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                {lang === 'ru' ? tool.descRu : tool.descEn}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${col.color} text-white font-bold rounded-2xl transition-all hover:opacity-90 hover:shadow-lg`}
          >
            ✦ {lang === 'ru' ? 'Все 214 инструментов' : 'All 214 tools'}
          </Link>
        </div>
      </div>
    </div>
  )
}
