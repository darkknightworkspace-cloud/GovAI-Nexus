import React, { useState } from 'react';
import { 
  FileText, Search, Filter, CheckCircle2, ShieldCheck, 
  ExternalLink, Sparkles, ArrowRight, Clock, Building2, Download
} from 'lucide-react';
import { MASTER_DOCUMENTS } from '../../data/govDirectoryData';
import { GovDocument } from '../../types';

interface DocumentsDirectoryPageProps {
  language: 'en' | 'ta';
  onOpenChecklist: (docTitle: string) => void;
  onApplyDoc: (doc: GovDocument) => void;
  onOpenAI: () => void;
}

export const DocumentsDirectoryPage: React.FC<DocumentsDirectoryPageProps> = ({
  language,
  onOpenChecklist,
  onApplyDoc,
  onOpenAI
}) => {
  const isTamil = language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Identity Documents',
    'Address & Residence Proof',
    'Revenue & Community Certificates',
    'Birth, Marriage & Family',
    'Educational Documents',
    'Land, Property & Agricultural Records',
    'Financial & Banking Documents',
    'Healthcare & Medical Records',
    'Employment & Skill Certificates',
    'Transport Documents'
  ];

  const filteredDocs = MASTER_DOCUMENTS.filter(d => {
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      d.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.titleTa.includes(searchQuery) ||
      d.descEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-white/10 px-3 py-1 rounded-full">
            {isTamil ? 'அரசு ஆவணங்கள் & சான்றிதழ்கள் பட்டியல்' : 'Government Certificates & Documents Directory'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTamil ? 'அதிகாரப்பூர்வ ஆவணங்கள் & சான்றிதழ்கள்' : 'Certificates, Records & Vital Documents'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            {isTamil
              ? 'சாதிச் சான்றிதழ், வருமானச் சான்றிதழ், பட்டா சிட்டா, பிறப்புச் சான்றிதழ் மற்றும் ஓட்டுநர் உரிமம் உள்ளிட்ட 10 பிரிவுகளின் கீழ் அனைத்து ஆவணங்களையும் அறியலாம்.'
              : 'Complete directory of 10 essential document categories with verified issuing authorities, statutory SLAs, requirements, and direct application links.'}
          </p>
        </div>

        <button
          onClick={onOpenAI}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{isTamil ? 'AI ஆவண வழிகாட்டி' : 'Ask AI Document Advisor'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={isTamil ? 'சான்றிதழ் பெயர், துறை அல்லது நோக்கம் மூலம் தேடவும்...' : 'Search by certificate title, authority, or keyword (e.g. Community, Patta, Birth)...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-600 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span className="font-bold text-slate-900">{filteredDocs.length}</span> documents listed
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

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                  {doc.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  SLA: {doc.slaDays} Days
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                  {isTamil ? doc.titleTa : doc.titleEn}
                </h3>
                {isTamil && (
                  <p className="text-[11px] text-slate-500 font-medium">{doc.titleEn}</p>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{doc.issuingAuthority}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {isTamil ? doc.descTa : doc.descEn}
              </p>

              {/* Accepted Proofs Tags */}
              {doc.acceptedProofFor && doc.acceptedProofFor.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Valid Proof For:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {doc.acceptedProofFor.slice(0, 3).map((proof, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {proof}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Validity & Fee */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Validity:</span>
                  <span className="font-semibold text-slate-700 truncate block">{doc.validityPeriod}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Govt Fee:</span>
                  <span className="font-bold text-emerald-700 block truncate">{typeof doc.fee === 'number' ? `₹${doc.fee}` : doc.fee}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenChecklist(doc.titleEn)}
                className="flex-1 py-2 px-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-900 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-purple-700" />
                <span>Checklist</span>
              </button>

              <button
                onClick={() => onApplyDoc(doc)}
                className="flex-1 py-2 px-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95"
              >
                <span>Apply</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-800">No documents match your query</h3>
          <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-100"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
