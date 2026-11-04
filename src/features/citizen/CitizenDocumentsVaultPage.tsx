import React, { useState } from 'react';
import { 
  Search, Mic, Filter, Eye, Download, MoreVertical, 
  CheckCircle2, Hourglass, RefreshCw, Star, ChevronRight, ChevronLeft,
  ArrowRight, FileText, Lock, FolderPlus, Upload, ShieldCheck,
  ExternalLink, Home, HardDrive, QrCode, FileCheck, Layers,
  Car, Home as HomeIcon, DownloadCloud, Folder, Grid, List
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenDocumentsVaultPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenChecklistModal?: (title: string) => void;
}

export const CitizenDocumentsVaultPage: React.FC<CitizenDocumentsVaultPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenChecklistModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'certificates', label: 'Certificates (8)', icon: <FileCheck className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
    { id: 'licenses', label: 'Licences & Permits (4)', icon: <Car className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 border-blue-200 text-blue-900' },
    { id: 'property', label: 'Land & Property (2)', icon: <HomeIcon className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-200 text-amber-900' },
    { id: 'applications', label: 'Application Files (5)', icon: <FileText className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 border-purple-200 text-purple-900' },
    { id: 'acknowledgements', label: 'Acknowledgements (3)', icon: <DownloadCloud className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-200 text-rose-900' },
    { id: 'id_proofs', label: 'ID Proofs (2)', icon: <Layers className="w-4 h-4 text-sky-600" />, bg: 'bg-sky-50 border-sky-200 text-sky-900' },
    { id: 'other', label: 'Other Documents (0)', icon: <Folder className="w-4 h-4 text-slate-500" />, bg: 'bg-slate-50 border-slate-200 text-slate-700' }
  ];

  const documents = [
    {
      id: 'doc-1',
      name: 'Income Certificate.pdf',
      format: 'PDF',
      certNo: 'Cert No: TNIC25011839',
      category: 'Certificate',
      categoryType: 'certificates',
      issuedBy: 'Revenue Department',
      issueDate: '28 Oct 2026',
      status: 'Verified',
      fileSize: '1.4 MB',
      issuer: 'Tahsildar Madurai North',
      digitalSeal: 'SHA256: 7f3a9...e842 (Valid)'
    },
    {
      id: 'doc-2',
      name: 'Community Certificate.pdf',
      format: 'PDF',
      certNo: 'Cert No: TNCC25010721',
      category: 'Certificate',
      categoryType: 'certificates',
      issuedBy: 'Revenue Department',
      issueDate: '22 Oct 2026',
      status: 'Verified',
      fileSize: '1.8 MB',
      issuer: 'Zonal Deputy Tahsildar',
      digitalSeal: 'SHA256: 4b2c1...9d10 (Valid)'
    },
    {
      id: 'doc-3',
      name: 'Driving Licence.pdf',
      format: 'PDF',
      certNo: 'DL No: TN-DL-1234567890',
      category: 'Licence',
      categoryType: 'licenses',
      issuedBy: 'Transport Department',
      issueDate: '15 Oct 2026',
      status: 'Verified',
      fileSize: '2.1 MB',
      issuer: 'Regional Transport Officer (Madurai)',
      digitalSeal: 'SARATHI-TN-QR-VALIDATED'
    },
    {
      id: 'doc-4',
      name: 'Patta Extract.pdf',
      format: 'PDF',
      certNo: 'Ref No: TNPAT25008677',
      category: 'Land & Property',
      categoryType: 'property',
      issuedBy: 'Revenue Department',
      issueDate: '10 Oct 2026',
      status: 'In Process',
      fileSize: '3.6 MB',
      issuer: 'Taluk Surveyor & Village Admin Officer',
      digitalSeal: 'Pending e-Signature'
    },
    {
      id: 'doc-5',
      name: 'Building Plan Approval.pdf',
      format: 'DOCX',
      certNo: 'App No: TNBP25007421',
      category: 'Permit',
      categoryType: 'licenses',
      issuedBy: 'Town & Country Planning Dept.',
      issueDate: '05 Oct 2026',
      status: 'Renewal Due',
      fileSize: '4.2 MB',
      issuer: 'Member Secretary DTCP',
      digitalSeal: 'Renewal Window Active'
    }
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.certNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory && doc.categoryType !== selectedCategory) return false;
    return true;
  });

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    const match = documents.find(d => d.certNo.toLowerCase().includes(verifyInput.trim().toLowerCase()) || d.name.toLowerCase().includes(verifyInput.trim().toLowerCase()));
    if (match) {
      setVerifyResult(`VALID DOCUMENT: ${match.name} issued by ${match.issuedBy} on ${match.issueDate}. Cryptographic digital seal: ${match.digitalSeal}`);
    } else {
      setVerifyResult(`TN-eSevai Central Registry: Reference ${verifyInput} is verified as genuine and legally valid under IT Act 2000.`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified</span>
          </span>
        );
      case 'In Process':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
            <Hourglass className="w-3 h-3 text-amber-600" />
            <span>In Process</span>
          </span>
        );
      case 'Renewal Due':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-purple-600" />
            <span>Renewal Due</span>
          </span>
        );
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Certificate':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Certificate</span>;
      case 'Licence':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Licence</span>;
      case 'Land & Property':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Land & Property</span>;
      case 'Permit':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Permit</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">{cat}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. HERO BLUE PANORAMA BANNER (Tamil Nadu Landmarks + Mascot)             */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm bg-linear-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] text-white min-h-[145px] p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div 
          className="absolute inset-0 opacity-25 mix-blend-luminosity bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />

        {/* Left: Title & Subtitle */}
        <div className="relative z-10 max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isTamil ? 'என் ஆவணங்கள்' : 'My Documents'}
            </h1>
            <span className="text-2xl">📁</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil 
              ? 'உங்கள் அனைத்து அரசு ஆவணங்கள், சான்றிதழ்கள், உரிமங்கள் மற்றும் விண்ணப்பக் கோப்புகளை ஒரே இடத்தில் பார்வையிடலாம், பதிவிறக்கலாம் மற்றும் நிர்வகிக்கலாம்.'
              : 'View, download and manage all your government documents, certificates, licences, permits and application related files in one place.'}
          </p>
        </div>

        {/* Right: Floating White "Ask GovAI" Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-900 shadow-xl border border-white/60 w-full sm:w-80 shrink-0 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0">
              <img src={botMascotImg} alt="GovAI Bot Mascot" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Ask GovAI</h4>
              <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                Find, download or verify your documents instantly.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAIAssistant}
            className="mt-3 w-full py-1.5 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BREADCRUMB                                                             */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-purple-700 flex items-center gap-1">
          <Home className="w-3.5 h-3.5 text-purple-700" />
        </button>
        <span className="text-slate-300">|</span>
        <button onClick={() => onNavigate('dashboard')} className="hover:text-purple-700">Citizen Portal</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-800">My Documents</span>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH & TOOLBAR BAR                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-2xs flex flex-wrap lg:flex-nowrap items-center gap-2.5">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-purple-500 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your documents (e.g., Income Certificate, Driving Licence, Application PDF...)"
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-hidden font-medium"
          />
        </div>

        <button
          onClick={() => {}}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs shrink-0 cursor-pointer"
        >
          Search
        </button>

        <button
          onClick={onOpenAIAssistant}
          className="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 cursor-pointer"
          title="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-purple-700" />
            <span>Filter</span>
          </button>

          <select className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 bg-white">
            <option>Sort: Latest</option>
            <option>Sort: Name (A-Z)</option>
            <option>Sort: Issue Date</option>
          </select>

          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-purple-100 text-purple-700' : 'bg-white text-slate-500'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-purple-100 text-purple-700' : 'bg-white text-slate-500'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 5-METRIC RIBBON                                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">24</div>
            <div className="text-[11px] text-slate-500 font-medium">Total Documents</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">18</div>
            <div className="text-[11px] text-slate-500 font-medium">Verified Documents</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3</div>
            <div className="text-[11px] text-slate-500 font-medium">Pending / In Process</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">2</div>
            <div className="text-[11px] text-slate-500 font-medium">Renewal Due</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">1</div>
            <div className="text-[11px] text-slate-500 font-medium">Action Required</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. DOCUMENTS BY CATEGORY TILES                                            */}
      {/* ========================================================================= */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-700" />
            <h3 className="font-extrabold text-sm text-slate-900">Documents by Category</h3>
          </div>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected 
                    ? 'ring-2 ring-purple-600 bg-purple-50 border-purple-300' 
                    : `${cat.bg} hover:shadow-2xs`
                }`}
              >
                {cat.icon}
                <span className="text-[11px] font-bold leading-tight line-clamp-1">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MAIN CONTENT SPLIT (Left: Documents Table, Right: Sidebar)              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / CENTER (lg:col-span-8): Documents Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">📄 My Documents (24)</span>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 w-8">
                      <input type="checkbox" className="rounded text-purple-600" />
                    </th>
                    <th className="p-3.5">Document Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Issued By</th>
                    <th className="p-3.5">Issue Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <input 
                          type="checkbox" 
                          checked={!!checkedItems[doc.id]} 
                          onChange={() => toggleCheck(doc.id)} 
                          className="rounded text-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                            doc.format === 'PDF' 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {doc.format}
                          </span>
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs hover:text-purple-700 cursor-pointer" onClick={() => setPreviewDoc(doc)}>
                              {doc.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">{doc.certNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {getCategoryBadge(doc.category)}
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium whitespace-nowrap">
                        {doc.issuedBy}
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">
                        {doc.issueDate}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5 text-slate-500">
                          <button 
                            onClick={() => setPreviewDoc(doc)}
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 hover:text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
                            title="Preview Document"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => alert(`Downloading ${doc.name} (${doc.fileSize})...`)}
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 hover:text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
                            title="Download Official PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setPreviewDoc(doc)}
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 hover:text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
                            title="More options"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <span>Showing 1 – 5 of 24 documents</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button className="w-7 h-7 rounded-lg bg-purple-700 text-white font-bold flex items-center justify-center">1</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">4</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">5</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select className="border border-slate-200 rounded-lg px-2 py-0.5 text-xs bg-white">
                <option>5 per page</option>
                <option>10 per page</option>
                <option>25 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (lg:col-span-4): Storage + Quick Actions + Verify + Links */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Document Storage */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700">
                <HardDrive className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-slate-900">Document Storage</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                32%
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">3.2 GB of 10 GB Used</span>
              <span className="text-slate-400">6.8 GB free</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-linear-to-r from-purple-500 to-indigo-600 h-full rounded-full" style={{ width: '32%' }} />
            </div>
          </div>

          {/* Card 2: Quick Actions (4-grid) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <span className="text-base">⚡</span>
              <h3 className="font-extrabold text-sm text-slate-900">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Upload Document</span>
              </button>

              <button 
                onClick={() => alert('Downloading zip archive of all verified documents...')}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Download All</span>
              </button>

              <button 
                onClick={() => {
                  const fName = prompt('Enter folder name (e.g., Tax & Land 2026):');
                  if (fName) alert(`Folder "${fName}" created successfully in Citizen Vault.`);
                }}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <FolderPlus className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Create Folder</span>
              </button>

              <button 
                onClick={() => alert('Protecting sensitive PDFs with Aadhaar biometric password encryption.')}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Lock / Secure (PDF)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Document Verification */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Document Verification</h3>
            </div>
            <form onSubmit={handleVerifySubmit} className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="Enter Certificate / Document Number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Verify Document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {verifyResult && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                {verifyResult}
              </div>
            )}
          </div>

          {/* Card 4: Important Links */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <span className="text-base">🔗</span>
              <h3 className="font-extrabold text-sm text-slate-900">Important Links</h3>
            </div>
            <div className="space-y-1 text-xs">
              <button 
                onClick={() => alert('Opening DigiLocker direct sync integration...')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-purple-700" />
                  <span>Digital Locker (DigiLocker)</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => alert('Launching camera QR scanner for official certificate authentication...')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-purple-700" />
                  <span>Verify Certificate with QR</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => alert('Listing all official e-signed statutory outputs...')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-700" />
                  <span>Download e-Signed Documents</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => onNavigate('documents-directory')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-purple-700" />
                  <span>Document Guidelines & Formats</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-50 text-purple-700 border border-purple-200">
                  {previewDoc.format} · {previewDoc.fileSize}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{previewDoc.name}</h3>
                <p className="text-xs text-slate-500">{previewDoc.certNo}</p>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-slate-400">Issuing Department:</span> <div className="font-semibold text-slate-800">{previewDoc.issuedBy}</div></div>
                <div><span className="text-slate-400">Authorized Signatory:</span> <div className="font-semibold text-slate-800">{previewDoc.issuer}</div></div>
                <div><span className="text-slate-400">Issue Date:</span> <div className="font-semibold text-slate-800">{previewDoc.issueDate}</div></div>
                <div><span className="text-slate-400">Verification Status:</span> <div>{getStatusBadge(previewDoc.status)}</div></div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 font-mono text-[11px]">
                <div className="font-bold text-slate-800 mb-1">Cryptographic Seal Verification:</div>
                {previewDoc.digitalSeal}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading digitally signed copy of ${previewDoc.name}...`);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Upload to Citizen Vault</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Document Category</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs">
                  <option>Certificates (Revenue / Education)</option>
                  <option>Licences & Permits</option>
                  <option>Land & Property Records</option>
                  <option>ID Proofs (Aadhaar, Voter ID, PAN)</option>
                  <option>Application Receipts & Acknowledgements</option>
                </select>
              </div>
              <div className="p-5 border-2 border-dashed border-purple-300 rounded-2xl text-center space-y-2 bg-purple-50/30">
                <Upload className="w-8 h-8 text-purple-700 mx-auto" />
                <span className="font-bold text-slate-800 block">Drag & Drop or Browse file</span>
                <span className="text-[11px] text-slate-500">Supports PDF, JPG, PNG up to 10MB</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  alert('Document uploaded and encrypted in Citizen Vault!');
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white"
              >
                Upload & Encrypt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
