import { useState, useMemo, useEffect, useRef } from 'react'
import { tools, categoryList } from './data/tools'
import { t } from './i18n'

function ToolCard({ tool, lang, favorites, onToggleFav, isDark, likes, myLikes, onLike, onOpenModal }) {
  const tr = t[lang]
  const isFav = favorites.includes(tool.id)
  const likeCount = likes[tool.id] || 0
  const iLiked = myLikes.includes(tool.id)

  return (
    <div
      className={`card-anim group theme-card border rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30 hover:border-purple-500/60 cursor-pointer min-w-0 ${
        tool.sponsored
          ? isDark
            ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-yellow-500/30 shadow-yellow-500/10 shadow-md'
            : 'bg-white border-yellow-400/40 shadow-yellow-400/10 shadow-md'
          : isDark
            ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/40'
            : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
      onClick={() => onOpenModal(tool)}
    >
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-3xl flex-shrink-0">{tool.icon}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-bold text-base group-hover:text-purple-400 transition-colors leading-tight theme-text ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {tool.name}
              </h3>
              {tool.sponsored && (
                <span className="text-xs px-2 py-0.5 bg-yellow-900/50 text-yellow-400 border border-yellow-600/40 rounded-full">
                  {tr.sponsored}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 border border-green-700/40 rounded-full inline-block">
                {lang === 'ru' ? tool.badgeRu : tool.badgeEn}
              </span>
              {tool.vpn && (
                <span title={tr.vpnTooltip} className="text-xs px-2 py-0.5 bg-orange-900/50 text-orange-400 border border-orange-700/40 rounded-full inline-block cursor-help">
                  🔒 VPN
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onLike(tool.id) }}
            className={`flex items-center gap-0.5 text-sm leading-none p-1 hover:scale-110 transition-transform ${iLiked ? 'text-pink-400' : 'text-gray-500 hover:text-pink-400'}`}
            aria-label="Like"
            title={iLiked ? 'Убрать лайк' : 'Нравится'}
          >
            {iLiked ? '👍' : '👍'}{likeCount > 0 && <span className="text-xs font-semibold">{likeCount}</span>}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onToggleFav(tool.id) }}
            className="text-base leading-none p-1 hover:scale-125 transition-transform"
            aria-label="Toggle favorite"
          >
            {isFav ? '❤️' : '🤍'}
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-gray-500 hover:text-purple-400 transition-colors text-base p-1"
            aria-label="Open tool"
          >↗</a>
        </div>
      </div>
      <p className={`text-sm leading-relaxed theme-muted ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {lang === 'ru' ? tool.descRu : tool.descEn}
      </p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {(lang === 'ru' ? tool.tagsRu : tool.tagsEn).map(tag => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full theme-tag ${isDark ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [lang, setLang] = useState(() => localStorage.getItem('freeai_lang') || 'ru')
  const [noVpnOnly, setNoVpnOnly] = useState(false)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('freeai_favs') || '[]'))
  const [isDark, setIsDark] = useState(() => localStorage.getItem('freeai_theme') !== 'light')
  const [likeCounts, setLikeCounts] = useState(() => JSON.parse(localStorage.getItem('freeai_likes') || '{}'))
  const [myLikes, setMyLikes] = useState(() => JSON.parse(localStorage.getItem('freeai_liked') || '[]'))
  const [sortByLikes, setSortByLikes] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  const catsRef = useRef(null)
  const tr = t[lang]

  useEffect(() => {
    const el = catsRef.current
    if (!el) return
    const handler = (e) => { e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  useEffect(() => {
    localStorage.setItem('freeai_favs', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('freeai_likes', JSON.stringify(likeCounts))
  }, [likeCounts])

  useEffect(() => {
    localStorage.setItem('freeai_liked', JSON.stringify(myLikes))
  }, [myLikes])

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
    localStorage.setItem('freeai_theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    if (!selectedTool) return
    const handler = (e) => { if (e.key === 'Escape') setSelectedTool(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedTool])

  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const handleLike = (id) => {
    const alreadyLiked = myLikes.includes(id)
    if (alreadyLiked) {
      setMyLikes(prev => prev.filter(x => x !== id))
      setLikeCounts(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }))
    } else {
      setMyLikes(prev => [...prev, id])
      setLikeCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    }
  }

  const setLanguage = (l) => {
    setLang(l)
    localStorage.setItem('freeai_lang', l)
  }

  const categories = [
    { id: 'all', color: 'from-purple-500 to-pink-500', label: tr.categories['all'] },
    { id: 'favorites', color: 'from-red-500 to-pink-500', label: tr.favorites },
    ...categoryList.filter(c => c.id !== 'all').map(c => ({
      ...c,
      label: tr.categories[c.id],
    })),
  ]

  const filtered = useMemo(() => {
    let result = tools
    if (activeCategory === 'favorites') result = result.filter(t => favorites.includes(t.id))
    else if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory)
    if (noVpnOnly) result = result.filter(t => !t.vpn)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(q) ||
        (lang === 'ru' ? tool.descRu : tool.descEn).toLowerCase().includes(q) ||
        (lang === 'ru' ? tool.tagsRu : tool.tagsEn).some(tag => tag.toLowerCase().includes(q))
      )
    }
    if (sortByLikes) {
      result = [...result].sort((a, b) => (likeCounts[b.id] || 0) - (likeCounts[a.id] || 0))
    }
    return result
  }, [activeCategory, search, lang, noVpnOnly, favorites, sortByLikes, likeCounts])

  const activeCat = categories.find(c => c.id === activeCategory)

  const handleRandom = () => {
    if (filtered.length === 0) return
    const pick = filtered[Math.floor(Math.random() * filtered.length)]
    window.open(pick.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`min-h-screen overflow-x-hidden theme-bg ${isDark ? 'bg-gray-950 text-white' : 'bg-slate-100 text-gray-900'}`}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 theme-hdr-grad ${isDark ? 'bg-gradient-to-br from-purple-950 via-gray-950 to-blue-950' : ''} pointer-events-none`} />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -right-20 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10 text-center">
          {/* Theme toggle - top left */}
          <button
            onClick={() => setIsDark(d => !d)}
            className={`absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-xl text-lg border transition-all theme-langbtn ${isDark ? 'bg-gray-800/80 border-gray-700/50 hover:border-gray-500' : 'bg-white/80 border-gray-200 hover:border-gray-300'}`}
            title={isDark ? 'Светлая тема' : 'Тёмная тема'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Lang toggle */}
          <div className={`absolute top-4 right-4 flex gap-1 theme-langbtn border rounded-xl p-1 ${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200'}`}>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${lang === 'ru' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${lang === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/40 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-5">
            <span>⚡</span> {tr.tagline}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-3 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
            ✦ FreeAI
          </h1>
          <p className="text-xl font-semibold text-gray-300 mb-2">{tr.subtitle}</p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">{tr.desc}</p>

          {/* VPN filter + Random */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setNoVpnOnly(v => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all theme-filterbtn ${
                noVpnOnly
                  ? 'bg-orange-600/30 border-orange-500/60 text-orange-400'
                  : isDark ? 'bg-gray-800/60 border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {noVpnOnly ? '✅' : '🔒'} {tr.showVpn}
            </button>
            <button
              onClick={handleRandom}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all theme-filterbtn ${isDark ? 'bg-gray-800/60 border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}
            >
              {tr.randomBtn}
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            <input
              type="text"
              placeholder={tr.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full theme-input border rounded-2xl pl-11 pr-5 py-3.5 placeholder-gray-400 focus:outline-none focus:border-purple-500/60 transition-all ${isDark ? 'bg-gray-800/80 border-gray-700/60 text-white placeholder-gray-500 focus:bg-gray-800' : 'bg-white border-gray-200 text-gray-900'}`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xl"
              >×</button>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={`sticky top-0 z-10 theme-catbar backdrop-blur-md border-b ${isDark ? 'bg-gray-950/90 border-gray-800/50' : 'bg-slate-50/95 border-gray-200'}`}>
        <div className="relative max-w-7xl mx-auto">
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 ${isDark ? 'bg-gradient-to-r from-gray-950/90 to-transparent' : 'bg-gradient-to-r from-slate-50/95 to-transparent'}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 ${isDark ? 'bg-gradient-to-l from-gray-950/90 to-transparent' : 'bg-gradient-to-l from-slate-50/95 to-transparent'}`} />
          <div
            className="px-4 py-3 flex gap-2 overflow-x-auto"
            ref={catsRef}
            style={{scrollbarWidth:'none'}}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all theme-catbtn ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-purple-500/20`
                    : isDark ? 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category banner */}
      {activeCategory !== 'all' && activeCat && tr.categoryDesc && tr.categoryDesc[activeCategory] && (
        <div className={`bg-gradient-to-r ${activeCat.color} py-5 px-4`} style={{animation: 'fadeInUp 0.3s ease forwards'}}>
          <div className="max-w-7xl mx-auto">
            <p className="text-white/90 text-sm">{tr.categoryDesc[activeCategory]}</p>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold theme-text ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {search ? tr.resultsLabel(search) : activeCat?.label}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSortByLikes(v => !v)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                sortByLikes
                  ? 'bg-pink-600/30 border-pink-500/60 text-pink-400'
                  : isDark ? 'bg-gray-800/60 border-gray-700/50 text-gray-400 hover:text-white' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900'
              }`}
            >
              👍 {tr.sortLikes}
            </button>
            <span className={`text-sm theme-muted ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{tr.toolsCount(filtered.length)}</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-lg">{tr.noResults}</p>
            <p className="text-sm mt-1">{tr.noResultsSub}</p>
          </div>
        ) : (
          <div key={activeCategory + search} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                lang={lang}
                favorites={favorites}
                onToggleFav={toggleFav}
                isDark={isDark}
                likes={likeCounts}
                myLikes={myLikes}
                onLike={handleLike}
                onOpenModal={setSelectedTool}
              />
            ))}
          </div>
        )}
      </div>

      {/* Suggest a tool */}
      <div className="max-w-xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-700/30 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🤔</div>
          <h3 className="text-lg font-bold text-white mb-2">{tr.suggestTitle}</h3>
          <p className="text-gray-400 text-sm mb-5">{tr.suggestDesc}</p>
          <a
            href={`https://github.com/Nikhub001/ai-hub/issues/new?title=${encodeURIComponent(tr.suggestIssueTitle)}&body=${encodeURIComponent(tr.suggestMsg)}&labels=suggestion`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30"
          >
            ✉️ {tr.suggestBtn}
          </a>
        </div>
      </div>

      {/* Support the author */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <div className={`rounded-2xl p-4 border text-center ${isDark ? 'bg-gray-900/60 border-gray-800/50' : 'bg-white border-gray-200'}`}>
          <p className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {lang === 'ru' ? '☕ Поддержать автора' : '☕ Support the author'}
          </p>
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50 border border-gray-200'}`}>
            <span className="text-yellow-500 text-sm">◈</span>
            <span className={`text-xs font-mono flex-1 truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              0xd2903900eb4755fEFa55E07767AC21A49a125813
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText('0xd2903900eb4755fEFa55E07767AC21A49a125813')
                const btn = document.getElementById('copy-wallet-btn')
                if (btn) { btn.textContent = '✅'; setTimeout(() => { btn.textContent = '📋' }, 1500) }
              }}
              id="copy-wallet-btn"
              className={`text-sm px-2 py-0.5 rounded-lg transition-all flex-shrink-0 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
              title="Copy address"
            >📋</button>
          </div>
          <p className={`text-xs mt-1.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>BEP20</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 py-8 text-center text-gray-600 text-sm" style={{borderTop: '1px solid transparent', background: 'linear-gradient(#030712, #030712) padding-box, linear-gradient(to right, #7c3aed33, #3b82f633, #ec489933) border-box'}}>
        <p>{tr.footer(tools.length)}</p>
      </footer>

      {/* Tool detail modal */}
      {selectedTool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedTool(null)}
        >
          <div
            className={`border rounded-2xl p-6 max-w-md w-full relative ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700/50 transition-all"
            >×</button>

            <div className="text-5xl mb-3">{selectedTool.icon}</div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTool.name}</h2>
              {selectedTool.sponsored && (
                <span className="text-xs px-2 py-0.5 bg-yellow-900/50 text-yellow-400 border border-yellow-600/40 rounded-full">
                  {tr.sponsored}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                {tr.categories[selectedTool.category] || selectedTool.category}
              </span>
              <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 border border-green-700/40 rounded-full">
                {lang === 'ru' ? selectedTool.badgeRu : selectedTool.badgeEn}
              </span>
              {selectedTool.vpn && (
                <span className="text-xs px-2 py-0.5 bg-orange-900/50 text-orange-400 border border-orange-700/40 rounded-full">
                  🔒 VPN
                </span>
              )}
            </div>

            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {lang === 'ru' ? selectedTool.descRu : selectedTool.descEn}
            </p>

            <div className="flex flex-wrap gap-1 mb-5">
              {(lang === 'ru' ? selectedTool.tagsRu : selectedTool.tagsEn).map(tag => (
                <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLike(selectedTool.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${myLikes.includes(selectedTool.id) ? 'text-pink-400 border-pink-500/60 bg-pink-500/10' : 'text-gray-400 border-gray-600 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10'}`}
              >
                👍 {likeCounts[selectedTool.id] || 0}
              </button>
              <a
                href={selectedTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30"
              >
                ↗ {tr.openTool}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
