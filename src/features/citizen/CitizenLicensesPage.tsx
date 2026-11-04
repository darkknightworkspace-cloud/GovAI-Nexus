import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  Bookmark, ExternalLink, ArrowRight, Filter, Home as HomeIcon,
  CreditCard, FileText, Car, Store, Utensils, Building, Monitor,
  Clock, Users, Star, Plus, RefreshCw, ListOrdered, Download,
  Edit, Calendar, ShieldCheck
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenLicensesPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenApplyModal?: (item: any) => void;
  onOpenChecklistModal?: (title: string) => void;
}

export const CitizenLicensesPage: React.FC<CitizenLicensesPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenApplyModal,
  onOpenChecklistModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Master Hero Banner with Landmarks Panorama */}
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
            <span>Licences &</span>
            <span className="text-purple-400">Permits</span>
            <span className="text-2xl">🪪</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil
              ? 'வணிகம், தொழில், கட்டிடம், போக்குவரத்து உள்ளிட்ட அனைத்து அரசு உரிமங்கள் மற்றும் அனுமதிகளைப் பெறுங்கள்.'
              : 'Apply, renew and manage business, professional, construction, transport and other licences & permits from Tamil Nadu and Central Government.'}
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
                Get help on licence eligibility, required documents, fees and process.
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
        <span className="font-bold text-slate-800">Licences & Permits</span>
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
              placeholder="Search licence or permit (e.g., Driving Licence, Trade Licence, FSSAI, Building Permit...)"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
            />
          </div>
          <button
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
            onClick={() => onNavigate('document-checklist')}
            className="px-3 py-1.5 rounded-xl border border-purple-200 hover:border-purple-400 bg-purple-50 text-purple-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Licence Guide</span>
          </button>
          <button
            onClick={() => onNavigate('scheme-finder')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Eligibility Check</span>
          </button>
          <button
            onClick={() => onNavigate('document-checklist')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-600" />
            <span>Document Checklist</span>
          </button>
        </div>
      </div>

      {/* 4. Metric Cards Strip (6 in a row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">124</div>
            <p className="text-[10px] text-slate-500 font-medium">Total Licences & Permits</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">86</div>
            <p className="text-[10px] text-slate-500 font-medium">Online Application</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">18</div>
            <p className="text-[10px] text-slate-500 font-medium">In-Person / Department</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">7 – 30 <span className="text-xs font-bold text-slate-600">Days</span></div>
            <p className="text-[10px] text-slate-500 font-medium">Avg. Processing Time</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">25,430</div>
            <p className="text-[10px] text-slate-500 font-medium">Applications (This Month)</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">4.6/5</div>
            <p className="text-[10px] text-slate-500 font-medium">Citizen Rating</p>
          </div>
        </div>
      </div>

      {/* 5. Browse by Category (7 categories) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            <h3 className="font-extrabold text-sm text-slate-900">Browse by Category</h3>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {[
            { id: 'business', label: 'Business & Professional', icon: <Store className="w-4 h-4 text-pink-700" />, bg: 'bg-pink-50/60 border-pink-200 text-pink-900' },
            { id: 'construction', label: 'Construction & Building', icon: <Building className="w-4 h-4 text-sky-700" />, bg: 'bg-sky-50/60 border-sky-200 text-sky-900' },
            { id: 'transport', label: 'Transport & Vehicle', icon: <Car className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-900' },
            { id: 'health', label: 'Health & Food Safety', icon: <Utensils className="w-4 h-4 text-rose-700" />, bg: 'bg-rose-50/60 border-rose-200 text-rose-900' },
            { id: 'env', label: 'Environment & Pollution', icon: <ShieldCheck className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-900' },
            { id: 'agri', label: 'Agriculture & Inputs', icon: <Users className="w-4 h-4 text-purple-700" />, bg: 'bg-purple-50/60 border-purple-200 text-purple-900' },
            { id: 'trade', label: 'Trade & Commercial', icon: <Store className="w-4 h-4 text-amber-700" />, bg: 'bg-amber-50/60 border-amber-200 text-amber-900' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === cat.id ? 'ring-2 ring-purple-600 shadow-xs' : 'hover:shadow-2xs'
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

      {/* 6. 3-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Filter Licences & Permits (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Filter Licences & Permits</h4>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Issuing Authority */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 py-1">
              <span>Issuing Authority</span>
              <span className="text-slate-400 font-mono">▲</span>
            </div>
            <div className="space-y-1.5 pl-1 text-slate-700">
              {[
                { label: 'Tamil Nadu Government (72)' },
                { label: 'Central Government (28)' },
                { label: 'Local Body (12)' },
                { label: 'Other Authorities (12)' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-purple-900">
                  <input type="checkbox" className="rounded text-purple-700 focus:ring-purple-600" />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Licence Type */}
          <div className="border-t border-slate-100 pt-2.5">
            <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
              <span>Licence Type</span>
              <span className="text-slate-400 font-mono">▼</span>
            </button>
          </div>

          {/* Department */}
          <div className="border-t border-slate-100 pt-2.5">
            <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
              <span>Department</span>
              <span className="text-slate-400 font-mono">▼</span>
            </button>
          </div>

          {/* Application Mode */}
          <div className="border-t border-slate-100 pt-2.5 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 py-1">
              <span>Application Mode</span>
              <span className="text-slate-400 font-mono">▲</span>
            </div>
            <div className="space-y-1.5 pl-1 text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-purple-700" />
                <span className="font-semibold text-slate-900">Online (86)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-purple-700" />
                <span>Offline / Department Visit (38)</span>
              </label>
            </div>
          </div>

          {['Validity Period', 'Fee Range'].map((sec, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-2.5">
              <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
                <span>{sec}</span>
                <span className="text-slate-400 font-mono">▼</span>
              </button>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN: All Licences & Permits (124) (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-slate-900">All Licences & Permits (124)</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-xl text-xs outline-hidden"
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Processing Time">Processing Time</option>
                <option value="Validity">Validity</option>
              </select>
            </div>
          </div>

          {/* 4 Licence Cards */}
          <div className="space-y-3.5">
            {/* 1. Driving Licence (DL) */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Driving Licence (DL)</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">ஓட்டுநர் உரிமம்</p>
                    <p className="text-xs text-slate-600 mt-1">Apply for a new driving licence, renewal, duplicate or address change.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('lic_dl')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.lic_dl ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Transport Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 15 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: As per rules</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Driving Licence') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Driving Licence' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Trade Licence */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Trade Licence</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">தொழில் உரிமம்</p>
                    <p className="text-xs text-slate-600 mt-1">Licence to run a trade, business or commercial establishment.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('lic_trade')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.lic_trade ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Local Body (Corporation / Municipality / Panchayat)</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 21 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: As per local body rules</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Trade Licence') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Trade Licence' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. FSSAI Licence */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">FSSAI Licence</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">உணவு வணிக உரிமம்</p>
                    <p className="text-xs text-slate-600 mt-1">Food safety licence for food business operators (manufacturing, storage, sale, etc.).</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('lic_fssai')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.lic_fssai ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ FSSAI (Central Govt.)</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 30 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: As per FSSAI norms</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('FSSAI Licence') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'FSSAI Licence' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Building Plan Approval */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Building Plan Approval</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">கட்டிட திட்ட அனுமதி</p>
                    <p className="text-xs text-slate-600 mt-1">Approval for construction, renovation or extension of buildings.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('lic_bpa')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.lic_bpa ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Local Body / Town & Country Planning</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 15 – 30 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: As per building area</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Building Plan Approval') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Building Plan Approval' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>Showing 1 – 4 of 124 licences & permits</span>
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
              <button className="px-2 h-7 rounded-lg hover:bg-slate-100 text-slate-700">31</button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs">
                <option>4 per page</option>
                <option>10 per page</option>
                <option>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions + My Licence Applications + How to Apply */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Actions (6 Tiles in 3x2 Grid) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <h4 className="font-extrabold text-xs text-slate-900">Quick Actions</h4>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => onNavigate('apply')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-purple-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-purple-700" />
                <span className="text-[10px] font-bold leading-tight">Apply for New Licence</span>
              </button>

              <button
                onClick={() => onNavigate('renewal-reminders')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-blue-700" />
                <span className="text-[10px] font-bold leading-tight">Renew Licence</span>
              </button>

              <button
                onClick={() => onNavigate('my-applications')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <ListOrdered className="w-4 h-4 text-emerald-700" />
                <span className="text-[10px] font-bold leading-tight">Check Status</span>
              </button>

              <button
                onClick={() => onNavigate('documents-vault')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] font-bold leading-tight">Download Licence</span>
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4 text-rose-700" />
                <span className="text-[10px] font-bold leading-tight">Update Details</span>
              </button>

              <button
                onClick={() => onNavigate('renewal-reminders')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-purple-900 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-purple-700" />
                <span className="text-[10px] font-bold leading-tight">Validity & Renewal</span>
              </button>
            </div>
          </div>

          {/* My Licence Applications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-extrabold text-xs text-slate-900">My Licence Applications</h4>
              <button onClick={() => onNavigate('my-applications')} className="text-[11px] font-bold text-purple-700 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Driving Licence (Renewal)</h5>
                    <p className="text-[10px] text-slate-400">App No: TNDL25009345</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Approved
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-blue-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Trade Licence</h5>
                    <p className="text-[10px] text-slate-400">App No: TNLB25007621</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Under Review
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">FSSAI Licence</h5>
                    <p className="text-[10px] text-slate-400">App No: FSSAI25004192</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Documents Required
                </span>
              </div>
            </div>
          </div>

          {/* How to Apply for a Licence / Permit */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <h4 className="font-extrabold text-xs text-slate-900">How to Apply for a Licence / Permit</h4>
            </div>

            {/* 4 Step Process */}
            <div className="flex items-center justify-between text-center py-2 px-1">
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  1
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Select</span>
                <span className="text-[9px] text-slate-500">Licence</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  2
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Check</span>
                <span className="text-[9px] text-slate-500">Eligibility</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  3
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Upload</span>
                <span className="text-[9px] text-slate-500">Documents</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  4
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Apply &</span>
                <span className="text-[9px] text-slate-500">Track</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
