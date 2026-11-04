import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  Bookmark, ExternalLink, ArrowRight, Filter, Home as HomeIcon,
  FileText, Users, Car, MapPin, Monitor, Award, Zap, Star,
  Shield, Building2, Check, Clock, Layers, FileCheck, Phone
} from 'lucide-react';
import secretariatBgImg from '../../assets/images/tn_secretariat_banner_1793711221214.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenServicesPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenApplyModal?: (item: any) => void;
  onOpenChecklistModal?: (title: string) => void;
}

export const CitizenServicesPage: React.FC<CitizenServicesPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenApplyModal,
  onOpenChecklistModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Master Hero Banner with Secretariat Building */}
      <div className="bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E293B] rounded-3xl p-5 sm:p-7 relative overflow-hidden text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            src={secretariatBgImg}
            alt="Tamil Nadu Secretariat Fort St George"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E3A8A]/90 to-transparent w-full lg:w-3/5"></div>
        </div>

        {/* Heading */}
        <div className="relative z-10 space-y-2 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Government</span>
            <span className="text-purple-400">Services</span>
            <span className="text-2xl">⚙️</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil
              ? 'தமிழ்நாடு மற்றும் மத்திய அரசிடமிருந்து சான்றிதழ்கள், உரிமங்கள், அனுமதிகள் மற்றும் பிற அரசு சேவைகளுக்கு விண்ணப்பிக்கவும்.'
              : 'Apply for certificates, licences, permits and other government services from Tamil Nadu Government and Central Government.'}
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
                Get help on service procedure, required documents and apply steps.
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
        <span className="font-bold text-slate-800">Government Services</span>
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
              placeholder="Search for a service (e.g., Income Certificate, Community Certificate, Driving Licence, Patta, etc.)"
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
            onClick={() => onNavigate('services')}
            className="px-3 py-1.5 rounded-xl border border-purple-200 hover:border-purple-400 bg-purple-50 text-purple-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Service Directory</span>
          </button>
          <button
            onClick={() => onNavigate('my-applications')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Check Status</span>
          </button>
          <button
            onClick={() => onNavigate('document-checklist')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Document Checklist</span>
          </button>
        </div>
      </div>

      {/* 4. Metric Cards Strip (6 in a row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">356</div>
            <p className="text-[10px] text-slate-500 font-medium">Total Services</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">278</div>
            <p className="text-[10px] text-slate-500 font-medium">Online Services</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">42</div>
            <p className="text-[10px] text-slate-500 font-medium">In-Person Services</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">22</div>
            <p className="text-[10px] text-slate-500 font-medium">Integrated Services</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">128</div>
            <p className="text-[10px] text-slate-500 font-medium">Frequently Used</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">4.8/5</div>
            <p className="text-[10px] text-slate-500 font-medium">Citizen Satisfaction</p>
          </div>
        </div>
      </div>

      {/* 5. Explore Government Services by Category (10 categories in 5x2 grid) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            <h3 className="font-extrabold text-sm text-slate-900">Explore Government Services by Category</h3>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 'revenue', label: 'Revenue & Certificates', icon: <FileText className="w-4 h-4 text-purple-700" />, bg: 'bg-purple-50/60 border-purple-200 text-purple-900' },
            { id: 'identity', label: 'Identity & Civil Services', icon: <Users className="w-4 h-4 text-blue-700" />, bg: 'bg-blue-50/60 border-blue-200 text-blue-900' },
            { id: 'transport', label: 'Transport & Vehicle Services', icon: <Car className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-900' },
            { id: 'land', label: 'Land & Property Services', icon: <MapPin className="w-4 h-4 text-amber-700" />, bg: 'bg-amber-50/60 border-amber-200 text-amber-900' },
            { id: 'business', label: 'Business & Licences', icon: <Building2 className="w-4 h-4 text-rose-700" />, bg: 'bg-rose-50/60 border-rose-200 text-rose-900' },
            { id: 'education', label: 'Education Services', icon: <Award className="w-4 h-4 text-sky-700" />, bg: 'bg-sky-50/60 border-sky-200 text-sky-900' },
            { id: 'health', label: 'Health & Medical Services', icon: <Zap className="w-4 h-4 text-pink-700" />, bg: 'bg-pink-50/60 border-pink-200 text-pink-900' },
            { id: 'agriculture', label: 'Agriculture & Farmer Services', icon: <FileCheck className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-900' },
            { id: 'welfare', label: 'Social Welfare Services', icon: <Users className="w-4 h-4 text-violet-700" />, bg: 'bg-violet-50/60 border-violet-200 text-violet-900' },
            { id: 'utility', label: 'Utility & Civic Services', icon: <Clock className="w-4 h-4 text-cyan-700" />, bg: 'bg-cyan-50/60 border-cyan-200 text-cyan-900' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                selectedCategory === cat.id ? 'ring-2 ring-purple-600 shadow-xs' : 'hover:shadow-2xs'
              } ${cat.bg}`}
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center shrink-0">
                {cat.icon}
              </div>
              <span className="text-xs font-bold leading-tight text-left">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. 3-Column Split: Filter on Left, Center Services List, Right Apply Guide & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Filter Services (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Filter Services</h4>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Department */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 py-1">
              <span>Department</span>
              <span className="text-slate-400 font-mono">▲</span>
            </div>
            <div className="space-y-1.5 pl-1 text-slate-700">
              {[
                { label: 'Revenue Department (68)' },
                { label: 'Transport Department (26)' },
                { label: 'Rural Development (18)' },
                { label: 'Social Welfare (22)' },
                { label: 'Agriculture (16)' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-purple-900">
                  <input type="checkbox" className="rounded text-purple-700 focus:ring-purple-600" />
                  <span>{item.label}</span>
                </label>
              ))}
              <button className="text-purple-700 font-bold hover:underline pt-1 text-[11px] block">
                + Show More
              </button>
            </div>
          </div>

          {['Service Type', 'Mode of Application', 'Service Fee', 'Processing Time'].map((sec, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-2.5">
              <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
                <span>{sec}</span>
                <span className="text-slate-400 font-mono">▼</span>
              </button>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN: All Government Services (356) (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-slate-900">All Government Services (356)</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-xl text-xs outline-hidden"
              >
                <option value="Popularity">Popularity</option>
                <option value="Processing Time">Processing Time</option>
                <option value="Department">Department</option>
              </select>
            </div>
          </div>

          {/* 4 Cards */}
          <div className="space-y-3.5">
            {/* 1. Income Certificate */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Income Certificate</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">வருமானச் சான்றிதழ்</p>
                    <p className="text-xs text-slate-600 mt-1">To certify the annual income of an individual / family.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('income')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.income ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ Usually 7 – 15 days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: ₹0</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Income Certificate') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Income Certificate' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Community Certificate */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Community Certificate</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">சமூகச் சான்றிதழ்</p>
                    <p className="text-xs text-slate-600 mt-1">To certify the community (caste) of an individual.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('community')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.community ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ Usually 7 – 15 days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: ₹0</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Community Certificate') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Community Certificate' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Driving Licence (DL) */}
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
                    <p className="text-xs text-slate-600 mt-1">Issue / Renew / Duplicate of Driving Licence.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('dl')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.dl ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Transport Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ Usually 3 – 7 days</span>
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

            {/* 4. Patta (Land Ownership) */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Patta (Land Ownership)</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">பட்டா (நில உரிமைச் சான்று)</p>
                    <p className="text-xs text-slate-600 mt-1">To obtain Patta / update land ownership records.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('patta')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.patta ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ Usually 15 – 30 days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: As per rules</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Patta Transfer') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Patta Transfer' }) : onNavigate('apply')}
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
            <span>Showing 1 – 4 of 356 services</span>
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
              <button className="px-2 h-7 rounded-lg hover:bg-slate-100 text-slate-700">89</button>
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

        {/* RIGHT COLUMN: Apply & Track Easily + My Recent Services + Service Statistics */}
        <div className="lg:col-span-3 space-y-4">
          {/* Apply & Track Easily */}
          <div className="bg-white rounded-2xl border border-purple-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Apply & Track Easily</h4>
            </div>

            <div className="space-y-2 text-xs">
              {[
                'Choose a service',
                'Check eligibility & documents',
                'Apply online or at e-Sevai',
                'Track application status',
                'Get updates & download certificate'
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('apply')}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <span>Apply for a Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* My Recent Services */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-extrabold text-xs text-slate-900">My Recent Services</h4>
              <button onClick={() => onNavigate('my-applications')} className="text-[11px] font-bold text-purple-700 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Income Certificate</h5>
                    <p className="text-[10px] text-slate-400">App No: TNIC25011839</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Approved
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Driving Licence (Renewal)</h5>
                    <p className="text-[10px] text-slate-400">App No: TNDL25009345</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Under Review
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Community Certificate</h5>
                    <p className="text-[10px] text-slate-400">App No: TNCC25010721</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Documents Required
                </span>
              </div>
            </div>
          </div>

          {/* Service Statistics Mini Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <h4 className="font-extrabold text-xs text-slate-900">Service Statistics</h4>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-purple-50">
                <div className="font-extrabold text-sm text-purple-900">356</div>
                <p className="text-[10px] text-slate-500 font-medium">Total Services</p>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50">
                <div className="font-extrabold text-sm text-emerald-900">278</div>
                <p className="text-[10px] text-slate-500 font-medium">Online</p>
              </div>
              <div className="p-2 rounded-xl bg-amber-50">
                <div className="font-extrabold text-sm text-amber-900">4.8/5</div>
                <p className="text-[10px] text-slate-500 font-medium">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
