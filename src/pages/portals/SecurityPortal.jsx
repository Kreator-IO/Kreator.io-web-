import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { Shield, AlertCircle, Lock, CheckCircle, XCircle, Search, Filter, Plus } from 'lucide-react';

const securityIssues = [
  { id: 1, type: 'Brute Force Attack', severity: 'High', status: 'Pending', time: '2h ago' },
  { id: 2, type: 'Phishing Attempt', severity: 'Medium', status: 'Resolved', time: '5h ago' },
  { id: 3, type: 'Unauthorized Access', severity: 'Critical', status: 'Investigating', time: '1d ago' },
];

const SecurityPortal = () => {
  return (
    <PortalLayout title="Security Center">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Open Alerts</p>
            <h3 className="text-3xl font-black text-red-400">5</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Resolved Today</p>
            <h3 className="text-3xl font-black text-emerald-400">12</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Critical Issues</p>
            <h3 className="text-3xl font-black text-amber-400">2</h3>
          </div>
        </div>

        {/* Issue List */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Security Alerts</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
                <Plus size={14} /> New Alert
              </button>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search alerts..." className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="px-8 py-4">Type</th>
                  <th className="px-8 py-4">Severity</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Time</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {securityIssues.map(issue => (
                  <tr key={issue.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-slate-400" />
                        <span className="text-sm font-medium text-white">{issue.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 text-xs font-black uppercase rounded ${issue.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400' : issue.severity === 'High' ? 'bg-red-500/10 text-red-400' : issue.severity === 'Medium' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>{issue.severity}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 text-xs font-black uppercase rounded ${issue.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : issue.status === 'Investigating' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>{issue.status}</span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-400">{issue.time}</td>
                    <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-white"><CheckCircle size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-400"><XCircle size={16} /></button>
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

export default SecurityPortal;
