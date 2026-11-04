import React, { useState } from 'react';
import { 
  Search, Mic, Calendar, Settings, Download, Bell, 
  Clock, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight,
  Car, FileText, Store, Home as HomeIcon, MoreVertical,
  Home, ExternalLink, ShieldAlert, PlusCircle, Check
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenRenewalsPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
  onStartRenewalWizard?: (title: string) => void;
}

export const CitizenRenewalsPage: React.FC<CitizenRenewalsPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant,
  onStartRenewalWizard
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'due' | 'due_soon' | 'upcoming' | 'valid'>('all');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [appAlerts, setAppAlerts] = useState(true);
  const [earlyDays, setEarlyDays] = useState('30 Days');
  const [showAddModal, setShowAddModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const records = [
    {
      id: 'rec-1',
      title: 'Driving Licence (DL)',
      titleTa: 'ஓட்டுநர் உரிமம் (DL)',
      dept: 'Transport Department',
      deptTa: 'போக்குவரத்துத் துறை',
      number: 'TN25DL5009345',
      validTill: '15 Nov 2026',
      daysLeft: 12,
      status: 'Renewal Due',
      statusType: 'due',
      iconType: 'car_purple'
    },
    {
      id: 'rec-2',
      title: 'Vehicle Registration (RC)',
      titleTa: 'வாகனப் பதிவு (RC)',
      dept: 'Transport Department',
      deptTa: 'போக்குவரத்துத் துறை',
      number: 'TN25RC5087342',
      validTill: '28 Nov 2026',
      daysLeft: 25,
      status: 'Due Soon',
      statusType: 'due_soon',
      iconType: 'car_orange'
    },
    {
      id: 'rec-3',
      title: 'Community Certificate',
      titleTa: 'சமூகச் சான்றிதழ்',
      dept: 'Revenue Department',
      deptTa: 'வருவாய்த் துறை',
      number: 'TNCC25010721',
      validTill: '10 Dec 2026',
      daysLeft: 37,
      status: 'Due Soon',
      statusType: 'due_soon',
      iconType: 'doc_blue'
    },
    {
      id: 'rec-4',
      title: 'Income Certificate',
      titleTa: 'வருமானச் சான்றிதழ்',
      dept: 'Revenue Department',
      deptTa: 'வருவாய்த் துறை',
      number: 'TNIC25011839',
      validTill: '05 Jan 2027',
      daysLeft: 63,
      status: 'Upcoming',
      statusType: 'upcoming',
      iconType: 'id_blue'
    },
    {
      id: 'rec-5',
      title: 'Trade Licence',
      titleTa: 'வணிக உரிமம்',
      dept: 'Municipal Administration',
      deptTa: 'நகராட்சி நிர்வாகம்',
      number: 'TNLB25007621',
      validTill: '20 Feb 2027',
      daysLeft: 109,
      status: 'Upcoming',
      statusType: 'valid',
      iconType: 'store_orange'
    }
  ];

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.dept.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'due') return r.statusType === 'due';
    if (activeTab === 'due_soon') return r.statusType === 'due_soon';
    if (activeTab === 'upcoming') return r.statusType === 'upcoming';
    if (activeTab === 'valid') return r.daysLeft > 90;
    return true;
  });

  const getRecordIcon = (iconType: string) => {
    switch (iconType) {
      case 'car_purple':
        return <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0"><Car className="w-5 h-5" /></div>;
      case 'car_orange':
        return <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0"><Car className="w-5 h-5" /></div>;
      case 'doc_blue':
        return <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>;
      case 'id_blue':
        return <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>;
      case 'store_orange':
        return <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 flex items-center justify-center shrink-0"><Store className="w-5 h-5" /></div>;
      default:
        return <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>;
    }
  };

  const getDaysLeftBadge = (days: number) => {
    if (days <= 15) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
          <Calendar className="w-3 h-3 text-rose-600" />
          <span>{days} Days</span>
        </span>
      );
    }
    if (days <= 60) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
          <Calendar className="w-3 h-3 text-amber-600" />
          <span>{days} Days</span>
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
        <Calendar className="w-3 h-3 text-blue-600" />
        <span>{days} Days</span>
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Renewal Due':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">Renewal Due</span>;
      case 'Due Soon':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">Due Soon</span>;
      case 'Upcoming':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Upcoming</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">{status}</span>;
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
              {isTamil ? 'புதுப்பித்தல் & நினைவூட்டல்' : 'Renewal & Reminders'}
            </h1>
            <span className="text-2xl">🗓️</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil 
              ? 'உங்கள் அரசு ஆவணங்கள், உரிமங்கள் மற்றும் அனுமதிகளை புதுப்பித்த நிலையில் வைத்திருக்கவும். சரியான நேரத்தில் நினைவூட்டல்கள் மற்றும் ஒரே கிளிக்கில் புதுப்பித்தல்.'
              : 'Keep your government documents, licences and permits up to date. Get timely reminders, renewal alerts and one-click renewal services.'}
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
                Get reminder alerts, renewal steps and required documents instantly.
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
        <span className="font-bold text-slate-800">Renewal & Reminders</span>
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
            placeholder="Search your documents, licences or services (e.g., Driving Licence, RC, Community Certificate...)"
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
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-700" />
            <span>Add Reminder</span>
          </button>

          <button
            onClick={() => alert('Reminder preferences configured to daily digest.')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-purple-700" />
            <span>Reminder Settings</span>
          </button>

          <button
            onClick={() => alert('Downloading renewal schedules PDF summary...')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-700" />
            <span>Download List</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 5-METRIC RIBBON                                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">12</div>
            <div className="text-[11px] text-slate-500 font-medium">Total Records</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3</div>
            <div className="text-[11px] text-slate-500 font-medium">Renewal Due (≤ 30 Days)</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">4</div>
            <div className="text-[11px] text-slate-500 font-medium">Due Soon (31 – 60 Days)</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">2</div>
            <div className="text-[11px] text-slate-500 font-medium">Upcoming (61 – 90 Days)</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3</div>
            <div className="text-[11px] text-slate-500 font-medium">Valid (&gt; 90 Days)</div>
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
          All Records (12)
        </button>

        <button
          onClick={() => setActiveTab('due')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'due'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          <span>Renewal Due (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('due_soon')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'due_soon'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Due Soon (4)</span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>Upcoming (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('valid')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'valid'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Valid (3)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 6. MAIN CONTENT SPLIT (Left: Table/List, Right: Calendar & Settings)       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / CENTER (lg:col-span-8): Documents & Licences List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">📄 My Documents & Licences (12)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Sort by:</span>
              <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800">
                <option>Renewal Date (Nearest)</option>
                <option>Days Left (Ascending)</option>
                <option>Document Name</option>
              </select>
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
                    <th className="p-3.5">Document / Service</th>
                    <th className="p-3.5">Number / Reference</th>
                    <th className="p-3.5">Valid Till</th>
                    <th className="p-3.5">Days Left</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <input 
                          type="checkbox" 
                          checked={!!checkedItems[r.id]} 
                          onChange={() => toggleCheck(r.id)} 
                          className="rounded text-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          {getRecordIcon(r.iconType)}
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">
                              {isTamil ? r.titleTa : r.title}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {isTamil ? r.deptTa : r.dept}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-slate-700 whitespace-nowrap">
                        {r.number}
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">
                        {r.validTill}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {getDaysLeftBadge(r.daysLeft)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {getStatusBadge(r.status)}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {r.status === 'Renewal Due' || r.status === 'Due Soon' ? (
                            <button
                              onClick={() => {
                                if (onStartRenewalWizard) {
                                  onStartRenewalWizard(r.title);
                                } else {
                                  onNavigate('apply');
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>Renew Now</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Showing validity and lifecycle records for ${r.number}...`)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 text-purple-700 hover:bg-purple-50 flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button 
                            onClick={() => alert(`Setting custom snooze reminder for ${r.title}...`)}
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 hover:text-purple-700 flex items-center justify-center transition-colors cursor-pointer text-slate-400"
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
            <span>Showing 1 – 5 of 12 records</span>
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
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (lg:col-span-4): Upcoming Renewals + Calendar + Settings */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Upcoming Renewals */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-slate-900">Upcoming Renewals</h3>
              </div>
              <button 
                onClick={() => setActiveTab('due')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-bold text-slate-900">Driving Licence (DL)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800">
                  Due in 12 Days
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-slate-900">Vehicle Registration (RC)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                  Due in 25 Days
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-slate-900">Community Certificate</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                  Due in 37 Days
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Reminder Calendar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-slate-900">Reminder Calendar</h3>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-800 px-1">
              <button className="text-slate-400 hover:text-slate-700">&lt;</button>
              <span>November 2026</span>
              <button className="text-slate-400 hover:text-slate-700">&gt;</button>
            </div>

            {/* Calendar Grid */}
            <div className="text-center text-[10px]">
              <div className="grid grid-cols-7 gap-1 font-bold text-slate-400 pb-1 border-b border-slate-100">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-1 pt-2 font-medium text-slate-700">
                <span className="text-slate-300">1</span>
                <span className="text-slate-300">2</span>
                <span className="text-slate-300">3</span>
                <span className="text-slate-300">4</span>
                <span className="text-slate-300">5</span>
                <span className="text-slate-300">6</span>
                <span className="text-slate-300">7</span>

                <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
                <span className="w-6 h-6 mx-auto rounded-full bg-rose-600 text-white font-bold flex items-center justify-center">15</span>
                <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
                <span>22</span><span>23</span><span>24</span>
                <span className="w-6 h-6 mx-auto rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">25</span>
                <span>26</span><span>27</span>
                <span className="w-6 h-6 mx-auto rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">28</span>
                <span>29</span><span>30</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[10px] text-slate-600 font-medium">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-600" /><span>Renewal Due</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /><span>Due Soon</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /><span>Upcoming</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600" /><span>Other Reminder</span></div>
            </div>
          </div>

          {/* Card 3: Reminder Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <Settings className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Reminder Settings</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Email Reminders</span>
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    emailAlerts ? 'bg-purple-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    emailAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">SMS Reminders</span>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    smsAlerts ? 'bg-purple-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    smsAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">App Notifications</span>
                <button
                  type="button"
                  onClick={() => setAppAlerts(!appAlerts)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    appAlerts ? 'bg-purple-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    appAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-700">Early Reminder (Days)</span>
                <select 
                  value={earlyDays}
                  onChange={(e) => setEarlyDays(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800"
                >
                  <option>15 Days</option>
                  <option>30 Days</option>
                  <option>60 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Government Service Reminder</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service / Licence Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Passport, Gun Licence, Property Tax"
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Expiry / Renewal Deadline</label>
                <input 
                  type="date" 
                  defaultValue="2026-12-31"
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-xl bg-white">
                  <option>Transport Department</option>
                  <option>Revenue Department</option>
                  <option>Municipal Administration</option>
                  <option>Civil Supplies & Consumer Protection</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  alert('Custom statutory alert scheduled! Synchronized with SMS gateway.');
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white"
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
