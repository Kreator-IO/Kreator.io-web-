import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  MessageSquare, Video, Phone, 
  Users, Search, Plus, MoreVertical,
  Send, Paperclip, Smile, Hash, 
  Mic, Globe, Bell
} from 'lucide-react';

const channels = [
  { name: 'general', unread: 2 },
  { name: 'announcements', unread: 0 },
  { name: 'marketing-team', unread: 12 },
  { name: 'random', unread: 0 },
];

const directMessages = [
  { name: 'Sarah Wilson', status: 'online', avatar: 'SW' },
  { name: 'Mike Ross', status: 'away', avatar: 'MR' },
  { name: 'John Doe', status: 'offline', avatar: 'JD' },
];

const CommunicationPortal = () => {
  return (
    <PortalLayout title="Communication Hub">
      <div className="h-[calc(100vh-160px)] flex gap-6 animate-fade-in-up">
        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video size={20} />
              </div>
              <span className="text-xs font-bold text-white">New Meeting</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare size={20} />
              </div>
              <span className="text-xs font-bold text-white">New Chat</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>

          {/* Channels */}
          <div className="glass-dark rounded-3xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Channels</h4>
              <button className="text-slate-500 hover:text-white"><Plus size={16} /></button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button key={channel.name} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm text-slate-400 hover:text-white group">
                  <div className="flex items-center gap-2">
                    <Hash size={16} className="text-slate-600 group-hover:text-blue-400" />
                    <span className="font-medium">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{channel.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div className="glass-dark rounded-3xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Direct Messages</h4>
              <button className="text-slate-500 hover:text-white"><Plus size={16} /></button>
            </div>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <button key={dm.name} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm text-slate-400 hover:text-white group">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-white">
                      {dm.avatar}
                    </div>
                    <div className={`absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 border-2 border-slate-900 rounded-full ${
                      dm.status === 'online' ? 'bg-green-500' : dm.status === 'away' ? 'bg-yellow-500' : 'bg-slate-600'
                    }`}></div>
                  </div>
                  <span className="font-medium flex-grow text-left">{dm.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow glass-dark rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl">#</div>
              <div>
                <h3 className="text-lg font-bold text-white leading-none">marketing-team</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2"><Users size={12} /> 12 members • Planning for Q3 campaigns</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Phone size={20} /></button>
              <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Video size={20} /></button>
              <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all border-l border-slate-700 ml-2"><Bell size={20} /></button>
              <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-8 space-y-8 overflow-y-auto custom-scrollbar">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">SW</div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-white">Sarah Wilson</span>
                  <span className="text-[10px] text-slate-500 font-medium">11:24 AM</span>
                </div>
                <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-none max-w-2xl text-slate-300 text-sm leading-relaxed">
                  Hi team! I've uploaded the new marketing assets for the Q3 campaign. You can find them in the <span className="text-blue-400 font-bold">#assets</span> channel. Let me know what you think!
                </div>
              </div>
            </div>

            <div className="flex gap-4 self-end flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">AJ</div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] text-slate-500 font-medium">11:26 AM</span>
                  <span className="text-sm font-bold text-white">Alex Johnson</span>
                </div>
                <div className="p-4 bg-blue-600 rounded-2xl rounded-tr-none max-w-2xl text-white text-sm leading-relaxed shadow-lg shadow-blue-900/20">
                  Awesome work Sarah! I'll take a look right now and provide feedback by EOD. 🚀
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-900/50 border-t border-slate-800">
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-2 focus-within:border-blue-500 transition-all flex flex-col gap-2">
              <textarea 
                placeholder="Message #marketing-team" 
                className="bg-transparent border-none outline-none text-sm text-white p-3 w-full h-12 resize-none"
              ></textarea>
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-500 hover:text-white transition-all"><Plus size={18} /></button>
                  <button className="p-2 text-slate-500 hover:text-white transition-all"><Mic size={18} /></button>
                  <button className="p-2 text-slate-500 hover:text-white transition-all border-l border-slate-700 ml-1"><Smile size={18} /></button>
                  <button className="p-2 text-slate-500 hover:text-white transition-all"><Paperclip size={18} /></button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-600 font-black uppercase">Enter to send</span>
                  <button className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default CommunicationPortal;
