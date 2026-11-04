import React, { useState } from 'react';
import { 
  Search, Sparkles, Check, ArrowRight, FileText, 
  Users, Layers, Building2, Shield, Sprout, ChevronLeft, ChevronRight,
  Bell, Landmark, TrendingUp, CheckCircle2, Megaphone, CreditCard, BarChart3
} from 'lucide-react';
import { PublicPage, GovScheme } from '../../types';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';
import secretariatBannerImg from '../../assets/images/tn_secretariat_banner_1793711221214.jpg';
import womenBeneficiariesImg from '../../assets/images/women_beneficiaries_1793708227920.jpg';
import girlStudentImg from '../../assets/images/girl_student_portrait_1793708230900.jpg';
import farmerBeneficiaryImg from '../../assets/images/farmer_beneficiary_1793708228408.jpg';
import kanavuIllamHouseImg from '../../assets/images/tn_kanavu_illam_house_1793710179680.jpg';

interface PublicHomePageProps {
  isTamil: boolean;
  onNavigatePage: (page: PublicPage) => void;
  onSelectSchemeForModal: (scheme: GovScheme) => void;
  onOpenChecklistModal: (serviceName: string) => void;
  onOpenApplyModal: (item: any) => void;
  onOpenAIAssistant: () => void;
  onSelectPortal: (portal: any) => void;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({
  isTamil,
  onNavigatePage,
  onOpenApplyModal,
  onOpenAIAssistant,
  onSelectPortal
}) => {
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 4 Featured Schemes for the Carousel
  const featuredSchemes = [
    {
      id: 'kmuth',
      title: isTamil ? 'மகளிர் உரிமைத் தொகை' : 'Magalir Urimai Thogai',
      badge: isTamil ? 'சிறப்புத் திட்டம்' : 'Featured Scheme',
      description: isTamil 
        ? 'தகுதியான குடும்பத் தலைவிகளுக்கு குடும்ப நல்வாழ்வு மற்றும் அதிகாரமளித்தலுக்கான மாதாந்திர நிதியுதவி.' 
        : 'Monthly financial assistance for eligible women to strengthen family welfare and empowerment.',
      image: womenBeneficiariesImg,
      applyItem: {
        id: 'kmuth-app',
        title: 'Kalaignar Magalir Urimai Thogai',
        department: 'Social Welfare & Women Empowerment',
        fee: 'Free of Cost',
        processingDays: '15 Days'
      }
    },
    {
      id: 'pudhumai-penn',
      title: isTamil ? 'புதுமைப் பெண் திட்டம்' : 'Moovalur Ramamirtham Pudhumai Penn',
      badge: isTamil ? 'கல்வி உதவி' : 'Featured Scheme',
      description: isTamil 
        ? 'அரசுப் பள்ளிகளில் படித்து உயர்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 ஊக்கத்தொகை.' 
        : 'Monthly ₹1,000 financial incentive for girl students pursuing higher education from government schools.',
      image: girlStudentImg,
      applyItem: {
        id: 'pudhumai-app',
        title: 'Moovalur Ramamirtham Pudhumai Penn Scheme',
        department: 'Higher Education Department',
        fee: 'Free of Cost',
        processingDays: '10 Days'
      }
    },
    {
      id: 'uzhavar-padhukappu',
      title: isTamil ? 'முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்' : 'CM Uzhavar Padhukappu Thittam',
      badge: isTamil ? 'விவசாயிகள் நலம்' : 'Featured Scheme',
      description: isTamil 
        ? 'சிறு, குறு விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்களுக்கான விரிவான சமூகப் பாதுகாப்பு.' 
        : 'Comprehensive social security, pension and crop assistance for marginal farmers and agricultural laborers.',
      image: farmerBeneficiaryImg,
      applyItem: {
        id: 'uzhavar-app',
        title: 'Chief Minister Uzhavar Padhukappu Thittam',
        department: 'Revenue & Disaster Management',
        fee: 'Free of Cost',
        processingDays: '14 Days'
      }
    },
    {
      id: 'kanavu-illam',
      title: isTamil ? 'கலைஞர் கனவு இல்லம் திட்டம்' : 'Kalaignar Kanavu Illam Scheme',
      badge: isTamil ? 'ஊரக வீட்டுவசதி' : 'Featured Scheme',
      description: isTamil 
        ? 'கிராமப்புற குடிசை இல்லங்களை உறுதியான கான்கிரீட் வீடுகளாக மாற்றும் மாபெரும் ஊரக வீட்டுவசதி திட்டம்.' 
        : 'Flagship rural housing scheme to build safe, durable concrete houses for underserved rural households.',
      image: kanavuIllamHouseImg,
      applyItem: {
        id: 'kanavu-app',
        title: 'Kalaignar Kanavu Illam Scheme',
        department: 'Rural Development & Panchayat Raj',
        fee: 'Free of Cost',
        processingDays: '30 Days'
      }
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSchemes.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSchemes.length) % featuredSchemes.length);
  };

