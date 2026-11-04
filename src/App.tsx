import React, { useState, useEffect } from 'react';
import { 
  Search, Shield, CheckCircle2, ArrowRight, Sparkles, 
  ExternalLink, FileText, Users, Building2, TrendingUp, AlertTriangle, 
  Check, ChevronRight, Lock, Bot, Clock, HelpCircle, Layers, Smartphone, FileCode2,
  Home, Info, LayoutGrid, Sprout, Newspaper, BarChart3, Headphones, Globe, User, Award,
  KeyRound, UserPlus, LogOut
} from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AuthModal } from './components/AuthModal';
import { DocumentVerificationView } from './components/DocumentVerificationView';
import { MobileAppSimulator } from './components/MobileAppSimulator';
import { ArchitectureDocsViewer } from './components/ArchitectureDocsViewer';
import { PortalType, PublicPage, CitizenPage, EmployeePage, OfficerPage, AdminPage, AnalyticsPage, AuthUser } from './types';
import { govApi } from './services/api';
import { TN_SERVICES, TN_SCHEMES, MOCK_APPLICATIONS, MOCK_FRAUD_ALERTS } from './data/mockData';
import heroBgImage from './assets/images/govai_hero_bg_1793463222318.jpg';

import { PublicHomePage } from './features/public/PublicHomePage';
import { AboutPage } from './features/public/AboutPage';
import { ServicesPage } from './features/public/ServicesPage';
import { SchemesPage } from './features/public/SchemesPage';
import { DocumentsDirectoryPage } from './features/public/DocumentsDirectoryPage';
import { LicencesDirectoryPage } from './features/public/LicencesDirectoryPage';
import { PublicInfoPage } from './features/public/PublicInfoPage';
import { TransparencyPage } from './features/public/TransparencyPage';
import { ContactHelpPage } from './features/public/ContactHelpPage';
import { DepartmentsPage } from './features/public/DepartmentsPage';

import { SchemeDetailsModal } from './components/SchemeDetailsModal';
import { DocumentChecklistModal } from './components/DocumentChecklistModal';
import { ApplyHereModal } from './components/ApplyHereModal';
import { GovScheme } from './types';

