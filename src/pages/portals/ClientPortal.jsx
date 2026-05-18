import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  FileText, Clock, CheckCircle, AlertCircle, 
  Download, MessageSquare, ExternalLink, CreditCard
} from 'lucide-react';

const projects = [
  { id: 1, name: 'Brand Redesign', status: 'In Progress', progress: 65, deadline: 'May 24, 2024', color: 'blue' },
  { id: 2, name: 'E-commerce Platform', status: 'Review', progress: 90, deadline: 'June 02, 2024', color: 'purple' },
  { id: 3, name: 'Mobile App Development', status: 'On Hold', progress: 25, deadline: 'July 15, 2024', color: 'orange' },
];

const ClientPortal = () => {
  return (
    <PortalLayout title="Client Portal">
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div className="glass-dark rounded-3xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Acme Corp!</h2>
            <p className="text-slate-400">You have 2 projects requiring your attention and 1 pending invoice.</p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                Contact Account Manager
              </button>
                  
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Project Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Active Projects</h3>
              <button className="text-sm text-blue-400 font-medium">View Archive</button>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-dark rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Clock size={12} />
                        Deadline: {project.deadline}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                      project.status === 'Review' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-white font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 bg-${project.color}-500`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                      <MessageSquare size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing & Files */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-dark p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center group cursor-pointer hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">Pay Invoice</h4>
                <p className="text-xs text-slate-500">$2,450.00 pending</p>
              </div>
              <div className="glass-dark p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center group cursor-pointer hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">Shared Files</h4>
                <p className="text-xs text-slate-500">12 new assets</p>
              </div>
            </div>

            {/* Recent Files */}
            <div className="glass-dark rounded-2xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Deliverables</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((file) => (
                  <div key={file} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Project_Specs_V{file}.pdf</p>
                        <p className="text-xs text-slate-500">2.4 MB • Added 2 days ago</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors">
                Open File Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default ClientPortal;
