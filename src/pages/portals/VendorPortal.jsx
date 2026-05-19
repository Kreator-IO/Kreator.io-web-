import React, { useEffect, useState } from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Truck, Package, FileText, DollarSign, 
  Search, Filter, Plus, ChevronRight, 
  MoreHorizontal, MapPin, Clock, CheckCircle2,
  AlertCircle, Building2
} from 'lucide-react';
import axios from 'axios';

const VendorPortal = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/purchase-orders')
      .then(response => setPurchaseOrders(response.data))
      .catch(error => console.error('Error fetching purchase orders:', error));
  }, []);

  return (
    <PortalLayout title="Vendor Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Top Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                <Building2 size={24} />
              </div>
              <button className="text-slate-500 hover:text-white"><Plus size={20} /></button>
            </div>
            <p className="text-slate-400 text-sm font-medium">Active Vendors</p>
            <h3 className="text-3xl font-black text-white mt-1">42</h3>
          </div>
          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-purple-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white">
                <Package size={24} />
              </div>
              <span className="text-[10px] font-black bg-purple-500/10 text-purple-400 px-2 py-1 rounded">12 New</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Open Orders</p>
            <h3 className="text-3xl font-black text-white mt-1">156</h3>
          </div>
          <div className="glass-dark p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-600/10 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <DollarSign size={24} />
              </div>
              <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">-5.2%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Monthly Spend</p>
            <h3 className="text-3xl font-black text-white mt-1">$124,500</h3>
          </div>
        </div>

        {/* Purchase Orders List */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-xl font-bold text-white">Purchase Orders</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search POs..." 
                  className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none"
                />
              </div>
              <button className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all"><Filter size={18} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">PO ID</th>
                  <th className="px-8 py-4">Vendor & Item</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Total Amount</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-slate-500">{po.id}</span>
                      <p className="text-[10px] text-slate-600 mt-0.5">{po.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{po.vendor}</p>
                        <p className="text-[10px] text-slate-500">{po.item}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        po.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' :
                        po.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' :
                        po.status === 'Pending' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${
                          po.status === 'Delivered' ? 'bg-emerald-400' :
                          po.status === 'In Transit' ? 'bg-blue-400' :
                          po.status === 'Pending' ? 'bg-orange-400' :
                          'bg-rose-400'
                        }`}></div>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-white">{po.total}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tracking */}
          <div className="glass-dark rounded-3xl p-8 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Truck size={20} className="text-blue-400" /> Active Shipments
            </h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-blue-500/30 ml-2">
                <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900 shadow-lg shadow-blue-500/20"></div>
                <div>
                  <p className="text-sm font-bold text-white">Out for Delivery</p>
                  <p className="text-[10px] text-slate-500">TechSupply Co. • PO-9401</p>
                  <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">Expected today</p>
                </div>
              </div>
              <div className="relative pl-8 border-l-2 border-slate-800 ml-2">
                <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                <div>
                  <p className="text-sm font-bold text-slate-400">Shipped from Warehouse</p>
                  <p className="text-xs text-slate-600">Global Office • PO-9402</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Bills */}
          <div className="glass-dark rounded-3xl p-8 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-400" /> Unpaid Bills
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">Cloud Services Inc</p>
                  <p className="text-[10px] text-slate-500">Due in 4 days • $12,400</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-xl transition-all shadow-lg shadow-blue-600/20">Pay Now</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">Stationery Hub</p>
                  <p className="text-[10px] text-slate-500">Due in 12 days • $450</p>
                </div>
                <button className="px-4 py-2 bg-slate-700 text-slate-400 text-[10px] font-black uppercase rounded-xl">Scheduled</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default VendorPortal;
