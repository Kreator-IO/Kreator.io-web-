import { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { UserContext } from '../../../context/UserContext';

export default function LeadForm({ lead, onClose, onSave }) {
  const { authFetch } = useContext(UserContext);
  const [form, setForm] = useState(lead || {
    name: '', email: '', phone: '', company: '', 
    status: 'New', source: 'Website', value: 0, priority: 'Warm'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = lead ? `/leads/${lead._id}` : '/leads';
      const method = lead ? 'PUT' : 'POST';
      
      const response = await authFetch(path, {
        method,
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      if (response.ok) {
        onSave(data.data);
      } else {
        alert(data.error || 'Failed to save lead');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Full Name</label>
              <input type="text" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Email</label>
              <input type="email" required value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Phone</label>
              <input type="text" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Company</label>
              <input type="text" value={form.company} onChange={e=>setForm({...form, company: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Status</label>
              <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Priority</label>
              <select value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="Cold">Cold</option>
                <option value="Warm">Warm</option>
                <option value="Hot">Hot</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Source</label>
              <select value={form.source} onChange={e=>setForm({...form, source: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Direct">Direct</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Deal Value ($)</label>
              <input type="number" value={form.value} onChange={e=>setForm({...form, value: Number(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
