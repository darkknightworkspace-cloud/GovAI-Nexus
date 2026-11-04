import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, ArrowRight, 
  Search, Shield, Bot, Sparkles, Filter, ChevronRight, ChevronLeft, Download,
  Check, RefreshCw, Upload, Eye, User, Lock, ExternalLink,
  Bell, Calendar, Phone, Landmark, Plus, Trash2, Circle, ShieldCheck,
  Home, Award, Building2, CreditCard, FolderArchive, FileEdit, ClipboardList,
  Folder, HelpCircle, Mic, Star, Target, FileCheck, Users,
  GraduationCap, Sprout, HeartPulse, Briefcase, Accessibility, Store,
  FileSpreadsheet, Car, ChevronDown, LogOut, KeyRound, MessageSquare,
  Scale, Bookmark, CloudDownload, RotateCcw, Info, Layers
} from 'lucide-react';
import { 
  CitizenPage, ApplicationRecord, GovScheme, 
  CitizenVaultDocument, RenewalReminder, GovLicence 
} from '../../types';
import { govApi, ComplaintRecord } from '../../services/api';
import { 
  INITIAL_CITIZEN_VAULT, 
  INITIAL_RENEWAL_REMINDERS, 
  MASTER_SCHEMES, 
  MASTER_LICENCES,
  SERVICE_DOCUMENT_CHECKLISTS 
} from '../../data/govDirectoryData';

import botMascotImg from '../../assets/images/tn_bot_mascot_1793708208707.jpg';
import karthikAvatarImg from '../../assets/images/karthik_avatar_1793708208375.jpg';
import heroBgImg from '../../assets/images/govai_hero_bg_1793463222318.jpg';
import womenImg from '../../assets/images/women_beneficiaries_1793708227920.jpg';
import girlImg from '../../assets/images/girl_student_portrait_1793708230900.jpg';
import farmerImg from '../../assets/images/farmer_beneficiary_1793708228408.jpg';
import houseImg from '../../assets/images/tn_kanavu_illam_house_1793710179680.jpg';

import { CitizenSchemesPage } from './CitizenSchemesPage';
import { CitizenServicesPage } from './CitizenServicesPage';
import { CitizenCertificatesPage } from './CitizenCertificatesPage';
import { CitizenLicensesPage } from './CitizenLicensesPage';
import { CitizenDocumentsDirectoryPage } from './CitizenDocumentsDirectoryPage';
import { CitizenApplyHerePage } from './CitizenApplyHerePage';
import { CitizenApplicationsPage } from './CitizenApplicationsPage';
import { CitizenDocumentsVaultPage } from './CitizenDocumentsVaultPage';
import { CitizenRenewalsPage } from './CitizenRenewalsPage';
import { CitizenGrievancePage } from './CitizenGrievancePage';
import { CitizenHelpSupportPage } from './CitizenHelpSupportPage';

interface CitizenPortalViewProps {
  language: 'en' | 'ta';
  currentPage: CitizenPage;
  onNavigate: (page: CitizenPage) => void;
  onOpenAIAssistant: () => void;
  onOpenChecklistModal?: (title: string) => void;
  onOpenSchemeModal?: (scheme: GovScheme) => void;
  onOpenApplyModal?: (item: any) => void;
  onExitToPublic?: () => void;
  onToggleLanguage?: (lang: 'en' | 'ta') => void;
  onAdjustFontSize?: (delta: number) => void;
  fontSize?: number;
  currentUser?: any;
  onLogout?: () => void;
  onOpenAuth?: (portal?: any, mode?: 'login' | 'signup') => void;
}

