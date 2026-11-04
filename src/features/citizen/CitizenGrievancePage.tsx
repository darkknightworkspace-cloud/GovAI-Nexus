import React, { useState } from 'react';
import { 
  Search, Mic, FileText, CheckCircle2, Clock, Hourglass, 
  Star, PlusCircle, ArrowRight, ChevronRight, ChevronLeft,
  Building2, Droplets, HeartPulse, HeartHandshake, FileCheck,
  MoreVertical, Home, MessageSquare, Phone, Scale, ShieldAlert,
  Send, ExternalLink
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenGrievancePageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
}

export const CitizenGrievancePage: React.FC<CitizenGrievancePageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'resolved' | 'awaiting'>('all');
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [rating, setRating] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);

  const grievances = [
    {
      id: 'GRV20261028341',
      subject: 'Road Repair Required',
      subjectTa: 'சாலை பழுதுபார்த்தல் தேவை',
      category: 'Damaged road and potholes',
      dept: 'Highways Dept.',
      deptTa: 'நெடுஞ்சாலைத் துறை',
      submittedOn: '28 Oct 2026',
      status: 'In Progress',
      statusType: 'in_progress',
      iconType: 'road',
      description: 'Major potholes near Madurai Meenakshi Amman Temple west tower causing vehicular congestion. Field engineer inspection scheduled.'
    },
    {
      id: 'GRV20261025678',
      subject: 'Water Supply Issue',
      subjectTa: 'குடிநீர் விநியோகப் பிரச்சினை',
      category: 'Irregular water supply in my area',
      dept: 'Municipal Admin.',
      deptTa: 'நகராட்சி நிர்வாகம்',
      submittedOn: '25 Oct 2026',
      status: 'Awaiting Action',
      statusType: 'awaiting',
      iconType: 'water',
      description: 'Intermittent water distribution in Ward 14. Assigned to Municipal Assistant Engineer for valve calibration.'
    },
    {
      id: 'GRV20261022896',
      subject: 'PHC Facility Improvement',
      subjectTa: 'ஆரம்ப சுகாதார நிலைய வசதி மேம்பாடு',
      category: 'Request for additional staff',
      dept: 'Health Dept.',
      deptTa: 'மக்கள் நல்வாழ்வுத் துறை',
      submittedOn: '22 Oct 2026',
      status: 'In Progress',
      statusType: 'in_progress',
      iconType: 'health',
      description: 'Night duty staff nurse requisition forwarded to Deputy Director of Health Services (DDHS).'
    },
    {
      id: 'GRV20261020871',
      subject: 'Scheme Benefit Not Received',
      subjectTa: 'திட்ட உதவித் தொகை பெறப்படவில்லை',
      category: 'Applied but not received the benefit',
      dept: 'Social Welfare',
      deptTa: 'சமூக நலத்துறை',
      submittedOn: '20 Oct 2026',
      status: 'Resolved',
      statusType: 'resolved',
      iconType: 'welfare',
      description: 'DBT bank IFSC code re-verified and pending instalment of ₹1,000 credited to beneficiary Aadhaar linked account.'
    },
    {
      id: 'GRV20261018654',
      subject: 'Certificate Delay',
      subjectTa: 'சான்றிதழ் தாமதம்',
      category: 'Income certificate delayed',
      dept: 'Revenue Dept.',
      deptTa: 'வருவாய்த் துறை',
      submittedOn: '18 Oct 2026',
      status: 'Resolved',
      statusType: 'resolved',
      iconType: 'revenue',
      description: 'Zonal Deputy Tahsildar approved and digitally signed the Income Certificate. Available in My Documents.'
    }
  ];

  const filteredGrievances = grievances.filter(g => {
    if (activeTab === 'in_progress') return g.statusType === 'in_progress';
    if (activeTab === 'resolved') return g.statusType === 'resolved';
    if (activeTab === 'awaiting') return g.statusType === 'awaiting';
    return true;
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const match = grievances.find(g => g.id.toLowerCase().includes(trackInput.trim().toLowerCase()));
    if (match) {
      setTrackResult(`GRIEVANCE ${match.id} (${match.subject}): Status is ${match.status}. ${match.description}`);
    } else {
      setTrackResult(`TN-CM Special Cell: Grievance ID ${trackInput} received. Assigned to Revenue Divisional Officer for resolution.`);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
    }, 4000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">In Progress</span>;
      case 'Awaiting Action':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">Awaiting Action</span>;
      case 'Resolved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Resolved</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">{status}</span>;
    }
  };

  const getGrievanceIcon = (type: string) => {
    switch (type) {
      case 'road':
        return <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0"><Building2 className="w-4 h-4" /></div>;
      case 'water':
        return <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0"><Droplets className="w-4 h-4" /></div>;
      case 'health':
        return <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0"><HeartPulse className="w-4 h-4" /></div>;
      case 'welfare':
        return <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0"><HeartHandshake className="w-4 h-4" /></div>;
      case 'revenue':
        return <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0"><FileCheck className="w-4 h-4" /></div>;
      default:
        return <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>;
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
              {isTamil ? 'குறைதீர்ப்பு & கருத்து' : 'Grievance & Feedback'}
            </h1>
            <span className="text-2xl">📢</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil 
              ? 'குறைதீர்ப்பு மனுவை பதிவு செய்யவும், அதன் நிலையை கண்காணிக்கவும் மற்றும் சிறந்த தமிழ்நாட்டிற்கான உங்கள் கருத்துக்களை பகிரவும்.'
              : 'Raise a grievance, track its status, and share your feedback on government services, schemes and facilities for a better Tamil Nadu.'}
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
                Need help to raise a grievance, choose the right department or check status?
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
        <span className="font-bold text-slate-800">Grievance & Feedback</span>
      </div>

      {/* ========================================================================= */}
      {/* 3. 5-METRIC RIBBON                                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">18</div>
            <div className="text-[11px] text-slate-500 font-medium">Total Grievances</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">11</div>
            <div className="text-[11px] text-slate-500 font-medium">Resolved</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">4</div>
            <div className="text-[11px] text-slate-500 font-medium">In Progress</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">2</div>
            <div className="text-[11px] text-slate-500 font-medium">Awaiting Action</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">4.6 / 5</div>
            <div className="text-[11px] text-slate-500 font-medium">Overall Service Rating</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 4 ACTION CARDS HORIZONTAL STRIP                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Raise a New Grievance (Primary Purple Card) */}
        <div 
          onClick={() => setShowRaiseModal(true)}
          className="bg-linear-to-r from-purple-700 to-indigo-700 text-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm">Raise a New Grievance</h4>
              <p className="text-[10px] text-purple-200 leading-tight mt-0.5">
                Report an issue, service delay, or any government concern
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-white text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Track Grievance */}
        <div 
          onClick={() => {
            const id = prompt('Enter Grievance Tracking ID:');
            if (id) {
              setTrackInput(id);
              const match = grievances.find(g => g.id.toLowerCase().includes(id.toLowerCase()));
              if (match) setSelectedGrievance(match);
            }
          }}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Track Grievance</h4>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Check the status of your submitted grievance
            </p>
          </div>
        </div>

        {/* Card 3: Give Feedback */}
        <div 
          onClick={() => {
            const el = document.getElementById('feedback-box');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Give Feedback</h4>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Share your experience on a service, scheme or portal
            </p>
          </div>
        </div>

        {/* Card 4: My Feedbacks */}
        <div 
          onClick={() => alert('Displaying 3 previously submitted citizen service feedback reviews.')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">My Feedbacks</h4>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              View and manage your submitted feedback
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MAIN CONTENT SPLIT (Left: Table/List, Right: Track + Feedback + Links) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / CENTER (lg:col-span-8): Grievances Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">📄 My Grievances (18)</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All (18)
              </button>

              <button
                onClick={() => setActiveTab('in_progress')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'in_progress'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-3 h-3 text-amber-500" />
                <span>In Progress (4)</span>
              </button>

              <button
                onClick={() => setActiveTab('resolved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'resolved'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Resolved (11)</span>
              </button>

              <button
                onClick={() => setActiveTab('awaiting')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'awaiting'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Hourglass className="w-3 h-3 text-purple-500" />
                <span>Awaiting Action (2)</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Grievance ID</th>
                    <th className="p-3.5">Subject / Category</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Submitted On</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGrievances.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getGrievanceIcon(g.iconType)}
                          <span>{g.id}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-extrabold text-slate-900 text-xs">
                          {isTamil ? g.subjectTa : g.subject}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {g.category}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium whitespace-nowrap">
                        {isTamil ? g.deptTa : g.dept}
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">
                        {g.submittedOn}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {getStatusBadge(g.status)}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedGrievance(g)}
                            className="px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 cursor-pointer"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => setSelectedGrievance(g)}
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
            <span>Showing 1 – 5 of 18 grievances</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button className="w-7 h-7 rounded-lg bg-purple-700 text-white font-bold flex items-center justify-center">1</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">4</button>
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

        {/* RIGHT SIDEBAR (lg:col-span-4): Track + Feedback + Links */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Track Grievance */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <Search className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Track Grievance</h3>
            </div>
            <form onSubmit={handleTrackSubmit} className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="Enter Grievance ID (e.g., GRV20261028341)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Track Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {trackResult && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                {trackResult}
              </div>
            )}
          </div>

          {/* Card 2: Feedback on Services */}
          <div id="feedback-box" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <Star className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Feedback on Services</h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Rate and share your experience with government services and schemes.
            </p>

            {feedbackSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-xs">Thank You for Your Feedback!</h5>
                <p className="text-[10px] text-slate-500">Your rating helps the Tamil Nadu Digital Governance mission improve delivery standards.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>

                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Write your feedback..."
                  rows={3}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:border-purple-600 focus:outline-hidden"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Submit Feedback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Card 3: Useful Links */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <span className="text-base">🔗</span>
              <h3 className="font-extrabold text-sm text-slate-900">Useful Links</h3>
            </div>
            <div className="space-y-1 text-xs">
              <button 
                onClick={() => alert('CM Special Cell Grievance Redressal Statutory SLA: 15 Working Days.')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-700" />
                  <span>Grievance Redressal Policy</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => alert('Official departmental helpline directory across all 38 districts.')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>Department Contact Directory</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => alert('First Appellate Authority: District Collector / Department Secretary.')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-700" />
                  <span>Escalation / Appeal Process</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => onNavigate('help-support')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-700" />
                  <span>TNeGA / E-Sevai Support</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Raise Grievance */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Raise New Public Grievance</h3>
              <button 
                onClick={() => setShowRaiseModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Department</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-xl bg-white">
                  <option>Revenue & Disaster Management</option>
                  <option>Highways & Minor Ports</option>
                  <option>Municipal Administration & Water Supply</option>
                  <option>Health & Family Welfare</option>
                  <option>Social Welfare & Women Empowerment</option>
                  <option>School Education Department</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject / Issue Summary</label>
                <input 
                  type="text" 
                  placeholder="e.g. Street lighting repair or scholarship delay"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description & Location</label>
                <textarea 
                  rows={4}
                  placeholder="Provide precise ward number, street name or application registration reference..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowRaiseModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRaiseModal(false);
                  alert('Grievance lodged successfully! Assigned reference: GRV20261103001. SMS confirmation dispatched.');
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Grievance Details */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedGrievance.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedGrievance.subject}</h3>
                <p className="text-xs text-slate-500">{selectedGrievance.dept}</p>
              </div>
              <button 
                onClick={() => setSelectedGrievance(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900">Current Status:</span>
                <div className="mt-1">{getStatusBadge(selectedGrievance.status)}</div>
                <p className="text-slate-600 mt-2">{selectedGrievance.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div><span className="text-slate-400">Lodged On:</span> {selectedGrievance.submittedOn}</div>
                <div><span className="text-slate-400">Resolution SLA:</span> 15 Working Days</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedGrievance(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedGrievance(null);
                  alert(`Escalating grievance ${selectedGrievance.id} to District Collector Appellate Authority...`);
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-xl text-xs font-bold text-white"
              >
                Escalate / Appeal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
