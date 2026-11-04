import React, { useState } from 'react';
import { 
  Building2, Search, Filter, CheckCircle2, ShieldCheck, 
  ExternalLink, Sparkles, ArrowRight, Clock, RefreshCw, AlertCircle
} from 'lucide-react';
import { MASTER_LICENCES } from '../../data/govDirectoryData';
import { GovLicence } from '../../types';

interface LicencesDirectoryPageProps {
  language: 'en' | 'ta';
  onApplyLicence: (licence: GovLicence) => void;
  onOpenAI: () => void;
}

export const LicencesDirectoryPage: React.FC<LicencesDirectoryPageProps> = ({
  language,
  onApplyLicence,
  onOpenAI
}) => {
  const isTamil = language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Business & Professional Licences',
    'Construction & Local Body Permits',
    'Transport & Vehicle Licences'
  ];

  const filteredLicences = MASTER_LICENCES.filter(lic => {
    const matchesCat = selectedCategory === 'All' || lic.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      lic.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lic.titleTa.includes(searchQuery) ||
      lic.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lic.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-white/10 px-3 py-1 rounded-full">
            {isTamil ? 'அரசு உரிமங்கள் & அனுமதிகள்' : 'Government Licences & Permits Directory'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTamil ? 'வணிகம் & கட்டுமான உரிமங்கள்' : 'Business, Trade & Statutory Permits'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            {isTamil
              ? 'வணிகத் தொழில் உரிமம், உணவுப் பாதுகாப்பு (FSSAI), உத்யம் குறுந்தொழில் மற்றும் கட்டிட திட்ட அனுமதி ஆகியவற்றை ஒற்றைச் சாளர முறையில் எளிதாக பெறுங்கள்.'
              : 'End-to-end directory of municipal trade licenses, FSSAI food business registration, MSME Udyam certificates, building approvals, and renewal timelines.'}
          </p>
        </div>

        <button
          onClick={onOpenAI}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{isTamil ? 'AI உரிம ஆலோசகர்' : 'Ask AI Licence Advisor'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={isTamil ? 'உரிமத்தின் பெயர் அல்லது துறை மூலம் தேடவும்...' : 'Search by licence name (e.g. Trade License, FSSAI, Building Plan, MSME)...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-600 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span className="font-bold text-slate-900">{filteredLicences.length}</span> licences listed
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
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

      {/* Licences Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLicences.map(lic => (
          <div
            key={lic.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {lic.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Validity: {lic.validityPeriod}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  {isTamil ? lic.titleTa : lic.titleEn}
                </h3>
                {isTamil && (
                  <p className="text-xs text-slate-500 font-medium">{lic.titleEn}</p>
                )}
                <p className="text-xs text-purple-700 font-semibold mt-1">
                  {lic.issuingAuthority} · {lic.department}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lic.purpose}
              </p>

              {/* Eligibility & Audience */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800">Target Audience: </strong>
                  <span className="text-slate-600">{lic.targetAudience}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Eligibility Norms: </strong>
                  <span className="text-slate-600">{lic.eligibility}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Application Fee: </strong>
                  <span className="text-emerald-700 font-bold">{lic.applicationFee}</span>
                </div>
              </div>

              {/* Renewal Process & Required Documents */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-700" />
                  <span>Renewal Timeline & Procedure:</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                  {lic.renewalProcess}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Documents Needed:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {lic.requiredDocuments.map((doc, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {lic.officialApplyUrl && (
                <a
                  href={lic.officialApplyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              )}

              <button
                onClick={() => onApplyLicence(lic)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
