import React, { useState } from 'react';
import { 
  Search, Mic, BookOpen, Headphones, FileText, PlayCircle, 
  Download, User, Building2, FileCheck, Users, CreditCard, 
  HelpCircle, Scale, MessageSquare, ChevronRight, ChevronDown, 
  ArrowRight, Phone, Mail, MessageCircle, MapPin, ShieldAlert,
  Home, ExternalLink, Lightbulb
} from 'lucide-react';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';

interface CitizenHelpSupportPageProps {
  isTamil: boolean;
  onNavigate: (page: any) => void;
  onOpenAIAssistant: () => void;
}

export const CitizenHelpSupportPage: React.FC<CitizenHelpSupportPageProps> = ({
  isTamil,
  onNavigate,
  onOpenAIAssistant
}) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedFaqPill, setSelectedFaqPill] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketInput, setTicketInput] = useState('');
  const [ticketStatus, setTicketStatus] = useState<string | null>(null);

  const categories = [
    { id: 'account', label: 'Account & Login', labelTa: 'கணக்கு & உள்நுழைவு', sub: 'Registration, password, profile', icon: <User className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 text-blue-700' },
    { id: 'services', label: 'Government Services', labelTa: 'அரசு சேவைகள்', sub: 'Service process, eligibility, fees', icon: <Building2 className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 text-emerald-700' },
    { id: 'certificates', label: 'Certificates & Documents', labelTa: 'சான்றிதழ்கள் & ஆவணங்கள்', sub: 'Downloads, verification, formats', icon: <FileCheck className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 text-purple-700' },
    { id: 'applications', label: 'Applications & Tracking', labelTa: 'விண்ணப்பங்கள் & கண்காணிப்பு', sub: 'Status, updates, reminders', icon: <Users className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 text-amber-700' },
    { id: 'payments', label: 'Payments & Fees', labelTa: 'கட்டணம் & செலுத்துதல்', sub: 'Online payment, refunds', icon: <CreditCard className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 text-rose-700' },
    { id: 'tech', label: 'Technical Issues', labelTa: 'தொழில்நுட்ப சிக்கல்கள்', sub: 'Website, portal, error fixes', icon: <HelpCircle className="w-4 h-4 text-sky-600" />, bg: 'bg-sky-50 text-sky-700' },
    { id: 'grievance', label: 'Grievance & Complaints', labelTa: 'குறைதீர்ப்பு & புகார்கள்', sub: 'File complaint, follow up', icon: <Scale className="w-4 h-4 text-indigo-600" />, bg: 'bg-indigo-50 text-indigo-700' },
    { id: 'other', label: 'Other Support', labelTa: 'பிற உதவிகள்', sub: 'General queries, suggestions', icon: <MessageSquare className="w-4 h-4 text-slate-600" />, bg: 'bg-slate-50 text-slate-700' }
  ];

  const faqs = [
    {
      q: 'How can I apply for an income certificate?',
      qTa: 'வருமானச் சான்றிதழுக்கு எவ்வாறு விண்ணப்பிப்பது?',
      a: 'Go to Citizen Portal > Apply Here or Government Services > Income Certificate. Select your Taluk and District, attach your ration card and salary slip/affidavit, review details, and submit. The statutory SLA is 7 working days by the Revenue Department.',
      cat: 'Services'
    },
    {
      q: 'What are the documents required for a driving licence?',
      qTa: 'ஓட்டுநர் உரிமத்திற்கு தேவையான ஆவணங்கள் யாவை?',
      a: 'Aadhaar Card, Proof of Age (SSLC mark sheet / Birth Certificate), Proof of Address, Medical Fitness Certificate (Form 1A for commercial), and valid Learner Licence (LLR) minimum 30 days old.',
      cat: 'Certificates'
    },
    {
      q: 'How can I check my application status?',
      qTa: 'எனது விண்ணப்ப நிலையை எவ்வாறு சரிபார்ப்பது?',
      a: 'You can check anytime in "My Applications" using your Application Reference Number (e.g., TNIC25011839). You will also receive automatic SMS updates at each verification stage.',
      cat: 'Applications'
    },
    {
      q: 'How do I reset my password?',
      qTa: 'எனது கடவுச்சொல்லை எவ்வாறு மீட்டமைப்பது?',
      a: 'Click on "Forgot Password" on the citizen login page, enter your registered Aadhaar or mobile number, verify the 6-digit OTP received, and set a new password.',
      cat: 'Others'
    },
    {
      q: 'Is there any fee for downloading certificates?',
      qTa: 'சான்றிதழ்களை பதிவிறக்கம் செய்ய கட்டணம் ஏதேனும் உள்ளதா?',
      a: 'No, downloading officially verified and digitally signed certificates from GovAI Nexus / e-Sevai portal is completely free of cost.',
      cat: 'Payments'
    },
    {
      q: 'How can I update my mobile number in my profile?',
      qTa: 'எனது சுயவிவரத்தில் மொபைல் எண்ணை எவ்வாறு புதுப்பிப்பது?',
      a: 'Mobile number synchronization is linked directly to your Aadhaar profile. Once updated at an Aadhaar Seva Kendra, click "Sync DigiLocker" in your profile to update it instantly.',
      cat: 'Others'
    },
    {
      q: 'What should I do if I face a technical issue on the portal?',
      qTa: 'வலைதளத்தில் தொழில்நுட்ப சிக்கல் ஏற்பட்டால் நான் என்ன செய்ய வேண்டும்?',
      a: 'Clear browser cache and retry. If issues persist, raise a ticket via Help & Support or call our Toll-Free Helpline 1800-425-1515.',
      cat: 'Others'
    },
    {
      q: 'How can I file a grievance against a department?',
      qTa: 'ஒரு துறைக்கு எதிராக குறைதீர்ப்பு மனுவை எவ்வாறு பதிவு செய்வது?',
      a: 'Navigate to "Grievance & Feedback", click "Raise a New Grievance", pick the concerned department, provide location details, and submit for direct escalation to the District Collector.',
      cat: 'Services'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesSearch = f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFaqPill !== 'All' && f.cat !== selectedFaqPill) return false;
    return true;
  });

  const handleTicketCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;
    setTicketStatus(`Ticket #${ticketInput.trim()} is currently ACTIVE. Assigned to TNeGA Senior Support Engineer. Resolution ETA: Within 4 Hours.`);
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
              {isTamil ? 'உதவி & ஆதரவு' : 'Help & Support'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {isTamil 
              ? 'அரசு சேவைகள் தொடர்பான உதவிகளைப் பெறலாம், பதில்களைக் கண்டறியலாம் மற்றும் சிக்கல்களைத் தீர்க்கலாம். நாங்கள் உங்களுக்கு உதவ எப்போதும் தயாராக உள்ளோம்!'
              : 'Get assistance, find answers, and resolve issues related to government services. We are here to help you!'}
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
                Get instant help, resolve issues, and get guidance for any service or application.
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
        <span className="font-bold text-slate-800">Help & Support</span>
      </div>

      {/* ========================================================================= */}
      {/* 3. 5 ACTION CARDS HORIZONTAL STRIP                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div 
          onClick={() => {
            const el = document.getElementById('faq-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-slate-900">FAQs</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Find answers to common questions</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        </div>

        <div 
          onClick={() => {
            const el = document.getElementById('contact-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-slate-900">Contact Support</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Talk to our support team</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        </div>

        <div 
          onClick={() => {
            const el = document.getElementById('track-request-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-slate-900">Track Your Request</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Check status of your complaint</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        </div>

        <div 
          onClick={() => alert('Launching official Tamil Nadu e-Governance video training tutorials...')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <PlayCircle className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-slate-900">Video Guides</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Step-by-step tutorials</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        </div>

        <div 
          onClick={() => alert('Downloading comprehensive Citizen Portal User Manual PDF (18 MB)...')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-slate-900">User Manual</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Download guides & manuals</p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 3-COLUMN CONTENT SPLIT: Left (Categories), Center (FAQs), Right (Contact)*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (lg:col-span-3): Browse by Category */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-base">📁</span>
              <h3 className="font-extrabold text-sm text-slate-900">Browse by Category</h3>
            </div>
            <div className="space-y-1">
              {categories.map((c) => {
                const isSelected = selectedCat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCat(isSelected ? 'all' : c.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-purple-50 border border-purple-200 text-purple-900 font-bold' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                        {c.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{isTamil ? c.labelTa : c.label}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{c.sub}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN (lg:col-span-6): Frequently Asked Questions */}
        <div id="faq-section" className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-extrabold text-sm text-slate-900">Frequently Asked Questions</h3>
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {['All', 'Services', 'Certificates', 'Applications', 'Payments', 'Others'].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedFaqPill(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedFaqPill === p
                      ? 'bg-purple-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-2 pt-1">
              {filteredFaqs.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {isTamil ? f.qTa : f.q}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-purple-700 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80 pt-2 bg-white">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setSelectedFaqPill('All')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Important Notice Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <h4 className="font-extrabold text-slate-900">Important Notice</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Do not share your OTP, password or personal details with anyone. Government officials will never ask for your password or OTP.
              </p>
            </div>
            <button 
              onClick={() => alert('DPDP Act 2023 Security & Aadhaar Data Protection advisory.')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (lg:col-span-3): Contact Support + Track + Need Help */}
        <div className="lg:col-span-3 space-y-4">
          {/* Card 1: Contact Support */}
          <div id="contact-card" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <Headphones className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Contact Support</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">1800-425-1515</div>
                  <div className="text-[10px] text-slate-500">Toll Free (9:00 AM – 6:00 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">support@tn.gov.in</div>
                  <div className="text-[10px] text-slate-500">Email Support</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Live Chat</div>
                  <div className="text-[10px] text-slate-500">Chat with our support team</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Nearest CSC Centre</div>
                  <div className="text-[10px] text-slate-500">Find nearby service centre</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Track Your Request */}
          <div id="track-request-card" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-700">
              <FileText className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Track Your Request</h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Enter your reference number to check the status of your complaint or support request.
            </p>
            <form onSubmit={handleTicketCheck} className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="Enter Reference / Ticket Number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Check Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {ticketStatus && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                {ticketStatus}
              </div>
            )}
          </div>

          {/* Card 3: Need more help? (with 3D Mascot) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-purple-700">
              <Lightbulb className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-slate-900">Need more help?</h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our AI assistant can guide you with step-by-step instructions and solutions.
            </p>
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={onOpenAIAssistant}
                className="py-2 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ask GovAI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0 shadow-xs">
                <img src={botMascotImg} alt="Mascot" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          GovAI Nexus | Government of Tamil Nadu | Empowering Citizens with Digital Governance
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button onClick={() => alert('Privacy Policy')} className="hover:text-purple-700">Privacy Policy</button>
          <span>|</span>
          <button onClick={() => alert('Terms & Conditions')} className="hover:text-purple-700">Terms & Conditions</button>
          <span>|</span>
          <button onClick={() => alert('Help & Support')} className="hover:text-purple-700">Help</button>
        </div>
      </div>
    </div>
  );
};
