import { MessageCircle, Send, X } from 'lucide-react';
import { useState } from 'react';

const starterPrompts = [
  'Tell me about services',
  'View pricing',
  'Start a project',
];

const mascotSrc = '/babu-ram-ai-chat-boot.png';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const toggleChat = () => {
    setIsOpen((current) => !current);
    setHasUnread(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      <div
        className={`chat-panel mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-sky-300/30 bg-white/95 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 dark:border-cyan-300/20 dark:bg-slate-950/95 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-5 scale-95 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-4 text-white dark:border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.34),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.32),transparent_36%)]" />
          <div className="relative flex items-center gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 shadow-[0_0_28px_rgba(34,211,238,0.55)] ring-1 ring-cyan-200/40">
              <img src={mascotSrc} alt="" className="h-11 w-11 scale-[1.8] rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100">Babu Ram AI</p>
              <p className="text-xs font-medium text-slate-300">Kreonix.io assistant</p>
            </div>
            <button
              type="button"
              onClick={toggleChat}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close Babu Ram AI chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-slate-200 bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
            Hi! I&apos;m Babu Ram AI. How can I help you today?
          </div>

          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-400/20 dark:text-cyan-200"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-inner dark:border-white/10 dark:bg-slate-900">
            <input
              type="text"
              placeholder="Ask Babu Ram AI..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleChat}
        className="group relative ml-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-800 shadow-[0_0_34px_rgba(34,211,238,0.65),inset_0_4px_14px_rgba(255,255,255,0.38),inset_0_-10px_20px_rgba(15,23,42,0.45)] ring-1 ring-cyan-100/40 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_46px_rgba(34,211,238,0.86),inset_0_4px_14px_rgba(255,255,255,0.42),inset_0_-10px_20px_rgba(15,23,42,0.45)] sm:h-24 sm:w-24"
        aria-label={isOpen ? 'Close Babu Ram AI chat' : 'Open Babu Ram AI chat'}
        aria-expanded={isOpen}
      >
        <span className="absolute inset-1 rounded-full bg-slate-950/80 shadow-inner" />
        <span className="absolute inset-0 rounded-full bg-cyan-300/25 blur-xl transition group-hover:bg-cyan-200/35" />
        <img
          src={mascotSrc}
          alt="Babu Ram AI"
          className="relative h-[4.25rem] w-[4.25rem] scale-[1.85] rounded-full object-cover shadow-[0_10px_24px_rgba(2,6,23,0.55)] sm:h-20 sm:w-20"
        />
        <span className="absolute -left-1 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-100/50 bg-slate-950 text-cyan-200 shadow-lg shadow-cyan-500/30">
          <MessageCircle size={14} />
        </span>
        {hasUnread && (
          <span className="absolute right-1 top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-xs font-black text-white shadow-lg dark:border-slate-950">
            1
          </span>
        )}
      </button>
    </div>
  );
}
