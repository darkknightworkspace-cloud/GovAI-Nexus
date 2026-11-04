import React, { useState } from 'react';
import {
  Search, Building2, ArrowRight, Users, FileText, ChevronRight,
  Landmark, Phone, Globe, Mail, MapPin, Shield, Sprout, HeartPulse,
  GraduationCap, Car, Briefcase, Scale, Layers, Home, Accessibility,
  Droplets, Zap, Factory, TreePine, Fish, Wheat, Store, BookOpen,
  CreditCard, Award
} from 'lucide-react';

interface DepartmentsPageProps {
  language: 'en' | 'ta';
  onSelectPortal?: (portal: any) => void;
  onNavigatePage?: (page: any) => void;
}

const TN_DEPARTMENTS = [
  {
    id: 'dept-01',
    nameEn: 'Revenue & Disaster Management',
    nameTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    slug: 'revenue',
    icon: Landmark,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100',
    servicesCount: 48,
    schemesCount: 12,
    descEn: 'Issues certificates (community, nativity, income, caste), manages land records, administers disaster relief and revenue courts.',
    descTa: 'சமூக, சாதி, வருமான சான்றிதழ்கள் வழங்குதல், நில பதிவேடுகள் நிர்வாகம், பேரிடர் நிவாரணம்.',
    headOffice: 'Fort St. George, Chennai 600 009',
    website: 'https://tnrevenue.gov.in',
    helpline: '1800-425-6151',
    keyServices: ['Community Certificate', 'Nativity Certificate', 'Income Certificate', 'Patta Transfer', 'Encumbrance Certificate']
  },
  {
    id: 'dept-02',
    nameEn: 'Health & Family Welfare',
    nameTa: 'சுகாதாரம் மற்றும் குடும்ப நலத்துறை',
    slug: 'health',
    icon: HeartPulse,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100',
    servicesCount: 32,
    schemesCount: 18,
    descEn: 'Operates government hospitals, PHCs and dispensaries. Runs CMCHIS health insurance, Makkalai Thedi Maruthuvam and Innuyir Kappom.',
    descTa: 'அரசு மருத்துவமனைகள், PHC நடத்துதல். CMCHIS காப்பீடு, மக்களை தேடி மருத்துவம் திட்டம்.',
    headOffice: 'DMS Campus, Park Town, Chennai 600 003',
    website: 'https://tnhealth.tn.gov.in',
    helpline: '104',
    keyServices: ['CMCHIS Health Insurance', 'Birth Certificate', 'Death Certificate', 'Makkalai Thedi Maruthuvam', 'Innuyir Kappom']
  },
  {
    id: 'dept-03',
    nameEn: 'Social Welfare & Women Empowerment',
    nameTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை',
    slug: 'social-welfare',
    icon: Users,
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    iconBg: 'bg-pink-100',
    servicesCount: 24,
    schemesCount: 22,
    descEn: 'Administers KMUT, widow pension, child protection schemes, creches, and welfare schemes for SHGs and Adi Dravidar communities.',
    descTa: 'கலைஞர் மகளிர் உரிமைத் தொகை, விதவை ஓய்வூதியம், குழந்தை பாதுகாப்பு திட்டங்கள் நிர்வாகம்.',
    headOffice: 'Panagal Building, Saidapet, Chennai 600 015',
    website: 'https://www.tn.gov.in/dept_socialwelfare',
    helpline: '044-24354501',
    keyServices: ['KMUT Enrollment', 'Widow Pension', 'Girl Child Protection Scheme', 'SHG Linkage', 'Destitute Pension']
  },
  {
    id: 'dept-04',
    nameEn: 'Agriculture & Farmers Welfare',
    nameTa: 'வேளாண்மை மற்றும் விவசாயிகள் நலத்துறை',
    slug: 'agriculture',
    icon: Sprout,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100',
    servicesCount: 28,
    schemesCount: 20,
    descEn: 'Provides farmer welfare schemes, PM-KISAN, crop insurance (PMFBY), Uzhavar Padhukappu, solar pump subsidies and soil testing.',
    descTa: 'PM-KISAN, பயிர் காப்பீடு (PMFBY), உழவர் பாதுகாப்பு, சூரிய சக்தி பம்பு மானியம்.',
    headOffice: 'Chepauk, Chennai 600 005',
    website: 'https://www.tn.gov.in/dept_agriculture',
    helpline: '1800-425-6151',
    keyServices: ['PM-KISAN Registration', 'PMFBY Crop Insurance', 'Solar Pump Subsidy', 'Soil Testing', 'Kisaan Credit Card']
  },
  {
    id: 'dept-05',
    nameEn: 'School Education',
    nameTa: 'பள்ளிக் கல்வித்துறை',
    slug: 'school-edu',
    icon: GraduationCap,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-100',
    servicesCount: 18,
    schemesCount: 15,
    descEn: 'Administers Tamil Nadu school education including scholarships, free textbooks, uniforms, mid-day meals and CM Breakfast Scheme.',
    descTa: 'பள்ளி கல்வி, உலவித்தொகை, இலவச பாடநூல்கள், சீருடை, மதிய உணவு திட்டங்கள் நிர்வாகம்.',
    headOffice: 'DPI Campus, College Road, Chennai 600 006',
    website: 'https://www.tnschools.gov.in',
    helpline: '1800-425-5555',
    keyServices: ['School Transfer Certificate', 'Scholarship Application', 'Free Uniform & Books', 'Mid-Day Meal Enrollment', 'CM Breakfast Scheme']
  },
  {
    id: 'dept-06',
    nameEn: 'Higher Education',
    nameTa: 'உயர் கல்வித்துறை',
    slug: 'higher-edu',
    icon: BookOpen,
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    iconBg: 'bg-violet-100',
    servicesCount: 12,
    schemesCount: 10,
    descEn: 'Oversees colleges and universities, Pudhumai Penn scheme, Naan Mudhalvan skill development and Tamil Pudhalvan scholarship.',
    descTa: 'கல்லூரிகள், புதுமைப் பெண் திட்டம், நான் முதல்வன் திறன் மேம்பாடு மற்றும் தமிழ் புதல்வன் உலவித்தொகை.',
    headOffice: 'UGC Campus, Chennai 600 006',
    website: 'https://www.tn.gov.in/dept_highereducation',
    helpline: '044-28272820',
    keyServices: ['Pudhumai Penn Scholarship', 'Tamil Pudhalvan Scholarship', 'Naan Mudhalvan Registration', 'College Bonafide Certificate', 'Education Loan Subsidy']
  },
  {
    id: 'dept-07',
    nameEn: 'Transport Department',
    nameTa: 'போக்குவரத்துத் துறை',
    slug: 'transport',
    icon: Car,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100',
    servicesCount: 22,
    schemesCount: 4,
    descEn: 'Issues driving licences, vehicle registrations, fitness certificates and NOCs. Administers Vidiyal Payanam (free bus for women).',
    descTa: 'ஓட்டுநர் உரிமம், வாகனப் பதிவு, தகுதிச் சான்றிதழ், விடியல் பயணம் திட்ட நிர்வாகம்.',
    headOffice: 'Commissioner of Transport, 90 Anna Salai, Chennai 600 002',
    website: 'https://tnsta.gov.in',
    helpline: '1800-425-6151',
    keyServices: ['Driving Licence', 'Vehicle Registration (RC)', 'Vehicle Transfer', 'NOC Certificate', 'Fitness Certificate']
  },
  {
    id: 'dept-08',
    nameEn: 'Municipal Administration & Water Supply',
    nameTa: 'நகராட்சி நிர்வாகம் & குடிநீர் வழங்கல் துறை',
    slug: 'municipal',
    icon: Building2,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    iconBg: 'bg-cyan-100',
    servicesCount: 30,
    schemesCount: 8,
    descEn: 'Manages urban local bodies, trade licences, building permissions, smart city projects and water supply connections.',
    descTa: 'நகரக் கழகங்கள், தொழில் உரிமம், கட்டிட அனுமதி, ஸ்மார்ட் சிட்டி திட்டங்கள் நிர்வாகம்.',
    headOffice: 'Panagal Building, Saidapet, Chennai 600 015',
    website: 'https://www.tn.gov.in/dept_municipal',
    helpline: '1916',
    keyServices: ['Trade Licence', 'Building Permit', 'Water Connection', 'Property Tax Payment', 'Birth/Death Certificate']
  },
  {
    id: 'dept-09',
    nameEn: 'Housing & Urban Development',
    nameTa: 'வீட்டுவசதி & நகர மேம்பாட்டுத் துறை',
    slug: 'housing',
    icon: Home,
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    iconBg: 'bg-orange-100',
    servicesCount: 14,
    schemesCount: 12,
    descEn: 'Administers TNHB housing schemes, Kalaignar Kanavu Illam (1-BHK affordable housing), PMAY-U and slum clearance projects.',
    descTa: 'TNHB வீட்டுத் திட்டங்கள், கலைஞர் கனவிலம் (1-BHK), PMAY-U மற்றும் குடிசை அகற்றல் திட்டங்கள் நிர்வாகம்.',
    headOffice: '5-C Haddows Road, Nungambakkam, Chennai 600 006',
    website: 'https://www.tnhb.gov.in',
    helpline: '044-28273561',
    keyServices: ['PMAY-U Application', 'Kalaignar Kanavu Illam Allotment', 'Housing Subsidy', 'Site Allotment', 'Patta Transfer']
  },
  {
    id: 'dept-10',
    nameEn: 'Labour & Employment',
    nameTa: 'தொழிலாளர் & வேலைவாய்ப்புத் துறை',
    slug: 'labour',
    icon: Briefcase,
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    iconBg: 'bg-teal-100',
    servicesCount: 20,
    schemesCount: 14,
    descEn: 'Manages employment exchanges, apprenticeships, ESI, PF, construction workers welfare board and factory safety inspections.',
    descTa: 'வேலை தொடர்பு நிலையங்கள், கட்டட தொழிலாளர் நலன் வாரியம், தொழிற்சாலை பாதுகாப்பு ஆய்வுகள்.',
    headOffice: 'DMS Building, Park Town, Chennai 600 003',
    website: 'https://labour.tn.gov.in',
    helpline: '044-28521122',
    keyServices: ['Employment Registration', 'Construction Worker Welfare', 'ESI Benefits', 'Apprenticeship Registration', 'Factory Licence']
  },
  {
    id: 'dept-11',
    nameEn: 'Electricity (TANGEDCO)',
    nameTa: 'தமிழ்நாடு மின்சார வாரியம் (TANGEDCO)',
    slug: 'electricity',
    icon: Zap,
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    iconBg: 'bg-yellow-100',
    servicesCount: 16,
    schemesCount: 6,
    descEn: 'Provides new electricity connections, free units (units 0-100), smart meters, solar rooftop subsidies and load extensions.',
    descTa: 'புதிய மின் இணைப்பு, இலவச மின்சாரம் (0-100 யூனிட்), சோலார் மேல்கூரை மானியம்.',
    headOffice: '144 Anna Salai, Chennai 600 002',
    website: 'https://www.tangedco.gov.in',
    helpline: '1912',
    keyServices: ['New Connection', 'Solar Rooftop Subsidy', 'Smart Meter Installation', 'Name Change', 'Load Extension']
  },
  {
    id: 'dept-12',
    nameEn: 'Rural Development & Panchayati Raj',
    nameTa: 'கிராம வளர்ச்சி & ஊராட்சி அமைப்பு துறை',
    slug: 'rural',
    icon: TreePine,
    color: 'bg-green-50 text-green-700 border-green-200',
    iconBg: 'bg-green-100',
    servicesCount: 18,
    schemesCount: 16,
    descEn: 'Implements MGNREGS, PMGSY rural roads, Pradhan Mantri Awas Yojana-Gramin and panchayat services.',
    descTa: 'MGNREGS வேலை வாய்ப்பு, PMGSY கிராம சாலைகள், PM Awas Yojana-Gramin திட்ட நிர்வாகம்.',
    headOffice: 'Panagal Building, Chennai 600 015',
    website: 'https://www.tn.gov.in/dept_rdpr',
    helpline: '1800-425-5556',
    keyServices: ['MGNREGS Job Card', 'Rural Housing Application', 'Patta Application', 'Village Road Works', 'SHG Formation']
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Departments' },
  { id: 'revenue', label: 'Revenue & Land' },
  { id: 'welfare', label: 'Social Welfare' },
  { id: 'health', label: 'Health' },
  { id: 'education', label: 'Education' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'employment', label: 'Employment' },
];

const CATEGORY_MAP: Record<string, string[]> = {
  revenue: ['dept-01'],
  welfare: ['dept-03', 'dept-09', 'dept-12'],
  health: ['dept-02'],
  education: ['dept-05', 'dept-06'],
  infrastructure: ['dept-07', 'dept-08', 'dept-11'],
  employment: ['dept-04', 'dept-10'],
};

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  language,
  onSelectPortal,
  onNavigatePage
}) => {
  const isTamil = language === 'ta';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const filtered = TN_DEPARTMENTS.filter(dept => {
    const matchesCat = activeCategory === 'all' || (CATEGORY_MAP[activeCategory]?.includes(dept.id));
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      dept.nameEn.toLowerCase().includes(q) ||
      dept.nameTa.includes(q) ||
      dept.descEn.toLowerCase().includes(q) ||
      dept.keyServices.some(s => s.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#102A43] via-[#1E3A8A] to-[#071B3B] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-10 w-40 h-40 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-6 right-32 w-24 h-24 rounded-full border border-white/20" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-white/10 px-3 py-1 rounded-full inline-block">
            {isTamil ? 'தமிழ்நாடு அரசு துறைகள் – {count} துறைகள்'.replace('{count}', String(TN_DEPARTMENTS.length)) : `${TN_DEPARTMENTS.length} Government Departments`}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTamil ? 'தமிழ்நாடு அரசு துறைகள் & சேவைகள்' : 'Tamil Nadu Government Departments'}
          </h1>
          <p className="text-sm text-blue-200 leading-relaxed max-w-2xl">
            {isTamil
              ? 'அனைத்து அரசு துறைகளின் சேவைகள், திட்டங்கள் மற்றும் தொடர்பு தகவல்களை ஒரே இடத்தில் அணுகுங்கள்.'
              : 'Find services, welfare schemes, contact details and citizen portals for every Tamil Nadu Government department – all in one place.'}
          </p>
        </div>

        {/* Stats Row */}
        <div className="relative z-10 mt-6 flex flex-wrap gap-4">
          {[
            { label: isTamil ? 'துறைகள்' : 'Departments', value: TN_DEPARTMENTS.length },
            { label: isTamil ? 'சேவைகள்' : 'Services', value: TN_DEPARTMENTS.reduce((a, d) => a + d.servicesCount, 0) },
            { label: isTamil ? 'திட்டங்கள்' : 'Schemes', value: TN_DEPARTMENTS.reduce((a, d) => a + d.schemesCount, 0) },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{stat.value}+</div>
              <div className="text-[11px] text-blue-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isTamil ? 'துறைகளை தேடுங்கள் (எ.கா. வருவாய், சுகாதாரம், போக்குவரத்து)...' : 'Search departments by name, service or scheme...'}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-slate-500 font-medium">
        Showing {filtered.length} of {TN_DEPARTMENTS.length} departments
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(dept => {
          const DeptIcon = dept.icon;
          const isExpanded = expandedDept === dept.id;
          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-200 transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${dept.iconBg} flex items-center justify-center shrink-0 border ${dept.color.split(' ').find(c => c.startsWith('border-')) || 'border-slate-200'}`}>
                    <DeptIcon className={`w-7 h-7 ${dept.color.split(' ').find(c => c.startsWith('text-')) || 'text-purple-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                      {isTamil ? dept.nameTa : dept.nameEn}
                    </h3>
                    {isTamil && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{dept.nameEn}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {dept.servicesCount} Services
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Award className="w-3 h-3" /> {dept.schemesCount} Schemes
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-4">
                  {isTamil ? dept.descTa : dept.descEn}
                </p>
              </div>

              {/* Key Services */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {dept.keyServices.slice(0, 3).map(svc => (
                    <span key={svc} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      {svc}
                    </span>
                  ))}
                  {dept.keyServices.length > 3 && (
                    <span className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-200">
                      +{dept.keyServices.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-4 border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{dept.headOffice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${dept.helpline}`} className="text-blue-700 hover:underline font-medium">{dept.helpline}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={dept.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline truncate">
                      {dept.website.replace('https://', '')}
                    </a>
                  </div>
                  <div className="mt-3 space-y-1">
                    <span className="font-bold text-slate-800 text-xs block">All Key Services:</span>
                    <ul className="space-y-0.5">
                      {dept.keyServices.map(svc => (
                        <li key={svc} className="flex items-center gap-2 text-[11px]">
                          <ChevronRight className="w-3 h-3 text-purple-500 shrink-0" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setExpandedDept(isExpanded ? null : dept.id)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? 'Show Less' : 'More Details'}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigatePage && onNavigatePage('services')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    View Services
                  </button>
                  <button
                    onClick={() => onSelectPortal && onSelectPortal('citizen')}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-800">No departments found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search or category filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-4 py-2 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-100"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Contact & Helpline Footer Card */}
      <div className="bg-gradient-to-r from-slate-50 to-purple-50 border border-purple-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-base text-slate-900">
            {isTamil ? 'தொடர்பு கொள்ள வேண்டுமா?' : 'Need Help Finding a Department?'}
          </h3>
          <p className="text-xs text-slate-600">
            {isTamil
              ? 'தமிழ்நாடு அரசு மைய உதவி மையம் – அனைத்து சேவைகள் & துறைகள்'
              : 'Tamil Nadu Government Central Helpline – All Departments & Services'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:1100"
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>1100 (CM Helpline)</span>
          </a>
          <button
            onClick={() => onNavigatePage && onNavigatePage('contact')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold border border-slate-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-purple-600" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </div>
  );
};
