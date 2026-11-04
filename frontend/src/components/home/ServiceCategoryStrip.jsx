import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FileText, CreditCard, Shield, Layers, Heart, Landmark } from 'lucide-react'

const categories = [
  { key: 'certificates', icon: FileText, href: '/services/certificates', color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'identity', icon: CreditCard, href: '/services/identity', color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'licences', icon: Shield, href: '/services/licences', color: 'text-teal-600', bg: 'bg-teal-50' },
  { key: 'land', icon: Layers, href: '/services/land-revenue', color: 'text-orange-600', bg: 'bg-orange-50' },
  { key: 'welfare', icon: Heart, href: '/schemes', color: 'text-pink-600', bg: 'bg-pink-50' },
  { key: 'departments', icon: Landmark, href: '/departments', color: 'text-indigo-600', bg: 'bg-indigo-50' },
]

export default function ServiceCategoryStrip() {
  const { t } = useTranslation()

  return (
    <div className="-mt-8 relative z-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ key, icon: Icon, href, color, bg }) => {
              const item = t(`categories.items.${key}`, { returnObjects: true })
              return (
                <Link
                  key={key}
                  to={href}
                  className="group flex flex-col items-center text-center gap-2.5 p-3 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 leading-tight">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{item.desc}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
