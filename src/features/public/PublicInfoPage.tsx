import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Search, Filter, 
  ExternalLink, Bell, Building2, CheckCircle2, ChevronRight
} from 'lucide-react';

interface PublicInfoPageProps {
  language: 'en' | 'ta';
}

export const PublicInfoPage: React.FC<PublicInfoPageProps> = ({ language }) => {
  const isTamil = language === 'ta';
  const [activeTab, setActiveTab] = useState<'all' | 'gos' | 'notices' | 'policies' | 'press'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: 'GO-2026-112',
      type: 'Government Order (G.O.)',
      typeTa: 'அரசாணை',
      category: 'gos',
      titleEn: 'G.O. (Ms) No. 112 - Revenue Citizen Services Standards 2026',
      titleTa: 'அரசாணை எண் 112 - வருவாய்த்துறை குடிமக்கள் சேவைத் தரநிலைகள் 2026',
      dept: 'Revenue & Disaster Management',
      date: '12 Jan 2026',
      fileSize: '1.4 MB PDF'
    },
    {
      id: 'GO-2026-49',
      type: 'Government Order (G.O.)',
      typeTa: 'அரசாணை',
      category: 'gos',
      titleEn: 'G.O. (Ms) No. 49 - Magalir Urimai Thogai Guidelines Revision',
      titleTa: 'அரசாணை எண் 49 - மகளிர் உரிமைத் தொகை வழிகாட்டு நெறிமுறைகள் திருத்தம்',
      dept: 'Social Welfare & Women Empowerment',
      date: '08 Jan 2026',
      fileSize: '2.1 MB PDF'
    },
    {
      id: 'POLICY-2025-04',
      type: 'State Policy Document',
      typeTa: 'கொள்கை ஆவணம்',
      category: 'policies',
      titleEn: 'Tamil Nadu Green Energy & Solar Rooftop Policy 2025-2030',
      titleTa: 'தமிழ்நாடு பசுமை ஆற்றல் & சூரிய கூரை மின் உற்பத்தி கொள்கை 2025-2030',
      dept: 'Energy Department',
      date: '18 Jan 2026',
      fileSize: '4.8 MB PDF'
    },
    {
      id: 'NOTICE-2026-03',
      type: 'Public Notice',
      typeTa: 'பொது அறிவிப்பு',
      category: 'notices',
      titleEn: 'Extension of Online Application Deadline for Uzhavar Pathukappu Thittam',
      titleTa: 'உழவர் பாதுகாப்புத் திட்ட விண்ணப்ப கால நீட்டிப்பு குறித்த அறிவிப்பு',
      dept: 'Agriculture & Farmers Welfare',
      date: '12 Jan 2026',
      fileSize: '820 KB PDF'
    },
    {
      id: 'PRESS-2026-09',
      type: 'Press Release',
      typeTa: 'செய்திக்குறிப்பு',
      category: 'press',
      titleEn: 'Statewide Launch of GovAI Nexus Mobile App across 38 Districts',
      titleTa: '38 மாவட்டங்களிலும் GovAI Nexus மொபைல் செயலி அதிகாரப்பூர்வ தொடக்கம்',
      dept: 'Information Technology & Digital Services',
      date: '15 Jan 2026',
      fileSize: '650 KB PDF'
    },
    {
      id: 'GO-2026-18',
      type: 'Government Order (G.O.)',
      typeTa: 'அரசாணை',
      category: 'gos',
      titleEn: 'G.O. (Ms) No. 18 - Tamil Nadu Digital Personal Data Protection Protocols',
      titleTa: 'அரசாணை எண் 18 - தமிழ்நாடு டிஜிட்டல் தனிநபர் தரவுப் பாதுகாப்பு நெறிமுறைகள்',
      dept: 'TNeGA / Law Department',
      date: '05 Jan 2026',
      fileSize: '3.2 MB PDF'
    }
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesTab = activeTab === 'all' || doc.category === activeTab;
    const matchesSearch = !searchQuery || 
      doc.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleTa.includes(searchQuery) ||
      doc.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-block bg-blue-100 text-blue-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isTamil ? 'அரசு ஆவணக் களஞ்சியம்' : 'Official Gazette Repository'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {isTamil ? 'பொதுத் தகவல் & அரசாணைகள்' : 'Public Information & Official Gazettes'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {isTamil
            ? 'தமிழ்நாடு அரசின் அரசாணைகள், கொள்கை ஆவணங்கள், சுற்றறிக்கைகள், செய்திக்குறிப்புகள் மற்றும் பொது அறிவிப்புகளைப் பதிவிறக்குங்கள்.'
            : 'Access official Government Orders (G.O.s), legislative circulars, policy notifications, press briefings, and statutory gazettes.'}
        </p>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTamil ? 'அரசாணை எண், தலைப்பு அல்லது துறையைத் தேடுங்கள்...' : 'Search G.O. number, title, policy topic, or department...'}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'gos', label: 'Government Orders (G.O.s)' },
            { id: 'policies', label: 'Policies & Frameworks' },
            { id: 'notices', label: 'Public Notices' },
            { id: 'press', label: 'Press Releases' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Records List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="p-6 hover:bg-purple-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                  {doc.id}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {isTamil ? doc.typeTa : doc.type}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">
                {isTamil ? doc.titleTa : doc.titleEn}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{doc.dept}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{doc.date}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Initiating verified download for: ${doc.titleEn} (${doc.fileSize})`);
              }}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-700 hover:text-white text-purple-700 rounded-xl text-xs font-semibold transition-all border border-purple-200 flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF ({doc.fileSize})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
