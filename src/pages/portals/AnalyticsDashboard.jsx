import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  BarChart2, TrendingUp, Users, Activity, 
  ArrowUpRight, ArrowDownRight, Globe, 
  Clock, Download, Calendar, Filter, 
  MousePointer2, Eye, ShoppingBag
} from 'lucide-react';

const kpis = [
  { label: 'Total Revenue', value: '$2.4M', change: '+14.5%', trend: 'up', icon: <TrendingUp size={20} />, color: 'blue' },
  { label: 'Active Users', value: '42.8k', change: '+8.2%', trend: 'up', icon: <Users size={20} />, color: 'purple' },
  { label: 'Conversion Rate', value: '3.24%', change: '-0.5%', trend: 'down', icon: <Activity size={20} />, color: 'emerald' },
  { label: 'Avg. Session', value: '12m 45s', change: '+2.1%', trend: 'up', icon: <Clock size={20} />, color: 'orange' },
];

const topProducts = [
  { name: 'SaaS Enterprise', sales: 482, revenue: '$142k', trend: 12 },
  { name: 'Mobile App Pro', sales: 324, revenue: '$64k', trend: 8 },
  { name: 'API Services', sales: 156, revenue: '$89k', trend: -2 },
];

const AnalyticsDashboard = () => {
  return (
    <PortalLayout title="Analytics Dashboard">
      <div className="space-y-8 animate-fade-in-up">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">Real-time</button>
            <button className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl hover:text-white transition-all">Overview</button>
            <button className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl hover:text-white transition-all">Acquisition</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3">
              <Calendar size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-white">May 01 - May 07, 2024</span>
            </div>
            <button className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all"><Download size={18} /></button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="glass-dark p-6 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${kpi.color}-500/10 text-${kpi.color}-500 flex items-center justify-center`}>
                  {kpi.icon}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-lg ${
                  kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{kpi.label}</p>
              <h3 className="text-2xl font-black text-white mt-1">{kpi.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-dark p-8 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">User Growth</h3>
                <p className="text-slate-500 text-xs">Total users over time</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-800 rounded text-[10px] font-black text-white">Week</button>
                <button className="px-3 py-1 text-[10px] font-black text-slate-600">Month</button>
              </div>
            </div>
            <div className="h-64 flex items-end gap-1 px-2">
              {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100, 95, 110, 105, 120, 115, 130, 125, 140, 135, 150].map((h, i) => (
                <div key={i} className="flex-grow bg-gradient-to-t from-blue-600/10 to-blue-500 rounded-t-sm" style={{ height: `${h / 1.5}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
              <span>Monday</span><span>Wednesday</span><span>Friday</span><span>Sunday</span>
            </div>
          </div>

          <div className="glass-dark p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2">Sessions by Device</h3>
            <p className="text-slate-500 text-xs mb-8">Distribution by platform</p>
            <div className="space-y-6">
              {[
                { label: 'Mobile', value: '54%', color: 'blue' },
                { label: 'Desktop', value: '38%', color: 'purple' },
                { label: 'Tablet', value: '8%', color: 'emerald' },
              ].map((device, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold">{device.label}</span>
                    <span className="text-white font-black">{device.value}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-${device.color}-500 rounded-full`} style={{ width: device.value }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-center">
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Top Region</p>
              <h4 className="text-white font-bold flex items-center justify-center gap-2">
                <Globe size={16} /> North America
              </h4>
            </div>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
            <h3 className="text-xl font-bold text-white">Top Performing Products</h3>
            <button className="text-blue-400 text-sm font-bold">View Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Product Name</th>
                  <th className="px-8 py-4">Sales</th>
                  <th className="px-8 py-4">Revenue</th>
                  <th className="px-8 py-4">Conversion</th>
                  <th className="px-8 py-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                          <ShoppingBag size={16} className="text-blue-500" />
                        </div>
                        <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-400">{p.sales}</td>
                    <td className="px-8 py-5 text-sm font-bold text-white">{p.revenue}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[65%]"></div>
                        </div>
                        <span className="text-[10px] text-slate-500">2.4%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`text-[10px] font-black px-2 py-1 rounded ${p.trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {p.trend > 0 ? '+' : ''}{p.trend}%
                      </span>
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

export default AnalyticsDashboard;
