import { MessageCircle, Send, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const starterPrompts = [
  {
    label: 'Tell me about services',
    reply:
      'VexquorAI helps with AI/ML, web apps, mobile ecosystems, cloud architecture, data platforms, UX systems, DevOps, and AI Slop Scanner audits.',
    path: '/services',
  },
  {
    label: 'View pricing',
    reply:
      'Pricing starts at $499 for Starter, $1,499 for Professional, and custom Enterprise builds for complex systems.',
    path: '/pricing',
  },
  {
    label: 'Start a project',
    reply:
      'Great. The fastest next step is sending a brief with your goal, timeline, budget range, and must-have features.',
    path: '/contact',
  },
];

const mascotSrc = '/babu-ram-ai-chat-boot.png';
const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    text: "Hi! I'm Babu Ram AI. How can I help you today?",
  },
];

const getAssistantReply = (message) => {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('price') || normalizedMessage.includes('cost') || normalizedMessage.includes('pricing')) {
    return {
      text: 'You can compare Starter, Professional, and Enterprise options on the pricing page.',
      path: '/pricing',
    };
  }

  if (normalizedMessage.includes('service') || normalizedMessage.includes('build') || normalizedMessage.includes('website') || normalizedMessage.includes('app')) {
    return {
      text: 'VexquorAI builds AI systems, websites, apps, cloud platforms, and product experiences. The services page is the best overview.',
      path: '/services',
    };
  }

  if (normalizedMessage.includes('email') || normalizedMessage.includes('phone')) {
    return {
      text: 'You can email VexquorAI@proton.me or call +91 7535977315. The contact page also has the full brief form.',
      path: '/contact',
    };
  }

  return {
    text:
      'I can help with services, pricing, or starting a project. Ask me what you want to build and I will point you to the right next step.',
  };
}

export default function AIAssistantWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen((current) => !current);
    setHasUnread(false);
  };

  const addExchange = (userText, assistantReply) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', text: userText },
      { id: `assistant-${Date.now()}`, role: 'assistant', text: assistantReply.text, path: assistantReply.path },
    ]);
    setHasUnread(false);
  };

  const handlePromptClick = (prompt) => {
    addExchange(prompt.label, { text: prompt.reply, path: prompt.path });
    navigate(prompt.path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    const reply = getAssistantReply(trimmedValue);
    addExchange(trimmedValue, reply);
    setInputValue('');

    if (reply.path) {
      navigate(reply.path);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      <div className="relative flex items-end justify-end">
        <div
          className={`chat-panel pointer-events-auto w-80 max-w-[calc(100vw-2.5rem)] origin-bottom-right overflow-hidden rounded-2xl border border-sky-300/30 bg-white/95 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 dark:border-cyan-300/20 dark:bg-slate-950/95 ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'
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
                <p className="text-xs font-medium text-slate-300">VexquorAI assistant</p>
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
            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'user'
                    ? 'ml-auto rounded-tr-md border-cyan-300/30 bg-cyan-500 text-white'
                    : 'rounded-tl-md border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100'
                    }`}
                >
                  <p>{message.text}</p>
                  {message.path && (
                    <button
                      type="button"
                      onClick={() => navigate(message.path)}
                      className="mt-3 text-xs font-bold text-cyan-700 underline underline-offset-4 dark:text-cyan-200"
                    >
                      Open page
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-400/20 dark:text-cyan-200"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-inner dark:border-white/10 dark:bg-slate-900">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask Babu Ram AI..."
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
              />
              <button
                type="submit"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleChat}
          className={`group pointer-events-auto absolute bottom-0 right-0 flex h-20 w-20 origin-bottom-right items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-800 shadow-[0_0_34px_rgba(34,211,238,0.65),inset_0_4px_14px_rgba(255,255,255,0.38),inset_0_-10px_20px_rgba(15,23,42,0.45)] ring-1 ring-cyan-100/40 transition-all duration-300 sm:h-24 sm:w-24 ${isOpen
              ? 'pointer-events-none translate-y-3 scale-75 opacity-0'
              : 'translate-y-0 scale-100 opacity-100 hover:-translate-y-1 hover:shadow-[0_0_46px_rgba(34,211,238,0.86),inset_0_4px_14px_rgba(255,255,255,0.42),inset_0_-10px_20px_rgba(15,23,42,0.45)]'
            }`}
          aria-label="Open Babu Ram AI chat"
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
    </div>
  );
}
