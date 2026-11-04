import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check, ArrowRight, Smartphone } from 'lucide-react'

export default function CitizenPortalPromotion() {
  const { t } = useTranslation()
  const features = t('citizen_portal.features', { returnObjects: true })

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#102A43] to-[#1e3a5f] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-4 py-1.5 text-purple-300 text-xs font-medium mb-6 w-fit">
                GovAI Nexus Citizen Portal
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t('citizen_portal.title')}</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{t('citizen_portal.desc')}</p>

              <ul className="space-y-2.5 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/citizen"
                  className="flex items-center gap-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  {t('citizen_portal.explore')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/citizen/login"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  {t('citizen_portal.signin')}
                </Link>
              </div>
            </div>

            {/* Right illustration */}
            <div className="relative hidden lg:flex items-center justify-center p-8">
              <div className="relative">
                {/* Phone mockup */}
                <div className="w-48 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200 relative">
                  <div className="bg-[#6D28D9] h-24 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-xs font-bold">GovAI Nexus</div>
                      <div className="text-[10px] text-white/70">Citizen Portal</div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {['Income Certificate', 'Track Application', 'Schemes'].map(item => (
                      <div key={item} className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-purple-100 flex-shrink-0" />
                        <div className="text-[10px] text-gray-600 font-medium">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-500/20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
