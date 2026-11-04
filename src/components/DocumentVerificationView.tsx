import React, { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCw, CheckCircle, AlertTriangle, 
  XCircle, FileText, Check, ShieldAlert, Sparkles, Download
} from 'lucide-react';

interface DocumentVerificationViewProps {
  language: 'en' | 'ta';
  onCompleteVerification?: () => void;
}

export const DocumentVerificationView: React.FC<DocumentVerificationViewProps> = ({
  language,
  onCompleteVerification
}) => {
  const isTamil = language === 'ta';
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState<'extracted' | 'rules' | 'audit'>('extracted');
  const [verifiedFields, setVerifiedFields] = useState<Record<string, boolean>>({
    name: true,
    father: true,
    certNo: true,
    income: false
  });
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const toggleFieldVerification = (field: string) => {
    setVerifiedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleApprove = () => {
    setActionSuccess(isTamil ? 'ஆவணம் வெற்றிகரமாக சரிபார்க்கப்பட்டு அங்கீகரிக்கப்பட்டது!' : 'Document successfully verified & approved by caseworker!');
    setTimeout(() => {
      setActionSuccess(null);
      if (onCompleteVerification) onCompleteVerification();
    }, 2000);
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Workspace Top Action Bar */}
      <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-wide">
                {isTamil ? 'அறிவார்ந்த ஆவண சரிபார்ப்பு மையம்' : 'Intelligent Document Verification (IDP)'}
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                PaddleOCR v4 AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Application: <span className="text-white font-mono font-medium">TN-REV-2026-00892</span> · Applicant: <span className="text-slate-200 font-medium">M. Anandhi</span>
            </p>
          </div>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
            <button 
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
              className="p-1 hover:text-purple-400" 
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-slate-300">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(prev => Math.min(160, prev + 15))}
              className="p-1 hover:text-purple-400" 
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Rotate">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-500 text-white p-3 text-center text-xs font-semibold flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Split-Screen Review Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Screen: Document Canvas with Highlight Overlays */}
        <div className="lg:col-span-7 bg-slate-100 p-6 flex items-center justify-center border-r border-slate-200 overflow-auto relative">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-[500px] bg-white rounded-lg shadow-md border border-slate-300 p-8 text-slate-800 space-y-5 transition-transform duration-150 select-none relative"
          >
            {/* Certificate Header Watermark & Emblem */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <div className="w-12 h-12 mx-auto rounded-full border border-slate-800 flex items-center justify-center text-[8px] font-bold mb-2">
                TN GOVT
              </div>
              <h4 className="font-serif font-bold text-sm tracking-widest uppercase">Government of Tamil Nadu</h4>
              <p className="text-xs font-serif font-medium text-slate-600">Revenue Administration Department</p>
              <h5 className="text-base font-bold text-slate-900 mt-2 underline">COMMUNITY CERTIFICATE</h5>
            </div>

            {/* Simulated Certificate Content with Visual Bounding Box Overlays */}
            <div className="space-y-4 text-xs font-serif leading-relaxed">
              <div className="flex justify-between text-[11px] font-mono text-slate-500 border-b pb-2">
                <span>Certificate No: <strong className="text-slate-900 bg-amber-100 px-1 py-0.5 rounded border border-amber-300">TN-REV-COMM-2026-90412</strong></span>
                <span>Date: <strong>14/10/2026</strong></span>
              </div>

              <p>
                This is to certify that Selvi/Thiru{' '}
                <span className="bg-purple-100 border border-purple-400 px-1.5 py-0.5 rounded font-bold text-purple-900">
                  M. Anandhi
                </span>, Son/Daughter of Thiru{' '}
                <span className="bg-blue-100 border border-blue-400 px-1.5 py-0.5 rounded font-bold text-blue-900">
                  K. Murugan
                </span>, residing at Door No. 4/18, North Car Street, Madurai District of the State of Tamil Nadu, belongs to{' '}
                <span className="bg-emerald-100 border border-emerald-400 px-1.5 py-0.5 rounded font-bold text-emerald-900">
                  Backward Class (BC)
                </span>{' '}
                community as recognized under the Government Orders of Tamil Nadu.
              </p>

              <div className="mt-8 pt-8 flex justify-between items-end border-t border-dashed">
                <div className="text-[10px] text-slate-500">
                  <p>Digitally signed by:</p>
                  <p className="font-semibold text-slate-800">Tahsildar, Madurai North</p>
                  <p>Location: Madurai, Tamil Nadu</p>
                </div>
                <div className="border border-slate-400 w-24 h-16 rounded bg-slate-50 flex flex-col items-center justify-center text-[9px] text-emerald-700 font-bold p-1 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
                  <span>DIGITALLY SIGNED</span>
                </div>
              </div>
            </div>

            {/* OCR Engine Detection Indicator */}
            <div className="absolute bottom-2 right-2 text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded font-mono">
              PaddleOCR Layer · Resolution: 300 DPI
            </div>
          </div>
        </div>

        {/* Right Screen: AI Extracted Fields & Caseworker Controls */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {isTamil ? 'AI பிரித்தெடுக்கப்பட்ட புலங்கள்' : 'AI-Extracted Metadata'}
                </h4>
                <p className="text-xs text-slate-500">
                  {isTamil ? 'துல்லிய மதிப்பெண் மற்றும் சரிபார்ப்பு' : 'Confidence scores and human-in-the-loop checks'}
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                98.4% Confidence
              </span>
            </div>

            {/* Field Review Items */}
            <div className="space-y-3">
              {/* Field 1: Applicant Name */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Applicant Full Name
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-900 text-sm">M. Anandhi</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                      99% match
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFieldVerification('name')}
                  className={`p-2 rounded-lg transition-colors ${
                    verifiedFields.name 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  title="Verify Field"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Field 2: Father Name */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Father / Guardian Name
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-900 text-sm">K. Murugan</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                      98% match
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFieldVerification('father')}
                  className={`p-2 rounded-lg transition-colors ${
                    verifiedFields.father 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Field 3: Certificate Number */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Verified Certificate Number
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold font-mono text-slate-900 text-sm">TN-REV-COMM-2026-90412</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                      99% match
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFieldVerification('certNo')}
                  className={`p-2 rounded-lg transition-colors ${
                    verifiedFields.certNo 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Field 4: Community Classification */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Community Classification
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-900 text-sm">Backward Class (BC)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                      97% match
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFieldVerification('income')}
                  className={`p-2 rounded-lg transition-colors ${
                    verifiedFields.income 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Anti-Fraud Hash Integrity Status */}
            <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle className="w-4 h-4 text-blue-700" />
                <span>SHA-256 Binary Integrity Check Passed</span>
              </div>
              <p className="text-[11px] text-blue-800/90 font-mono truncate">
                Hash: 7a8f9c10...b4e289f (No duplicate matches in statewide database)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isTamil ? 'சரிபார்த்து ஒப்புதல் அளி' : 'Verify & Approve Document'}</span>
              </button>

              <button
                onClick={() => setActionSuccess('Correction request sent to applicant!')}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg font-semibold text-xs transition-colors"
              >
                {isTamil ? 'விளக்கம் கேள்' : 'Request Correction'}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              Statutory verification adheres to Tamil Nadu Citizen Services Delivery Act & DPDP 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
