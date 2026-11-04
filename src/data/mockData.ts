import { GovService, GovScheme, ApplicationRecord, FraudAlertRecord } from '../types';

export const TN_SERVICES: GovService[] = [
  {
    id: 'srv-01',
    department: 'Revenue & Disaster Management',
    category: 'Certificates & Records',
    titleEn: 'Community Certificate',
    titleTa: 'சாதிச் சான்றிதழ்',
    descEn: 'Official permanent community verification certificate for educational reservations and government benefits.',
    descTa: 'கல்வி இடஒதுக்கீடு மற்றும் அரசு நலத்திட்டங்களுக்கான அதிகாரப்பூர்வ நிரந்தர சாதிச் சான்றிதழ்.',
    fee: 60,
    slaDays: 7,
    documents: ['Aadhaar Card', 'Ration Card', 'Parent School TC', 'Applicant Photograph']
  },
  {
    id: 'srv-02',
    department: 'Revenue & Disaster Management',
    category: 'Certificates & Records',
    titleEn: 'Income Certificate',
    titleTa: 'வருமானச் சான்றிதழ்',
    descEn: 'Annual family income certificate required for scholarships and economic welfare schemes.',
    descTa: 'கல்வி உதவித்தொகை மற்றும் பொருளாதார நலத்திட்டங்களுக்கான குடும்ப ஆண்டு வருமானச் சான்றிதழ்.',
    fee: 60,
    slaDays: 5,
    documents: ['Salary Slip / Tax Return', 'Ration Card', 'Self Declaration', 'Land Holdings Proof']
  },
  {
    id: 'srv-03',
    department: 'Revenue & Disaster Management',
    category: 'Certificates & Records',
    titleEn: 'Nativity Certificate',
    titleTa: 'இருப்பிடச் சான்றிதழ்',
    descEn: 'Proof of continuous residence in Tamil Nadu for state quota admissions.',
    descTa: 'மாநில ஒதுக்கீட்டு சேர்க்கைகளுக்கான தமிழ்நாட்டில் தொடர் வசிப்பிடச் சான்று.',
    fee: 60,
    slaDays: 5,
    documents: ['Birth Certificate', 'School Study Certificate', 'Ration Card', 'EB Card']
  },
  {
    id: 'srv-04',
    department: 'Social Welfare & Women Empowerment',
    category: 'Citizen Welfare',
    titleEn: 'Widow Pension Scheme Assistance',
    titleTa: 'விதவை ஓய்வூதியத் திட்டம்',
    descEn: 'Monthly social security financial pension for destitute widows across Tamil Nadu.',
    descTa: 'தமிழ்நாட்டின் ஆதரவற்ற விதவைகளுக்கான மாதாந்திர சமூக பாதுகாப்பு நிதியுதவி.',
    fee: 0,
    slaDays: 15,
    documents: ['Death Certificate of Spouse', 'Income Certificate', 'Aadhaar Card', 'Bank Passbook']
  },
  {
    id: 'srv-05',
    department: 'Survey & Settlement',
    category: 'Land & Property',
    titleEn: 'Patta Chitta & FMB Transfer',
    titleTa: 'பட்டா சிட்டா மற்றும் புல வரைபடம் மாற்றம்',
    descEn: 'Online mutation and transfer of land ownership records and field measurement books.',
    descTa: 'நில உரிமை பதிவுகள் மற்றும் புல வரைபடங்களின் இணையவழி பெயர் மாற்றம்.',
    fee: 100,
    slaDays: 15,
    documents: ['Registered Sale Deed', 'Encumbrance Certificate', 'Previous Patta Copy', 'Tax Receipt']
  },
  {
    id: 'srv-06',
    department: 'Registration Department',
    category: 'Land & Property',
    titleEn: 'Encumbrance Certificate (EC)',
    titleTa: 'வில்லங்கச் சான்றிதழ்',
    descEn: 'Search and verification of legal transactions on registered properties.',
    descTa: 'பதிவு செய்யப்பட்ட சொத்துக்கள் மீதான சட்டபூர்வ பரிவர்த்தனைகள் சரிபார்ப்பு.',
    fee: 100,
    slaDays: 1,
    documents: ['Survey Number', 'Boundary Details', 'Village & Sub-Registrar Office Details']
  },
  {
    id: 'srv-07',
    department: 'Municipal Administration',
    category: 'Licenses & Permits',
    titleEn: 'Trade License Renewal',
    titleTa: 'தொழில் உரிமம் புதுப்பித்தல்',
    descEn: 'Annual commercial shop and establishment trade license clearance in town bodies.',
    descTa: 'நகராட்சி மற்றும் பேரூராட்சிகளில் வணிக நிறுவனங்களுக்கான ஆண்டு தொழில் உரிமம் புதுப்பித்தல்.',
    fee: 500,
    slaDays: 10,
    documents: ['Property Tax Receipt', 'Rental Agreement', 'Fire Safety NOC', 'Sanitation Certificate']
  },
  {
    id: 'srv-08',
    department: 'Micro, Small & Medium Enterprises (MSME)',
    category: 'Business & Industry',
    titleEn: 'Single Window Clearance 2.0',
    titleTa: 'ஒற்றைச் சாளர அனுமதி 2.0',
    descEn: 'Fast-track enterprise industrial approvals and environmental clearances.',
    descTa: 'தொழில் முனைவோருக்கான விரைவு தொழிற்துறை மற்றும் சுற்றுச்சூழல் அனுமதிகள்.',
    fee: 1500,
    slaDays: 30,
    documents: ['Project Report', 'Incorporation Certificate', 'Land Allotment Order', 'Pollution Board NOC']
  },
  {
    id: 'srv-09',
    department: 'Agriculture & Farmers Welfare',
    category: 'Agriculture & Rural',
    titleEn: 'Chief Minister Solar Pump Scheme',
    titleTa: 'முதல்வர் சூரியசக்தி பம்புசெட் திட்டம்',
    descEn: '70% subsidy for off-grid standalone solar agriculture irrigation pumps.',
    descTa: 'விவசாயிகளுக்கு 70% மானியத்தில் மின்சார வலைப்பின்னல் இல்லாத சூரியசக்தி பம்புசெட்.',
    fee: 0,
    slaDays: 21,
    documents: ['Patta Copy', 'Adangal', 'Small Farmer Certificate', 'Borewell Feasibility Report']
  }
];

