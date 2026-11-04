import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, FileText, ArrowRight, ArrowLeft, 
  ExternalLink, Upload, AlertCircle, Building2, Check, Landmark, Lock, Sparkles
} from 'lucide-react';
import { GovScheme, GovService, ApplicationRecord, AuthUser } from '../types';
import { INITIAL_CITIZEN_VAULT } from '../data/govDirectoryData';

interface ApplyHereModalProps {
  item: GovScheme | GovService | null;
  currentUser: AuthUser | null;
  language: 'en' | 'ta';
  onClose: () => void;
  onApplicationCreated?: (app: ApplicationRecord) => void;
}

export const ApplyHereModal: React.FC<ApplyHereModalProps> = ({
  item,
  currentUser,
  language,
  onClose,
  onApplicationCreated
}) => {
  if (!item) return null;
  const isTamil = language === 'ta';

  // Determine mode
  const rawMode = (item as GovScheme).submissionMode || 'MODE_A_NATIVE';
  const officialUrl = (item as GovScheme).officialApplyUrl || 'https://www.tnesevai.tn.gov.in';

  // Wizard state for Mode A
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    applicantName: currentUser?.name || 'M. Anandhi',
    aadhaarNumber: 'XXXX-XXXX-8912',
    rationCardNumber: '04/G/0291823',
    mobileNumber: '98402 18920',
    district: currentUser?.district || 'Madurai',
    taluk: 'Madurai North',
    villageWard: 'Ward 14 - Koodal Nagar',
    annualIncome: '1,20,000',
    communityCategory: 'BC',
    bankAccountNumber: '9876543210123',
    bankIfsc: 'SBIN0000842 (SBI Madurai Main)',
    npciConsent: true,
    dpdpConsent: true
  });

  // Attached documents from vault or uploaded
  const [attachedDocs, setAttachedDocs] = useState<string[]>([
    'Aadhaar Card (UIDAI Verified)',
    'Smart Family Ration Card'
  ]);

  // Mode C manual tracking reference
  const [manualRefInput, setManualRefInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);

  const titleEn = item.titleEn;
  const titleTa = item.titleTa || item.titleEn;
  const department = item.department;

  const toggleAttachVaultDoc = (docTitle: string) => {
    if (attachedDocs.includes(docTitle)) {
      setAttachedDocs(prev => prev.filter(d => d !== docTitle));
    } else {
      setAttachedDocs(prev => [...prev, docTitle]);
    }
  };

  const handleSubmitNative = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedNo = `TN-${department.slice(0, 3).toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newRecord: ApplicationRecord = {
        id: `app-${Date.now()}`,
        appNumber: generatedNo,
        serviceTitle: titleEn,
        applicantName: formData.applicantName,
        district: formData.district,
        status: 'SUBMITTED',
        submittedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        slaRemainingDays: 7,
        currentStage: 'Document Verification by Village Administrative Officer (VAO)'
      };
      setSubmittedApp(newRecord);
      setIsSubmitting(false);
      if (onApplicationCreated) {
        onApplicationCreated(newRecord);
      }
    }, 900);
  };

  const handleRecordExternalReference = () => {
    if (!manualRefInput.trim()) return;
    const newRecord: ApplicationRecord = {
      id: `app-${Date.now()}`,
      appNumber: manualRefInput.trim(),
      serviceTitle: titleEn,
      applicantName: formData.applicantName,
      district: formData.district,
      status: 'SUBMITTED',
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      slaRemainingDays: 14,
      currentStage: 'External Portal Reference Linked'
    };
    setSubmittedApp(newRecord);
    if (onApplicationCreated) {
      onApplicationCreated(newRecord);
    }
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
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/15 text-purple-200 uppercase tracking-wide">
                Unified Application Gateway
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SSL 256-Bit Encrypted
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              {isTamil ? titleTa : titleEn}
            </h2>
            <p className="text-xs text-purple-200">{department}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {submittedApp ? (
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Application Successfully Lodged</span>
              <h3 className="text-2xl font-black text-slate-900">
                Acknowledgement Ref: <span className="text-purple-700 font-mono">{submittedApp.appNumber}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Your application for <strong className="text-slate-900">{titleEn}</strong> has been registered in the Tamil Nadu GovAI Nexus workflow. An SMS confirmation with tracking token has been dispatched to {formData.mobileNumber}.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Applicant Name</span>
                <span className="font-bold text-slate-800">{submittedApp.applicantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">District & Taluk</span>
                <span className="font-semibold text-slate-800">{submittedApp.district} / {formData.taluk}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Workflow Stage</span>
                <span className="font-semibold text-purple-700">{submittedApp.currentStage}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Estimated SLA Resolution</span>
                <span className="font-bold text-emerald-600">Within {submittedApp.slaRemainingDays} Working Days</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Done & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* MODE C: External Official Portal */}
            {rawMode === 'MODE_C_EXTERNAL_PORTAL' ? (
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                    <ExternalLink className="w-5 h-5 text-amber-700" />
                    <span>Official Central / External Government Portal Required</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This scheme is administered directly through the Central Government or statutory external portal. You can initiate your application on the official verified portal, then paste your application number below to track status within GovAI Nexus.
                  </p>
                  <a
                    href={officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-xs"
                  >
                    <span>Open Official Portal ({new URL(officialUrl).hostname})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Tracking Reference Input */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Record Application for Integrated Tracking
                  </h4>
                  <p className="text-xs text-slate-500">
                    Once you submit your application on the portal above, enter the generated reference/token number to receive status updates here:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PMK-TN-2026-90218 or DL-TN-01-XXXX"
                      value={manualRefInput}
                      onChange={e => setManualRefInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-purple-600 bg-white font-mono text-xs"
                    />
                    <button
                      onClick={handleRecordExternalReference}
                      disabled={!manualRefInput.trim()}
                      className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs shrink-0"
                    >
                      Record & Track
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* MODE A: Native GovAI 4-Step Application Wizard */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Stepper Wizard Bar */}
                <div className="px-6 py-3 bg-purple-50/70 border-b border-purple-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[
                      { num: 1, label: 'Applicant' },
                      { num: 2, label: 'Eligibility' },
                      { num: 3, label: 'Documents' },
                      { num: 4, label: 'Review & DBT' }
                    ].map(s => (
                      <div key={s.num} className="flex items-center gap-1">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step === s.num
                            ? 'bg-purple-700 text-white'
                            : step > s.num
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {step > s.num ? '✓' : s.num}
                        </span>
                        <span className={`text-[11px] font-semibold hidden md:inline ${
                          step === s.num ? 'text-purple-900 font-bold' : 'text-slate-500'
                        }`}>
                          {s.label}
                        </span>
                        {s.num < 4 && <span className="text-slate-300 mx-1">›</span>}
                      </div>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-purple-900">
                    Step {step} of 4
                  </span>
                </div>

                {/* Form Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
                  {/* Step 1: Personal & Demographic Info */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Pre-verified from DigiLocker & Aadhaar database</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Full Applicant Name</label>
                          <input
                            type="text"
                            value={formData.applicantName}
                            onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar UID Number</label>
                          <input
                            type="text"
                            disabled
                            value={formData.aadhaarNumber}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono text-slate-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                          <select
                            value={formData.district}
                            onChange={e => setFormData({ ...formData, district: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-purple-600"
                          >
                            {['Madurai', 'Chennai', 'Coimbatore', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Thanjavur'].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Taluk & Ward</label>
                          <input
                            type="text"
                            value={formData.taluk}
                            onChange={e => setFormData({ ...formData, taluk: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Smart Ration Card No</label>
                          <input
                            type="text"
                            value={formData.rationCardNumber}
                            onChange={e => setFormData({ ...formData, rationCardNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Mobile (Linked with Aadhaar)</label>
                          <input
                            type="text"
                            value={formData.mobileNumber}
                            onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Scheme Eligibility Questions */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Community Category</label>
                          <select
                            value={formData.communityCategory}
                            onChange={e => setFormData({ ...formData, communityCategory: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                          >
                            {['BC', 'MBC / DNC', 'SC', 'ST', 'OC / General'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Total Family Annual Income (₹)</label>
                          <input
                            type="text"
                            value={formData.annualIncome}
                            onChange={e => setFormData({ ...formData, annualIncome: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                        <span className="text-xs font-bold text-purple-950 block">Statutory Eligibility Self-Declaration:</span>
                        <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                          <input type="checkbox" defaultChecked className="mt-0.5 rounded text-purple-700" />
                          <span>I am a permanent resident of Tamil Nadu residing at the given address for more than 5 years.</span>
                        </label>
                        <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                          <input type="checkbox" defaultChecked className="mt-0.5 rounded text-purple-700" />
                          <span>No member of my household is an income-tax assessee or regular Government employee.</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Document Attachments from Vault */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">Attach from "My Documents" Citizen Vault</h4>
                          <p className="text-[11px] text-slate-500">Select verified documents to automatically bind with this application</p>
                        </div>
                        <span className="text-xs font-bold text-purple-700">{attachedDocs.length} Selected</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {INITIAL_CITIZEN_VAULT.map(doc => {
                          const isAttached = attachedDocs.includes(doc.title);
                          return (
                            <div
                              key={doc.id}
                              onClick={() => toggleAttachVaultDoc(doc.title)}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isAttached
                                  ? 'bg-purple-50 border-purple-400 shadow-2xs'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <FileText className={`w-4 h-4 shrink-0 ${isAttached ? 'text-purple-700' : 'text-slate-400'}`} />
                                <div className="truncate">
                                  <span className="font-bold text-xs text-slate-900 block truncate">{doc.title}</span>
                                  <span className="text-[10px] text-slate-500 font-mono block">{doc.documentNumber}</span>
                                </div>
                              </div>
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 ${
                                isAttached ? 'bg-purple-700 text-white' : 'border border-slate-300'
                              }`}>
                                {isAttached && '✓'}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Manual Upload Option */}
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                        <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-700 block">Or upload supplementary document</span>
                        <span className="text-[10px] text-slate-400">PDF, JPG up to 2MB</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review, DBT Bank Account & DPDP Consent */}
                  {step === 4 && (
                    <div className="space-y-4">
                      {/* DBT Bank Account Box */}
                      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-indigo-700" />
                          <h4 className="font-bold text-xs text-indigo-950 uppercase tracking-wider">
                            Direct Benefit Transfer (DBT) Bank Account
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500">Account Number:</span>
                            <p className="font-mono font-bold text-slate-800">{formData.bankAccountNumber}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500">Branch & IFSC:</span>
                            <p className="font-semibold text-slate-800">{formData.bankIfsc}</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5 pt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>NPCI Aadhaar Seeding: Active & Verified</span>
                        </div>
                      </div>

                      {/* DPDP 2023 Consent */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                          <Lock className="w-3.5 h-3.5 text-purple-700" />
                          <span>Digital Personal Data Protection (DPDP) Act, 2023 Consent</span>
                        </div>
                        <label className="flex items-start gap-2.5 text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.dpdpConsent}
                            onChange={e => setFormData({ ...formData, dpdpConsent: e.target.checked })}
                            className="mt-0.5 rounded text-purple-700"
                          />
                          <span className="leading-relaxed">
                            I give voluntary consent to the Government of Tamil Nadu to process my Aadhaar and socio-economic demographic attributes strictly for this scheme disbursement and grievance adjudication.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(prev => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>

                    {step < 4 ? (
                      <button
                        onClick={() => setStep(prev => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitNative}
                        disabled={isSubmitting || !formData.dpdpConsent}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
