import { useCallback, useContext, useEffect, useState } from 'react';
import { X, Phone, Mail, MapPin, Building, Calendar, DollarSign, Activity, FileText } from 'lucide-react';
import { UserContext } from '../../../context/UserContext';

const formatDate = (value, options) => new Intl.DateTimeFormat('en-US', options).format(new Date(value));

const fromNow = (value) => {
  const diffSeconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) {
      return rtf.format(-Math.round(diffSeconds / seconds), unit);
    }
  }
  return 'just now';
};

export default function LeadDetail({ leadId, onClose }) {
  const { authFetch } = useContext(UserContext);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');

  const fetchLead = useCallback(async () => {
    try {
      const response = await authFetch(`/leads/${leadId}`);
      const data = await response.json();
      if (response.ok) {
        setLead(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authFetch, leadId]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    try {
      const response = await authFetch(`/leads/${leadId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text: newNote })
      });
      
      if (response.ok) {
        setNewNote('');
        fetchLead();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col md:flex-row my-8">
        
        {/* Left Sidebar - Lead Info */}
        <div className="w-full md:w-1/3 border-r border-slate-800 p-6 bg-slate-800/20">
          <div className="flex items-start justify-between mb-6 md:hidden">
            <h2 className="text-xl font-bold text-white">Lead Details</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20}/></button>
          </div>
          
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-blue-500/20">
            {lead.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-white">{lead.name}</h2>
          <p className="text-slate-400">{lead.company || 'No Company'}</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail size={16} className="text-blue-400" />
              <span className="text-sm truncate">{lead.email}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={16} className="text-emerald-400" />
                <span className="text-sm">{lead.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-slate-300">
              <Building size={16} className="text-purple-400" />
              <span className="text-sm">{lead.source}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <DollarSign size={16} className="text-amber-400" />
              <span className="text-sm font-bold text-white">${lead.value?.toLocaleString() || 0}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                lead.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                lead.status === 'Qualified' ? 'bg-emerald-500/10 text-emerald-400' :
                lead.status === 'Won' ? 'bg-green-500/20 text-green-400' :
                lead.status === 'Lost' ? 'bg-red-500/10 text-red-400' :
                'bg-purple-500/10 text-purple-400'
              }`}>
              {lead.status}
            </span>
            <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                lead.priority === 'Hot' ? 'bg-red-500/10 text-red-400' :
                lead.priority === 'Warm' ? 'bg-orange-500/10 text-orange-400' :
                'bg-blue-500/10 text-blue-400'
              }`}>
              {lead.priority} Priority
            </span>
          </div>
          
          <div className="mt-8 text-xs text-slate-500">
            <p>Created: {formatDate(lead.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            {lead.assignedTo && <p>Assigned to: {lead.assignedTo.name}</p>}
          </div>
        </div>
        
        {/* Right Content Area - Activity & Notes */}
        <div className="w-full md:w-2/3 flex flex-col h-[600px]">
          <div className="hidden md:flex justify-end p-4">
            <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg transition"><X size={20}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            
            {/* Notes Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                Notes & Comments
              </h3>
              
              <div className="space-y-4 mb-4">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((note, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{note.text}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        By {note.createdBy?.name || 'System'} - {fromNow(note.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic">No notes yet.</p>
                )}
              </div>
              
              <form onSubmit={handleAddNote} className="relative">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 pr-20 text-white outline-none focus:border-blue-500 text-sm resize-none"
                  rows={2}
                ></textarea>
                <button 
                  type="submit" 
                  disabled={!newNote.trim()}
                  className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
                >
                  Save Note
                </button>
              </form>
            </div>
            
            {/* Activity Timeline */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-emerald-400" />
                Activity History
              </h3>
              
              <div className="relative border-l border-slate-700 ml-3 space-y-6">
                {lead.activities && lead.activities.slice().reverse().map((activity, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-slate-900 border-2 border-emerald-500 rounded-full -left-[6.5px] top-1"></div>
                    <p className="text-sm text-slate-300">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(activity.createdAt, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
