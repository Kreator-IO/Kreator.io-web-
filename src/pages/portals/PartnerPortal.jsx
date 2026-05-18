import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { Share2, Globe, DollarSign, TrendingUp } from 'lucide-react';

const PartnerPortal = () => {
  return (
    <PortalLayout title="Partner Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Active Partners', value: '27', icon: <Share2 className="text-blue-500" /> },
            { label: 'Revenue Share', value: '15%', icon: <DollarSign className="text-green-500" /> },
            { label: 'Growth', value: '+8.3%', icon: <TrendingUp className="text-purple-500" /> },
            { label: 'Regions', value: '5', icon: <Globe className="text-amber-500" /> },
          ].map((card, i) => (
            <div key={i} className="glass-dark rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-lg bg-slate-800/30 text-white">{card.value}</span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{card.label}</p>
            </div>
          ))}
        </div>
        {/* Placeholder List */}
        <div className="glass-dark rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Partner List</h3>
          <p className="text-slate-400">Details about each partner will be displayed here.</p>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PartnerPortal;
