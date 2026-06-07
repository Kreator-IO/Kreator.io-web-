import React, { useContext, useState, useEffect } from 'react';
import PortalLayout from '../../../components/PortalLayout';
import { Calendar, CreditCard, Folder, CheckCircle } from 'lucide-react';
import { UserContext } from '../../../context/UserContext';

const formatDate = (value, options) => new Intl.DateTimeFormat('en-US', options).format(new Date(value));

const ClientPortal = () => {
  const { authFetch } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [apptsRes, invRes] = await Promise.all([
          authFetch('/appointments'),
          authFetch('/billing/invoices')
        ]);

        if (apptsRes.ok) setAppointments((await apptsRes.json()).data);
        if (invRes.ok) setInvoices((await invRes.json()).data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [authFetch]);

  return (
    <PortalLayout title="Client Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
        
        {/* Active Projects */}
        <div className="glass-dark rounded-3xl border border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Folder className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Active Projects</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white">E-Commerce Platform Rebuild</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">In Progress</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-slate-400 text-right">65% Complete</p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="glass-dark rounded-3xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Upcoming Meetings</h2>
            </div>
            <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700">Book New</button>
          </div>
          
          <div className="space-y-4">
            {loading ? <p className="text-slate-500 text-sm">Loading...</p> : 
              appointments.length > 0 ? appointments.map(appt => (
                <div key={appt._id} className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="bg-slate-900 p-3 rounded-lg text-center min-w-[60px]">
                    <p className="text-xs text-slate-400 uppercase">{formatDate(appt.startTime, { month: 'short' })}</p>
                    <p className="text-lg font-bold text-white">{formatDate(appt.startTime, { day: '2-digit' })}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{appt.title}</h3>
                    <p className="text-sm text-slate-400">{formatDate(appt.startTime, { hour: 'numeric', minute: '2-digit' })} - {appt.type}</p>
                  </div>
                </div>
              )) : <p className="text-slate-500 text-sm">No upcoming meetings.</p>
            }
          </div>
        </div>

        {/* Billing Overview */}
        <div className="glass-dark rounded-3xl border border-slate-800 p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Recent Invoices</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs uppercase">
                  <th className="pb-4 font-bold">Invoice ID</th>
                  <th className="pb-4 font-bold">Date</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {invoices.map((inv, i) => (
                  <tr key={i}>
                    <td className="py-4 text-sm text-white font-bold">{inv.id}</td>
                    <td className="py-4 text-sm text-slate-400">{formatDate(inv.date, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-4 text-sm text-white">${inv.amount.toLocaleString()}</td>
                    <td className="py-4">
                      {inv.status === 'Paid' ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-max">
                          <CheckCircle size={12} /> Paid
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded w-max">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      {inv.status !== 'Paid' && (
                        <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition">Pay Now</button>
                      )}
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

export default ClientPortal;