import { MASTER_SCHEMES } from './govDirectoryData';
export const TN_SCHEMES: GovScheme[] = MASTER_SCHEMES;

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-01',
    appNumber: 'TN-REV-2026-00892',
    serviceTitle: 'Community Certificate',
    applicantName: 'M. Anandhi',
    district: 'Madurai',
    status: 'UNDER_REVIEW',
    submittedDate: '2026-10-24',
    lastUpdated: '2026-10-28',
    documentsCount: 4,
    riskScore: 0.12
  },
  {
    id: 'app-02',
    appNumber: 'TN-REV-2026-00843',
    serviceTitle: 'Income Certificate',
    applicantName: 'K. Soundararajan',
    district: 'Chennai',
    status: 'VERIFIED',
    submittedDate: '2026-10-25',
    lastUpdated: '2026-10-29',
    documentsCount: 3,
    riskScore: 0.08
  },
  {
    id: 'app-03',
    appNumber: 'TN-REV-2026-00711',
    serviceTitle: 'Nativity Certificate',
    applicantName: 'R. Vigneshwar',
    district: 'Coimbatore',
    status: 'APPROVED',
    submittedDate: '2026-10-18',
    lastUpdated: '2026-10-23',
    documentsCount: 4,
    riskScore: 0.05
  },
  {
    id: 'app-04',
    appNumber: 'TN-AGR-2026-00412',
    serviceTitle: 'Solar Agriculture Pump Subsidy',
    applicantName: 'S. Ramasamy',
    district: 'Thanjavur',
    status: 'SUBMITTED',
    submittedDate: '2026-10-29',
    lastUpdated: '2026-10-29',
    documentsCount: 4,
    riskScore: 0.15
  },
  {
    id: 'app-05',
    appNumber: 'TN-REV-2026-00998',
    serviceTitle: 'Income Certificate',
    applicantName: 'V. Jayaprakash',
    district: 'Tiruchirappalli',
    status: 'UNDER_REVIEW',
    submittedDate: '2026-10-30',
    lastUpdated: '2026-10-31',
    documentsCount: 3,
    riskScore: 0.88 // Anomalous!
  }
];

export const MOCK_FRAUD_ALERTS: FraudAlertRecord[] = [
  {
    id: 'frd-01',
    alertNumber: 'ALT-TN-2026-8812',
    entityType: 'service_application',
    entityId: 'TN-REV-2026-00998',
    riskScore: 0.88,
    category: 'DUPLICATE_DOCUMENT_HASH',
    evidence: 'Salary certificate binary SHA-256 fingerprint exactly identical to an already approved application in Karur district with differing applicant name.',
    status: 'INVESTIGATING',
    timestamp: '2026-10-31 06:45 AM'
  },
  {
    id: 'frd-02',
    alertNumber: 'ALT-TN-2026-8809',
    entityType: 'user_profile',
    entityId: 'USR-TN-99214',
    riskScore: 0.76,
    category: 'VELOCITY_ANOMALY',
    evidence: 'Over 14 commercial trade applications submitted within 3 minutes from single IP address through automated script detection.',
    status: 'NEW',
    timestamp: '2026-10-30 11:20 PM'
  }
];
