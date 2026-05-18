import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalLayout from '../../../components/PortalLayout';
import { 
  CheckSquare, Calendar, CreditCard, Bell, 
  Clock, Coffee, Briefcase, ChevronRight, Users, Shield
} from 'lucide-react';

const tasks = [
  { id: 1, title: 'Complete API Documentation', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Fix bug in login flow', priority: 'Medium', status: 'Pending' },
  { id: 3, title: 'Team meeting at 2 PM', priority: 'Low', status: 'Scheduled' },
];

const EmployeePortal = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in-up">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Profile Summary */}
              <div className="lg:col-span-1 glass-dark rounded-3xl p-8 border border-slate-800 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl shadow-blue-600/20">
                  AJ
                </div>
                <h3 className="text-2xl font-bold text-white">Alex Johnson</h3>
                <p className="text-slate-400">Senior Frontend Developer</p>
                <div className="mt-6 w-full grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-2xl p-4">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Attendance</p>
                    <p className="text-lg font-bold text-white">98%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Leaves</p>
                    <p className="text-lg font-bold text-white">12/24</p>
                  </div>
                </div>
              </div>

              {/* Clock In/Out */}
              <div className="lg:col-span-2 glass-dark rounded-3xl p-8 border border-slate-800 relative overflow-hidden flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Morning, Alex!</h3>
                  <p className="text-slate-400 mb-6">You clocked in at 09:05 AM today.</p>
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold rounded-2xl border border-red-500/30 transition-all flex items-center gap-2">
                      <Clock size={18} />
                      Clock Out
                    </button>
                    <button className="px-8 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-bold rounded-2xl border border-blue-500/30 transition-all flex items-center gap-2">
                      <Coffee size={18} />
                      Take a Break
                    </button>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-5xl font-black text-white/10 select-none">14:35</p>
                  <p className="text-slate-500 font-medium">May 07, 2024</p>
                </div>
              </div>
            </div>

            {/* Tasks & Salary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tasks List */}
              <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckSquare size={20} className="text-blue-500" />
                    Current Tasks
                  </h3>
                  <button className="text-sm text-blue-400 font-medium">View Board</button>
                </div>
                <div className="p-6 space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 group hover:border-blue-500/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{task.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-500">{task.status}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary & Benefits Info */}
              <div className="space-y-6">
                <div className="glass-dark rounded-3xl p-6 border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard size={20} className="text-green-500" />
                    Latest Payslip
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">April 2024</p>
                      <p className="text-xl font-bold text-white">$6,450.00</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all">
                      Download PDF
                    </button>
                  </div>
                  <div className="mt-6 flex justify-between text-sm">
                    <span className="text-slate-400">Next Pay Date</span>
                    <span className="text-white font-medium">May 31, 2024</span>
                  </div>
                </div>

                {/* Notifications / Announcements */}
                <div className="glass-dark rounded-3xl p-6 border border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-yellow-500" />
                    Announcements
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                      <p className="text-xs font-bold text-yellow-500 mb-1">COMPANY-WIDE</p>
                      <p className="text-sm text-slate-300">Annual office retreat scheduled for June 15-17. Check email for details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'hr':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={24} className="text-blue-500" />
                HR Portal
              </h3>
              <p className="text-slate-400 mb-6">Open the full HR portal for overview and documents.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/portals/hr" className="group p-6 glass-dark rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all">
                  <div className="text-blue-500 mb-3 text-2xl">📄</div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-blue-400">Open HR Portal</h4>
                  <p className="text-slate-500 text-sm">Go to HR overview, documents and approvals</p>
                </Link>
                <Link to="/portals/marketing" className="group p-6 glass-dark rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all">
                  <div className="text-purple-500 mb-3 text-2xl">📢</div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-purple-400">Marketing</h4>
                  <p className="text-slate-500 text-sm">Access marketing materials and campaigns</p>
                </Link>
              </div>
            </div>
          </div>
        );
      
      case 'it':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield size={24} className="text-cyan-500" />
                IT Employee Portal
              </h3>
              <p className="text-slate-400 mb-6">Access IT security and technical resources</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/portals/security" className="group p-6 glass-dark rounded-2xl border border-slate-800 hover:border-red-500/50 transition-all">
                  <div className="text-red-500 mb-3 text-2xl">🔒</div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-red-400">Security Portal</h4>
                  <p className="text-slate-500 text-sm">Manage security policies and access controls</p>
                </Link>
                <Link to="/portals/learning" className="group p-6 glass-dark rounded-2xl border border-slate-800 hover:border-green-500/50 transition-all">
                  <div className="text-green-500 mb-3 text-2xl">📚</div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-green-400">Learning Portal</h4>
                  <p className="text-slate-500 text-sm">Access technical training and resources</p>
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PortalLayout title="Employee Portal">
      {/* Tab Navigation */}
      <div className="mb-8 flex gap-4 border-b border-slate-800 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('hr')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'hr'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users size={18} /> HR Portal
        </button>
        <button
          onClick={() => setActiveTab('it')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'it'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield size={18} /> IT Employee Portal
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </PortalLayout>
  );
};

export default EmployeePortal;
