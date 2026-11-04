import React, { useState } from 'react';
import { 
  Search, Filter, Clock, CheckCircle2, FileText, ArrowRight, 
  HelpCircle, Shield, Building2, ChevronRight
} from 'lucide-react';
import { TN_SERVICES } from '../../data/mockData';

interface ServicesPageProps {
  language: 'en' | 'ta';
  onApplyService: (serviceName: string) => void;
  onOpenAI: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ language, onApplyService, onOpenAI }) => {
  const isTamil = language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<any | null>(null);

  const categories = [
    'All',
    'Certificates & Records',
    'Citizen Welfare',
    'Land & Property',
    'Licenses & Permits',
    'Business & Industry',
    'Agriculture & Rural'
  ];

  const filteredServices = TN_SERVICES.filter(service => {
    const matchesCat = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      service.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.titleTa.includes(searchQuery) ||
      service.descEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-block bg-purple-100 text-purple-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isTamil ? 'அரசு சேவைகள் கையேடு' : 'Service Directory'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {isTamil ? 'அரசு சேவைகள் பட்டியல்' : 'Government Services Catalog'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {isTamil
            ? 'அனைத்து அரசுத் துறைகளின் சேவைகள், தகுதி வரம்புகள், தேவையான ஆவணங்கள் மற்றும் கட்டண விவரங்களை அறிந்து உடனடியாக விண்ணப்பியுங்கள்.'
            : 'Access official service specifications, statutory SLA timelines, required documentation, and direct online application procedures.'}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTamil ? 'சேவைகள் அல்லது துறைகளைத் தேடுங்கள்...' : 'Search across 500+ services by name, department, or keyword...'}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-purple-300 transition-all hover:shadow-md space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-md">
                  {service.department}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {service.category}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700">
                {isTamil ? service.titleTa : service.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {isTamil ? service.descTa : service.descEn}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Statutory SLA</span>
                  <span className="font-bold text-slate-800">{service.slaDays} Working Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Govt Fee</span>
                  <span className="font-bold text-emerald-700">{service.fee === 0 ? 'Free' : `₹ ${service.fee}`}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedServiceDetail(service)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => onApplyService(service.titleEn)}
                  className="flex-1 py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase">
                  {selectedServiceDetail.department}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {isTamil ? selectedServiceDetail.titleTa : selectedServiceDetail.titleEn}
                </h2>
              </div>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isTamil ? selectedServiceDetail.descTa : selectedServiceDetail.descEn}
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Mandatory Proof Documents:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedServiceDetail.documents?.map((doc: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs text-purple-950">
              <div>
                <span className="block text-[10px] text-purple-700 font-bold uppercase">Processing SLA</span>
                <span className="font-extrabold text-base">{selectedServiceDetail.slaDays} Days</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-purple-700 font-bold uppercase">Official Fee</span>
                <span className="font-extrabold text-base text-emerald-700">
                  {selectedServiceDetail.fee === 0 ? 'Free of Cost' : `₹ ${selectedServiceDetail.fee}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedServiceDetail(null);
                  onOpenAI();
                }}
                className="flex-1 py-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-xs font-bold transition-all"
              >
                Ask AI Assistant
              </button>
              <button
                onClick={() => {
                  const title = selectedServiceDetail.titleEn;
                  setSelectedServiceDetail(null);
                  onApplyService(title);
                }}
                className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
