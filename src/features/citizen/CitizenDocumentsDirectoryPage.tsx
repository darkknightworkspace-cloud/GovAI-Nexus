import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  Bookmark, Download, Eye, ArrowRight, Filter, Home as HomeIcon,
  FileText, Layers, RefreshCw, Info, HelpCircle, FileCheck,
  Building2, Settings, ChevronDown, Check
} from 'lucide-react';
import secretariatBgImg from '../../assets/images/tn_secretariat_banner_1793711221214.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenDocumentsDirectoryPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenChecklistModal?: (title: string) => void;
}

export const CitizenDocumentsDirectoryPage: React.FC<CitizenDocumentsDirectoryPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenChecklistModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Latest Updated');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = (docName: string) => {
    alert(`Document "${docName}" downloaded successfully in official signed format.`);
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
            <span>Documents</span>
            <span className="text-purple-400">Directory</span>
            <span className="text-2xl">📁</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil
              ? 'அரசு சேவைகள், திட்டங்கள், சான்றிதழ்கள் மற்றும் உரிமங்களுக்கான விண்ணப்ப படிவங்கள் மற்றும் வழிகாட்டு நெறிமுறைகள்.'
              : 'Download, view and get templates, guidelines and required documents for Tamil Nadu Government services, schemes, certificates, licences and permits.'}
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
                Find required documents, forms and guidelines instantly.
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
        <span className="font-bold text-slate-800">Documents Directory</span>
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
              placeholder="Search documents, forms, guidelines... (e.g., Income Certificate Form, Driving Licence Checklist)"
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
            <span>Document Guide</span>
          </button>
          <button
            onClick={() => onNavigate('documents-vault')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Form Templates</span>
          </button>
          <button
            onClick={() => onNavigate('document-checklist')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Checklist</span>
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
            <div className="text-lg font-extrabold text-slate-900 leading-tight">1,248</div>
            <p className="text-[10px] text-slate-500 font-medium">Total Documents</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">8,92,340</div>
            <p className="text-[10px] text-slate-500 font-medium">Total Downloads</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">32</div>
            <p className="text-[10px] text-slate-500 font-medium">Departments</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">96</div>
            <p className="text-[10px] text-slate-500 font-medium">Form Templates</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 leading-tight">58</div>
            <p className="text-[10px] text-slate-500 font-medium">Guidelines / SOPs</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-purple-900 leading-tight">Updated Daily</div>
            <p className="text-[10px] text-slate-500 font-medium">Latest Version Available</p>
          </div>
        </div>
      </div>

      {/* 5. 3-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Filter Documents (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Filter Documents</h4>
            </div>
            <button
              onClick={() => {}}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Document Type */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 py-1">
              <span>Document Type</span>
              <span className="text-slate-400 font-mono">▲</span>
            </div>
            <div className="space-y-1.5 pl-1 text-slate-700">
              {[
                { label: 'Application Form (362)' },
                { label: 'Guideline / SOP (58)' },
                { label: 'Checklist (92)' },
                { label: 'Template / Format (96)' },
                { label: 'User Manual (24)' },
                { label: 'Circular / Order (34)' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-purple-900">
                  <input type="checkbox" className="rounded text-purple-700 focus:ring-purple-600" />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {['Department', 'Service / Scheme'].map((sec, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-2.5">
              <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
                <span>{sec}</span>
                <span className="text-slate-400 font-mono">▼</span>
              </button>
            </div>
          ))}

          {/* Language */}
          <div className="border-t border-slate-100 pt-2.5 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 py-1">
              <span>Language</span>
              <span className="text-slate-400 font-mono">▲</span>
            </div>
            <div className="space-y-1.5 pl-1 text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-purple-700" />
                <span className="font-semibold text-slate-900">English (1,248)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-purple-700" />
                <span>Tamil (1,210)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-purple-700" />
                <span>Bilingual (846)</span>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2.5">
            <button className="flex items-center justify-between w-full text-xs font-bold text-slate-900 cursor-pointer">
              <span>Last Updated</span>
              <span className="text-slate-400 font-mono">▼</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: All Documents (1,248) (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-slate-900">All Documents (1,248)</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-xl text-xs outline-hidden"
              >
                <option value="Latest Updated">Latest Updated</option>
                <option value="Downloads">Most Downloads</option>
                <option value="Name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* 5 Document Cards */}
          <div className="space-y-3">
            {/* 1. Income Certificate – Application Form */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Income Certificate – Application Form
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Revenue Department</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">
                      Form
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      English + Tamil
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-[11px] text-slate-500 sm:text-right">
                  <span className="font-medium text-slate-800">PDF • 412 KB</span>
                  <span className="block text-[10px] text-slate-400">Updated: 28 Oct 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc({ title: 'Income Certificate – Application Form', type: 'PDF', size: '412 KB', dept: 'Revenue Department' })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload('Income Certificate – Application Form.pdf')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => toggleBookmark('doc1')} className="text-slate-400 hover:text-purple-700 p-1">
                    <Bookmark className={`w-4 h-4 ${bookmarked.doc1 ? 'text-purple-700 fill-purple-700' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Community Certificate – Checklist */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  DOCX
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Community Certificate – Checklist
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Revenue Department</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                      Checklist
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      English
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-[11px] text-slate-500 sm:text-right">
                  <span className="font-medium text-slate-800">DOCX • 68 KB</span>
                  <span className="block text-[10px] text-slate-400">Updated: 26 Oct 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc({ title: 'Community Certificate – Checklist', type: 'DOCX', size: '68 KB', dept: 'Revenue Department' })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload('Community Certificate – Checklist.docx')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => toggleBookmark('doc2')} className="text-slate-400 hover:text-purple-700 p-1">
                    <Bookmark className={`w-4 h-4 ${bookmarked.doc2 ? 'text-purple-700 fill-purple-700' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Driving Licence – User Guide */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Driving Licence – User Guide
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Transport Department</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">
                      Guide
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      English + Tamil
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-[11px] text-slate-500 sm:text-right">
                  <span className="font-medium text-slate-800">PDF • 1.2 MB</span>
                  <span className="block text-[10px] text-slate-400">Updated: 24 Oct 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc({ title: 'Driving Licence – User Guide', type: 'PDF', size: '1.2 MB', dept: 'Transport Department' })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload('Driving Licence – User Guide.pdf')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => toggleBookmark('doc3')} className="text-slate-400 hover:text-purple-700 p-1">
                    <Bookmark className={`w-4 h-4 ${bookmarked.doc3 ? 'text-purple-700 fill-purple-700' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Building Plan Approval – Guidelines */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Building Plan Approval – Guidelines
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Town & Country Planning Dept.</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                      Guideline
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      English
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-[11px] text-slate-500 sm:text-right">
                  <span className="font-medium text-slate-800">PDF • 856 KB</span>
                  <span className="block text-[10px] text-slate-400">Updated: 22 Oct 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc({ title: 'Building Plan Approval – Guidelines', type: 'PDF', size: '856 KB', dept: 'Town & Country Planning Dept.' })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload('Building Plan Approval – Guidelines.pdf')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => toggleBookmark('doc4')} className="text-slate-400 hover:text-purple-700 p-1">
                    <Bookmark className={`w-4 h-4 ${bookmarked.doc4 ? 'text-purple-700 fill-purple-700' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 5. PM-KISAN – Application Format */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  DOCX
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    PM-KISAN – Application Format
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Agriculture Department</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">
                      Template
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      English + Tamil
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-[11px] text-slate-500 sm:text-right">
                  <span className="font-medium text-slate-800">DOCX • 236 KB</span>
                  <span className="block text-[10px] text-slate-400">Updated: 20 Oct 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc({ title: 'PM-KISAN – Application Format', type: 'DOCX', size: '236 KB', dept: 'Agriculture Department' })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload('PM-KISAN – Application Format.docx')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => toggleBookmark('doc5')} className="text-slate-400 hover:text-purple-700 p-1">
                    <Bookmark className={`w-4 h-4 ${bookmarked.doc5 ? 'text-purple-700 fill-purple-700' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>Showing 1 – 5 of 1,248 documents</span>
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
              <button className="px-2 h-7 rounded-lg hover:bg-slate-100 text-slate-700">250</button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs">
                <option>5 per page</option>
                <option>10 per page</option>
                <option>25 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: My Downloaded Documents + Quick Actions + FAQ */}
        <div className="lg:col-span-3 space-y-4">
          {/* My Downloaded Documents */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-xs text-slate-900">My Downloaded Documents</h4>
              </div>
              <button onClick={() => onNavigate('documents-vault')} className="text-[11px] font-bold text-purple-700 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 font-bold text-[8px] flex items-center justify-center shrink-0">
                    PDF
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Income Certificate Form.pdf</h5>
                    <p className="text-[10px] text-slate-400">412 KB • 28 Oct 2026</p>
                  </div>
                </div>
                <button onClick={() => handleDownload('Income Certificate Form.pdf')} className="text-slate-500 hover:text-purple-700 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 font-bold text-[8px] flex items-center justify-center shrink-0">
                    DOCX
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">Community Checklist.docx</h5>
                    <p className="text-[10px] text-slate-400">68 KB • 27 Oct 2026</p>
                  </div>
                </div>
                <button onClick={() => handleDownload('Community Checklist.docx')} className="text-slate-500 hover:text-purple-700 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 font-bold text-[8px] flex items-center justify-center shrink-0">
                    PDF
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">DL User Guide.pdf</h5>
                    <p className="text-[10px] text-slate-400">1.2 MB • 24 Oct 2026</p>
                  </div>
                </div>
                <button onClick={() => handleDownload('DL User Guide.pdf')} className="text-slate-500 hover:text-purple-700 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions (4 tiles) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <h4 className="font-extrabold text-xs text-slate-900">Quick Actions</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <button
                onClick={() => onNavigate('services')}
                className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-purple-900 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold leading-tight">Find by Service</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-blue-700" />
                <span className="text-[11px] font-bold leading-tight">Find by Department</span>
              </button>

              <button
                onClick={() => handleDownload('All_Forms_Pack.zip')}
                className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span className="text-[11px] font-bold leading-tight">Download Form</span>
              </button>

              <button
                onClick={() => alert('All document templates are up-to-date with G.O. (Ms) 2026 statutory amendments.')}
                className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-900 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-amber-700" />
                <span className="text-[11px] font-bold leading-tight">Check Latest Version</span>
              </button>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="flex items-center justify-between w-full text-xs font-extrabold text-slate-900 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFaqOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFaqOpen && (
              <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <p><strong>Q: Are these official government application forms?</strong><br />Yes, all forms adhere directly to the respective Tamil Nadu department Gazette standards.</p>
                <p><strong>Q: Can I fill them digitally?</strong><br />Yes, fillable PDF and DOCX formats are provided. You can also apply online directly through the Apply Here page.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {previewDoc.dept}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{previewDoc.title}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div className="border-2 border-dashed border-purple-200 p-6 rounded-2xl bg-slate-50 text-center space-y-3">
              <FileText className="w-12 h-12 text-purple-700 mx-auto" />
              <div>
                <p className="font-bold text-sm text-slate-900">Official Document Format Preview</p>
                <p className="text-xs text-slate-500">File type: {previewDoc.type} • File size: {previewDoc.size}</p>
              </div>
              <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                ✓ Verified against Tamil Nadu E-Governance Gazette Standard (2026 Release)
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewDoc.title);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
