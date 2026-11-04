import React, { useState } from 'react';
import { 
  Globe, Shield, User, ChevronDown, Search, Sparkles, 
  LogOut, Phone, Accessibility, Mail, Home
} from 'lucide-react';
import { PortalType, PublicPage, AuthUser } from '../types';

interface HeaderProps {
  currentPortal: PortalType;
  onSelectPortal: (portal: PortalType) => void;
  currentPublicPage: PublicPage;
  onSelectPublicPage: (page: PublicPage) => void;
  language: 'en' | 'ta';
  onToggleLanguage: (lang: 'en' | 'ta') => void;
  fontSize: number;
  onAdjustFontSize: (delta: number) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenAIAssistant: () => void;
  currentUser?: AuthUser | null;
  onOpenAuth?: (portal?: PortalType, mode?: 'login' | 'signup') => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPortal,
  onSelectPortal,
  currentPublicPage,
  onSelectPublicPage,
  language,
  onToggleLanguage,
  fontSize,
  onAdjustFontSize,
  currentUser = null,
  onOpenAuth,
  onLogout
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const isTamil = language === 'ta';

  const toggleDropdown = (key: string) => {
    setActiveDropdown(prev => prev === key ? null : key);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-xs">
      {/* ========================================================================= */}
      {/* 1. TOPMOST GOVERNMENT UTILITY BAR (#0B1528 / DEEP NAVY)                    */}
      {/* ========================================================================= */}
      <div className="bg-[#0B1528] text-slate-200 text-xs border-b border-slate-800/80 px-4 sm:px-10 py-1.5 flex flex-wrap items-center justify-between">
        {/* Left: Official Emblem + Bilingual State Title */}
        <div className="flex items-center gap-2.5">
          {/* Official Tamil Nadu Crest */}
          <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
            <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#C2410C" strokeWidth="4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#047857" strokeWidth="2.5" strokeDasharray="4 2" />
              <path d="M50 14 L59 35 L41 35 Z" fill="#C2410C" />
              <rect x="43" y="35" width="14" height="26" fill="#D97706" />
              <path d="M35 61 L65 61 L60 77 L40 77 Z" fill="#047857" />
              <circle cx="50" cy="83" r="3.5" fill="#C2410C" />
            </svg>
          </div>
          <div className="flex items-center gap-2 font-bold tracking-tight text-xs text-white">
            <span>Government of Tamil Nadu</span>
            <span className="text-slate-500 font-normal">|</span>
            <span className="font-tamil font-semibold text-slate-200">தமிழ்நாடு அரசு</span>
          </div>
        </div>

        {/* Right: Citizen Helpline | Accessibility | Sitemap | Contact Us */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-200 mt-1 sm:mt-0 font-medium">
          {/* Citizen Helpline */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-slate-300" />
            <span>Citizen Helpline: <strong className="text-white font-semibold">1967 (24 × 7)</strong></span>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Accessibility */}
          <button 
            onClick={() => onAdjustFontSize?.(fontSize >= 2 ? -2 : 1)}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Accessibility & Font Size"
          >
            <Accessibility className="w-3.5 h-3.5 text-slate-300" />
            <span>Accessibility</span>
          </button>

          <span className="text-slate-600 hidden md:inline">|</span>

          {/* Sitemap */}
          <button 
            onClick={() => onSelectPublicPage('about')}
            className="hidden md:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Sitemap</span>
          </button>

          {/* Contact Us */}
          <button 
            onClick={() => onSelectPublicPage('contact')}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-300" />
            <span>Contact Us</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={() => onToggleLanguage(isTamil ? 'en' : 'ta')}
            className="px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-700 text-purple-300 text-[10px] font-bold border border-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3 h-3" />
            <span>{isTamil ? 'EN' : 'தமிழ்'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HEADER NAVBAR (WHITE BACKGROUND)                                  */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200/90 px-4 sm:px-10 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => { onSelectPortal('public'); onSelectPublicPage('home'); }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {/* Official Circular Emblem matching image_59feaec5.png */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-green-600 via-amber-500 to-orange-500 p-0.5 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#D97706" strokeWidth="4" />
                <circle cx="50" cy="50" r="39" fill="none" stroke="#059669" strokeWidth="3" />
                <path d="M50 14 L60 36 L40 36 Z" fill="#B45309" />
                <rect x="42" y="36" width="16" height="26" fill="#D97706" />
                <path d="M33 62 L67 62 L62 78 L38 78 Z" fill="#059669" />
                <circle cx="50" cy="84" r="4" fill="#DC2626" />
              </svg>
            </div>
          </div>

          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none flex items-center gap-1">
              <span>GovAI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold">Nexus</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 tracking-tight mt-0.5">
              AI-Powered Governance Platform
            </p>
          </div>
        </div>

        {/* Center Navigation Menus matching image_59feaec5.png (Home, Government, Services, Schemes, Departments, Resources) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm font-bold text-slate-800">
          {/* 1. Home (Active Purple Pill) */}
          <button
            onClick={() => { onSelectPortal('public'); onSelectPublicPage('home'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              currentPublicPage === 'home' && currentPortal === 'public'
                ? 'bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white shadow-sm'
                : 'text-slate-800 hover:text-purple-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          {/* 2. Government ⌵ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('government')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-purple-700 hover:bg-slate-50 cursor-pointer ${
                activeDropdown === 'government' || currentPublicPage === 'about' ? 'text-purple-700 bg-purple-50' : ''
              }`}
            >
              <span>Government</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeDropdown === 'government' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'government' && (
              <div 
                onMouseLeave={closeDropdowns}
                className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold"
              >
                <button onClick={() => { onSelectPublicPage('about'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  About Tamil Nadu Government
                </button>
                <button onClick={() => { onSelectPublicPage('public-info'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Government Orders (G.O.s)
                </button>
                <button onClick={() => { onSelectPublicPage('transparency'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  State Policy & Transparency
                </button>
              </div>
            )}
          </div>

          {/* 3. Services ⌵ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-purple-700 hover:bg-slate-50 cursor-pointer ${
                activeDropdown === 'services' || currentPublicPage === 'services' ? 'text-purple-700 bg-purple-50' : ''
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'services' && (
              <div 
                onMouseLeave={closeDropdowns}
                className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold"
              >
                <button onClick={() => { onSelectPublicPage('services'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-800 font-bold">
                  All Government Services (1,248)
                </button>
                <button onClick={() => { onSelectPublicPage('documents'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Certificates & Vital Records
                </button>
                <button onClick={() => { onSelectPublicPage('licences'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Licences & Commercial Permits
                </button>
              </div>
            )}
          </div>

          {/* 4. Schemes ⌵ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('schemes')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-purple-700 hover:bg-slate-50 cursor-pointer ${
                activeDropdown === 'schemes' || currentPublicPage === 'schemes' ? 'text-purple-700 bg-purple-50' : ''
              }`}
            >
              <span>Schemes</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeDropdown === 'schemes' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'schemes' && (
              <div 
                onMouseLeave={closeDropdowns}
                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold"
              >
                <button onClick={() => { onSelectPublicPage('schemes'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-800 font-bold">
                  Browse All Welfare Schemes (368)
                </button>
                <button onClick={() => { onSelectPublicPage('schemes'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Magalir Urimai Thogai
                </button>
                <button onClick={() => { onSelectPublicPage('schemes'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Pudhumai Penn Scheme
                </button>
                <button onClick={() => { onSelectPublicPage('schemes'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Chief Minister Uzhavar Padhukappu
                </button>
              </div>
            )}
          </div>

          {/* 5. Departments ⌵ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('departments')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-purple-700 hover:bg-slate-50 cursor-pointer ${
                activeDropdown === 'departments' ? 'text-purple-700 bg-purple-50' : ''
              }`}
            >
              <span>Departments</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeDropdown === 'departments' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'departments' && (
              <div
                onMouseLeave={closeDropdowns}
                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold"
              >
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-purple-800 font-bold border-b border-slate-100">
                  All Departments (12)
                </button>
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Revenue & Disaster Management
                </button>
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Social Welfare & Women Empowerment
                </button>
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Transport Department
                </button>
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Housing & Urban Development
                </button>
                <button onClick={() => { onSelectPublicPage('departments'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Health & Family Welfare
                </button>
              </div>
            )}
          </div>

          {/* 6. Resources ⌵ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('resources')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-purple-700 hover:bg-slate-50 cursor-pointer ${
                activeDropdown === 'resources' ? 'text-purple-700 bg-purple-50' : ''
              }`}
            >
              <span>Resources</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'resources' && (
              <div 
                onMouseLeave={closeDropdowns}
                className="absolute top-full right-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold"
              >
                <button onClick={() => { onSelectPublicPage('documents'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Download Application Forms
                </button>
                <button onClick={() => { onSelectPublicPage('public-info'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Government Orders & Circulars
                </button>
                <button onClick={() => { onSelectPublicPage('contact'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Citizen User Manuals & Help
                </button>
                <button onClick={() => { onSelectPublicPage('transparency'); closeDropdowns(); }} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-slate-700">
                  Open Data Repository
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Circular Search Icon + Sign In / Apply Pill */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={() => onSelectPublicPage('services')}
            title="Search Government Portal"
            className="w-10 h-10 rounded-full border-2 border-purple-400/70 hover:border-purple-600 text-slate-800 hover:text-purple-700 bg-purple-50/40 hover:bg-purple-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Search className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>

          {/* Sign In / Apply Button with Gateway Dropdown */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] hover:from-[#6D28D9] hover:to-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <User className="w-4 h-4 stroke-[2.2]" />
                <span>Sign In / Apply</span>
              </button>
            )}

            {/* Portal & Auth Dropdown */}
            {servicesDropdown && (
              <div 
                onMouseLeave={() => setServicesDropdown(false)}
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 text-xs"
              >
                {currentUser ? (
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <p className="font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                      <span className="font-semibold text-purple-700 uppercase">Role: {currentUser.role}</span>
                      {onLogout && (
                        <button 
                          onClick={() => { onLogout(); setServicesDropdown(false); }}
                          className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Log Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 pb-2 border-b border-slate-100 mb-2 grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => { onOpenAuth ? onOpenAuth('citizen', 'login') : onSelectPortal('citizen'); setServicesDropdown(false); }}
                      className="py-1.5 px-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-center cursor-pointer"
                    >
                      Citizen Sign In
                    </button>
                    <button
                      onClick={() => { onOpenAuth ? onOpenAuth('citizen', 'signup') : onSelectPortal('citizen'); setServicesDropdown(false); }}
                      className="py-1.5 px-2 rounded-xl border border-purple-300 hover:bg-purple-50 text-purple-800 font-bold text-center cursor-pointer"
                    >
                      Citizen Register
                    </button>
                  </div>
                )}

                <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Specialized Portal
                </div>

                <button
                  onClick={() => { onSelectPortal('citizen'); setServicesDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">C</div>
                  <div>
                    <div className="font-bold text-slate-900">Citizen Portal</div>
                    <div className="text-[10px] text-slate-500">Apply, track & manage documents</div>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectPortal('employee'); setServicesDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">E</div>
                  <div>
                    <div className="font-bold text-slate-900">Employee Portal</div>
                    <div className="text-[10px] text-slate-500">Process verification & tasks</div>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectPortal('officer'); setServicesDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">O</div>
                  <div>
                    <div className="font-bold text-slate-900">Officer / HOD Portal</div>
                    <div className="text-[10px] text-slate-500">Supervision & SLA approvals</div>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectPortal('admin'); setServicesDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">A</div>
                  <div>
                    <div className="font-bold text-slate-900">Super Admin Portal</div>
                    <div className="text-[10px] text-slate-500">Platform IAM & master config</div>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectPortal('analytics'); setServicesDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-purple-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">AI</div>
                  <div>
                    <div className="font-bold text-slate-900">AI & Analytics Centre</div>
                    <div className="text-[10px] text-slate-500">RAG, predictive & state telemetry</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
