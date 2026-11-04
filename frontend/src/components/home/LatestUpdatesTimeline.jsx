import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Loader2 } from 'lucide-react'
import { publicApi } from '../../services/api'

const DEMO_UPDATES = [
  { id: 1, date: '03 Nov 2026', title: 'G.O. Ms. No. 214 – Revised guidelines for Income Certificate issuance.', category: 'Government Order', is_new: true },
  { id: 2, date: '01 Nov 2026', title: 'Special camp for Community Certificate – Nov 10–15 in all Districts.', category: 'Service Announcement', is_new: true },
  { id: 3, date: '30 Oct 2026', title: 'Extension of working hours at e-Sevai Centres for public convenience.', category: 'Service Update', is_new: false },
  { id: 4, date: '28 Oct 2026', title: 'Online submission now available for Nativity Certificate applications.', category: 'Digital Initiative', is_new: false },
]

const categoryColors = {
  'Government Order': 'bg-blue-100 text-blue-700',
  'Service Announcement': 'bg-green-100 text-green-700',
  'Service Update': 'bg-orange-100 text-orange-700',
  'Digital Initiative': 'bg-purple-100 text-purple-700',
  'Scheme Update': 'bg-pink-100 text-pink-700',
}

export default function LatestUpdatesTimeline() {
  const { t } = useTranslation()
  const [updates, setUpdates] = useState(DEMO_UPDATES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    publicApi.getAnnouncements({ limit: 4 })
      .then(res => { if (res.data?.announcements?.length) setUpdates(res.data.announcements) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-[#6D28D9]" />
          <h3 className="text-base font-bold text-gray-900">{t('updates.title')}</h3>
        </div>
        <Link to="/announcements" className="text-purple-600 hover:text-purple-800 text-xs font-medium flex items-center gap-1">
          {t('updates.view_all')} <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {updates.map((item, idx) => (
            <Link
              key={item.id || idx}
              to={`/announcements/${item.id}`}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]" />
                {idx < updates.length - 1 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">{item.date || item.created_at}</span>
                  {item.is_new && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {t('updates.new')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors">
                  {item.title}
                </p>
                {item.category && (
                  <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                    {item.category}
                  </span>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1 group-hover:text-purple-500 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
