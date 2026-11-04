import React, { useState } from 'react';
import { 
  Home, Grid, Bot, FileText, User, Mic, ArrowLeft, 
  Search, Shield, Bell, CheckCircle2, ChevronRight, Phone, Camera, Sparkles
} from 'lucide-react';
import { TN_SERVICES, TN_SCHEMES, MOCK_APPLICATIONS } from '../data/mockData';

interface MobileAppSimulatorProps {
  language: 'en' | 'ta';
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({ language }) => {
  const isTamil = language === 'ta';
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'ai' | 'requests' | 'profile'>('home');
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(7); // Screen 07 is Home Dashboard
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-01');
  const [voicePulse, setVoicePulse] = useState(false);

  const screens = [
    { id: 1, name: 'Screen 01: Splash Screen' },
    { id: 2, name: 'Screen 02: Onboarding' },
    { id: 3, name: 'Screen 03: Language Select' },
    { id: 4, name: 'Screen 04: Mobile Login' },
    { id: 5, name: 'Screen 05: Registration' },
    { id: 6, name: 'Screen 06: OTP Verification' },
    { id: 7, name: 'Screen 07: Home Dashboard' },
    { id: 8, name: 'Screen 08: Service Explorer' },
    { id: 9, name: 'Screen 09: Service Details' },
    { id: 10, name: 'Screen 10: Scheme Discovery' },
    { id: 11, name: 'Screen 11: Scheme Details' },
    { id: 12, name: 'Screen 12: Eligibility Wizard' },
    { id: 13, name: 'Screen 13: AI Chat' },
    { id: 14, name: 'Screen 14: Voice Assistant' },
    { id: 15, name: 'Screen 15: Application Form' },
    { id: 16, name: 'Screen 16: Document Scanner' },
    { id: 17, name: 'Screen 17: Application Tracking' },
    { id: 18, name: 'Screen 18: Application Timeline' },
    { id: 19, name: 'Screen 19: Grievance Lodging' },
    { id: 20, name: 'Screen 20: Grievance Tracking' },
    { id: 21, name: 'Screen 21: Notifications' },
    { id: 22, name: 'Screen 22: Profile & DigiLocker' },
    { id: 23, name: 'Screen 23: Settings & Consent' },
    { id: 24, name: 'Screen 24: Helpline 1100' },
  ];

  const currentService = TN_SERVICES.find(s => s.id === selectedServiceId) || TN_SERVICES[0];

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Simulator Control & Documentation Column */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>React Native + Expo SDK 52 Architecture</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isTamil ? 'GovAI Nexus மொபைல் பயன்பாடு (Expo)' : 'GovAI Nexus Mobile Experience (Expo)'}
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {isTamil
            ? 'அனைத்து 24 திரைகளும் Android மற்றும் iOS இயங்குதளங்களுக்கான நேட்டிவ் Expo Router மற்றும் TypeScript கட்டமைப்புடன் வடிவமைக்கப்பட்டுள்ளன. கீழே உள்ள திரையைத் தேர்ந்தெடுத்து முன்னோட்டம் பார்க்கவும்.'
            : 'Interactive device simulator running the native Expo Router citizen application. Includes Tamil/English voice interaction, document camera scanning, and real-time application milestone tracking.'}
        </p>

