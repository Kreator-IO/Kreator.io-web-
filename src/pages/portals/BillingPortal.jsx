import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  CreditCard, Shield, Zap, CheckCircle2, 
  History, Download, AlertCircle, RefreshCw,
  Plus, MoreHorizontal, ExternalLink
} from 'lucide-react';

const plans = [
  { name: 'Professional', price: '$49', period: '/mo', features: ['Up to 10 users', '50GB Storage', 'Advanced Analytics', 'Priority Support'], current: true },
  { name: 'Enterprise', price: '$199', period: '/mo', features: ['Unlimited users', '500GB Storage', 'Custom Integration', '24/7 Dedicated Support'], current: false },
];

const invoices = [
  { id: 'INV-2024-001', date: 'May 01, 2024', amount: '$49.00', status: 'Paid' },
  { id: 'INV-2024-002', date: 'Apr 01, 2024', amount: '$49.00', status: 'Paid' },
  { id: 'INV-2024-003', date: 'Mar 01, 2024', amount: '$49.00', status: 'Paid' },
];

const BillingPortal = () => {
  return (
    <PortalLayout title="Billing & Subscriptions">
      <div className="space-y-8 animate-fade-in-up">
        {/* Active Subscription Summary */}
        <div className="glass-dark rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Zap size={32} />
            </div>
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Current Plan</p>
              <h2 className="text-3xl font-black text-white">Professional Monthly</h2>
              <p className="text-slate-400 text-sm mt-1">Next renewal on June 01, 2024 • <span className="text-white font-bold">$49.00</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all">
              Manage Plan
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20">
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-dark rounded-3xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Payment Method</h3>
                <button className="text-blue-400 hover:text-blue-300"><Plus size={18} /></button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 relative group overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <CreditCard size={24} className="text-slate-500" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest italic">VISA</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-1 tracking-widest">•••• •••• •••• 4242</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Expires</p>
                      <p className="text-white text-xs font-bold">12/26</p>
                    </div>
                    <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors">Edit</button>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl"></div>
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Billing Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">billing@acme.com</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Primary Email</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all">
                  Update Info
                </button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <History size={18} className="text-blue-500" />
                  Billing History
                </h3>
                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-widest">
                  View All <ExternalLink size={12} />
                </button>
              </div>
              <div className="divide-y divide-slate-800">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                        <Download size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{inv.id}</h4>
                        <p className="text-xs text-slate-500">{inv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <p className="text-sm font-black text-white">{inv.amount}</p>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        {inv.status}
                      </span>
                      <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-slate-900/50 flex items-center justify-center border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <AlertCircle size={14} />
                  Need help with an invoice? <button className="text-blue-400 hover:underline">Contact Billing</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default BillingPortal;
