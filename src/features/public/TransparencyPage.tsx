import React, { useState } from 'react';
import { 
  Building2, TrendingUp, Users, CheckCircle2, Download, 
  BarChart3, Database, Shield, ArrowUpRight, Search, FileSpreadsheet
} from 'lucide-react';

interface TransparencyPageProps {
  language: 'en' | 'ta';
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ language }) => {
  const isTamil = language === 'ta';
  const [activeTab, setActiveTab] = useState<'datasets' | 'budgets' | 'performance' | 'projects'>('budgets');

  const capitalProjects = [
    { title: 'Chennai Metro Rail Phase II Expansion', budget: '₹ 63,246 Cr', progress: 68, status: 'On Track', dept: 'Special Initiatives' },
    { title: 'Tamil Nadu Smart e-Sevai Cloud Infrastructure', budget: '₹ 840 Cr', progress: 92, status: 'Completed', dept: 'IT & Digital Services' },
    { title: 'Cauvery-Vaigai-Gundar River Linkage Project', budget: '₹ 14,400 Cr', progress: 54, status: 'Active', dept: 'Water Resources' },
    { title: 'Chief Minister Rural Road Connectivity Mission', budget: '₹ 4,000 Cr', progress: 85, status: 'On Track', dept: 'Rural Development' }
  ];

  const departmentPerformance = [
    { dept: 'Revenue & Disaster Management', volume: '14.2 Lakh', slaCompliance: '94.8%', avgDays: 4.1 },
    { dept: 'Social Welfare & Women Empowerment', volume: '22.8 Lakh', slaCompliance: '97.2%', avgDays: 3.2 },
    { dept: 'Commercial Taxes & Registration', volume: '8.4 Lakh', slaCompliance: '91.6%', avgDays: 2.8 },
    { dept: 'Agriculture & Farmers Welfare', volume: '11.5 Lakh', slaCompliance: '93.4%', avgDays: 5.0 },
    { dept: 'School & Higher Education', volume: '16.9 Lakh', slaCompliance: '98.1%', avgDays: 2.1 }
  ];

  const publicDatasets = [
    { name: 'Tamil Nadu Administrative District Boundary & Taluk Geospatial Layers', format: 'GeoJSON / CSV', size: '14.2 MB', records: '38 Districts' },
    { name: 'Monthly Welfare Scheme Disbursement Summary 2024-2026', format: 'CSV / JSON', size: '28.6 MB', records: '1.2 Cr Rows' },
    { name: 'State Government Service Delivery & SLA Turnaround Telemetry', format: 'CSV / API', size: '52.1 MB', records: '4.8 Cr Records' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isTamil ? 'திறந்த ஆளுகை & வெளிப்படைத்தன்மை' : 'Open Governance & Public Auditing'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {isTamil ? 'வெளிப்படைத்தன்மை & திறந்த தரவு தளம்' : 'State Transparency & Open Data Portal'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {isTamil
            ? 'அரசு நிதி ஒதுக்கீடுகள், திட்ட முன்னேற்றங்கள், துறை செயல்திறன் தரவரிசை மற்றும் பொதுத் தரவுத் தொகுப்புகளை நிகழ்நேரத்தில் பார்வையிடுங்கள்.'
            : 'Access real-time public expenditure audits, capital infrastructure milestones, department SLA league tables, and downloadable open datasets.'}
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Statewide Capital Works Budget</span>
            <span className="text-emerald-700 font-bold">FY 2025-26</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹ 82,486 Cr</div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full w-[74%] rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-1">
            <span>Disbursed: ₹ 61,040 Cr</span>
            <span className="font-bold text-emerald-700">74% Utilized</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Citizen Service SLA Compliance</span>
            <span className="text-purple-700 font-bold">State Target: 90%</span>
          </div>
          <div className="text-3xl font-extrabold text-purple-700">95.4%</div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
            <div className="bg-purple-600 h-full w-[95.4%] rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-1">
            <span>Processed: 73.8 Lakh apps</span>
            <span className="font-bold text-purple-700">+5.4% vs SLA</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Direct Benefit Transfer (DBT)</span>
            <span className="text-blue-700 font-bold">100% Aadhaar-Linked</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-700">₹ 24,190 Cr</div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
            <div className="bg-blue-600 h-full w-[100%] rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-1">
            <span>Direct to Bank Account</span>
            <span className="font-bold text-blue-700">Zero Leakage</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 text-xs">
        {[
          { id: 'budgets', label: 'Expenditures & Capital Budgets' },
          { id: 'projects', label: 'Major State Projects Tracking' },
          { id: 'performance', label: 'Department SLA League Table' },
          { id: 'datasets', label: 'Open Data Repositories' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Major Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {capitalProjects.map((proj, i) => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{proj.dept}</span>
                  <h4 className="font-bold text-base text-slate-900">{proj.title}</h4>
                  <div className="text-xs text-slate-600">Total Sanctioned Outlay: <strong className="text-slate-900">{proj.budget}</strong></div>
                </div>

                <div className="w-full md:w-64 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600">Physical Milestone</span>
                    <span className="font-bold text-emerald-700">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold inline-block">
                    {proj.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Budgets & Expenditures */}
      {activeTab === 'budgets' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
          <h3 className="font-bold text-base text-slate-900">Tamil Nadu State Sector Allocations (2025-26)</h3>
          <p className="text-xs text-slate-600">Audited public budget expenditures published under the Open State Fiscal Framework:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              { sector: 'School & Higher Education', alloc: '₹ 44,042 Cr', share: '17.2%' },
              { sector: 'Health & Family Welfare', alloc: '₹ 20,181 Cr', share: '7.9%' },
              { sector: 'Agriculture & Allied Sectors', alloc: '₹ 42,281 Cr', share: '16.5%' },
              { sector: 'Social Welfare & Women', alloc: '₹ 18,940 Cr', share: '7.4%' }
            ].map((sec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs text-slate-500 font-medium block">{sec.sector}</span>
                <span className="text-xl font-extrabold text-slate-900 block">{sec.alloc}</span>
                <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">
                  {sec.share} of Total Budget
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Performance League Table */}
      {activeTab === 'performance' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-x-auto animate-in fade-in">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Department Name</th>
                <th className="py-3 px-6">Applications Processed</th>
                <th className="py-3 px-6">SLA Compliance Rate</th>
                <th className="py-3 px-6">Average Processing Time</th>
                <th className="py-3 px-6">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {departmentPerformance.map((dept, i) => (
                <tr key={i} className="hover:bg-purple-50/30">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{dept.dept}</td>
                  <td className="py-3.5 px-6 font-medium">{dept.volume}</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700">{dept.slaCompliance}</td>
                  <td className="py-3.5 px-6">{dept.avgDays} Days</td>
                  <td className="py-3.5 px-6">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                      #{i + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Open Datasets */}
      {activeTab === 'datasets' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {publicDatasets.map((data, i) => (
              <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {data.format}
                    </span>
                    <span className="text-xs text-slate-400">• {data.size}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{data.name}</h4>
                  <p className="text-xs text-slate-500">Records count: {data.records}</p>
                </div>

                <button
                  onClick={() => alert(`Initiating export for dataset: ${data.name}`)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-700 hover:text-white text-purple-700 rounded-xl text-xs font-semibold transition-all border border-purple-200 flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Open Data</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
