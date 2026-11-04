import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, Mail, Phone, Shield, Building2, KeyRound, 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, Check,
  Fingerprint, FileText, Globe, Smartphone, RefreshCw
} from 'lucide-react';
import { PortalType, AuthUser } from '../types';
import { govApi } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPortal?: PortalType;
  initialMode?: 'login' | 'signup';
  language: 'en' | 'ta';
  onLoginSuccess: (user: AuthUser, targetPortal: PortalType) => void;
}

const TN_DISTRICTS = [
  'Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem', 
  'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul', 
  'Kanchipuram', 'Cuddalore', 'Thiruvallur', 'Tiruppur', 'Villupuram'
];

const DEPARTMENTS = [
  'Revenue & Disaster Management',
  'Social Welfare & Women Empowerment',
  'Agriculture & Farmers Welfare',
  'School Education',
  'Health & Family Welfare',
  'Commercial Taxes & Registration',
  'Rural Development & Panchayat Raj',
  'Information Technology & Digital Services (TNeGA)'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialPortal = 'citizen',
  initialMode = 'login',
  language,
  onLoginSuccess
}) => {
  const isTamil = language === 'ta';
  
  // Active selected portal and mode
  const [selectedPortal, setSelectedPortal] = useState<PortalType>(
    initialPortal === 'public' || initialPortal === 'mobile-sim' || initialPortal === 'architecture-docs' 
      ? 'citizen' 
      : initialPortal
  );
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  
  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Signup fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Madurai');
  const [department, setDepartment] = useState('Revenue & Disaster Management');
  const [designation, setDesignation] = useState('Village Administrative Officer');
  const [idNumber, setIdNumber] = useState('');
  const [dpdpConsent, setDpdpConsent] = useState(true);

  // Status & loading
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync initial props
  useEffect(() => {
    if (isOpen) {
      if (initialPortal !== 'public' && initialPortal !== 'mobile-sim' && initialPortal !== 'architecture-docs') {
        setSelectedPortal(initialPortal);
      }
      setAuthMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      setOtpSent(false);
    }
  }, [isOpen, initialPortal, initialMode]);

  if (!isOpen) return null;

  // Portal information metadata
  const portalMeta: Record<string, {
    title: string;
    titleTa: string;
    badge: string;
    color: string;
    borderColor: string;
    icon: any;
    demoUser: { id: string; name: string; email: string };
  }> = {
    citizen: {
      title: 'Citizen Portal',
      titleTa: 'குடிமக்கள் தளம் (Makkal Portal)',
      badge: 'Public & Citizen Services',
      color: 'bg-emerald-600',
      borderColor: 'border-emerald-500',
      icon: User,
      demoUser: { id: 'usr_cit_anandhi', name: 'M. Anandhi', email: 'anandhi.m@gmail.com' }
    },
    employee: {
      title: 'Employee Portal',
      titleTa: 'அரசு ஊழியர் தளம் (IFHRMS Staff)',
      badge: 'Caseworkers & Field Verification',
      color: 'bg-blue-600',
      borderColor: 'border-blue-500',
      icon: Building2,
      demoUser: { id: 'usr_emp_4019', name: 'K. Ramanathan (VAO)', email: 'k.ramanathan@tn.gov.in' }
    },
    officer: {
      title: 'Department Officer / HOD',
      titleTa: 'துறை அலுவலர் / HOD தளம்',
      badge: 'Zonal & Supervisory Authority',
      color: 'bg-amber-600',
      borderColor: 'border-amber-500',
      icon: Shield,
      demoUser: { id: 'usr_officer_01', name: 'R. Sundaram (Deputy Tahsildar)', email: 'r.sundaram@tn.gov.in' }
    },
    admin: {
      title: 'Super Admin Portal',
      titleTa: 'முதன்மை நிர்வாகி தளம் (State Admin)',
      badge: 'Secretariat System & Security Admin',
      color: 'bg-purple-700',
      borderColor: 'border-purple-600',
      icon: KeyRound,
      demoUser: { id: 'usr_admin_01', name: 'State System Administrator', email: 'admin@tn.gov.in' }
    },
    analytics: {
      title: 'AI & Analytics Centre',
      titleTa: 'AI & பகுப்பாய்வு மையம் (Data Intel)',
      badge: 'Policy & Intelligence Unit',
      color: 'bg-indigo-600',
      borderColor: 'border-indigo-500',
      icon: Sparkles,
      demoUser: { id: 'usr_analytics_01', name: 'Dr. S. Kabilan (AI Director)', email: 's.kabilan@tnega.tn.gov.in' }
    }
  };

  const currentMeta = portalMeta[selectedPortal] || portalMeta.citizen;

  // Fast demo login
  const handleQuickDemoLogin = async (portalKey: PortalType) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const demo = portalMeta[portalKey]?.demoUser;
      const user = await govApi.login({
        username_or_email: demo ? demo.email : 'user@tn.gov.in',
        portal: portalKey
      });
      setSuccessMsg(isTamil ? 'உள்நுழைவு வெற்றிகரமானது!' : 'Authenticated successfully!');
      setTimeout(() => {
        onLoginSuccess(user, portalKey);
        onClose();
      }, 400);
    } catch {
      setErrorMsg(isTamil ? 'உள்நுழைவில் பிழை ஏற்பட்டது' : 'Login failed, please retry');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        if (!identifier.trim()) {
          setErrorMsg(isTamil ? 'அடையாள அட்டை அல்லது மின்னஞ்சலை உள்ளிடவும்' : 'Please enter your username, email or ID');
          setIsLoading(false);
          return;
        }

        const user = await govApi.login({
          username_or_email: identifier,
          password: password || 'SecureGovPass@2026',
          portal: selectedPortal
        });

        setSuccessMsg(isTamil ? 'உள்நுழைவு வெற்றிகரமானது!' : `Welcome back, ${user.name}!`);
        setTimeout(() => {
          onLoginSuccess(user, selectedPortal);
          onClose();
        }, 500);
      } else {
        // Registration mode
        if (!fullName.trim() || !email.trim()) {
          setErrorMsg(isTamil ? 'தயவுசெய்து அனைத்து கட்டாய புலங்களையும் நிரப்பவும்' : 'Please fill all required fields');
          setIsLoading(false);
          return;
        }

        if (!dpdpConsent) {
          setErrorMsg(isTamil ? 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டத்தின் (DPDP 2023) ஒப்புதல் அவசியம்' : 'DPDP Act 2023 consent is mandatory for registration');
          setIsLoading(false);
          return;
        }

        const user = await govApi.register({
          full_name: fullName,
          email,
          phone,
          district,
          portal: selectedPortal,
          consent_accepted: dpdpConsent,
          department: selectedPortal !== 'citizen' ? department : undefined,
          designation: selectedPortal !== 'citizen' ? designation : undefined,
          idNumber: idNumber || undefined
        });

        setSuccessMsg(isTamil ? 'பதிவு வெற்றிகரமானது!' : `Account created! Welcome, ${user.name}.`);
        setTimeout(() => {
          onLoginSuccess(user, selectedPortal);
          onClose();
        }, 600);
      }
    } catch {
      setErrorMsg(isTamil ? 'செயல்பாட்டில் பிழை ஏற்பட்டது' : 'Authentication request failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#0B1E3F] via-[#1E1B4B] to-[#1E1B4B] text-white p-4 sm:p-5 flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="flex items-center gap-3 relative z-10">
            {/* Circular Official Logo */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-300 shadow-md bg-white shrink-0">
              <img
                src="/assets/aistudio/image_5b30609e.png"
                alt="GovAI Nexus Seal"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  GovAI <span className="text-purple-300">Nexus</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 font-semibold border border-purple-400/30">
                  {isTamil ? 'அங்கீகார வாயில்' : 'Secure IAM'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isTamil ? 'தமிழ்நாடு அரசு டிஜிட்டல் ஆளுகை நுழைவு வாயில்' : 'Government of Tamil Nadu Single Sign-On Portal'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Portal Selector Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 p-2 overflow-x-auto shrink-0 flex items-center gap-1.5 scrollbar-thin">
          {[
            { key: 'citizen' as PortalType, label: 'Citizen', labelTa: 'குடிமக்கள்', icon: User, color: 'text-emerald-700', activeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
            { key: 'employee' as PortalType, label: 'Employee', labelTa: 'ஊழியர்', icon: Building2, color: 'text-blue-700', activeBg: 'bg-blue-50 text-blue-800 border-blue-300' },
            { key: 'officer' as PortalType, label: 'Officer / HOD', labelTa: 'அலுவலர்', icon: Shield, color: 'text-amber-700', activeBg: 'bg-amber-50 text-amber-800 border-amber-300' },
            { key: 'admin' as PortalType, label: 'Super Admin', labelTa: 'நிர்வாகி', icon: KeyRound, color: 'text-purple-700', activeBg: 'bg-purple-50 text-purple-800 border-purple-300' },
            { key: 'analytics' as PortalType, label: 'AI Analytics', labelTa: 'AI பகுப்பாய்வு', icon: Sparkles, color: 'text-indigo-700', activeBg: 'bg-indigo-50 text-indigo-800 border-indigo-300' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedPortal === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setSelectedPortal(tab.key);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isActive 
                    ? `${tab.activeBg} shadow-xs scale-102` 
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? '' : tab.color}`} />
                <span>{isTamil ? tab.labelTa : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Active Portal Header & Mode Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${currentMeta.color}`}></span>
                <h4 className="font-extrabold text-base text-slate-900">
                  {isTamil ? currentMeta.titleTa : currentMeta.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentMeta.badge} · {isTamil ? 'அங்கீகரிக்கப்பட்ட உள்நுழைவு' : 'Protected Government Gateway'}
              </p>
            </div>

            {/* Mode Switcher: Login vs Sign Up */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center shrink-0 border border-slate-200">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTamil ? 'உள்நுழைவு' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMsg(null); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTamil ? 'பதிவு செய்ய' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* LOGIN MODE */}
            {authMode === 'login' && (
              <>
                {/* Method selector for citizen (Password vs OTP) */}
                {selectedPortal === 'citizen' && (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('password'); setOtpSent(false); }}
                      className={`px-3 py-1 rounded-lg border font-semibold transition-all ${
                        authMethod === 'password' ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isTamil ? 'கடவுச்சொல் மூலம்' : 'Password / Email'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('otp'); setOtpSent(false); }}
                      className={`px-3 py-1 rounded-lg border font-semibold transition-all ${
                        authMethod === 'otp' ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isTamil ? 'கைப்பேசி OTP மூலம்' : 'Mobile OTP'}
                    </button>
                  </div>
                )}

                {/* Primary Identifier */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {selectedPortal === 'citizen' 
                      ? (authMethod === 'otp' ? (isTamil ? 'பதிவு செய்யப்பட்ட கைப்பேசி எண்' : 'Registered Mobile Number') : (isTamil ? 'மின்னஞ்சல் / ஆதார் / பயனர் பெயர்' : 'Email / Aadhaar / Username'))
                      : selectedPortal === 'employee' 
                        ? (isTamil ? 'IFHRMS ஊழியர் எண் / அரசு மின்னஞ்சல்' : 'IFHRMS Employee ID / Gov Email')
                        : selectedPortal === 'officer'
                          ? (isTamil ? 'துறை அலுவலர் குறியீடு / அரசு மின்னஞ்சல்' : 'Officer Cadre Code / Official Email')
                          : selectedPortal === 'admin'
                            ? (isTamil ? 'முதன்மை நிர்வாகி எண் (Admin ID)' : 'Secretariat Super Admin ID')
                            : (isTamil ? 'பகுப்பாய்வாளர் மின்னஞ்சல் (TNeGA)' : 'Analyst / Data Scientist ID')
                    }
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      {selectedPortal === 'citizen' ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </div>
                    <input
                      type={authMethod === 'otp' && selectedPortal === 'citizen' ? 'tel' : 'text'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        selectedPortal === 'citizen'
                          ? (authMethod === 'otp' ? 'e.g. 9840218923' : 'e.g. anandhi.m@gmail.com')
                          : selectedPortal === 'employee'
                            ? 'e.g. TN-IFHRMS-88129 or k.ramanathan@tn.gov.in'
                            : selectedPortal === 'officer'
                              ? 'e.g. ZDT-MDU-03 or r.sundaram@tn.gov.in'
                              : selectedPortal === 'admin'
                                ? 'e.g. admin@tn.gov.in'
                                : 'e.g. s.kabilan@tnega.tn.gov.in'
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Password or OTP */}
                {authMethod === 'password' || selectedPortal !== 'citizen' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        {isTamil ? 'ரகசிய கடவுச்சொல்' : 'Password / Security PIN'}
                      </label>
                      <button 
                        type="button" 
                        onClick={() => alert(isTamil ? 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சலுக்கு அனுப்பப்பட்டது.' : 'Password reset link sent to registered email.')}
                        className="text-[11px] text-purple-700 hover:underline"
                      >
                        {isTamil ? 'கடவுச்சொல் மறந்ததா?' : 'Forgot Password?'}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        {isTamil ? '6-இலக்க OTP குறியீடு' : '6-Digit Mobile OTP'}
                      </label>
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!identifier) {
                              setErrorMsg(isTamil ? 'கைப்பேசி எண்ணை உள்ளிடவும்' : 'Enter mobile number first');
                              return;
                            }
                            setOtpSent(true);
                            setSuccessMsg(isTamil ? 'OTP அனுப்பப்பட்டது: 739201 (டெமோ)' : 'OTP sent! Test OTP is 739201');
                          }}
                          className="text-[11px] font-bold text-purple-700 hover:text-purple-900"
                        >
                          {isTamil ? 'OTP அனுப்புக' : 'Get OTP'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSuccessMsg(isTamil ? 'OTP மீண்டும் அனுப்பப்பட்டது: 739201' : 'OTP re-sent! Use 739201')}
                          className="text-[11px] text-slate-500 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="739201"
                      className="w-full px-3 py-2 text-center tracking-widest text-base font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    />
                  </div>
                )}
              </>
            )}

            {/* SIGN UP / REGISTRATION MODE */}
            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTamil ? 'முழு பெயர்' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. M. Anandhi"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTamil ? 'மின்னஞ்சல்' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. applicant@domain.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTamil ? 'கைப்பேசி எண்' : 'Mobile Number (+91)'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98402 18923"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTamil ? 'மாவட்டம்' : 'District'}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      {TN_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Role Fields */}
                {selectedPortal !== 'citizen' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTamil ? 'அரசு துறை' : 'Government Department'}
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {selectedPortal === 'employee' ? 'IFHRMS Staff ID' : 'Official Officer Cadre ID'}
                      </label>
                      <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={selectedPortal === 'employee' ? 'TN-IFHRMS-40192' : 'TN-CADRE-901'}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}

                {/* DPDP 2023 Consent Checkbox */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dpdpConsent}
                      onChange={(e) => setDpdpConsent(e.target.checked)}
                      className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-[11px] text-slate-600 leading-snug">
                      <strong className="text-slate-800">
                        {isTamil ? 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம் 2023 (DPDP Act):' : 'DPDP Act 2023 Statutory Consent:'}
                      </strong>{' '}
                      {isTamil 
                        ? 'அரசு சேவைகளை வழங்குவதற்காக எனது தனிப்பட்ட விவரங்களை செயலாக்க நான் சம்மதிக்கிறேன்.'
                        : 'I explicitly authorize the Government of Tamil Nadu to process my personal credentials strictly for delivery of verified public administration and welfare services.'}
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  selectedPortal === 'citizen' ? 'bg-emerald-700 hover:bg-emerald-800' :
                  selectedPortal === 'employee' ? 'bg-blue-700 hover:bg-blue-800' :
                  selectedPortal === 'officer' ? 'bg-amber-700 hover:bg-amber-800' :
                  selectedPortal === 'admin' ? 'bg-purple-800 hover:bg-purple-900' :
                  'bg-indigo-700 hover:bg-indigo-800'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isTamil ? 'சரிபார்க்கிறது...' : 'Verifying Credentials...'}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {authMode === 'login' 
                        ? (isTamil ? `${portalMeta[selectedPortal]?.titleTa || ''} உள்நுழையவும்` : `Login to ${portalMeta[selectedPortal]?.title || 'Portal'}`)
                        : (isTamil ? 'கணக்கை உருவாக்கவும்' : `Create ${portalMeta[selectedPortal]?.title || ''} Account`)
                      }
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo 1-Click Persona Switcher */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {isTamil ? '1-கிளிக் விரைவு டெமோ உள்நுழைவு' : '1-Click Quick Demo Personas'}
              </span>
              <span className="text-[10px] text-slate-400">Preloaded test credentials</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('citizen')}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-colors flex items-center gap-2 group"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  M
                </div>
                <div className="truncate">
                  <div className="font-bold text-[11px] text-emerald-950 truncate">M. Anandhi</div>
                  <div className="text-[9px] text-emerald-700">Citizen (Madurai)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('employee')}
                className="p-2 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition-colors flex items-center gap-2 group"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-200 text-blue-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  K
                </div>
                <div className="truncate">
                  <div className="font-bold text-[11px] text-blue-950 truncate">K. Ramanathan</div>
                  <div className="text-[9px] text-blue-700">VAO Caseworker</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('officer')}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-left transition-colors flex items-center gap-2 group"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  R
                </div>
                <div className="truncate">
                  <div className="font-bold text-[11px] text-amber-950 truncate">R. Sundaram</div>
                  <div className="text-[9px] text-amber-700">Deputy Tahsildar</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-left transition-colors flex items-center gap-2 group"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-200 text-purple-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  A
                </div>
                <div className="truncate">
                  <div className="font-bold text-[11px] text-purple-950 truncate">State Admin</div>
                  <div className="text-[9px] text-purple-700">Secretariat IT</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('analytics')}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-left transition-colors flex items-center gap-2 group col-span-2 sm:col-span-1"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-200 text-indigo-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  S
                </div>
                <div className="truncate">
                  <div className="font-bold text-[11px] text-indigo-950 truncate">Dr. S. Kabilan</div>
                  <div className="text-[9px] text-indigo-700">AI Analytics Lead</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Security Badges */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>TLS 1.3 256-bit SSL</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Fingerprint className="w-3 h-3 text-purple-600" />
              <span>MeriPehchaan / Parichay SSO</span>
            </span>
          </div>
          <span>ISO/IEC 27001:2022 Certified</span>
        </div>

      </div>
    </div>
  );
};
