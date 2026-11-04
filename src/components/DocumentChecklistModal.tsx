import React, { useState } from 'react';
import { 
  X, CheckCircle2, Circle, AlertCircle, FileText, 
  Download, Printer, Sparkles, ArrowRight, ShieldCheck, UploadCloud
} from 'lucide-react';
import { ChecklistRequirement } from '../types';
import { SERVICE_DOCUMENT_CHECKLISTS } from '../data/govDirectoryData';

interface DocumentChecklistModalProps {
  serviceTitle: string;
  language: 'en' | 'ta';
  onClose: () => void;
  onProceedApply?: (serviceTitle: string) => void;
}

export const DocumentChecklistModal: React.FC<DocumentChecklistModalProps> = ({
  serviceTitle,
  language,
  onClose,
  onProceedApply
}) => {
  const isTamil = language === 'ta';

  // Get checklist or fallback
  const checklistData = SERVICE_DOCUMENT_CHECKLISTS[serviceTitle] || [
    {
      documentName: 'Aadhaar Card (UIDAI)',
      mandatory: true,
      acceptedFormats: ['PDF', 'JPEG', 'PNG'],
      maxSizeMb: 2,
      issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
      tipEn: 'Ensure mobile number is linked for instant OTP authentication.',
      tipTa: 'உடனடி OTP அங்கீகாரத்திற்கு மொபைல் எண் இணைக்கப்பட்டுள்ளதை உறுதிப்படுத்தவும்.'
    },
    {
      documentName: 'Smart Family Ration Card',
      mandatory: true,
      acceptedFormats: ['PDF', 'JPEG'],
      maxSizeMb: 2,
      issuingAuthority: 'Civil Supplies and Consumer Protection Department, TN',
      tipEn: 'All family members names should be legibly visible.',
      tipTa: 'குடும்ப உறுப்பினர்களின் பெயர்கள் தெளிவாக தெரிய வேண்டும்.'
    },
    {
      documentName: 'Recent Passport Size Photograph',
      mandatory: true,
      acceptedFormats: ['JPEG', 'PNG'],
      maxSizeMb: 0.2,
      issuingAuthority: 'Self / Studio',
      tipEn: 'Taken within the last 6 months with light background.',
      tipTa: 'வெள்ளை அல்லது வெளிர் பின்னணியுடன் சமீபத்திய புகைப்படம்.'
    },
    {
      documentName: 'Proof of Address / Current Utility Bill',
      mandatory: false,
      acceptedFormats: ['PDF', 'JPEG'],
      maxSizeMb: 2,
      issuingAuthority: 'TANGEDCO / Municipal Corporation',
      tipEn: 'EB bill or property tax receipt from the current assessment cycle.',
      tipTa: 'நடப்பு அரையாண்டுக்கான மின்கட்டண ரசீது அல்லது சொத்துவரி ரசீது.'
    }
  ];

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'Aadhaar Card (UIDAI)': true,
    'Tamil Nadu Smart Ration Card': true,
    'Aadhaar Card linked to Bank Account': true
  });

  const toggleCheck = (docName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  const totalDocs = checklistData.length;
  const completedDocs = checklistData.filter(d => !!checkedItems[d.documentName || d.docName || '']).length;
  const progressPercent = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 100;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-start justify-between gap-4 border-b border-purple-800">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/15 text-purple-200 uppercase tracking-wide">
              {isTamil ? 'டைனமிக் ஆவண சரிபார்ப்பு பட்டியல்' : 'Dynamic Document Requirement Checklist'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              {serviceTitle}
            </h2>
            <p className="text-xs text-purple-200">
              {isTamil
                ? 'விண்ணப்பிக்கும் முன் தேவையான அனைத்து அசல் சான்றிதழ்களையும் சரிபார்க்கவும்.'
                : 'Verify and prepare all mandatory documents before starting your application.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close checklist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar Ribbon */}
        <div className="bg-purple-50 px-6 py-3 border-b border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-950">
              {isTamil ? 'ஆவணத் தயார்நிலை:' : 'Readiness Progress:'} {completedDocs} of {totalDocs} ready ({progressPercent}%)
            </span>
            {progressPercent === 100 && (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full border border-emerald-300">
                Ready to Apply!
              </span>
            )}
          </div>
          <div className="w-full sm:w-48 bg-purple-200/80 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-purple-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Checklist Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div className="space-y-3">
            {checklistData.map((req, idx) => {
              const docTitle = req.documentName || req.docName || `Document ${idx + 1}`;
              const isChecked = !!checkedItems[docTitle];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleCheck(docTitle)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-purple-50/60 border-purple-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 focus:outline-none"
                    aria-label={`Toggle ${docTitle}`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-700 fill-purple-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{docTitle}</span>
                        {(req.mandatory || req.isMandatory) ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-200">
                            Mandatory
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            Optional / Supporting
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>Max: {req.maxSizeMb} MB</span>
                        <span>•</span>
                        <span>{req.acceptedFormats.join(', ')}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="font-medium text-slate-500">Issuing Authority:</span>
                      <span className="font-semibold text-slate-800">{req.issuingAuthority}</span>
                    </div>

                    {req.alternatives && (
                      <div className="text-[11px] text-slate-500">
                        <span className="font-medium text-amber-700">Acceptable alternative:</span> {req.alternatives}
                      </div>
                    )}

                    {(req.tipEn || req.tipTa) && (
                      <p className="text-[11px] text-purple-900 bg-purple-100/60 p-2 rounded-lg leading-relaxed">
                        💡 {isTamil && req.tipTa ? req.tipTa : req.tipEn}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Helper Tips */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Government Upload Specifications</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Scan original documents directly. Clear color scans without blurs ensure swift VAO & Revenue Inspector field verification without rejection. Mobile captured photos must be clearly lit without finger shadows.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Checklist</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs"
            >
              Close
            </button>
            {onProceedApply && (
              <button
                onClick={() => {
                  onClose();
                  onProceedApply(serviceTitle);
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Proceed to Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
