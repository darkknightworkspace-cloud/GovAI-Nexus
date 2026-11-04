import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, HelpCircle, MessageSquare, 
  Send, ChevronDown, CheckCircle2, AlertCircle, Building2, ExternalLink
} from 'lucide-react';

interface ContactHelpPageProps {
  language: 'en' | 'ta';
  onNavigateToGrievance: () => void;
}

export const ContactHelpPage: React.FC<ContactHelpPageProps> = ({ language, onNavigateToGrievance }) => {
  const isTamil = language === 'ta';
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ name: '', phone: '', department: 'Revenue', message: '' });

  const faqs = [
    {
      q: 'How do I download my approved Community or Income Certificate?',
      qTa: 'எனது சாதி அல்லது வருமானச் சான்றிதழை எவ்வாறு பதிவிறக்குவது?',
      a: 'Once your application is digitally signed by the Tahsildar, an SMS with the download link is sent to your registered mobile. You can also log into the Citizen Portal or access it directly through DigiLocker.',
      aTa: 'வட்டாட்சியர் ஒப்புதல் அளித்தவுடன், பதிவிறக்க இணைப்புடன் உங்கள் பதிவு செய்யப்பட்ட எண்ணிற்கு குறுஞ்செய்தி அனுப்பப்படும். நீங்கள் குடிமக்கள் தளம் அல்லது டிஜிலாக்கர் மூலமாகவும் பதிவிறக்கலாம்.'
    },
    {
      q: 'What is the statutory SLA timeline for Revenue certificates?',
      qTa: 'வருவாய்த்துறை சான்றிதழ்களுக்கான சேவை காலக்கெடு (SLA) என்ன?',
      a: 'Under the Tamil Nadu Right to Services framework: Income Certificates are issued within 7 working days, Community Certificates within 15 working days, and Residence Certificates within 3 working days.',
      aTa: 'தமிழ்நாடு சேவை பெறும் உரிமை விதிகளின்படி: வருமானச் சான்றிதழ் 7 வேலை நாட்களிலும், சாதிச் சான்றிதழ் 15 வேலை நாட்களிலும், இருப்பிடச் சான்றிதழ் 3 வேலை நாட்களிலும் வழங்கப்படும்.'
    },
    {
      q: 'How does the GovAI Assistant check my scheme eligibility?',
      qTa: 'GovAI உதவியாளர் எனது திட்ட தகுதியை எவ்வாறு சரிபார்க்கிறது?',
      a: 'The GovAI Assistant uses Retrieval-Augmented Generation (RAG) directly grounded in official Tamil Nadu Government Gazettes to match your age, district, income, and educational profile against eligibility criteria.',
      aTa: 'அதிகாரப்பூர்வ தமிழ்நாடு அரசாணைகளின் அடிப்படையில் உங்கள் வயது, வருமானம், மாவட்டம் மற்றும் கல்வித் தகுதியை ஆய்வு செய்து உடனடி வழிகாட்டலை வழங்குகிறது.'
    },
    {
      q: 'What should I do if my application exceeds statutory SLA deadlines?',
      qTa: 'விண்ணப்ப காலக்கெடு மீறப்பட்டால் என்ன செய்வது?',
      a: 'GovAI Nexus automatically flags delayed applications to the District Collector and Department HOD. You can also file a priority appeal directly by dialing 1100 or using the Grievance Redressal tab.',
      aTa: 'காலக்கெடு மீறப்பட்டால் அமைப்பு தானாகவே மாவட்ட ஆட்சியருக்கு எச்சரிக்கை விடுக்கிறது. நீங்கள் 1100 என்ற எண்ணை அழைத்தோ அல்லது குறைதீர்ப்பு தளம் மூலமாகவோ உடனடியாக முறையிடலாம்.'
    }
  ];

  const departmentContacts = [
    { dept: 'Revenue & Disaster Management', email: 'revenue.help@tn.gov.in', phone: '044-25671234', address: 'Ezhilagam, Chepauk, Chennai - 600005' },
    { dept: 'Social Welfare & Women Empowerment', email: 'socialwelfare.help@tn.gov.in', phone: '044-28524455', address: 'Panagal Maligai, Saidapet, Chennai - 600015' },
    { dept: 'Tamil Nadu e-Governance Agency (TNeGA)', email: 'support.govai@tn.gov.in', phone: '044-40344400', address: 'PT Lee Chengalvaraya Naicker Building, Chennai - 600002' },
    { dept: 'Commercial Taxes & Registration', email: 'ctd.helpdesk@tn.gov.in', phone: '044-24640160', address: '100 Feet Road, Gandhinagar, Chennai - 600028' }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-block bg-purple-100 text-purple-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isTamil ? 'குடிமக்கள் உதவி மையம்' : 'Help & Citizen Support'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {isTamil ? 'தொடர்பு & உதவி மையம்' : 'Citizen Contact & Help Centre'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {isTamil
            ? 'அரசுத் துறை தொலைபேசி எண்கள், உதவி மையங்கள், அடிக்கடி கேட்கப்படும் கேள்விகள் மற்றும் கருத்துப் பதிவு வசதி.'
            : 'Get in touch with department help desks, district collectorate helplines, explore FAQs, or submit feedback and service requests.'}
        </p>
      </div>

      {/* Emergency & Key Helplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-6 rounded-3xl shadow-md space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-900 tracking-wider">CM Helpline</span>
          <div className="text-3xl font-black font-mono">1100</div>
          <p className="text-xs font-medium text-slate-900/90">24/7 Chief Minister Special Grievance Redressal</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">Women Helpline</span>
          <div className="text-3xl font-black font-mono text-purple-900">181</div>
          <p className="text-xs text-slate-500">Toll-free 24/7 Women safety and welfare support</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">e-Sevai Tech Support</span>
          <div className="text-3xl font-black font-mono text-blue-900">1800-425-1333</div>
          <p className="text-xs text-slate-500">Digital certificates & application inquiries</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Health Scheme (CMCHIS)</span>
          <div className="text-3xl font-black font-mono text-emerald-900">104 / 108</div>
          <p className="text-xs text-slate-500">Medical emergency and cashless hospitalization</p>
        </div>
      </div>

      {/* Main 2-Column: FAQs and Feedback Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Frequently Asked Questions */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-700" />
            <span>Frequently Asked Questions (FAQs)</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-3 font-bold text-xs sm:text-sm text-slate-900 hover:text-purple-700"
                >
                  <span>{isTamil ? faq.qTa : faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === i ? 'rotate-180 text-purple-700' : 'text-slate-400'}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {isTamil ? faq.aTa : faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-purple-950">Have a specific unresolved grievance?</h4>
              <p className="text-xs text-slate-600">File a tracked statutory complaint with the concerned department officer.</p>
            </div>
            <button
              onClick={onNavigateToGrievance}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
            >
              File a Grievance →
            </button>
          </div>
        </div>

        {/* Right Column: Support & Feedback Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-700" />
              <span>Submit Support / Feedback</span>
            </h2>
            <p className="text-xs text-slate-500">
              Share service feedback or request technical guidance from the TNeGA support team:
            </p>

            {feedbackSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-950">Thank You! Feedback Received</h4>
                <p className="text-xs text-emerald-800">
                  Your reference ID is <strong>TN-FEED-2026-904</strong>. Our support desk will review your submission shortly.
                </p>
                <button
                  onClick={() => setFeedbackSent(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={feedbackData.name}
                    onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                    placeholder="e.g. S. Karthikeyan"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={feedbackData.phone}
                    onChange={(e) => setFeedbackData({ ...feedbackData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Relevant Department</label>
                  <select
                    value={feedbackData.department}
                    onChange={(e) => setFeedbackData({ ...feedbackData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-600 bg-white"
                  >
                    <option value="Revenue">Revenue & Disaster Management</option>
                    <option value="Social Welfare">Social Welfare & Women Empowerment</option>
                    <option value="TNeGA">Tamil Nadu e-Governance Agency</option>
                    <option value="Agriculture">Agriculture & Farmers Welfare</option>
                    <option value="Registration">Commercial Taxes & Registration</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Feedback / Issue Details</label>
                  <textarea
                    rows={4}
                    required
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    placeholder="Describe your query or suggestion..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-600 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Department Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-700" />
          <span>Major State Department Contact Directory</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {departmentContacts.map((contact, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-sm text-slate-900">{contact.dept}</h4>
              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span className="font-mono">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
