import React, { useState } from 'react';
import { 
  Search, Mic, Download, BookOpen, Layers, CheckCircle2, 
  Hourglass, FileText, XCircle, RefreshCw, ChevronRight, ChevronLeft,
  ArrowRight, FileCheck, Car, Users, Home as HomeIcon, HardHat,
  MapPin, Upload, CreditCard, HelpCircle, Info, Headphones,
  Home, ExternalLink
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenApplicationsPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onOpenApplyModal?: (serviceTitle?: string) => void;
}

export const CitizenApplicationsPage: React.FC<CitizenApplicationsPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onOpenApplyModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'approved' | 'pending' | 'rejected' | 'renewal'>('all');
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [selectedAppModal, setSelectedAppModal] = useState<any | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const applications = [
    {
      id: 'app-1',
      title: 'Income Certificate',
      titleTa: 'வருமானச் சான்றிதழ்',
      dept: 'Revenue Department',
      deptTa: 'வருவாய்த் துறை',
      appNo: 'TNIC25011839',
      appliedDate: '28 Oct 2026',
      status: 'Approved',
      statusType: 'approved',
      iconType: 'income',
      stepper: [
        { label: 'Submitted', done: true, state: 'checked' },
        { label: 'Verified', done: true, state: 'checked' },
        { label: 'Approved', done: true, state: 'checked' }
      ],
      remarks: 'Certificate electronically sealed by Revenue Inspector and Tahsildar Madurai.',
      certificateUrl: '#'
    },
    {
      id: 'app-2',
      title: 'Driving Licence (Renewal)',
      titleTa: 'ஓட்டுநர் உரிமம் (புதுப்பித்தல்)',
      dept: 'Transport Department',
      deptTa: 'போக்குவரத்துத் துறை',
      appNo: 'TNDL25009345',
      appliedDate: '25 Oct 2026',
      status: 'Under Process',
      statusType: 'in_progress',
      iconType: 'dl',
      stepper: [
        { label: 'Submitted', done: true, state: 'checked' },
        { label: 'Verification', done: true, state: 'current' },
        { label: 'Approval', done: false, state: 'pending' }
      ],
      remarks: 'RTO Madurai Central biometric & medical self-declaration undergoing digital validation.'
    },
    {
      id: 'app-3',
      title: 'Community Certificate',
      titleTa: 'சமூகச் சான்றிதழ்',
      dept: 'Revenue Department',
      deptTa: 'வருவாய்த் துறை',
      appNo: 'TNCC25010721',
      appliedDate: '22 Oct 2026',
      status: 'Pending (Action)',
      statusType: 'pending',
      iconType: 'community',
      stepper: [
        { label: 'Submitted', done: true, state: 'checked' },
        { label: 'Document Check', done: true, state: 'current' },
        { label: 'Approval', done: false, state: 'pending' }
      ],
      remarks: 'Clarification required: Please re-upload applicant father Transfer Certificate copy.'
    },
    {
      id: 'app-4',
      title: 'Patta / Land Ownership',
      titleTa: 'பட்டா / நில உரிமை மாற்றம்',
      dept: 'Revenue Department',
      deptTa: 'வருவாய்த் துறை',
      appNo: 'TNPA25008677',
      appliedDate: '18 Oct 2026',
      status: 'Rejected',
      statusType: 'rejected',
      iconType: 'patta',
      stepper: [
        { label: 'Submitted', done: true, state: 'checked' },
        { label: 'Reviewed', done: true, state: 'rejected' },
        { label: 'Closed', done: false, state: 'pending' }
      ],
      remarks: 'Survey number mismatch with Sub-Registrar Office sale deed records. You may appeal within 30 days.'
    },
    {
      id: 'app-5',
      title: 'Building Plan Approval',
      titleTa: 'கட்டிட திட்ட அனுமதி',
      dept: 'Town & Country Planning Dept.',
      deptTa: 'நகர் ஊரமைப்புத் துறை',
      appNo: 'TNBP25007421',
      appliedDate: '15 Oct 2026',
      status: 'Under Process',
      statusType: 'in_progress',
      iconType: 'building',
      stepper: [
        { label: 'Submitted', done: true, state: 'checked' },
        { label: 'Site Verification', done: true, state: 'current' },
        { label: 'Approval', done: false, state: 'pending' }
      ],
      remarks: 'Field engineer inspection scheduled for 4 Nov 2026.'
    }
  ];

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.dept.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === 'in_progress') return app.statusType === 'in_progress';
    if (activeTab === 'approved') return app.statusType === 'approved';
    if (activeTab === 'pending') return app.statusType === 'pending';
    if (activeTab === 'rejected') return app.statusType === 'rejected';
    if (activeTab === 'renewal') return app.title.includes('Renewal');
    return true;
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const match = applications.find(a => a.appNo.toLowerCase().includes(trackInput.trim().toLowerCase()));
    if (match) {
      setTrackResult(`Application ${match.appNo} (${match.title}) is currently: ${match.status}. ${match.remarks}`);
    } else {
      setTrackResult(`Application number ${trackInput} found in TNeGA central register. Current status: Statutory Review in progress.`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Approved</span>;
      case 'Under Process':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Under Process</span>;
      case 'Pending (Action)':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">Pending (Action)</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">Rejected</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">{status}</span>;
    }
  };

  const getAppIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>;
      case 'dl':
        return <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0"><Car className="w-5 h-5" /></div>;
      case 'community':
        return <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0"><Users className="w-5 h-5" /></div>;
      case 'patta':
        return <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0"><HomeIcon className="w-5 h-5" /></div>;
      case 'building':
        return <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0"><HardHat className="w-5 h-5" /></div>;
      default:
        return <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>;
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
              {isTamil ? 'என் விண்ணப்பங்கள்' : 'My Applications'}
            </h1>
            <span className="text-2xl">📄</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil 
              ? 'சான்றிதழ்கள், உரிமங்கள், அனுமதிகள் மற்றும் அரசு சேவைகளுக்கான உங்கள் அனைத்து விண்ணப்பங்களையும் கண்காணிக்கவும், நிர்வகிக்கவும்.'
              : 'Track, manage and get updates on all your applications for certificates, licences, permits and government services.'}
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
                Get instant status, next steps, required documents and support for your applications.
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
        <span className="font-bold text-slate-800">My Applications</span>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH & ACTION BUTTONS BAR                                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-2xs flex flex-wrap lg:flex-nowrap items-center gap-2.5">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-purple-500 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Application Number, Service Name or Department..."
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
            onClick={() => alert('Downloading consolidated PDF acknowledgement for all active applications...')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-700" />
            <span>Download Acknowledgement</span>
          </button>
          <button
            onClick={onOpenAIAssistant}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-700" />
            <span>Application Guide</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 6-METRIC RIBBON                                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">12</div>
            <div className="text-[11px] text-slate-500 font-medium">Total Applications</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">5</div>
            <div className="text-[11px] text-slate-500 font-medium">Approved</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3</div>
            <div className="text-[11px] text-slate-500 font-medium">Under Process</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">2</div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">Pending (Action Required)</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">1</div>
            <div className="text-[11px] text-slate-500 font-medium">Rejected</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">1</div>
            <div className="text-[11px] text-slate-500 font-medium">Renewal Due</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FILTER TABS STRIP                                                      */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Applications (12)
        </button>

        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'in_progress'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Hourglass className="w-3.5 h-3.5 text-amber-500" />
          <span>In Progress (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'approved'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Approved (5)</span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-blue-500" />
          <span>Pending Action (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'rejected'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Rejected (1)</span>
        </button>

        <button
          onClick={() => setActiveTab('renewal')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'renewal'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-purple-500" />
          <span>Renewal Due (1)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 6. MAIN CONTENT SPLIT (Left: Application List, Right: Sidebar)             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / CENTER (lg:col-span-8): Applications List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">📋 My Applications</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Sort by:</span>
              <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800">
                <option>Latest Application</option>
                <option>Status</option>
                <option>Department</option>
              </select>
            </div>
          </div>

          {/* Application Cards */}
          <div className="space-y-3.5">
            {filteredApps.map((app) => (
              <div 
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all space-y-4"
              >
                {/* Top Row: Icon + Title + Meta + Status Pill */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {getAppIcon(app.iconType)}
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {isTamil ? app.titleTa : app.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {isTamil ? app.deptTa : app.dept}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        App No: <span className="font-semibold text-slate-700">{app.appNo}</span> | Applied on: {app.appliedDate}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {getStatusBadge(app.status)}
                  </div>
                </div>

                {/* Middle: Horizontal Stepper Progression */}
                <div className="pt-1 pb-1">
                  <div className="flex items-center justify-between max-w-md mx-auto sm:mx-0">
                    {app.stepper.map((step, idx) => {
                      const isLast = idx === app.stepper.length - 1;
                      return (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center">
                            {step.state === 'checked' && (
                              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                            {step.state === 'current' && (
                              <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-blue-200 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                            )}
                            {step.state === 'rejected' && (
                              <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                                <XCircle className="w-3.5 h-3.5" />
                              </div>
                            )}
                            {step.state === 'pending' && (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                            )}
                            <span className="text-[11px] font-medium text-slate-600 mt-1">{step.label}</span>
                          </div>

                          {!isLast && (
                            <div className={`flex-1 h-0.5 mx-2 -mt-4 ${
                              app.status === 'Rejected' 
                                ? 'bg-rose-400' 
                                : app.status === 'Approved' 
                                  ? 'bg-emerald-500' 
                                  : 'bg-blue-400'
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedAppModal(app)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 text-purple-700 hover:bg-purple-50 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {app.status === 'Approved' && (
                    <button
                      onClick={() => alert(`Downloading digitally signed certificate for ${app.appNo}...`)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}

                  {app.status === 'Under Process' && (
                    <button
                      onClick={() => setSelectedAppModal(app)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Track Status</span>
                    </button>
                  )}

                  {app.status === 'Pending (Action)' && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Documents</span>
                    </button>
                  )}

                  {app.status === 'Rejected' && (
                    <button
                      onClick={() => setSelectedAppModal(app)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Remarks</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <span>Showing 1 – 5 of 12 applications</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button className="w-7 h-7 rounded-lg bg-purple-700 text-white font-bold flex items-center justify-center">1</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select className="border border-slate-200 rounded-lg px-2 py-0.5 text-xs bg-white">
                <option>5 per page</option>
                <option>10 per page</option>
                <option>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (lg:col-span-4): Track + Quick Actions + Need Help */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Track Application */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <MapPin className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Track Application</h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Enter your Application Number to get real-time status and updates.
            </p>
            <form onSubmit={handleTrackSubmit} className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="Enter Application Number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Track Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {trackResult && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                {trackResult}
              </div>
            )}
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
                <span className="text-[11px] font-bold text-slate-700">Upload Documents</span>
              </button>

              <button 
                onClick={() => alert('Redirecting to TNeGA unified payment gateway for statutory fee clearance...')}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Pay Fees</span>
              </button>

              <button 
                onClick={() => alert('Downloading official statutory receipt pack...')}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Download Receipts</span>
              </button>

              <button 
                onClick={() => onNavigate('renewals')}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-purple-700" />
                <span className="text-[11px] font-bold text-slate-700">Renew / Reapply</span>
              </button>
            </div>
          </div>

          {/* Card 3: Need Help? */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <HelpCircle className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Need Help?</h3>
            </div>
            <div className="space-y-1 text-xs">
              <button 
                onClick={onOpenAIAssistant}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-700" />
                  <span>Application Process Guide</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => onNavigate('help-support')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-purple-700" />
                  <span>Common Issues & Solutions</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => onNavigate('help-support')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-purple-700" />
                  <span>Contact Support</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedAppModal.appNo}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedAppModal.title}</h3>
                <p className="text-xs text-slate-500">{selectedAppModal.dept}</p>
              </div>
              <button 
                onClick={() => setSelectedAppModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900">Current Status:</span>
                <div className="mt-1">{getStatusBadge(selectedAppModal.status)}</div>
                <p className="text-slate-600 mt-2">{selectedAppModal.remarks}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div><span className="text-slate-400">Applied On:</span> {selectedAppModal.appliedDate}</div>
                <div><span className="text-slate-400">Jurisdiction:</span> Madurai District</div>
                <div><span className="text-slate-400">Verification Officer:</span> Tahsildar / RTO</div>
                <div><span className="text-slate-400">Expected SLA:</span> 7 - 15 Days</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedAppModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedAppModal(null);
                  alert(`Connecting to live support for application ${selectedAppModal.appNo}...`);
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white"
              >
                Get Officer Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Upload Additional Documents</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Select document category and file (PDF/JPEG up to 5MB):
              </p>
              <div className="p-4 border-2 border-dashed border-purple-200 rounded-2xl text-center space-y-2 bg-purple-50/30">
                <Upload className="w-8 h-8 text-purple-700 mx-auto" />
                <span className="font-bold text-slate-800 block">Drag & Drop or Browse file</span>
                <span className="text-[11px] text-slate-500">Aadhaar, Transfer Certificate, or Ration Card</span>
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
                  alert('Document uploaded successfully! Application marked as In Review.');
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white"
              >
                Upload & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
