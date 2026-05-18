import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { Monitor, Cpu, Activity, Clock, Play, Pause, RefreshCcw, Search, Filter, Plus } from 'lucide-react';

const metrics = [
  { label: 'CPU Usage', value: '45%', change: '+3%', trend: 'up', icon: <Cpu size={20} className="text-blue-500" /> },
  { label: 'Memory Usage', value: '68%', change: '-2%', trend: 'down', icon: <Activity size={20} className="text-purple-500" /> },
  { label: 'Disk I/O', value: '120 MB/s', change: '+12%', trend: 'up', icon: <RefreshCcw size={20} className="text-emerald-500" /> },
  { label: 'Uptime', value: '99.97%', change: '+0.01%', trend: 'up', icon: <Clock size={20} className="text-amber-500" /> },
];

const SystemMonitorPortal = () => {
  return (
    <PortalLayout title="System Monitor">
      <div className="space-y-8 animate-fade-in-up">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m,i)=>(
            <div key={i} className="glass-dark p-6 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">{m.icon}</div>
                <span className={`text-xs font-black uppercase px-2 py-1 rounded ${m.trend==='up'?'bg-emerald-500/10 text-emerald-400':'bg-rose-500/10 text-rose-400'}`}>
                  {m.change}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{m.label}</p>
              <h3 className="text-2xl font-black text-white mt-1">{m.value}</h3>
            </div>
          ))}
        </div>

        {/* Process List */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Running Processes</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"><Plus size={14} /> Add Process</button>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search processes..." className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="px-8 py-4">PID</th>
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">CPU</th>
                  <th className="px-8 py-4">Memory</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[{pid:101, name:'node', cpu:'12%', mem:'256MB', status:'Running'},{pid:102, name:'nginx', cpu:'5%', mem:'128MB', status:'Running'},{pid:103, name:'mongo', cpu:'8%', mem:'512MB', status:'Running'}].map(p=> (
                  <tr key={p.pid} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5"><span className="text-sm font-medium text-white">{p.pid}</span></td>
                    <td className="px-8 py-5"><span className="text-sm text-slate-300">{p.name}</span></td>
                    <td className="px-8 py-5"><span className="text-sm text-slate-400">{p.cpu}</span></td>
                    <td className="px-8 py-5"><span className="text-sm text-slate-400">{p.mem}</span></td>
                    <td className="px-8 py-5"><span className="px-2 py-1 text-xs font-black uppercase rounded bg-green-500/10 text-green-400">{p.status}</span></td>
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

export default SystemMonitorPortal;
