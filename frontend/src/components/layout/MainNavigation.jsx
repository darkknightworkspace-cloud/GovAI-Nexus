import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, User, ChevronDown, Menu, X, Globe } from 'lucide-react'

function DropdownMenu({ items, onClose }) {
  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] z-50 animate-fade-in-up">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href || '#'}
          onClick={onClose}
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default function MainNavigation() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const navRef = useRef(null)

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ta' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('govai_lang', next)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`)
      setSearchQ('')
      setSearchOpen(false)
    }
  }

  const menus = {
    government: [
      { label: t('nav.govt_menu.about_tn'), href: '/about/tamil-nadu' },
      { label: t('nav.govt_menu.about_govai'), href: '/about/govai-nexus' },
      { label: t('nav.govt_menu.vision'), href: '/about/vision' },
      { label: t('nav.govt_menu.governance'), href: '/about/governance-initiatives' },
    ],
    services: [
      { label: t('nav.services_menu.all'), href: '/services' },
      { label: t('nav.services_menu.certificates'), href: '/services/certificates' },
      { label: t('nav.services_menu.identity'), href: '/services/identity' },
      { label: t('nav.services_menu.licences'), href: '/services/licences' },
      { label: t('nav.services_menu.land'), href: '/services/land-revenue' },
      { label: t('nav.services_menu.transport'), href: '/services/transport' },
      { label: t('nav.services_menu.utility'), href: '/services/utility' },
    ],
    schemes: [
      { label: t('nav.schemes_menu.all'), href: '/schemes' },
      { label: t('nav.schemes_menu.women'), href: '/schemes/women-family' },
      { label: t('nav.schemes_menu.students'), href: '/schemes/education' },
      { label: t('nav.schemes_menu.farmers'), href: '/schemes/agriculture' },
      { label: t('nav.schemes_menu.health'), href: '/schemes/health' },
      { label: t('nav.schemes_menu.seniors'), href: '/schemes/senior-citizens' },
      { label: t('nav.schemes_menu.disabled'), href: '/schemes/differently-abled' },
      { label: t('nav.schemes_menu.employment'), href: '/schemes/employment' },
    ],
    departments: [
      { label: t('nav.depts_menu.directory'), href: '/departments' },
      { label: t('nav.depts_menu.services'), href: '/departments/services' },
      { label: t('nav.depts_menu.contacts'), href: '/departments/contacts' },
    ],
    resources: [
      { label: t('nav.resources_menu.orders'), href: '/resources/government-orders' },
      { label: t('nav.resources_menu.policies'), href: '/resources/policies' },
      { label: t('nav.resources_menu.manuals'), href: '/resources/manuals' },
      { label: t('nav.resources_menu.guide'), href: '/resources/citizen-guide' },
      { label: t('nav.resources_menu.faqs'), href: '/faqs' },
      { label: t('nav.resources_menu.downloads'), href: '/downloads' },
      { label: t('nav.resources_menu.help'), href: '/help' },
    ],
  }

  const navItems = [
    { key: 'government', label: t('nav.government') },
    { key: 'services', label: t('nav.services') },
    { key: 'schemes', label: t('nav.schemes') },
    { key: 'departments', label: t('nav.departments') },
    { key: 'resources', label: t('nav.resources') },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#102A43] to-[#6D28D9] flex items-center justify-center">
            <span className="text-white font-bold text-sm">GN</span>
          </div>
          <div>
            <div className="font-bold text-[#102A43] text-lg leading-tight">
              GovAI <span className="text-[#6D28D9]">Nexus</span>
            </div>
            <div className="text-[10px] text-gray-500 leading-tight">AI-Powered Governance Platform</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/' ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
          >
            {t('nav.home')}
          </Link>
          {navItems.map(({ key, label }) => (
            <div key={key} className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${openMenu === key ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
              >
                {label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === key ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === key && (
                <DropdownMenu items={menus[key]} onClose={() => setOpenMenu(null)} />
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search..."
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button type="submit" className="ml-1 p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{i18n.language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          {/* Sign In */}
          <Link
            to="/citizen/login"
            className="hidden sm:flex items-center gap-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{t('nav.signin')}</span>
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-lg">
              {t('nav.home')}
            </Link>
            {navItems.map(({ key, label }) => (
              <div key={key}>
                <button
                  onClick={() => setOpenMenu(openMenu === key ? null : key)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-700 rounded-lg"
                >
                  {label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === key ? 'rotate-180' : ''}`} />
                </button>
                {openMenu === key && (
                  <div className="pl-6 space-y-1 mt-1">
                    {menus[key].map(item => (
                      <Link key={item.label} to={item.href || '#'} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
              <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-purple-700 rounded-lg">
                <Globe className="w-4 h-4" />
                {i18n.language === 'en' ? 'தமிழ்' : 'English'}
              </button>
              <Link to="/citizen/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center bg-[#6D28D9] text-white px-4 py-2 rounded-full text-sm font-medium">
                {t('nav.signin')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
