import { useTranslation } from 'react-i18next'
import { Phone, Accessibility, Map, Mail } from 'lucide-react'

export default function GovernmentUtilityBar() {
  const { t } = useTranslation()

  return (
    <div className="bg-[#071B3B] text-white py-1.5 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-y-1">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#1a3a5c] flex items-center justify-center overflow-hidden flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400">
              <circle cx="12" cy="12" r="10" fill="#1a3a5c" stroke="#f59e0b" strokeWidth="1.5"/>
              <path d="M12 4 L14 9 L19 9 L15 13 L17 18 L12 15 L7 18 L9 13 L5 9 L10 9 Z" fill="#f59e0b"/>
            </svg>
          </div>
          <span className="font-medium text-white/90">{t('topbar.govt')}</span>
          <span className="text-white/60">|</span>
          <span className="text-white/80 font-tamil">{t('topbar.govt') === 'Government of Tamil Nadu' ? 'தமிழ்நாடு அரசு' : t('topbar.govt')}</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-white/80">
          <a href="tel:1967" className="flex items-center gap-1 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            <span>{t('topbar.helpline')}</span>
          </a>
          <span className="text-white/30">|</span>
          <a href="/accessibility" className="flex items-center gap-1 hover:text-white transition-colors">
            <Accessibility className="w-3 h-3" />
            <span>{t('topbar.accessibility')}</span>
          </a>
          <span className="text-white/30">|</span>
          <a href="/sitemap" className="flex items-center gap-1 hover:text-white transition-colors">
            <Map className="w-3 h-3" />
            <span>{t('topbar.sitemap')}</span>
          </a>
          <span className="text-white/30">|</span>
          <a href="/contact" className="flex items-center gap-1 hover:text-white transition-colors">
            <Mail className="w-3 h-3" />
            <span>{t('topbar.contact')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