        {/* Screen Picker Dropdown */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {isTamil ? 'திரையைத் தேர்ந்தெடு (24 திரைகள்):' : 'Select Native Mobile Screen (24 Screens):'}
          </label>
          <select
            value={activeScreenIndex}
            onChange={(e) => setActiveScreenIndex(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-hidden focus:border-purple-600"
          >
            {screens.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Features Checklist */}
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Expo Router Navigation</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bilingual Tamil / English</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Whisper Tamil Voice ASR</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>FastAPI Secure REST Sync</span>
          </div>
        </div>
      </div>

      {/* Smartphone Device Frame Simulator */}
      <div className="w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 relative flex flex-col shrink-0">
        {/* Dynamic Island / Notch */}
        <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>

        {/* Mobile Screen Inside Frame */}
        <div className="w-full flex-1 bg-slate-50 rounded-[36px] overflow-hidden flex flex-col relative text-slate-900">
          
          {/* Status Bar */}
          <div className="bg-white px-5 pt-1.5 pb-1 flex justify-between items-center text-[11px] font-bold text-slate-800 border-b border-slate-100">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Screen Content Switcher */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Screen 7: Home Dashboard */}
            {activeScreenIndex === 7 && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      {isTamil ? 'தமிழ்நாடு அரசு' : 'Govt of Tamil Nadu'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {isTamil ? 'வணக்கம், ஆனந்தி' : 'Vanakkam, Anandhi'}
                    </h4>
                  </div>
                  <button onClick={() => setActiveScreenIndex(21)} className="p-1.5 rounded-full bg-purple-100 text-purple-700">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-400">
                  <Search className="w-4 h-4 text-purple-600" />
                  <span>{isTamil ? 'சேவைகள், திட்டங்களைத் தேடுங்கள்...' : 'Search services, schemes...'}</span>
                </div>

                {/* AI Assistant Banner */}
                <div 
                  onClick={() => setActiveScreenIndex(13)}
                  className="p-3 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-2xl cursor-pointer shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs">GovAI Assistant</h5>
                      <p className="text-[10px] text-purple-200">
                        {isTamil ? 'குரல் மூலம் கேள்விகளைக் கேளுங்கள்' : 'Instant help in Tamil & English'}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Categories */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
                    <span>{isTamil ? 'பிரபலமான சேவைகள்' : 'Popular Services'}</span>
                    <button onClick={() => setActiveScreenIndex(8)} className="text-[10px] text-purple-700">
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    {TN_SERVICES.slice(0, 6).map((s) => (
                      <div 
                        key={s.id} 
                        onClick={() => { setSelectedServiceId(s.id); setActiveScreenIndex(9); }}
                        className="bg-white p-2 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 mx-auto flex items-center justify-center mb-1">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-slate-800 line-clamp-1">
                          {isTamil ? s.titleTa : s.titleEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Application Card */}
                <div 
                  onClick={() => setActiveScreenIndex(17)}
                  className="bg-white p-3 rounded-xl border border-slate-200 cursor-pointer space-y-1.5 shadow-2xs"
                >
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-800">Community Certificate</span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[9px]">
                      Under Review
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">App No: TN-REV-2026-00892</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-2/3"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 9: Service Details */}
            {activeScreenIndex === 9 && (
              <div className="space-y-3">
                <button onClick={() => setActiveScreenIndex(7)} className="flex items-center gap-1 text-xs text-purple-700 font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <h4 className="text-sm font-bold text-slate-900">
                  {isTamil ? currentService.titleTa : currentService.titleEn}
                </h4>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Department:</span>
                    <strong className="text-slate-900">{currentService.department}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Processing Time:</span>
                    <strong className="text-emerald-700">{currentService.slaDays} Working Days</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Government Fee:</span>
                    <strong className="text-slate-900">₹{currentService.fee}</strong>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-slate-800">Required Documents</h5>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {currentService.documents.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setActiveScreenIndex(15)}
                  className="w-full py-2.5 bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            )}

            {/* Screen 14: Voice Assistant */}
            {activeScreenIndex === 14 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">
                    {isTamil ? 'GovAI குரல் உதவியாளர்' : 'Tamil Voice Assistant'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isTamil ? 'தமிழில் பேசுங்கள்...' : 'Listening in Tamil / English...'}
                  </p>
                </div>

                {/* Animated Pulsing Voice Circle */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center animate-ping absolute inset-0 opacity-40"></div>
                  <button 
                    onClick={() => setVoicePulse(!voicePulse)}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center shadow-lg relative z-10"
                  >
                    <Mic className="w-10 h-10" />
                  </button>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 max-w-xs shadow-2xs">
                  <p className="font-medium italic">
                    "{isTamil ? 'வருமானச் சான்றிதழ் பெற என்னென்ன ஆவணங்கள் தேவை?' : 'What documents are needed for Income Certificate?'}"
                  </p>
                </div>

                <button 
                  onClick={() => setActiveScreenIndex(7)}
                  className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Screen 17: Application Tracking */}
            {activeScreenIndex === 17 && (
              <div className="space-y-3">
                <button onClick={() => setActiveScreenIndex(7)} className="flex items-center gap-1 text-xs text-purple-700 font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Community Certificate</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">App No: TN-REV-2026-00892</p>

                  {/* Vertical Progress Stepper */}
                  <div className="space-y-3 border-l-2 border-purple-600 pl-3 ml-1 text-[11px]">
                    <div>
                      <strong className="text-slate-900 block">Application Submitted</strong>
                      <span className="text-[10px] text-slate-400">24 Oct 2026, 11:30 AM · Verified</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block">Village Administrative Officer (VAO)</strong>
                      <span className="text-[10px] text-slate-400">26 Oct 2026, 04:15 PM · Recommended</span>
                    </div>
                    <div>
                      <strong className="text-purple-700 block">Revenue Inspector (RI) Review</strong>
                      <span className="text-[10px] text-slate-500">Under Review at Madurai North</span>
                    </div>
                    <div className="opacity-40">
                      <strong className="text-slate-600 block">Zonal Deputy Tahsildar Approval</strong>
                      <span className="text-[10px]">Pending final digital signature</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other generic screens fallback viewer */}
            {![7, 9, 14, 17].includes(activeScreenIndex) && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-700 mx-auto flex items-center justify-center font-bold text-xs">
                  {activeScreenIndex}
                </div>
                <h5 className="font-bold text-sm text-slate-900">
                  {screens.find(s => s.id === activeScreenIndex)?.name}
                </h5>
                <p className="text-xs text-slate-500">
                  Native React Native screen specification configured with Expo Router and shared validation types.
                </p>
                <button 
                  onClick={() => setActiveScreenIndex(7)}
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg text-xs font-semibold"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Native Bottom Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center text-[10px] font-medium text-slate-500">
            <button 
              onClick={() => { setActiveTab('home'); setActiveScreenIndex(7); }} 
              className={`flex flex-col items-center gap-0.5 ${activeTab === 'home' ? 'text-purple-700 font-bold' : ''}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => { setActiveTab('services'); setActiveScreenIndex(8); }} 
              className={`flex flex-col items-center gap-0.5 ${activeTab === 'services' ? 'text-purple-700 font-bold' : ''}`}
            >
              <Grid className="w-4 h-4" />
              <span>Services</span>
            </button>
            <button 
              onClick={() => { setActiveTab('ai'); setActiveScreenIndex(14); }} 
              className={`flex flex-col items-center gap-0.5 ${activeTab === 'ai' ? 'text-purple-700 font-bold' : ''}`}
            >
              <div className="w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center -mt-2 shadow-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span>GovAI</span>
            </button>
            <button 
              onClick={() => { setActiveTab('requests'); setActiveScreenIndex(17); }} 
              className={`flex flex-col items-center gap-0.5 ${activeTab === 'requests' ? 'text-purple-700 font-bold' : ''}`}
            >
              <FileText className="w-4 h-4" />
              <span>Requests</span>
            </button>
            <button 
              onClick={() => { setActiveTab('profile'); setActiveScreenIndex(22); }} 
              className={`flex flex-col items-center gap-0.5 ${activeTab === 'profile' ? 'text-purple-700 font-bold' : ''}`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
