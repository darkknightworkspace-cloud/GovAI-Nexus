import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Database, TrendingUp, AlertTriangle, Globe, 
  Smile, Server, CheckCircle2, Search, Filter, ChevronRight, Layers,
  Building2, MapPin, Download, RefreshCw, Shield, FileText, Check, Clock,
  ArrowUpRight, BarChart3, Radio, HardDrive, Cpu, Activity, BookOpen,
  Calendar, RotateCcw, ShieldAlert, Users, ArrowRight, ExternalLink,
  Plus, Settings, Megaphone, FileSpreadsheet, Bot, UserCheck, CheckCircle,
  HelpCircle, AlertCircle, Frown, Meh, FileCheck, BrainCircuit, Bell,
  KeyRound, LogOut, X, ChevronDown, Lock, ShieldCheck, Terminal, Upload
} from 'lucide-react';
import { AnalyticsPage } from '../../types';
import { apiService } from '../../services/api';
import { AnalyticsDashboardView } from './AnalyticsDashboardView';
import officerIasPortrait from '../../assets/images/officer_ias_portrait_1793721647657.jpg';

interface AnalyticsPortalViewProps {
  language: 'en' | 'ta';
  currentPage: AnalyticsPage;
  onNavigate: (page: AnalyticsPage) => void;
  onToggleLanguage?: (lang: 'en' | 'ta') => void;
  onAdjustFontSize?: (delta: number) => void;
  fontSize?: number;
  currentUser?: any;
  onLogout?: () => void;
  onOpenAuth?: (portal?: any, mode?: 'login' | 'signup') => void;
  onExitToPublic?: () => void;
  onOpenAIAssistant?: () => void;
}

