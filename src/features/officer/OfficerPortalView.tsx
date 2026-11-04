import React, { useState, useEffect } from 'react';
import { 
  Building2, User, MapPin, Briefcase, Users, Calendar, 
  FileText, Hourglass, RefreshCw, CheckCircle2, XCircle, Clock, 
  Award, TrendingUp, BarChart2, PieChart, ShieldAlert, AlertTriangle, 
  ChevronRight, ChevronDown, ExternalLink, ArrowRight, Bell, Sparkles, 
  MessageSquare, HelpCircle, Check, Filter, Layers, Share2, Megaphone, 
  Gauge, FileSpreadsheet, KeyRound, LogOut, Search, Plus, Download, 
  Send, ShieldCheck, CheckSquare, Eye, Shield, Phone, Mail, RotateCcw
} from 'lucide-react';
import { OfficerPage, FraudAlertRecord, ApplicationRecord } from '../../types';
import { govApi, ComplaintRecord, TaskRecord } from '../../services/api';
import { OfficerDashboardView } from './OfficerDashboardView';
import officerImg from '../../assets/images/officer_ias_portrait_1793721647657.jpg';

interface OfficerPortalViewProps {
  language: 'en' | 'ta';
  currentPage: OfficerPage;
  onNavigate: (page: OfficerPage) => void;
  onToggleLanguage?: (lang: 'en' | 'ta') => void;
  onAdjustFontSize?: (delta: number) => void;
  fontSize?: number;
  currentUser?: any;
  onLogout?: () => void;
  onOpenAuth?: (portal?: any, mode?: 'login' | 'signup') => void;
  onExitToPublic?: () => void;
  onOpenAIAssistant?: () => void;
}

