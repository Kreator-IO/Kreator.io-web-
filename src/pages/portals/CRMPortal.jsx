import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Target, TrendingUp, Users, 
  Phone, Mail, MapPin, Search, 
  Filter, Download, Plus, ChevronRight,
  MoreHorizontal
} from 'lucide-react';

const leads = [
  { id: 1, name: 'Robert Fox', company: 'Hedgehog Corp', status: 'New Lead', value: '$12,400', source: 'Website', date: '2h ago' },
  { id: 2, name: 'Jane Cooper', company: 'Global Solutions', status: 'Contacted', value: '$45,000', source: 'LinkedIn', date: '5h ago' },
  { id: 3, name: 'Cody Fisher', company: 'Initech', status: 'Qualified', value: '$8,200', source: 'Referral', date: '1d ago' },
  { id: 4, name: 'Esther Howard', company: 'Acme Co.', status: 'Negotiation', value: '$120,000', source: 'Direct', date: '2d ago' },
];

const CRMPortal = () => {
  return (
    <PortalLayout title="CRM Dashboard">
      <div className="space-y-8 animate-fade-in-up">
        {/* Sales Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Target size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-white">24.8%</h3>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[25%]"></div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Pipeline Value</p>
                <h3 className="text-2xl font-bold text-white">$842,500</h3>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[65%]"></div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Leads</p>
                <h3 className="text-2xl font-bold text-white">1,284</h3>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[45%]"></div>
            </div>
          </div>
        </div>

        {/* Lead Management Section */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 bg-slate-800/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-xl font-bold text-white">Lead Management</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search leads..." 
                    className="bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none w-64"
                  />
                </div>
                <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-700">
                  <Filter size={18} />
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                  <Plus size={18} />
                  Add Lead
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-8 py-4 font-bold">Contact</th>
                  <th className="px-8 py-4 font-bold">Company</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold">Deal Value</th>
                  <th className="px-8 py-4 font-bold">Source</th>
                  <th className="px-8 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{lead.name}</p>
                          <p className="text-xs text-slate-500">{lead.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-300">{lead.company}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'New Lead' ? 'bg-blue-500/10 text-blue-400' :
                        lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                        lead.status === 'Qualified' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${
                          lead.status === 'New Lead' ? 'bg-blue-400' :
                          lead.status === 'Contacted' ? 'bg-yellow-400' :
                          lead.status === 'Qualified' ? 'bg-emerald-400' :
                          'bg-purple-400'
                        }`}></div>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-white">{lead.value}</td>
                    <td className="px-8 py-6">
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{lead.source}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-500 hover:text-white">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default CRMPortal;
