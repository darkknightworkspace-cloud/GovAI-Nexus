import React, { useState, useEffect } from 'react';
import { 
  User, Award, Briefcase, MapPin, Calendar, ArrowRight, 
  Layers, CheckCircle2, Hourglass, XCircle, Clock, ChevronRight, 
  ChevronDown, ChevronUp, TrendingUp, BarChart2, PieChart, ShieldAlert, 
  Bell, FileText, FileCheck, Car, Home, Users, Store, BookOpen, 
  AlertCircle, Download, Send, Search, Check, RefreshCw, Upload, 
  Eye, Filter, MessageSquare, Shield, CheckSquare, Plus, Trash2, 
  ExternalLink, Printer, KeyRound, LogOut, Phone, Mail, Building2, 
  HelpCircle, AlertTriangle, FileSpreadsheet, Sparkles, ShieldCheck
} from 'lucide-react';
import { EmployeePage, ApplicationRecord } from '../../types';
import { govApi, TaskRecord, ComplaintRecord } from '../../services/api';
import { EmployeeDashboardView } from './EmployeeDashboardView';
import { DocumentVerificationView } from '../../components/DocumentVerificationView';
import karthikAvatarImg from '../../assets/images/karthik_avatar_1793708208375.jpg';

interface EmployeePortalViewProps {
  language: 'en' | 'ta';
  currentPage: EmployeePage;
  onNavigate: (page: EmployeePage) => void;
  onToggleLanguage?: (lang: 'en' | 'ta') => void;
  onAdjustFontSize?: (delta: number) => void;
  fontSize?: number;
  currentUser?: any;
  onLogout?: () => void;
  onOpenAuth?: (portal?: any, mode?: 'login' | 'signup') => void;
  onExitToPublic?: () => void;
  onOpenAIAssistant?: () => void;
}

