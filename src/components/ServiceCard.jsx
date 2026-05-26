export default function ServiceCard({ icon: Icon, title, description, color }) {
  return (
    <div className="group relative p-8 rounded-2xl bg-white/85 border border-slate-200 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden backdrop-blur-sm dark:bg-white/5 dark:border-white/10">
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">{title}</h3>
        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">{description}</p>
      </div>
    </div>
  );
}
