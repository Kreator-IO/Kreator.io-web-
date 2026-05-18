import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Users, Briefcase, Activity, TrendingUp, 
  ArrowUp, ArrowDown, MoreHorizontal, UserCheck, 
  UserPlus, UserMinus, Shield
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '2,845', change: '+12.5%', icon: <Users className="text-blue-500" />, trend: 'up' },
  { label: 'Active Projects', value: '142', change: '+5.2%', icon: <Briefcase className="text-purple-500" />, trend: 'up' },
  { label: 'System Load', value: '24%', change: '-2.1%', icon: <Activity className="text-green-500" />, trend: 'down' },
  { label: 'Monthly Revenue', value: '$84,200', change: '+18.4%', icon: <TrendingUp className="text-emerald-500" />, trend: 'up' },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Created new project', time: '2 mins ago', icon: <UserPlus className="text-blue-400" /> },
  { id: 2, user: 'Sarah Smith', action: 'Updated permissions', time: '15 mins ago', icon: <Shield className="text-purple-400" /> },
  { id: 3, user: 'System', action: 'Automatic backup completed', time: '1 hour ago', icon: <Activity className="text-green-400" /> },
  { id: 4, user: 'Mike Ross', action: 'Deleted inactive user', time: '3 hours ago', icon: <UserMinus className="text-red-400" /> },
];

const AdminPortal = () => {
  return (
    <PortalLayout title="Admin Dashboard">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-dark rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - User Management Table Placeholder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-dark rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent Users</h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                              U{item}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">User Name {item}</p>
                              <p className="text-xs text-slate-500">user{item}@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">Editor</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-white transition-colors">
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

          {/* Activity Feed */}
          <div className="space-y-6">
            <div className="glass-dark rounded-2xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-white">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors">
                View Full Logs
              </button>
            </div>

            <div className="glass-dark rounded-2xl border border-slate-800 p-6 bg-gradient-to-br from-blue-600/10 to-indigo-600/10">
              <h3 className="text-lg font-semibold text-white mb-2">System Health</h3>
              <p className="text-slate-400 text-sm mb-6">All systems are operational.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400">Server Response Time</span>
                  <span className="text-xs font-bold text-blue-400">124ms</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AdminPortal;
