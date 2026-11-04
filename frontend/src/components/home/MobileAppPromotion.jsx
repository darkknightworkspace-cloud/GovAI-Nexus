import { useTranslation } from 'react-i18next'
import { Check, Smartphone } from 'lucide-react'

export default function MobileAppPromotion() {
  const { t } = useTranslation()
  const features = t('mobile_app.features', { returnObjects: true })

  return (
    <section className="py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs mb-6">
                <Smartphone className="w-3.5 h-3.5" />
                GovAI Nexus Mobile App
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{t('mobile_app.title')}</h2>
              <ul className="space-y-2.5 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Store buttons */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 cursor-not-allowed opacity-70">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none">{t('mobile_app.coming_soon')}</div>
                    <div className="text-white text-xs font-semibold leading-tight">{t('mobile_app.play_store')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 cursor-not-allowed opacity-70">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5l-9-5.196V8l9 5.196v3.304z"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none">{t('mobile_app.coming_soon')}</div>
                    <div className="text-white text-xs font-semibold leading-tight">{t('mobile_app.app_store')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: phone illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-44 h-72 bg-white/10 border-4 border-white/20 rounded-3xl overflow-hidden">
                  <div className="bg-white/20 h-8 flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-white/40 rounded-full" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="bg-purple-700/50 rounded-xl p-3 text-white text-xs font-bold text-center">GovAI Nexus</div>
                    {['Services', 'Schemes', 'Track', 'AI Chat'].map(item => (
                      <div key={item} className="bg-white/10 rounded-lg p-2.5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white/20" />
                        <div className="text-white/70 text-xs">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-pink-500/20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
