import React, { useState } from 'react';
import { 
  User, Award, Briefcase, MapPin, Calendar, ArrowRight,
  Layers, CheckCircle2, Hourglass, XCircle, Clock, ChevronRight,
  TrendingUp, BarChart2, PieChart, ShieldAlert, Bell, FileText,
  FileCheck, Car, Home, Users, Store, BookOpen, AlertCircle,
  Download, Send, Search, Check, RefreshCw, Upload, Eye, Filter
} from 'lucide-react';
import { EmployeePage, ApplicationRecord } from '../../types';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface EmployeeDashboardViewProps {
  isTamil: boolean;
  onNavigate: (page: EmployeePage) => void;
  onOpenAIAssistant: () => void;
  onViewApplication: (app: any) => void;
  onQuickAction: (action: string) => void;
}

export const EmployeeDashboardView: React.FC<EmployeeDashboardViewProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onViewApplication,
  onQuickAction
}) => {
  const [trendRange, setTrendRange] = useState('Last 30 Days');

  // Work Queue items matching screenshot
  const workQueueItems = [
    { title: 'Income Certificate', titleTa: 'வருமானச் சான்றிதழ்', count: 24, icon: <FileText className="w-4 h-4 text-emerald-600" />, filter: 'Income Certificate' },
    { title: 'Community Certificate', titleTa: 'சமூகச் சான்றிதழ்', count: 18, icon: <Users className="w-4 h-4 text-blue-600" />, filter: 'Community Certificate' },
    { title: 'Nativity Certificate', titleTa: 'இருப்பிடச் சான்றிதழ்', count: 11, icon: <FileCheck className="w-4 h-4 text-purple-600" />, filter: 'Nativity Certificate' },
    { title: 'Smart Family Card', titleTa: 'ஸ்மார்ட் குடும்ப அட்டை', count: 20, icon: <Store className="w-4 h-4 text-amber-600" />, filter: 'Smart Family Card' },
    { title: 'Driving Licence', titleTa: 'ஓட்டுநர் உரிமம்', count: 15, icon: <Car className="w-4 h-4 text-sky-600" />, filter: 'Driving Licence' },
    { title: 'Land / Patta Services', titleTa: 'நிலம் / பட்டா சேவைகள்', count: 12, icon: <Home className="w-4 h-4 text-orange-600" />, filter: 'Patta' },
    { title: 'Scheme Applications', titleTa: 'நலத்திட்ட விண்ணப்பங்கள்', count: 28, icon: <Award className="w-4 h-4 text-rose-600" />, filter: 'Scheme' },
    { title: 'Other Services', titleTa: 'பிற அரசு சேவைகள்', count: 14, icon: <Layers className="w-4 h-4 text-indigo-600" />, filter: 'Other' }
  ];

  // Recent applications exactly matching the table in image_f0511ee1.png
  const recentApplications = [
    {
      id: 'APP20261028934',
      citizen: 'Arun Kumar S.',
      service: 'Income Certificate',
      date: '28 Oct 2026',
      status: 'Under Review',
      priority: 'High',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      priorityColor: 'text-rose-600 font-bold'
    },
    {
      id: 'APP20261028721',
      citizen: 'Meena R.',
      service: 'Community Certificate',
      date: '27 Oct 2026',
      status: 'Doc. Verification',
      priority: 'Medium',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-200',
      priorityColor: 'text-amber-600 font-bold'
    },
    {
      id: 'APP20261028317',
      citizen: 'Karthik V.',
      service: 'Driving Licence',
      date: '26 Oct 2026',
      status: 'Pending',
      priority: 'High',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-200',
      priorityColor: 'text-rose-600 font-bold'
    },
    {
      id: 'APP20261027965',
      citizen: 'Lakshmi P.',
      service: 'Smart Family Card',
      date: '25 Oct 2026',
      status: 'Approved',
      priority: 'Low',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      priorityColor: 'text-emerald-600 font-bold'
    },
    {
      id: 'APP20261027680',
      citizen: 'Ramesh T.',
      service: 'Patta / Land Service',
      date: '24 Oct 2026',
      status: 'Docs. Required',
      priority: 'Medium',
      statusColor: 'bg-orange-100 text-orange-900 border-orange-200',
      priorityColor: 'text-amber-600 font-bold'
    }
  ];

  // Bar chart trend intervals matching screenshot
  const trendData = [
    { label: 'Oct 04', received: 48, processed: 32, approved: 26 },
    { label: 'Oct 08', received: 52, processed: 36, approved: 30 },
    { label: 'Oct 12', received: 56, processed: 42, approved: 35 },
    { label: 'Oct 16', received: 62, processed: 48, approved: 41 },
    { label: 'Oct 20', received: 58, processed: 44, approved: 38 },
    { label: 'Oct 24', received: 64, processed: 52, approved: 45 },
    { label: 'Oct 28', received: 60, processed: 46, approved: 39 },
    { label: 'Nov 01', received: 68, processed: 56, approved: 48 }
  ];

  return (
    <div className="space-y-5">
      {/* ========================================================================= */}
      {/* 1. MASTER WELCOME BANNER + FLOATING ASK GOVAI CARD                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Banner with Landmarks & 6 Info Badges */}
        <div className="lg:col-span-8 bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E293B] rounded-3xl p-5 sm:p-6 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          {/* Panoramic Landmarks Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <img
              src={heroBgImg}
              alt="Tamil Nadu Landmarks"
              className="w-full h-full object-cover object-right opacity-35 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E3A8A]/90 to-transparent w-full lg:w-3/5" />
          </div>

          {/* Heading with Avatar */}
          <div className="relative z-10 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-xs">
              <User className="w-6 h-6 text-blue-200" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Welcome, Suvin Brettlee Roy B.
              </h2>
              <p className="text-xs text-blue-100 font-medium leading-relaxed max-w-xl">
                Process applications, verify documents, manage citizen requests and deliver timely government services.
              </p>
            </div>
          </div>

          {/* 6 Info Badges Strip */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 mt-4 border-t border-white/15">
            {/* 1. Employee ID */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">Employee ID</div>
                <div className="text-xs font-bold text-white truncate">EMP2507842</div>
              </div>
            </div>

            {/* 2. Designation */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Award className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">Designation</div>
                <div className="text-xs font-bold text-white truncate">Junior Assistant</div>
              </div>
            </div>

            {/* 3. Department */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">Department</div>
                <div className="text-xs font-bold text-white truncate">Revenue Department</div>
              </div>
            </div>

            {/* 4. Office */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">Office / e-Sevai Centre</div>
                <div className="text-xs font-bold text-white truncate">Uthiramerur Taluk Office</div>
              </div>
            </div>

            {/* 5. District */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">District</div>
                <div className="text-xs font-bold text-white truncate">Kanchipuram</div>
              </div>
            </div>

            {/* 6. Today */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-medium leading-tight">Today</div>
                <div className="text-xs font-bold text-white truncate">03 Nov 2026 (Tue)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Card: Ask GovAI (Employee) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0 shadow-xs">
              <img src={botMascotImg} alt="GovAI Bot" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-slate-900">Ask GovAI (Employee)</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                Get processing guidelines, document rules, scheme details and workflow help.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAIAssistant}
            className="mt-3.5 w-full py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 6 KPI SUMMARY METRIC CARDS                                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Pending Applications */}
        <div 
          onClick={() => onNavigate('pending-applications')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">142</div>
            <div className="text-[11px] text-slate-500 font-medium">Pending Applications</div>
            <div className="text-[10px] font-bold text-rose-600 mt-0.5">▲ +12%</div>
          </div>
        </div>

        {/* 2. Verified Documents */}
        <div 
          onClick={() => onNavigate('doc-verification')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">328</div>
            <div className="text-[11px] text-slate-500 font-medium">Verified Documents</div>
            <div className="text-[10px] font-bold text-emerald-600 mt-0.5">▲ +8%</div>
          </div>
        </div>

        {/* 3. Under Process */}
        <div 
          onClick={() => onNavigate('under-review')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">76</div>
            <div className="text-[11px] text-slate-500 font-medium">Under Process</div>
            <div className="text-[10px] font-bold text-emerald-600 mt-0.5">▼ -6%</div>
          </div>
        </div>

        {/* 4. Approved Applications */}
        <div 
          onClick={() => onNavigate('approval-rejection')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">418</div>
            <div className="text-[11px] text-slate-500 font-medium">Approved Applications</div>
            <div className="text-[10px] font-bold text-emerald-600 mt-0.5">▲ +14%</div>
          </div>
        </div>

        {/* 5. Rejected Applications */}
        <div 
          onClick={() => onNavigate('approval-rejection')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">37</div>
            <div className="text-[11px] text-slate-500 font-medium">Rejected Applications</div>
            <div className="text-[10px] font-bold text-rose-600 mt-0.5">▲ +3%</div>
          </div>
        </div>

        {/* 6. Avg. Processing Time */}
        <div 
          onClick={() => onNavigate('sla-performance')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">2.6 Days</div>
            <div className="text-[11px] text-slate-500 font-medium">Avg. Processing Time</div>
            <div className="text-[10px] font-bold text-emerald-600 mt-0.5">▼ -18%</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: 3 COLUMNS (My Work Queue, Charts & Quick Actions, Right) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLUMN 1 (lg:col-span-3): My Work Queue */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">📋</span>
                <h3 className="font-extrabold text-sm text-slate-900">My Work Queue</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                Total Assigned: 142
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {workQueueItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate('applications')}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-semibold text-slate-800 border border-slate-100/60 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="truncate">{isTamil ? item.titleTa : item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-purple-700">
                    <span className="font-bold text-slate-700">{item.count}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2 (lg:col-span-6): Charts (Trend + Overview) & Quick Actions */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Top Charts: Application Trend + Application Status Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Chart 1: Application Trend */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-purple-700" />
                  <h4 className="font-bold text-xs text-slate-900">Application Trend</h4>
                </div>
                <select 
                  value={trendRange} 
                  onChange={(e) => setTrendRange(e.target.value)}
                  className="text-[10px] font-bold border border-slate-200 rounded-lg px-2 py-0.5 bg-white text-slate-700"
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-purple-300" />Received</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-blue-500" />Processed</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />Approved</span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-36 flex items-end justify-between gap-1.5 pt-2 px-1 border-b border-slate-100">
                {trendData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-0.5 h-28">
                      <div className="w-1.5 sm:w-2 bg-purple-300 rounded-t-xs" style={{ height: `${(d.received / 70) * 100}%` }} title={`Received: ${d.received}`} />
                      <div className="w-1.5 sm:w-2 bg-blue-500 rounded-t-xs" style={{ height: `${(d.processed / 70) * 100}%` }} title={`Processed: ${d.processed}`} />
                      <div className="w-1.5 sm:w-2 bg-emerald-500 rounded-t-xs" style={{ height: `${(d.approved / 70) * 100}%` }} title={`Approved: ${d.approved}`} />
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Application Status Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-purple-700" />
                <h4 className="font-bold text-xs text-slate-900">Application Status Overview</h4>
              </div>

              {/* Donut Chart & Legend */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {/* SVG Donut */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    {/* Ring segments */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="16" />
                    {/* Approved: 41.8% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" strokeWidth="16" strokeDasharray="100 138" strokeDashoffset="0" />
                    {/* Docs. Required: 22.3% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F59E0B" strokeWidth="16" strokeDasharray="53 185" strokeDashoffset="-100" />
                    {/* Pending: 14.2% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8B5CF6" strokeWidth="16" strokeDasharray="34 204" strokeDashoffset="-153" />
                    {/* Under Review: 10.4% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="16" strokeDasharray="25 213" strokeDashoffset="-187" />
                    {/* Doc Verification: 7.6% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#FBBF24" strokeWidth="16" strokeDasharray="18 220" strokeDashoffset="-212" />
                    {/* Rejected: 3.7% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#EF4444" strokeWidth="16" strokeDasharray="9 229" strokeDashoffset="-230" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-black text-slate-900 leading-tight">1,001</span>
                    <span className="text-[9px] text-slate-400 font-bold">Total</span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="space-y-1 text-[10px] text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /><span>Pending – 14.2%</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /><span>Under Review – 10.4%</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span>Doc. Verification – 7.6%</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span>Approved – 41.8%</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /><span>Rejected – 3.7%</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /><span>Docs. Required – 22.3%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions (6 in a row) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-purple-700 font-bold text-sm">⚡</span>
              <h4 className="font-extrabold text-xs text-slate-900">Quick Actions</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <button
                onClick={() => onQuickAction('verify_document')}
                className="p-2.5 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100 hover:border-purple-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-purple-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Verify Document</span>
              </button>

              <button
                onClick={() => onQuickAction('process_application')}
                className="p-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Process Application</span>
              </button>

              <button
                onClick={() => onQuickAction('request_documents')}
                className="p-2.5 rounded-2xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100 hover:border-amber-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Request Documents</span>
              </button>

              <button
                onClick={() => onQuickAction('assign_reassign')}
                className="p-2.5 rounded-2xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-blue-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Assign / Reassign</span>
              </button>

              <button
                onClick={() => onQuickAction('contact_citizen')}
                className="p-2.5 rounded-2xl border border-violet-100 bg-violet-50/50 hover:bg-violet-100 hover:border-violet-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4 text-violet-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Contact Citizen</span>
              </button>

              <button
                onClick={() => onQuickAction('generate_report')}
                className="p-2.5 rounded-2xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100 hover:border-sky-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <BarChart2 className="w-4 h-4 text-sky-700" />
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3 (lg:col-span-3): Notifications + Department Performance + Useful Resources */}
        <div className="lg:col-span-3 space-y-4">
          {/* Card 1: Notifications (12) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-purple-700">
                <Bell className="w-4 h-4" />
                <h4 className="font-extrabold text-xs text-slate-900">Notifications (12)</h4>
              </div>
              <button 
                onClick={() => onNavigate('communications')}
                className="text-[10px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 pt-0.5 text-xs">
              {/* Notification 1 */}
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-slate-900 leading-tight">New application assigned</p>
                    <p className="text-[10px] text-slate-500 font-mono">APP20261028934 – Income Certificate</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[9px] text-slate-400">
                  <span>2 min ago</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                </div>
              </div>

              {/* Notification 2 */}
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-slate-900 leading-tight">SLA due in 2 days</p>
                    <p className="text-[10px] text-slate-500 font-mono">APP20261027680 – Patta Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[9px] text-slate-400">
                  <span>15 min ago</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                </div>
              </div>

              {/* Notification 3 */}
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Upload className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-slate-900 leading-tight">Additional document uploaded</p>
                    <p className="text-[10px] text-slate-500 font-mono">APP20261028317</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[9px] text-slate-400">
                  <span>28 min ago</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                </div>
              </div>

              {/* Notification 4 */}
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-slate-900 leading-tight">Department circular released</p>
                    <p className="text-[10px] text-slate-500">G.O. Ms. No. 214 – Revenue Dept.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[9px] text-slate-400">
                  <span>1 hr ago</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Department Performance (This Month) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 text-purple-700">
              <Award className="w-4 h-4" />
              <h4 className="font-extrabold text-xs text-slate-900">Department Performance <span className="text-[10px] font-normal text-slate-400">(This Month)</span></h4>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500 font-medium">Assigned</div>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">584</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500 font-medium">Completed</div>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">418</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500 font-medium">SLA Compliance</div>
                <div className="text-base font-extrabold text-emerald-600 mt-0.5">92%</div>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          {/* Card 3: Useful Resources */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-purple-700">
                <BookOpen className="w-4 h-4" />
                <h4 className="font-extrabold text-xs text-slate-900">Useful Resources</h4>
              </div>
              <button 
                onClick={() => onNavigate('help')}
                className="text-[10px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              {[
                'Processing Guidelines',
                'Scheme Manuals',
                'Government Orders (GOs)',
                'Application Forms',
                'Department Circulars'
              ].map((res, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Opening official reference: ${res}`)}
                  className="w-full p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-purple-700" />
                    <span>{res}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SECTION: RECENT APPLICATIONS TABLE                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📋</span>
            <h3 className="font-extrabold text-sm text-slate-900">Recent Applications</h3>
          </div>
          <button
            onClick={() => onNavigate('applications')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Application ID</th>
                <th className="p-3">Citizen Name</th>
                <th className="p-3">Service / Scheme</th>
                <th className="p-3">Submitted On</th>
                <th className="p-3">Status</th>
                <th className="p-3">Priority</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-mono font-bold text-purple-700 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.id}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{app.citizen}</td>
                  <td className="p-3 text-slate-700 font-medium">{app.service}</td>
                  <td className="p-3 text-slate-500">{app.date}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className={`p-3 text-xs ${app.priorityColor}`}>
                    {app.priority}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onViewApplication(app)}
                      className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
