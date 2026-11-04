import React, { useState } from 'react';
import { 
  Building2, Users, Shield, Award, CheckCircle2, 
  ArrowRight, Landmark, Compass, Eye, HeartHandshake, FileText, ChevronRight
} from 'lucide-react';

interface AboutPageProps {
  language: 'en' | 'ta';
  onNavigatePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language, onNavigatePage }) => {
  const isTamil = language === 'ta';
  const [activeTab, setActiveTab] = useState<'overview' | 'vision' | 'departments' | 'leadership'>('overview');

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#071B3B] via-[#0D284F] to-[#1E3A8A] text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-blue-900/40">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 px-3.5 py-1 rounded-full text-xs font-semibold text-purple-300">
            <Landmark className="w-3.5 h-3.5" />
            <span>{isTamil ? 'தமிழ்நாடு அரசு டிஜிட்டல் சாசனம்' : 'Government of Tamil Nadu Digital Charter'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {isTamil ? 'GovAI Nexus பற்றி' : 'About GovAI Nexus'}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isTamil 
              ? 'தமிழ்நாட்டின் 7.5+ கோடி குடிமக்களுக்கு வெளிப்படையான, சமத்துவமான, விரைவான மற்றும் தரவு சார்ந்த அரசு சேவைகளை வழங்கும் அதிகாரப்பூர்வ AI ஆளுகைத் தளம்.'
              : 'The flagship AI-powered digital governance platform for the Government of Tamil Nadu, delivering transparent, inclusive, zero-delay public services across all 38 districts.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 relative z-10">
          {[
            { id: 'overview', label: isTamil ? 'கண்ணோட்டம்' : 'Platform Overview' },
            { id: 'vision', label: isTamil ? 'பார்வை & நோக்கம்' : 'Vision & Mission' },
            { id: 'departments', label: isTamil ? 'துறைகள் & கட்டமைப்பு' : 'Governance & Departments' },
            { id: 'leadership', label: isTamil ? 'தலைமை வழிகாட்டல்' : 'Leadership & Organization' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">What is GovAI Nexus?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                GovAI Nexus is an enterprise GovTech platform conceived to unify 500+ government services, 400+ welfare assistance schemes, and statewide grievance redressal under one intelligent data plane.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Platform Objectives</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Zero physical queues for citizen certificates.</li>
                <li>Instant AI guidance in simple Tamil & English.</li>
                <li>100% statutory SLA adherence with predictive alerts.</li>
                <li>DPDP Act 2023 compliant citizen privacy.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Radical Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Public access to real-time capital budgets, project milestones, and department performance rankings eliminates informational asymmetries between citizens and the state.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vision & Mission */}
      {activeTab === 'vision' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
          <div className="bg-white p-8 rounded-3xl border border-purple-200 shadow-sm space-y-4">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Our State Vision</span>
            <h2 className="text-2xl font-extrabold text-slate-900">A Zero-Friction Digital State</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To transform Tamil Nadu into South Asia’s foremost digitally empowered state, where every citizen, farmer, student, and entrepreneur receives public entitlements with dignity, zero intermediaries, and zero delays.
            </p>
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Inclusive technology for rural and urban areas alike</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sovereign state data hosting at TNSDC Chennai</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-sm space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Our Mission</span>
            <h2 className="text-2xl font-extrabold text-slate-900">People-First Governance</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We leverage modern artificial intelligence, machine learning, and multi-agent coordination not to replace human discretion, but to accelerate review workflows, prevent backlogs, and ensure government responsiveness.
            </p>
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Multi-channel delivery: Web, Mobile, e-Sevai, and WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Tamil natural language processing at state scale</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Governance Structure & Departments */}
      {activeTab === 'departments' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">State Governance Hierarchy</h3>
            <p className="text-xs text-slate-600 max-w-2xl">
              GovAI Nexus digitally connects all administrative tiers of the Government of Tamil Nadu into one coherent operational fabric.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Level 1: Secretariat', count: '50+ Ministries', desc: 'Policy formulation, budget allocations, state G.O. gazettes.' },
                { title: 'Level 2: Collectorates', count: '38 Districts', desc: 'District Collectors, revenue supervision, grievance coordination.' },
                { title: 'Level 3: Taluk Offices', count: '313 Taluks', desc: 'Tahsildars, e-Sevai operations, certificate authorizations.' },
                { title: 'Level 4: Field Units', count: '12,525 Panchayats', desc: 'VAOs, Revenue Inspectors, grassroots welfare delivery.' }
              ].map((tier, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">{tier.title}</div>
                  <div className="text-lg font-extrabold text-slate-900">{tier.count}</div>
                  <p className="text-xs text-slate-500 leading-snug">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Leadership Information */}
      {activeTab === 'leadership' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-300 shadow-sm text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-amber-400 shadow-md bg-amber-500">
                <img src="/assets/aistudio/image_2cfeaf36.png" alt="C. Joseph Vijay" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">C. Joseph Vijay</h4>
                <p className="text-xs font-semibold text-amber-700">Leader, Tamil Nadu</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Championing ethical, progressive, people-first digital governance and educational empowerment across Tamil Nadu.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xl">
                ITDS
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">Minister for IT & Digital Services</h4>
                <p className="text-xs font-semibold text-purple-700">Govt of Tamil Nadu</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Steering state technology strategy, hardware modernization, and AI innovation initiatives.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xl">
                TNeGA
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">Chief Executive Officer</h4>
                <p className="text-xs font-semibold text-blue-700">Tamil Nadu e-Governance Agency</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Overseeing technical architecture, e-Sevai infrastructure, and citizen digital service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
