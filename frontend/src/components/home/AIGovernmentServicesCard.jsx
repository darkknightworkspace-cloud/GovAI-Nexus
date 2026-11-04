import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react'

export default function AIGovernmentServicesCard() {
  const { t } = useTranslation()
  const features = t('ai_section.features', { returnObjects: true })

  return (
    <div className="bg-gradient-to-br from-[#071B3B] to-[#6D28D9] rounded-2xl p-6 text-white h-full flex flex-col justify-between min-h-[320px]">
      {/* AI chip illustration */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          {/* Orbiting dots */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-300 animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-blue-300 animate-pulse delay-75" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-center mb-1">{t('ai_section.title')}</h3>

        <ul className="space-y-2 mt-4 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/85">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/ai-assistant"
        className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white rounded-full py-2.5 px-5 text-sm font-semibold transition-all group"
      >
        {t('ai_section.cta')}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
