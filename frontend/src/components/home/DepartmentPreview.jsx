import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Building2, ChevronRight, ArrowRight, Loader2 } from 'lucide-react'
import { publicApi } from '../../services/api'

const DEMO_DEPTS = [
  { id: 1, name: 'Revenue & Disaster Management', name_ta: 'வருவாய் & பேரிடர் மேலாண்மை', services_count: 48, icon: '🏛️' },
  { id: 2, name: 'Health & Family Welfare', name_ta: 'சுகாதாரம் & குடும்ப நலன்', services_count: 32, icon: '🏥' },
  { id: 3, name: 'School Education', name_ta: 'பள்ளிக் கல்வி', services_count: 24, icon: '🎓' },
  { id: 4, name: 'Transport', name_ta: 'போக்குவரத்து', services_count: 19, icon: '🚗' },
  { id: 5, name: 'Agriculture', name_ta: 'வேளாண்மை', services_count: 15, icon: '🌾' },
  { id: 6, name: 'Labour & Employment', name_ta: 'தொழிலாளர் & வேலைவாய்ப்பு', services_count: 22, icon: '⚙️' },
]

export default function DepartmentPreview() {
  const { t, i18n } = useTranslation()
  const [depts, setDepts] = useState(DEMO_DEPTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    publicApi.getDepartments({ limit: 6 })
      .then(res => { if (res.data?.departments?.length) setDepts(res.data.departments.slice(0, 6)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('departments.title')}</h2>
            <p className="text-gray-500 text-sm">{t('departments.subtitle')}</p>
            <div className="w-16 h-1 bg-purple-600 rounded mt-2" />
          </div>
          <Link to="/departments" className="hidden sm:flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-medium">
            {t('departments.view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {depts.map((dept) => {
              const name = i18n.language === 'ta' && dept.name_ta ? dept.name_ta : dept.name
              return (
                <Link
                  key={dept.id}
                  to={`/departments/${dept.id}`}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-purple-200 transition-all group flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {dept.icon || '🏛️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm leading-tight">{name}</div>
                    {dept.services_count > 0 && (
                      <div className="text-xs text-gray-500 mt-0.5">{dept.services_count} services</div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        )}

        <div className="sm:hidden mt-4 text-center">
          <Link to="/departments" className="inline-flex items-center gap-2 text-purple-700 text-sm font-medium">
            {t('departments.view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