export const OfficerPortalView: React.FC<OfficerPortalViewProps> = ({
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

  // Navigation & Dropdown states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Data Store
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlertRecord[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [talukFilter, setTalukFilter] = useState('ALL');

  // Selected Application for Supervisory Review
  const [selectedAppForReview, setSelectedAppForReview] = useState<ApplicationRecord | null>(null);
  const [supervisoryNote, setSupervisoryNote] = useState('');

  // Selected Anomaly Alert for Investigation
  const [selectedAlert, setSelectedAlert] = useState<FraudAlertRecord | null>(null);

  // New Department Announcement state
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const apps = await govApi.getApplications();
    const alerts = await govApi.getFraudAlerts();
    const cmps = await govApi.getComplaints();
    setApplications(apps);
    setFraudAlerts(alerts);
    setComplaints(cmps);
  };

  const handleAlertAction = async (id: string, action: 'SHOW_CAUSE' | 'CLEAR') => {
    const newStatus = action === 'SHOW_CAUSE' ? 'ESCALATED' : 'CLEARED';
    await govApi.updateFraudAlertStatus(id, newStatus);
    setActionNotice(action === 'SHOW_CAUSE' 
      ? `Statutory Show-Cause Notice issued for Anomaly Alert ${id}. Freezing pending clearance.`
      : `Anomaly Alert ${id} reviewed and closed as verified legitimate case.`
    );
    await loadAllData();
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleSupervisoryDecision = async (appId: string, decision: 'APPROVED' | 'REJECTED' | 'REASSIGNED') => {
    if (decision === 'REASSIGNED') {
      setActionNotice(`Application ${appId} reassigned to Sriperumbudur Taluk Revenue Inspector.`);
    } else {
      await govApi.updateApplicationStatus(appId, decision);
      setActionNotice(`Executive Supervisory Order filed: Application ${appId} marked as ${decision}.`);
    }
    setSelectedAppForReview(null);
    await loadAllData();
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle) return;
    setIsAnnouncementModalOpen(false);
    setActionNotice(`Department Circular published and broadcasted to all 12 Taluk & Block offices.`);
    setAnnouncementTitle('');
    setAnnouncementBody('');
    setTimeout(() => setActionNotice(null), 3500);
  };

  // 14 Navigation sidebar items matching image_12cc6b00.png
  const navItems = [
    { id: 'dashboard' as OfficerPage, label: 'Dashboard', labelTa: 'முகப்பு பலகை', icon: <Layers className="w-4 h-4" /> },
    { id: 'departments' as OfficerPage, label: 'Department Management', labelTa: 'துறை நிர்வாகம்', icon: <Building2 className="w-4 h-4" /> },
    { id: 'applications' as OfficerPage, label: 'Application Monitoring', labelTa: 'விண்ணப்ப கண்காணிப்பு', icon: <FileText className="w-4 h-4" /> },
    { id: 'employees' as OfficerPage, label: 'Employee Management', labelTa: 'ஊழியர் மேலாண்மை', icon: <Users className="w-4 h-4" /> },
    { id: 'workload' as OfficerPage, label: 'Workload Monitoring', labelTa: 'பணிச்சுமை கண்காணிப்பு', icon: <Gauge className="w-4 h-4" /> },
    { id: 'predictive' as OfficerPage, label: 'Predictive Analytics', labelTa: 'முன்னறிவிப்பு பகுப்பாய்வு', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'fraud-alerts' as OfficerPage, label: 'Fraud & Anomaly Alerts', labelTa: 'மோசடி & ஒழுங்கின்மை எச்சரிக்கைகள்', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'grievances' as OfficerPage, label: 'Citizen Grievances', labelTa: 'குடிமக்கள் குறைதீர்ப்பு', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'feedback' as OfficerPage, label: 'Citizen Feedback', labelTa: 'குடிமக்கள் கருத்துகள்', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'reports' as OfficerPage, label: 'Department Reports', labelTa: 'துறை அறிக்கைகள்', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'announcements' as OfficerPage, label: 'Announcements', labelTa: 'துறை அறிவிப்புகள்', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'notifications' as OfficerPage, label: 'Notifications', labelTa: 'அறிவிப்புகள்', icon: <Bell className="w-4 h-4" /> },
    { id: 'help' as OfficerPage, label: 'Help & Resources', labelTa: 'உதவி & வழிகாட்டிகள்', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'profile' as OfficerPage, label: 'Profile & Settings', labelTa: 'சுயவிவரம் & அமைப்புகள்', icon: <User className="w-4 h-4" /> },
  ];

  // Quick Action routing
  const handleQuickAction = (actionKey: string) => {
    if (actionKey === 'applications') onNavigate('applications');
    else if (actionKey === 'workload') onNavigate('workload');
    else if (actionKey === 'employees') onNavigate('employees');
    else if (actionKey === 'reports') onNavigate('reports');
    else if (actionKey === 'predictive') onNavigate('predictive');
    else if (actionKey === 'fraud-alerts') onNavigate('fraud-alerts');
    else if (actionKey === 'announcements') setIsAnnouncementModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] text-[#0F172A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOPMOST HEADER (Slate-900 #0F172A)                                      */}
      {/* ========================================================================= */}
      <header className="bg-[#0F172A] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 z-40">
        {/* Left: TN Seal + Bilingual Text */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-white/10 p-0.5 border border-white/20 shrink-0">
            <img src="/assets/aistudio/image_5b30609e.png" alt="TN Seal" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-xs sm:text-sm">Government of Tamil Nadu</span>
            <span className="text-slate-400 text-xs hidden sm:inline">|</span>
            <span className="text-slate-300 text-xs hidden sm:inline">தமிழ்நாடு அரசு</span>
          </div>
        </div>

        {/* Right: Language, Font Size, Notifications (12), Officer Profile */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Language Switchers */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <button
              onClick={() => onToggleLanguage && onToggleLanguage('en')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-0.5 ${!isTamil ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
            >
              <span>English</span>
              <span className="text-[10px]">⌵</span>
            </button>
            <button
              onClick={() => onToggleLanguage && onToggleLanguage('ta')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-0.5 ${isTamil ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
            >
              <span>தமிழ்</span>
              <span className="text-[10px]">⌵</span>
            </button>
          </div>

          {/* Font Controls */}
          <div className="hidden sm:flex items-center gap-1 text-slate-300 font-bold text-xs border-x border-slate-700 px-3">
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(-1)} className="hover:text-white px-1">A-</button>
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(0)} className="hover:text-white px-1">A</button>
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(1)} className="hover:text-white px-1">A+</button>
          </div>

          {/* Notification Bell with Badge 12 */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0F172A]">
                12
              </span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-84 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-slate-900">Department Alerts (12 New)</h4>
                  <span className="text-[10px] text-purple-700 font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">42 applications breached SLA</span>
                      <span className="text-[10px] text-slate-400">5 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Income Certificate & Patta Services in Uthiramerur Taluk.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">Workload surge warning</span>
                      <span className="text-[10px] text-slate-400">12 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Uthiramerur Taluk intake surged +38% this week.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">Anomaly Alert: Multiple submissions</span>
                      <span className="text-[10px] text-slate-400">40 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Duplicate patta transfer applications from single IP block.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Officer Profile: Dr. R. Vijayakumar, IAS */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-white/10 py-1 px-2 rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/50 shrink-0 bg-purple-900/40">
                <img src={officerImg} alt="Dr. R. Vijayakumar, IAS" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="flex items-center gap-1 font-bold text-xs text-white">
                  <span>Dr. R. Vijayakumar, IAS</span>
                  <span className="text-[10px] text-slate-400">⌵</span>
                </div>
                <span className="text-[10px] text-slate-400 block">District Officer (Revenue)</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-purple-400 shrink-0">
                    <img src={officerImg} alt="Dr. R. Vijayakumar, IAS" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Dr. R. Vijayakumar, IAS</h5>
                    <p className="text-[10px] text-slate-500">District Officer · Cadre Rank 1</p>
                    <p className="text-[9px] text-purple-700 font-medium">Revenue Dept · Kanchipuram Collectorate</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-purple-700" />
                    <span>{isTamil ? 'அதிகாரி விவரங்கள்' : 'Officer Credentials & Posting'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onOpenAuth && onOpenAuth('officer', 'login'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isTamil ? 'கணக்கை மாற்று' : 'Switch / Login Account'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onExitToPublic ? onExitToPublic() : (onLogout && onLogout()); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-700 font-medium flex items-center gap-2 border-t border-slate-100 mt-1 pt-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>{isTamil ? 'வெளியேறு (Public Portal)' : 'Exit to Public Portal'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BRANDING SUB-HEADER (White #FFFFFF)                                     */}
      {/* ========================================================================= */}
      <div className="bg-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-200 shadow-2xs shrink-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs shrink-0">
            <img src="/assets/aistudio/image_5b30609e.png" alt="GovAI Nexus" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">GovAI Nexus</h1>
            <p className="text-[11px] text-slate-500 font-medium">AI-Powered Governance Platform</p>
          </div>
        </div>

        {/* Purple Pill Badge: Officer Portal matching image_12cc6b00.png */}
        <div className="bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs">
          <Building2 className="w-3.5 h-3.5" />
          <span>{isTamil ? 'அதிகாரி போர்டல்' : 'Officer Portal'}</span>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-white hover:text-emerald-100 font-bold ml-4">✕</button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN BODY CONTAINER: Left Sidebar + Right Content Canvas                */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT NAVIGATION SIDEBAR (#131333, w-64) */}
        <aside className="w-64 bg-[#131333] text-white flex flex-col justify-between shrink-0 min-h-[calc(100vh-100px)] border-r border-slate-800 overflow-y-auto">
          <div className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = (currentPage === item.id) ||
                (item.id === 'departments' && currentPage === 'department-management') ||
                (item.id === 'applications' && currentPage === 'application-monitoring') ||
                (item.id === 'employees' && currentPage === 'employee-management') ||
                (item.id === 'workload' && currentPage === 'workload-monitoring') ||
                (item.id === 'predictive' && currentPage === 'predictive-analytics') ||
                (item.id === 'grievances' && currentPage === 'citizen-grievances') ||
                (item.id === 'feedback' && currentPage === 'citizen-feedback') ||
                (item.id === 'reports' && currentPage === 'department-reports') ||
                (item.id === 'profile' && currentPage === 'profile-settings');

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7C3AED] text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                    <span className="truncate">{isTamil ? item.labelTa : item.label}</span>
                  </div>
                  {item.id !== 'dashboard' && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Fort St. George Architectural Secretariat Silhouette Watermark */}
          <div className="p-4 pt-6 pointer-events-none opacity-25 flex justify-center">
            <svg className="w-full h-24 text-purple-300" viewBox="0 0 200 120" fill="currentColor">
              <path d="M10 115 H190 V110 H10 Z" />
              <rect x="25" y="70" width="150" height="40" rx="1" />
              <rect x="35" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="55" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="75" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="95" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="115" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="135" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="155" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="70" y="38" width="60" height="32" />
              <circle cx="100" cy="54" r="7" fill="#131333" />
              <path d="M70 38 Q100 15 130 38 Z" />
              <line x1="100" y1="15" x2="100" y2="4" stroke="currentColor" strokeWidth="2" />
              <polygon points="100,5 112,8 100,11" />
              <circle cx="45" cy="55" r="9" />
              <circle cx="155" cy="55" r="9" />
            </svg>
          </div>
        </aside>

        {/* RIGHT CONTENT CANVAS (#F4F6FB) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* ================================================================= */}
          {/* VIEW 1: OFFICER DASHBOARD (1-to-1 match to image_12cc6b00.png)     */}
          {/* ================================================================= */}
          {currentPage === 'dashboard' && (
            <OfficerDashboardView
              isTamil={isTamil}
              onNavigate={onNavigate}
              onOpenAIAssistant={onOpenAIAssistant || (() => {})}
              onQuickAction={handleQuickAction}
            />
          )}

          {/* ================================================================= */}
          {/* VIEW 2: DEPARTMENT MANAGEMENT                                     */}
          {/* ================================================================= */}
          {(currentPage === 'departments' || currentPage === 'department-management') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Officer Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Department Management</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Revenue Department Administration & Jurisdiction Overview
                  </h2>
                  <p className="text-xs text-slate-500">
                    District Headquarters: Kanchipuram Collectorate · 12 Offices · 328 Active Personnel
                  </p>
                </div>
                <button
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Issue Department Circular</span>
                </button>
              </div>

              {/* 12 Offices Directory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Kanchipuram District Collectorate', type: 'District Headquarters', officer: 'Dr. R. Vijayakumar, IAS', staff: 58, status: 'Active' },
                  { name: 'Uthiramerur Taluk Office', type: 'Taluk Office', officer: 'S. Meenakshi (Tahsildar)', staff: 34, status: 'Active' },
                  { name: 'Walajabad Taluk Office', type: 'Taluk Office', officer: 'P. Balakrishnan (Tahsildar)', staff: 32, status: 'Active' },
                  { name: 'Sriperumbudur Taluk Office', type: 'Taluk Office', officer: 'M. Anand (Tahsildar)', staff: 42, status: 'Active' },
                  { name: 'Kundrathur Taluk Office', type: 'Taluk Office', officer: 'K. Geetha (Tahsildar)', staff: 36, status: 'Active' },
                  { name: 'Sub-Collector Office, Chengalpattu Border', type: 'Sub-Divisional Office', officer: 'V. Rajesh, DRO', staff: 24, status: 'Active' }
                ].map((off, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {off.type}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">● {off.status}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{off.name}</h4>
                    <p className="text-xs text-slate-600">Officer In-Charge: <strong>{off.officer}</strong></p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Active Staff: {off.staff}</span>
                      <button 
                        onClick={() => onNavigate('workload')}
                        className="text-purple-700 hover:text-purple-900 font-bold"
                      >
                        Monitor Load →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 3: APPLICATION MONITORING                                    */}
          {/* ================================================================= */}
          {(currentPage === 'applications' || currentPage === 'application-monitoring') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Officer Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Application Monitoring</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    District-Wide Supervisory Application Queue (6,842 Total)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Supervise caseworker throughput, review SLA escalations, and issue final digital approvals
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('reports')}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Queue</span>
                  </button>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {[
                  { id: 'ALL', label: 'All Applications (6,842)' },
                  { id: 'PENDING', label: 'Pending (1,428)' },
                  { id: 'UNDER_REVIEW', label: 'Under Review (2,096)' },
                  { id: 'APPROVED', label: 'Approved (3,064)' },
                  { id: 'REJECTED', label: 'Rejected (254)' },
                  { id: 'DELAYED', label: 'Delayed SLA (186)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Applications Supervisory Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="w-full sm:w-96 relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search Application ID, Citizen, Service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Showing district records</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="py-3 px-4">Application ID</th>
                      <th className="py-3 px-4">Citizen Name</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Taluk Office</th>
                      <th className="py-3 px-4">Assigned To</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Supervisory Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.slice(0, 8).map((app) => (
                      <tr key={app.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-purple-900">{app.appNumber || app.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{app.applicantName}</td>
                        <td className="py-3 px-4 text-slate-700">{app.serviceTitle}</td>
                        <td className="py-3 px-4 text-slate-500">{app.taluk || 'Uthiramerur'}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium">Suvin Brettlee (JA)</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                            app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedAppForReview(app)}
                            className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg cursor-pointer"
                          >
                            Supervise →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 4: EMPLOYEE & WORKLOAD MANAGEMENT                            */}
          {/* ================================================================= */}
          {(currentPage === 'employees' || currentPage === 'employee-management' || currentPage === 'workload' || currentPage === 'workload-monitoring') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Officer Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Employee & Workload Management</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    District Caseworker Workload & Capacity Rebalancing
                  </h2>
                  <p className="text-xs text-slate-500">
                    Monitoring 328 staff across 12 Revenue Offices · Balanced SLA load enforcement
                  </p>
                </div>
              </div>

              {/* Workload Roster */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Suvin Brettlee Roy B.', role: 'Junior Assistant', office: 'Uthiramerur Taluk', assigned: 142, cleared: 24, sla: '96%', load: 'Balanced' },
                  { name: 'K. Ramanathan', role: 'VAO (Ward 4)', office: 'Uthiramerur Taluk', assigned: 89, cleared: 18, sla: '94%', load: 'Normal' },
                  { name: 'M. Selvakumar', role: 'Revenue Inspector', office: 'Walajabad Taluk', assigned: 215, cleared: 15, sla: '89%', load: 'High (Overloaded)' },
                  { name: 'P. Vignesh', role: 'Junior Assistant', office: 'Sriperumbudur Taluk', assigned: 198, cleared: 21, sla: '91%', load: 'High' },
                  { name: 'A. Subha', role: 'Junior Assistant', office: 'Kundrathur Taluk', assigned: 110, cleared: 28, sla: '97%', load: 'Normal' },
                  { name: 'S. Meenakshi', role: 'Tahsildar', office: 'Uthiramerur Taluk', assigned: 45, cleared: 32, sla: '99%', load: 'Normal' }
                ].map((emp, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        emp.load.includes('High') ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {emp.load}
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-700">{emp.sla} SLA</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{emp.name}</h4>
                    <p className="text-xs text-slate-500">{emp.role} · {emp.office}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">{emp.assigned} Active Queue</span>
                      <button
                        onClick={() => {
                          setActionNotice(`Initiated automated workload rebalancing for ${emp.name}.`);
                          setTimeout(() => setActionNotice(null), 3000);
                        }}
                        className="text-purple-700 hover:text-purple-900 font-bold cursor-pointer"
                      >
                        Rebalance →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 5: PREDICTIVE ANALYTICS CENTRE                               */}
          {/* ================================================================= */}
          {(currentPage === 'predictive' || currentPage === 'predictive-analytics') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Officer Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Predictive Analytics</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  AI Demand Forecasting & SLA Delay Risk Engine
                </h2>
                <p className="text-xs text-slate-500">
                  Machine learning projections trained on 2.4M historic Tamil Nadu citizen service applications
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Forecasted Surge (30 Days)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">+18.4% Demand</h3>
                  <p className="text-xs text-slate-600">
                    Anticipated spike in Income and Community certificates ahead of academic admissions cycle.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">SLA Breach Risk Alert</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-black text-amber-600">142 at Risk</h3>
                  <p className="text-xs text-slate-600">
                    Applications at stage 'Document Verification' pending for &gt; 48 hours without caseworker note.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Model Freshness</span>
                    <Sparkles className="w-4 h-4 text-purple-700" />
                  </div>
                  <h3 className="text-2xl font-black text-purple-700">98.4% Accuracy</h3>
                  <p className="text-xs text-slate-600">
                    XGBoost v3.2 model recalibrated on 01 Nov 2026. Zero drift detected.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 6: FRAUD & ANOMALY ALERTS                                    */}
          {/* ================================================================= */}
          {currentPage === 'fraud-alerts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Officer Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Fraud & Anomaly Intelligence</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Active Integrity & Irregularity Investigations
                  </h2>
                  <p className="text-xs text-slate-500">
                    AI Isolation Forest detections for human verification. No automatic adverse action without review.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-purple-900 text-xs">{alert.alertNumber || alert.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          alert.riskScore > 80 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          Risk Score: {alert.riskScore}%
                        </span>
                        <span className="text-xs text-slate-500">Category: {alert.category}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900">{alert.entityType}: {alert.entityId}</h4>
                      <p className="text-xs text-slate-600">Unusual application submission frequency detected across multiple taluks in Kanchipuram.</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAlertAction(alert.id, 'CLEAR')}
                        className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Clear as False Positive
                      </button>
                      <button
                        onClick={() => handleAlertAction(alert.id, 'SHOW_CAUSE')}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Issue Show-Cause</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 7: CITIZEN GRIEVANCES & FEEDBACK                             */}
          {/* ================================================================= */}
          {(currentPage === 'grievances' || currentPage === 'citizen-grievances' || currentPage === 'feedback' || currentPage === 'citizen-feedback') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Officer Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Grievances & Citizen Feedback</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Citizen Feedback Analysis & Escalated Grievance Desk
                </h2>
                <p className="text-xs text-slate-500">
                  268 Total Complaints filed across Kanchipuram Revenue Division · 46 Pending Resolution
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                  <span className="text-2xl font-black text-slate-900">268</span>
                  <span className="text-xs text-slate-500 block mt-1">Total Grievances</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                  <span className="text-2xl font-black text-amber-600">46</span>
                  <span className="text-xs text-slate-500 block mt-1">Pending Resolution</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                  <span className="text-2xl font-black text-rose-600">28</span>
                  <span className="text-xs text-slate-500 block mt-1">Overdue (&gt; SLA)</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                  <span className="text-2xl font-black text-emerald-600">194</span>
                  <span className="text-xs text-slate-500 block mt-1">Resolved (ATR Filed)</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">Escalated Grievances Awaiting District Action</h4>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {complaints.slice(0, 5).map((cmp) => (
                    <div key={cmp.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-purple-900">{cmp.complaintNumber}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {cmp.status}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 mt-1">{cmp.subject}</h5>
                        <p className="text-slate-500 text-[11px]">{cmp.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          setActionNotice(`Statutory Direction issued for grievance ${cmp.complaintNumber}.`);
                          setTimeout(() => setActionNotice(null), 3000);
                        }}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl cursor-pointer"
                      >
                        Issue Order →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 8: DEPARTMENT REPORTS                                        */}
          {/* ================================================================= */}
          {(currentPage === 'reports' || currentPage === 'department-reports') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Officer Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Department Reports</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    District Administrative Reports & Statistical Digests
                  </h2>
                  <p className="text-xs text-slate-500">
                    Signed and certified statistical digests for Tamil Nadu Secretariat reviews
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Monthly District Revenue Clearance Report (PDF)', desc: 'Official certified breakdown of 6,842 applications across 12 Taluk & Sub-Divisional offices.', date: 'Oct 31, 2026' },
                  { title: 'Taluk-wise SLA Pendency & Breach Audit (Excel)', desc: 'Detailed log of all 186 applications delayed past statutory service limits with caseworker notes.', date: 'Daily 06:00 PM' },
                  { title: 'Executive Fraud & Anomaly Audit Summary', desc: 'Summary of 14 anomaly triggers reviewed and disposed under statutory inquiry.', date: 'Bi-Weekly' },
                  { title: 'Citizen Grievance Disposal & ATR Index', desc: '194 resolved petitions with Action Taken Reports (ATR) filed before District Collectorate.', date: 'Monthly' }
                ].map((rep, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-900">{rep.title}</h4>
                    <p className="text-xs text-slate-600">{rep.desc}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">{rep.date}</span>
                      <button
                        onClick={() => {
                          setActionNotice(`Report "${rep.title}" exported successfully.`);
                          setTimeout(() => setActionNotice(null), 3000);
                        }}
                        className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg cursor-pointer"
                      >
                        Download Report →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 9: ANNOUNCEMENTS, NOTIFICATIONS, HELP, PROFILE                */}
          {/* ================================================================= */}
          {currentPage === 'announcements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Official Department Announcements</h2>
                  <p className="text-xs text-slate-500">Broadcast administrative directions to all Taluk Tahsildars</p>
                </div>
                <button
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-bold"
                >
                  Create Circular
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700">G.O. Ms. No. 214 – Revenue & Disaster Management</span>
                <h4 className="font-extrabold text-sm text-slate-900">Implementation of Expedited Patta Sub-Division Timelines</h4>
                <p className="text-xs text-slate-600">All Taluk Tahsildars are directed to prioritize rural land survey applications under Special Scheme.</p>
              </div>
            </div>
          )}

          {currentPage === 'notifications' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Department Alerts & Escalations (12)</h2>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="font-bold text-rose-950">42 applications breached SLA in Uthiramerur Taluk</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-950">Workload surge +38% in Patta subdivision applications</span>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'help' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Officer User Manual & Secretariat Guidelines</h2>
              <p className="text-xs text-slate-600">Standard operating guidelines for District Officers, HODs, and Tahsildars.</p>
              <div className="p-4 rounded-xl bg-purple-50 text-xs text-purple-950 space-y-1">
                <span className="font-bold">Technical Secretariat Support Helpline:</span>
                <p className="font-mono text-purple-700 font-bold">044-2567-0000 · state-officer-helpdesk@tn.gov.in</p>
              </div>
            </div>
          )}

          {currentPage === 'profile' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-400 shrink-0 shadow-md">
                <img src={officerImg} alt="Dr. R. Vijayakumar, IAS" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 flex-1 text-xs">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Dr. R. Vijayakumar, IAS</h3>
                  <p className="text-xs text-purple-700 font-bold">District Officer (Revenue) · Cadre Rank 1</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Office Posting</span>
                    <span className="font-bold text-slate-800">Kanchipuram District Collectorate</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Administrative Jurisdiction</span>
                    <span className="font-bold text-slate-800">Kanchipuram Revenue Division</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Digital Signature Certificate (DSC)</span>
                    <span className="text-emerald-700 font-bold">✓ Active (Hardware USB Token Verified)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. SUPERVISORY REVIEW MODAL                                                */}
      {/* ========================================================================= */}
      {selectedAppForReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Supervisory Review: {selectedAppForReview.appNumber || selectedAppForReview.id}</h3>
              <button onClick={() => setSelectedAppForReview(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div><span className="text-slate-400">Applicant:</span> <strong className="text-slate-900">{selectedAppForReview.applicantName}</strong></div>
              <div><span className="text-slate-400">Service:</span> <strong className="text-slate-900">{selectedAppForReview.serviceTitle}</strong></div>
              <div><span className="text-slate-400">Assigned Caseworker:</span> <strong className="text-slate-900">Suvin Brettlee Roy B. (Junior Assistant)</strong></div>
              <div><span className="text-slate-400">Current Status:</span> <strong className="text-purple-700">{selectedAppForReview.status}</strong></div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Supervisory Direction / Order Note</label>
              <textarea
                rows={3}
                placeholder="Enter executive instruction or clearance direction..."
                value={supervisoryNote}
                onChange={(e) => setSupervisoryNote(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleSupervisoryDecision(selectedAppForReview.id, 'REASSIGNED')}
                className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl border border-amber-200"
              >
                Reassign Officer
              </button>
              <button
                onClick={() => handleSupervisoryDecision(selectedAppForReview.id, 'REJECTED')}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-xl border border-rose-200"
              >
                Reject
              </button>
              <button
                onClick={() => handleSupervisoryDecision(selectedAppForReview.id, 'APPROVED')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs"
              >
                Approve & e-Sign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. PUBLISH CIRCULAR / ANNOUNCEMENT MODAL                                   */}
      {/* ========================================================================= */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-purple-700" />
                <span>Issue Department Circular</span>
              </h3>
              <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handlePublishAnnouncement} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Circular Title / Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Revenue Camp for Patta Transfers"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Administrative Instructions</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter details and statutory timelines..."
                  value={announcementBody}
                  onChange={(e) => setAnnouncementBody(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Broadcast Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