export const EmployeePortalView: React.FC<EmployeePortalViewProps> = ({
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

  // Navigation state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Data Store
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Application Details Modal State
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'details' | 'documents' | 'workflow' | 'notes' | 'communication'>('details');
  const [newInternalNote, setNewInternalNote] = useState('');
  const [officerNotes, setOfficerNotes] = useState<string[]>([
    'Applicant submitted valid family card copy. VAO physical inspection verified.',
    'Aadhaar name matches revenue register. Pending digital e-sign.'
  ]);

  // Citizen Communication Modal State
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const [commTargetApp, setCommTargetApp] = useState<ApplicationRecord | null>(null);
  const [commChannel, setCommChannel] = useState<'SMS' | 'WHATSAPP' | 'EMAIL' | 'PORTAL'>('SMS');
  const [commTemplate, setCommTemplate] = useState('doc_clarification');
  const [commMessage, setCommMessage] = useState(
    'GovAI TN: Discrepancy detected in your submitted Income Certificate. Please upload the self-declaration signed copy within 3 days.'
  );

  // Task creation state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskRecord['priority']>('HIGH');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Suvin Brettlee Roy B. (Junior Assistant)');

  // Quick Action feedback modal
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apps = await govApi.getApplications();
    const tsks = await govApi.getTasks();
    const cmps = await govApi.getComplaints();
    setApplications(apps);
    setTasks(tsks);
    setComplaints(cmps);
  };

  const handleDecision = async (id: string, newStatus: ApplicationRecord['status']) => {
    await govApi.updateApplicationStatus(id, newStatus);
    setActionSuccessMsg(`Application ${id} status updated to ${newStatus}. Notification dispatched to citizen.`);
    await loadData();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleAddNote = () => {
    if (!newInternalNote.trim()) return;
    setOfficerNotes([newInternalNote, ...officerNotes]);
    setNewInternalNote('');
    setActionSuccessMsg('Internal caseworker note added to application audit trail.');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleSendCommunication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCommModalOpen(false);
    setActionSuccessMsg(`Official communication transmitted via ${commChannel} to citizen.`);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const handleAdvanceTask = async (taskId: string, currentStatus: TaskRecord['status']) => {
    const nextStatusMap: Record<TaskRecord['status'], TaskRecord['status']> = {
      'TODO': 'IN_PROGRESS',
      'IN_PROGRESS': 'REVIEW',
      'REVIEW': 'COMPLETED',
      'COMPLETED': 'COMPLETED'
    };
    const nextStatus = nextStatusMap[currentStatus];
    await govApi.updateTaskStatus(taskId, nextStatus);
    await loadData();
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    await govApi.createTask({
      title: newTaskTitle,
      description: newTaskDesc,
      assignedTo: newTaskAssignee,
      status: 'TODO',
      priority: newTaskPriority,
      dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
    });
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsTaskModalOpen(false);
    await loadData();
    setActionSuccessMsg('Workflow task successfully dispatched to taluk team.');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleQuickAction = (actionKey: string) => {
    if (actionKey === 'verify') {
      onNavigate('doc-verification');
    } else if (actionKey === 'process') {
      onNavigate('process-applications');
    } else if (actionKey === 'request') {
      if (applications.length > 0) {
        setCommTargetApp(applications[0]);
        setIsCommModalOpen(true);
      }
    } else if (actionKey === 'assign') {
      onNavigate('team-workload');
    } else if (actionKey === 'contact') {
      onNavigate('communications');
    } else if (actionKey === 'report') {
      onNavigate('reports');
    }
  };

  // Filter applications
  const filteredApps = applications.filter(a => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (serviceFilter !== 'ALL' && !a.serviceTitle.toLowerCase().includes(serviceFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = a.appNumber.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
      const matchName = a.applicantName.toLowerCase().includes(q);
      const matchService = a.serviceTitle.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchService) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] text-[#0F172A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Dark Navy #0F172A)                                         */}
      {/* ========================================================================= */}
      <header className="bg-[#0F172A] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 z-40">
        {/* Left: TN Seal + Bilingual Title */}
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

        {/* Right: Language, Font Size, Notifications (12), Employee Profile */}
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
                  <h4 className="font-extrabold text-xs text-slate-900">Desk Notifications (12 New)</h4>
                  <span className="text-[10px] text-purple-700 font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">New application assigned</span>
                      <span className="text-[10px] text-slate-400">2 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">APP20261028934 – Income Certificate (Arun Kumar S.)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">SLA due in 2 days</span>
                      <span className="text-[10px] text-slate-400">15 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">APP20261027680 – Patta / Land Service (Ramesh T.)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">Additional document uploaded</span>
                      <span className="text-[10px] text-slate-400">28 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">APP20261028317 – Driving Licence citizen uploaded Aadhaar</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Department circular released</span>
                      <span className="text-[10px] text-slate-400">1 hr ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">G.O. Ms. No. 214 – Revenue & Disaster Management Dept.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Employee Profile: Suvin Brettlee Roy B. - Junior Assistant */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-white/10 py-1 px-2 rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/50 shrink-0 bg-purple-900/40">
                <img src={karthikAvatarImg} alt="Suvin Brettlee Roy B." className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="flex items-center gap-1 font-bold text-xs text-white">
                  <span>Suvin Brettlee Roy B.</span>
                  <span className="text-[10px] text-slate-400">⌵</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Junior Assistant</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-purple-400 shrink-0">
                    <img src={karthikAvatarImg} alt="Suvin Brettlee Roy B." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Suvin Brettlee Roy B.</h5>
                    <p className="text-[10px] text-slate-500">Junior Assistant · EMP2507842</p>
                    <p className="text-[9px] text-purple-700 font-medium">Revenue Dept · Uthiramerur Taluk</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-purple-700" />
                    <span>{isTamil ? 'அலுவலர் விவரங்கள்' : 'Employee ID & Office Profile'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onOpenAuth && onOpenAuth('employee', 'login'); }}
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

        {/* Purple Pill Badge: Employee Portal */}
        <div className="bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs">
          <User className="w-3.5 h-3.5" />
          <span>{isTamil ? 'ஊழியர் போர்டல்' : 'Employee Portal'}</span>
        </div>
      </div>

      {/* Action Success Toast */}
      {actionSuccessMsg && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-white hover:text-emerald-100 font-bold ml-4">✕</button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN BODY CONTAINER: Left Sidebar + Right Content Canvas                */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT NAVIGATION SIDEBAR (#131333, w-64) */}
        <aside className="w-64 bg-[#131333] text-white flex flex-col justify-between shrink-0 min-h-[calc(100vh-100px)] border-r border-slate-800 overflow-y-auto">
          <div className="p-3 space-y-1">
            {/* 1. Dashboard */}
            <button
              onClick={() => onNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'dashboard'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isTamil ? 'முகப்பு பலகை' : 'Dashboard'}</span>
            </button>

            {/* 2. Application Processing */}
            <button
              onClick={() => onNavigate('applications')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                [
                  'applications', 'work-queue', 'pending-applications', 
                  'under-review', 'process-applications', 'approval-rejection'
                ].includes(currentPage)
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>{isTamil ? 'விண்ணப்ப செயலாக்கம்' : 'Application Processing'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 3. Document Verification */}
            <button
              onClick={() => onNavigate('doc-verification')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'doc-verification'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4" />
                <span>{isTamil ? 'ஆவண சரிபார்ப்பு' : 'Document Verification'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 4. Service Requests */}
            <button
              onClick={() => onNavigate('service-requests')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'service-requests'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>{isTamil ? 'சேவை கோரிக்கைகள்' : 'Service Requests'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 5. Citizen Communications */}
            <button
              onClick={() => onNavigate('communications')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'communications'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>{isTamil ? 'குடிமக்கள் தொடர்பு' : 'Citizen Communications'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 6. Tasks & Workflow */}
            <button
              onClick={() => onNavigate('tasks')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'tasks'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4" />
                <span>{isTamil ? 'பணிகள் & செயல்முறை' : 'Tasks & Workflow'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 7. SLA & Performance */}
            <button
              onClick={() => onNavigate('sla-performance')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'sla-performance'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>{isTamil ? 'SLA & செயல்திறன்' : 'SLA & Performance'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 8. Reports & Analytics */}
            <button
              onClick={() => onNavigate('reports')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'reports'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className="w-4 h-4" />
                <span>{isTamil ? 'அறிக்கைகள் & பகுப்பாய்வு' : 'Reports & Analytics'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 9. Scheme & Services */}
            <button
              onClick={() => onNavigate('scheme-services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'scheme-services'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>{isTamil ? 'திட்டங்கள் & சேவைகள்' : 'Scheme & Services'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 10. Team & Workload */}
            <button
              onClick={() => onNavigate('team-workload')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'team-workload'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>{isTamil ? 'குழு & பணிச்சுமை' : 'Team & Workload'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 11. Help & Resources */}
            <button
              onClick={() => onNavigate('help')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === 'help'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4" />
                <span>{isTamil ? 'உதவி & வழிகாட்டி' : 'Help & Resources'}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
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
          {/* VIEW A: DASHBOARD (Exact Match to image_f0511ee1.png)              */}
          {/* ================================================================= */}
          {currentPage === 'dashboard' && (
            <EmployeeDashboardView
              isTamil={isTamil}
              onNavigate={onNavigate}
              onOpenAIAssistant={onOpenAIAssistant || (() => {})}
              onViewApplication={(app) => {
                // Find or construct application record
                const fullApp = applications.find(a => a.appNumber === app.id || a.id === app.id) || {
                  id: app.id,
                  appNumber: app.id,
                  serviceTitle: app.service,
                  applicantName: app.citizen,
                  submissionDate: app.submitted,
                  status: app.status === 'Under Review' ? 'UNDER_REVIEW' : 
                          app.status === 'Doc. Verification' ? 'VERIFIED' :
                          app.status === 'Approved' ? 'APPROVED' :
                          app.status === 'Docs. Required' ? 'DOCUMENTS_PENDING' : 'SUBMITTED',
                  priority: (app.priority || 'MEDIUM').toUpperCase(),
                  documentsCount: 4,
                  district: 'Kanchipuram',
                  taluk: 'Uthiramerur'
                } as any;
                setSelectedApp(fullApp);
              }}
              onQuickAction={handleQuickAction}
            />
          )}

          {/* ================================================================= */}
          {/* VIEW B: APPLICATION PROCESSING (Work Queue, Pending, Review, etc) */}
          {/* ================================================================= */}
          {[
            'applications', 'work-queue', 'pending-applications', 
            'under-review', 'process-applications', 'approval-rejection'
          ].includes(currentPage) && (
            <div className="space-y-6">
              {/* Page Title & Breadcrumb */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>{isTamil ? 'ஊழியர் போர்டல்' : 'Employee Portal'}</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">
                      {currentPage === 'work-queue' ? 'My Work Queue' :
                       currentPage === 'pending-applications' ? 'Pending Applications' :
                       currentPage === 'under-review' ? 'Under Review' :
                       currentPage === 'process-applications' ? 'Process Applications' :
                       currentPage === 'approval-rejection' ? 'Approval & Rejection Desk' : 'Application Management'}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {currentPage === 'work-queue' ? 'My Assigned Work Queue (142 Active)' :
                     currentPage === 'pending-applications' ? 'Pending Citizen Applications' :
                     currentPage === 'under-review' ? 'Applications Under Active Field Review' :
                     currentPage === 'process-applications' ? 'Application Processing & Verification' :
                     currentPage === 'approval-rejection' ? 'Final Approval & Digital Seal Issuance' : 'All Department Applications'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Revenue Department · Uthiramerur Taluk Office · Kanchipuram District
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setStatusFilter('ALL');
                      setServiceFilter('ALL');
                      setSearchQuery('');
                      loadData();
                    }}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('doc-verification')}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{isTamil ? 'ஆவண சரிபார்ப்புக்கு செல்' : 'Batch Verify Documents'}</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {[
                  { id: 'ALL', label: 'All Applications (1,001)' },
                  { id: 'PENDING', label: 'Pending (142)' },
                  { id: 'UNDER_REVIEW', label: 'Under Review (76)' },
                  { id: 'DOC_VERIFICATION', label: 'Doc Verification (328)' },
                  { id: 'APPROVED', label: 'Approved (418)' },
                  { id: 'REJECTED', label: 'Rejected (37)' }
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

              {/* Search & Secondary Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={isTamil ? 'விண்ணப்ப எண், குடிமகன் பெயர் அல்லது சேவையைத் தேடுக...' : 'Search by Application ID, Citizen Name, Aadhaar or Service...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-600 bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  >
                    <option value="ALL">All Services</option>
                    <option value="Income">Income Certificate</option>
                    <option value="Community">Community Certificate</option>
                    <option value="Nativity">Nativity Certificate</option>
                    <option value="Patta">Patta / Land Service</option>
                    <option value="Driving">Driving Licence</option>
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Application ID</th>
                        <th className="py-3 px-4">Citizen Name</th>
                        <th className="py-3 px-4">Service / Scheme</th>
                        <th className="py-3 px-4">Submitted On</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Priority</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            No applications matching your current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-purple-900">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-purple-600" />
                                <span>{app.appNumber || app.id}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              {app.applicantName}
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {app.serviceTitle}
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {app.submissionDate || app.submittedDate}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                                app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                                app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                                app.status === 'DOCUMENTS_PENDING' ? 'bg-amber-100 text-amber-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {app.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                app.priority === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                app.priority === 'LOW' ? 'bg-slate-100 text-slate-600' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {app.priority || 'MEDIUM'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedApp(app)}
                                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <span>Review</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setCommTargetApp(app);
                                    setIsCommModalOpen(true);
                                  }}
                                  className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                                  title="Contact Citizen"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW C: DOCUMENT VERIFICATION (Split Screen OCR Verification)     */}
          {/* ================================================================= */}
          {currentPage === 'doc-verification' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>{isTamil ? 'ஊழியர் போர்டல்' : 'Employee Portal'}</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Document Verification (OCR & AI Authenticator)</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Real-time AI Document OCR Verification Suite
                  </h2>
                  <p className="text-xs text-slate-500">
                    Cross-references scanned documents against State Citizen Registry & DigiLocker trust chain
                  </p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Tamil Nadu Trust Engine: Active</span>
                </div>
              </div>

              {/* Embed DocumentVerificationView component */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
                <DocumentVerificationView language={language} />
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW D: SERVICE REQUESTS (Citizen Service Intake & Dispatch)       */}
          {/* ================================================================= */}
          {currentPage === 'service-requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Employee Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Service Requests</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Citizen e-Sevai & Direct Service Requests
                </h2>
                <p className="text-xs text-slate-500">
                  Track corrections, modifications, and certified copy requests across Uthiramerur Taluk
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Patta Sub-Division Request', count: 34, sla: '7 Days SLA', color: 'border-l-4 border-l-blue-600' },
                  { title: 'Ration Card Member Modification', count: 19, sla: '3 Days SLA', color: 'border-l-4 border-l-emerald-600' },
                  { title: 'Legal Heirship Verification', count: 12, sla: '15 Days SLA', color: 'border-l-4 border-l-purple-600' },
                ].map((s, idx) => (
                  <div key={idx} className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-xs ${s.color}`}>
                    <h4 className="font-extrabold text-sm text-slate-900">{s.title}</h4>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-2xl font-black text-slate-900">{s.count}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{s.sla}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Requests Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">Active Requests Queue (65 Total)</h4>
                  <span className="text-xs text-purple-700 font-bold">Auto-assigned via Smart Dispatch</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Request No</th>
                      <th className="py-3 px-4">Citizen</th>
                      <th className="py-3 px-4">Nature of Request</th>
                      <th className="py-3 px-4">Taluk / Village</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 'SR-2026-901', name: 'M. Selvam', type: 'Patta Name Correction', village: 'Uthiramerur Village 4', status: 'In Field Inspection' },
                      { id: 'SR-2026-902', name: 'K. Priya', type: 'Ration Card Address Shift', village: 'Kattankulathur', status: 'Pending VAO Sign' },
                      { id: 'SR-2026-903', name: 'V. Sundaram', type: 'Extract of Chitta Copy', village: 'Walajabad', status: 'Approved' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-purple-900">{row.id}</td>
                        <td className="py-3 px-4 font-medium">{row.name}</td>
                        <td className="py-3 px-4 text-slate-700">{row.type}</td>
                        <td className="py-3 px-4 text-slate-500">{row.village}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setActionSuccessMsg(`Dispatched inspection order for request ${row.id}`);
                              setTimeout(() => setActionSuccessMsg(null), 3000);
                            }}
                            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg cursor-pointer"
                          >
                            Dispatch →
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
          {/* VIEW E: CITIZEN COMMUNICATIONS (SMS, WhatsApp, Email, Notice)     */}
          {/* ================================================================= */}
          {currentPage === 'communications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Employee Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Citizen Communications</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Official Citizen Communications & Notice Dispatch
                  </h2>
                  <p className="text-xs text-slate-500">
                    Broadcast statutory notices, hearing calls, and missing document intimations with delivery tracking
                  </p>
                </div>
                <button
                  onClick={() => setIsCommModalOpen(true)}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Notice</span>
                </button>
              </div>

              {/* Message Dispatch History */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">Recent Sent Notifications</h4>
                  <span className="text-xs text-slate-500 font-mono">Gateway: NIC SMS & TN WhatsApp</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { recipient: 'Arun Kumar S. (98402XXXXX)', service: 'Income Certificate', channel: 'SMS', text: 'Application APP20261028934 received and assigned to VAO.', time: '10 min ago', status: 'DELIVERED' },
                    { recipient: 'Meena R. (94441XXXXX)', service: 'Community Certificate', channel: 'WhatsApp', text: 'Document verification scheduled for 05 Nov 2026 at Taluk Office.', time: '1 hr ago', status: 'READ' },
                    { recipient: 'Karthik V. (97910XXXXX)', service: 'Driving Licence', channel: 'SMS', text: 'Please upload self-attested proof of residence within 48 hours.', time: '3 hrs ago', status: 'DELIVERED' },
                    { recipient: 'Lakshmi P. (98840XXXXX)', service: 'Smart Family Card', channel: 'Portal Notice', text: 'Smart card dispatched via Speed Post tracking TNSP981023IN.', time: 'Yesterday', status: 'ACKNOWLEDGED' }
                  ].map((msg, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{msg.recipient}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                            {msg.service}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">[{msg.channel}]</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{msg.text}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ {msg.status}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW F: TASKS & WORKFLOW KANBAN                                   */}
          {/* ================================================================= */}
          {currentPage === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Employee Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Tasks & Workflow</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Taluk Office Workflow & Field Tasks
                  </h2>
                  <p className="text-xs text-slate-500">
                    Interactive Kanban board for inspections, field inquiries, and inter-departmental clearances
                  </p>
                </div>
                <button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Task</span>
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { status: 'TODO' as TaskRecord['status'], title: 'To Do (Assigned)', color: 'border-t-4 border-t-slate-400' },
                  { status: 'IN_PROGRESS' as TaskRecord['status'], title: 'In Progress (Field)', color: 'border-t-4 border-t-blue-500' },
                  { status: 'REVIEW' as TaskRecord['status'], title: 'Review by RI', color: 'border-t-4 border-t-amber-500' },
                  { status: 'COMPLETED' as TaskRecord['status'], title: 'Completed', color: 'border-t-4 border-t-emerald-500' }
                ].map(col => {
                  const colTasks = tasks.filter(t => t.status === col.status);
                  return (
                    <div key={col.status} className={`bg-slate-100/70 rounded-2xl p-3 border border-slate-200 ${col.color} space-y-3`}>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-extrabold text-xs text-slate-800">{col.title}</span>
                        <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-2xs">
                          {colTasks.length}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {colTasks.map(t => (
                          <div key={t.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:shadow-sm transition-all">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase ${
                                t.priority === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                                t.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {t.priority}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{t.dueDate}</span>
                            </div>
                            <h5 className="font-bold text-xs text-slate-900 leading-snug">{t.title}</h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="text-slate-600 font-medium truncate max-w-[120px]">👤 {t.assignedTo}</span>
                              {col.status !== 'COMPLETED' && (
                                <button
                                  onClick={() => handleAdvanceTask(t.id, t.status)}
                                  className="text-purple-700 hover:text-purple-900 font-bold cursor-pointer"
                                >
                                  Advance →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW G: SLA & PERFORMANCE                                         */}
          {/* ================================================================= */}
          {currentPage === 'sla-performance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Employee Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">SLA & Performance Benchmarks</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Uthiramerur Taluk Service Level Agreement (SLA) Tracker
                </h2>
                <p className="text-xs text-slate-500">
                  Compliance rate, average delivery turnaround, and statutory deadline metrics
                </p>
              </div>

              {/* 4 SLA KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500">Taluk SLA Compliance</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-emerald-600">92%</span>
                    <span className="text-xs font-bold text-emerald-700">▲ +4% this month</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500">Avg. Processing Time</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-purple-700">2.6 Days</span>
                    <span className="text-xs font-bold text-emerald-700">▼ -18% faster</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">Statutory limit: 15.0 days</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500">Within Due Date</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-blue-600">418 / 455</span>
                    <span className="text-xs font-bold text-blue-700">91.8%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">Zero critical escalations</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500">Overdue Risk Warning</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-rose-600">4 Items</span>
                    <span className="text-xs font-bold text-rose-700">Action in 24h</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">Auto-notified to Tahsildar</p>
                </div>
              </div>

              {/* Service SLA breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900">Service-wise SLA Benchmarks</h4>
                <div className="space-y-3 text-xs">
                  {[
                    { service: 'Income Certificate', statutory: '7 Days', actual: '1.8 Days', score: 98 },
                    { service: 'Community Certificate', statutory: '15 Days', actual: '3.1 Days', score: 94 },
                    { service: 'Nativity Certificate', statutory: '7 Days', actual: '1.5 Days', score: 99 },
                    { service: 'Patta / Land Service', statutory: '30 Days', actual: '9.4 Days', score: 86 },
                    { service: 'Smart Family Card', statutory: '15 Days', actual: '4.2 Days', score: 91 }
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-1/3">
                        <span className="font-bold text-slate-900">{row.service}</span>
                        <div className="text-[10px] text-slate-400">Statutory: {row.statutory}</div>
                      </div>
                      <div className="w-1/3 text-center">
                        <span className="font-extrabold text-purple-700">{row.actual}</span>
                        <div className="text-[10px] text-slate-500">Actual Turnaround</div>
                      </div>
                      <div className="w-1/3 text-right">
                        <span className="font-black text-emerald-600">{row.score}%</span>
                        <div className="text-[10px] text-slate-500">SLA Compliance</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW H: REPORTS & ANALYTICS                                       */}
          {/* ================================================================= */}
          {currentPage === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Employee Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Reports & Department Analytics</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Official Revenue Clearance & Pendency Reports
                  </h2>
                  <p className="text-xs text-slate-500">
                    Export verified statistical records for District Collectorate & Secretariat reviews
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActionSuccessMsg('Monthly Clearance Report PDF generated and downloaded.');
                    setTimeout(() => setActionSuccessMsg(null), 3000);
                  }}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report (PDF)</span>
                </button>
              </div>

              {/* 4 Report Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Daily Disposal & Clearance Report', desc: 'Summary of all applications approved, rejected, or forwarded in the last 24 hours.', date: 'Generated today at 06:00 PM', count: '48 cleared today' },
                  { title: 'Taluk Pendency & Aging Analysis', desc: 'Categorized by aging: 0-3 days, 4-7 days, and >15 days statutory breach alerts.', date: 'Updated 10 min ago', count: '142 in queue' },
                  { title: 'Rejection & Defect Report', desc: 'Breakdown of primary rejection grounds: invalid revenue document, non-resident, income cap exceeded.', date: 'Monthly cohort', count: '37 rejected' },
                  { title: 'Caseworker Productivity Matrix', desc: 'Application processing volume and audit ratings across all Junior Assistants & VAOs.', date: 'Weekly summary', count: '94.2% quality score' }
                ].map((rep, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-slate-900">{rep.title}</h4>
                        <FileSpreadsheet className="w-4 h-4 text-purple-700" />
                      </div>
                      <p className="text-xs text-slate-600 mt-2">{rep.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rep.count}</span>
                      <button
                        onClick={() => {
                          setActionSuccessMsg(`Exporting "${rep.title}" to CSV...`);
                          setTimeout(() => setActionSuccessMsg(null), 3000);
                        }}
                        className="text-purple-700 hover:text-purple-900 font-bold cursor-pointer"
                      >
                        Export CSV →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW I: SCHEME & SERVICES DIRECTORY (Employee Reference)           */}
          {/* ================================================================= */}
          {currentPage === 'scheme-services' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Employee Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Scheme & Service Guidelines</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Revenue & Citizen Service Verification Directory
                </h2>
                <p className="text-xs text-slate-500">
                  Official verification criteria, required documentary evidence, and Government Orders
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Income Certificate',
                    dept: 'Revenue Department',
                    statutoryDays: '7 Days',
                    fee: '₹60',
                    docs: ['Salary Slip / Form 16', 'Bank Statement (6 Months)', 'Aadhaar Card', 'Ration Card']
                  },
                  {
                    name: 'Community Certificate',
                    dept: 'Revenue Department',
                    statutoryDays: '15 Days',
                    fee: '₹60',
                    docs: ['School Transfer Certificate (TC)', "Father's Community Certificate", 'Aadhaar Card', 'Family Tree']
                  },
                  {
                    name: 'Nativity Certificate',
                    dept: 'Revenue Department',
                    statutoryDays: '7 Days',
                    fee: '₹60',
                    docs: ['Birth Certificate', 'Continuous 5-Yr Residence Proof', 'Ration Card', 'Voter ID']
                  },
                  {
                    name: 'Legal Heir Certificate',
                    dept: 'Revenue Department',
                    statutoryDays: '15 Days',
                    fee: '₹60',
                    docs: ['Death Certificate of Deceased', 'Legal Heir Affidavits', 'Aadhaar of all Legal Heirs', 'VAO Inquest Report']
                  },
                  {
                    name: 'First Generation Graduate',
                    dept: 'Higher Education / Revenue',
                    statutoryDays: '10 Days',
                    fee: '₹60',
                    docs: ['TC of Siblings & Parents', 'Self-Declaration Affidavit', 'Aadhaar Card', 'College Admission Proof']
                  },
                  {
                    name: 'Kalaignar Magalir Urimai Thogai',
                    dept: 'Social Welfare & Women Rights',
                    statutoryDays: 'Instant / e-KYC',
                    fee: 'Free',
                    docs: ['Family Card (PHH / NPHH)', 'Aadhaar Card', 'Bank Passbook (Aadhaar Seeded)', 'Electricity Consumer No']
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {s.dept}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Fee: {s.fee}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{s.name}</h4>
                    <p className="text-[11px] text-slate-500">Statutory Disposal Time: <strong>{s.statutoryDays}</strong></p>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-700 block mb-1">Mandatory Documents:</span>
                      <ul className="text-[11px] text-slate-600 space-y-0.5">
                        {s.docs.map((d, di) => (
                          <li key={di} className="flex items-center gap-1.5">
                            <span className="text-emerald-600 text-xs">✓</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW J: TEAM & WORKLOAD                                           */}
          {/* ================================================================= */}
          {currentPage === 'team-workload' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Employee Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">Team & Workload Allocation</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Uthiramerur Taluk Roster & Caseworker Load
                  </h2>
                  <p className="text-xs text-slate-500">
                    Balance application intake across Revenue Inspectors, Village Administrative Officers, and Clerks
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  Total Active Staff: 8 Personnel
                </div>
              </div>

              {/* Caseworker Roster Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Suvin Brettlee Roy B.',
                    role: 'Junior Assistant (Caseworker)',
                    empId: 'EMP2507842',
                    assigned: 142,
                    completedToday: 24,
                    slaRate: '96%',
                    status: 'Active Duty'
                  },
                  {
                    name: 'K. Ramanathan',
                    role: 'Village Administrative Officer (VAO)',
                    empId: 'EMP2501049',
                    assigned: 89,
                    completedToday: 18,
                    slaRate: '94%',
                    status: 'Field Inspection'
                  },
                  {
                    name: 'M. Selvakumar',
                    role: 'Revenue Inspector (RI)',
                    empId: 'EMP2498112',
                    assigned: 110,
                    completedToday: 15,
                    slaRate: '91%',
                    status: 'Active Duty'
                  },
                  {
                    name: 'S. Meenakshi',
                    role: 'Tahsildar (Digital Sign Authority)',
                    empId: 'EMP2309118',
                    assigned: 45,
                    completedToday: 32,
                    slaRate: '99%',
                    status: 'Court Duty'
                  }
                ].map((staff, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{staff.name}</h4>
                        <p className="text-xs text-slate-500">{staff.role} · <span className="font-mono">{staff.empId}</span></p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        ● {staff.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <span className="text-base font-black text-slate-900">{staff.assigned}</span>
                        <div className="text-[10px] text-slate-500">Active Assigned</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <span className="text-base font-black text-emerald-600">{staff.completedToday}</span>
                        <div className="text-[10px] text-slate-500">Cleared Today</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <span className="text-base font-black text-purple-700">{staff.slaRate}</span>
                        <div className="text-[10px] text-slate-500">SLA Rating</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button
                        onClick={() => {
                          setActionSuccessMsg(`Batch load reassigned to ${staff.name}.`);
                          setTimeout(() => setActionSuccessMsg(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-purple-200 text-purple-700 font-bold hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        Rebalance Queue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW K: HELP & RESOURCES                                          */}
          {/* ================================================================= */}
          {currentPage === 'help' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Employee Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Help & Resources</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Government Employee Desk Manual & Resources
                </h2>
                <p className="text-xs text-slate-500">
                  Operational guidelines, Government Orders (G.O.s), circulars, and technical support
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-700" />
                    <span>Desk Standard Operating Procedures (SOPs)</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {[
                      'Revenue Standing Orders (RSO) 2024 Edition',
                      'Citizen Charter – Statutory Timelines & Grievance Protocol',
                      'Digital Signature Certificate (DSC) USB Token Setup Guide',
                      'e-District 2.0 User Manual for Revenue Caseworkers',
                      'Guidelines on Rejection of False / Incomplete Applications'
                    ].map((item, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 flex items-center justify-between cursor-pointer border border-slate-100 transition-colors">
                        <span className="text-slate-800 font-medium">{item}</span>
                        <Download className="w-3.5 h-3.5 text-purple-700" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-700" />
                    <span>e-Governance IT Helpdesk & Support</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">State e-District Technical Support:</span>
                      <span className="font-mono font-bold text-purple-700">044-2567-0000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">Secretariat IT Control Room:</span>
                      <span className="font-mono font-bold text-purple-700">1800-425-1333</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">Support Email:</span>
                      <span className="font-mono text-purple-700">edistrict-support@tn.gov.in</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Security Advisory</span>
                    </span>
                    <p className="text-amber-800 text-[11px]">
                      Never share your e-Pramaan credentials or OTP. All caseworker approvals are permanently audited with IP and DSC timestamp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW L: PROFILE & CREDENTIALS                                     */}
          {/* ================================================================= */}
          {currentPage === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>Employee Portal</span>
                  <span>›</span>
                  <span className="text-purple-700 font-bold">Employee Profile</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Government Employee Credentials & Posting Details
                </h2>
                <p className="text-xs text-slate-500">
                  Authorized digital identity registered with Tamil Nadu e-Governance Agency (TNeGA)
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-400 shrink-0 shadow-md">
                  <img src={karthikAvatarImg} alt="Suvin Brettlee Roy B." className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Suvin Brettlee Roy B.</h3>
                    <p className="text-xs text-purple-700 font-bold">Junior Assistant · Revenue Department</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Employee ID</span>
                      <span className="font-mono font-bold text-slate-800">EMP2507842</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Posting Office</span>
                      <span className="font-bold text-slate-800">Uthiramerur Taluk Office</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Revenue District</span>
                      <span className="font-bold text-slate-800">Kanchipuram</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Digital Signature Certificate (DSC)</span>
                      <span className="text-emerald-700 font-bold">✓ Valid till 31-Dec-2027</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. APPLICATION DETAILS MODAL                                               */}
      {/* ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-purple-300 font-bold text-xs">{selectedApp.appNumber || selectedApp.id}</span>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {selectedApp.status}
                  </span>
                </div>
                <h3 className="text-base font-extrabold">{selectedApp.serviceTitle}</h3>
                <p className="text-xs text-slate-300">
                  Applicant: <strong>{selectedApp.applicantName}</strong> · District: {selectedApp.district || 'Kanchipuram'}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 px-5 pt-3 bg-slate-50 text-xs font-bold">
              {[
                { id: 'details', label: 'Applicant Details' },
                { id: 'documents', label: 'Verified Documents' },
                { id: 'workflow', label: 'Timeline & SLA' },
                { id: 'notes', label: 'Internal Notes' },
                { id: 'communication', label: 'Citizen Notices' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setModalActiveTab(tab.id as any)}
                  className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
                    modalActiveTab === tab.id
                      ? 'border-[#7C3AED] text-[#7C3AED]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 text-xs space-y-4 max-h-[60vh] overflow-y-auto">
              {modalActiveTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Applicant Name</span>
                      <span className="font-bold text-slate-800">{selectedApp.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Father / Spouse Name</span>
                      <span className="font-bold text-slate-800">R. Murugan</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Community / Category</span>
                      <span className="font-bold text-purple-700">BC (Backward Class)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Declared Annual Income</span>
                      <span className="font-bold text-slate-800">₹ 1,20,000 / year</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Aadhaar (Masked)</span>
                      <span className="font-mono text-slate-800">XXXX-XXXX-8912</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Smart Family Card</span>
                      <span className="font-mono text-slate-800">04/G/0291823</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-900 space-y-1">
                    <span className="font-bold block">AI Eligibility Pre-Check:</span>
                    <p className="text-[11px] text-purple-800">
                      Cross-matching against Tahsildar revenue database indicates no conflicting community/income claim. DigiLocker authenticated Aadhaar and Smart Card match 100%.
                    </p>
                  </div>
                </div>
              )}

              {modalActiveTab === 'documents' && (
                <div className="space-y-3">
                  {[
                    { name: 'Income Proof / Salary Certificate', status: 'VERIFIED', ocr: 'Match 99.8%' },
                    { name: 'Ration / Smart Family Card Copy', status: 'VERIFIED', ocr: 'Match 100%' },
                    { name: 'School Transfer Certificate (TC)', status: 'VERIFIED', ocr: 'Match 98.4%' },
                    { name: 'Aadhaar Card (e-KYC)', status: 'VERIFIED', ocr: 'Match 100%' }
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{doc.name}</span>
                        <span className="text-[10px] text-emerald-700 font-bold">OCR Confidence: {doc.ocr}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                        ✓ {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {modalActiveTab === 'workflow' && (
                <div className="space-y-3">
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    <div className="relative">
                      <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <span className="font-bold text-slate-900 block">Application Submitted by Citizen</span>
                      <span className="text-[10px] text-slate-400">28 Oct 2026, 10:15 AM via e-Sevai Portal</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <span className="font-bold text-slate-900 block">AI OCR & Document Verification</span>
                      <span className="text-[10px] text-slate-400">28 Oct 2026, 10:16 AM · Instant Pass</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-white"></div>
                      <span className="font-bold text-purple-900 block">Assigned to Junior Assistant (Suvin Brettlee Roy B.)</span>
                      <span className="text-[10px] text-purple-600 font-bold">Current Step (In Progress)</span>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                      <span className="font-bold text-slate-600 block">VAO Field Verification & Tahsildar e-Sign</span>
                      <span className="text-[10px] text-slate-400">Pending final caseworker submission</span>
                    </div>
                  </div>
                </div>
              )}

              {modalActiveTab === 'notes' && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {officerNotes.map((n, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-purple-700">Suvin Brettlee Roy B. (Junior Assistant)</span>
                          <span>Audit Trail Entry</span>
                        </div>
                        <p className="text-[11px]">{n}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add confidential caseworker note..."
                      value={newInternalNote}
                      onChange={(e) => setNewInternalNote(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50"
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-[#7C3AED] text-white rounded-xl font-bold hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      Post Note
                    </button>
                  </div>
                </div>
              )}

              {modalActiveTab === 'communication' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>SMS Notice #TN-2026-9182</span>
                      <span>28 Oct 2026, 10:16 AM</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-900">
                      "Dear Citizen, Your application APP20261028934 for Income Certificate has been accepted. Verification in progress."
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCommTargetApp(selectedApp);
                      setIsCommModalOpen(true);
                    }}
                    className="w-full py-2.5 border-2 border-dashed border-purple-300 hover:border-purple-600 rounded-xl text-purple-700 font-bold hover:bg-purple-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send New SMS / Notice to Applicant</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecision(selectedApp.id, 'DOCUMENTS_PENDING')}
                  className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Request Documents
                </button>
                <button
                  onClick={() => handleDecision(selectedApp.id, 'REJECTED')}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Reject Application
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDecision(selectedApp.id, 'APPROVED')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Issue Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CITIZEN COMMUNICATION MODAL                                             */}
      {/* ========================================================================= */}
      {isCommModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-purple-700" />
                <span>Send Official Citizen Notice</span>
              </h3>
              <button onClick={() => setIsCommModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSendCommunication} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Recipient</label>
                <input
                  type="text"
                  disabled
                  value={commTargetApp ? `${commTargetApp.applicantName} (${commTargetApp.appNumber || commTargetApp.id})` : 'All Applicants in Taluk'}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Dispatch Channel</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['SMS', 'WHATSAPP', 'EMAIL', 'PORTAL'] as const).map(ch => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setCommChannel(ch)}
                      className={`py-1.5 rounded-xl font-bold transition-all ${
                        commChannel === ch
                          ? 'bg-[#7C3AED] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notice Template</label>
                <select
                  value={commTemplate}
                  onChange={(e) => {
                    setCommTemplate(e.target.value);
                    if (e.target.value === 'doc_clarification') {
                      setCommMessage('GovAI TN: Discrepancy detected in your submitted Income Certificate. Please upload the self-declaration signed copy within 3 days.');
                    } else if (e.target.value === 'field_inspection') {
                      setCommMessage('GovAI TN: VAO field inspection scheduled for your Patta application tomorrow between 10:00 AM and 01:00 PM.');
                    } else if (e.target.value === 'approved_ready') {
                      setCommMessage('GovAI TN: Your certificate is digitally approved and signed. Download from Citizen Portal using your application ID.');
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                >
                  <option value="doc_clarification">Document Clarification / Deficiency</option>
                  <option value="field_inspection">Field Inspection Call Letter</option>
                  <option value="approved_ready">Approval & Digital Download Notice</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message Text</label>
                <textarea
                  rows={3}
                  value={commMessage}
                  onChange={(e) => setCommMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCommModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Dispatch Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CREATE WORKFLOW TASK MODAL                                              */}
      {/* ========================================================================= */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-700" />
                <span>Create Taluk Workflow Task</span>
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conduct field survey for Survey No. 104/2B"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assign To Officer</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                >
                  <option value="Suvin Brettlee Roy B. (Junior Assistant)">Suvin Brettlee Roy B. (Junior Assistant)</option>
                  <option value="K. Ramanathan (VAO)">K. Ramanathan (VAO - Ward 4)</option>
                  <option value="M. Selvakumar (Revenue Inspector)">M. Selvakumar (Revenue Inspector)</option>
                  <option value="S. Meenakshi (Tahsildar)">S. Meenakshi (Tahsildar)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description / Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Detail instructions for field inspection or clearance..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
