import React, { useState, useEffect } from 'react';
import { 
  Crown, Users, UserCheck, Building2, Layers, Award, 
  FileText, Cpu, Server, Database, Shield, ShieldCheck, 
  Clock, TrendingUp, BarChart2, PieChart, AlertTriangle, 
  Bell, CheckCircle2, XCircle, ArrowRight, ExternalLink, 
  Sparkles, Plus, Settings, Megaphone, FileSpreadsheet, 
  RotateCcw, Filter, Activity, HardDrive, Network, Globe, 
  ChevronRight, ChevronDown, KeyRound, LogOut, Search, 
  HelpCircle, User, Check, X, Lock, Key, RefreshCw, Download
} from 'lucide-react';
import { AdminPage } from '../../types';
import { govApi, ComplaintRecord } from '../../services/api';
import { AdminDashboardView } from './AdminDashboardView';
import karthikAvatarImg from '../../assets/images/karthik_avatar_1793708208375.jpg';

interface AdminPortalViewProps {
  language: 'en' | 'ta';
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onToggleLanguage?: (lang: 'en' | 'ta') => void;
  onAdjustFontSize?: (delta: number) => void;
  fontSize?: number;
  currentUser?: any;
  onLogout?: () => void;
  onOpenAuth?: (portal?: any, mode?: 'login' | 'signup') => void;
  onExitToPublic?: () => void;
  onOpenAIAssistant?: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
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
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Quick Action Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('EMPLOYEE');
  const [newUserDept, setNewUserDept] = useState('Revenue Department');

  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptHOD, setNewDeptHOD] = useState('');

  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementScope, setAnnouncementScope] = useState('ALL_PORTALS');

  // Interactive RBAC Permissions Matrix State
  const [permissionsMatrix, setPermissionsMatrix] = useState([
    { key: 'service:apply', desc: 'Submit citizen application', citizen: true, employee: false, officer: false, admin: true },
    { key: 'document:ocr_verify', desc: 'Run PaddleOCR IDP verification', citizen: false, employee: true, officer: true, admin: true },
    { key: 'application:statutory_approve', desc: 'Final digital signature on certificates', citizen: false, employee: false, officer: true, admin: true },
    { key: 'grievance:resolve', desc: 'Close CM Helpline tickets with ATR', citizen: false, employee: true, officer: true, admin: true },
    { key: 'fraud:issue_show_cause', desc: 'Freeze DBT and issue formal notice', citizen: false, employee: false, officer: true, admin: true },
    { key: 'ai_model:retrain_deploy', desc: 'Deploy new models into model registry', citizen: false, employee: false, officer: false, admin: true },
    { key: 'audit:read_immutable_logs', desc: 'Access cryptographically hashed audit trails', citizen: false, employee: false, officer: false, admin: true },
    { key: 'system:dpdp_consent_audit', desc: 'Manage statutory DPDP 2023 registers', citizen: false, employee: false, officer: false, admin: true },
  ]);

  // System Configuration State
  const [sysConfig, setSysConfig] = useState({
    sessionTimeoutMinutes: 30,
    redisCacheTTLSeconds: 3600,
    dpdpEncryptionMode: 'AES-256-GCM',
    bilingualDefaultLanguage: 'en',
    ocrConfidenceThreshold: 0.90
  });

  // User Directory State
  const [usersList, setUsersList] = useState([
    { id: 'USR-2026-001', name: 'Suvin Brettlee Roy B.', email: 'suvin.admin@tn.gov.in', role: 'SUPER_ADMIN', department: 'TNeGA / Secretariat', status: 'Active' },
    { id: 'USR-2026-002', name: 'Dr. R. Vijayakumar, IAS', email: 'vijayakumar.ias@tn.gov.in', role: 'OFFICER', department: 'Revenue Administration', status: 'Active' },
    { id: 'USR-2026-003', name: 'K. Ramanathan', email: 'ramanathan.vao@tn.gov.in', role: 'EMPLOYEE', department: 'Revenue Administration (VAO)', status: 'Active' },
    { id: 'USR-2026-004', name: 'M. Selvakumar', email: 'selvakumar.ri@tn.gov.in', role: 'EMPLOYEE', department: 'Revenue Administration (RI)', status: 'Active' },
    { id: 'USR-2026-005', name: 'Karthik R', email: 'karthik.citizen@gmail.com', role: 'CITIZEN', department: 'Citizen Registry', status: 'Active' },
    { id: 'USR-2026-006', name: 'S. Meenakshi', email: 'meenakshi.tahsildar@tn.gov.in', role: 'OFFICER', department: 'Uthiramerur Taluk', status: 'Active' },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    setActionNotice('User account status updated and sessions synchronized.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const togglePermission = (index: number, role: 'citizen' | 'employee' | 'officer' | 'admin') => {
    const updated = [...permissionsMatrix];
    updated[index][role] = !updated[index][role];
    setPermissionsMatrix(updated);
    setActionNotice(`RBAC permission "${updated[index].key}" updated for role "${role}".`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newEntry = {
      id: `USR-2026-00${usersList.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      department: newUserDept,
      status: 'Active'
    };
    setUsersList([newEntry, ...usersList]);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setActionNotice(`User account ${newEntry.id} provisioned with encrypted credentials.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleCreateDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptCode) return;
    setIsAddDeptModalOpen(false);
    setActionNotice(`Department "${newDeptName}" (${newDeptCode}) registered in state organizational master.`);
    setNewDeptName('');
    setNewDeptCode('');
    setNewDeptHOD('');
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle) return;
    setIsAnnouncementModalOpen(false);
    setActionNotice(`Platform broadcast published across ${announcementScope}.`);
    setAnnouncementTitle('');
    setTimeout(() => setActionNotice(null), 3500);
  };

  // 13 Navigation sidebar items matching image_8bf86a94.png
  const navItems = [
    { id: 'dashboard' as AdminPage, label: 'Dashboard', labelTa: 'முகப்பு பலகை', icon: <Layers className="w-4 h-4" />, hasSub: false },
    { id: 'users' as AdminPage, label: 'User Management', labelTa: 'பயனர் மேலாண்மை', icon: <Users className="w-4 h-4" />, hasSub: true },
    { id: 'departments' as AdminPage, label: 'Department Management', labelTa: 'துறை மேலாண்மை', icon: <Building2 className="w-4 h-4" />, hasSub: true },
    { id: 'roles-matrix' as AdminPage, label: 'Roles & Permissions', labelTa: 'பணிகள் & அனுமதிகள்', icon: <ShieldCheck className="w-4 h-4" />, hasSub: false },
    { id: 'services-manage' as AdminPage, label: 'Service Management', labelTa: 'சேவை மேலாண்மை', icon: <Layers className="w-4 h-4" />, hasSub: false },
    { id: 'schemes-manage' as AdminPage, label: 'Scheme Management', labelTa: 'திட்ட மேலாண்மை', icon: <Award className="w-4 h-4" />, hasSub: false },
    { id: 'ai-models' as AdminPage, label: 'AI Model Management', labelTa: 'AI மாதிரி மேலாண்மை', icon: <Cpu className="w-4 h-4" />, hasSub: false },
    { id: 'system-config' as AdminPage, label: 'System Configuration', labelTa: 'கணினி கட்டமைப்பு', icon: <Settings className="w-4 h-4" />, hasSub: false },
    { id: 'integrations' as AdminPage, label: 'Integrations', labelTa: 'இணைப்புகள்', icon: <Globe className="w-4 h-4" />, hasSub: false },
    { id: 'security-audit' as AdminPage, label: 'Security & Audit Logs', labelTa: 'பாதுகாப்பு & தணிக்கை', icon: <Shield className="w-4 h-4" />, hasSub: false },
    { id: 'announcements' as AdminPage, label: 'Notifications & Announcements', labelTa: 'அறிவிப்புகள்', icon: <Bell className="w-4 h-4" />, hasSub: false },
    { id: 'reports' as AdminPage, label: 'Reports & Analytics', labelTa: 'அறிக்கைகள் & பகுப்பாய்வு', icon: <BarChart2 className="w-4 h-4" />, hasSub: false },
    { id: 'help' as AdminPage, label: 'Help & Support', labelTa: 'உதவி & ஆதரவு', icon: <HelpCircle className="w-4 h-4" />, hasSub: false },
  ];

  const handleQuickAction = (actionKey: string) => {
    if (actionKey === 'users') setIsAddUserModalOpen(true);
    else if (actionKey === 'departments') setIsAddDeptModalOpen(true);
    else if (actionKey === 'services-manage') onNavigate('services-manage');
    else if (actionKey === 'schemes-manage') onNavigate('schemes-manage');
    else if (actionKey === 'ai-models') onNavigate('ai-models');
    else if (actionKey === 'system-config') onNavigate('system-config');
    else if (actionKey === 'reports') onNavigate('reports');
    else if (actionKey === 'announcements') setIsAnnouncementModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] text-[#0F172A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Dark Navy #0F172A)                                         */}
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

        {/* Right: Language, Font Size, Notifications (12), Super Admin Profile */}
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
                  <h4 className="font-extrabold text-xs text-slate-900">Platform Alerts (12 New)</h4>
                  <span className="text-[10px] text-purple-700 font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">AI inference failure (NLP v1.3)</span>
                      <span className="text-[10px] text-slate-400">5 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Model fallback routed to Gemini 2.5 Flash.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">Storage threshold warning</span>
                      <span className="text-[10px] text-slate-400">32 min ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Document vault reached 88% capacity (1.76 TB / 2.0 TB).</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">12 failed admin login attempts</span>
                      <span className="text-[10px] text-slate-400">1 hr ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">IP 103.21.244.11 auto-blocked by Cloud Armor.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Super Admin Profile: Suvin Brettlee Roy B. */}
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
                <span className="text-[10px] text-slate-400 block">Super Administrator</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-purple-400 shrink-0">
                    <img src={karthikAvatarImg} alt="Suvin Brettlee Roy B." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Suvin Brettlee Roy B.</h5>
                    <p className="text-[10px] text-purple-700 font-bold">Root Super Administrator</p>
                    <p className="text-[9px] text-slate-500 font-mono">IAM Level 5 · State Data Centre</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>{isTamil ? 'நிர்வாக சுயவிவரம்' : 'Super Admin Credentials & MFA'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onOpenAuth && onOpenAuth('admin', 'login'); }}
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

        {/* Purple Pill Badge: Super Admin Portal matching image_8bf86a94.png */}
        <div className="bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs">
          <Shield className="w-3.5 h-3.5" />
          <span>{isTamil ? 'தலைமை நிர்வாக போர்டல்' : 'Super Admin Portal'}</span>
        </div>
      </div>

      {/* Action Notification Toast */}
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
                (item.id === 'users' && currentPage === 'user-management') ||
                (item.id === 'departments' && currentPage === 'department-management') ||
                (item.id === 'roles-matrix' && currentPage === 'roles-permissions') ||
                (item.id === 'services-manage' && currentPage === 'service-management') ||
                (item.id === 'schemes-manage' && currentPage === 'scheme-management') ||
                (item.id === 'ai-models' && currentPage === 'ai-model-management') ||
                (item.id === 'system-config' && currentPage === 'system-configuration') ||
                (item.id === 'security-audit' && currentPage === 'audit-logs') ||
                (item.id === 'announcements' && currentPage === 'notifications-announcements') ||
                (item.id === 'reports' && currentPage === 'reports-analytics') ||
                (item.id === 'help' && currentPage === 'help-support');

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
                  {item.id !== 'dashboard' && item.id !== 'help' && (
                    <span className="text-slate-400 text-xs">
                      {item.hasSub ? '⌵' : '›'}
                    </span>
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
          {/* VIEW 1: SUPER ADMIN DASHBOARD (1-to-1 match to image_8bf86a94.png)*/}
          {/* ================================================================= */}
          {currentPage === 'dashboard' && (
            <AdminDashboardView
              isTamil={isTamil}
              onNavigate={onNavigate}
              onOpenAIAssistant={onOpenAIAssistant || (() => {})}
              onQuickAction={handleQuickAction}
            />
          )}

          {/* ================================================================= */}
          {/* VIEW 2: USER MANAGEMENT (2,86,409 Users)                          */}
          {/* ================================================================= */}
          {(currentPage === 'users' || currentPage === 'user-management') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Super Admin Portal</span>
                    <span>›</span>
                    <span className="text-purple-700 font-bold">User Management</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Statewide User Account Directory (2,86,409 Registered)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Citizens (2,27,343) · Employees (36,334) · Officers (14,613) · Administrators (3,729)
                  </p>
                </div>

                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Provision New User</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="py-3 px-4">User ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Department / Scope</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-purple-900">{user.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{user.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{user.department}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            ● {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                              user.status === 'Active'
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
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
          {/* VIEW 3: ROLES & PERMISSIONS MATRIX                                */}
          {/* ================================================================= */}
          {(currentPage === 'roles-matrix' || currentPage === 'roles-permissions') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">RBAC Access Control Matrix</h2>
                  <p className="text-xs text-slate-500">Fine-grained capability configuration across Citizen, Employee, Officer, and Super Admin roles</p>
                </div>
                <div className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200">
                  Enforced via FastAPI Middleware
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="py-3 px-4">Permission Key</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-center">Citizen</th>
                      <th className="py-3 px-4 text-center">Employee</th>
                      <th className="py-3 px-4 text-center">Officer</th>
                      <th className="py-3 px-4 text-center">Super Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionsMatrix.map((perm, idx) => (
                      <tr key={perm.key} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-purple-900">{perm.key}</td>
                        <td className="py-3 px-4 text-slate-700">{perm.desc}</td>
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={perm.citizen} 
                            onChange={() => togglePermission(idx, 'citizen')}
                            className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={perm.employee} 
                            onChange={() => togglePermission(idx, 'employee')}
                            className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={perm.officer} 
                            onChange={() => togglePermission(idx, 'officer')}
                            className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={perm.admin} 
                            onChange={() => togglePermission(idx, 'admin')}
                            className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 4: AI MODEL MANAGEMENT (24 Models)                           */}
          {/* ================================================================= */}
          {(currentPage === 'ai-models' || currentPage === 'ai-model-management') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">AI & Machine Learning Model Registry</h2>
                  <p className="text-xs text-slate-500">24 Registered Models · RAG Vector Embeddings in pgvector · Real-time inference monitoring</p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>Gemini 2.5 Flash: Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Gemini 2.5 Flash', type: 'LLM Orchestrator', role: 'Citizen Assistant & Scheme Q&A', status: 'Active (Primary)', latency: '340ms' },
                  { name: 'XGBoost Delay Forecaster v3.2', type: 'Predictive ML', role: 'SLA Breach Probability Engine', status: 'Active', latency: '24ms' },
                  { name: 'PaddleOCR Indian IDP v2', type: 'Vision OCR', role: 'Certificate & Aadhaar Document Verification', status: 'Active', latency: '480ms' },
                  { name: 'Isolation Forest Anomaly v1.8', type: 'Unsupervised ML', role: 'Fraud Detection & Cluster Outliers', status: 'Active', latency: '65ms' },
                  { name: 'TamilBERT Sentiment Classifier', type: 'NLP', role: 'Grievance Sentiment & Topic Extraction', status: 'Active', latency: '85ms' },
                  { name: 'BGE-M3 Multilingual Vectorizer', type: 'Dense Embeddings', role: '1024-dim pgvector Scheme Search', status: 'Active', latency: '42ms' },
                ].map((m, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {m.type}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">● {m.status}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{m.name}</h4>
                    <p className="text-xs text-slate-600">{m.role}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Latency: {m.latency}</span>
                      <span className="text-purple-700 font-bold cursor-pointer hover:underline">Configure →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 5: SYSTEM CONFIGURATION & SECURITY AUDIT                     */}
          {/* ================================================================= */}
          {(currentPage === 'system-config' || currentPage === 'system-configuration') && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h2 className="text-xl font-extrabold text-slate-900">System Configuration & DPDP Compliance</h2>
                <p className="text-xs text-slate-500">Core parameters governing session lifecycle, Redis cache TTL, and data protection</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">DPDP 2023 Encryption Mode</span>
                    <p className="text-[11px] text-slate-500">AES-256-GCM hardware security module (HSM) backing</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">AES-256-GCM Active</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">Session Inactivity Timeout</span>
                    <p className="text-[11px] text-slate-500">Auto-logout duration for employee & officer portals</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700">30 Minutes</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">Redis Distributed Cache TTL</span>
                    <p className="text-[11px] text-slate-500">Scheme directory and service metadata cache</p>
                  </div>
                  <span className="font-mono font-bold text-purple-700">3,600 Seconds (1 hr)</span>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other pages */}
          {![
            'dashboard', 'users', 'user-management', 'roles-matrix', 
            'roles-permissions', 'ai-models', 'ai-model-management', 
            'system-config', 'system-configuration'
          ].includes(currentPage) && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <h2 className="text-xl font-extrabold text-slate-900 capitalize">
                  {currentPage.replace('-', ' ')}
                </h2>
                <p className="text-xs text-slate-500">
                  Super Administrator Workspace · State Data Centre, Chennai
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3">
                <ShieldCheck className="w-12 h-12 text-purple-700 mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">Enterprise Module Active</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  This section is connected to the central GovAI Nexus administrative backend with full audit-logging and role-based permissions.
                </p>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS: ADD USER / ADD DEPT / BROADCAST ANNOUNCEMENT                    */}
      {/* ========================================================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Provision User Account</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Official Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanujam"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ramanujam.s@tn.gov.in"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="EMPLOYEE">Employee (Caseworker)</option>
                    <option value="OFFICER">Department Officer / HOD</option>
                    <option value="SUPER_ADMIN">Super Administrator</option>
                    <option value="CITIZEN">Citizen</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Revenue Department">Revenue Department</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Transport Department">Transport Department</option>
                    <option value="TNeGA">TNeGA / IT Department</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddDeptModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Register Government Department</h3>
              <button onClick={() => setIsAddDeptModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateDept} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher Education Department"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TN-HED"
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Head of Department (HOD)</label>
                  <input
                    type="text"
                    placeholder="e.g. Principal Secretary"
                    value={newDeptHOD}
                    onChange={(e) => setNewDeptHOD(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddDeptModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Broadcast Platform Announcement</h3>
              <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled Maintenance Notice"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Broadcast Scope</label>
                <select
                  value={announcementScope}
                  onChange={(e) => setAnnouncementScope(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-600"
                >
                  <option value="ALL_PORTALS">All 5 Portals (Statewide Broadcast)</option>
                  <option value="CITIZEN_ONLY">Citizen Portal Only</option>
                  <option value="EMPLOYEE_OFFICER">Internal Staff & Officers Only</option>
                </select>
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
                  Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
