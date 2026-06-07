import React, { useContext, useEffect, useState } from 'react';
import PortalLayout from '../../components/PortalLayout';
import { UserContext } from '../../context/UserContext';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';

const formatDateTime = (value) => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
}).format(new Date(value));

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

const CommunicationPortal = () => {
  const { authFetch } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [conversations, setConversations] = useState([]);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waRes, callsRes] = await Promise.all([
          authFetch('/communications/whatsapp'),
          authFetch('/communications/calls')
        ]);
        
        if (waRes.ok) setConversations((await waRes.json()).data);
        if (callsRes.ok) setCalls((await callsRes.json()).data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authFetch]);

  return (
    <PortalLayout title="Omnichannel Communication">
      <div className="flex gap-6 animate-fade-in-up h-[75vh]">
        
        {/* Sidebar */}
        <div className="w-64 glass-dark rounded-3xl border border-slate-800 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'whatsapp' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <MessageCircle size={20} />
            <span className="font-bold">WhatsApp AI</span>
          </button>
          <button 
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'voice' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Phone size={20} />
            <span className="font-bold">Voice Call Logs</span>
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'email' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Mail size={20} />
            <span className="font-bold">Email Sequences</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-dark rounded-3xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab} Hub</h2>
            {activeTab === 'voice' && (
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <Phone size={16} /> Init AI Call
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {loading ? (
              <div className="text-center text-slate-500 mt-10">Loading communications...</div>
            ) : activeTab === 'whatsapp' ? (
              <div className="space-y-4">
                {conversations.length > 0 ? conversations.map((conv, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-white">Session: {conv.sessionId}</p>
                      <span className="text-xs text-slate-500">{fromNow(conv.updatedAt)}</span>
                    </div>
                    <p className="text-sm text-slate-400">{conv.messages.length} messages exchanged.</p>
                  </div>
                )) : <div className="text-center text-slate-500 mt-10">No WhatsApp conversations yet.</div>}
              </div>
            ) : activeTab === 'voice' ? (
              <div className="space-y-4">
                {calls.length > 0 ? calls.map((call, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{call.to}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {formatDateTime(call.startTime)} - {Math.round(call.duration / 60)} mins
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">{call.status}</span>
                  </div>
                )) : <div className="text-center text-slate-500 mt-10">No voice calls logged.</div>}
              </div>
            ) : (
              <div className="text-center text-slate-500 mt-10">Email sequences integration pending.</div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default CommunicationPortal;
