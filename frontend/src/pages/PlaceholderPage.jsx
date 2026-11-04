import { Link, useLocation } from 'react-router-dom'
import { Construction, ArrowLeft } from 'lucide-react'

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const name = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-purple-600" />
      </div>
      <h1 className="text-xl font-bold text-gray-800 capitalize mb-2">{name || 'Page'}</h1>
      <p className="text-gray-500 text-sm mb-6">This section is under development.</p>
      <Link to="/" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  )
}
