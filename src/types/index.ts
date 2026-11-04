export type PortalType = 
  | 'public' 
  | 'citizen' 
  | 'employee' 
  | 'officer' 
  | 'admin' 
  | 'analytics' 
  | 'mobile-sim' 
  | 'architecture-docs';

export type PublicPage =
  | 'home'
  | 'about'
  | 'services'
  | 'schemes'
  | 'departments'
  | 'documents'
  | 'licences'
  | 'public-info'
  | 'transparency'
  | 'contact';

export type CitizenPage = 
  | 'dashboard' 
  | 'scheme-finder'
  | 'schemes'
  | 'service-explorer'
  | 'services'
  | 'certificates'
  | 'licenses'
  | 'scheme-recommendations' 
  | 'documents-vault'
  | 'documents-directory'
  | 'my-documents'
  | 'document-checklist'
  | 'licences-directory'
  | 'apply'
  | 'my-applications' 
  | 'renewal-reminders'
  | 'renewals'
  | 'ai-assistant' 
  | 'complaints'
  | 'grievances'
  | 'help-support'
  | 'profile';

export type EmployeePage = 
  | 'dashboard' 
  | 'applications' 
  | 'work-queue'
  | 'pending-applications'
  | 'under-review'
  | 'process-applications'
  | 'approval-rejection'
  | 'doc-verification' 
  | 'service-requests'
  | 'communications'
  | 'tasks' 
  | 'sla-performance'
  | 'reports'
  | 'scheme-services'
  | 'team-workload'
  | 'help'
  | 'profile'
  | 'complaints';

export type OfficerPage = 
  | 'dashboard' 
  | 'departments' 
  | 'department-management'
  | 'applications'
  | 'application-monitoring'
  | 'employees'
  | 'employee-management'
  | 'workload' 
  | 'workload-monitoring'
  | 'predictive' 
  | 'predictive-analytics'
  | 'fraud-alerts' 
  | 'grievances'
  | 'citizen-grievances'
  | 'feedback'
  | 'citizen-feedback'
  | 'reports'
  | 'department-reports'
  | 'announcements'
  | 'notifications'
  | 'help'
  | 'profile'
  | 'profile-settings';

export type AdminPage = 
  | 'dashboard' 
  | 'users' 
  | 'user-management'
  | 'departments' 
  | 'department-management'
  | 'roles-matrix' 
  | 'roles-permissions'
  | 'services-manage' 
  | 'service-management'
  | 'schemes-manage'
  | 'scheme-management'
  | 'ai-models' 
  | 'ai-model-management'
  | 'system-config' 
  | 'system-configuration'
  | 'integrations'
  | 'security-audit'
  | 'audit-logs'
  | 'announcements'
  | 'notifications-announcements'
  | 'reports'
  | 'reports-analytics'
  | 'help'
  | 'help-support'
  | 'profile'
  | 'profile-settings';

export type AnalyticsPage = 
  | 'dashboard'
  | 'governance-overview'
  | 'ai-knowledge'
  | 'knowledge-repository'
  | 'document-ingestion'
  | 'semantic-search'
  | 'predictive-intel' 
  | 'fraud-intel' 
  | 'public-transparency' 
  | 'citizen-sentiment'
  | 'infrastructure' 
  | 'compliance'
  | 'bi-reporting'
  | 'reports-analytics'
  | 'ai-assistant'
  | 'help-documentation'
  | 'department-intel'
  | 'district-intel'
  | 'integrations-hub';

export type SchemeClassification = 
  | 'Tamil Nadu State Government Scheme'
  | 'Central Government Scheme'
  | 'Jointly Funded Scheme'
  | 'Departmental Programme'
  | 'Welfare Board Scheme'
  | 'Public Service / Government Benefit';

export type SchemeStatus = 
  | 'Active'
  | 'Temporarily Closed'
  | 'Applications Not Open'
  | 'Upcoming'
  | 'Discontinued'
  | 'Verification Required';

export type ApplicationSubmissionMode = 
  | 'MODE_A_NATIVE' 
  | 'MODE_B_INTEGRATED' 
  | 'MODE_C_EXTERNAL_PORTAL';

export interface GovService {
  id: string;
  department: string;
  category: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  fee: number;
  slaDays: number;
  documents: string[];
  issuingAuthority?: string;
  officialApplyUrl?: string;
}

