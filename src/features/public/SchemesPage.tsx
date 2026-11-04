import React, { useState } from 'react';
import { 
  Award, CheckCircle2, HeartHandshake, ArrowRight, Sparkles, 
  Search, Filter, Users, Calendar, HelpCircle, ShieldCheck, Landmark, ExternalLink
} from 'lucide-react';
import { TN_SCHEMES } from '../../data/mockData';
import { GovScheme } from '../../types';

interface SchemesPageProps {
  language: 'en' | 'ta';
  onEnrollScheme: (schemeName: string) => void;
  onSelectScheme?: (scheme: GovScheme) => void;
  onOpenAI: () => void;
}

export const SchemesPage: React.FC<SchemesPageProps> = ({ 
  language, 
  onEnrollScheme, 
  onSelectScheme,
  onOpenAI 
}) => {
  const isTamil = language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showEligibilityQuiz, setShowEligibilityQuiz] = useState<boolean>(false);

  const categories = [
    'All',
    'Women Empowerment & Family Welfare',
    'Students & Higher Education',
    'Farmers & Agriculture',
    'Senior Citizens, Widows & Social Security',
    'Healthcare & Nutrition',
    'Housing & Rural Development',
    'Employment, Entrepreneurship & Skills',
    'Differently Abled Welfare',
    'Other Citizen Welfare Schemes'
  ];

  const filteredSchemes = TN_SCHEMES.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesClass = selectedClassification === 'All' || 
      (selectedClassification === 'State' && s.classification?.includes('State')) ||
      (selectedClassification === 'Central' && s.classification?.includes('Central'));
    
    const matchesSearch = !searchQuery || 
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.titleTa && s.titleTa.includes(searchQuery)) ||
      (s.benefitEn && s.benefitEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesClass && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-white/10 px-3 py-1 rounded-full">
            {isTamil ? 'தமிழ்நாடு சமூக நலத் திட்டங்கள் (9 பிரிவுகள்)' : '9 Master Welfare Scheme Categories'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTamil ? 'அரசு நலத்திட்டங்கள் & பயன்கள்' : 'Schemes & Citizen Welfare Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            {isTamil
              ? 'கலைஞர் மகளிர் உரிமைத் தொகை, விடியல் பயணம், புதுமைப் பெண், தமிழ்ப் புதல்வன், உழவர் பாதுகாப்பு, முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு (CMCHIS) மற்றும் அனைத்து அரசு நலத்திட்டங்கள்.'
              : 'Verified directory of Tamil Nadu State and Central Government flagship welfare schemes with real application gateways, eligibility rules, and DBT financial benefits.'}
          </p>
        </div>

        <button
          onClick={() => setShowEligibilityQuiz(!showEligibilityQuiz)}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{isTamil ? 'விரைவு தகுதித் தேடல்' : 'Quick Eligibility Finder'}</span>
        </button>
      </div>

      {/* Interactive Quick Eligibility Recommendation Bar */}
      {showEligibilityQuiz && (
        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-200 shadow-sm space-y-4 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-purple-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>Demographic Scheme Quick Filters</span>
            </h3>
            <button
              onClick={() => setShowEligibilityQuiz(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-slate-600">Click a demographic category below to view all corresponding state schemes:</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('Women Empowerment & Family Welfare')}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-100"
            >
              👩 Women & Family (KMUT, Vidiyal Payanam, CM Girl Child)
            </button>
            <button
              onClick={() => setSelectedCategory('Students & Higher Education')}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-100"
            >
              🎓 Students & Youth (Pudhumai Penn, Tamil Pudhalvan, Naan Mudhalvan)
            </button>
            <button
              onClick={() => setSelectedCategory('Farmers & Agriculture')}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-100"
            >
              🌾 Farmers & Agri (Uzhavar Pathukapu, Micro Irrigation, PM-KISAN)
            </button>
            <button
              onClick={() => setSelectedCategory('Healthcare & Nutrition')}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-100"
            >
              🏥 Healthcare (CMCHIS, Makkalai Thedi Maruthuvam, Innuyir Kappom)
            </button>
            <button
              onClick={() => setSelectedCategory('Senior Citizens, Widows & Social Security')}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-100"
            >
              👴 Senior Citizens & Social Security (OAP, Destitute Widow Pension)
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTamil ? 'திட்டங்களைத் தேடுங்கள் (எ.கா. மகளிர் உரிமை, புதுமைப் பெண்)...' : 'Search schemes by title, financial grant, or department...'}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30 transition-all"
            />
          </div>

          {/* Classification Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
            {[
              { id: 'All', label: 'All Schemes' },
              { id: 'State', label: 'Tamil Nadu State' },
              { id: 'Central', label: 'Central Govt' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedClassification(f.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedClassification === f.id
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 9 Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-purple-300 transition-all hover:shadow-md space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                  {scheme.category}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  scheme.classification?.includes('Central')
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  {scheme.classification?.includes('Central') ? 'Central Govt Scheme' : 'Tamil Nadu State Scheme'}
                </span>
              </div>

              <div>
                <h3 
                  onClick={() => onSelectScheme && onSelectScheme(scheme)}
                  className="font-extrabold text-lg text-slate-900 group-hover:text-purple-700 transition-colors cursor-pointer"
                >
                  {isTamil && scheme.titleTa ? scheme.titleTa : scheme.titleEn}
                </h3>
                {isTamil && scheme.titleTa && (
                  <p className="text-xs text-slate-500 font-medium">{scheme.titleEn}</p>
                )}
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{scheme.department}</span>
                </p>
              </div>

              {/* Financial Benefit Highlight */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 text-purple-950 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-700 block tracking-wider">
                  {scheme.financialAssistance ? 'Financial Benefit & Grant' : 'Direct Citizen Benefit'}
                </span>
                <p className="font-extrabold text-sm sm:text-base leading-snug">
                  {scheme.financialAssistance || (isTamil ? scheme.benefitTa : scheme.benefitEn)}
                </p>
                {scheme.paymentFrequency && (
                  <span className="text-[11px] text-purple-700 font-medium block">
                    Mode: {scheme.paymentFrequency}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <span className="font-bold text-slate-800 block">Eligible Target Group:</span>
                <p className="leading-relaxed line-clamp-2">{scheme.targetGroup || 'Residents meeting income criteria'}</p>
              </div>

              {scheme.governmentOrder && (
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">G.O.:</span> {scheme.governmentOrder}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectScheme ? onSelectScheme(scheme) : onEnrollScheme(scheme.titleEn)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
                <span>Guidelines & Eligibility</span>
              </button>

              <button
                onClick={() => onEnrollScheme(scheme.titleEn)}
                className="py-2.5 px-5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Award className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-800">No schemes found</h3>
          <p className="text-xs text-slate-500">Try choosing a different category or clearing search filters.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedClassification('All'); setSearchQuery(''); }}
            className="px-4 py-2 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-100"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
