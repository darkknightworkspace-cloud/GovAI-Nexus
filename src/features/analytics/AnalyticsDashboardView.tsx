import React, { useState } from 'react';
import { 
  Sparkles, Database, TrendingUp, AlertTriangle, Globe, 
  Smile, Server, CheckCircle2, Search, Filter, ChevronRight, Layers,
  Building2, MapPin, Download, RefreshCw, Shield, FileText, Check, Clock,
  ArrowUpRight, BarChart3, Radio, HardDrive, Cpu, Activity, BookOpen,
  Calendar, RotateCcw, ShieldAlert, Users, ArrowRight, ExternalLink,
  Plus, Settings, Megaphone, FileSpreadsheet, Bot, UserCheck, CheckCircle,
  HelpCircle, AlertCircle, Frown, Meh, FileCheck, BrainCircuit
} from 'lucide-react';
import { AnalyticsPage } from '../../types';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface AnalyticsDashboardViewProps {
  isTamil: boolean;
  onNavigate: (page: AnalyticsPage) => void;
  onOpenAIAssistant: () => void;
  onQuickAction: (actionKey: string) => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onQuickAction
}) => {
  const [trendRange, setTrendRange] = useState('Last 30 Days');
  const [forecastHorizon, setForecastHorizon] = useState('Next 3 Months');

  // Usage trend grouped bar data
  const usageTrendData = [
    { date: 'Oct 04', aiRequests: 8, ragQueries: 18, predictions: 14, analysis: 6 },
    { date: 'Oct 08', aiRequests: 12, ragQueries: 21, predictions: 16, analysis: 9 },
    { date: 'Oct 16', aiRequests: 14, ragQueries: 28, predictions: 21, analysis: 11 },
    { date: 'Oct 20', aiRequests: 16, ragQueries: 32, predictions: 24, analysis: 13 },
    { date: 'Oct 24', aiRequests: 15, ragQueries: 29, predictions: 22, analysis: 12 },
    { date: 'Oct 28', aiRequests: 17, ragQueries: 34, predictions: 26, analysis: 14 },
    { date: 'Nov 01', aiRequests: 22, ragQueries: 41, predictions: 31, analysis: 18 },
  ];

  return (
    <div className="space-y-4">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0C122C] via-[#151D42] to-[#251A4D] text-white p-5 lg:p-6 shadow-md border border-indigo-900/40">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        
        {/* Subtle AI particle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:18px_18px] opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Left Text */}
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center lg:justify-start gap-2">
              <span>{isTamil ? 'அரசு நுண்ணறிவு மையம்' : 'AI & Analytics'}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 italic font-black">
                {isTamil ? 'Centre' : 'Centre'}
              </span>
            </h1>
            <p className="text-sm font-medium text-slate-200">
              {isTamil 
                ? 'சிறந்த சேவைகளுக்கான அரசு செயற்கை நுண்ணறிவு மற்றும் பகுப்பாய்வு' 
                : 'Government Intelligence for Better Services'}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-200 bg-white/10 px-3 py-1 rounded-full border border-purple-400/20 backdrop-blur-xs">
              <span>{isTamil ? 'முன்னறிவிப்பு • கண்டறிதல் • பகுப்பாய்வு • கண்காணிப்பு • தகவல்' : 'Predict • Detect • Analyse • Monitor • Inform'}</span>
            </div>
          </div>

          {/* Center Visual Glowing AI Pedestal */}
          <div className="hidden xl:flex items-center justify-center relative w-48 h-24">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/50 flex items-center justify-center border border-purple-300/40 animate-bounce duration-1000">
                <span className="text-lg font-black tracking-wider text-white">AI</span>
              </div>
              <div className="w-28 h-3 bg-purple-400/40 blur-xs rounded-full mt-2" />
            </div>
          </div>

          {/* Right: Ask GovAI (Analytics) Card */}
          <div className="w-full lg:w-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-xl border border-white/40 flex items-center gap-4 shrink-0 max-w-md">
            <div className="relative">
              <img 
                src={botMascotImg} 
                alt="GovAI Bot" 
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-purple-500 shadow-sm"
              />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span>{isTamil ? 'GovAI கேளுங்கள் (Analytics)' : 'Ask GovAI (Analytics)'}</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mt-0.5">
                {isTamil
                  ? 'சேவை செயல்திறன், கணிப்புகள், போக்குகள் மற்றும் அரசு தரவுகள் குறித்து கேளுங்கள்.'
                  : 'Ask questions on service performance, predictions, trends and government data.'}
              </p>
              <button
                onClick={onOpenAIAssistant}
                className="mt-2 text-xs font-semibold px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>{isTamil ? 'கேள்வி கேளுங்கள்' : 'Ask a Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DATA REFRESH & STATUS STRIP (6 BADGES) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-xs">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Data as on</span>
            <span className="font-bold text-slate-800 text-[11px]">03 Nov 2026, 10:30 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Last Data Refresh</span>
            <span className="font-bold text-slate-800 text-[11px]">03 Nov 2026, 10:15 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Data Sources</span>
            <span className="font-bold text-slate-800 text-[11px] truncate max-w-[130px] block" title="All Portals (Citizen, Employee, Officer)">
              All Portals (Citizen, Employee, Officer)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Active AI Models</span>
            <span className="font-bold text-slate-800 text-[11px]">24 (LLM: 6, ML: 12, NLP: 6)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-violet-50 text-purple-700 flex items-center justify-center shrink-0 font-bold text-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Agents</span>
            <span className="font-bold text-slate-800 text-[11px]">9 AI Agents</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">System Status</span>
            <span className="font-bold text-green-600 text-[11px]">Operational</span>
          </div>
        </div>
      </div>

      {/* 3. SEVEN INTELLIGENCE KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* 1. Knowledge Docs */}
        <div 
          onClick={() => onNavigate('knowledge-repository')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▲ +7.8%
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">1,24,860</div>
            <div className="text-[11px] text-slate-500 font-medium">Knowledge Docs</div>
          </div>
        </div>

        {/* 2. Active AI Models */}
        <div 
          onClick={() => onQuickAction('manage-models')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▲ +4
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">24</div>
            <div className="text-[11px] text-slate-500 font-medium">Active AI Models</div>
          </div>
        </div>

        {/* 3. AI Requests */}
        <div 
          onClick={() => onNavigate('infrastructure')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▲ +18.4%
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">3,12,906</div>
            <div className="text-[11px] text-slate-500 font-medium">AI Requests</div>
          </div>
        </div>

        {/* 4. Predictions */}
        <div 
          onClick={() => onNavigate('predictive-intel')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▲ +12.6%
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">1,42,390</div>
            <div className="text-[11px] text-slate-500 font-medium">Predictions</div>
          </div>
        </div>

        {/* 5. Anomaly Alerts */}
        <div 
          onClick={() => onNavigate('fraud-intel')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▼ -9.7%
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">318</div>
            <div className="text-[11px] text-slate-500 font-medium">Anomaly Alerts</div>
          </div>
        </div>

        {/* 6. Feedback Analysed */}
        <div 
          onClick={() => onNavigate('citizen-sentiment')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Users className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md flex items-center">
              ▲ +16.2%
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">87,560</div>
            <div className="text-[11px] text-slate-500 font-medium">Feedback Analysed</div>
          </div>
        </div>

        {/* 7. System Uptime */}
        <div 
          onClick={() => onNavigate('infrastructure')}
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Server className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1 py-0.5 rounded">
              30D
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">99.8%</div>
            <div className="text-[11px] text-slate-500 font-medium truncate" title="System Uptime (Last 30 Days)">System Uptime (Last 30 Days)</div>
          </div>
        </div>
      </div>

      {/* 4. ROW 1: USAGE TREND | MODEL DISTRIBUTION | PREDICTIVE INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 4A. Platform AI Usage Trend (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Platform AI Usage Trend</h2>
            </div>
            <select 
              value={trendRange}
              onChange={(e) => setTrendRange(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 bg-slate-50 focus:outline-hidden"
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mb-4 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
              AI Requests
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
              RAG Queries
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              Predictions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
              Analysis Jobs
            </span>
          </div>

          {/* Grouped Bar Visualizer */}
          <div className="h-44 flex items-end justify-between gap-2 pt-2 border-b border-slate-100">
            {usageTrendData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-0.5 h-36">
                  {/* AI Requests */}
                  <div 
                    style={{ height: `${(item.aiRequests / 50) * 100}%` }}
                    className="w-1.5 bg-[#8B5CF6] rounded-t-xs transition-all group-hover:opacity-80"
                    title={`AI Requests: ${item.aiRequests}K`}
                  />
                  {/* RAG Queries */}
                  <div 
                    style={{ height: `${(item.ragQueries / 50) * 100}%` }}
                    className="w-1.5 bg-[#3B82F6] rounded-t-xs transition-all group-hover:opacity-80"
                    title={`RAG Queries: ${item.ragQueries}K`}
                  />
                  {/* Predictions */}
                  <div 
                    style={{ height: `${(item.predictions / 50) * 100}%` }}
                    className="w-1.5 bg-[#10B981] rounded-t-xs transition-all group-hover:opacity-80"
                    title={`Predictions: ${item.predictions}K`}
                  />
                  {/* Analysis Jobs */}
                  <div 
                    style={{ height: `${(item.analysis / 50) * 100}%` }}
                    className="w-1.5 bg-[#F59E0B] rounded-t-xs transition-all group-hover:opacity-80"
                    title={`Analysis Jobs: ${item.analysis}K`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>0</span>
            <span>10K</span>
            <span>20K</span>
            <span>30K</span>
            <span>40K</span>
            <span>50K</span>
          </div>
        </div>

        {/* 4B. Model Distribution (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Model Distribution</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* Donut Chart SVG */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="16" />
                {/* LLM Models 25% (stroke-dasharray 60 180) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#8B5CF6" strokeWidth="16" strokeDasharray="60 180" strokeDashoffset="0" />
                {/* ML Models 50% (stroke-dasharray 120 120) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="120 120" strokeDashoffset="-60" />
                {/* NLP Models 16.7% (stroke-dasharray 40 200) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="40 200" strokeDashoffset="-180" />
                {/* Anomaly Models 4.2% (stroke-dasharray 10 230) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="16" strokeDasharray="10 230" strokeDashoffset="-220" />
                {/* Forecasting 4.2% (stroke-dasharray 10 230) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#EC4899" strokeWidth="16" strokeDasharray="10 230" strokeDashoffset="-230" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 leading-tight">24</span>
                <span className="text-[10px] font-semibold text-slate-400">Models</span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                  LLM Models
                </span>
                <span className="font-bold text-slate-800 text-[11px]">25.0% (6)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                  ML Models
                </span>
                <span className="font-bold text-slate-800 text-[11px]">50.0% (12)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  NLP Models
                </span>
                <span className="font-bold text-slate-800 text-[11px]">16.7% (4)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  Anomaly Models
                </span>
                <span className="font-bold text-slate-800 text-[11px]">4.2% (1)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]"></span>
                  Forecasting
                </span>
                <span className="font-bold text-slate-800 text-[11px]">4.2% (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4C. Predictive Insights (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-purple-600" />
                <h2 className="text-sm font-bold text-slate-900">Predictive Insights</h2>
              </div>
              <button 
                onClick={() => onNavigate('predictive-intel')}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Insight 1 */}
              <div 
                onClick={() => onNavigate('predictive-intel')}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    Community Certificate demand is predicted to increase by <strong className="text-green-700 font-bold">~18%</strong> next month.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
              </div>

              {/* Insight 2 */}
              <div 
                onClick={() => onNavigate('predictive-intel')}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all cursor-pointer flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    <strong className="text-amber-700 font-bold">~1,240</strong> applications are at high risk of SLA delay (≥ 3 days).
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
              </div>

              {/* Insight 3 */}
              <div 
                onClick={() => onNavigate('predictive-intel')}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    Workload is expected to increase by <strong className="text-blue-700 font-bold">~22%</strong> in Chennai and Kanchipuram districts.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROW 2: SERVICE DEMAND FORECAST | CITIZEN SENTIMENT | SYSTEM HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 5A. Service Demand Forecast (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Service Demand Forecast</h2>
            </div>
            <select 
              value={forecastHorizon}
              onChange={(e) => setForecastHorizon(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 bg-slate-50 focus:outline-hidden"
            >
              <option>Next 3 Months</option>
              <option>Next 6 Months</option>
              <option>Next 30 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-4 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#C4B5FD]"></span>
              Historical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-purple-600 border border-purple-700"></span>
              Forecast
            </span>
          </div>

          {/* Forecast Chart */}
          <div className="h-40 flex items-end justify-between gap-4 px-3 pt-2 border-b border-slate-100">
            {/* Oct */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[11px] font-bold text-slate-700 mb-1">24.8K</span>
              <div style={{ height: '60%' }} className="w-full bg-[#C4B5FD] rounded-t-md" />
              <span className="text-xs text-slate-500 mt-2 font-medium">Oct</span>
            </div>

            {/* Nov */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[11px] font-bold text-slate-700 mb-1">26.3K</span>
              <div style={{ height: '66%' }} className="w-full bg-[#C4B5FD] rounded-t-md" />
              <span className="text-xs text-slate-500 mt-2 font-medium">Nov</span>
            </div>

            {/* Dec */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[11px] font-bold text-slate-700 mb-1">28.7K</span>
              <div style={{ height: '74%' }} className="w-full bg-[#C4B5FD] rounded-t-md" />
              <span className="text-xs text-slate-500 mt-2 font-medium">Dec</span>
            </div>

            {/* Jan (Forecast) */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[11px] font-black text-purple-700 mb-1">33.9K</span>
              <div 
                style={{ 
                  height: '88%',
                  backgroundImage: 'repeating-linear-gradient(45deg, #7C3AED, #7C3AED 4px, #6D28D9 4px, #6D28D9 8px)'
                }} 
                className="w-full rounded-t-md shadow-xs" 
              />
              <span className="text-[11px] text-purple-700 mt-2 font-bold whitespace-nowrap">Jan (Forecast)</span>
            </div>
          </div>
        </div>

        {/* 5B. Citizen Sentiment (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smile className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Citizen Sentiment (This Month)</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* Donut Chart */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="16" />
                {/* Positive 72.4% (stroke-dasharray 173 67) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="173 67" strokeDashoffset="0" />
                {/* Neutral 16.8% (stroke-dasharray 40 200) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#06B6D4" strokeWidth="16" strokeDasharray="40 200" strokeDashoffset="-173" />
                {/* Negative 10.8% (stroke-dasharray 26 214) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#EF4444" strokeWidth="16" strokeDasharray="26 214" strokeDashoffset="-213" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-black text-slate-900 leading-tight">87,560</span>
                <span className="text-[10px] font-semibold text-slate-400">Feedback</span>
              </div>
            </div>

            {/* Sentiment Legend */}
            <div className="flex-1 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">😊</span>
                  Positive
                </span>
                <span className="font-bold text-slate-800 text-[11px]">72.4% (63,414)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-[10px]">😐</span>
                  Neutral
                </span>
                <span className="font-bold text-slate-800 text-[11px]">16.8% (14,706)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px]">☹️</span>
                  Negative
                </span>
                <span className="font-bold text-slate-800 text-[11px]">10.8% (9,440)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5C. System & Integration Health (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">System & Integration Health</h2>
            </div>
            <button 
              onClick={() => onNavigate('infrastructure')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Backend API */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Backend API</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            {/* Database */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Database</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            {/* Redis Cache */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Redis Cache</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            {/* AI Services */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">AI Services</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            {/* Storage */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Storage</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            {/* Integrations */}
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Integrations</span>
                <span className="text-[10px] text-green-600 font-medium">Operational</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 6. ROW 3: RECENT AI ACTIVITIES & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 6A. Recent AI Activities (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent AI Activities</h2>
            </div>
            <button 
              onClick={() => onNavigate('governance-overview')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] text-slate-400 font-medium">
                  <th className="py-2 px-2">Time</th>
                  <th className="py-2 px-2">Activity</th>
                  <th className="py-2 px-2">Module</th>
                  <th className="py-2 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap font-medium">10:22 AM</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    <span>Document indexed: G.O. Ms. No. 214</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">Knowledge Centre</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Completed (2,340 chunks)
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap font-medium">10:05 AM</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    <span>Delay prediction job executed</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">Predictive Intelligence</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Completed (1,42,390 records)
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap font-medium">09:48 AM</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span>Anomaly alert generated (Batch-112)</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">Fraud Intelligence</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3" />
                      Under Review (12 alerts)
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap font-medium">09:30 AM</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                    <span>Sentiment analysis completed (Tamil)</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">Citizen Sentiment</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Completed (8,560 feedbacks)
                    </span>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap font-medium">09:10 AM</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>Model v2.3 evaluation run</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">AI Model Management</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Completed (F1: 0.92)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6B. Quick Actions (5 Cols - 8 action buttons) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Quick Actions</h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {/* 1. Upload Document */}
            <button
              onClick={() => onQuickAction('upload-document')}
              className="p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Upload Document</span>
            </button>

            {/* 2. Search Knowledge */}
            <button
              onClick={() => onQuickAction('search-knowledge')}
              className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Search Knowledge</span>
            </button>

            {/* 3. Run Prediction */}
            <button
              onClick={() => onQuickAction('run-prediction')}
              className="p-3 rounded-xl border border-slate-100 hover:border-green-200 hover:bg-green-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Run Prediction</span>
            </button>

            {/* 4. Review Anomalies */}
            <button
              onClick={() => onQuickAction('review-anomalies')}
              className="p-3 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Review Anomalies</span>
            </button>

            {/* 5. View Transparency */}
            <button
              onClick={() => onNavigate('public-transparency')}
              className="p-3 rounded-xl border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">View Transparency</span>
            </button>

            {/* 6. Generate Report */}
            <button
              onClick={() => onQuickAction('generate-report')}
              className="p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Generate Report</span>
            </button>

            {/* 7. Manage AI Models */}
            <button
              onClick={() => onQuickAction('manage-models')}
              className="p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">Manage AI Models</span>
            </button>

            {/* 8. System Monitoring */}
            <button
              onClick={() => onNavigate('infrastructure')}
              className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">System Monitoring</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
