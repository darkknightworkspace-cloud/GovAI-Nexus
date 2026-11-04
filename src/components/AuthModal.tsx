import React, { useState, useEffect } from 'react';
import {
  X, Lock, User, Mail, Phone, Shield, Building2, KeyRound,
  Sparkles, CheckCircle2, AlertCircle, ArrowRight,
  Fingerprint, Eye, EyeOff, RefreshCw, Calendar, Users,
  BarChart2
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

type AuthMethodTab = 'password' | 'mobile-otp' | 'aadhaar-otp';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialPortal = 'citizen',
  initialMode = 'login',
  language,
  onLoginSuccess
}) => {
  const isTamil = language === 'ta';

  const [selectedPortal, setSelectedPortal] = useState<PortalType>(
    initialPortal === 'public' || initialPortal === 'mobile-sim' || initialPortal === 'architecture-docs'
      ? 'citizen'
      : initialPortal
  );
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [authMethodTab, setAuthMethodTab] = useState<AuthMethodTab>('password');

  // Login fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCreatePwd, setShowCreatePwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [district, setDistrict] = useState('Madurai');
  const [department, setDepartment] = useState('Revenue & Disaster Management');
  const [designation, setDesignation] = useState('Village Administrative Officer');
  const [idNumber, setIdNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialPortal !== 'public' && initialPortal !== 'mobile-sim' && initialPortal !== 'architecture-docs') {
        setSelectedPortal(initialPortal);
      }
      setAuthMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      setOtpSent(false);
      setShowDemo(false);
    }
  }, [isOpen, initialPortal, initialMode]);

  if (!isOpen) return null;

  const portalMeta: Record<string, {
    title: string; titleTa: string; subtitle: string; subtitleTa: string;
    dotColor: string; tabActiveClass: string; btnClass: string;
    icon: React.ElementType;
    demoUser: { id: string; name: string; email: string };
  }> = {
    citizen: {
      title: 'Citizen Portal', titleTa: 'குடிமக்கள் போர்டல்',
      subtitle: 'Access government services, schemes and applications',
      subtitleTa: 'அரசு சேவைகள், திட்டங்கள் மற்றும் விண்ணப்பங்களை அணுகவும்',
      dotColor: 'bg-emerald-500',
      tabActiveClass: 'bg-emerald-50 text-emerald-700 border-emerald-400 font-bold',
      btnClass: 'bg-[#5B21B6] hover:bg-[#4C1D95]',
      icon: User,
      demoUser: { id: 'usr_cit_anandhi', name: 'M. Anandhi', email: 'anandhi.m@gmail.com' }
    },
    employee: {
      title: 'Employee Portal', titleTa: 'ஊழியர் போர்டல்',
      subtitle: 'Government caseworkers and field verification staff',
      subtitleTa: 'அரசு ஊழியர்கள் மற்றும் வயல் சரிபார்ப்பு பணியாளர்கள்',
      dotColor: 'bg-blue-500',
      tabActiveClass: 'bg-blue-50 text-blue-700 border-blue-400 font-bold',
      btnClass: 'bg-[#5B21B6] hover:bg-[#4C1D95]',
      icon: Building2,
      demoUser: { id: 'usr_emp_4019', name: 'K. Ramanathan (VAO)', email: 'k.ramanathan@tn.gov.in' }
    },
    officer: {
      title: 'Officer / HOD Portal', titleTa: 'அலுவலர் / HOD போர்டல்',
      subtitle: 'Department heads and supervisory authority access',
      subtitleTa: 'துறைத் தலைவர்கள் மற்றும் மேற்பார்வை அதிகாரம்',
      dotColor: 'bg-orange-500',
      tabActiveClass: 'bg-orange-50 text-orange-700 border-orange-400 font-bold',
      btnClass: 'bg-[#5B21B6] hover:bg-[#4C1D95]',
      icon: Shield,
      demoUser: { id: 'usr_officer_01', name: 'R. Sundaram (Deputy Tahsildar)', email: 'r.sundaram@tn.gov.in' }
    },
    admin: {
      title: 'Super Admin Portal', titleTa: 'சூப்பர் அட்மின் போர்டல்',
      subtitle: 'Secretariat system and security administration',
      subtitleTa: 'செயலகம் அமைப்பு மற்றும் பாதுகாப்பு நிர்வாகம்',
      dotColor: 'bg-purple-600',
      tabActiveClass: 'bg-purple-50 text-purple-700 border-purple-400 font-bold',
      btnClass: 'bg-[#5B21B6] hover:bg-[#4C1D95]',
      icon: KeyRound,
      demoUser: { id: 'usr_admin_01', name: 'State System Administrator', email: 'admin@tn.gov.in' }
    },
    analytics: {
      title: 'AI & Analytics Centre', titleTa: 'AI & பகுப்பாய்வு மையம்',
      subtitle: 'Policy intelligence and data analytics unit',
      subtitleTa: 'கொள்கை நுண்ணறிவு மற்றும் தரவு பகுப்பாய்வு பிரிவு',
      dotColor: 'bg-indigo-500',
      tabActiveClass: 'bg-indigo-50 text-indigo-700 border-indigo-400 font-bold',
      btnClass: 'bg-[#5B21B6] hover:bg-[#4C1D95]',
      icon: BarChart2,
      demoUser: { id: 'usr_analytics_01', name: 'Dr. S. Kabilan (AI Director)', email: 's.kabilan@tnega.tn.gov.in' }
    }
  };

  const currentMeta = portalMeta[selectedPortal] || portalMeta.citizen;

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
      setTimeout(() => { onLoginSuccess(user, portalKey); onClose(); }, 400);
    } catch {
      setErrorMsg(isTamil ? 'உள்நுழைவில் பிழை' : 'Login failed, please retry');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    try {
      if (authMode === 'login') {
        if (!identifier.trim()) {
          setErrorMsg(isTamil ? 'அடையாளத்தை உள்ளிடவும்' : 'Please enter your email, mobile or Aadhaar number');
          setIsLoading(false); return;
        }
        const user = await govApi.login({
          username_or_email: identifier,
          password: password || 'SecureGovPass@2026',
          portal: selectedPortal
        });
        setSuccessMsg(isTamil ? 'உள்நுழைவு வெற்றிகரமானது!' : `Welcome back, ${user.name}!`);
        setTimeout(() => { onLoginSuccess(user, selectedPortal); onClose(); }, 500);
      } else {
        if (!fullName.trim() || !phone.trim()) {
          setErrorMsg(isTamil ? 'கட்டாய புலங்களை நிரப்பவும்' : 'Please fill all required fields');
          setIsLoading(false); return;
        }
        if (createPassword !== confirmPassword) {
          setErrorMsg(isTamil ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
          setIsLoading(false); return;
        }
        if (!termsAccepted) {
          setErrorMsg(isTamil ? 'விதிமுறைகளை ஒப்புக்கொள்ளவும்' : 'Please accept the Terms & Conditions');
          setIsLoading(false); return;
        }
        const user = await govApi.register({
          full_name: fullName,
          email,
          phone,
          district,
          portal: selectedPortal,
          consent_accepted: termsAccepted,
          department: selectedPortal !== 'citizen' ? department : undefined,
          designation: selectedPortal !== 'citizen' ? designation : undefined,
          idNumber: idNumber || undefined
        });
        setSuccessMsg(isTamil ? 'பதிவு வெற்றிகரமானது!' : `Account created! Welcome, ${user.name}.`);
        setTimeout(() => { onLoginSuccess(user, selectedPortal); onClose(); }, 600);
      }
    } catch {
      setErrorMsg(isTamil ? 'செயல்பாட்டில் பிழை' : 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const portalTabs = [
    { key: 'citizen' as PortalType, label: 'Citizen', labelTa: 'குடிமக்கள்', icon: User, inactiveColor: 'text-slate-600' },
    { key: 'employee' as PortalType, label: 'Employee', labelTa: 'ஊழியர்', icon: Building2, inactiveColor: 'text-slate-600' },
    { key: 'officer' as PortalType, label: 'Officer / HOD', labelTa: 'அலுவலர்', icon: Shield, inactiveColor: 'text-slate-600' },
    { key: 'admin' as PortalType, label: 'Super Admin', labelTa: 'சூப்பர் அட்மின்', icon: KeyRound, inactiveColor: 'text-slate-600' },
    { key: 'analytics' as PortalType, label: 'AI & Analytics', labelTa: 'AI பகுப்பாய்வு', icon: BarChart2, inactiveColor: 'text-slate-600' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[680px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="relative bg-gradient-to-r from-[#0A1628] via-[#1E1B4B] to-[#3730A3] text-white px-5 py-4 flex items-center justify-between overflow-hidden shrink-0">
          {/* Diagonal purple highlight */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-purple-600/40 to-transparent" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {/* TN Govt Circular Seal */}
            <div className="w-11 h-11 rounded-full border-2 border-white/40 bg-white shrink-0 flex items-center justify-center overflow-hidden shadow-md">
              <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" />
                <circle cx="50" cy="50" r="39" fill="none" stroke="#059669" strokeWidth="2.5" />
                <path d="M50 14 L60 36 L40 36 Z" fill="#B45309" />
                <rect x="43" y="36" width="14" height="24" fill="#D97706" />
                <path d="M34 60 L66 60 L62 76 L38 76 Z" fill="#059669" />
                <circle cx="50" cy="82" r="4" fill="#DC2626" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight">
                  GovAI <span className="text-purple-300">Nexus</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/50 border border-purple-300/40 text-white font-semibold">
                  Unified Access
                </span>
              </div>
              <p className="text-[11px] text-purple-200 mt-0.5">
                Government of Tamil Nadu • AI-Powered Governance Platform
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── PORTAL TABS ── */}
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-0 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1 min-w-max">
            {portalTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedPortal === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => { setSelectedPortal(tab.key); setErrorMsg(null); setSuccessMsg(null); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? `${portalMeta[tab.key].tabActiveClass} border-current`
                      : 'text-slate-500 hover:text-slate-800 border-transparent hover:border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isTamil ? tab.labelTa : tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-5 pb-4 space-y-4">

            {/* Portal title + Login/SignUp toggle */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${currentMeta.dotColor} shrink-0`} />
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {authMode === 'signup'
                      ? (isTamil ? 'கணக்கை உருவாக்கவும்' : `Create ${currentMeta.title.replace(' Portal', '')} Account`)
                      : (isTamil ? currentMeta.titleTa : currentMeta.title)
                    }
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 ml-4">
                  {authMode === 'signup'
                    ? (isTamil ? 'அனைத்து அரசு சேவைகளையும் அணுக பதிவு செய்யவும்' : `Register to access government services, schemes and applications`)
                    : (isTamil ? currentMeta.subtitleTa : currentMeta.subtitle)
                  }
                </p>
              </div>

              {/* Login / Sign Up toggle */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${
                    authMode === 'login'
                      ? 'bg-[#1E1B4B] text-white border-[#1E1B4B]'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {isTamil ? 'உள்நுழைவு' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setErrorMsg(null); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${
                    authMode === 'signup'
                      ? 'bg-[#1E1B4B] text-white border-[#1E1B4B]'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {isTamil ? 'பதிவு' : 'Sign Up'}
                </button>
              </div>
            </div>

            {/* Alerts */}
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

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── LOGIN FORM ── */}
              {authMode === 'login' && (
                <>
                  {/* Auth Method Tabs */}
                  <div className="flex items-center gap-2">
                    {[
                      { key: 'password' as AuthMethodTab, label: 'Password / Email', labelTa: 'கடவுச்சொல் / மின்னஞ்சல்', icon: <Mail className="w-3.5 h-3.5" /> },
                      { key: 'mobile-otp' as AuthMethodTab, label: 'Mobile OTP', labelTa: 'கைப்பேசி OTP', icon: <Phone className="w-3.5 h-3.5" /> },
                      { key: 'aadhaar-otp' as AuthMethodTab, label: 'Aadhaar OTP', labelTa: 'ஆதார் OTP', icon: (
                        <span className="text-[10px] font-black" style={{ background: 'linear-gradient(135deg,#FF6B00,#FF4500,#0066CC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aa</span>
                      )},
                    ].map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => { setAuthMethodTab(m.key); setOtpSent(false); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          authMethodTab === m.key
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {m.icon}
                        <span>{isTamil ? m.labelTa : m.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Identifier field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      {isTamil ? 'மின்னஞ்சல் / கைப்பேசி / ஆதார் எண்' : 'Email / Mobile Number / Aadhaar Number'}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={
                          authMethodTab === 'mobile-otp'
                            ? (isTamil ? 'உங்கள் 10 இலக்க கைப்பேசி எண்' : 'Enter your 10-digit mobile number')
                            : authMethodTab === 'aadhaar-otp'
                              ? (isTamil ? '12 இலக்க ஆதார் எண்' : 'Enter your 12-digit Aadhaar number')
                              : (isTamil ? 'மின்னஞ்சல், கைப்பேசி அல்லது ஆதார் எண்' : 'Enter your email, mobile number or Aadhaar number')
                        }
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Password / OTP */}
                  {authMethodTab === 'password' ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-semibold text-slate-800">
                          {isTamil ? 'கடவுச்சொல்' : 'Password'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => alert(isTamil ? 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டது.' : 'Password reset link sent to registered email.')}
                          className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                        >
                          {isTamil ? 'கடவுச்சொல் மறந்ததா?' : 'Forgot Password?'}
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={isTamil ? 'கடவுச்சொல்லை உள்ளிடவும்' : 'Enter your password'}
                          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-semibold text-slate-800">
                          {isTamil ? '6 இலக்க OTP' : '6-Digit OTP'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        {!otpSent ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (!identifier) { setErrorMsg(isTamil ? 'முதலில் எண்ணை உள்ளிடவும்' : 'Enter your number first'); return; }
                              setOtpSent(true);
                              setSuccessMsg(isTamil ? 'OTP அனுப்பப்பட்டது (Demo: 739201)' : 'OTP sent! Test OTP is 739201');
                            }}
                            className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                          >
                            {isTamil ? 'OTP அனுப்புக' : 'Get OTP'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSuccessMsg('OTP re-sent! Use 739201')}
                            className="text-xs text-slate-500 flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" /> Resend
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-2.5 text-center tracking-widest text-base font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      />
                    </div>
                  )}

                  {/* Remember me */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700">{isTamil ? 'என்னை நினைவில் வை' : 'Remember me'}</span>
                  </label>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${currentMeta.btnClass} ${isLoading ? 'opacity-70 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}`}
                  >
                    {isLoading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /><span>{isTamil ? 'சரிபார்க்கிறது...' : 'Verifying...'}</span></>
                    ) : (
                      <><Lock className="w-4 h-4" /><span>{isTamil ? `${currentMeta.titleTa}-ல் உள்நுழையவும்` : `Login to ${currentMeta.title}`}</span><ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  {/* Or continue with */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400 font-medium">{isTamil ? 'அல்லது இதன் மூலம் தொடரவும்' : 'Or continue with'}</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Aadhaar (UIDAI) */}
                    <button
                      type="button"
                      onClick={() => setSuccessMsg('Redirecting to Aadhaar UIDAI...')}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <span className="relative flex items-center justify-center w-7 h-7">
                        {/* Simplified Aadhaar logo */}
                        <svg viewBox="0 0 36 36" className="w-7 h-7">
                          <circle cx="18" cy="18" r="17" fill="#FF6B00" />
                          <path d="M9 18 Q18 6 27 18 Q18 30 9 18Z" fill="#FF4500" />
                          <circle cx="18" cy="18" r="6" fill="white" />
                          <circle cx="18" cy="18" r="3" fill="#FF6B00" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-slate-800">Aadhaar (UIDAI)</span>
                    </button>

                    {/* DigiLocker */}
                    <button
                      type="button"
                      onClick={() => setSuccessMsg('Redirecting to DigiLocker...')}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <span className="relative flex items-center justify-center w-7 h-7">
                        <svg viewBox="0 0 36 36" className="w-7 h-7">
                          <rect x="2" y="2" width="32" height="32" rx="8" fill="#6D28D9" />
                          <path d="M10 22 L10 16 Q10 10 18 10 Q26 10 26 16 L26 22Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                          <rect x="8" y="20" width="20" height="10" rx="3" fill="white" />
                          <circle cx="18" cy="25" r="2.5" fill="#6D28D9" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-slate-800">DigiLocker</span>
                    </button>
                  </div>

                  {/* New to GovAI Nexus? */}
                  <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{isTamil ? 'GovAI Nexus-ல் புதியவரா?' : 'New to GovAI Nexus?'}</p>
                        <p className="text-xs text-slate-500">{isTamil ? 'அனைத்து அரசு சேவைகளையும் அணுக கணக்கை உருவாக்கவும்.' : 'Create your citizen account to access all government services.'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signup'); setErrorMsg(null); }}
                      className="flex items-center gap-1.5 text-sm font-bold text-purple-700 border border-purple-300 rounded-lg px-3 py-1.5 hover:bg-purple-100 transition-colors whitespace-nowrap"
                    >
                      {isTamil ? 'இப்போது பதிவு செய்யுங்கள்' : 'Sign Up Now'} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}

              {/* ── SIGN UP FORM ── */}
              {authMode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'முழு பெயர்' : 'Full Name'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><User className="w-4 h-4" /></span>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder={isTamil ? 'உங்கள் முழு பெயர்' : 'Enter your full name'}
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" required />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'கைப்பேசி எண்' : 'Mobile Number'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Phone className="w-4 h-4" /></span>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder={isTamil ? '10 இலக்க கைப்பேசி எண்' : 'Enter 10-digit mobile number'}
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" required />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Mail className="w-4 h-4" /></span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder={isTamil ? 'மின்னஞ்சல் முகவரி' : 'Enter your email address'}
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" />
                      </div>
                    </div>

                    {/* Aadhaar Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'ஆதார் எண்' : 'Aadhaar Number'}{' '}
                        <span className="text-slate-400 font-normal text-xs">({isTamil ? 'விருப்பத்தேர்வு' : 'Optional'})</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <svg viewBox="0 0 20 20" className="w-4 h-4">
                            <circle cx="10" cy="10" r="9" fill="#FF6B00" />
                            <path d="M5 10 Q10 3 15 10 Q10 17 5 10Z" fill="#FF4500" />
                            <circle cx="10" cy="10" r="3.5" fill="white" />
                            <circle cx="10" cy="10" r="1.5" fill="#FF6B00" />
                          </svg>
                        </span>
                        <input type="text" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)}
                          placeholder={isTamil ? '12 இலக்க ஆதார் எண்' : 'Enter 12-digit Aadhaar number'}
                          maxLength={14}
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'பிறந்த தேதி' : 'Date of Birth'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Calendar className="w-4 h-4" /></span>
                        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                          placeholder="dd/mm/yyyy"
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" required />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'பாலினம்' : 'Gender'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Users className="w-4 h-4" /></span>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none" required>
                          <option value="">{isTamil ? 'பாலினம் தேர்வு செய்யவும்' : 'Select gender'}</option>
                          <option value="Male">{isTamil ? 'ஆண்' : 'Male'}</option>
                          <option value="Female">{isTamil ? 'பெண்' : 'Female'}</option>
                          <option value="Transgender">{isTamil ? 'திருநங்கை/திருநம்பி' : 'Transgender'}</option>
                          <option value="Prefer not to say">{isTamil ? 'கூறவிரும்பவில்லை' : 'Prefer not to say'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Create Password */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'கடவுச்சொல் உருவாக்கவும்' : 'Create Password'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Lock className="w-4 h-4" /></span>
                        <input type={showCreatePwd ? 'text' : 'password'} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)}
                          placeholder={isTamil ? 'வலுவான கடவுச்சொல் உருவாக்கவும்' : 'Create a strong password'}
                          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" required />
                        <button type="button" onClick={() => setShowCreatePwd(!showCreatePwd)}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">
                          {showCreatePwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {isTamil ? 'கடவுச்சொல் உறுதிப்படுத்தவும்' : 'Confirm Password'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><Lock className="w-4 h-4" /></span>
                        <input type={showConfirmPwd ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={isTamil ? 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்' : 'Re-enter your password'}
                          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" required />
                        <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">
                          {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-slate-700">
                      {isTamil ? 'GovAI Nexus-இன் ' : 'I agree to the '}
                      <button type="button" onClick={() => alert('Terms & Conditions')} className="text-purple-700 font-semibold underline">
                        {isTamil ? 'விதிமுறைகள் மற்றும் நிபந்தனைகள்' : 'Terms & Conditions'}
                      </button>
                      {isTamil ? ' மற்றும் ' : ' and '}
                      <button type="button" onClick={() => alert('Privacy Policy')} className="text-purple-700 font-semibold underline">
                        {isTamil ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
                      </button>
                      {isTamil ? '-ஐ ஒப்புக்கொள்கிறேன்.' : ' of GovAI Nexus.'}
                    </span>
                  </label>

                  {/* Create Account Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${currentMeta.btnClass} ${isLoading ? 'opacity-70 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}`}
                  >
                    {isLoading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /><span>{isTamil ? 'உருவாக்கிறது...' : 'Creating Account...'}</span></>
                    ) : (
                      <><Users className="w-4 h-4" /><span>{isTamil ? 'கணக்கை உருவாக்கவும்' : 'Create Account'}</span></>
                    )}
                  </button>

                  {/* Or sign up with */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400 font-medium">{isTamil ? 'அல்லது இதன் மூலம் பதிவு செய்யவும்' : 'Or sign up with'}</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setSuccessMsg('Redirecting to Aadhaar UIDAI...')}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs">
                      <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0">
                        <circle cx="18" cy="18" r="17" fill="#FF6B00" />
                        <path d="M9 18 Q18 6 27 18 Q18 30 9 18Z" fill="#FF4500" />
                        <circle cx="18" cy="18" r="6" fill="white" />
                        <circle cx="18" cy="18" r="3" fill="#FF6B00" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-800">Aadhaar (UIDAI)</span>
                    </button>
                    <button type="button" onClick={() => setSuccessMsg('Redirecting to DigiLocker...')}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs">
                      <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0">
                        <rect x="2" y="2" width="32" height="32" rx="8" fill="#6D28D9" />
                        <path d="M10 22 L10 16 Q10 10 18 10 Q26 10 26 16 L26 22Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                        <rect x="8" y="20" width="20" height="10" rx="3" fill="white" />
                        <circle cx="18" cy="25" r="2.5" fill="#6D28D9" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-800">DigiLocker</span>
                    </button>
                  </div>
                </>
              )}

            </form>

            {/* Quick Demo Access (collapsible) */}
            <div className="border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setShowDemo(!showDemo)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isTamil ? 'விரைவு டெமோ அணுகல்' : 'Quick Demo Access'}</span>
                <span className="ml-1">{showDemo ? '▲' : '▼'}</span>
              </button>

              {showDemo && (
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'citizen' as PortalType, name: 'M. Anandhi', role: 'Citizen', color: 'emerald' },
                    { key: 'employee' as PortalType, name: 'K. Ramanathan', role: 'VAO', color: 'blue' },
                    { key: 'officer' as PortalType, name: 'R. Sundaram', role: 'Dy. Tahsildar', color: 'amber' },
                    { key: 'admin' as PortalType, name: 'State Admin', role: 'Secretariat IT', color: 'purple' },
                    { key: 'analytics' as PortalType, name: 'Dr. S. Kabilan', role: 'AI Director', color: 'indigo' },
                  ].map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => handleQuickDemoLogin(d.key)}
                      className={`p-2 rounded-xl border border-${d.color}-200 bg-${d.color}-50/70 hover:bg-${d.color}-100 text-left transition-colors flex items-center gap-2`}
                    >
                      <div className={`w-6 h-6 rounded-lg bg-${d.color}-200 text-${d.color}-800 flex items-center justify-center shrink-0 text-xs font-bold`}>
                        {d.name[0]}
                      </div>
                      <div className="truncate">
                        <div className={`font-bold text-[11px] text-${d.color}-950 truncate`}>{d.name}</div>
                        <div className={`text-[9px] text-${d.color}-700`}>{d.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              TLS 1.3 256-bit SSL
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Fingerprint className="w-3.5 h-3.5 text-purple-500" />
              MeiPehchaan / Parichay SSO
            </span>
          </div>
          <span className="font-medium text-slate-500">ISO/IEC 27001:2022 Certified</span>
        </div>
      </div>
    </div>
  );
};
