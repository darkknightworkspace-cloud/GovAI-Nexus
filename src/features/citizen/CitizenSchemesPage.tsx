import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, CheckCircle2, Scale, 
  ChevronRight, ChevronLeft, Bookmark, ExternalLink, ArrowRight,
  Filter, Home as HomeIcon, Award, Building2, Users,
  GraduationCap, Sprout, HeartPulse, Briefcase, Accessibility,
  Store, Clock, Calendar, XCircle, Check, Bell
} from 'lucide-react';
import { GovScheme } from '../../types';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';
import leaderPortraitImg from '../../assets/images/tn_leader_portrait_1793711262561.jpg';
import womenImg from '../../assets/images/women_beneficiaries_1793708227920.jpg';
import girlImg from '../../assets/images/girl_student_portrait_1793708230900.jpg';
import farmerImg from '../../assets/images/farmer_beneficiary_1793708228408.jpg';
import houseImg from '../../assets/images/tn_kanavu_illam_house_1793710179680.jpg';

interface CitizenSchemesPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenSchemeModal?: (scheme: any) => void;
  onOpenApplyModal?: (scheme: any) => void;
}

export const CitizenSchemesPage: React.FC<CitizenSchemesPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenSchemeModal,
  onOpenApplyModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevelTab, setActiveLevelTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Latest Updated');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [showStatusFilter, setShowStatusFilter] = useState(true);
  const [showGovLevelFilter, setShowGovLevelFilter] = useState(true);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Master Hero Banner */}
      <div className="bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E293B] rounded-3xl p-5 sm:p-7 relative overflow-hidden text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            src={heroBgImg}
            alt="Tamil Nadu Landmarks"
            className="w-full h-full object-cover object-right lg:object-center opacity-35 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E3A8A]/90 to-transparent w-full lg:w-3/5"></div>
        </div>

        {/* Heading */}
        <div className="relative z-10 space-y-2 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Government</span>
            <span className="text-purple-400">Schemes</span>
            <span className="text-2xl">📚</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil
              ? 'தமிழ்நாடு மற்றும் மத்திய அரசு நலத்திட்டங்கள், தகுதி வரம்புகள் மற்றும் நேரடி விண்ணப்ப இணைப்புகள்.'
              : 'Explore Tamil Nadu Government schemes, Central Government schemes and other welfare programmes with eligibility, benefits and direct apply links.'}
          </p>
        </div>

        {/* Floating Ask GovAI Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-900 shadow-xl border border-white/60 w-full sm:w-80 shrink-0 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0">
              <img src={botMascotImg} alt="GovAI Mascot" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Ask GovAI</h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight">
                Get scheme details, eligibility, documents and application steps.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAIAssistant}
            className="mt-3 w-full py-2 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Breadcrumb Row */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
        <HomeIcon className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-purple-700" onClick={() => onNavigate('dashboard')} />
        <span>|</span>
        <button onClick={() => onNavigate('dashboard')} className="hover:text-purple-700 cursor-pointer">Citizen Portal</button>
        <span>&gt;</span>
        <span className="font-bold text-slate-800">Government Schemes</span>
      </div>

      {/* 3. Search Bar + Quick Action Buttons */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full lg:max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, keyword, department... (e.g., Pudhumai Penn, PM-KISAN)"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
            />
          </div>
          <button
            onClick={() => onNavigate('scheme-finder')}
            className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            Search
          </button>
          <button
            onClick={onOpenAIAssistant}
            className="p-2 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Action Buttons on Right */}
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => onNavigate('scheme-finder')}
            className="px-3 py-1.5 rounded-xl border border-purple-200 hover:border-purple-400 bg-purple-50 text-purple-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Scheme Finder</span>
          </button>
          <button
            onClick={() => onNavigate('scheme-finder')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Eligibility Check</span>
          </button>
          <button
            onClick={() => onNavigate('scheme-finder')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-purple-600" />
            <span>Compare Schemes</span>
          </button>
        </div>
      </div>

      {/* 4. Scheme Level Filter Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveLevelTab('all')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'all'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Schemes (1,248)
        </button>

        <button
          onClick={() => setActiveLevelTab('tn')}
          className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'tn'
              ? 'bg-[#7C3AED] border-purple-600 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <img src="/assets/aistudio/image_5b30609e.png" alt="TN" className="w-4 h-4 object-contain" />
          <span>Tamil Nadu Schemes (842)</span>
        </button>

        <button
          onClick={() => setActiveLevelTab('central')}
          className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'central'
              ? 'bg-[#7C3AED] border-purple-600 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Central Schemes (356)</span>
        </button>

        <button
          onClick={() => setActiveLevelTab('joint')}
          className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'joint'
              ? 'bg-[#7C3AED] border-purple-600 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>Joint Schemes (32)</span>
        </button>

        <button
          onClick={() => setActiveLevelTab('dept')}
          className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'dept'
              ? 'bg-[#7C3AED] border-purple-600 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-600" />
          <span>Departmental Programmes (18)</span>
        </button>

        <button
          onClick={() => setActiveLevelTab('welfare')}
          className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeLevelTab === 'welfare'
              ? 'bg-[#7C3AED] border-purple-600 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4 text-purple-600" />
          <span>Welfare Board Schemes (20)</span>
        </button>
      </div>

      {/* 5. Browse Schemes by Category (8 Categories in a Row) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            <h3 className="font-extrabold text-sm text-slate-900">Browse Schemes by Category</h3>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
          {[
            { id: 'women', label: 'Women & Family Welfare', icon: <Users className="w-4 h-4 text-pink-600" />, bg: 'bg-pink-50 border-pink-200 text-pink-900' },
            { id: 'students', label: 'Students & Education', icon: <GraduationCap className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 border-blue-200 text-blue-900' },
            { id: 'farmers', label: 'Farmers & Agriculture', icon: <Sprout className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
            { id: 'seniors', label: 'Senior Citizens & Social Security', icon: <Users className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 border-purple-200 text-purple-900' },
            { id: 'health', label: 'Healthcare & Medical', icon: <HeartPulse className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-200 text-rose-900' },
            { id: 'housing', label: 'Housing & Rural Development', icon: <HomeIcon className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-200 text-amber-900' },
            { id: 'jobs', label: 'Employment, Skills & Business', icon: <Briefcase className="w-4 h-4 text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
            { id: 'differently', label: 'Differently Abled Welfare', icon: <Accessibility className="w-4 h-4 text-sky-600" />, bg: 'bg-sky-50 border-sky-200 text-sky-900' },
            { id: 'other', label: 'Other Welfare Schemes', icon: <Award className="w-4 h-4 text-slate-600" />, bg: 'bg-slate-50 border-slate-200 text-slate-900' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'ring-2 ring-purple-600 shadow-xs'
                  : 'hover:shadow-2xs'
              } ${cat.bg}`}
            >
              <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center shrink-0">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold leading-tight line-clamp-2">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. 3-Column Main Grid (Left Filter, Center Schemes, Right Featured & Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Filter Schemes (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Filter Schemes</h4>
            </div>
            <button
              onClick={() => {
                setActiveLevelTab('all');
                setSelectedCategory(null);
              }}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Filter Section: Government Level */}
          <div className="space-y-2 text-xs">
            <button
              onClick={() => setShowGovLevelFilter(!showGovLevelFilter)}
              className="flex items-center justify-between w-full font-bold text-slate-900 py-1 cursor-pointer"
            >
              <span>Government Level</span>
              <span className="text-slate-400 font-mono">{showGovLevelFilter ? '▲' : '▼'}</span>
            </button>
            {showGovLevelFilter && (
              <div className="space-y-1.5 pl-1 text-slate-700">
                {[
                  { label: 'Tamil Nadu State Schemes (842)', checked: false },
                  { label: 'Central Government Schemes (356)', checked: false },
                  { label: 'Jointly Funded Schemes (32)', checked: false },
                  { label: 'Departmental Programmes (18)', checked: false },
                  { label: 'Welfare Board Schemes (20)', checked: false }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-purple-900">
                    <input type="checkbox" className="rounded text-purple-700 focus:ring-purple-600" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion Placeholders */}
          {['Department', 'Beneficiary Type', 'Eligibility (Age)', 'Income Range', 'Gender'].map((sec, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-2.5">
              <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
                <span>{sec}</span>
                <span className="text-slate-400 font-mono">▼</span>
              </button>
            </div>
          ))}

          {/* Filter Section: Scheme Status */}
          <div className="border-t border-slate-100 pt-2.5 space-y-2 text-xs">
            <button
              onClick={() => setShowStatusFilter(!showStatusFilter)}
              className="flex items-center justify-between w-full font-bold text-slate-900 py-1 cursor-pointer"
            >
              <span>Scheme Status</span>
              <span className="text-slate-400 font-mono">{showStatusFilter ? '▲' : '▼'}</span>
            </button>
            {showStatusFilter && (
              <div className="space-y-1.5 pl-1 text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-purple-700" />
                  <span className="font-semibold text-slate-900">Active (1,098)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-purple-700" />
                  <span>Applications Not Open (56)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-purple-700" />
                  <span>Temporarily Closed (38)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-purple-700" />
                  <span>Upcoming (40)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-purple-700" />
                  <span>Discontinued (16)</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: All Government Schemes (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900">All Government Schemes (1,248)</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-xl text-xs outline-hidden"
              >
                <option value="Latest Updated">Latest Updated</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Benefit Amount">Benefit Amount</option>
              </select>
            </div>
          </div>

          {/* 4 Exact Scheme Cards */}
          <div className="space-y-3.5">
            {/* CARD 1: Kalaignar Magalir Urimai Thogai Scheme */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                    <img src={womenImg} alt="Kalaignar Magalir Urimai Thogai" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Tamil Nadu Scheme
                      </span>
                      <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Active</span>
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Kalaignar Magalir Urimai Thogai Scheme
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark('kmur')}
                  className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked.kmur ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                ₹1,000 monthly financial assistance for eligible women heads of households in Tamil Nadu.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">₹1,000 / month</span>
                  <span>•</span>
                  <span>Women (18+ years)</span>
                  <span>•</span>
                  <span className="text-slate-500">Social Welfare Dept.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSchemeModal && onOpenSchemeModal({ titleEn: 'Kalaignar Magalir Urimai Thogai' })}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Kalaignar Magalir Urimai Thogai' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: Pudhumai Penn Scheme */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                    <img src={girlImg} alt="Pudhumai Penn Scheme" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Tamil Nadu Scheme
                      </span>
                      <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Active</span>
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Pudhumai Penn Scheme
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      புதுமைப் பெண் திட்டம்
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark('pp')}
                  className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked.pp ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                Financial assistance of ₹1,000 per month for girl students pursuing higher education.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">₹1,000 / month</span>
                  <span>•</span>
                  <span>Girl Students (UG/PG)</span>
                  <span>•</span>
                  <span className="text-slate-500">Higher Education Dept.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSchemeModal && onOpenSchemeModal({ titleEn: 'Pudhumai Penn' })}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Pudhumai Penn' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3: PM-KISAN */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                    <img src={farmerImg} alt="PM-KISAN" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Central Scheme
                      </span>
                      <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Active</span>
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      PM-KISAN
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      பிரதான் மந்திரி கிசான் சன்மான் நிதி
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark('pmkisan')}
                  className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked.pmkisan ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                Annual income support of ₹6,000 to eligible farmer families (₹2,000 in three equal instalments).
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">₹6,000 / year</span>
                  <span>•</span>
                  <span>Farmers (Landholding)</span>
                  <span>•</span>
                  <span className="text-slate-500">Ministry of Agriculture</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSchemeModal && onOpenSchemeModal({ titleEn: 'PM-KISAN' })}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'PM-KISAN' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 4: Kalaignarin Kanavu Illam */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                    <img src={houseImg} alt="Kalaignarin Kanavu Illam" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Tamil Nadu Scheme
                      </span>
                      <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Active</span>
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Kalaignarin Kanavu Illam
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      கலைஞரின் கனவு இல்லம்
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark('kanavu')}
                  className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked.kanavu ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                Housing assistance for eligible economically weaker families in Tamil Nadu.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">Housing Support</span>
                  <span>•</span>
                  <span>Low Income Families</span>
                  <span>•</span>
                  <span className="text-slate-500">Rural Development Dept.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSchemeModal && onOpenSchemeModal({ titleEn: 'Kalaignarin Kanavu Illam' })}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onNavigate('scheme-finder')}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>Showing 1 – 10 of 1,248 schemes</span>
            <div className="flex items-center gap-1 font-bold">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-400">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#7C3AED] text-white">1</button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700">2</button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700">3</button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700">4</button>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700">5</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="px-2 h-7 rounded-lg hover:bg-slate-100 text-slate-700">125</button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs">
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Featured Scheme + Schemes at a Glance + Useful Tools (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Featured Scheme Card */}
          <div className="bg-white rounded-2xl border border-purple-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-xs text-slate-900">Featured Scheme</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                TN State Scheme
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-300 shrink-0 bg-amber-50">
                <img src={leaderPortraitImg} alt="TN Leader" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs text-slate-900 leading-tight">
                  Kalaignar Magalir Urimai Thogai
                </h5>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenSchemeModal && onOpenSchemeModal({ titleEn: 'Kalaignar Magalir Urimai Thogai' })}
              className="w-full py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Schemes at a Glance */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span className="w-1.5 h-3 bg-purple-700 rounded-full"></span>
              <h4 className="font-extrabold text-xs text-slate-900">Schemes at a Glance</h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900">1,248</span>
                </div>
                <span className="text-slate-600 text-[11px]">Total Schemes</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900">1,098</span>
                </div>
                <span className="text-slate-600 text-[11px]">Active Schemes</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900">56</span>
                </div>
                <span className="text-slate-600 text-[11px]">Applications Not Open</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900">40</span>
                </div>
                <span className="text-slate-600 text-[11px]">Upcoming Schemes</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900">16</span>
                </div>
                <span className="text-slate-600 text-[11px]">Discontinued Schemes</span>
              </div>
            </div>
          </div>

          {/* Useful Tools */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <h4 className="font-extrabold text-xs text-slate-900">Useful Tools</h4>
            </div>

            <div className="space-y-1 text-xs">
              <button
                onClick={() => onNavigate('scheme-finder')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <span>Compare Schemes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('scheme-finder')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>My Eligible Schemes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('scheme-finder')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Bookmark className="w-3.5 h-3.5" />
                  </div>
                  <span>Save & Track Schemes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onOpenAIAssistant}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <span>Scheme Notifications</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
