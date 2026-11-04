import React, { useState } from 'react';
import { 
  Crown, Users, UserCheck, Building2, Layers, Award, 
  FileText, Cpu, Server, Database, Shield, ShieldCheck, 
  Clock, TrendingUp, BarChart2, PieChart, AlertTriangle, 
  Bell, CheckCircle2, XCircle, ArrowRight, ExternalLink, 
  Sparkles, Plus, Settings, Megaphone, FileSpreadsheet, 
  RotateCcw, Filter, Activity, HardDrive, Network, Globe,
  Calendar
} from 'lucide-react';
import { AdminPage } from '../../types';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface AdminDashboardViewProps {
  isTamil: boolean;
  onNavigate: (page: AdminPage) => void;
  onOpenAIAssistant: () => void;
  onQuickAction: (actionKey: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onQuickAction
}) => {
  const [trendRange, setTrendRange] = useState('Last 30 Days');

  // 8 Platform KPI Metric Cards matching image_8bf86a94.png
  const kpis = [
    {
      title: isTamil ? 'மொத்த பயனர்கள்' : 'Total Users',
      count: '2,86,409',
      trend: '▲ +8.4%',
      trendColor: 'text-emerald-700',
      icon: <Users className="w-5 h-5 text-purple-700" />,
      bgIcon: 'bg-purple-100',
      action: 'users'
    },
    {
      title: isTamil ? 'செயலில் உள்ள பயனர்கள்' : 'Active Users',
      count: '2,61,703',
      trend: '▲ +7.9%',
      trendColor: 'text-emerald-700',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'bg-emerald-100',
      action: 'users'
    },
    {
      title: isTamil ? 'அரசு துறைகள்' : 'Departments',
      count: '46',
      trend: '— 0%',
      trendColor: 'text-slate-500',
      icon: <Building2 className="w-5 h-5 text-amber-600" />,
      bgIcon: 'bg-amber-100',
      action: 'departments'
    },
    {
      title: isTamil ? 'அரசு சேவைகள்' : 'Government Services',
      count: '1,248',
      trend: '▲ +3.6%',
      trendColor: 'text-emerald-700',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      bgIcon: 'bg-blue-100',
      action: 'services-manage'
    },
    {
      title: isTamil ? 'அரசு நலத்திட்டங்கள்' : 'Government Schemes',
      count: '368',
      trend: '▲ +5.1%',
      trendColor: 'text-rose-600',
      icon: <Award className="w-5 h-5 text-pink-600" />,
      bgIcon: 'bg-pink-100',
      action: 'schemes-manage'
    },
    {
      title: isTamil ? 'மொத்த விண்ணப்பங்கள்' : 'Total Applications',
      count: '12,90,342',
      trend: '▲ +11.2%',
      trendColor: 'text-emerald-700',
      icon: <FileText className="w-5 h-5 text-purple-700" />,
      bgIcon: 'bg-purple-100',
      action: 'services-manage'
    },
    {
      title: isTamil ? 'AI மாதிரிகள் (LLM + ML)' : 'AI Models (LLM + ML)',
      count: '24',
      trend: '▲ +4',
      trendColor: 'text-emerald-700',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'bg-emerald-100',
      action: 'ai-models'
    },
    {
      title: isTamil ? 'கணினி நேரம் (Uptime)' : 'System Uptime (Last 30 Days)',
      count: '99.8%',
      trend: '—',
      trendColor: 'text-slate-500',
      icon: <Server className="w-5 h-5 text-sky-600" />,
      bgIcon: 'bg-sky-100',
      action: 'system-config'
    }
  ];

  // Grouped Bar chart data for Platform Usage Trend
  const trendBars = [
    { date: 'Oct 04', citizen: 25, employee: 16, officer: 10, admin: 4, public: 32 },
    { date: 'Oct 08', citizen: 28, employee: 18, officer: 11, admin: 5, public: 35 },
    { date: 'Oct 12', citizen: 32, employee: 20, officer: 12, admin: 5, public: 39 },
    { date: 'Oct 16', citizen: 34, employee: 21, officer: 13, admin: 6, public: 42 },
    { date: 'Oct 20', citizen: 33, employee: 19, officer: 12, admin: 5, public: 40 },
    { date: 'Oct 24', citizen: 36, employee: 22, officer: 14, admin: 6, public: 45 },
    { date: 'Oct 28', citizen: 38, employee: 23, officer: 15, admin: 7, public: 48 },
    { date: 'Nov 01', citizen: 41, employee: 25, officer: 16, admin: 8, public: 50 },
  ];

  // Department-wise Application Summary (Top 5)
  const departmentSummary = [
    { name: 'Revenue Department', apps: '3,24,801', processed: '2,87,416', pending: '37,385', sla: '94.8%' },
    { name: 'Social Welfare Department', apps: '2,16,579', processed: '1,98,402', pending: '18,177', sla: '95.2%' },
    { name: 'Transport Department', apps: '1,76,334', processed: '1,60,295', pending: '16,039', sla: '93.9%' },
    { name: 'Health & Family Welfare', apps: '1,28,447', processed: '1,17,602', pending: '10,845', sla: '95.6%' },
    { name: 'Agriculture Department', apps: '96,203', processed: '87,614', pending: '8,589', sla: '94.1%' }
  ];

  // Recent Administrative Activities
  const recentActivities = [
    { time: '10:42 AM', icon: '👤', activity: 'New employee account created (EMP2026102847)', by: 'You' },
    { time: '10:28 AM', icon: '📑', activity: 'Service updated – Community Certificate (v2.1)', by: 'System' },
    { time: '09:56 AM', icon: '🤖', activity: 'AI model deployed – Delay Prediction (v1.2)', by: 'You' },
    { time: '09:41 AM', icon: '🏛️', activity: 'Department office added – Kanchipuram (Taluk)', by: 'You' },
    { time: '09:20 AM', icon: '🛡️', activity: 'Role permission updated – District Officer', by: 'You' }
  ];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP ROW: WELCOME BANNER + FLOATING ASK GOVAI CARD                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Welcome Panorama Banner (Col 1-9) */}
        <div className="lg:col-span-9 relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white p-6 flex flex-col justify-between min-h-[170px]">
          {/* Background Panorama Image Overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
            <img src={heroBgImg} alt="Tamil Nadu Heritage" className="w-full h-full object-cover object-center" />
          </div>

          <div className="relative z-10 flex items-start gap-4">
            {/* Crown Avatar Badge */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#581C87]/80 border-2 border-purple-400/60 shadow-lg flex items-center justify-center shrink-0">
              <Crown className="w-9 h-9 text-purple-200" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Welcome, Suvin Brettlee Roy B.
              </h2>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                Super Administrator
              </span>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium leading-relaxed pt-1">
                Manage users, departments, services, AI models, system configurations and the entire GovAI Nexus platform.
              </p>
            </div>
          </div>
        </div>

        {/* Ask GovAI (Admin) Card (Col 10-12) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-purple-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 p-1 shrink-0 overflow-hidden border border-purple-200">
              <img src={botMascotImg} alt="Ask GovAI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Ask GovAI (Admin)</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Get platform insights, system status, manage configurations and more.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAIAssistant}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-purple-700 hover:to-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PLATFORM INFORMATION STRIP (5 BADGES matching image_8bf86a94.png)       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-xs">
        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Platform</span>
            <span className="font-bold text-slate-800">GovAI Nexus v2.4.0</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Last Login</span>
            <span className="font-bold text-slate-800">03 Nov 2026, 09:42 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Access Level</span>
            <span className="font-bold text-slate-800">Super Administrator</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Active Portals</span>
            <span className="font-bold text-slate-800">5 (Website, Citizen, Employee, Officer, Admin)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">System Status</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Services Operational</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EIGHT KPI CARDS (2,86,409 Users, 46 Depts, 12.9M Apps, etc.)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx}
            onClick={() => onNavigate(kpi.action as AdminPage)}
            className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-xl ${kpi.bgIcon} flex items-center justify-center`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-2.5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{kpi.count}</h3>
              <p className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">{kpi.title}</p>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold">
              <span className={kpi.trendColor}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 4. MIDDLE ROW: PLATFORM USAGE TREND + USER DISTRIBUTION + SYSTEM HEALTH   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Platform Usage Trend (Col 1-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Platform Usage Trend</h4>
            </div>
            <select 
              value={trendRange} 
              onChange={(e) => setTrendRange(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 focus:outline-hidden"
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#7C3AED]"></span> Citizen Portal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]"></span> Employee Portal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]"></span> Officer Portal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B]"></span> Admin Portal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#A855F7]"></span> Public Website</span>
          </div>

          {/* Grouped Bar Chart Visualization */}
          <div className="pt-1">
            <div className="h-44 flex items-end justify-between gap-1.5 border-b border-slate-100 pb-2">
              {trendBars.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-36">
                    <div className="w-1 bg-[#7C3AED] rounded-t-xs" style={{ height: `${(item.citizen / 50) * 100}%` }}></div>
                    <div className="w-1 bg-[#3B82F6] rounded-t-xs" style={{ height: `${(item.employee / 50) * 100}%` }}></div>
                    <div className="w-1 bg-[#10B981] rounded-t-xs" style={{ height: `${(item.officer / 50) * 100}%` }}></div>
                    <div className="w-1 bg-[#F59E0B] rounded-t-xs" style={{ height: `${(item.admin / 50) * 100}%` }}></div>
                    <div className="w-1 bg-[#A855F7] rounded-t-xs" style={{ height: `${(item.public / 50) * 100}%` }}></div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium truncate">{item.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>0</span>
              <span>10K</span>
              <span>20K</span>
              <span>30K</span>
              <span>40K</span>
              <span>50K</span>
            </div>
          </div>
        </div>

        {/* Middle Card: User Distribution (Col 6-8) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <PieChart className="w-4 h-4 text-purple-700" />
            <h4 className="font-extrabold text-sm text-slate-900">User Distribution</h4>
          </div>

          <div className="flex items-center gap-4">
            {/* SVG Donut Ring */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="16" fill="transparent" />
                {/* Citizens 79.4% */}
                <circle cx="50" cy="50" r="38" stroke="#7C3AED" strokeWidth="16" strokeDasharray="189 238" strokeDashoffset="0" fill="transparent" />
                {/* Employees 12.7% */}
                <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="16" strokeDasharray="30 238" strokeDashoffset="-189" fill="transparent" />
                {/* Officers / HODs 5.1% */}
                <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="16" strokeDasharray="12 238" strokeDashoffset="-219" fill="transparent" />
                {/* Administrators 1.3% */}
                <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="16" strokeDasharray="4 238" strokeDashoffset="-231" fill="transparent" />
                {/* Others 1.5% */}
                <circle cx="50" cy="50" r="38" stroke="#06B6D4" strokeWidth="16" strokeDasharray="4 238" strokeDashoffset="-235" fill="transparent" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">2,86,409</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Users</span>
              </div>
            </div>

            {/* Legend list matching image_8bf86a94.png */}
            <div className="flex-1 space-y-1.5 text-[11px] text-slate-700">
              <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Citizens</span><span className="font-bold text-slate-900">79.4% (2,27,343)</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Employees</span><span className="font-bold text-slate-900">12.7% (36,334)</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Officers / HODs</span><span className="font-bold text-slate-900">5.1% (14,613)</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Administrators</span><span className="font-bold text-slate-900">1.3% (3,729)</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span> Others</span><span className="font-bold text-slate-900">1.5% (4,390)</span></div>
            </div>
          </div>
        </div>

        {/* Right Card: System Health (Col 9-12) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">System Health</h4>
            </div>
            <button 
              onClick={() => onNavigate('system-config')}
              className="text-slate-400 hover:text-purple-700"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: 'Backend API', icon: <Server className="w-3.5 h-3.5 text-slate-500" /> },
              { name: 'Database (PostgreSQL)', icon: <Database className="w-3.5 h-3.5 text-slate-500" /> },
              { name: 'Redis Cache', icon: <HardDrive className="w-3.5 h-3.5 text-slate-500" /> },
              { name: 'AI Services (LLM/ML)', icon: <Cpu className="w-3.5 h-3.5 text-slate-500" /> },
              { name: 'Storage (Documents)', icon: <Server className="w-3.5 h-3.5 text-slate-500" /> },
              { name: 'Integrations', icon: <Globe className="w-3.5 h-3.5 text-slate-500" /> }
            ].map((srv, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  {srv.icon}
                  <span className="font-bold text-slate-800 text-[11px]">{srv.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span>✓</span> Operational
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. LOWER ROW 1: APPLICATION OVERVIEW + CRITICAL ALERTS + QUICK ACTIONS     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Application Overview (This Month) (Col 1-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-purple-700" />
            <h4 className="font-extrabold text-sm text-slate-900">Application Overview <span className="text-slate-400 font-normal text-xs">(This Month)</span></h4>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-slate-900 block">1,42,390</span>
              <span className="text-[10px] text-slate-500">Received</span>
              <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">▲ +12.6%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-slate-900 block">1,08,762</span>
              <span className="text-[10px] text-slate-500">Processed</span>
              <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">▲ +10.1%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-emerald-600 block">96,204</span>
              <span className="text-[10px] text-slate-500">Approved</span>
              <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">▲ +8.9%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-rose-600 block">8,774</span>
              <span className="text-[10px] text-slate-500">Rejected</span>
              <span className="text-[9px] font-bold text-rose-700 block mt-0.5">▲ +2.4%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-amber-600 block">37,628</span>
              <span className="text-[10px] text-slate-500">Pending</span>
              <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">▼ -6.8%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-sm font-black text-purple-700 block">2.6 Days</span>
              <span className="text-[10px] text-slate-500">Avg. Time</span>
              <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">▼ -18.4%</span>
            </div>
          </div>
        </div>

        {/* Critical Alerts (5) (Col 5-8) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-600" />
              <h4 className="font-extrabold text-sm text-slate-900">Critical Alerts (5)</h4>
            </div>
            <button 
              onClick={() => onNavigate('security-audit')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950">AI model inference failure (NLP v1.3)</span>
                  <span className="text-[10px] text-slate-400">5 min ago</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950">High pending applications in 3 districts</span>
                  <span className="text-[10px] text-slate-400">18 min ago</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5">
              <HardDrive className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">Storage usage at 88% (1.76 TB / 2.0 TB)</span>
                  <span className="text-[10px] text-slate-400">32 min ago</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950">Integration sync delay (DigiLocker)</span>
                  <span className="text-[10px] text-slate-400">48 min ago</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">12 failed admin login attempts</span>
                  <span className="text-[10px] text-slate-400">1 hr ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions (8 Tiles) (Col 9-12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>Quick Actions</span>
          </h4>

          <div className="grid grid-cols-4 gap-2 text-xs">
            {[
              { title: 'Add User', icon: <Users className="w-4 h-4 text-purple-700" />, action: 'users' },
              { title: 'Add Department', icon: <Building2 className="w-4 h-4 text-blue-600" />, action: 'departments' },
              { title: 'Add Service', icon: <Layers className="w-4 h-4 text-indigo-600" />, action: 'services-manage' },
              { title: 'Add Scheme', icon: <Award className="w-4 h-4 text-pink-600" />, action: 'schemes-manage' },
              { title: 'Manage AI Models', icon: <Cpu className="w-4 h-4 text-emerald-600" />, action: 'ai-models' },
              { title: 'System Settings', icon: <Settings className="w-4 h-4 text-slate-700" />, action: 'system-config' },
              { title: 'Generate Report', icon: <BarChart2 className="w-4 h-4 text-amber-600" />, action: 'reports' },
              { title: 'Create Announcement', icon: <Megaphone className="w-4 h-4 text-rose-600" />, action: 'announcements' }
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => onQuickAction(btn.action)}
                className="p-2.5 bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-200 rounded-xl flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer font-bold text-slate-700 hover:text-purple-900"
              >
                {btn.icon}
                <span className="text-[10px] leading-tight">{btn.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. LOWER ROW 2: ADMINISTRATIVE ACTIVITIES + DEPT APPLICATION SUMMARY      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Administrative Activities (Col 1-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Recent Administrative Activities</h4>
            </div>
            <button 
              onClick={() => onNavigate('security-audit')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase">
                <th className="pb-2">Time</th>
                <th className="pb-2">Activity</th>
                <th className="pb-2 text-right">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivities.map((act, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 font-mono text-[11px] text-slate-400">{act.time}</td>
                  <td className="py-2.5 font-bold text-slate-800 flex items-center gap-2">
                    <span>{act.icon}</span>
                    <span className="truncate max-w-[280px]">{act.activity}</span>
                  </td>
                  <td className="py-2.5 text-right font-medium text-purple-700">{act.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Department-wise Application Summary (Top 5) (Col 7-12) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Department-wise Application Summary <span className="text-slate-400 font-normal text-xs">(Top 5)</span></h4>
            </div>
            <button 
              onClick={() => onNavigate('departments')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase">
                <th className="pb-2">Department</th>
                <th className="pb-2 text-right">Applications</th>
                <th className="pb-2 text-right">Processed</th>
                <th className="pb-2 text-right">Pending</th>
                <th className="pb-2 text-right">SLA Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentSummary.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 font-bold text-slate-800">{dept.name}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{dept.apps}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{dept.processed}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{dept.pending}</td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      {dept.sla}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
