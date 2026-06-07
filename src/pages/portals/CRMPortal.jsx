import React, { useCallback, useContext, useEffect, useState } from 'react';
import PortalLayout from '../../components/PortalLayout';
import { UserContext } from '../../context/UserContext';
import { 
  Target, TrendingUp, Users, 
  Search, Filter, Plus, LayoutGrid, List
} from 'lucide-react';
import Pipeline from './CRM/Pipeline';
import LeadForm from './CRM/LeadForm';
import LeadDetail from './CRM/LeadDetail';

const CRMPortal = () => {
  const { authFetch } = useContext(UserContext);
  const [view, setView] = useState('list'); // 'list' | 'pipeline'
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalLeads: 0, activeLeads: 0, pipelineValue: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const fetchLeads = useCallback(async () => {
    try {
      const [leadsRes, statsRes] = await Promise.all([
        authFetch('/leads'),
        authFetch('/leads/stats')
      ]);
      
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.data);
      }
      
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleLeadSaved = () => {
    setShowLeadForm(false);
    fetchLeads(); // Refresh list and stats
  };

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
                <h3 className="text-2xl font-bold text-white">{stats.conversionRate}%</h3>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${stats.conversionRate}%` }}></div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Pipeline Value</p>
                <h3 className="text-2xl font-bold text-white">${stats.pipelineValue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Leads</p>
                <h3 className="text-2xl font-bold text-white">{stats.activeLeads}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${view === 'list' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List size={16} /> List
            </button>
            <button 
              onClick={() => setView('pipeline')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${view === 'pipeline' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid size={16} /> Pipeline
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
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
            <button 
              onClick={() => setShowLeadForm(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              Add Lead
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading leads...</div>
        ) : view === 'pipeline' ? (
          <Pipeline onLeadClick={setSelectedLeadId} />
        ) : (
          <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-8 py-4 font-bold">Contact</th>
                    <th className="px-8 py-4 font-bold">Company</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold">Deal Value</th>
                    <th className="px-8 py-4 font-bold">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((lead) => (
                    <tr 
                      key={lead._id} 
                      onClick={() => setSelectedLeadId(lead._id)}
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{lead.name}</p>
                            <p className="text-xs text-slate-500">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm text-slate-300">{lead.company || '-'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                          lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                          lead.status === 'Qualified' ? 'bg-emerald-500/10 text-emerald-400' :
                          lead.status === 'Won' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${
                            lead.status === 'New' ? 'bg-blue-400' :
                            lead.status === 'Contacted' ? 'bg-yellow-400' :
                            lead.status === 'Qualified' ? 'bg-emerald-400' :
                            lead.status === 'Won' ? 'bg-green-400' :
                            'bg-purple-400'
                          }`}></div>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-white">${lead.value?.toLocaleString() || 0}</td>
                      <td className="px-8 py-6">
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{lead.source}</span>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-10 text-center text-slate-500">No leads found. Add one to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showLeadForm && (
        <LeadForm onClose={() => setShowLeadForm(false)} onSave={handleLeadSaved} />
      )}

      {selectedLeadId && (
        <LeadDetail leadId={selectedLeadId} onClose={() => setSelectedLeadId(null)} />
      )}
    </PortalLayout>
  );
};

export default CRMPortal;