import { CitizenPortalView } from './features/citizen/CitizenPortalView';
import { EmployeePortalView } from './features/employee/EmployeePortalView';
import { OfficerPortalView } from './features/officer/OfficerPortalView';
import { AdminPortalView } from './features/admin/AdminPortalView';
import { AnalyticsPortalView } from './features/analytics/AnalyticsPortalView';

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<PortalType>('public');
  const [currentPublicPage, setCurrentPublicPage] = useState<PublicPage>('home');
  const [currentCitizenPage, setCurrentCitizenPage] = useState<CitizenPage>('dashboard');
  const [currentEmployeePage, setCurrentEmployeePage] = useState<EmployeePage>('dashboard');
  const [currentOfficerPage, setCurrentOfficerPage] = useState<OfficerPage>('dashboard');
  const [currentAdminPage, setCurrentAdminPage] = useState<AdminPage>('dashboard');
  const [currentAnalyticsPage, setCurrentAnalyticsPage] = useState<AnalyticsPage>('dashboard');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => govApi.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialPortal, setAuthInitialPortal] = useState<PortalType>('citizen');
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');

  // Unified Modals State
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovScheme | null>(null);
  const [checklistServiceForModal, setChecklistServiceForModal] = useState<string | null>(null);
  const [applyItemForModal, setApplyItemForModal] = useState<any | null>(null);

  const handleOpenAuth = (portal: PortalType = 'citizen', mode: 'login' | 'signup' = 'login') => {
    setAuthInitialPortal(portal);
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: AuthUser, targetPortal: PortalType) => {
    setCurrentUser(user);
    setCurrentPortal(targetPortal);
  };

  const handleLogout = () => {
    govApi.logout();
    setCurrentUser(null);
    setCurrentPortal('public');
    setCurrentPublicPage('home');
  };

  // Global UI Preferences
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [fontSizeDelta, setFontSizeDelta] = useState<number>(0);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Application Form Wizard State
  const [appStep, setAppStep] = useState<number>(1);
  const [appFormData, setAppFormData] = useState({
    name: 'M. Anandhi',
    district: 'Madurai',
    taluk: 'Madurai North',
    service: 'Community Certificate',
    notes: 'Required for university admission state quota'
  });
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);

  const isTamil = language === 'ta';

  const handleAdjustFontSize = (delta: number) => {
    if (delta === 0) setFontSizeDelta(0);
    else setFontSizeDelta(prev => Math.max(-2, Math.min(3, prev + delta)));
  };

  const filteredServices = TN_SERVICES.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.titleTa.includes(searchQuery) ||
      s.descEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div 
      id="main-content"
      style={{ fontSize: `${16 + fontSizeDelta * 1.5}px` }}
      className={`min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] ${highContrast ? 'high-contrast' : ''}`}
    >
      {/* Universal Government Header with Portal Switcher (Hidden in Citizen, Employee, Officer, Admin & Analytics Portals as they have bespoke headers & sidebars) */}
      {currentPortal !== 'citizen' && currentPortal !== 'employee' && currentPortal !== 'officer' && currentPortal !== 'admin' && currentPortal !== 'analytics' && (
        <Header
          currentPortal={currentPortal}
          onSelectPortal={setCurrentPortal}
          currentPublicPage={currentPublicPage}
          onSelectPublicPage={setCurrentPublicPage}
          language={language}
          onToggleLanguage={setLanguage}
          fontSize={fontSizeDelta}
          onAdjustFontSize={handleAdjustFontSize}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast(!highContrast)}
          onOpenAIAssistant={() => setIsAIOpen(true)}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
        />
      )}

      {/* Main Page Content Router */}
      <main className="flex-1">
        {/* ========================================================================= */}
        {/* PORTAL 1: PUBLIC GOVERNMENT WEBSITE                                       */}
        {/* ========================================================================= */}
        {currentPortal === 'public' && (
          <div>
            {/* PAGE 1: HOME (Exact match with image_b68bd865.png!) */}
            {currentPublicPage === 'home' && (
              <PublicHomePage
                isTamil={isTamil}
                onNavigatePage={(p: PublicPage) => setCurrentPublicPage(p)}
                onSelectSchemeForModal={(scheme) => setSelectedSchemeForModal(scheme)}
                onOpenChecklistModal={(serviceName) => setChecklistServiceForModal(serviceName)}
                onOpenApplyModal={(item) => setApplyItemForModal(item)}
                onOpenAIAssistant={() => setIsAIOpen(true)}
                onSelectPortal={(portal) => setCurrentPortal(portal)}
              />
            )}

            {/* PAGE 2: ABOUT GOVAI NEXUS */}
            {currentPublicPage === 'about' && (
              <AboutPage
                language={language}
                onNavigatePage={(p: any) => setCurrentPublicPage(p)}
              />
            )}

            {/* PAGE 3: GOVERNMENT SERVICES CATALOG */}
            {currentPublicPage === 'services' && (
              <ServicesPage
                language={language}
                onApplyService={(serviceTitle) => {
                  setAppFormData(prev => ({ ...prev, service: serviceTitle }));
                  setCurrentPortal('citizen');
                  setCurrentCitizenPage('apply');
                }}
                onOpenAI={() => setIsAIOpen(true)}
              />
            )}

            {/* PAGE 4: SCHEMES & BENEFITS */}
            {currentPublicPage === 'schemes' && (
              <SchemesPage
                language={language}
                onEnrollScheme={(schemeTitle) => {
                  const schemeObj = TN_SCHEMES.find(s => s.titleEn === schemeTitle);
                  if (schemeObj) {
                    setApplyItemForModal(schemeObj);
                  } else {
                    setAppFormData(prev => ({ ...prev, notes: `Enrollment in ${schemeTitle}` }));
                    setCurrentPortal('citizen');
                    setCurrentCitizenPage('apply');
                  }
                }}
                onSelectScheme={(scheme) => setSelectedSchemeForModal(scheme)}
                onOpenAI={() => setIsAIOpen(true)}
              />
            )}

            {/* PAGE 4B: DEPARTMENTS DIRECTORY */}
            {currentPublicPage === 'departments' && (
              <DepartmentsPage
                language={language}
                onSelectPortal={(portal) => setCurrentPortal(portal)}
                onNavigatePage={(p: PublicPage) => setCurrentPublicPage(p)}
              />
            )}

            {/* PAGE 4C: DOCUMENTS & CERTIFICATES CATALOG */}
            {currentPublicPage === 'documents' && (
              <DocumentsDirectoryPage
                language={language}
                onOpenChecklist={(docTitle) => setChecklistServiceForModal(docTitle)}
                onApplyDoc={(doc) => setApplyItemForModal(doc)}
                onOpenAI={() => setIsAIOpen(true)}
              />
            )}

            {/* PAGE 4C: LICENCES & PERMITS CATALOG */}
            {currentPublicPage === 'licences' && (
              <LicencesDirectoryPage
                language={language}
                onApplyLicence={(lic) => setApplyItemForModal(lic)}
                onOpenAI={() => setIsAIOpen(true)}
              />
            )}

            {/* PAGE 5: PUBLIC INFORMATION */}
            {currentPublicPage === 'public-info' && (
              <PublicInfoPage
                language={language}
              />
            )}

            {/* PAGE 6: TRANSPARENCY PORTAL */}
            {currentPublicPage === 'transparency' && (
              <TransparencyPage
                language={language}
              />
            )}

            {/* PAGE 7: CONTACT & HELP */}
            {currentPublicPage === 'contact' && (
              <ContactHelpPage
                language={language}
                onNavigateToGrievance={() => {
                  setCurrentPortal('citizen');
                  setCurrentCitizenPage('complaints');
                }}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 2: CITIZEN PORTAL                                                  */}
        {/* ========================================================================= */}
        {currentPortal === 'citizen' && (
          <CitizenPortalView
            language={language}
            currentPage={currentCitizenPage}
            onNavigate={setCurrentCitizenPage}
            onOpenAIAssistant={() => setIsAIOpen(true)}
            onOpenChecklistModal={(title) => setChecklistServiceForModal(title)}
            onOpenSchemeModal={(scheme) => setSelectedSchemeForModal(scheme)}
            onOpenApplyModal={(item) => setApplyItemForModal(item)}
            onExitToPublic={() => setCurrentPortal('public')}
            onToggleLanguage={setLanguage}
            onAdjustFontSize={handleAdjustFontSize}
            fontSize={fontSizeDelta}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 3: EMPLOYEE PORTAL (Caseworkers, VAO, Clerks)                      */}
        {/* ========================================================================= */}
        {currentPortal === 'employee' && (
          <EmployeePortalView
            language={language}
            currentPage={currentEmployeePage}
            onNavigate={setCurrentEmployeePage}
            onToggleLanguage={setLanguage}
            onAdjustFontSize={handleAdjustFontSize}
            fontSize={fontSizeDelta}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
            onExitToPublic={() => setCurrentPortal('public')}
            onOpenAIAssistant={() => setIsAIOpen(true)}
          />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 4: DEPARTMENT OFFICER / HOD PORTAL                                  */}
        {/* ========================================================================= */}
        {currentPortal === 'officer' && (
          <OfficerPortalView
            language={language}
            currentPage={currentOfficerPage}
            onNavigate={setCurrentOfficerPage}
            onToggleLanguage={setLanguage}
            onAdjustFontSize={handleAdjustFontSize}
            fontSize={fontSizeDelta}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
            onExitToPublic={() => setCurrentPortal('public')}
            onOpenAIAssistant={() => setIsAIOpen(true)}
          />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 5: SUPER ADMIN PORTAL                                              */}
        {/* ========================================================================= */}
        {currentPortal === 'admin' && (
          <AdminPortalView
            language={language}
            currentPage={currentAdminPage}
            onNavigate={setCurrentAdminPage}
            onToggleLanguage={setLanguage}
            onAdjustFontSize={handleAdjustFontSize}
            fontSize={fontSizeDelta}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
            onExitToPublic={() => setCurrentPortal('public')}
            onOpenAIAssistant={() => setIsAIOpen(true)}
          />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 6: AI & ANALYTICS CENTRE                                            */}
        {/* ========================================================================= */}
        {currentPortal === 'analytics' && (
          <AnalyticsPortalView
            language={language}
            currentPage={currentAnalyticsPage}
            onNavigate={setCurrentAnalyticsPage}
            onToggleLanguage={setLanguage}
            onAdjustFontSize={handleAdjustFontSize}
            fontSize={fontSizeDelta}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
            onExitToPublic={() => setCurrentPortal('public')}
            onOpenAIAssistant={() => setIsAIOpen(true)}
          />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 7: MOBILE APP SIMULATOR (REACT NATIVE / EXPO)                      */}
        {/* ========================================================================= */}
        {currentPortal === 'mobile-sim' && (
          <MobileAppSimulator language={language} />
        )}

        {/* ========================================================================= */}
        {/* PORTAL 8: ARCHITECTURE & PYTHON CODE EXPLORER                             */}
        {/* ========================================================================= */}
        {currentPortal === 'architecture-docs' && (
          <ArchitectureDocsViewer language={language} />
        )}
      </main>

      {/* Official Government Footer (Hidden in Citizen, Employee, Officer, Admin & Analytics Portals) */}
      {currentPortal !== 'citizen' && currentPortal !== 'employee' && currentPortal !== 'officer' && currentPortal !== 'admin' && currentPortal !== 'analytics' && (
        <Footer 
          language={language} 
          onNavigatePage={(p) => { setCurrentPortal('public'); setCurrentPublicPage(p); }} 
        />
      )}

      {/* Interactive AI Assistant Modal (Bilingual & Citations) */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        language={language}
      />

      {/* Multi-Portal Authentication (Login & Sign Up) Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialPortal={authInitialPortal}
        initialMode={authInitialMode}
        language={language}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Scheme Details Modal */}
      {selectedSchemeForModal && (
        <SchemeDetailsModal
          scheme={selectedSchemeForModal}
          language={language}
          onClose={() => setSelectedSchemeForModal(null)}
          onApply={(scheme) => {
            setSelectedSchemeForModal(null);
            setApplyItemForModal(scheme);
          }}
          onOpenChecklist={(title) => {
            setSelectedSchemeForModal(null);
            setChecklistServiceForModal(title);
          }}
        />
      )}

      {/* Dynamic Document Requirement Checklist Modal */}
      {checklistServiceForModal && (
        <DocumentChecklistModal
          serviceTitle={checklistServiceForModal}
          language={language}
          onClose={() => setChecklistServiceForModal(null)}
          onProceedApply={(serviceTitle) => {
            setChecklistServiceForModal(null);
            const foundScheme = TN_SCHEMES.find(s => s.titleEn === serviceTitle);
            if (foundScheme) {
              setApplyItemForModal(foundScheme);
            } else {
              setAppFormData(prev => ({ ...prev, service: serviceTitle }));
              setCurrentPortal('citizen');
              setCurrentCitizenPage('apply');
            }
          }}
        />
      )}

      {/* Unified Application Modal (Mode A / B / C) */}
      {applyItemForModal && (
        <ApplyHereModal
          item={applyItemForModal}
          currentUser={currentUser}
          language={language}
          onClose={() => setApplyItemForModal(null)}
          onApplicationCreated={() => {
            // Callback for lodged application
          }}
        />
      )}
    </div>
  );
}