export interface GovScheme {
  id: string;
  department: string;
  category: string;
  titleEn: string;
  titleTa: string;
  benefitEn: string;
  benefitTa: string;
  deadline: string;
  targetGroup: string;
  classification?: SchemeClassification;
  financialAssistance?: string;
  paymentFrequency?: string;
  eligibilityCriteria?: string[];
  ageMin?: number;
  ageMax?: number;
  incomeMax?: number;
  genderRequirement?: 'Female' | 'Male' | 'All' | 'Transgender';
  educationRequirement?: string;
  occupationRequirement?: string;
  residenceRequirement?: string;
  requiredDocuments?: string[];
  applicationProcedure?: string;
  applicationFee?: number | string;
  officialApplyUrl?: string;
  officialInfoUrl?: string;
  governmentOrder?: string;
  helplineNumber?: string;
  lastVerifiedDate?: string;
  status?: SchemeStatus;
  faqs?: Array<{ q: string; a: string }>;
  submissionMode?: ApplicationSubmissionMode;
}

export interface GovDocument {
  id: string;
  category: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  issuingAuthority: string;
  acceptedProofFor: string[];
  requiredPrerequisites: string[];
  validityPeriod: string;
  fee: number | string;
  slaDays: number;
  officialUrl: string;
  downloadFormUrl?: string;
  lastVerifiedDate: string;
}

export interface GovLicence {
  id: string;
  category: string;
  titleEn: string;
  titleTa: string;
  issuingAuthority: string;
  department: string;
  purpose: string;
  targetAudience: string;
  eligibility: string;
  requiredDocuments: string[];
  applicationFee: string | number;
  validityPeriod: string;
  renewalProcess: string;
  officialApplyUrl: string;
  officialInfoUrl: string;
  lastVerifiedDate: string;
}

export interface ChecklistRequirement {
  id?: string;
  docName?: string;
  documentName?: string;
  whyRequired?: string;
  mandatory?: boolean;
  isMandatory?: boolean;
  acceptedFormats: string[];
  maxSizeMb?: number;
  maxSizeMB?: number;
  issuingAuthority?: string;
  alternatives?: string;
  tipEn?: string;
  tipTa?: string;
  status?: 'PENDING' | 'UPLOADED' | 'VERIFIED' | 'REJECTED';
  fileName?: string;
}

export interface RenewalReminder {
  id: string;
  title: string;
  category?: string;
  documentType?: 'DRIVING_LICENCE' | 'TRADE_LICENCE' | 'PUC_CERTIFICATE' | 'VEHICLE_INSURANCE' | 'FSSAI_LICENCE' | string;
  documentNumber?: string;
  expiryDate: string;
  daysRemaining: number;
  referenceNumber?: string;
  issuingAuthority?: string;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'RENEWED';
  officialRenewalUrl: string;
  instructions?: string;
}

export interface CitizenVaultDocument {
  id: string;
  title: string;
  category: string;
  documentNumber?: string;
  issuingAuthority?: string;
  issuedDate?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  uploadDate?: string;
  expiryDate?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  digiLockerSynced?: boolean;
  usedInApplications?: string[];
}

export interface ApplicationRecord {
  id: string;
  appNumber: string;
  serviceTitle: string;
  applicantName: string;
  district: string;
  taluk?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'APPROVED' | 'REJECTED' | 'DOCUMENTS_PENDING';
  submittedDate: string;
  submissionDate?: string;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  lastUpdated: string;
  documentsCount?: number;
  riskScore?: number;
  slaRemainingDays?: number;
  currentStage?: string;
  submissionMode?: ApplicationSubmissionMode;
  externalReference?: string;
  department?: string;
  timeline?: Array<{ status: string; date: string; remarks: string }>;
}

export interface FraudAlertRecord {
  id: string;
  alertNumber: string;
  entityType: string;
  entityId: string;
  riskScore: number;
  category: string;
  evidence: string;
  status: 'NEW' | 'INVESTIGATING' | 'CLEARED' | 'ESCALATED';
  timestamp: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'employee' | 'officer' | 'admin' | 'analytics';
  token?: string;
  district?: string;
  department?: string;
  designation?: string;
  phone?: string;
  aadhaarMasked?: string;
  employeeId?: string;
}

