import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  Bookmark, ExternalLink, ArrowRight, Filter, Home as HomeIcon,
  FileText, Users, GraduationCap, MapPin, Monitor, Clock,
  Star, Award, PlayCircle, Layers, FileCheck
} from 'lucide-react';
import secretariatBgImg from '../../assets/images/tn_secretariat_banner_1793711221214.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenCertificatesPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenApplyModal?: (item: any) => void;
  onOpenChecklistModal?: (title: string) => void;
}

export const CitizenCertificatesPage: React.FC<CitizenCertificatesPageProps> = ({
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
      {/* 1. Master Hero Banner with Secretariat */}
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
            <span className="text-purple-400">Certificates</span>
            <span className="text-2xl">🏵️</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil
              ? 'வருமானம், சாதி, இருப்பிடம், முதல் பட்டதாரி உள்ளிட்ட அதிகாரப்பூர்வ அரசு சான்றிதழ்களுக்கு விண்ணப்பிக்கவும்.'
              : 'Apply for revenue, community, income, nativity and other certificates issued by Tamil Nadu Government.'}
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
                Know certificate eligibility, required documents and apply steps.
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
        <span className="font-bold text-slate-800">Certificates</span>
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
              placeholder="Search certificates (e.g., Income Certificate, Community Certificate, Nativity Certificate....)"
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
            <span>Certificate Guide</span>
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
            <Layers className="w-3.5 h-3.5 text-purple-600" />
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
            <div className="text-lg font-extrabold text-slate-900 leading-tight">28</div>
            <p className="text-[10px] text-slate-500 font-medium">Total Certificates</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">24</div>
            <p className="text-[10px] text-slate-500 font-medium">Online Available</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">4</div>
            <p className="text-[10px] text-slate-500 font-medium">Department Visit</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">7 – 15 <span className="text-xs font-bold text-slate-600">Days</span></div>
            <p className="text-[10px] text-slate-500 font-medium">Avg. Processing Time</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">12,468</div>
            <p className="text-[10px] text-slate-500 font-medium">Applications (This Month)</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">4.7/5</div>
            <p className="text-[10px] text-slate-500 font-medium">Citizen Rating</p>
          </div>
        </div>
      </div>

      {/* 5. Browse Certificates by Category (8 cards) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            <h3 className="font-extrabold text-sm text-slate-900">Browse Certificates by Category</h3>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {[
            { id: 'rev', label: 'Revenue Certificates', icon: <FileText className="w-4 h-4 text-pink-700" />, bg: 'bg-pink-50/60 border-pink-200 text-pink-900' },
            { id: 'comm', label: 'Community & Caste Certificates', icon: <Users className="w-4 h-4 text-blue-700" />, bg: 'bg-blue-50/60 border-blue-200 text-blue-900' },
            { id: 'inc', label: 'Income & Economic Certificates', icon: <Award className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-900' },
            { id: 'nat', label: 'Residence & Nativity Certificates', icon: <HomeIcon className="w-4 h-4 text-amber-700" />, bg: 'bg-amber-50/60 border-amber-200 text-amber-900' },
            { id: 'fam', label: 'Family & Relationship Certificates', icon: <Users className="w-4 h-4 text-rose-700" />, bg: 'bg-rose-50/60 border-rose-200 text-rose-900' },
            { id: 'edu', label: 'Education Related Certificates', icon: <GraduationCap className="w-4 h-4 text-sky-700" />, bg: 'bg-sky-50/60 border-sky-200 text-sky-900' },
            { id: 'spec', label: 'Special Purpose Certificates', icon: <FileCheck className="w-4 h-4 text-indigo-700" />, bg: 'bg-indigo-50/60 border-indigo-200 text-indigo-900' },
            { id: 'oth', label: 'Other Certificates', icon: <Layers className="w-4 h-4 text-slate-700" />, bg: 'bg-slate-50 border-slate-200 text-slate-900' },
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
        {/* LEFT COLUMN: Filter Certificates (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Filter Certificates</h4>
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
                { label: 'Revenue Department (14)' },
                { label: 'Social Welfare Dept. (5)' },
                { label: 'Backward Classes Dept. (3)' },
                { label: 'Education Department (2)' },
                { label: 'Other Departments (4)' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-purple-900">
                  <input type="checkbox" className="rounded text-purple-700 focus:ring-purple-600" />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Certificate Type */}
          <div className="border-t border-slate-100 pt-2.5">
            <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
              <span>Certificate Type</span>
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
                <span className="font-semibold text-slate-900">Online (24)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-purple-700" />
                <span>Offline / Department Visit (4)</span>
              </label>
            </div>
          </div>

          {['Processing Time', 'Availability'].map((sec, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-2.5">
              <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
                <span>{sec}</span>
                <span className="text-slate-400 font-mono">▼</span>
              </button>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN: All Certificates (28) (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-slate-900">All Certificates (28)</h3>
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
                <option value="Department">Department</option>
              </select>
            </div>
          </div>

          {/* 4 Certificate Cards */}
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
                    <p className="text-xs text-slate-600 mt-1">To certify the annual income of an individual or family.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('cert_income')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.cert_income ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 15 Days</span>
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
                    <p className="text-[11px] text-slate-500 font-medium">சாதிச் சான்றிதழ்</p>
                    <p className="text-xs text-slate-600 mt-1">To certify the community (caste) of an individual.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('cert_comm')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.cert_comm ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 15 Days</span>
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

            {/* 3. Nativity Certificate */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Nativity Certificate</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">இருப்பிடச் சான்றிதழ்</p>
                    <p className="text-xs text-slate-600 mt-1">To certify that the applicant is a native of Tamil Nadu.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('cert_nativity')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.cert_nativity ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Revenue Department</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 15 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: ₹0</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('Nativity Certificate') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'Nativity Certificate' }) : onNavigate('apply')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. First Graduate Certificate */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">First Graduate Certificate</h4>
                      <span className="text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">முதல் பட்டதாரி சான்றிதழ்</p>
                    <p className="text-xs text-slate-600 mt-1">To certify that the applicant is the first graduate in the family.</p>
                  </div>
                </div>

                <button onClick={() => toggleBookmark('cert_fg')} className="text-slate-400 hover:text-purple-700 p-1">
                  <Bookmark className={`w-4 h-4 ${bookmarked.cert_fg ? 'text-purple-700 fill-purple-700' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">🏛️ Higher Education Dept.</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱️ 7 – 15 Days</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Fee: ₹0</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChecklistModal ? onOpenChecklistModal('First Graduate Certificate') : onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal({ titleEn: 'First Graduate Certificate' }) : onNavigate('apply')}
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
            <span>Showing 1 – 4 of 28 certificates</span>
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
              <button className="px-2 h-7 rounded-lg hover:bg-slate-100 text-slate-700">7</button>
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

        {/* RIGHT COLUMN: My Certificate Applications + How to Apply */}
        <div className="lg:col-span-3 space-y-4">
          {/* My Certificate Applications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-extrabold text-xs text-slate-900">My Certificate Applications</h4>
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
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Community Certificate</h5>
                    <p className="text-[10px] text-slate-400">App No: TNCC25010721</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Under Review
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Nativity Certificate</h5>
                    <p className="text-[10px] text-slate-400">App No: TNNC25009956</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Documents Required
                </span>
              </div>
            </div>
          </div>

          {/* How to Apply for a Certificate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <h4 className="font-extrabold text-xs text-slate-900">How to Apply for a Certificate</h4>
            </div>

            {/* 4 Step Process */}
            <div className="flex items-center justify-between text-center py-2 px-1">
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  1
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Check</span>
                <span className="text-[9px] text-slate-500">Eligibility</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  2
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Prepare</span>
                <span className="text-[9px] text-slate-500">Documents</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  3
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Apply</span>
                <span className="text-[9px] text-slate-500">Online</span>
              </div>
              <span className="text-slate-300 font-mono">→</span>
              <div>
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                  4
                </div>
                <span className="text-[10px] font-bold text-slate-800 block">Track</span>
                <span className="text-[9px] text-slate-500">Status</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('document-checklist')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-purple-700" />
              <span>View Detailed Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
