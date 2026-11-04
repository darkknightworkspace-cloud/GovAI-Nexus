import React from 'react';
import { 
  X, CheckCircle2, ExternalLink, ShieldCheck, FileText, 
  HelpCircle, Phone, Calendar, ArrowRight, Landmark, Sparkles, AlertCircle
} from 'lucide-react';
import { GovScheme } from '../types';

interface SchemeDetailsModalProps {
  scheme: GovScheme | null;
  language: 'en' | 'ta';
  onClose: () => void;
  onApply: (scheme: GovScheme) => void;
  onOpenChecklist?: (schemeTitle: string) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  language,
  onClose,
  onApply,
  onOpenChecklist
}) => {
  if (!scheme) return null;
  const isTamil = language === 'ta';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-start justify-between gap-4 border-b border-purple-800">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/15 text-purple-200 uppercase tracking-wide">
                {scheme.category}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                scheme.classification?.includes('Central') 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'bg-emerald-400 text-emerald-950'
              }`}>
                {scheme.classification || 'Tamil Nadu State Government Scheme'}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-500/40">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified Portal
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              {isTamil && scheme.titleTa ? scheme.titleTa : scheme.titleEn}
            </h2>
            {isTamil && scheme.titleTa && (
              <p className="text-xs text-purple-200/90 font-medium">
                {scheme.titleEn}
              </p>
            )}
            <p className="text-xs text-purple-200 flex items-center gap-1.5 pt-0.5">
              <Landmark className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span>{scheme.department}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Key Benefit Highlights Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
                {isTamil ? 'நிதி உதவி & பயன்' : 'Financial Assistance & Benefit'}
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-purple-950">
                {scheme.financialAssistance || 'Welfare Subsidy / Cashless Benefit'}
              </div>
              {scheme.paymentFrequency && (
                <p className="text-xs text-purple-700 font-medium">
                  {isTamil ? 'வழங்கும் முறை:' : 'Frequency:'} {scheme.paymentFrequency}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {scheme.applicationFee === 0 && (
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                  {isTamil ? 'கட்டணம்: இலவசம் (₹0)' : 'Fee: Free of Cost (₹0)'}
                </span>
              )}
              {scheme.deadline && (
                <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 font-medium text-xs flex items-center gap-1 border border-indigo-200">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{scheme.deadline}</span>
                </span>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              {isTamil ? 'திட்டத்தின் நோக்கம் & விளக்கம்' : 'Scheme Overview & Objective'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {isTamil && scheme.benefitTa ? scheme.benefitTa : scheme.benefitEn}
            </p>
          </div>

          {/* Demographic & Eligibility Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Target Group</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{scheme.targetGroup || 'All Eligible Citizens'}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Age Criteria</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">
                {scheme.ageMin ? `${scheme.ageMin} yrs` : 'No min'} {scheme.ageMax ? `to ${scheme.ageMax} yrs` : '+'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Annual Income Limit</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">
                {scheme.incomeMax ? `Up to ₹${scheme.incomeMax.toLocaleString('en-IN')}` : 'No ceiling / Category based'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Residence</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">
                {scheme.residenceRequirement || 'Resident of Tamil Nadu'}
              </span>
            </div>
          </div>

          {/* Detailed Eligibility Checklist */}
          {scheme.eligibilityCriteria && scheme.eligibilityCriteria.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isTamil ? 'முழுமையான தகுதி வரம்புகள்' : 'Detailed Eligibility Criteria'}</span>
              </h3>
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                {scheme.eligibilityCriteria.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents Section with Quick Checklist Button */}
          {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-700" />
                  <span>{isTamil ? 'தேவைப்படும் ஆவணங்கள்' : 'Required Documents & Proofs'}</span>
                </h3>
                {onOpenChecklist && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChecklist(scheme.titleEn);
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                  >
                    <span>{isTamil ? 'ஆவண சரிபார்ப்பு பட்டியல் திறக்க' : 'Open Document Checklist Generator'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Procedure & G.O. Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {scheme.applicationProcedure && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Application Procedure</span>
                <p className="text-slate-700 leading-relaxed">{scheme.applicationProcedure}</p>
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Official References & Support</span>
              {scheme.governmentOrder && (
                <div className="text-slate-700">
                  <strong className="text-slate-900">G.O. Reference: </strong>
                  {scheme.governmentOrder}
                </div>
              )}
              {scheme.helplineNumber && (
                <div className="flex items-center gap-1.5 text-purple-800 font-bold">
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span>Helpline: {scheme.helplineNumber}</span>
                </div>
              )}
              {scheme.lastVerifiedDate && (
                <div className="text-[10px] text-slate-600">
                  Last verified by GovAI Nexus: {scheme.lastVerifiedDate}
                </div>
              )}
            </div>
          </div>

          {/* FAQs Accordion/List if present */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2">
                {scheme.faqs.map((f, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-900 text-xs">{f.q}</p>
                    <p className="text-xs text-slate-600">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {scheme.officialInfoUrl && (
              <a 
                href={scheme.officialInfoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-purple-700 underline flex items-center gap-1 text-[11px]"
              >
                <span>Department Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {scheme.officialApplyUrl && (
              <a
                href={scheme.officialApplyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-purple-300 hover:bg-purple-50 text-purple-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                <span>Official Govt Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                onApply(scheme);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTamil ? 'இப்போதே விண்ணப்பிக்கவும் (Apply Here)' : 'Apply Here (GovAI Unified)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