export const AnalyticsPortalView: React.FC<AnalyticsPortalViewProps> = ({
  language,
  currentPage,
  onNavigate,
  onToggleLanguage,
  onAdjustFontSize,
  fontSize = 0,
  currentUser,
  onLogout,
  onOpenAuth,
  onExitToPublic,
  onOpenAIAssistant
}) => {
  const isTamil = language === 'ta';

  // State data caches from API
  const [govSummary, setGovSummary] = useState<any>(null);
  const [deptList, setDeptList] = useState<any[]>([]);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [infraData, setInfraData] = useState<any>(null);
  const [complianceOverview, setComplianceOverview] = useState<any>(null);
  const [compliancePolicies, setCompliancePolicies] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [integrationsList, setIntegrationsList] = useState<any[]>([]);

  // Navigation & Dropdown states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isKnowledgeMenuOpen, setIsKnowledgeMenuOpen] = useState(true);
  const [isPredictiveMenuOpen, setIsPredictiveMenuOpen] = useState(false);

  // Quick Action Modal states
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [isSearchKnowledgeModalOpen, setIsSearchKnowledgeModalOpen] = useState(false);
  const [isRunPredictionModalOpen, setIsRunPredictionModalOpen] = useState(false);
  const [isReviewAnomaliesModalOpen, setIsReviewAnomaliesModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);
  const [isManageModelsModalOpen, setIsManageModelsModalOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Search & Filter state in Knowledge
  const [knowledgeSearchTerm, setKnowledgeSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDeptIndex, setSelectedDeptIndex] = useState<number>(0);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState<number>(1); // Madurai
  const [selectedChunk, setSelectedChunk] = useState<number>(0);

  // Ingestion form state
  const [docName, setDocName] = useState('');
  const [docDept, setDocDept] = useState('Revenue Department');
  const [docCategory, setDocCategory] = useState('Government Orders');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionStage, setIngestionStage] = useState('');

  // Prediction run form
  const [predictionModelType, setPredictionModelType] = useState('delay-risk');
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [predictionSuccessNotice, setPredictionSuccessNotice] = useState<string | null>(null);

  // Report generation form
  const [reportFormat, setReportFormat] = useState('PDF');
  const [reportType, setReportType] = useState('AI Platform & RAG Performance');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Load baseline data on mount
    apiService.getGovernanceSummary().then(setGovSummary);
    apiService.getDepartmentAnalytics().then(setDeptList);
    apiService.getDistrictAnalytics().then(setDistrictList);
    apiService.getPublicProjects().then(setProjectsData);
    apiService.getInfrastructureAssets().then(setInfraData);
    apiService.getComplianceOverview().then(setComplianceOverview);
    apiService.getCompliancePolicies().then(setCompliancePolicies);
    apiService.listReports().then(setReportsList);
    apiService.listIntegrations().then(setIntegrationsList);
  }, []);

  const triggerActionNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleQuickAction = (actionKey: string) => {
    switch (actionKey) {
      case 'upload-document':
        setIsUploadDocModalOpen(true);
        break;
      case 'search-knowledge':
        setIsSearchKnowledgeModalOpen(true);
        break;
      case 'run-prediction':
        setIsRunPredictionModalOpen(true);
        break;
      case 'review-anomalies':
        setIsReviewAnomaliesModalOpen(true);
        break;
      case 'generate-report':
        setIsGenerateReportModalOpen(true);
        break;
      case 'manage-models':
        setIsManageModelsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleSimulateIngestion = () => {
    if (!docName) {
      alert('Please enter document title');
      return;
    }
    setIsIngesting(true);
    setIngestionStage('Validating & Malware Scanning...');
    setTimeout(() => {
      setIngestionStage('Extracting Text & OCR Normalization...');
      setTimeout(() => {
        setIngestionStage('Semantic Chunking & BGE-M3 Embedding...');
        setTimeout(() => {
          setIngestionStage('Indexing in pgvector & Ready for RAG Retrieval!');
          setTimeout(() => {
            setIsIngesting(false);
            setIsUploadDocModalOpen(false);
            setDocName('');
            triggerActionNotice(`Document "${docName}" successfully ingested and indexed into RAG pipeline.`);
          }, 1000);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleExecutePrediction = () => {
    setIsRunningPrediction(true);
    setTimeout(() => {
      setIsRunningPrediction(false);
      setIsRunPredictionModalOpen(false);
      triggerActionNotice(`Prediction job completed: 1,42,390 records evaluated with 94.2% confidence.`);
    }, 1500);
  };

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsGenerateReportModalOpen(false);
      triggerActionNotice(`Report "${reportType}" downloaded successfully as ${reportFormat}.`);
    }, 1200);
  };

  const ragChunks = [
    {
      id: 'chunk_go_rev_112_01',
      title: 'G.O. (Ms) No. 112 - Revenue Citizen Charter Section 3',
      dept: 'Revenue & Disaster Management',
      text: 'Every citizen belonging to Backward Classes (BC) and Most Backward Classes (MBC) residing continuously in Tamil Nadu for over 5 years shall be entitled to an official Community Certificate issued within 7 business days of online biometric authentication.',
      tokens: 48,
      vectorDim: 1024,
      distance: 0.12,
      model: 'BGE-M3 Multilingual'
    },
    {
      id: 'chunk_go_sw_49_04',
      title: 'G.O. (Ms) No. 49 - Magalir Urimai Thogai Eligibility Criteria',
      dept: 'Social Welfare & Women Empowerment',
      text: 'Direct Benefit Transfer (DBT) of ₹1,000 shall be credited on the 15th of every month into Aadhaar-linked NPCI bank accounts of eligible female heads of families whose annual household income does not exceed ₹2,50,000.',
      tokens: 52,
      vectorDim: 1024,
      distance: 0.08,
      model: 'BGE-M3 Multilingual'
    },
    {
      id: 'chunk_go_he_88_02',
      title: 'Moovalur Ramamirtham Pudhumai Penn Scheme Directives',
      dept: 'Higher Education Department',
      text: 'Girl students who completed their schooling from 6th to 12th standard in Tamil Nadu Government schools are entitled to ₹1,000 monthly educational incentive for degree and diploma courses.',
      tokens: 44,
      vectorDim: 1024,
      distance: 0.15,
      model: 'BGE-M3 Multilingual'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER - GOVERNMENT OF TAMIL NADU                                    */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between z-30 sticky top-0 shadow-2xs">
        {/* Left: Emblem + State Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            {/* Tamil Nadu Emblem */}
            <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#C2410C" strokeWidth="3" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#047857" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M50 15 L58 35 L42 35 Z" fill="#C2410C" />
              <rect x="44" y="35" width="12" height="26" fill="#D97706" />
              <path d="M36 61 L64 61 L60 76 L40 76 Z" fill="#047857" />
              <circle cx="50" cy="82" r="3" fill="#C2410C" />
              <path d="M28 45 C28 35 72 35 72 45 C72 65 28 65 28 45" stroke="#C2410C" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Government of Tamil Nadu</span>
              <span className="text-slate-300">|</span>
              <span className="font-tamil font-bold text-slate-700">தமிழ்நாடு அரசு</span>
            </div>
          </div>
        </div>

        {/* Right: Language, Font Controls, Notifications & Officer Profile */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => onToggleLanguage?.('en')}
              className={`px-2 py-1 rounded-md transition-colors ${
                !isTamil ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English ⌵
            </button>
            <button
              onClick={() => onToggleLanguage?.('ta')}
              className={`px-2 py-1 rounded-md transition-colors font-tamil ${
                isTamil ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ் ⌵
            </button>
          </div>

          {/* Font Size Adjusters */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 text-xs font-bold text-slate-700">
            <button 
              onClick={() => onAdjustFontSize?.(-1)}
              className="px-1.5 py-0.5 rounded hover:bg-white text-slate-600 hover:text-slate-900"
              title="Decrease Font"
            >
              A-
            </button>
            <button 
              onClick={() => onAdjustFontSize?.(0)}
              className="px-1.5 py-0.5 rounded hover:bg-white text-slate-800"
              title="Reset Font"
            >
              A
            </button>
            <button 
              onClick={() => onAdjustFontSize?.(1)}
              className="px-1.5 py-0.5 rounded hover:bg-white text-slate-600 hover:text-slate-900"
              title="Increase Font"
            >
              A+
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                12
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-900">Intelligence Notifications (12)</span>
                  <span className="text-[10px] text-purple-600 font-semibold cursor-pointer">Mark read</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs mt-2 max-h-60 overflow-y-auto space-y-1">
                  <div className="py-2">
                    <span className="font-semibold text-slate-800 block text-[11px]">Model Inference Failure (Batch-112)</span>
                    <span className="text-[10px] text-slate-500">Anomaly engine flagged unusual processing time • 5m ago</span>
                  </div>
                  <div className="py-2">
                    <span className="font-semibold text-slate-800 block text-[11px]">RAG Vector Index Updated</span>
                    <span className="text-[10px] text-slate-500">2,340 new chunks embedded into pgvector • 20m ago</span>
                  </div>
                  <div className="py-2">
                    <span className="font-semibold text-slate-800 block text-[11px]">SLA Delay Risk Threshold Exceeded</span>
                    <span className="text-[10px] text-slate-500">1,240 applications forecasted at risk in Kanchipuram • 1h ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Officer Profile Chip */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
            >
              <img 
                src={officerIasPortrait} 
                alt="Dr. R. Vijayakumar, IAS" 
                className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-600 shrink-0" 
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                  <span>Dr. R. Vijayakumar, IAS</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Analytics Director</div>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs">
                <div className="p-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900">Dr. R. Vijayakumar, IAS</p>
                  <p className="text-[10px] text-purple-700 font-medium">State Analytics & Intelligence Lead</p>
                  <p className="text-[10px] text-slate-400">TNeGA / State Data Centre, Chennai</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { setIsProfileOpen(false); onOpenAuth?.('analytics', 'login'); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                    <span>Switch / Login</span>
                  </button>
                  <button 
                    onClick={() => { setIsProfileOpen(false); onExitToPublic?.(); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Public Portal View</span>
                  </button>
                  <button 
                    onClick={() => { setIsProfileOpen(false); onLogout?.(); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit & Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SUB-HEADER - GOVAI NEXUS & AI & ANALYTICS CENTRE BADGE                   */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-green-600 p-0.5 shadow-xs flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="text-base font-black text-slate-900 tracking-tight leading-none">
                GovAI <span className="text-purple-600">Nexus</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                AI-Powered Governance Platform
              </div>
            </div>
          </div>
        </div>

        {/* AI & Analytics Centre Pill Badge */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-sm">
            <BrainCircuit className="w-4 h-4 text-purple-200" />
            <span>AI & Analytics Centre</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE (SIDEBAR + CONTENT CANVAS)                              */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================================= */}
        {/* 3A. LEFT NAVIGATION SIDEBAR (#131333 / DARK NAVY)                          */}
        {/* ========================================================================= */}
        <aside className="w-64 bg-[#131333] text-slate-300 flex flex-col shrink-0 relative overflow-hidden select-none">
          <div className="p-3 space-y-1 flex-1 overflow-y-auto custom-scrollbar relative z-10 text-xs">
            {/* 1. AI Dashboard */}
            <button
              onClick={() => onNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'dashboard' || currentPage === 'governance-overview'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboardIcon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1 text-left">AI Dashboard</span>
            </button>

            {/* 2. AI Knowledge Centre (Expandable) */}
            <div>
              <button
                onClick={() => {
                  setIsKnowledgeMenuOpen(!isKnowledgeMenuOpen);
                  onNavigate('ai-knowledge');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                  currentPage === 'ai-knowledge' || currentPage === 'knowledge-repository' || currentPage === 'document-ingestion' || currentPage === 'semantic-search'
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4.5 h-4.5 shrink-0" />
                  <span>AI Knowledge Centre</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isKnowledgeMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isKnowledgeMenuOpen && (
                <div className="ml-7 pl-2 border-l border-slate-700/60 my-1 space-y-0.5 text-[11px]">
                  <button
                    onClick={() => onNavigate('knowledge-repository')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center gap-2 ${
                      currentPage === 'knowledge-repository' ? 'text-purple-300 font-bold bg-white/5' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Knowledge Repository</span>
                  </button>
                  <button
                    onClick={() => onNavigate('document-ingestion')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center gap-2 ${
                      currentPage === 'document-ingestion' ? 'text-purple-300 font-bold bg-white/5' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Document Ingestion</span>
                  </button>
                  <button
                    onClick={() => onNavigate('semantic-search')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center gap-2 ${
                      currentPage === 'semantic-search' ? 'text-purple-300 font-bold bg-white/5' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Semantic Search (RAG)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Predictive Intelligence */}
            <button
              onClick={() => onNavigate('predictive-intel')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'predictive-intel'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4.5 h-4.5 shrink-0" />
                <span>Predictive Intelligence</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* 4. Fraud Intelligence */}
            <button
              onClick={() => onNavigate('fraud-intel')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'fraud-intel'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                <span>Fraud Intelligence</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* 5. Public Transparency */}
            <button
              onClick={() => onNavigate('public-transparency')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'public-transparency'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4.5 h-4.5 shrink-0" />
                <span>Public Transparency</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* 6. Citizen Sentiment */}
            <button
              onClick={() => onNavigate('citizen-sentiment')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'citizen-sentiment'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smile className="w-4.5 h-4.5 shrink-0" />
                <span>Citizen Sentiment</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* 7. Infrastructure Monitoring */}
            <button
              onClick={() => onNavigate('infrastructure')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'infrastructure'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Server className="w-4.5 h-4.5 shrink-0" />
                <span>Infrastructure Monitoring</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* 8. Compliance & Governance */}
            <button
              onClick={() => onNavigate('compliance')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'compliance'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                <span>Compliance & Governance</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* 9. Reports & Analytics */}
            <button
              onClick={() => onNavigate('reports-analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'reports-analytics' || currentPage === 'bi-reporting'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4.5 h-4.5 shrink-0" />
              <span>Reports & Analytics</span>
            </button>

            {/* 10. AI Assistant */}
            <button
              onClick={() => {
                if (onOpenAIAssistant) onOpenAIAssistant();
                else onNavigate('ai-assistant');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'ai-assistant'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Bot className="w-4.5 h-4.5 shrink-0 text-purple-400" />
              <span>AI Assistant</span>
            </button>

            {/* 11. Help & Documentation */}
            <button
              onClick={() => onNavigate('help-documentation')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold ${
                currentPage === 'help-documentation'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4.5 h-4.5 shrink-0" />
                <span>Help & Documentation</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Bottom Watermark: Fort St. George Secretariat Silhouette */}
          <div className="relative pt-6 pb-2 px-3 pointer-events-none mt-auto">
            <svg viewBox="0 0 200 100" className="w-full h-20 opacity-35 text-purple-400 fill-current">
              {/* Secretariat / Assembly Dome & Pillars Silhouette */}
              <path d="M100 10 L102 20 L106 20 L106 24 L94 24 L94 20 L98 20 Z" />
              <path d="M85 24 C85 18 115 18 115 24 L115 32 L85 32 Z" />
              <rect x="75" y="32" width="50" height="6" rx="1" />
              <rect x="70" y="38" width="60" height="4" />
              {/* Pillars */}
              <rect x="72" y="42" width="4" height="28" />
              <rect x="80" y="42" width="4" height="28" />
              <rect x="88" y="42" width="4" height="28" />
              <rect x="98" y="42" width="4" height="28" />
              <rect x="108" y="42" width="4" height="28" />
              <rect x="116" y="42" width="4" height="28" />
              <rect x="124" y="42" width="4" height="28" />
              {/* Left Wing */}
              <rect x="25" y="46" width="45" height="24" />
              <rect x="10" y="52" width="15" height="18" />
              {/* Right Wing */}
              <rect x="130" y="46" width="45" height="24" />
              <rect x="175" y="52" width="15" height="18" />
              {/* Windows */}
              <circle cx="35" cy="52" r="2" fill="#131333" />
              <circle cx="45" cy="52" r="2" fill="#131333" />
              <circle cx="55" cy="52" r="2" fill="#131333" />
              <circle cx="145" cy="52" r="2" fill="#131333" />
              <circle cx="155" cy="52" r="2" fill="#131333" />
              <circle cx="165" cy="52" r="2" fill="#131333" />
              {/* Ground plinth */}
              <rect x="0" y="70" width="200" height="6" />
              <path d="M0 76 Q100 85 200 76 L200 100 L0 100 Z" opacity="0.6" />
            </svg>
            <div className="text-[9px] text-center text-purple-300/40 uppercase tracking-widest font-mono mt-1">
              State Data Centre • Chennai
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 3B. MAIN CONTENT VIEW CANVAS                                              */}
        {/* ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          {/* Action Notice Toast */}
          {actionNotice && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{actionNotice}</span>
              </div>
              <button onClick={() => setActionNotice(null)}>
                <X className="w-3.5 h-3.5 text-emerald-500 hover:text-emerald-700" />
              </button>
            </div>
          )}

          {/* VIEW SWITCHER */}
          {(currentPage === 'dashboard' || currentPage === 'governance-overview') && (
            <AnalyticsDashboardView
              isTamil={isTamil}
              onNavigate={onNavigate}
              onOpenAIAssistant={() => onOpenAIAssistant ? onOpenAIAssistant() : onNavigate('ai-assistant')}
              onQuickAction={handleQuickAction}
            />
          )}

          {/* AI KNOWLEDGE CENTRE */}
          {(currentPage === 'ai-knowledge' || currentPage === 'knowledge-repository' || currentPage === 'document-ingestion' || currentPage === 'semantic-search') && (
            <div className="space-y-6">
              {/* Sub-header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Module 1: AI Knowledge Management</div>
                  <h1 className="text-xl font-black text-slate-900">Tamil Nadu Government AI Knowledge Centre</h1>
                  <p className="text-xs text-slate-500">Official repository of G.O.s, citizen charters, and policy vectors for RAG grounding.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsUploadDocModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>

              {/* Ingestion & RAG stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Total Verified Documents</span>
                  <span className="text-2xl font-black text-slate-900">1,24,860</span>
                  <span className="text-[11px] text-green-600 font-bold block mt-1">100% Provenance Recorded</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Vector Chunks in pgvector</span>
                  <span className="text-2xl font-black text-slate-900">3,48,920</span>
                  <span className="text-[11px] text-purple-600 font-bold block mt-1">1024-dim BGE-M3 Embeddings</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Average Retrieval Latency</span>
                  <span className="text-2xl font-black text-slate-900">42 ms</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">HNSW Index Optimized</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Active Knowledge Sources</span>
                  <span className="text-2xl font-black text-slate-900">46 Depts</span>
                  <span className="text-[11px] text-blue-600 font-bold block mt-1">Daily Automated Sync</span>
                </div>
              </div>

              {/* Semantic Search Tester */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-600" />
                  <span>Semantic Vector Search & Citations Inspector</span>
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={knowledgeSearchTerm}
                    onChange={(e) => setKnowledgeSearchTerm(e.target.value)}
                    placeholder="Search government policy or rules in Tamil or English (e.g. 'Community Certificate timeline' or 'மகளிர் உரிமைத் தொகை')..."
                    className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                  <button 
                    onClick={() => triggerActionNotice('Semantic search query executed across 3,48,920 vectors.')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:opacity-95"
                  >
                    Search Vectors
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Top Grounding Chunks with Cosine Distance</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ragChunks.map((chunk, idx) => (
                      <div 
                        key={chunk.id}
                        onClick={() => setSelectedChunk(idx)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedChunk === idx 
                            ? 'border-purple-500 bg-purple-50/40 ring-1 ring-purple-500 shadow-xs' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-slate-900 line-clamp-1">{chunk.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            d={chunk.distance}
                          </span>
                        </div>
                        <div className="text-[11px] text-purple-700 font-medium mb-1">{chunk.dept}</div>
                        <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">{chunk.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREDICTIVE INTELLIGENCE */}
          {currentPage === 'predictive-intel' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Module 2: Predictive Intelligence Centre</div>
                  <h1 className="text-xl font-black text-slate-900">Application Delay & Demand Forecasting</h1>
                  <p className="text-xs text-slate-500">Python XGBoost, Random Forest & Prophet models anticipating SLA breaches.</p>
                </div>
                <button
                  onClick={() => setIsRunPredictionModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Run Prediction Job</span>
                </button>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-semibold block">Predicted Delay Risk</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">1,240 Applications</div>
                  <p className="text-xs text-slate-500 mt-1">Flagged with ≥85% probability of statutory SLA breach unless reassigned.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-semibold block">Service Demand Surge</span>
                  <div className="text-2xl font-black text-purple-700 mt-1">+18% Community Cert</div>
                  <p className="text-xs text-slate-500 mt-1">High school examination registration season anticipated in Dec-Jan.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-semibold block">Model Evaluation (F1 Score)</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">0.942 F1</div>
                  <p className="text-xs text-slate-500 mt-1">XGBoost classifier cross-validated on 1.2M historical applications.</p>
                </div>
              </div>
            </div>
          )}

          {/* FRAUD INTELLIGENCE */}
          {currentPage === 'fraud-intel' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Module 3: Fraud & Anomaly Intelligence</div>
                  <h1 className="text-xl font-black text-slate-900">Pattern Irregularity & Investigation Queue</h1>
                  <p className="text-xs text-slate-500">Unsupervised Isolation Forest and LOF algorithms supporting human review.</p>
                </div>
                <button
                  onClick={() => setIsReviewAnomaliesModalOpen(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Review Active Queue (12)</span>
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Responsible AI Safeguard:</strong> Anomaly detection scores indicate statistical deviation, not guilt or fraud. No automated disciplinary or application rejection actions are executed without human administrative review.
                </div>
              </div>
            </div>
          )}

          {/* PUBLIC TRANSPARENCY */}
          {currentPage === 'public-transparency' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">Module 4: Public Transparency Centre</div>
                  <h1 className="text-xl font-black text-slate-900">Open Data & Department Accountability</h1>
                  <p className="text-xs text-slate-500">Published aggregated datasets with PII minimization and privacy masking.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Published Open Datasets</span>
                  <span className="text-2xl font-black text-slate-900">24 Datasets</span>
                  <span className="text-[11px] text-teal-600 font-bold block mt-1">Open Government Data (OGD) TN</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Average SLA Compliance</span>
                  <span className="text-2xl font-black text-emerald-600">94.8%</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Across all 46 departments</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Public Downloads This Month</span>
                  <span className="text-2xl font-black text-slate-900">18,420</span>
                  <span className="text-[11px] text-blue-600 font-bold block mt-1">CSV & JSON formats</span>
                </div>
              </div>
            </div>
          )}

          {/* CITIZEN SENTIMENT */}
          {currentPage === 'citizen-sentiment' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Module 5: Citizen Sentiment Centre</div>
                <h1 className="text-xl font-black text-slate-900">Multilingual Tamil & English Sentiment Intelligence</h1>
                <p className="text-xs text-slate-500">NLP topic modeling identifying pain points from grievance feedback.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Total Feedbacks Analyzed</span>
                  <span className="text-2xl font-black text-slate-900">87,560</span>
                  <span className="text-[11px] text-green-600 font-bold block mt-1">72.4% Positive Sentiment</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Tamil Unicode NLP</span>
                  <span className="text-2xl font-black text-purple-700">64,280</span>
                  <span className="text-[11px] text-purple-600 font-bold block mt-1">Processed by IndicBERT / Muril</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Top Citizen Concern</span>
                  <span className="text-xl font-black text-amber-600 mt-1">Document Upload Time</span>
                  <span className="text-[11px] text-slate-500 block">412 complaints resolved</span>
                </div>
              </div>
            </div>
          )}

          {/* INFRASTRUCTURE MONITORING */}
          {currentPage === 'infrastructure' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Module 6: Infrastructure Monitoring</div>
                <h1 className="text-xl font-black text-slate-900">Real-Time Telemetry & Systems Health</h1>
                <p className="text-xs text-slate-500">PostgreSQL, pgvector, Redis, FastAPI, and GPU inference cluster health.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">API Availability</span>
                  <span className="text-2xl font-black text-emerald-600">99.8%</span>
                  <span className="text-[11px] text-slate-400 block mt-1">P95 Latency: 48ms</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">PostgreSQL + pgvector</span>
                  <span className="text-2xl font-black text-emerald-600">Healthy</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Connections: 42 / 200</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Redis Memory Hit Rate</span>
                  <span className="text-2xl font-black text-emerald-600">96.4%</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Used: 2.1 GB / 8 GB</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">AI Workers Queue</span>
                  <span className="text-2xl font-black text-slate-900">0 Backlog</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">All Workers Active</span>
                </div>
              </div>
            </div>
          )}

          {/* COMPLIANCE & GOVERNANCE */}
          {currentPage === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Module 7: Compliance & Governance</div>
                <h1 className="text-xl font-black text-slate-900">DPDP 2023 & Responsible AI Governance</h1>
                <p className="text-xs text-slate-500">Security risk registry, data minimization, and audit trail validation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">DPDP Act Compliance</span>
                  <span className="text-2xl font-black text-emerald-600">100% Compliant</span>
                  <span className="text-[11px] text-slate-400 block mt-1">PII masking active across logs</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">AI Model Registry</span>
                  <span className="text-2xl font-black text-purple-700">24 Audited</span>
                  <span className="text-[11px] text-purple-600 font-bold block mt-1">Model cards & fairness verified</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 font-medium block">Open Risk Items</span>
                  <span className="text-2xl font-black text-slate-900">0 Critical</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">All audit criteria passed</span>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS & ANALYTICS */}
          {(currentPage === 'reports-analytics' || currentPage === 'bi-reporting') && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Reports & BI Exports</div>
                  <h1 className="text-xl font-black text-slate-900">State Analytics Export Centre</h1>
                  <p className="text-xs text-slate-500">Generate executive summaries and structured CSV/Excel reports.</p>
                </div>
                <button
                  onClick={() => setIsGenerateReportModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Generate New Report</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-sm text-slate-900 mb-3">Available Intelligence Reports</h3>
                <div className="space-y-2">
                  {[
                    { title: 'Statewide SLA Compliance Monthly Digest (October 2026)', date: '01 Nov 2026', size: '2.4 MB PDF' },
                    { title: 'AI Model Inference & RAG Performance Audit v2.4', date: '31 Oct 2026', size: '1.8 MB PDF' },
                    { title: 'District-wise Application Backlog & Workload Forecast', date: '28 Oct 2026', size: '4.1 MB XLSX' },
                    { title: 'Citizen Grievance Topic & Sentiment NLP Breakdown', date: '25 Oct 2026', size: '1.2 MB CSV' },
                  ].map((rep, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{rep.title}</span>
                        <span className="text-[11px] text-slate-400">Generated on {rep.date} • {rep.size}</span>
                      </div>
                      <button 
                        onClick={() => triggerActionNotice(`Downloaded ${rep.title}`)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI ASSISTANT WORKSPACE */}
          {currentPage === 'ai-assistant' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">AI Analytical Assistant</div>
                <h1 className="text-xl font-black text-slate-900">GovAI Analytical Intelligence Assistant</h1>
                <p className="text-xs text-slate-500">Ask natural language questions on service trends, delay risks, and official state guidelines.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 mx-auto flex items-center justify-center">
                  <Bot className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Need deep insights or cross-department summaries?</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click below to open the dedicated full-screen bilingual GovAI analytical assistant with source citations.
                </p>
                <button
                  onClick={() => onOpenAIAssistant?.()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Ask GovAI Assistant</span>
                </button>
              </div>
            </div>
          )}

          {/* HELP & DOCUMENTATION */}
          {currentPage === 'help-documentation' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Developer & Officer Guide</div>
              <h1 className="text-xl font-black text-slate-900">GovAI Nexus AI & Analytics Architecture Documentation</h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                The AI & Analytics Centre provides centralized state-level intelligence for Tamil Nadu. Built on a Python FastAPI backend with pgvector semantic retrieval, Scikit-learn / XGBoost prediction models, and React 19 frontend dashboards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
                <div className="p-3 border border-slate-200 rounded-xl">
                  <strong className="block text-slate-900 mb-1">RAG Grounding Pipeline:</strong>
                  Official G.O.s and guidelines are chunked with semantic boundaries, encoded via BGE-M3 1024-dimension embeddings, and stored in pgvector with HNSW indexing.
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <strong className="block text-slate-900 mb-1">Predictive Delay Models:</strong>
                  Application processing delays are computed using historical office workloads, service complexity, and queue depth, predicting SLA breaches before they occur.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MODALS                                                     */}
      {/* ========================================================================= */}
      {/* MODAL 1: Upload Document */}
      {isUploadDocModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Ingest Document into AI Knowledge Base</h3>
              </div>
              <button onClick={() => setIsUploadDocModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Title / G.O. Number *</label>
                <input 
                  type="text" 
                  value={docName} 
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. G.O. (Ms) No. 248 - Revenue Department Guidelines"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Department</label>
                  <select 
                    value={docDept} 
                    onChange={(e) => setDocDept(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 bg-white"
                  >
                    <option>Revenue Department</option>
                    <option>Social Welfare Department</option>
                    <option>Transport Department</option>
                    <option>Town & Country Planning</option>
                    <option>Health & Family Welfare</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select 
                    value={docCategory} 
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 bg-white"
                  >
                    <option>Government Orders</option>
                    <option>Citizen Charters</option>
                    <option>Eligibility Directives</option>
                    <option>Scheme Guidelines</option>
                  </select>
                </div>
              </div>

              {/* Upload Drag & Drop Box */}
              <div className="border-2 border-dashed border-purple-200 rounded-2xl p-6 text-center bg-purple-50/30">
                <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">Drag & drop official PDF, DOCX or TXT</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Maximum size 50 MB • Scanned PDFs processed via OCR</p>
              </div>

              {isIngesting && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 font-medium flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-purple-600 animate-spin" />
                  <span>{ingestionStage}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsUploadDocModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleSimulateIngestion}
                disabled={isIngesting}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {isIngesting ? 'Processing Ingestion...' : 'Start Ingestion & Embedding'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Run Prediction */}
      {isRunPredictionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Execute ML Predictive Pipeline</h3>
              </div>
              <button onClick={() => setIsRunPredictionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Prediction Model</label>
                <select 
                  value={predictionModelType}
                  onChange={(e) => setPredictionModelType(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 bg-white"
                >
                  <option value="delay-risk">Application Delay Risk (XGBoost v2.3)</option>
                  <option value="demand-surge">Service Demand Forecasting (Prophet-ML)</option>
                  <option value="workload-forecast">Department Workload Capacity (RandomForest)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Department Scope</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 bg-white">
                  <option>All 46 Departments</option>
                  <option>Revenue Department</option>
                  <option>Transport Department</option>
                  <option>Social Welfare</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 text-[11px]">
                ℹ️ Runs asynchronous background worker job across current operational records. Output will be saved to <code className="font-mono">prediction_results</code> table.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsRunPredictionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleExecutePrediction}
                disabled={isRunningPrediction}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {isRunningPrediction ? 'Executing Pipeline...' : 'Run Pipeline Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Generate Report */}
      {isGenerateReportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Generate Intelligence Report</h3>
              </div>
              <button onClick={() => setIsGenerateReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Report Category</label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 bg-white"
                >
                  <option>AI Platform & RAG Performance</option>
                  <option>SLA Delay Risk Digest</option>
                  <option>Service Demand Forecast Report</option>
                  <option>Anomaly Investigation Summary</option>
                  <option>Citizen Sentiment & Grievance NLP</option>
                  <option>DPDP Compliance & Audit Log</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Export Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['PDF', 'Excel (XLSX)', 'CSV'].map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setReportFormat(fmt)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        reportFormat === fmt ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsGenerateReportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleExportReport}
                disabled={isExporting}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {isExporting ? 'Generating Report...' : 'Download Report'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Review Anomalies */}
      {isReviewAnomaliesModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-sm text-slate-900">Active Anomaly Review Queue (12 Alerts)</h3>
              </div>
              <button onClick={() => setIsReviewAnomaliesModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 my-4 max-h-80 overflow-y-auto text-xs">
              {[
                { id: 'ALT-1082', type: 'Unusual Processing Time', desc: '5 Community certificates approved in < 90 seconds from same IP', risk: 'High', method: 'Isolation Forest' },
                { id: 'ALT-1083', type: 'Duplicate Application Pattern', desc: '4 identical Aadhaar hashes submitted across 2 different taluks', risk: 'Critical', method: 'Fuzzy Matching' },
                { id: 'ALT-1084', type: 'Document Inconsistency', desc: 'Mismatched income slip font metadata vs standard revenue format', risk: 'Medium', method: 'OCR Anomaly' },
              ].map(alt => (
                <div key={alt.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{alt.id}: {alt.type}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alt.risk === 'Critical' ? 'bg-red-100 text-red-700' : alt.risk === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {alt.risk}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{alt.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Method: {alt.method}</span>
                  </div>
                  <button 
                    onClick={() => {
                      triggerActionNotice(`Alert ${alt.id} assigned to human officer for evidence verification.`);
                      setIsReviewAnomaliesModalOpen(false);
                    }}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 shrink-0"
                  >
                    Investigate
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsReviewAnomaliesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700"
              >
                Close Queue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Manage AI Models */}
      {isManageModelsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Manage 24 Active AI & ML Models</h3>
              </div>
              <button onClick={() => setIsManageModelsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 my-4 max-h-80 overflow-y-auto text-xs">
              {[
                { name: 'Gemini 2.5 Flash / Interactions', type: 'LLM Orchestrator', status: 'Active', latency: '320ms' },
                { name: 'BGE-M3 Multilingual Vectorizer', type: 'Embedding (1024-d)', status: 'Active', latency: '42ms' },
                { name: 'XGBoost Delay Risk Classifier v2.3', type: 'Tabular ML', status: 'Active', latency: '12ms' },
                { name: 'IndicBERT / Muril Tamil NLP', type: 'Sentiment & Topic', status: 'Active', latency: '68ms' },
                { name: 'IsolationForest Anomaly Detector', type: 'Unsupervised Outlier', status: 'Active', latency: '18ms' },
              ].map((model, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{model.name}</span>
                    <span className="text-[11px] text-slate-500">{model.type} • Avg Latency: {model.latency}</span>
                  </div>
                  <span className="font-bold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {model.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsManageModelsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold text-xs text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon
function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