  const activeScheme = featuredSchemes[currentSlide];

  return (
    <div className="space-y-5 pb-6 bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F9]">
      {/* ========================================================================= */}
      {/* 1. MASTER HERO BANNER (SECRETARIAT PHOTO + SEARCH BAR + 3 RIGHT CARDS)     */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#0A1329] text-white">
        {/* Right-side panoramic photograph of Fort St. George Secretariat */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img 
            src={secretariatBannerImg} 
            alt="Government of Tamil Nadu Secretariat Building" 
            className="w-full h-full object-cover object-right lg:object-[75%_center] filter brightness-105 contrast-105"
          />
          {/* Tamil Nadu Government Sign on Secretariat Roofline Overlay */}
          <div className="hidden lg:flex absolute top-[17%] left-[63.5%] -translate-x-1/2 z-10 bg-[#1E293B]/90 border border-slate-400/50 px-2.5 py-0.5 rounded-xs shadow-md">
            <span className="font-tamil text-[11px] font-black text-white tracking-wider">தமிழ்நாடு அரசு</span>
          </div>

          {/* Diagonal Navy-to-Purple Curve Overlay on Left matching image_59feaec5.png */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#0A142D] via-[#1B1248] to-[#3B177E] lg:w-[58%] z-10 shadow-2xl"
            style={{ clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0% 100%)' }}
          />
          {/* Subtle glowing purple wave curves inside the left hero */}
          <svg
            className="absolute left-0 top-0 h-full w-[58%] z-10 pointer-events-none opacity-30"
            viewBox="0 0 600 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M350 0 C420 120, 260 260, 480 400 L600 400 L600 0 Z"
              fill="url(#heroPurpleGlow)"
            />
            <path
              d="M150 400 C240 280, 410 240, 510 0"
              stroke="#A855F7"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <defs>
              <linearGradient id="heroPurpleGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-10 pt-8 pb-14 lg:pt-10 lg:pb-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Title, Search Bar & Popular Pills (7 Cols) */}
            <div className="lg:col-span-7 space-y-3.5 max-w-2xl">
              {/* Top Tagline */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-slate-200 uppercase">
                  TAMIL NADU GOVERNMENT
                </span>
                <span className="w-16 h-[2px] bg-gradient-to-r from-purple-400 to-transparent rounded-full"></span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-none">
                GovAI{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#818CF8]">
                  Nexus
                </span>
              </h1>

              {/* Subtitle */}
              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                A Unified Digital Governance Platform
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-normal">
                {isTamil 
                  ? 'அரசு சேவைகள், நலத்திட்டங்கள், சான்றிதழ்கள், உரிமங்கள் மற்றும் சரிபார்க்கப்பட்ட தகவல்களைப் பெறுங்கள் — புத்திசாலித்தனமாக, பாதுகாப்பாக மற்றும் உங்கள் மொழியில்.' 
                  : 'Access government services, welfare schemes, certificates, licences and verified information — intelligently, securely and in your language.'}
              </p>

              {/* Prominent White Pill Search Bar */}
              <div className="pt-1.5 max-w-xl">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    onNavigatePage('services');
                  }}
                  className="flex items-center bg-white rounded-full p-1.5 shadow-xl border-2 border-purple-400/40 focus-within:border-purple-400 transition-all"
                >
                  <Search className="w-5 h-5 text-slate-500 ml-3.5 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder={
                      isTamil
                        ? 'சேவைகள், திட்டங்கள், துறைகள், அரசாணைகள், படிவங்களைத் தேடுங்கள்...'
                        : 'Search for services, schemes, departments, GOs, forms...'
                    }
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] hover:from-[#6D28D9] hover:to-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    {isTamil ? 'தேடு' : 'Search'}
                  </button>
                </form>

                {/* Popular Search Tags Row */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="flex items-center gap-1 font-bold text-white mr-0.5">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-300" />
                    <span>Popular:</span>
                  </span>
                  {[
                    { label: 'Income Certificate', page: 'documents' as PublicPage },
                    { label: 'Community Certificate', page: 'documents' as PublicPage },
                    { label: 'Nativity Certificate', page: 'documents' as PublicPage },
                    { label: 'Smart Family Card', page: 'services' as PublicPage },
                  ].map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigatePage(tag.page)}
                      className="px-3 py-1 rounded-full bg-white hover:bg-purple-50 text-slate-800 hover:text-purple-800 font-semibold text-[11px] shadow-xs transition-all cursor-pointer"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3 Stacked Action Cards in Translucent Frosted Container (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[330px] bg-white/25 backdrop-blur-md p-2.5 rounded-3xl border border-white/40 shadow-2xl space-y-2.5">
                
                {/* Card 1: Ask GovAI */}
                <div
                  onClick={onOpenAIAssistant}
                  className="bg-white/95 hover:bg-white rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-purple-200 group-hover:scale-105 transition-transform">
                      <img src={botMascotImg} alt="Ask GovAI" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Ask GovAI</h4>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">Get instant answers</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card 2: Track Application */}
                <div
                  onClick={() => onSelectPortal('citizen')}
                  className="bg-white/95 hover:bg-white rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 ring-2 ring-purple-200 group-hover:scale-105 transition-transform">
                      <BarChart3 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Track Application</h4>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">Check your application status</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card 3: Get Notifications */}
                <div
                  onClick={() => onNavigatePage('public-info')}
                  className="bg-white/95 hover:bg-white rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 ring-2 ring-purple-200 group-hover:scale-105 transition-transform">
                      <Bell className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Get Notifications</h4>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">Service updates & alerts</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HORIZONTAL SERVICE CATEGORY STRIP (FLOATING CARD OVERLAP)              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-10 -mt-8 relative z-30">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-3.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-left">
          {/* 1. Certificates */}
          <div 
            onClick={() => onNavigatePage('documents')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Certificates</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Income, Community, Nativity & More</div>
            </div>
          </div>

          {/* 2. Identity Services */}
          <div 
            onClick={() => onNavigatePage('documents')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Identity Services</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Family Card, e-District ID, Resident Services</div>
            </div>
          </div>

          {/* 3. Licences & Permits */}
          <div 
            onClick={() => onNavigatePage('licences')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Licences & Permits</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Transport, Trade, FSSAI, Business</div>
            </div>
          </div>

          {/* 4. Land & Revenue */}
          <div 
            onClick={() => onNavigatePage('services')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Land & Revenue</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Patta, Chitta, A-Register, Land Records</div>
            </div>
          </div>

          {/* 5. Welfare Schemes */}
          <div 
            onClick={() => onNavigatePage('schemes')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Welfare Schemes</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Education, Health, Women, Farmers</div>
            </div>
          </div>

          {/* 6. Department Services */}
          <div 
            onClick={() => onNavigatePage('services')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-[13px] text-slate-900">Department Services</div>
              <div className="text-[11px] text-slate-600 leading-tight mt-0.5">Apply, Track, Download and More</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MIDDLE 3-CARD SECTION (AI SERVICES | FEATURED SCHEME | LATEST UPDATES) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-10 pt-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* 3A. Card 1: AI-Powered Government Services (4 Cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0A0F29] via-[#131B42] to-[#1E1548] text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex items-center justify-between gap-3 border border-indigo-900/60">
            {/* Subtle glowing background particles */}
            <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute left-10 top-6 w-32 h-32 bg-purple-500/25 rounded-full blur-2xl pointer-events-none" />

            {/* Left Visual: Glowing 3D AI Chip Pedestal */}
            <div className="relative w-36 h-44 shrink-0 flex flex-col items-center justify-center">
              {/* Circuit lines SVG */}
              <svg viewBox="0 0 140 160" className="w-full h-full">
                <defs>
                  <radialGradient id="pedestalGlow" cx="50%" cy="65%" r="50%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0A0F29" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="aiCubeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                {/* Glow Halo */}
                <circle cx="70" cy="105" r="55" fill="url(#pedestalGlow)" />
                {/* Vertical light beams */}
                <line x1="45" y1="25" x2="45" y2="95" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1="95" y1="25" x2="95" y2="95" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                {/* Glowing 3D Base Rings */}
                <ellipse cx="70" cy="122" rx="52" ry="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <ellipse cx="70" cy="116" rx="42" ry="12" fill="#1E1B4B" stroke="#8B5CF6" strokeWidth="2" />
                <ellipse cx="70" cy="110" rx="32" ry="8" fill="#312E81" stroke="#60A5FA" strokeWidth="1.5" />
                {/* Chip Pins */}
                <line x1="36" y1="68" x2="44" y2="68" stroke="#60A5FA" strokeWidth="2" />
                <line x1="36" y1="78" x2="44" y2="78" stroke="#60A5FA" strokeWidth="2" />
                <line x1="36" y1="88" x2="44" y2="88" stroke="#60A5FA" strokeWidth="2" />
                <line x1="96" y1="68" x2="104" y2="68" stroke="#C084FC" strokeWidth="2" />
                <line x1="96" y1="78" x2="104" y2="78" stroke="#C084FC" strokeWidth="2" />
                <line x1="96" y1="88" x2="104" y2="88" stroke="#C084FC" strokeWidth="2" />
                {/* AI Core Cube */}
                <rect x="44" y="52" width="52" height="52" rx="10" fill="url(#aiCubeGrad)" stroke="#E0E7FF" strokeWidth="2" />
                <rect x="49" y="57" width="42" height="42" rx="7" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
                <text x="70" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">
                  AI
                </text>
              </svg>
            </div>

            {/* Right Text & Checklist */}
            <div className="flex-1 space-y-2.5 relative z-10">
              <h3 className="text-base sm:text-[17px] font-extrabold text-white leading-tight">
                AI-Powered<br />Government Services
              </h3>

              <ul className="space-y-1.5 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Smart Assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Eligibility Check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Document Guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Service Recommendations</span>
                </li>
              </ul>

              <div className="pt-1">
                <button
                  onClick={onOpenAIAssistant}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Try GovAI Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
                </button>
              </div>
            </div>
          </div>

          {/* 3B. Card 2: Featured Scheme Carousel (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-r from-[#31135E] via-[#6D28D9] to-[#A855F7] text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[215px]">
            {/* Right side Beneficiary Photograph */}
            <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none overflow-hidden">
              <img 
                src={activeScheme.image} 
                alt={activeScheme.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9]/55 to-transparent" />
            </div>

            {/* Left Arrow Button */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Scheme"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={handleNextSlide}
              aria-label="Next Scheme"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scheme Content */}
            <div className="relative z-10 space-y-2 pl-6 max-w-[65%]">
              <span className="inline-block bg-white/25 text-white text-[11px] font-bold px-3 py-0.5 rounded-full backdrop-blur-xs">
                {activeScheme.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {activeScheme.title}
              </h3>
              <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                {activeScheme.description}
              </p>
              <div className="pt-1.5">
                <button
                  onClick={() => onOpenApplyModal(activeScheme.applyItem)}
                  className="py-2 px-4 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
                </button>
              </div>
            </div>

            {/* Bottom Carousel Dots */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 pt-2">
              {featuredSchemes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'bg-white scale-110' : 'bg-white/45 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 3C. Card 3: Latest Updates Timeline (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-md flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4.5 h-4.5 text-purple-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">Latest Updates</h3>
                </div>
                <button
                  onClick={() => onNavigatePage('public-info')}
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Connected Timeline List */}
              <div className="space-y-3.5 relative before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-[2px] before:bg-purple-200 pl-5 text-xs">
                {/* Item 1 */}
                <div 
                  onClick={() => onNavigatePage('public-info')}
                  className="relative flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-white" />
                  <div className="flex items-start gap-2.5">
                    <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap pt-0.5">03 Nov 2026</span>
                    <p className="text-[11px] font-semibold text-slate-800 leading-snug group-hover:text-purple-700">
                      G.O. Ms. No. 214 – Revised guidelines for Income Certificate issuance.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700" />
                  </div>
                </div>

                {/* Item 2 */}
                <div 
                  onClick={() => onNavigatePage('public-info')}
                  className="relative flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-white" />
                  <div className="flex items-start gap-2.5">
                    <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap pt-0.5">01 Nov 2026</span>
                    <p className="text-[11px] font-semibold text-slate-800 leading-snug group-hover:text-purple-700">
                      Special camp for Community Certificate – Nov 10–15 in all Districts.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700" />
                  </div>
                </div>

                {/* Item 3 */}
                <div 
                  onClick={() => onNavigatePage('public-info')}
                  className="relative flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-white" />
                  <div className="flex items-start gap-2.5">
                    <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap pt-0.5">30 Oct 2026</span>
                    <p className="text-[11px] font-semibold text-slate-800 leading-snug group-hover:text-purple-700">
                      Extension of working hours at e-Sevai Centres for public convenience.
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700 shrink-0" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GOVAI NEXUS AT A GLANCE (CONTAINED ROYAL STATS BANNER)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-10 pt-1">
        <div className="bg-gradient-to-r from-[#5B21B6] via-[#2E1065] to-[#0B1528] text-white rounded-2xl px-6 py-4 shadow-md border border-purple-500/30">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center divide-y sm:divide-y-0 lg:divide-x divide-white/15">
            
            {/* Left Title Block */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex items-center gap-3 pr-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-200" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-black text-white">GovAI Nexus</div>
                <div className="text-xs font-bold text-purple-200">at a Glance</div>
              </div>
            </div>

            {/* Stat 1: 2.86 Crore+ */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <Users className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">2.86 Crore+</div>
                <div className="text-[11px] text-slate-300 font-medium">Registered Citizens</div>
              </div>
            </div>

            {/* Stat 2: 12.90 Lakh+ */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <FileText className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">12.90 Lakh+</div>
                <div className="text-[11px] text-slate-300 font-medium">Total Applications</div>
              </div>
            </div>

            {/* Stat 3: 94.2% */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <CheckCircle2 className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">94.2%</div>
                <div className="text-[11px] text-slate-300 font-medium">SLA Compliance</div>
              </div>
            </div>

            {/* Stat 4: 46 */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <Landmark className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">46</div>
                <div className="text-[11px] text-slate-300 font-medium">Departments</div>
              </div>
            </div>

            {/* Stat 5: 1,248 */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <Layers className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">1,248</div>
                <div className="text-[11px] text-slate-300 font-medium">Government Services</div>
              </div>
            </div>

            {/* Stat 6: 368 */}
            <div className="flex items-center gap-3 lg:pl-4 pt-2 sm:pt-0">
              <Sprout className="w-6 h-6 text-purple-300 shrink-0" />
              <div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">368</div>
                <div className="text-[11px] text-slate-300 font-medium">Welfare Schemes</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
