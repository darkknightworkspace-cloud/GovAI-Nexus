import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from 'lucide-react'
import { publicApi } from '../../services/api'

const DEMO_SCHEMES = [
  {
    id: 1,
    name: 'Kalaignar Magalir Urimai Thogai',
    name_ta: 'கலைஞர் மகளிர் உரிமை தொகை',
    description: 'Monthly financial assistance for eligible women to strengthen family welfare and empowerment.',
    status: 'active',
    category: 'Women & Family',
  },
  {
    id: 2,
    name: 'Chief Minister\'s Breakfast Scheme',
    name_ta: 'முதல்வரின் காலை உணவு திட்டம்',
    description: 'Free nutritious breakfast for government school students to improve attendance and health.',
    status: 'active',
    category: 'Education',
  },
  {
    id: 3,
    name: 'Namma Ooru Namma Paadhai',
    name_ta: 'நம்ம ஊரு நம்ம பாதை',
    description: 'Rural road development initiative connecting villages to major transport networks.',
    status: 'active',
    category: 'Infrastructure',
  },
]

export default function FeaturedSchemeCarousel() {
  const { t, i18n } = useTranslation()
  const [schemes, setSchemes] = useState(DEMO_SCHEMES)
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    publicApi.getFeaturedSchemes()
      .then(res => { if (res.data?.schemes?.length) setSchemes(res.data.schemes) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % schemes.length), 5000)
    return () => clearInterval(timer)
  }, [schemes.length])

  const prev = () => setCurrent(c => (c - 1 + schemes.length) % schemes.length)
  const next = () => setCurrent(c => (c + 1) % schemes.length)

  const scheme = schemes[current]
  const displayName = i18n.language === 'ta' && scheme.name_ta ? scheme.name_ta : scheme.name

  const categoryColors = {
    'Women & Family': 'bg-pink-100 text-pink-700',
    'Education': 'bg-blue-100 text-blue-700',
    'Infrastructure': 'bg-orange-100 text-orange-700',
    'Health': 'bg-green-100 text-green-700',
    'Agriculture': 'bg-lime-100 text-lime-700',
  }

  return (
    <div className="bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] rounded-2xl p-6 text-white h-full flex flex-col min-h-[320px] relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-white/20 border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full">
            {t('featured_scheme.badge')}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/20`}>
            {scheme.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="w-6 h-6 animate-spin text-white/60" />
            </div>
          ) : (
            <>
              {/* Person illustration placeholder */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👩</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{displayName}</h3>
                  <p className="text-white/80 text-sm mt-1 leading-relaxed line-clamp-2">{scheme.description}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4">
          <Link
            to={`/schemes/${scheme.id}`}
            className="flex items-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            {t('featured_scheme.apply')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={`/schemes/${scheme.id}`}
            className="text-white/80 hover:text-white text-sm underline underline-offset-2"
          >
            {t('featured_scheme.details')}
          </Link>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
          <div className="flex gap-1.5">
            {schemes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={prev} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
