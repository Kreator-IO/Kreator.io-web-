import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Users, UserPlus, ClipboardList, Wallet, 
  Calendar, CheckCircle2, XCircle, Search,
  Filter, Plus, MoreHorizontal, Briefcase,
  TrendingUp, Clock
} from 'lucide-react';

const employeeStats = [
  { label: 'Total Employees', value: '148', change: '+12', icon: <Users size={20} />, color: 'blue' },
  { label: 'Open Positions', value: '24', change: '+3', icon: <Briefcase size={20} />, color: 'purple' },
  { label: 'Monthly Payroll', value: '$842k', change: '+5.4%', icon: <Wallet size={20} />, color: 'emerald' },
  { label: 'Avg. Retention', value: '94%', change: '+1.2%', icon: <TrendingUp size={20} />, color: 'rose' },
];

const leaveRequests = [
  { id: 1, name: 'Alice Freeman', type: 'Sick Leave', duration: '2 days', status: 'Pending', date: 'Today' },
  { id: 2, name: 'Robert Fox', type: 'Annual Leave', duration: '5 days', status: 'Approved', date: 'Yesterday' },
  { id: 3, name: 'Jane Cooper', type: 'Maternity', duration: '3 months', status: 'Pending', date: '2 days ago' },
];

const HRPortal = () => {
  return (
    <PortalLayout title="HR Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeStats.map((stat, i) => (
            <div key={i} className="glass-dark p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-slate-500">{stat.change}</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee Directory Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden shadow-2xl shadow-blue-900/10">
              <div className="p-8 border-b border-slate-800 bg-slate-800/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h3 className="text-xl font-bold text-white">Employee Directory</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search employees..." 
                        className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
                      <UserPlus size={16} /> Add New
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="px-8 py-4">Employee</th>
                      <th className="px-8 py-4">Department</th>
                      <th className="px-8 py-4">Performance</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[1, 2, 3, 4].map((emp) => (
                      <tr key={emp} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-600"></div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Employee Name {emp}</p>
                              <p className="text-[10px] text-slate-500">Joined Jan 202{emp}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">Engineering</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[85%]"></div>
                            </div>
                            <span className="text-[10px] font-black text-white">4.8</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Leave Requests & Approval */}
          <div className="space-y-8">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={18} className="text-orange-400" />
                Pending Approvals
              </h3>
              <div className="space-y-4">
                {leaveRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-bold text-white">{req.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">{req.type} • {req.duration}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    {req.status === 'Pending' && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-grow flex items-center justify-center gap-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button className="flex-grow flex items-center justify-center gap-1 py-2 bg-slate-700 hover:bg-red-600 text-white text-[10px] font-black uppercase rounded-xl transition-all">
                          <XCircle size={14} /> Deny
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-8 border border-slate-800 bg-gradient-to-br from-purple-600/10 to-transparent">
              <h3 className="text-lg font-bold text-white mb-2">Hiring Pulse</h3>
              <p className="text-slate-500 text-xs mb-6">Current recruitment performance</p>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Time to Hire</span>
                  <span className="text-white">18 Days</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default HRPortal;
