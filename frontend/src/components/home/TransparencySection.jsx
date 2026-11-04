import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrendingUp, Info, BarChart3, Database, ArrowRight } from 'lucide-react'

const icons = [TrendingUp, Info, BarChart3, Database]
const colors = [
  { icon: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { icon: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  { icon: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
]

export default function TransparencySection() {
  const { t } = useTranslation()
  const items = t('transparency.items', { returnObjects: true })

  return (
    <section className="bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('transparency.title')}</h2>
          <p className="text-gray-500 text-sm">{t('transparency.subtitle')}</p>
          <div className="w-16 h-1 bg-purple-600 rounded mx-auto mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {items.map((item, i) => {
            const Icon = icons[i]
            const c = colors[i]
            return (
              <div key={item} className={`bg-white border ${c.border} rounded-2xl p-6 text-center hover:shadow-md transition-shadow`}>
                <div className={`w-12 h-12 ${c.bg} ${c.icon} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{item}</h3>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            to="/transparency"
            className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium text-sm"
          >
            {t('transparency.view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
