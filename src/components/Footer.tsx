import React from 'react';
import { Youtube, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ta';
  onNavigatePage: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  return (
    <footer className="w-full bg-[#091224] text-white border-t border-slate-800 relative overflow-hidden text-xs">
      {/* Glowing Purple Wave Accents on Bottom Left & Right matching image_59feaec5.png */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none opacity-80"
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 70 C240 20, 420 95, 720 85 C1020 75, 1260 15, 1440 50 L1440 100 L0 100 Z"
          fill="url(#footerWaveGrad)"
        />
        <defs>
          <linearGradient id="footerWaveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#1E1B4B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.65" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start divide-y sm:divide-y-0 lg:divide-x divide-slate-800/90">
          
          {/* Col 1: Official Circular Seal + Brand */}
          <div className="col-span-2 sm:col-span-1 pr-4 flex items-center gap-3">
            <div 
              onClick={() => onNavigatePage('home')}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-600 via-amber-500 to-orange-500 p-0.5 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
                <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
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
              <div className="text-lg font-black text-white tracking-tight leading-none flex items-center gap-1">
                <span>GovAI</span>
                <span className="text-purple-400">Nexus</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">
                Government of Tamil Nadu
              </div>
            </div>
          </div>

          {/* Col 2: About */}
          <div className="lg:pl-6 pt-3 sm:pt-0">
            <h4 className="font-bold text-white mb-2.5 text-xs tracking-wide">About</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <button onClick={() => onNavigatePage('about')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> About Tamil Nadu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('about')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> GovAI Nexus Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('about')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Vision & Objectives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('departments')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Government Departments
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information */}
          <div className="lg:pl-6 pt-3 sm:pt-0">
            <h4 className="font-bold text-white mb-2.5 text-xs tracking-wide">Information</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <button onClick={() => onNavigatePage('public-info')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Government Orders (GOs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('public-info')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Policies & Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('public-info')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Service Manuals
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="lg:pl-6 pt-3 sm:pt-0">
            <h4 className="font-bold text-white mb-2.5 text-xs tracking-wide">Support</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <button onClick={() => onNavigatePage('contact')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Citizen User Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('contact')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('contact')} className="hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span className="text-slate-400">›</span> Technical Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Important Links */}
          <div className="lg:pl-6 pt-3 sm:pt-0">
            <h4 className="font-bold text-white mb-2.5 text-xs tracking-wide">Important Links</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <a href="https://www.tnesevai.tn.gov.in" target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1.5 transition-colors">
                  <span className="text-slate-400">›</span> e-Sevai Services
                </a>
              </li>
              <li>
                <a href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1.5 transition-colors">
                  <span className="text-slate-400">›</span> DigiLocker
                </a>
              </li>
              <li>
                <a href="https://web.umang.gov.in" target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1.5 transition-colors">
                  <span className="text-slate-400">›</span> UMANG
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1.5 transition-colors">
                  <span className="text-slate-400">›</span> India.gov.in
                </a>
              </li>
            </ul>
          </div>

          {/* Col 6: Follow Us */}
          <div className="lg:pl-6 pt-3 sm:pt-0 space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wide">Follow Us</h4>
            <div className="flex items-center gap-2.5">
              <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full border border-slate-600 hover:border-purple-400 bg-slate-900/60 hover:bg-purple-900/40 flex items-center justify-center text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#x" aria-label="X" className="w-8 h-8 rounded-full border border-slate-600 hover:border-purple-400 bg-slate-900/60 hover:bg-purple-900/40 flex items-center justify-center text-white font-bold text-xs transition-colors">
                𝕏
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full border border-slate-600 hover:border-purple-400 bg-slate-900/60 hover:bg-purple-900/40 flex items-center justify-center text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full border border-slate-600 hover:border-purple-400 bg-slate-900/60 hover:bg-purple-900/40 flex items-center justify-center text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
