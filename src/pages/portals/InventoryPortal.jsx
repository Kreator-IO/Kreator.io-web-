import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { Box, List, CheckCircle, XCircle, Search, Filter, Plus, Truck, Clock, ChevronRight } from 'lucide-react';

const inventoryItems = [
  { id: 1, name: 'Laptop Model X', qty: 24, status: 'In Stock' },
  { id: 2, name: 'Office Chair', qty: 12, status: 'Low Stock' },
  { id: 3, name: 'Projector', qty: 3, status: 'Out of Stock' },
  { id: 4, name: 'HDMI Cable', qty: 58, status: 'In Stock' },
];

const InventoryPortal = () => {
  return (
    <PortalLayout title="Inventory Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Items</p>
            <h3 className="text-3xl font-black text-white">87</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Low Stock</p>
            <h3 className="text-3xl font-black text-amber-400">5</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Out of Stock</p>
            <h3 className="text-3xl font-black text-red-400">2</h3>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Current Inventory</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
                <Plus size={14} /> Add Item
              </button>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search inventory..." className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="px-8 py-4">Item</th>
                  <th className="px-8 py-4">Quantity</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {inventoryItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-white">{item.qty}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 text-xs font-black uppercase rounded ${item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400' : item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-white"><MoreHorizontal size={16} /></button>
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

export default InventoryPortal;