export const CitizenPortalView: React.FC<CitizenPortalViewProps> = ({
  language,
  currentPage,
  onNavigate,
  onOpenAIAssistant,
  onOpenChecklistModal,
  onOpenSchemeModal,
  onOpenApplyModal,
  onExitToPublic,
  onToggleLanguage,
  onAdjustFontSize,
  fontSize = 0,
  currentUser,
  onLogout,
  onOpenAuth
}) => {
  const isTamil = language === 'ta';

  // State for Citizen Dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  // State for Find Schemes (AI) Page matching image_545b3dbf.png
  const [schemeActiveSubTab, setSchemeActiveSubTab] = useState<'finder' | 'eligibility' | 'directory' | 'compare' | 'saved'>('finder');
  const [schemeStep, setSchemeStep] = useState<number>(1);
  const [profileAge, setProfileAge] = useState<number | string>(28);
  const [profileGender, setProfileGender] = useState<string>('Male');
  const [profileDistrict, setProfileDistrict] = useState<string>('Chennai');
  const [profileTaluk, setProfileTaluk] = useState<string>('Alandur');
  const [profileIncome, setProfileIncome] = useState<string>('₹ 1,00,001 – ₹ 3,00,000');
  const [profileOccupation, setProfileOccupation] = useState<string>('Private Employee');
  const [profileEducation, setProfileEducation] = useState<string>('Graduate');
  const [profileMaritalStatus, setProfileMaritalStatus] = useState<string>('Single');
  const [profileTags, setProfileTags] = useState<{ [key: string]: boolean }>({
    Student: false,
    Farmer: false,
    'Differently Abled': false,
    No: true,
    Woman: false,
    'Senior Citizen': false,
    'Member of Welfare Board': false
  });
  const [schemeFilterStatus, setSchemeFilterStatus] = useState<'all' | 'likely' | 'potential' | 'more_info'>('all');
  const [schemeSortBy, setSchemeSortBy] = useState<string>('Best Match');
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<{ [id: string]: boolean }>({});
  const [autoFillNotice, setAutoFillNotice] = useState<string | null>(null);

  // Applications live list
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [selectedAppForModal, setSelectedAppForModal] = useState<ApplicationRecord | null>(null);

  // Application Wizard Form State
  const [appStep, setAppStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    serviceTitle: 'Community Certificate',
    applicantName: 'M. Anandhi',
    district: 'Madurai',
    taluk: 'Madurai North',
    fatherName: 'R. Murugan',
    communityCategory: 'BC',
    annualIncome: '1,20,000',
    aadhaarNumber: 'XXXX-XXXX-8912',
    rationCardNumber: '04/G/0291823'
  });
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isApplyWizardActive, setIsApplyWizardActive] = useState<boolean>(false);

  // Scheme Eligibility Questionnaire State
  const [incomeInput, setIncomeInput] = useState<number>(18000);
  const [isFemaleHead, setIsFemaleHead] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('BC');
  const [eligibleSchemes, setEligibleSchemes] = useState<GovScheme[]>([]);
  const [hasEvaluatedSchemes, setHasEvaluatedSchemes] = useState<boolean>(false);

  // Complaint Form State
  const [complaintForm, setComplaintForm] = useState({
    department: 'Revenue & Disaster Management',
    district: 'Madurai',
    category: 'Service Delay',
    subject: '',
    description: '',
    priority: 'HIGH' as 'LOW' | 'MEDIUM' | 'HIGH'
  });
  const [submittedComplaintNo, setSubmittedComplaintNo] = useState<string | null>(null);

  // DPDP 2023 Consent Toggles
  const [consents, setConsents] = useState({
    digilockerAutoFetch: true,
    revenueCrossDepartmentAccess: true,
    smsWhatsAppNotifications: true,
    anonymousAnalyticsUsage: false
  });

  // Citizen Document Vault State
  const [vaultDocs, setVaultDocs] = useState<CitizenVaultDocument[]>(INITIAL_CITIZEN_VAULT);
  const [vaultFilterCategory, setVaultFilterCategory] = useState<string>('All');
  const [selectedVaultDocForPreview, setSelectedVaultDocForPreview] = useState<CitizenVaultDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Identity Documents');
  const [newDocNumber, setNewDocNumber] = useState('');

  // Renewal Reminders State
  const [reminders, setReminders] = useState<RenewalReminder[]>(INITIAL_RENEWAL_REMINDERS);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderType, setNewReminderType] = useState<'DRIVING_LICENCE' | 'TRADE_LICENCE' | 'PUC_CERTIFICATE' | 'VEHICLE_INSURANCE' | 'FSSAI_LICENCE'>('DRIVING_LICENCE');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderNumber, setNewReminderNumber] = useState('');

  // Dynamic Checklist Generator State
  const [selectedChecklistService, setSelectedChecklistService] = useState<string>('Community Certificate');
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<{ [key: string]: boolean }>({
    'Aadhaar Card (UIDAI)': true,
    'Tamil Nadu Smart Ration Card': true
  });

  // AI Scheme Finder State
  const [finderGender, setFinderGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [finderAge, setFinderAge] = useState<number>(24);
  const [finderAnnualIncome, setFinderAnnualIncome] = useState<number>(180000);
  const [finderStudent, setFinderStudent] = useState<boolean>(true);
  const [finderFarmer, setFinderFarmer] = useState<boolean>(false);
  const [finderDifferentlyAbled, setFinderDifferentlyAbled] = useState<boolean>(false);
  const [finderCategory, setFinderCategory] = useState<string>('BC');
  const [finderResults, setFinderResults] = useState<GovScheme[] | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apps = await govApi.getApplications();
    const cmps = await govApi.getComplaints();
    setApplications(apps);
    setComplaints(cmps);
  };

  const handleApplySubmit = async () => {
    setIsSubmitting(true);
    try {
      const newApp = await govApi.submitApplication({
        serviceTitle: formData.serviceTitle,
        applicantName: formData.applicantName,
        district: formData.district,
        documentsCount: 4
      });
      setSubmittedAppNumber(newApp.appNumber);
      await loadData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEvaluateEligibility = async () => {
    const results = await govApi.checkEligibility({
      monthlyIncome: incomeInput,
      district: 'Madurai',
      category: selectedCategory,
      isStudent,
      isFemaleHeadOfFamily: isFemaleHead
    });
    setEligibleSchemes(results);
    setHasEvaluatedSchemes(true);
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintForm.subject || !complaintForm.description) return;
    const cmp = await govApi.submitComplaint(complaintForm);
    setSubmittedComplaintNo(cmp.complaintNumber);
    setComplaintForm({
      department: 'Revenue & Disaster Management',
      district: 'Madurai',
      category: 'Service Delay',
      subject: '',
      description: '',
      priority: 'HIGH'
    });
    await loadData();
  };

  // Navigation sidebar item definitions exactly matching image_c32f81cc.png
  const navItems = [
    { id: 'dashboard' as CitizenPage, labelEn: 'Dashboard', labelTa: 'முகப்பு பலகை', icon: <Home className="w-4 h-4" /> },
    { id: 'scheme-finder' as CitizenPage, labelEn: 'Find Schemes (AI)', labelTa: 'திட்ட கண்டறிதல் (AI)', icon: <Bot className="w-4 h-4" /> },
    { id: 'schemes' as CitizenPage, labelEn: 'Government Schemes', labelTa: 'அரசு நலத்திட்டங்கள்', icon: <Award className="w-4 h-4" /> },
    { id: 'services' as CitizenPage, labelEn: 'Government Services', labelTa: 'அரசு சேவைகள்', icon: <Building2 className="w-4 h-4" /> },
    { id: 'certificates' as CitizenPage, labelEn: 'Certificates', labelTa: 'சான்றிதழ்கள்', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'licenses' as CitizenPage, labelEn: 'Licences & Permits', labelTa: 'உரிமங்கள் & அனுமதிகள்', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'documents-directory' as CitizenPage, labelEn: 'Documents Directory', labelTa: 'ஆவண வழிகாட்டி', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'apply' as CitizenPage, labelEn: 'Apply Here', labelTa: 'இங்கே விண்ணப்பிக்க', icon: <FileEdit className="w-4 h-4" /> },
    { id: 'my-applications' as CitizenPage, labelEn: 'My Applications', labelTa: 'என் விண்ணப்பங்கள்', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'my-documents' as CitizenPage, labelEn: 'My Documents', labelTa: 'என் ஆவணங்கள்', icon: <Folder className="w-4 h-4" /> },
    { id: 'renewal-reminders' as CitizenPage, labelEn: 'Renewal & Reminders', labelTa: 'புதுப்பித்தல் & நினைவூட்டல்', icon: <Clock className="w-4 h-4" /> },
    { id: 'grievances' as CitizenPage, labelEn: 'Grievance & Feedback', labelTa: 'குறைதீர்ப்பு & கருத்து', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'help-support' as CitizenPage, labelEn: 'Help & Support', labelTa: 'உதவி & ஆதரவு', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // 12 Explore Categories
  const categoryTiles = [
    { titleEn: 'Women & Family Welfare', titleTa: 'பெண்கள் & குடும்ப நலம்', bg: 'bg-[#FDF2F8]', text: 'text-[#831843]', border: 'border-pink-200', icon: <Users className="w-4 h-4 text-[#DB2777]" /> },
    { titleEn: 'Students & Education', titleTa: 'மாணவர்கள் & கல்வி', bg: 'bg-[#EFF6FF]', text: 'text-[#1E40AF]', border: 'border-blue-200', icon: <GraduationCap className="w-4 h-4 text-[#2563EB]" /> },
    { titleEn: 'Farmers & Agriculture', titleTa: 'விவசாயிகள் & வேளாண்மை', bg: 'bg-[#F0FDF4]', text: 'text-[#166534]', border: 'border-emerald-200', icon: <Sprout className="w-4 h-4 text-[#16A34A]" /> },
    { titleEn: 'Health & Medical', titleTa: 'சுகாதாரம் & மருத்துவம்', bg: 'bg-[#FFF1F2]', text: 'text-[#9F1239]', border: 'border-rose-200', icon: <HeartPulse className="w-4 h-4 text-[#E11D48]" /> },
    { titleEn: 'Housing & Rural Development', titleTa: 'வீட்டுவசதி & ஊரக வளர்ச்சி', bg: 'bg-[#FFFBEB]', text: 'text-[#92400E]', border: 'border-amber-200', icon: <Home className="w-4 h-4 text-[#D97706]" /> },
    { titleEn: 'Employment & Skills', titleTa: 'வேலைவாய்ப்பு & திறன்', bg: 'bg-[#F5F3FF]', text: 'text-[#5B21B6]', border: 'border-purple-200', icon: <Briefcase className="w-4 h-4 text-[#7C3AED]" /> },
    { titleEn: 'Differently Abled Welfare', titleTa: 'மாற்றுத்திறனாளிகள் நலம்', bg: 'bg-[#F0F9FF]', text: 'text-[#075985]', border: 'border-sky-200', icon: <Accessibility className="w-4 h-4 text-[#0284C7]" /> },
    { titleEn: 'Senior Citizens & Social Security', titleTa: 'மூத்த குடிமக்கள் & பாதுகாப்பு', bg: 'bg-[#FAF5FF]', text: 'text-[#6B21A8]', border: 'border-violet-200', icon: <Users className="w-4 h-4 text-[#9333EA]" /> },
    { titleEn: 'Business & Licences', titleTa: 'வணிகம் & உரிமங்கள்', bg: 'bg-[#FFF7ED]', text: 'text-[#9A3412]', border: 'border-orange-200', icon: <Store className="w-4 h-4 text-[#EA580C]" /> },
    { titleEn: 'Certificates (Revenue)', titleTa: 'சான்றிதழ்கள் (வருவாய்)', bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]', border: 'border-emerald-200', icon: <FileCheck className="w-4 h-4 text-[#059669]" /> },
    { titleEn: 'Documents & Records', titleTa: 'ஆவணங்கள் & பதிவுகள்', bg: 'bg-[#ECFEFF]', text: 'text-[#155E75]', border: 'border-cyan-200', icon: <FileSpreadsheet className="w-4 h-4 text-[#0891B2]" /> },
    { titleEn: 'Transport & Vehicle Services', titleTa: 'போக்குவரத்து & வாகன சேவை', bg: 'bg-[#EEF2FF]', text: 'text-[#3730A3]', border: 'border-indigo-200', icon: <Car className="w-4 h-4 text-[#4F46E5]" /> },
  ];

  // 6 Quick Apply Services
  const quickApplyServices = [
    { titleEn: 'Income Certificate', titleTa: 'வருமானச் சான்றிதழ்', icon: <FileText className="w-4 h-4 text-blue-600" /> },
    { titleEn: 'Community Certificate', titleTa: 'சாதிச் சான்றிதழ்', icon: <Users className="w-4 h-4 text-amber-600" /> },
    { titleEn: 'Nativity Certificate', titleTa: 'இருப்பிடச் சான்றிதழ்', icon: <Home className="w-4 h-4 text-emerald-600" /> },
    { titleEn: 'Ration / Smart Family Card', titleTa: 'ஸ்மார்ட் குடும்ப அட்டை', icon: <CreditCard className="w-4 h-4 text-purple-600" /> },
    { titleEn: 'Driving Licence (DL)', titleTa: 'ஓட்டுநர் உரிமம் (DL)', icon: <Car className="w-4 h-4 text-emerald-600" /> },
    { titleEn: 'Vehicle Registration (RC)', titleTa: 'வாகனப் பதிவு (RC)', icon: <Car className="w-4 h-4 text-red-600" /> },
  ];

  // Recommended for You Cards
  const recommendedSchemes = [
    {
      id: 'kmur-01',
      title: 'Kalaignar Magalir Urimai Thogai',
      titleTa: 'கலைஞர் மகளிர் உரிமைத் தொகை',
      tag: 'State Scheme >',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: '₹1,000 monthly assistance for eligible women heads of households.',
      descriptionTa: 'தகுதியான குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 உரிமைத் தொகை.',
      image: womenImg
    },
    {
      id: 'pp-02',
      title: 'Pudhumai Penn',
      titleTa: 'புதுமைப் பெண் திட்டம்',
      tag: 'State Scheme >',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Financial assistance for girl students in higher education.',
      descriptionTa: 'உயர் கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 நிதியுதவி.',
      image: girlImg
    },
    {
      id: 'kisan-03',
      title: 'PM-KISAN',
      titleTa: 'பி.எம் கிசான் திட்டம்',
      tag: 'Central Scheme',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: '₹6,000 per year income support for eligible farmer families.',
      descriptionTa: 'விவசாய குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 வருமான ஆதரவு.',
      image: farmerImg
    }
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('scheme-finder');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] text-[#0F172A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOPMOST BAR (Slate-900 #0F172A)                                         */}
      {/* ========================================================================= */}
      <header className="bg-[#0F172A] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 z-40">
        {/* Left: TN Seal + Bilingual Text */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-white/10 p-0.5 border border-white/20 shrink-0">
            <img src="/assets/aistudio/image_5b30609e.png" alt="TN Seal" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-xs sm:text-sm">Government of Tamil Nadu</span>
            <span className="text-slate-400 text-xs hidden sm:inline">|</span>
            <span className="text-slate-300 text-xs hidden sm:inline">தமிழ்நாடு அரசு</span>
          </div>
        </div>

        {/* Right: Language, Font, Notifications, Karthik Profile */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Language Switchers */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <button
              onClick={() => onToggleLanguage && onToggleLanguage('en')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-0.5 ${!isTamil ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
            >
              <span>English</span>
              <span className="text-[10px]">⌵</span>
            </button>
            <button
              onClick={() => onToggleLanguage && onToggleLanguage('ta')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-0.5 ${isTamil ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
            >
              <span>தமிழ்</span>
              <span className="text-[10px]">⌵</span>
            </button>
          </div>

          {/* Font Resizing Controls */}
          <div className="hidden sm:flex items-center gap-1 text-slate-300 font-bold text-xs border-x border-slate-700 px-3">
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(-1)} className="hover:text-white px-1">A-</button>
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(0)} className="hover:text-white px-1">A</button>
            <button onClick={() => onAdjustFontSize && onAdjustFontSize(1)} className="hover:text-white px-1">A+</button>
          </div>

          {/* Notification Bell with Badge 3 */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0F172A]">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-slate-900">Notifications (3 New)</h4>
                  <span className="text-[10px] text-purple-700 font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">Income Certificate Approved</span>
                      <span className="text-[10px] text-slate-400">10:15 AM</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Application TNIC25011839 has been digitally approved by Tahsildar.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">Driving Licence Renewal Alert</span>
                      <span className="text-[10px] text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Licence TNDL25009345 expires in 18 days. Submit documents online.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">Pudhumai Penn Recommended</span>
                      <span className="text-[10px] text-slate-400">2 days ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">You may be eligible for higher education grant assistance.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip: Karthik R */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-white/10 py-1 px-2 rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/50 shrink-0">
                <img src={karthikAvatarImg} alt="Karthik R" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="flex items-center gap-1 font-bold text-xs text-white">
                  <span>Karthik R</span>
                  <span className="text-[10px] text-slate-400">⌵</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Citizen</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-400 shrink-0">
                    <img src={karthikAvatarImg} alt="Karthik R" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Karthik R</h5>
                    <p className="text-[10px] text-slate-500">Citizen · Madurai, TN</p>
                    <p className="font-mono text-[9px] text-purple-700">Aadhaar: XXXX-XXXX-8912</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-purple-700" />
                    <span>{isTamil ? 'சுயவிவரம் & DPDP ஒப்புதல்' : 'My Profile & DPDP 2023'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onOpenAuth && onOpenAuth('citizen', 'login'); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isTamil ? 'கணக்கை மாற்று' : 'Switch / Login Account'}</span>
                  </button>
                  <button
                    onClick={() => { setIsProfileOpen(false); onExitToPublic ? onExitToPublic() : (onLogout && onLogout()); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-700 font-medium flex items-center gap-2 border-t border-slate-100 mt-1 pt-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>{isTamil ? 'வெளியேறு (Public Portal)' : 'Exit to Public Portal'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BRANDING SUB-HEADER (White #FFFFFF)                                     */}
      {/* ========================================================================= */}
      <div className="bg-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-200 shadow-2xs shrink-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs shrink-0">
            <img src="/assets/aistudio/image_5b30609e.png" alt="GovAI Nexus" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">GovAI Nexus</h1>
            <p className="text-[11px] text-slate-500 font-medium">AI-Powered Governance Platform</p>
          </div>
        </div>

        {/* Purple Pill Badge: Citizen Portal */}
        <div className="bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs">
          <User className="w-3.5 h-3.5" />
          <span>Citizen Portal</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN BODY CONTAINER: Left Sidebar + Right Content Canvas                */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT NAVIGATION SIDEBAR (#131333, w-64) */}
        <aside className="w-64 bg-[#131333] text-white flex flex-col justify-between shrink-0 min-h-[calc(100vh-100px)] border-r border-slate-800 overflow-y-auto">
          <div className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = (currentPage === item.id) ||
                (item.id === 'services' && currentPage === 'service-explorer') ||
                (item.id === 'certificates' && currentPage === 'document-checklist') ||
                (item.id === 'licenses' && currentPage === 'licences-directory') ||
                (item.id === 'my-documents' && (currentPage === 'my-documents' || currentPage === 'documents-vault')) ||
                (item.id === 'renewal-reminders' && (currentPage === 'renewals' || currentPage === 'renewal-reminders')) ||
                (item.id === 'grievances' && (currentPage === 'grievances' || currentPage === 'complaints')) ||
                (item.id === 'help-support' && (currentPage === 'help-support' || currentPage === 'profile'));
              return (
                <button
                  key={item.labelEn}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7C3AED] text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span className="truncate">{isTamil ? item.labelTa : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Fort St. George Architectural Secretariat Silhouette Watermark */}
          <div className="p-4 pt-6 pointer-events-none opacity-25 flex justify-center">
            <svg className="w-full h-24 text-purple-300" viewBox="0 0 200 120" fill="currentColor">
              <path d="M10 115 H190 V110 H10 Z" />
              <rect x="25" y="70" width="150" height="40" rx="1" />
              <rect x="35" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="55" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="75" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="95" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="115" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="135" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="155" y="80" width="12" height="18" rx="6" fill="#131333" />
              <rect x="70" y="38" width="60" height="32" />
              <circle cx="100" cy="54" r="7" fill="#131333" />
              <path d="M70 38 Q100 15 130 38 Z" />
              <line x1="100" y1="15" x2="100" y2="4" stroke="currentColor" strokeWidth="2" />
              <polygon points="100,5 112,8 100,11" />
              <circle cx="45" cy="55" r="9" />
              <circle cx="155" cy="55" r="9" />
            </svg>
          </div>
        </aside>

        {/* RIGHT CONTENT CANVAS (#F4F6FB) */}
        <main className="flex-1 bg-[#F4F6FB] p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* ================================================================= */}
          {/* VIEW: CITIZEN DASHBOARD (Exact Match with image_c32f81cc.png)      */}
          {/* ================================================================= */}
          {currentPage === 'dashboard' && (
            <div className="space-y-5">
              {/* 1. Welcome Banner with Temple & Thiruvalluvar Panorama + Ask GovAI card */}
              <div className="bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E293B] rounded-3xl p-5 sm:p-7 relative overflow-hidden text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Panorama background cutout overlay */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <img
                    src={heroBgImg}
                    alt="Tamil Nadu Landmarks"
                    className="w-full h-full object-cover object-right lg:object-center opacity-35 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E3A8A]/90 to-transparent w-full lg:w-3/5"></div>
                </div>

                {/* Left: Greeting & Mission */}
                <div className="relative z-10 space-y-2 max-w-xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <span>{isTamil ? 'வரவேற்கிறோம், கார்த்திக் R' : 'Welcome, Karthik R'}</span>
                    <span className="text-2xl">👋</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                    {isTamil
                      ? 'தமிழ்நாடு அரசு நலத்திட்டங்கள், சேவைகள், சான்றிதழ்கள் மற்றும் உரிமங்களுக்கான உங்கள் ஒரே தள நுழைவாயில்.'
                      : 'Your one-stop gateway to Tamil Nadu Government Schemes, Services, Certificates and Licences.'}
                  </p>
                </div>

                {/* Right: Floating White "Ask GovAI" Card with 3D Mascot */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 text-slate-900 shadow-xl border border-white/60 w-full sm:w-80 shrink-0 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0">
                      <img src={botMascotImg} alt="GovAI Bot Mascot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Ask GovAI</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Your AI Government Assistant</p>
                      <p className="text-[10px] text-slate-600 mt-1 leading-tight">
                        Get scheme suggestions, eligibility, required documents and application help.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenAIAssistant}
                    className="mt-3.5 w-full py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Ask a Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Global Search Bar & Quick Action Pills */}
              <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-2xs flex flex-wrap lg:flex-nowrap items-center gap-2.5">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-purple-500 focus-within:bg-white transition-all">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isTamil ? 'திட்டங்கள், சேவைகள், சான்றிதழ்களைத் தேடுங்கள்... (எ.கா. புதுமைப் பெண், வருமானச் சான்றிதழ்)' : 'Search for schemes, services, certificates, licences... (e.g., Pudhumai Penn, Income Certificate, Driving Licence)'}
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-hidden font-medium"
                  />
                </form>

                <button
                  onClick={() => handleSearchSubmit()}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  {isTamil ? 'தேடுக' : 'Search'}
                </button>

                <button
                  onClick={onOpenAIAssistant}
                  className="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  title="Voice Search"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                  <button
                    onClick={() => onNavigate('scheme-finder')}
                    className="px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-2xs cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                    <span>AI Scheme Finder</span>
                  </button>

                  <button
                    onClick={() => onNavigate('scheme-finder')}
                    className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-2xs cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Eligibility Check</span>
                  </button>

                  <button
                    onClick={() => onNavigate('document-checklist')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-2xs cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Document Checklist</span>
                  </button>
                </div>
              </div>

              {/* 3. 5 KPI Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {/* 1. My Applications */}
                <div
                  onClick={() => onNavigate('my-applications')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block">My Applications</span>
                    <div className="text-2xl font-black text-slate-900 leading-tight">3</div>
                    <span className="text-[10px] text-slate-500 font-medium">1 Under Review</span>
                  </div>
                </div>

                {/* 2. My Documents */}
                <div
                  onClick={() => onNavigate('documents-vault')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block">My Documents</span>
                    <div className="text-2xl font-black text-slate-900 leading-tight">12</div>
                    <span className="text-[10px] text-slate-500 font-medium">Verified: 8</span>
                  </div>
                </div>

                {/* 3. Upcoming Renewals */}
                <div
                  onClick={() => onNavigate('renewal-reminders')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block">Upcoming Renewals</span>
                    <div className="text-2xl font-black text-slate-900 leading-tight">2</div>
                    <span className="text-[10px] text-slate-500 font-medium">Within 30 Days</span>
                  </div>
                </div>

                {/* 4. Eligible Schemes */}
                <div
                  onClick={() => onNavigate('scheme-finder')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block">Eligible Schemes</span>
                    <div className="text-2xl font-black text-slate-900 leading-tight">7</div>
                    <span className="text-[10px] text-slate-500 font-medium">Recommended for You</span>
                  </div>
                </div>

                {/* 5. Notifications */}
                <div
                  onClick={() => setIsNotificationsOpen(true)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow cursor-pointer col-span-2 sm:col-span-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block">Notifications</span>
                    <div className="text-2xl font-black text-slate-900 leading-tight">3</div>
                    <span className="text-[10px] text-slate-500 font-medium">New Updates</span>
                  </div>
                </div>
              </div>

              {/* 4. Middle Section (3 Columns): Explore by Category, AI Scheme Finder, Quick Apply */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* COLUMN 1 (lg:col-span-6): Explore by Category */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 text-purple-700 flex flex-wrap gap-0.5">
                          <div className="w-1.5 h-1.5 bg-purple-700 rounded-xs"></div>
                          <div className="w-1.5 h-1.5 bg-purple-700 rounded-xs"></div>
                          <div className="w-1.5 h-1.5 bg-purple-700 rounded-xs"></div>
                          <div className="w-1.5 h-1.5 bg-purple-700 rounded-xs"></div>
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900">Explore by Category</h3>
                      </div>
                      <button
                        onClick={() => onNavigate('service-explorer')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3.5">
                      Find government schemes and services based on your needs.
                    </p>

                    {/* 12 Pastel Category Buttons (2 columns x 6 rows) */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {categoryTiles.map((cat) => (
                        <button
                          key={cat.titleEn}
                          onClick={() => {
                            setActiveCategoryFilter(cat.titleEn);
                            onNavigate('service-explorer');
                          }}
                          className={`${cat.bg} ${cat.text} ${cat.border} border p-2.5 rounded-xl text-left flex items-center gap-2.5 hover:brightness-95 transition-all shadow-2xs group cursor-pointer`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                            {cat.icon}
                          </div>
                          <span className="font-bold text-[11px] leading-tight truncate">
                            {isTamil ? cat.titleTa : cat.titleEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COLUMN 2 (lg:col-span-3): AI Scheme Finder Card */}
                <div className="lg:col-span-3 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-200" />
                      <h3 className="font-extrabold text-sm text-white">AI Scheme Finder</h3>
                    </div>
                    <p className="text-[11px] text-purple-100/90 leading-snug">
                      Get personalized government scheme recommendations based on your profile.
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      {/* 4 Checkmarks */}
                      <div className="space-y-1.5 text-xs text-white">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span className="text-[11px] font-medium">Check your eligibility</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span className="text-[11px] font-medium">Get matching schemes</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span className="text-[11px] font-medium">See required documents</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span className="text-[11px] font-medium">Apply online or get official link</span>
                        </div>
                      </div>

                      {/* Mascot floating icon */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-md shrink-0 bg-white/10">
                        <img src={botMascotImg} alt="Mascot" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('scheme-finder')}
                    className="mt-4 w-full py-2.5 px-3 bg-[#5B21B6] hover:bg-[#4C1D95] border border-purple-300/40 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer relative z-10"
                  >
                    <span>Find Schemes for Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* COLUMN 3 (lg:col-span-3): Quick Apply */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-700" />
                      <h3 className="font-extrabold text-sm text-slate-900">Quick Apply</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-2.5">Most used services</p>

                    <div className="divide-y divide-slate-100">
                      {quickApplyServices.map((srv) => (
                        <div
                          key={srv.titleEn}
                          onClick={() => {
                            if (onOpenApplyModal) {
                              onOpenApplyModal({ title: srv.titleEn, department: 'Revenue & Disaster Management' });
                            } else {
                              onNavigate('apply');
                            }
                          }}
                          className="py-2.5 flex items-center justify-between hover:bg-purple-50/60 px-2 rounded-xl transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                              {srv.icon}
                            </div>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                              {isTamil ? srv.titleTa : srv.titleEn}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('service-explorer')}
                    className="mt-2.5 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center justify-center gap-1 py-1.5 cursor-pointer"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 5. Bottom Section: Recommended for You Carousel + My Application Status */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* LEFT (lg:col-span-7): Recommended for You */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-700" />
                        <h3 className="font-extrabold text-sm text-slate-900">Recommended for You</h3>
                      </div>
                      <button
                        onClick={() => onNavigate('schemes')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All Recommended</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3.5">
                      Based on your profile and recent activity.
                    </p>

                    {/* Cards Carousel */}
                    <div className="relative">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {recommendedSchemes.map((sch) => (
                          <div
                            key={sch.id}
                            className="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sch.tagColor}`}>
                                  {sch.tag}
                                </span>
                                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-2xs">
                                  <img src={sch.image} alt={sch.title} className="w-full h-full object-cover" />
                                </div>
                              </div>
                              <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                                {isTamil ? sch.titleTa : sch.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                                {isTamil ? sch.descriptionTa : sch.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 pt-3 mt-1 border-t border-slate-100">
                              <button
                                onClick={() => {
                                  const master = MASTER_SCHEMES.find(m => m.titleEn.toLowerCase().includes(sch.title.toLowerCase().split(' ')[0]));
                                  if (onOpenSchemeModal && master) onOpenSchemeModal(master);
                                  else onNavigate('schemes');
                                }}
                                className="py-1 px-2 text-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[10px] transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => {
                                  const master = MASTER_SCHEMES.find(m => m.titleEn.toLowerCase().includes(sch.title.toLowerCase().split(' ')[0]));
                                  if (onOpenApplyModal && master) onOpenApplyModal(master);
                                  else onNavigate('apply');
                                }}
                                className="py-1 px-2 text-center rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] transition-colors cursor-pointer"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Carousel Arrow Buttons */}
                      <button
                        onClick={() => setRecommendedIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-700 cursor-pointer hidden sm:flex"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRecommendedIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-700 cursor-pointer hidden sm:flex"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center items-center gap-1.5 pt-3">
                      <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    </div>
                  </div>
                </div>

                {/* RIGHT (lg:col-span-5): My Application Status */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-700" />
                        <h3 className="font-extrabold text-sm text-slate-900">My Application Status</h3>
                      </div>
                      <button
                        onClick={() => onNavigate('my-applications')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3.5">
                      Track your recent applications.
                    </p>

                    {/* 3 Tracked Application Cards */}
                    <div className="space-y-2.5">
                      {/* 1. Income Certificate */}
                      <div
                        onClick={() => onNavigate('my-applications')}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-2xs transition-all flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Income Certificate</h5>
                            <span className="text-[10px] text-slate-500 font-mono">App No: TNIC25011839</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Approved
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>

                      {/* 2. Community Certificate */}
                      <div
                        onClick={() => onNavigate('my-applications')}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-2xs transition-all flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Community Certificate</h5>
                            <span className="text-[10px] text-slate-500 font-mono">App No: TNCC25010721</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                            Under Review
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>

                      {/* 3. Driving Licence (Renewal) */}
                      <div
                        onClick={() => onNavigate('my-applications')}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-2xs transition-all flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Car className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Driving Licence (Renewal)</h5>
                            <span className="text-[10px] text-slate-500 font-mono">App No: TNDL25009345</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Documents Required
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUBPAGES WRAPPER: When currentPage !== 'dashboard'                */}
          {/* ================================================================= */}
          {currentPage !== 'dashboard' && (
            <div className="space-y-6">
              {!['scheme-finder', 'scheme-recommendations', 'schemes', 'services', 'service-explorer', 'certificates', 'licenses', 'licences-directory', 'documents-directory', 'apply', 'my-applications', 'my-documents', 'documents-vault', 'renewal-reminders', 'renewals', 'complaints', 'grievances', 'profile', 'help-support'].includes(currentPage) && (
                <div className="flex items-center justify-between bg-white p-3.5 px-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{isTamil ? '← முகப்பு பலகைக்குத் திரும்பு' : '← Back to Dashboard'}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Citizen Portal</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-xs font-bold text-purple-900 capitalize">
                      {currentPage.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              )}

      {/* ===================================================================== */}
      {/* 1. GOVERNMENT SCHEMES (image_4f4de377.png)                            */}
      {/* ===================================================================== */}
      {currentPage === 'schemes' && (
        <CitizenSchemesPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenSchemeModal={onOpenSchemeModal}
          onOpenApplyModal={onOpenApplyModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 2. GOVERNMENT SERVICES (image_bc3315d8.png)                           */}
      {/* ===================================================================== */}
      {(currentPage === 'services' || currentPage === 'service-explorer') && (
        <CitizenServicesPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenApplyModal={onOpenApplyModal}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 3. CERTIFICATES (image_6f09dc41.png)                                  */}
      {/* ===================================================================== */}
      {currentPage === 'certificates' && (
        <CitizenCertificatesPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenApplyModal={onOpenApplyModal}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 4. LICENCES & PERMITS (image_77fd75fe.png)                            */}
      {/* ===================================================================== */}
      {(currentPage === 'licenses' || currentPage === 'licences-directory') && (
        <CitizenLicensesPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenApplyModal={onOpenApplyModal}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 5. DOCUMENTS DIRECTORY (image_a7e5f72b.png)                           */}
      {/* ===================================================================== */}
      {currentPage === 'documents-directory' && (
        <CitizenDocumentsDirectoryPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 6. APPLY HERE (image_b372c292.png)                                    */}
      {/* ===================================================================== */}
      {currentPage === 'apply' && !isApplyWizardActive && (
        <CitizenApplyHerePage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onStartWizard={(srv) => {
            if (srv) setFormData(prev => ({ ...prev, serviceTitle: srv }));
            setIsApplyWizardActive(true);
            setAppStep(1);
          }}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* PAGE 15: APPLY FOR SERVICES 4-STEP WIZARD (When wizard is active)     */}
      {/* ===================================================================== */}
      {currentPage === 'apply' && isApplyWizardActive && (
        <div className="space-y-4">
          <button
            onClick={() => setIsApplyWizardActive(false)}
            className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isTamil ? '← அனைத்து சேவைகளுக்கும் திரும்பு' : '← Back to All Services to Apply'}</span>
          </button>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              {isTamil ? `படி ${appStep} / 4 · அரசு விண்ணப்ப வழிகாட்டி` : `Step ${appStep} of 4 · Government Application Wizard`}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {isTamil ? 'அரசு சான்றிதழுக்கு விண்ணப்பிக்க' : 'Apply for Official Government Service'}
            </h2>
            <p className="text-xs text-slate-500">
              Direct digital integration with Tamil Nadu Revenue & Survey Departments
            </p>
          </div>

          {submittedAppNumber ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-extrabold text-xl text-emerald-950">Application Lodged Successfully!</h3>
                <p className="text-xs text-slate-600">
                  Your official application tracking number has been generated and sent via SMS:
                </p>
                <div className="py-2">
                  <span className="font-mono text-lg font-bold text-purple-800 bg-white px-4 py-1.5 rounded-xl border border-purple-200 inline-block">
                    {submittedAppNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Target Statutory Resolution SLA: <strong>7 Working Days</strong> (Revenue Department)
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSubmittedAppNumber(null);
                    setAppStep(1);
                    onNavigate('my-applications');
                  }}
                  className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Track in My Applications
                </button>
                <button
                  onClick={() => {
                    setSubmittedAppNumber(null);
                    setAppStep(1);
                  }}
                  className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Apply for Another Service
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 1: Service Selection */}
              {appStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Select Required Service</label>
                    <select 
                      value={formData.serviceTitle}
                      onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option>Community Certificate</option>
                      <option>Income Certificate</option>
                      <option>Nativity Certificate</option>
                      <option>First Graduate Certificate</option>
                      <option>Widow Pension Scheme Assistance</option>
                      <option>Patta Chitta & FMB Transfer</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Revenue District</label>
                      <input 
                        type="text" 
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Taluk / Local Body</label>
                      <input 
                        type="text" 
                        value={formData.taluk}
                        onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 flex items-start gap-2 text-xs text-purple-900">
                    <Sparkles className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">GovAI Pre-check:</span> Aadhaar address matches Madurai district jurisdiction. No offline physical visit required.
                    </div>
                  </div>

                  <button 
                    onClick={() => setAppStep(2)}
                    className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Personal Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {appStep === 2 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Applicant Full Name</label>
                      <input 
                        type="text" 
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Father / Guardian Name</label>
                      <input 
                        type="text" 
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Community Category</label>
                      <select 
                        value={formData.communityCategory}
                        onChange={(e) => setFormData({ ...formData, communityCategory: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                      >
                        <option>BC (Backward Classes)</option>
                        <option>MBC (Most Backward Classes)</option>
                        <option>SC (Scheduled Caste)</option>
                        <option>ST (Scheduled Tribe)</option>
                        <option>General Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Annual Family Income (₹)</label>
                      <input 
                        type="text" 
                        value={formData.annualIncome}
                        onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setAppStep(1)} 
                      className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setAppStep(3)} 
                      className="w-1/2 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold"
                    >
                      Next: Document Verification
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload & OCR Pre-Extraction */}
              {appStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="p-5 border-2 border-dashed border-purple-300 rounded-2xl text-center space-y-2 bg-purple-50/30">
                    <Upload className="w-8 h-8 text-purple-600 mx-auto" />
                    <p className="font-bold text-slate-900 text-sm">Mandatory Documents Attached</p>
                    <p className="text-[11px] text-slate-500">
                      Auto-retrieved via DigiLocker & TNeGA Aadhaar Data Bridge
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      <span className="px-3 py-1 bg-white border border-emerald-300 rounded-full text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Aadhaar Card (Verified)</span>
                      </span>
                      <span className="px-3 py-1 bg-white border border-emerald-300 rounded-full text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ration Card (Verified)</span>
                      </span>
                      <span className="px-3 py-1 bg-white border border-emerald-300 rounded-full text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>School Transfer Certificate</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                    <span className="font-bold">PaddleOCR Validation:</span> Text confidence 98.4%. Names and father names match with 0 discrepancies.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setAppStep(2)} 
                      className="w-1/2 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setAppStep(4)} 
                      className="w-1/2 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold"
                    >
                      Review & Statutory Declaration
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Final Statutory Confirmation */}
              {appStep === 4 && (
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Review Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <div><span className="text-slate-400">Service:</span> {formData.serviceTitle}</div>
                      <div><span className="text-slate-400">Applicant:</span> {formData.applicantName}</div>
                      <div><span className="text-slate-400">District:</span> {formData.district}</div>
                      <div><span className="text-slate-400">Taluk:</span> {formData.taluk}</div>
                      <div><span className="text-slate-400">Statutory Fee:</span> <strong>₹60</strong> (Waived for Online Filing)</div>
                      <div><span className="text-slate-400">Processing SLA:</span> 7 Working Days</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 space-y-1">
                    <span className="font-bold">DPDP Act 2023 Statutory Undertaking:</span>
                    <p className="text-[11px] leading-relaxed">
                      I hereby solemnly affirm that the particulars stated above are true to the best of my knowledge. I consent to the Revenue Department verifying these records via DigiLocker and field inquiries.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setAppStep(3)} 
                      className="w-1/2 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleApplySubmit} 
                      disabled={isSubmitting}
                      className="w-1/2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      <span>Confirm & Submit Application</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}

      {/* ===================================================================== */}
      {/* 7. MY APPLICATIONS (image_540e111c.png)                               */}
      {/* ===================================================================== */}
      {currentPage === 'my-applications' && (
        <CitizenApplicationsPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenApplyModal={onOpenApplyModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 8. MY DOCUMENTS (image_08422f3e.png)                                  */}
      {/* ===================================================================== */}
      {(currentPage === 'my-documents' || currentPage === 'documents-vault') && (
        <CitizenDocumentsVaultPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onOpenChecklistModal={onOpenChecklistModal}
        />
      )}

      {/* ===================================================================== */}
      {/* 9. RENEWAL & REMINDERS (image_9b8c74dd.png)                           */}
      {/* ===================================================================== */}
      {(currentPage === 'renewal-reminders' || currentPage === 'renewals') && (
        <CitizenRenewalsPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
          onStartRenewalWizard={(title) => {
            setFormData(prev => ({ ...prev, serviceTitle: title }));
            setIsApplyWizardActive(true);
            setAppStep(1);
            onNavigate('apply');
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* 10. GRIEVANCE & FEEDBACK (image_5f59f04b.png)                         */}
      {/* ===================================================================== */}
      {(currentPage === 'grievances' || currentPage === 'complaints') && (
        <CitizenGrievancePage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
        />
      )}

      {/* ===================================================================== */}
      {/* 11. HELP & SUPPORT (image_8c959ed6.png)                               */}
      {/* ===================================================================== */}
      {(currentPage === 'help-support' || currentPage === 'profile') && (
        <CitizenHelpSupportPage
          isTamil={isTamil}
          onNavigate={onNavigate}
          onOpenAIAssistant={onOpenAIAssistant}
        />
      )}

      {/* ===================================================================== */}
      {/* PAGE: FIND GOVERNMENT SCHEMES (AI) - Exact Match with image_545b3dbf  */}
      {/* ===================================================================== */}
      {(currentPage === 'scheme-finder' || currentPage === 'scheme-recommendations') && (
        <div className="space-y-4">
          {/* 1. Master Hero Banner */}
          <div className="bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E293B] rounded-3xl p-5 sm:p-7 relative overflow-hidden text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Background Cutout with Meenakshi Gopuram + Thiruvalluvar + Windmills */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src={heroBgImg}
                alt="Tamil Nadu Landmarks"
                className="w-full h-full object-cover object-right lg:object-center opacity-35 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E3A8A]/90 to-transparent w-full lg:w-3/5"></div>
            </div>

            {/* Left: Heading & Subtitle */}
            <div className="relative z-10 space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Find Government</span>
                <span className="text-purple-400">Schemes</span>
                <span className="text-2xl">🎯</span>
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                {isTamil
                  ? 'தமிழ்நாடு மற்றும் மத்திய அரசு நலத்திட்டங்களுக்கான AI-இயங்கும் திட்ட கண்டறிதல் மற்றும் தகுதி சரிபார்ப்பு'
                  : 'AI-powered scheme discovery and eligibility check for Tamil Nadu and Central Government schemes'}
              </p>
            </div>

            {/* Right: Floating White Card "Ask GovAI" */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-900 shadow-xl border border-white/60 w-full sm:w-80 shrink-0 flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0">
                  <img src={botMascotImg} alt="GovAI Bot Mascot" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Ask GovAI</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight">
                    Know which schemes you are eligible for, required documents and how to apply.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenAIAssistant}
                className="mt-3 w-full py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Ask a Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Top Action Strip: 5 Pill Cards in a Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Card 1: AI Scheme Finder (Active) */}
            <button
              onClick={() => setSchemeActiveSubTab('finder')}
              className={`p-3.5 rounded-2xl border text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer ${
                schemeActiveSubTab === 'finder'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] border-purple-600 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-purple-300 text-slate-900'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                schemeActiveSubTab === 'finder' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs leading-tight">AI Scheme Finder</h4>
                <p className={`text-[10px] mt-0.5 leading-tight truncate ${schemeActiveSubTab === 'finder' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Get personalized scheme recommendations
                </p>
              </div>
            </button>

            {/* Card 2: Eligibility Check */}
            <button
              onClick={() => setSchemeActiveSubTab('eligibility')}
              className={`p-3.5 rounded-2xl border text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer ${
                schemeActiveSubTab === 'eligibility'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] border-purple-600 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-purple-300 text-slate-900'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                schemeActiveSubTab === 'eligibility' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs leading-tight">Eligibility Check</h4>
                <p className={`text-[10px] mt-0.5 leading-tight truncate ${schemeActiveSubTab === 'eligibility' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Check your eligibility for any scheme
                </p>
              </div>
            </button>

            {/* Card 3: Scheme Directory */}
            <button
              onClick={() => onNavigate('schemes')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:border-purple-300 bg-white text-slate-900 text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs leading-tight">Scheme Directory</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight truncate">
                  Browse all State & Central schemes
                </p>
              </div>
            </button>

            {/* Card 4: Compare Schemes */}
            <button
              onClick={() => setSchemeActiveSubTab('compare')}
              className={`p-3.5 rounded-2xl border text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer ${
                schemeActiveSubTab === 'compare'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] border-purple-600 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-purple-300 text-slate-900'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                schemeActiveSubTab === 'compare' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                <Scale className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs leading-tight">Compare Schemes</h4>
                <p className={`text-[10px] mt-0.5 leading-tight truncate ${schemeActiveSubTab === 'compare' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Compare benefits, eligibility & more
                </p>
              </div>
            </button>

            {/* Card 5: Saved Schemes */}
            <button
              onClick={() => setSchemeActiveSubTab('saved')}
              className={`p-3.5 rounded-2xl border text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer col-span-2 sm:col-span-1 ${
                schemeActiveSubTab === 'saved'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] border-purple-600 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-purple-300 text-slate-900'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                schemeActiveSubTab === 'saved' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                <Bookmark className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs leading-tight">Saved Schemes</h4>
                <p className={`text-[10px] mt-0.5 leading-tight truncate ${schemeActiveSubTab === 'saved' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Your saved / favorite schemes
                </p>
              </div>
            </button>
          </div>

          {/* DigiLocker Auto-fill Toast Notification if triggered */}
          {autoFillNotice && (
            <div className="bg-purple-50 border border-purple-200 p-3 rounded-2xl flex items-center justify-between text-xs text-purple-900 shadow-2xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <CloudDownload className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="font-semibold">{autoFillNotice}</span>
              </div>
              <button onClick={() => setAutoFillNotice(null)} className="text-purple-600 font-bold hover:text-purple-950 px-2 cursor-pointer">✕</button>
            </div>
          )}

          {/* 3. Main 2-Column Split: Form on Left & Recommended Schemes on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN: Your Profile for Scheme Matching (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Your Profile for Scheme Matching
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Enter your details to get eligible schemes.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProfileAge(28);
                    setProfileGender('Male');
                    setProfileDistrict('Chennai');
                    setProfileTaluk('Alandur');
                    setProfileIncome('₹ 1,00,001 – ₹ 3,00,000');
                    setProfileOccupation('Private Employee');
                    setProfileEducation('Graduate');
                    setProfileMaritalStatus('Single');
                    setProfileTags({
                      Student: false,
                      Farmer: false,
                      'Differently Abled': false,
                      No: true,
                      Woman: false,
                      'Senior Citizen': false,
                      'Member of Welfare Board': false
                    });
                    setAutoFillNotice('Verified credentials auto-populated from DigiLocker (Aadhaar UID: XXXX-XXXX-8912).');
                    setTimeout(() => setAutoFillNotice(null), 4000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  <CloudDownload className="w-3.5 h-3.5" />
                  <span>Auto Fill (DigiLocker)</span>
                </button>
              </div>

              {/* 3 Step Indicators */}
              <div className="flex items-center justify-center gap-2 py-1 text-xs">
                <button
                  onClick={() => setSchemeStep(1)}
                  className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-900"
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    schemeStep === 1 ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'
                  }`}>
                    1
                  </span>
                  <span>Basic Info</span>
                </button>

                <div className="w-8 h-0.5 bg-slate-200"></div>

                <button
                  onClick={() => setSchemeStep(2)}
                  className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-500 hover:text-slate-900"
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    schemeStep === 2 ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    2
                  </span>
                  <span>More Details</span>
                </button>

                <div className="w-8 h-0.5 bg-slate-200"></div>

                <button
                  onClick={() => setSchemeStep(3)}
                  className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-500 hover:text-slate-900"
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    schemeStep === 3 ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    3
                  </span>
                  <span>Preferences</span>
                </button>
              </div>

              {/* Form Grid (2 Columns) */}
              <div className="space-y-3.5 text-xs">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age / Date of Birth *</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={profileAge}
                        onChange={(e) => setProfileAge(e.target.value)}
                        className="w-full p-2.5 pr-8 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute right-2.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gender</label>
                    <select
                      value={profileGender}
                      onChange={(e) => setProfileGender(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Transgender / Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">District *</label>
                    <select
                      value={profileDistrict}
                      onChange={(e) => setProfileDistrict(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Tiruchirappalli">Tiruchirappalli</option>
                      <option value="Salem">Salem</option>
                      <option value="Tirunelveli">Tirunelveli</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Taluk *</label>
                    <select
                      value={profileTaluk}
                      onChange={(e) => setProfileTaluk(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Alandur">Alandur</option>
                      <option value="Egmore">Egmore</option>
                      <option value="Guindy">Guindy</option>
                      <option value="Mylapore">Mylapore</option>
                      <option value="Madurai North">Madurai North</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Annual Family Income (₹) *</label>
                    <select
                      value={profileIncome}
                      onChange={(e) => setProfileIncome(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Below ₹ 1,00,000">Below ₹ 1,00,000</option>
                      <option value="₹ 1,00,001 – ₹ 3,00,000">₹ 1,00,001 – ₹ 3,00,000</option>
                      <option value="₹ 3,00,001 – ₹ 5,00,000">₹ 3,00,001 – ₹ 5,00,000</option>
                      <option value="Above ₹ 5,00,000">Above ₹ 5,00,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Occupation</label>
                    <select
                      value={profileOccupation}
                      onChange={(e) => setProfileOccupation(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Private Employee">Private Employee</option>
                      <option value="Government Employee">Government Employee</option>
                      <option value="Self Employed">Self Employed / Business</option>
                      <option value="Farmer">Farmer / Agriculture</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Education Level</label>
                    <select
                      value={profileEducation}
                      onChange={(e) => setProfileEducation(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Below 10th">Below 10th</option>
                      <option value="10th Pass">10th Pass</option>
                      <option value="12th Pass">12th Pass / Higher Sec</option>
                      <option value="Diploma">Diploma / ITI</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate / Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Marital Status</label>
                    <select
                      value={profileMaritalStatus}
                      onChange={(e) => setProfileMaritalStatus(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 bg-white focus:border-purple-600 focus:outline-hidden"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widow">Widow / Widower</option>
                      <option value="Divorced">Divorced / Separated</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Are you a (Select all that apply) */}
                <div className="pt-1">
                  <label className="font-bold text-slate-700 block mb-2">Are you a (Select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'Student', label: 'Student' },
                      { key: 'Farmer', label: 'Farmer' },
                      { key: 'Differently Abled', label: 'Differently Abled' },
                      { key: 'No', label: 'No' },
                      { key: 'Woman', label: 'Woman' },
                      { key: 'Senior Citizen', label: 'Senior Citizen' },
                      { key: 'Member of Welfare Board', label: 'Member of Welfare Board' }
                    ].map(tag => {
                      const isChecked = !!profileTags[tag.key];
                      return (
                        <button
                          key={tag.key}
                          type="button"
                          onClick={() => {
                            if (tag.key === 'No') {
                              setProfileTags({
                                Student: false,
                                Farmer: false,
                                'Differently Abled': false,
                                No: true,
                                Woman: false,
                                'Senior Citizen': false,
                                'Member of Welfare Board': false
                              });
                            } else {
                              setProfileTags(prev => ({
                                ...prev,
                                [tag.key]: !prev[tag.key],
                                No: false
                              }));
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-purple-100/90 border-purple-400 text-purple-900 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-purple-700 border-purple-700 text-white' : 'border-slate-300'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span>{tag.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setAutoFillNotice('AI evaluating statutory matching algorithms against all 400+ welfare datasets...');
                      setTimeout(() => setAutoFillNotice(null), 2500);
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Find Eligible Schemes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setProfileAge(28);
                      setProfileGender('Male');
                      setProfileDistrict('Chennai');
                      setProfileTaluk('Alandur');
                      setProfileIncome('₹ 1,00,001 – ₹ 3,00,000');
                      setProfileOccupation('Private Employee');
                      setProfileEducation('Graduate');
                      setProfileMaritalStatus('Single');
                      setProfileTags({
                        Student: false,
                        Farmer: false,
                        'Differently Abled': false,
                        No: true,
                        Woman: false,
                        'Senior Citizen': false,
                        'Member of Welfare Board': false
                      });
                    }}
                    className="py-2.5 px-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Recommended Schemes for You (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Recommended Schemes for You
                    </h3>
                    <span className="bg-purple-100 text-purple-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                      AI Matched
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Based on your profile, we found 12 schemes. (7 Likely Eligible)
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={schemeSortBy}
                    onChange={(e) => setSchemeSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-xl text-xs outline-hidden"
                  >
                    <option value="Best Match">Best Match</option>
                    <option value="Highest Benefit">Highest Benefit</option>
                    <option value="Newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Filter Pills Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => setSchemeFilterStatus('all')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    schemeFilterStatus === 'all'
                      ? 'bg-[#7C3AED] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All (12)
                </button>

                <button
                  onClick={() => setSchemeFilterStatus('likely')}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    schemeFilterStatus === 'likely'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Likely Eligible (7)</span>
                </button>

                <button
                  onClick={() => setSchemeFilterStatus('potential')}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    schemeFilterStatus === 'potential'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Potentially Eligible (3)</span>
                </button>

                <button
                  onClick={() => setSchemeFilterStatus('more_info')}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    schemeFilterStatus === 'more_info'
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>More Info Required (2)</span>
                </button>
              </div>

              {/* The 4 Detailed Scheme Cards matching image_545b3dbf.png */}
              <div className="space-y-3 pt-1">
                {/* CARD 1: Kalaignar Magalir Urimai Thogai Scheme */}
                {(schemeFilterStatus === 'all' || schemeFilterStatus === 'likely') && (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                        <img src={womenImg} alt="Kalaignar Magalir Urimai Thogai" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            TN State Scheme
                          </span>
                          <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Likely Eligible</span>
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                            Kalaignar Magalir Urimai Thogai Scheme
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்
                          </p>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug pt-0.5 max-w-lg">
                          ₹1,000 monthly financial assistance for eligible women heads of households in Tamil Nadu.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-medium">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            💰 ₹1,000 / month
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            👥 Women (18+ years)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            🏛️ Social Welfare Dept.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setBookmarkedSchemes(prev => ({ ...prev, kmur: !prev.kmur }))}
                        className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                        title="Save Scheme"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedSchemes.kmur ? 'text-purple-700 fill-purple-700' : ''}`} />
                      </button>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('magalir'));
                            if (found && onOpenSchemeModal) onOpenSchemeModal(found);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('magalir'));
                            if (found && onOpenApplyModal) onOpenApplyModal(found);
                            else onNavigate('apply');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD 2: Pudhumai Penn Scheme */}
                {(schemeFilterStatus === 'all' || schemeFilterStatus === 'likely') && (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                        <img src={girlImg} alt="Pudhumai Penn Scheme" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            TN State Scheme
                          </span>
                          <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Likely Eligible</span>
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                            Pudhumai Penn Scheme
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            புதுமைப் பெண் திட்டம்
                          </p>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug pt-0.5 max-w-lg">
                          Financial assistance of ₹1,000 per month for girl students pursuing higher education.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-medium">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            💰 ₹1,000 / month
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            👥 Girl Students (UG/PG)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            🏛️ Higher Education Dept.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setBookmarkedSchemes(prev => ({ ...prev, pp: !prev.pp }))}
                        className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                        title="Save Scheme"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedSchemes.pp ? 'text-purple-700 fill-purple-700' : ''}`} />
                      </button>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('pudhumai'));
                            if (found && onOpenSchemeModal) onOpenSchemeModal(found);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('pudhumai'));
                            if (found && onOpenApplyModal) onOpenApplyModal(found);
                            else onNavigate('apply');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD 3: PM-KISAN */}
                {(schemeFilterStatus === 'all' || schemeFilterStatus === 'potential') && (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                        <img src={farmerImg} alt="PM-KISAN" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Central Scheme
                          </span>
                          <span className="text-blue-700 text-xs font-bold flex items-center gap-1">
                            <Target className="w-3.5 h-3.5" />
                            <span>Potentially Eligible</span>
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                            PM-KISAN
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            பிரதான் மந்திரி கிசான் சன்மான் நிதி
                          </p>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug pt-0.5 max-w-lg">
                          Annual income support of ₹6,000 to eligible farmer families (₹2,000 in three equal instalments).
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-medium">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            💰 ₹6,000 / year
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            👥 Farmers (Landholding)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            🏛️ Ministry of Agriculture
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setBookmarkedSchemes(prev => ({ ...prev, kisan: !prev.kisan }))}
                        className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                        title="Save Scheme"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedSchemes.kisan ? 'text-purple-700 fill-purple-700' : ''}`} />
                      </button>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('kisan'));
                            if (found && onOpenSchemeModal) onOpenSchemeModal(found);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('kisan'));
                            if (found && onOpenApplyModal) onOpenApplyModal(found);
                            else onNavigate('apply');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD 4: Kalaignarin Kanavu Illam */}
                {(schemeFilterStatus === 'all' || schemeFilterStatus === 'more_info') && (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs shrink-0">
                        <img src={houseImg} alt="Kalaignarin Kanavu Illam" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            TN State Scheme
                          </span>
                          <span className="text-amber-700 text-xs font-bold flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" />
                            <span>More Info Required</span>
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                            Kalaignarin Kanavu Illam
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            கலைஞரின் கனவு இல்லம்
                          </p>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug pt-0.5 max-w-lg">
                          Housing assistance for eligible economically weaker families in Tamil Nadu.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-medium">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            🏠 Housing Support
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            👥 Low Income Families
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            🏛️ Rural Development Dept.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setBookmarkedSchemes(prev => ({ ...prev, kanavu: !prev.kanavu }))}
                        className="text-slate-400 hover:text-purple-700 transition-colors p-1"
                        title="Save Scheme"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedSchemes.kanavu ? 'text-purple-700 fill-purple-700' : ''}`} />
                      </button>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            const found = MASTER_SCHEMES.find(s => s.titleEn.toLowerCase().includes('kanavu') || s.titleEn.toLowerCase().includes('housing'));
                            if (found && onOpenSchemeModal) onOpenSchemeModal(found);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setAutoFillNotice('Evaluating land title & patta chitta for Kalaignarin Kanavu Illam eligibility...');
                            setTimeout(() => setAutoFillNotice(null), 3000);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Check Eligibility</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Full-Width Action Card */}
              <button
                onClick={() => onNavigate('schemes')}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-600 bg-purple-50/50 hover:bg-purple-50 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs mt-2"
              >
                <Layers className="w-4 h-4 text-purple-700" />
                <span>View All 12 Matching Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE 17: COMPLAINTS & CM HELPLINE 1100 GRIEVANCES                    */}
      {/* ===================================================================== */}
      {false && currentPage === 'complaints' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Chief Minister Special Helpline 1100</h2>
              <p className="text-xs text-slate-500">Fast-track grievance escalation & redressal monitoring</p>
            </div>
            <div className="px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-300">
              Emergency Toll-Free: 1100
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lodge New Complaint */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Lodge Official Grievance</h3>

              {submittedComplaintNo ? (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-900">Grievance Registered!</h4>
                  <p className="text-xs text-slate-600">
                    Ticket Reference: <strong className="font-mono text-purple-700">{submittedComplaintNo}</strong>
                  </p>
                  <button 
                    onClick={() => setSubmittedComplaintNo(null)}
                    className="mt-2 px-4 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-bold"
                  >
                    File Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Department</label>
                    <select
                      value={complaintForm.department}
                      onChange={(e) => setComplaintForm({ ...complaintForm, department: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                    >
                      <option>Revenue & Disaster Management</option>
                      <option>Survey & Settlement</option>
                      <option>Social Welfare & Women Empowerment</option>
                      <option>Higher Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Grievance Category</label>
                    <select
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                    >
                      <option>Service Delay</option>
                      <option>Field Inspection Missing</option>
                      <option>Payment / DBT Discrepancy</option>
                      <option>Staff Misconduct</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subject</label>
                    <input 
                      type="text"
                      required
                      placeholder="Brief title of grievance"
                      value={complaintForm.subject}
                      onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Details & Application Reference</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Describe the issue, dates, and taluk office visited..."
                      value={complaintForm.description}
                      onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-xs"
                  >
                    Submit Grievance to CM Helpline
                  </button>
                </form>
              )}
            </div>

            {/* Existing Complaints Ledger */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Your Active & Resolved Grievances</h3>
              <div className="space-y-3">
                {complaints.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-purple-700">{c.complaintNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{c.subject}</h4>
                    <p className="text-[11px] text-slate-600">{c.description}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>{c.department} · {c.district}</span>
                      <span>Lodged: {c.submittedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE 11: PROFILE & DPDP ACT 2023 CONSENT MANAGEMENT                   */}
      {/* ===================================================================== */}
      {false && currentPage === 'profile' && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 font-bold text-xl">
              MA
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">M. Anandhi</h2>
              <p className="text-xs text-slate-500">Resident of Madurai · Verified Citizen Identity</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] mt-1">
                ✓ Aadhaar Biometrically Verified
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Digital Personal Data Protection (DPDP) Act 2023 Consents</h3>
              <p className="text-xs text-slate-500">
                You possess the statutory right to inspect, toggle, or withdraw consent at any time.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'digilockerAutoFetch' as const,
                  title: 'Automated DigiLocker Certificate Binding',
                  desc: 'Allows instant auto-fetching of educational marksheets, driving license, and birth certificates without document re-upload.'
                },
                {
                  key: 'revenueCrossDepartmentAccess' as const,
                  title: 'Cross-Department Land & Patta Verification',
                  desc: 'Permits the Survey & Settlement department to share verified boundary maps with the Revenue administration.'
                },
                {
                  key: 'smsWhatsAppNotifications' as const,
                  title: 'Official State SMS & WhatsApp Gateway',
                  desc: 'Send real-time alerts whenever application status is updated by your Zonal Tahsildar.'
                },
                {
                  key: 'anonymousAnalyticsUsage' as const,
                  title: 'Anonymized Service Speed Analytics',
                  desc: 'Contribute de-identified turnaround data to improve statewide e-governance performance metrics.'
                }
              ].map((item) => (
                <div key={item.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setConsents({ ...consents, [item.key]: !consents[item.key] })}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                      consents[item.key] ? 'bg-purple-700' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      consents[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE: "MY DOCUMENTS" CITIZEN VAULT (DigiLocker Integration)            */}
      {/* ===================================================================== */}
      {false && currentPage === 'documents-vault' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#071B3B] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-200 font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                  Citizen Digital Locker
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                  AES-256 Cloud Encrypted
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {isTamil ? 'என் ஆவணப் பெட்டகம்' : 'My Documents Vault'}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {isTamil
                  ? 'உங்கள் ஆதார், சாதிச் சான்றிதழ், குடும்ப அட்டை, ஓட்டுநர் உரிமம் மற்றும் பட்டா ஆவணங்களை ஒரே பாதுகாப்பான பெட்டகத்தில் சேமித்து விண்ணப்பங்களுக்கு உடனடியாக இணைக்கவும்.'
                  : 'Centralized repository of DigiLocker and state-verified certificates. Auto-bind pre-verified documents into any scheme or service application with zero re-upload.'}
              </p>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>{isTamil ? 'புதிய ஆவணம் பதிவேற்ற' : '+ Upload New Document'}</span>
            </button>
          </div>

          {/* Vault Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Stored Documents</span>
              <div className="text-2xl font-extrabold text-slate-900">{vaultDocs.length}</div>
              <p className="text-[10px] text-emerald-600 font-semibold">100% Verified Credentials</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">DigiLocker Synced</span>
              <div className="text-2xl font-extrabold text-purple-700">
                {vaultDocs.filter(d => d.digiLockerSynced).length}
              </div>
              <p className="text-[10px] text-slate-500">Live API Linked</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Expiring Soon</span>
              <div className="text-2xl font-extrabold text-amber-600">
                {reminders.filter(r => r.daysRemaining <= 60).length}
              </div>
              <p className="text-[10px] text-amber-600 font-semibold">Alert active</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Encrypted Vault Space</span>
              <div className="text-2xl font-extrabold text-slate-900">0.08 / 1.0 GB</div>
              <p className="text-[10px] text-slate-400">Govt Cloud Storage</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              'All',
              'Identity Documents',
              'Revenue & Community Certificates',
              'Land, Property & Agricultural Records',
              'Transport Documents',
              'Educational Documents'
            ].map(cat => (
              <button
                key={cat}
                onClick={() => setVaultFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  vaultFilterCategory === cat
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vault Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vaultDocs
              .filter(d => vaultFilterCategory === 'All' || d.category === vaultFilterCategory)
              .map(doc => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 truncate">
                        {doc.category}
                      </span>
                      {doc.digiLockerSynced && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          <Shield className="w-3 h-3 text-emerald-600" />
                          DigiLocker
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{doc.title}</h4>
                      <p className="font-mono text-xs text-purple-700 font-bold mt-0.5">{doc.documentNumber}</p>
                      <p className="text-xs text-slate-500 mt-1">{doc.issuingAuthority}</p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Issued On:</span>
                        <strong className="text-slate-800">{doc.issuedDate}</strong>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex justify-between">
                          <span>Valid Until:</span>
                          <strong className="text-amber-700">{doc.expiryDate}</strong>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <strong className="text-slate-700">{doc.fileType} ({doc.fileSize})</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedVaultDocForPreview(doc)}
                      className="flex-1 py-2 px-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-700" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => alert(`Certificate ${doc.title} (${doc.documentNumber}) downloaded in signed PDF format.`)}
                      className="py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Upload New Document Modal */}
          {isUploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-base text-slate-900">Upload to Citizen Vault</h3>
                  <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Document Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Higher Secondary Marksheet"
                      value={newDocTitle}
                      onChange={e => setNewDocTitle(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={newDocCategory}
                      onChange={e => setNewDocCategory(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-semibold"
                    >
                      <option>Identity Documents</option>
                      <option>Revenue & Community Certificates</option>
                      <option>Educational Documents</option>
                      <option>Land, Property & Agricultural Records</option>
                      <option>Transport Documents</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Document / Certificate Number</label>
                    <input
                      type="text"
                      placeholder="e.g. TN-EDU-2024-XXXX"
                      value={newDocNumber}
                      onChange={e => setNewDocNumber(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>

                  <div className="border-2 border-dashed border-purple-200 rounded-2xl p-4 text-center bg-purple-50/40">
                    <Upload className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <span className="font-bold text-purple-900 block">Select PDF or JPG File</span>
                    <span className="text-[10px] text-slate-400">Max size 2 MB</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newDocTitle.trim()) return;
                      const newDoc: CitizenVaultDocument = {
                        id: `vlt-${Date.now()}`,
                        category: newDocCategory,
                        title: newDocTitle,
                        documentNumber: newDocNumber || 'TN-DOC-VERIFIED',
                        issuingAuthority: 'Government of Tamil Nadu',
                        issuedDate: new Date().toISOString().split('T')[0],
                        verificationStatus: 'VERIFIED',
                        digiLockerSynced: true,
                        fileType: 'PDF',
                        fileSize: '480 KB'
                      };
                      setVaultDocs(prev => [newDoc, ...prev]);
                      setIsUploadModalOpen(false);
                      setNewDocTitle('');
                      setNewDocNumber('');
                    }}
                    className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Save to Vault
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Document Preview Modal */}
          {selectedVaultDocForPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      {selectedVaultDocForPreview?.category}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 mt-1">{selectedVaultDocForPreview?.title}</h3>
                  </div>
                  <button onClick={() => setSelectedVaultDocForPreview(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
                </div>

                {/* Simulated Digital Certificate View */}
                <div className="border-4 border-double border-purple-200 p-5 rounded-2xl bg-amber-50/20 text-center space-y-3">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                    Government of Tamil Nadu · Digital Verification Record
                  </div>
                  <div className="w-12 h-12 rounded-full border border-purple-300 mx-auto flex items-center justify-center bg-white shadow-xs">
                    <ShieldCheck className="w-7 h-7 text-purple-700" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{selectedVaultDocForPreview?.title}</h4>
                  <p className="font-mono text-xs text-purple-900 font-bold">{selectedVaultDocForPreview?.documentNumber}</p>
                  <p className="text-xs text-slate-600">Issued by: {selectedVaultDocForPreview?.issuingAuthority}</p>
                  <div className="flex justify-center items-center gap-2 text-[10px] text-emerald-800 bg-emerald-100/60 py-1 px-3 rounded-full font-bold max-w-xs mx-auto">
                    <span>✓ Cryptographically Signed & Verified</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedVaultDocForPreview(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE: DYNAMIC DOCUMENT CHECKLIST GENERATOR                             */}
      {/* ===================================================================== */}
      {currentPage === 'document-checklist' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#071B3B] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs text-purple-200 font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                Document Readiness Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {isTamil ? 'டைனமிக் ஆவண சரிபார்ப்பு பட்டியல்' : 'Document Requirement Checklist Generator'}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {isTamil
                  ? 'விண்ணப்பிக்க விரும்பும் சேவையைத் தேர்ந்தெடுத்து தேவையான அசல் சான்றிதழ்கள், கோப்பு அளவு மற்றும் ஏற்புடைய வடிவங்களை சரிபார்க்கவும்.'
                  : 'Select any public service or flagship scheme to generate an interactive, pre-flight document readiness checklist with format rules and authority guidance.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-xs shrink-0 space-y-1">
              <span className="text-[10px] text-purple-200 uppercase font-bold block">Selected Service</span>
              <select
                value={selectedChecklistService}
                onChange={e => setSelectedChecklistService(e.target.value)}
                className="bg-purple-950 text-white font-bold p-2 rounded-xl border border-purple-400 focus:outline-none text-xs"
              >
                <option value="Community Certificate">Community Certificate (சாதிச் சான்றிதழ்)</option>
                <option value="Income Certificate">Income Certificate (வருமானச் சான்றிதழ்)</option>
                <option value="Kalaignar Magalir Urimai Thogai Scheme (KMUT)">Kalaignar Magalir Urimai Thogai (KMUT)</option>
                <option value="Driving Licence (Smart Card / DigiLocker DL)">Driving Licence (ஓட்டுநர் உரிமம்)</option>
              </select>
            </div>
          </div>

          {/* Checklist Container */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">{selectedChecklistService}</h3>
                <p className="text-xs text-slate-500">Verify each document is ready and legible before submitting application</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Print Checklist
                </button>
                <button
                  onClick={() => onNavigate('apply')}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95"
                >
                  <span>Proceed to Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {(SERVICE_DOCUMENT_CHECKLISTS[selectedChecklistService] || SERVICE_DOCUMENT_CHECKLISTS['Community Certificate']).map((req, idx) => {
                const itemTitle = req.documentName || req.docName || `Doc ${idx + 1}`;
                const isChecked = !!checkedChecklistItems[itemTitle];
                return (
                  <div
                    key={idx}
                    onClick={() => setCheckedChecklistItems(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked ? 'bg-purple-50/60 border-purple-300' : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button type="button" className="mt-0.5 shrink-0 focus:outline-none">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-purple-700 fill-purple-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{itemTitle}</span>
                          {(req.mandatory || req.isMandatory) ? (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-200">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              Optional
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          Max: {req.maxSizeMb} MB · {req.acceptedFormats.join(', ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        <strong className="text-slate-700">Issuing Authority: </strong>{req.issuingAuthority}
                      </p>

                      {req.tipEn && (
                        <p className="text-[11px] text-purple-900 bg-purple-100/60 p-2 rounded-lg">
                          💡 {req.tipEn}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE: LICENCES & PERMITS DIRECTORY                                     */}
      {/* ===================================================================== */}
      {currentPage === 'licences-directory' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#071B3B] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs text-purple-200 font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                Statutory Permissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {isTamil ? 'அரசு உரிமங்கள் & அனுமதிகள்' : 'Licences & Commercial Permits'}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {isTamil
                  ? 'வணிகத் தொழில் உரிமம், உணவுப் பாதுகாப்பு (FSSAI), உத்யம் குறுந்தொழில் மற்றும் கட்டிட திட்ட அனுமதி ஆகியவற்றை ஒற்றைச் சாளர முறையில் எளிதாக பெறுங்கள்.'
                  : 'Commercial trade permits, food safety licenses, MSME registrations, and building permissions with verified renewal timelines and fee schedules.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('renewal-reminders')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shrink-0 active:scale-95"
            >
              ⏳ View Expiry Reminders
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MASTER_LICENCES.map(lic => (
              <div
                key={lic.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {lic.category}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Validity: {lic.validityPeriod}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">{lic.titleEn}</h4>
                    {lic.titleTa && <p className="text-xs text-slate-500 font-medium">{lic.titleTa}</p>}
                    <p className="text-xs text-purple-700 font-semibold mt-0.5">{lic.issuingAuthority}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{lic.purpose}</p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div><strong className="text-slate-800">Fee: </strong><span className="text-emerald-700 font-bold">{lic.applicationFee}</span></div>
                    <div><strong className="text-slate-800">Renewal: </strong><span className="text-slate-600">{lic.renewalProcess}</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {lic.officialApplyUrl && (
                    <a
                      href={lic.officialApplyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => onOpenApplyModal ? onOpenApplyModal(lic) : onNavigate('apply')}
                    className="flex-1 py-2 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Apply Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PAGE: EXPIRY & RENEWAL REMINDER SYSTEM                                 */}
      {/* ===================================================================== */}
      {false && currentPage === 'renewal-reminders' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#071B3B] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs text-purple-200 font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                Statutory Expiry Tracking
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {isTamil ? 'காலாவதி & புதுப்பித்தல் நினைவூட்டல்' : 'Document Expiry & Renewal Reminders'}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {isTamil
                  ? 'ஓட்டுநர் உரிமம், தொழில் உரிமம், வாகன புகை சான்றிதழ் மற்றும் காப்பீடு ஆகியவற்றை காலாவதியாகும் முன் தானியங்கி SMS மற்றும் WhatsApp மூலம் நினைவூட்டி புதுப்பிக்கலாம்.'
                  : 'Automated SMS and WhatsApp renewal triggers for Driving Licences, Commercial Trade Licences, PUC Certificates, and Vehicle Insurance before expiry.'}
              </p>
            </div>

            <button
              onClick={() => setIsAddReminderOpen(true)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>+ Add New Expiry Tracker</span>
            </button>
          </div>

          {/* Reminders List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reminders.map(rem => {
              const isUrgent = rem.daysRemaining <= 30;
              const isApproaching = rem.daysRemaining > 30 && rem.daysRemaining <= 60;

              return (
                <div
                  key={rem.id}
                  className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                    isUrgent
                      ? 'border-red-300 ring-2 ring-red-100'
                      : isApproaching
                      ? 'border-amber-300'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        {rem.documentType ? rem.documentType.replace('_', ' ') : (rem.category || 'Statutory Permit')}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        isUrgent
                          ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                          : isApproaching
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {rem.daysRemaining} Days Left
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{rem.title}</h4>
                      <p className="font-mono text-xs text-purple-700 font-bold mt-0.5">{rem.documentNumber}</p>
                      <p className="text-xs text-slate-500 mt-1">{rem.issuingAuthority}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Expiry Date:</span>
                        <strong className="text-slate-900">{rem.expiryDate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Alert Mode:</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Bell className="w-3 h-3 text-emerald-600" /> SMS & WhatsApp Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        if (rem.officialRenewalUrl) {
                          window.open(rem.officialRenewalUrl, '_blank');
                        } else {
                          onNavigate('apply');
                        }
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                        isUrgent
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-purple-700 hover:bg-purple-800 text-white'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Initiate Instant Renewal</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Reminder Modal */}
          {isAddReminderOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-base text-slate-900">Add New Expiry Reminder</h3>
                  <button onClick={() => setIsAddReminderOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Document Name / Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Vehicle Insurance or FSSAI Licence"
                      value={newReminderTitle}
                      onChange={e => setNewReminderTitle(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Document Identifier Number</label>
                    <input
                      type="text"
                      placeholder="e.g. TN-01-2026-XXXX"
                      value={newReminderNumber}
                      onChange={e => setNewReminderNumber(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={newReminderDate}
                      onChange={e => setNewReminderDate(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddReminderOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newReminderTitle.trim() || !newReminderDate) return;
                      const diffDays = Math.ceil((new Date(newReminderDate).getTime() - new Date('2026-11-02').getTime()) / (1000 * 60 * 60 * 24));
                      const newRem: RenewalReminder = {
                        id: `rem-${Date.now()}`,
                        documentType: newReminderType,
                        title: newReminderTitle,
                        documentNumber: newReminderNumber || 'TN-DOC-REMINDER',
                        expiryDate: newReminderDate,
                        daysRemaining: Math.max(1, diffDays),
                        issuingAuthority: 'Statutory Authority, Tamil Nadu',
                        officialRenewalUrl: 'https://www.tnesevai.tn.gov.in',
                        status: 'ACTIVE'
                      };
                      setReminders(prev => [newRem, ...prev]);
                      setIsAddReminderOpen(false);
                      setNewReminderTitle('');
                      setNewReminderNumber('');
                      setNewReminderDate('');
                    }}
                    className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Save Reminder
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
