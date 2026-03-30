import { Link } from 'react-router-dom'
import { tools, categoryList } from './data/tools'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-gray-950 to-blue-950 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -right-20 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 pt-14 pb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm mb-6 transition-colors">
            ← Назад к инструментам
          </Link>
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
            ✦ FreeAI
          </h1>
          <p className="text-gray-400 text-lg">О проекте</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* What is */}
        <section className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">🤔 Что такое FreeAI?</h2>
          <p className="text-gray-400 leading-relaxed">
            FreeAI — это каталог лучших бесплатных AI инструментов в одном месте. Мы собираем только те инструменты,
            которые действительно можно использовать без оплаты: с бесплатным планом, пробным периодом или полностью бесплатно.
            Никакого скрытого платного контента.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/30 rounded-2xl p-5 text-center">
            <div className="text-3xl font-black text-white mb-1">{tools.length}+</div>
            <div className="text-purple-300 text-sm">инструментов</div>
          </div>
          <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border border-pink-700/30 rounded-2xl p-5 text-center">
            <div className="text-3xl font-black text-white mb-1">{categoryList.filter(c => c.id !== 'all').length}</div>
            <div className="text-pink-300 text-sm">категорий</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl p-5 text-center">
            <div className="text-3xl font-black text-white mb-1">0 ₽</div>
            <div className="text-blue-300 text-sm">стоимость</div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">🎯 Зачем это сделано?</h2>
          <p className="text-gray-400 leading-relaxed">
            AI инструментов становится всё больше, но найти реально бесплатный и качественный сложно.
            FreeAI создан чтобы сэкономить твоё время — здесь уже собраны, проверены и структурированы лучшие варианты
            по 26 категориям: от генерации картинок до юридических помощников.
          </p>
        </section>

        {/* How to suggest */}
        <section className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">📝 Как добавить инструмент?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Знаешь крутой бесплатный AI которого нет в каталоге? Предложи его через GitHub — мы рассмотрим и добавим.
          </p>
          <a
            href="https://github.com/Nikhub001/ai-hub/issues/new?title=Предложение: добавить AI инструмент&body=Название инструмента: %0AСсылка: %0AКатегория: %0AПочему бесплатный: &labels=suggestion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all"
          >
            📌 Предложить на GitHub
          </a>
        </section>

        {/* GitHub */}
        <section className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">⭐ GitHub</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Проект открытый. Исходный код доступен на GitHub — можешь смотреть, форкать, предлагать улучшения.
          </p>
          <a
            href="https://github.com/Nikhub001/ai-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-xl text-sm transition-all"
          >
            🐙 github.com/Nikhub001/ai-hub
          </a>
        </section>

        {/* Back */}
        <div className="text-center pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl transition-all hover:shadow-lg hover:shadow-purple-500/30"
          >
            ✦ Перейти к инструментам
          </Link>
        </div>
      </div>
    </div>
  )
}
