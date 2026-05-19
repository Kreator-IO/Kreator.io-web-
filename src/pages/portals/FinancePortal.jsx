import React, { useEffect, useState } from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  DollarSign, TrendingUp, TrendingDown, 
  PieChart, Download, Plus, Filter,
  ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';
import axios from 'axios';

const FinancePortal = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <PortalLayout title="Financial Dashboard">
      <div className="space-y-8 animate-fade-in-up">
        {/* Financial Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <DollarSign size={24} />
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                <TrendingUp size={12} /> +12.4%
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Total Balance</p>
            <h3 className="text-3xl font-black text-white mt-1">$284,500.00</h3>
          </div>

          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">Target: 95%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Monthly Revenue</p>
            <h3 className="text-3xl font-black text-white mt-1">$42,800.00</h3>
          </div>

          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-rose-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white">
                <ArrowDownRight size={24} />
              </div>
              <span className="text-xs font-bold text-rose-400 bg-rose-400/10 px-2 py-1 rounded-lg">-2.1%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Monthly Expenses</p>
            <h3 className="text-3xl font-black text-white mt-1">$12,450.00</h3>
          </div>
        </div>

        {/* Chart & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-dark rounded-3xl border border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-slate-800 text-xs font-bold text-white rounded-lg">Yearly</button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500">Monthly</button>
              </div>
            </div>
            <div className="h-64 flex items-end gap-4">
              {[40, 65, 45, 90, 75, 55, 80, 45, 95, 60, 85, 70].map((h, i) => (
                <div key={i} className="flex-grow bg-blue-600/20 rounded-t-lg relative group cursor-pointer hover:bg-blue-600/40 transition-all" style={{ height: `${h}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ${h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>

          <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
              <button className="p-2 text-slate-500 hover:text-white transition-all">
                <Filter size={18} />
              </button>
            </div>
            <div className="divide-y divide-slate-800">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-6 hover:bg-slate-800/30 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {tx.type === 'Income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{tx.category}</h4>
                        <p className="text-xs text-slate-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${tx.type === 'Income' ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.type === 'Income' ? '+' : '-'}{tx.amount}
                      </p>
                      <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">{tx.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-5 bg-slate-900/50 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default FinancePortal;
