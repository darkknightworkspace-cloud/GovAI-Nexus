import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Bot, FileSearch, Bell, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const handleChip = (chip) => navigate(`/search?q=${encodeURIComponent(chip)}`)

  const chips = t('hero.chips', { returnObjects: true })

  const quickActions = [
    { icon: Bot, title: t('hero.ask_govai'), desc: t('hero.ask_govai_desc'), href: '/ai-assistant', color: 'text-purple-600' },
    { icon: FileSearch, title: t('hero.track'), desc: t('hero.track_desc'), href: '/track-application', color: 'text-blue-600' },
    { icon: Bell, title: t('hero.notifications'), desc: t('hero.notifications_desc'), href: '/notifications', color: 'text-teal-600' },
  ]

  return (
    <section className="hero-gradient min-h-[520px] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-800/20 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left content */}
        <div className="text-white space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-white/80 tracking-widest uppercase">
            {t('hero.pre')}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="text-white">{t('hero.title1')} </span>
            <span className="text-purple-300">{t('hero.title2')}</span>
          </h1>

          <p className="text-xl font-semibold text-white/90">{t('hero.subtitle')}</p>

          <p className="text-white/70 text-sm leading-relaxed max-w-lg">{t('hero.desc')}</p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden pr-1.5">
              <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('hero.search_placeholder')}
                className="flex-1 pl-12 pr-3 py-3.5 text-gray-800 text-sm focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0"
              >
                {t('hero.search_btn')}
              </button>
            </div>
          </form>

          {/* Popular chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white/60 text-xs flex items-center gap-1">
              <span className="text-orange-400">↗</span> {t('hero.popular')}
            </span>
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                className="bg-white/10 border border-white/20 hover:bg-white/20 text-white/90 text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Govt building illustration + floating cards */}
        <div className="relative hidden lg:flex flex-col items-end gap-3">
          {/* Govt building placeholder */}
          <div className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent z-10" />
            <div className="w-full h-full bg-gradient-to-b from-blue-800/40 to-purple-900/40 flex items-center justify-center">
              {/* Stylized govt building SVG */}
              <svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
                {/* Sky */}
                <rect width="400" height="280" fill="url(#sky)" rx="12"/>
                <defs>
                  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d2d5e"/>
                    <stop offset="100%" stopColor="#1e4080"/>
                  </linearGradient>
                </defs>
                {/* Clouds */}
                <ellipse cx="80" cy="60" rx="40" ry="15" fill="white" opacity="0.08"/>
                <ellipse cx="300" cy="40" rx="50" ry="18" fill="white" opacity="0.06"/>
                {/* Main building */}
                <rect x="80" y="140" width="240" height="130" fill="#1e3a6e"/>
                <rect x="100" y="130" width="200" height="20" fill="#1e3a6e"/>
                {/* Columns */}
                {[120,150,180,210,240,260].map((x, i) => (
                  <rect key={i} x={x} y="150" width="12" height="120" fill="#2563eb" opacity="0.4" rx="2"/>
                ))}
                {/* Dome */}
                <ellipse cx="200" cy="130" rx="60" ry="30" fill="#6D28D9" opacity="0.7"/>
                <ellipse cx="200" cy="115" rx="30" ry="20" fill="#7C3AED" opacity="0.8"/>
                {/* Flag */}
                <rect x="197" y="80" width="3" height="35" fill="#e5e7eb"/>
                <rect x="200" y="83" width="20" height="12" fill="#f97316" rx="1"/>
                <rect x="200" y="88" width="20" height="4" fill="white" rx="1"/>
                <rect x="200" y="91" width="20" height="4" fill="#16a34a" rx="1"/>
                {/* Steps */}
                <rect x="90" y="265" width="220" height="8" fill="#1a3a6e"/>
                <rect x="70" y="270" width="260" height="10" fill="#1a3a6e"/>
                {/* Trees */}
                <ellipse cx="50" cy="220" rx="20" ry="30" fill="#166534" opacity="0.6"/>
                <rect x="47" y="250" width="6" height="20" fill="#374151"/>
                <ellipse cx="350" cy="225" rx="20" ry="28" fill="#166534" opacity="0.6"/>
                <rect x="347" y="253" width="6" height="17" fill="#374151"/>
                {/* GovAI text overlay */}
                <text x="200" y="250" textAnchor="middle" fill="white" fontSize="10" opacity="0.6" fontFamily="Inter">Tamil Nadu Government Secretariat</text>
              </svg>
            </div>
            <div className="absolute bottom-2 right-3 z-20">
              <span className="text-white/50 text-xs font-tamil">தமிழ்நாடு அரசு</span>
            </div>
          </div>

          {/* Floating quick-action cards */}
          <div className="absolute right-0 top-4 flex flex-col gap-3 w-56">
            {quickActions.map(({ icon: Icon, title, desc, href, color }) => (
              <a
                key={title}
                href={href}
                className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 hover:shadow-xl transition-shadow group"
              >
                <div className={`w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center ${color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 leading-tight">{title}</div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">{desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="lg:hidden px-4 pb-6 grid grid-cols-3 gap-2">
        {quickActions.map(({ icon: Icon, title, href, color }) => (
          <a key={title} href={href} className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-white/80 text-xs font-medium leading-tight">{title}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
