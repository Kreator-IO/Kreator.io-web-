import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  LifeBuoy, MessageCircle, Clock, AlertTriangle, 
  Search, Filter, Plus, ChevronRight, User, 
  Send, Paperclip, MoreHorizontal
} from 'lucide-react';

const tickets = [
  { id: 'TKT-1024', subject: 'Unable to access dashboard', user: 'Jenny Wilson', status: 'Open', priority: 'High', date: '10m ago' },
  { id: 'TKT-1025', subject: 'Billing inquiry regarding Q1', user: 'Guy Hawkins', status: 'In Progress', priority: 'Medium', date: '1h ago' },
  { id: 'TKT-1026', subject: 'Feature request: Dark mode', user: 'Kristin Watson', status: 'Resolved', priority: 'Low', date: '5h ago' },
  { id: 'TKT-1027', subject: 'Login session timeout issue', user: 'Cameron Williamson', status: 'Open', priority: 'Urgent', date: '30m ago' },
];

const SupportPortal = () => {
  return (
    <PortalLayout title="Support Center">
      <div className="space-y-8 animate-fade-in-up">
        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm font-medium mb-1">Open Tickets</p>
            <h3 className="text-2xl font-bold text-white">42</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm font-medium mb-1">Avg. Response</p>
            <h3 className="text-2xl font-bold text-blue-400">14m</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm font-medium mb-1">Resolved Today</p>
            <h3 className="text-2xl font-bold text-emerald-400">128</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm font-medium mb-1">Customer CSAT</p>
            <h3 className="text-2xl font-bold text-yellow-400">4.9/5</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-white">Active Tickets</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded">OPEN</span>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] font-bold rounded">ALL</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
                  <Plus size={14} /> New Ticket
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-6 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          ticket.priority === 'Urgent' ? 'bg-red-500/10 text-red-400' :
                          ticket.priority === 'High' ? 'bg-orange-500/10 text-orange-400' :
                          'bg-slate-800 text-slate-500'
                        }`}>
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-slate-500 tracking-wider">{ticket.id}</span>
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{ticket.subject}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><User size={12} /> {ticket.user}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {ticket.date}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>{ticket.status}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-700 group-hover:text-white transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-slate-900/50 text-slate-500 hover:text-white text-sm font-bold transition-all border-t border-slate-800">
                View All Tickets
              </button>
            </div>
          </div>

          {/* Live Chat & Support Info */}
          <div className="space-y-8">
            <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden flex flex-col h-[500px]">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">ST</div>
                    <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Support Team</h4>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18} /></button>
              </div>

              <div className="flex-grow p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className="p-3 bg-slate-800 rounded-2xl rounded-tl-none text-sm text-slate-300">
                    Hi Alex! How can I help you with the system today?
                  </div>
                  <span className="text-[10px] text-slate-500 px-1">09:41 AM</span>
                </div>
                <div className="flex flex-col gap-1 max-w-[80%] self-end items-end">
                  <div className="p-3 bg-blue-600 rounded-2xl rounded-tr-none text-sm text-white font-medium">
                    Hey! I'm having trouble with the recruitment API endpoint.
                  </div>
                  <span className="text-[10px] text-slate-500 px-1">09:43 AM</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2 focus-within:border-blue-500 transition-all">
                  <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="bg-transparent border-none outline-none text-sm text-white flex-grow"
                  />
                  <button className="text-slate-500 hover:text-blue-400"><Paperclip size={18} /></button>
                  <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"><Send size={16} /></button>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Internal Knowledge</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl hover:bg-slate-800 text-sm text-slate-400 hover:text-white transition-all flex items-center justify-between group">
                  Troubleshooting Guide <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-slate-800 text-sm text-slate-400 hover:text-white transition-all flex items-center justify-between group">
                  API Documentation <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default SupportPortal;
