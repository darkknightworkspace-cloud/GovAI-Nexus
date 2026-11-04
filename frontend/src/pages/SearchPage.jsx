import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Loader2, FileText, Building2, Heart, ChevronRight } from 'lucide-react'
import { publicApi } from '../services/api'

const typeIcons = { service: FileText, department: Building2, scheme: Heart }
const typeColors = { service: 'text-blue-600 bg-blue-50', department: 'text-purple-600 bg-purple-50', scheme: 'text-pink-600 bg-pink-50' }

export default function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    publicApi.search(q)
      .then(res => { setResults(res.data?.results || []); setTotal(res.data?.total || 0) })
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [q])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) setSearchParams({ q: query.trim() })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 overflow-hidden pr-1.5">
            <Search className="ml-4 text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('hero.search_placeholder')}
              className="flex-1 px-3 py-3.5 text-gray-800 text-sm focus:outline-none"
            />
            <button type="submit" className="bg-[#6D28D9] text-white px-6 py-2.5 rounded-full text-sm font-semibold">
              {t('hero.search_btn')}
            </button>
          </div>
        </form>

        {q && <p className="text-sm text-gray-500 mb-4">
          {loading ? 'Searching...' : `${total} results for "${q}"`}
        </p>}

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-purple-400" /></div>
        ) : results.length > 0 ? (
          <div className="space-y-3">
            {results.map((r, i) => {
              const Icon = typeIcons[r.type] || FileText
              const colorClass = typeColors[r.type] || 'text-gray-600 bg-gray-50'
              return (
                <Link key={i} to={r.href || '#'} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-4 hover:shadow-md transition-shadow group">
                  <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-purple-700">{r.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.description}</div>
                    <div className="text-xs text-gray-400 mt-1 capitalize">{r.type}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 mt-1 flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        ) : q ? (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm">No results found for "{q}"</p>
            <p className="text-xs mt-1">Try different keywords or browse categories</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
