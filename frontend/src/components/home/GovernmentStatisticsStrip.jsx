import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Users, FileText, CheckCircle2, Building2, Layers, Heart, MapPin, Loader2 } from 'lucide-react'
import { publicApi } from '../../services/api'

const DEMO_STATS = {
  citizens: '—',
  applications: '—',
  sla_compliance: '—',
  departments: '—',
  services: '—',
  schemes: '—',
  esevai_centres: '—',
}

const statConfig = [
  { key: 'citizens', labelKey: 'stats.citizens', icon: Users, suffix: '+' },
  { key: 'applications', labelKey: 'stats.applications', icon: FileText, suffix: '+' },
  { key: 'sla_compliance', labelKey: 'stats.sla', icon: CheckCircle2, suffix: '%' },
  { key: 'departments', labelKey: 'stats.departments', icon: Building2, suffix: '' },
  { key: 'services', labelKey: 'stats.services', icon: Layers, suffix: '+' },
  { key: 'schemes', labelKey: 'stats.schemes', icon: Heart, suffix: '+' },
  { key: 'esevai_centres', labelKey: 'stats.esevai', icon: MapPin, suffix: '+' },
]

export default function GovernmentStatisticsStrip() {
  const { t } = useTranslation()
  const [stats, setStats] = useState(DEMO_STATS)
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    publicApi.getStatistics()
      .then(res => { if (res.data) setStats({ ...DEMO_STATS, ...res.data }) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="stats-gradient py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-white/60 text-xs uppercase tracking-widest mb-6">{t('stats.title')}</p>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-white/50" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6" ref={ref}>
            {statConfig.map(({ key, labelKey, icon: Icon, suffix }) => (
              <div key={key} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/80" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {stats[key] !== '—' ? `${stats[key]}${suffix}` : (
                    <span className="text-white/40 text-base">Loading…</span>
                  )}
                </div>
                <div className="text-white/60 text-xs leading-tight">{t(labelKey)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
