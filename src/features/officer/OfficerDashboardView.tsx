import React, { useState } from 'react';
import { 
  Building2, User, MapPin, Briefcase, Users, Calendar, 
  FileText, Hourglass, RefreshCw, CheckCircle2, XCircle, Clock, 
  Award, TrendingUp, BarChart2, PieChart, ShieldAlert, AlertTriangle, 
  ChevronRight, ExternalLink, ArrowRight, Bell, Sparkles, MessageSquare, 
  HelpCircle, Check, Filter, Layers, Share2, Megaphone, Gauge, FileSpreadsheet
} from 'lucide-react';
import { OfficerPage } from '../../types';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';
import officerImg from '../../assets/images/officer_ias_portrait_1793721647657.jpg';

interface OfficerDashboardViewProps {
  isTamil: boolean;
  onNavigate: (page: OfficerPage) => void;
  onOpenAIAssistant: () => void;
  onQuickAction: (actionKey: string) => void;
}

export const OfficerDashboardView: React.FC<OfficerDashboardViewProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onQuickAction
}) => {
  const [trendRange, setTrendRange] = useState('Last 30 Days');

  // 8 Department KPI cards matching image_12cc6b00.png
  const kpis = [
    {
      title: isTamil ? 'மொத்த விண்ணப்பங்கள்' : 'Total Applications',
      count: '6,842',
      trend: '+12.6%',
      isUp: true,
      icon: <FileText className="w-5 h-5 text-purple-700" />,
      bgIcon: 'bg-purple-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'நிலுவையில் உள்ளவை' : 'Pending',
      count: '1,428',
      trend: '+8.1%',
      isUp: true,
      icon: <Hourglass className="w-5 h-5 text-amber-600" />,
      bgIcon: 'bg-amber-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'செயலாக்கத்தில் உள்ளவை' : 'Under Process',
      count: '2,096',
      trend: '-4.3%',
      isUp: false,
      icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'bg-emerald-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'ஒப்புதல் பெற்றவை' : 'Approved',
      count: '3,064',
      trend: '+15.8%',
      isUp: true,
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
      bgIcon: 'bg-blue-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'நிராகரிக்கப்பட்டவை' : 'Rejected',
      count: '254',
      trend: '+2.1%',
      isUp: true,
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      bgIcon: 'bg-rose-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'தாமதமானது (SLA)' : 'Delayed (SLA)',
      count: '186',
      trend: '-18.4%',
      isUp: false,
      icon: <Clock className="w-5 h-5 text-purple-700" />,
      bgIcon: 'bg-purple-100',
      action: 'applications'
    },
    {
      title: isTamil ? 'செயலில் உள்ள ஊழியர்கள்' : 'Active Employees',
      count: '328',
      trend: '+3.5%',
      isUp: true,
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bgIcon: 'bg-blue-100',
      action: 'employees'
    },
    {
      title: isTamil ? 'SLA இணக்கம்' : 'SLA Compliance',
      count: '94.2%',
      trend: '+5.7%',
      isUp: true,
      icon: <Award className="w-5 h-5 text-amber-500" />,
      bgIcon: 'bg-amber-100',
      action: 'reports'
    }
  ];

  // Grouped Bar chart data for Application Processing Trend
  const trendBars = [
    { date: 'Oct 02', received: 140, processed: 180, approved: 120, rejected: 10 },
    { date: 'Oct 05', received: 190, processed: 230, approved: 140, rejected: 15 },
    { date: 'Oct 08', received: 210, processed: 260, approved: 150, rejected: 12 },
    { date: 'Oct 11', received: 240, processed: 280, approved: 160, rejected: 14 },
    { date: 'Oct 14', received: 220, processed: 270, approved: 155, rejected: 18 },
    { date: 'Oct 17', received: 250, processed: 290, approved: 165, rejected: 16 },
    { date: 'Oct 20', received: 230, processed: 275, approved: 160, rejected: 12 },
    { date: 'Oct 23', received: 260, processed: 310, approved: 175, rejected: 20 },
    { date: 'Oct 29', received: 280, processed: 350, approved: 190, rejected: 22 }
  ];

  // Service-wise Performance Table matching image_12cc6b00.png
  const servicePerformance = [
    { name: 'Income Certificate', received: '1,320', processed: '1,156', pending: '164', sla: '95.1%' },
    { name: 'Community Certificate', received: '1,083', processed: '982', pending: '101', sla: '93.7%' },
    { name: 'Nativity Certificate', received: '742', processed: '690', pending: '52', sla: '94.3%' },
    { name: 'Patta / Land Service', received: '676', processed: '598', pending: '78', sla: '91.8%' },
    { name: 'Smart Family Card', received: '522', processed: '481', pending: '41', sla: '96.2%' }
  ];

  // Recent Department Activities
  const recentActivities = [
    { time: '10:35 AM', activity: 'Application Approved', details: 'APP20261028934 – Income Certificate', by: 'JA. Meenakshi', icon: 'check' },
    { time: '10:02 AM', activity: 'Application Reassigned', details: 'APP20261028721 – To Uthiramerur Office', by: 'You', icon: 'reassign' },
    { time: '09:48 AM', activity: 'Document Verification Completed', details: 'APP20261028317 – Community Certificate', by: 'SA. Karthik', icon: 'verify' },
    { time: '09:20 AM', activity: 'SLA Alert Triggered', details: '28 applications exceeding 3 days', by: 'System', icon: 'alert' },
    { time: '08:55 AM', activity: 'Department Notice Published', details: 'G.O. Ms. No. 214 – Service Guideline Update', by: 'You', icon: 'notice' }
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
            {/* Officer Portrait */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/80 shadow-md shrink-0 bg-slate-800">
              <img src={officerImg} alt="Dr. R. Vijayakumar, IAS" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Welcome, Dr. R. Vijayakumar, IAS
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium leading-relaxed">
                Monitor department operations, supervise service delivery and make informed administrative decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Ask GovAI (Officer) Card (Col 10-12) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-purple-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 p-1 shrink-0 overflow-hidden border border-purple-200">
              <img src={botMascotImg} alt="Ask GovAI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Ask GovAI (Officer)</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Get application insights, delay analysis, workload trends, policy guidance and more.
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
      {/* 2. DEPARTMENT INFORMATION STRIP (6 BADGES)                                */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-xs">
        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Department</span>
            <span className="font-bold text-slate-800">Revenue Department</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Designation</span>
            <span className="font-bold text-slate-800">District Officer</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Jurisdiction</span>
            <span className="font-bold text-slate-800">Kanchipuram District</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Office</span>
            <span className="font-bold text-slate-800">District Collectorate</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Offices</span>
            <span className="font-bold text-slate-800">12 (1 District, 7 Taluk, 4 Others)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Reporting Period</span>
            <span className="font-bold text-slate-800">Oct 01 – Oct 31, 2026</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EIGHT KPI CARDS                                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx}
            onClick={() => onNavigate(kpi.action as OfficerPage)}
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
              <span className={kpi.isUp ? 'text-emerald-700' : 'text-purple-700'}>
                {kpi.isUp ? '▲' : '▼'} {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 4. MIDDLE ROW: BAR CHART + DONUT CHART + DISTRICT MAP + ALERTS & ACTIONS  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Charts & Map (Col 1-8) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top of Left Side: Processing Trend Bar Chart */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-sm text-slate-900">Application Processing Trend</h4>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#C084FC]"></span> Received</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]"></span> Processed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]"></span> Approved</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#F43F5E]"></span> Rejected</span>
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
            </div>

            {/* Simulated Grouped Bar Chart Visualization */}
            <div className="pt-2">
              <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-100 pb-2">
                {trendBars.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-36">
                      <div className="w-1.5 sm:w-2 bg-[#C084FC] rounded-t-xs" style={{ height: `${(item.received / 350) * 100}%` }}></div>
                      <div className="w-1.5 sm:w-2 bg-[#3B82F6] rounded-t-xs" style={{ height: `${(item.processed / 350) * 100}%` }}></div>
                      <div className="w-1.5 sm:w-2 bg-[#10B981] rounded-t-xs" style={{ height: `${(item.approved / 350) * 100}%` }}></div>
                      <div className="w-1 sm:w-1.5 bg-[#F43F5E] rounded-t-xs" style={{ height: `${(item.rejected / 350) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium truncate">{item.date}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                <span>0</span>
                <span>100</span>
                <span>200</span>
                <span>300</span>
                <span>400</span>
                <span>500</span>
              </div>
            </div>
          </div>

          {/* Bottom of Left Side: Status Donut Chart & District Performance Map (Grid 2 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Status Overview Donut Chart */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-sm text-slate-900">Application Status Distribution</h4>
              </div>

              <div className="flex items-center gap-4">
                {/* SVG Donut Ring */}
                <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="16" fill="transparent" />
                    {/* Approved 44.8% */}
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="16" strokeDasharray="107 238" strokeDashoffset="0" fill="transparent" />
                    {/* Pending 20.9% */}
                    <circle cx="50" cy="50" r="38" stroke="#7C3AED" strokeWidth="16" strokeDasharray="50 238" strokeDashoffset="-107" fill="transparent" />
                    {/* Under Review 12.6% */}
                    <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="16" strokeDasharray="30 238" strokeDashoffset="-157" fill="transparent" />
                    {/* Doc Verification 10.4% */}
                    <circle cx="50" cy="50" r="38" stroke="#06B6D4" strokeWidth="16" strokeDasharray="25 238" strokeDashoffset="-187" fill="transparent" />
                    {/* Additional Docs 5.1% */}
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="16" strokeDasharray="12 238" strokeDashoffset="-212" fill="transparent" />
                    {/* Rejected 3.7% */}
                    <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="16" strokeDasharray="9 238" strokeDashoffset="-224" fill="transparent" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-slate-900 leading-none">6,842</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Total</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 space-y-1 text-[11px] text-slate-700">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Pending</span><span className="font-bold text-slate-900">20.9%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#60A5FA]"></span> Assigned</span><span className="font-bold text-slate-900">8.7%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Under Review</span><span className="font-bold text-slate-900">12.6%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span> Doc. Verification</span><span className="font-bold text-slate-900">10.4%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Additional Docs</span><span className="font-bold text-slate-900">5.1%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F97316]"></span> Ready for Approval</span><span className="font-bold text-slate-900">4.3%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Approved</span><span className="font-bold text-slate-900">44.8%</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Rejected</span><span className="font-bold text-slate-900">3.7%</span></div>
                </div>
              </div>
            </div>

            {/* District-wise Performance (Map / Taluk Grid) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-700" />
                  <h4 className="font-extrabold text-sm text-slate-900">District-wise Performance</h4>
                </div>
                <button 
                  onClick={() => onNavigate('workload')}
                  className="text-slate-400 hover:text-purple-700 transition-colors"
                  title="Drill-down to Taluks"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Map Illustration of Kanchipuram Taluks */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="w-36 h-28 relative flex items-center justify-center">
                  <svg className="w-full h-full text-purple-700" viewBox="0 0 120 100" fill="none">
                    {/* SVG silhouette representation of Kanchipuram District taluks */}
                    <path d="M20 30 Q35 15 60 20 T95 35 Q105 55 90 75 T50 85 Q25 80 15 55 Z" fill="#E9D5FF" stroke="#A855F7" strokeWidth="2" />
                    <path d="M40 25 L65 50 L45 75 Z" fill="#C084FC" opacity="0.7" />
                    <path d="M65 50 L90 40 L85 70 Z" fill="#7E22CE" opacity="0.8" />
                    <circle cx="55" cy="45" r="3" fill="#FFFFFF" />
                    <text x="50" y="60" fontSize="8" fontWeight="bold" fill="#3B0764">Kanchi</text>
                  </svg>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <span className="font-bold text-slate-800 block text-xs mb-1">SLA Compliance</span>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-xs bg-[#6B21A8]"></span> ≥ 95% (Kanchipuram, Walajabad)</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-xs bg-[#9333EA]"></span> 90% – 95% (Sriperumbudur)</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-xs bg-[#C084FC]"></span> 85% – 90% (Uthiramerur)</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-xs bg-[#E9D5FF]"></span> &lt; 85% (Kundrathur)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Uthiramerur Taluk</span>
                <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  91.4% SLA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Critical Alerts + Quick Actions (Col 9-12) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Critical Alerts (5) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-600" />
                <h4 className="font-extrabold text-sm text-slate-900">Critical Alerts (5)</h4>
              </div>
              <button 
                onClick={() => onNavigate('notifications')}
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
                    <span className="font-bold text-rose-950">42 applications breached SLA</span>
                    <span className="text-[10px] text-slate-400">5 min ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600">(Income Certificate, Patta Service)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950">High workload in Uthiramerur Taluk</span>
                    <span className="text-[10px] text-slate-400">12 min ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600">(↑ 38% from last week)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">Workload imbalance detected</span>
                    <span className="text-[10px] text-slate-400">25 min ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600">(3 employees &gt; 200 applications)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-950">Unusual application pattern detected</span>
                    <span className="text-[10px] text-slate-400">40 min ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600">(Multiple similar submissions)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">28 grievances overdue</span>
                    <span className="text-[10px] text-slate-400">1 hr ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600">(Resolution &gt; SLA)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions (8 Buttons Grid matching image_12cc6b00.png) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>Quick Actions</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { title: 'View Applications', icon: <FileText className="w-4 h-4 text-purple-700" />, action: 'applications' },
                { title: 'Assign / Reassign', icon: <Users className="w-4 h-4 text-blue-600" />, action: 'workload' },
                { title: 'Manage Employees', icon: <User className="w-4 h-4 text-emerald-600" />, action: 'employees' },
                { title: 'Generate Report', icon: <BarChart2 className="w-4 h-4 text-amber-600" />, action: 'reports' },
                { title: 'Monitor Workload', icon: <Gauge className="w-4 h-4 text-indigo-600" />, action: 'workload' },
                { title: 'View Analytics', icon: <TrendingUp className="w-4 h-4 text-sky-600" />, action: 'predictive' },
                { title: 'Review Anomalies', icon: <ShieldAlert className="w-4 h-4 text-rose-600" />, action: 'fraud-alerts' },
                { title: 'Department Announcement', icon: <Megaphone className="w-4 h-4 text-purple-700" />, action: 'announcements' }
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => onQuickAction(btn.action)}
                  className="p-3 bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-200 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer font-bold text-slate-700 hover:text-purple-900"
                >
                  {btn.icon}
                  <span className="text-[11px] leading-tight">{btn.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. LOWER ROW: SERVICE PERFORMANCE + RECENT WORKLOAD + ACTIVITIES + INSIGHTS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Service-wise Performance Table (Col 1-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Service-wise Performance (Top 5)</h4>
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
                <th className="pb-2">Service</th>
                <th className="pb-2 text-right">Received</th>
                <th className="pb-2 text-right">Processed</th>
                <th className="pb-2 text-right">Pending</th>
                <th className="pb-2 text-right">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {servicePerformance.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate max-w-[120px]">{row.name}</span>
                  </td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{row.received}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{row.processed}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600">{row.pending}</td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      {row.sla}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Workload / Decisions Tracker (Col 6-12) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Recent Decisions / Progress Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-sm text-slate-900">Recent Decisions & Workload Intake</h4>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-lg font-black text-slate-900 block">3,214</span>
                <span className="text-[10px] font-bold text-slate-500">Assigned</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-lg font-black text-emerald-700 block">2,576</span>
                <span className="text-[10px] font-bold text-emerald-800">Completed</span>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-lg font-black text-amber-700 block">638</span>
                <span className="text-[10px] font-bold text-amber-800">Pending</span>
              </div>
              <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-lg font-black text-rose-700 block">186</span>
                <span className="text-[10px] font-bold text-rose-800">Overdue</span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-slate-100 h-3 rounded-full flex overflow-hidden">
                <div className="bg-[#10B981] h-full" style={{ width: '58.8%' }} title="Completed (58.8%)"></div>
                <div className="bg-[#3B82F6] h-full" style={{ width: '26.6%' }} title="In Process (26.6%)"></div>
                <div className="bg-[#F59E0B] h-full" style={{ width: '10.2%' }} title="Pending (10.2%)"></div>
                <div className="bg-[#EF4444] h-full" style={{ width: '4.4%' }} title="Overdue (2.7%)"></div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Completed (58.8%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> In Process (26.6%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Pending (10.2%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Overdue (2.7%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM ROW: RECENT ACTIVITIES + PREDICTIVE INSIGHTS + CITIZEN FEEDBACK */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Department Activities (Col 1-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-purple-700" />
              <h4 className="font-extrabold text-sm text-slate-900">Recent Department Activities</h4>
            </div>
            <button 
              onClick={() => onNavigate('applications')}
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
                <th className="pb-2">Details</th>
                <th className="pb-2 text-right">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivities.map((act, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 font-mono text-[11px] text-slate-400">{act.time}</td>
                  <td className="py-2.5 font-bold text-slate-800">{act.activity}</td>
                  <td className="py-2.5 text-slate-600 truncate max-w-[170px]">{act.details}</td>
                  <td className="py-2.5 text-right font-medium text-purple-700">{act.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Predictive Insights & Citizen Feedback (Col 7-12) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Predictive Insights (Next 30 Days) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-sm text-slate-900">Predictive Insights (Next 30 Days)</h4>
              </div>

              <div className="space-y-2 mt-3 text-xs">
                <div 
                  onClick={() => onNavigate('predictive')}
                  className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-purple-950 font-medium">Application demand may increase by ~18% (Income & Community Certificate).</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                </div>

                <div 
                  onClick={() => onNavigate('predictive')}
                  className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-950 font-medium">~142 applications are at risk of SLA delay.</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                </div>

                <div 
                  onClick={() => onNavigate('predictive')}
                  className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-950 font-medium">Workload surge expected in Uthiramerur & Kanchipuram Taluks.</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Citizen Feedback & Grievances */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <MessageSquare className="w-4 h-4 text-purple-700" />
                <h4 className="font-extrabold text-sm text-slate-900">Citizen Feedback & Grievances</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-1.5 text-amber-600 font-black text-base">
                    <span>★ 4.3 / 5</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 block mt-1">Avg. Service Rating</span>
                  <span className="text-[10px] text-emerald-700 font-bold">↑ +0.2 this month</span>
                </div>

                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-1.5 text-purple-700 font-black text-base">
                    <span>268</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 block mt-1">Total Grievances</span>
                  <span className="text-[10px] text-amber-700 font-bold">46 Pending review</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <span className="text-lg">😊</span>
                  <div>
                    <span className="font-black text-emerald-700 text-sm">86%</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Positive</span>
                  </div>
                </div>

                <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100 flex items-center gap-2">
                  <span className="text-lg">☹️</span>
                  <div>
                    <span className="font-black text-rose-700 text-sm">14%</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Negative</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('grievances')}
              className="w-full mt-2 py-1.5 text-xs text-purple-700 hover:text-purple-900 font-bold text-center hover:underline cursor-pointer"
            >
              Open Grievance Desk →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
