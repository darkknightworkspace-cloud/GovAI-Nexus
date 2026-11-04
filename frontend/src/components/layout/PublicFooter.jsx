import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.2 3 12 3 12 3s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.4 12 21.4 12 21.4s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5v-7.3l8.1 3.7-8.1 3.6z"/>
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

export default function PublicFooter() {
  const { t } = useTranslation()

  const aboutItems = t('footer.about_items', { returnObjects: true })
  const infoItems = t('footer.info_items', { returnObjects: true })
  const supportItems = t('footer.support_items', { returnObjects: true })
  const linkItems = t('footer.link_items', { returnObjects: true })

  const aboutLinks = ['/about/tamil-nadu', '/about/govai-nexus', '/about/vision']
  const infoLinks = ['/resources/government-orders', '/resources/policies', '/resources/manuals']
  const supportLinks = ['/citizen-guide', '/faqs', '/help/technical', '/contact']
  const externalLinks = ['https://www.tn.gov.in/esevai', 'https://digilocker.gov.in', 'https://web.umang.gov.in', 'https://india.gov.in']

  return (
    <footer className="bg-[#071B3B] text-white relative overflow-hidden">
      {/* Wave top */}
      <div className="relative">
        <svg viewBox="0 0 1440 48" className="w-full fill-gray-50 -mb-1">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z"/>
        </svg>
      </div>

      {/* Purple accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#4C1D95]" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] flex items-center justify-center">
                <span className="text-white font-bold text-sm">GN</span>
              </div>
              <div>
                <div className="font-bold text-white">GovAI <span className="text-purple-400">Nexus</span></div>
                <div className="text-[10px] text-white/50">{t('footer.tagline')}</div>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-3">{t('footer.govt')}</p>

            {/* Social */}
            <div className="mt-4">
              <p className="text-white/40 text-xs mb-2">{t('footer.follow')}</p>
              <div className="flex gap-2">
                {[
                  { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
                  { Icon: XIcon, href: '#', label: 'X' },
                  { Icon: FacebookIcon, href: '#', label: 'Facebook' },
                  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white/70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-white/90 text-sm mb-4">{t('footer.about')}</h4>
            <ul className="space-y-2.5">
              {aboutItems.map((item, i) => (
                <li key={i}>
                  <Link to={aboutLinks[i]} className="text-white/55 hover:text-white text-xs transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-white/90 text-sm mb-4">{t('footer.information')}</h4>
            <ul className="space-y-2.5">
              {infoItems.map((item, i) => (
                <li key={i}>
                  <Link to={infoLinks[i]} className="text-white/55 hover:text-white text-xs transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white/90 text-sm mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2.5">
              {supportItems.map((item, i) => (
                <li key={i}>
                  <Link to={supportLinks[i]} className="text-white/55 hover:text-white text-xs transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold text-white/90 text-sm mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2.5">
              {linkItems.map((item, i) => (
                <li key={i}>
                  <a
                    href={externalLinks[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/55 hover:text-white text-xs transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-white/40 text-xs">
          <span>{t('footer.copyright')}</span>
          <div className="flex flex-wrap gap-4">
            {[
              { label: t('footer.privacy'), href: '/privacy-policy' },
              { label: t('footer.terms'), href: '/terms' },
              { label: t('footer.accessibility'), href: '/accessibility' },
              { label: t('footer.disclaimer'), href: '/disclaimer' },
            ].map(({ label, href }) => (
              <Link key={label} to={href} className="hover:text-white/70 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
