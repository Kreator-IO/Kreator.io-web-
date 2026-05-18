import { motion } from 'framer-motion';
import { Check, Shield, Zap, Rocket } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    { name: 'Starter', price: '$499', icon: Zap, features: ['Core Web Features', 'Basic SEO', 'Cloud Hosting Integration', '3 Months Support'] },
    { name: 'Professional', price: '$1,499', icon: Rocket, recommended: true, features: ['Advanced AI/ML Models', 'Custom Dashboard Integration', 'Global CDN Setup', 'Automated DevOps Pipelines', '1 Year Premium Support'] },
    { name: 'Enterprise', price: 'Custom', icon: Shield, features: ['Unlimited Transactions', 'Dedicated Solution Architects', 'Full Security & Compliance', 'SLA Guarantee', '24/7 Priority Assistance'] },
  ];

  return (
    <div className="pt-32 pb-40 bg-[#020617]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="text-blue-500 font-bold tracking-[0.25em] uppercase text-sm mb-6 inline-block">Transparent Pricing</span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8">
            Engineered To <br />
            <span className="text-blue-500">Provide Value</span>
          </h1>
          <p className="text-slate-400 text-2xl max-w-2xl mx-auto leading-relaxed">
            Flexible pricing models for every stage of your digital transformation journey.
          </p>
        </motion.div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
           {tiers.map((t, i) => {
             const Icon = t.icon;
             return (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-12 rounded-[40px] glass transition-all border-white/5 relative group ${t.recommended ? 'scale-110 z-10' : 'opacity-80 hover:opacity-100 hover:scale-105'}`}
               >
                 {t.recommended && (
                   <div className="absolute top-0 right-10 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-2xl">
                     Most Recommended
                   </div>
                 )}

                 <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-xl">
                   <Icon className="text-blue-400" size={40} />
                 </div>

                 <h3 className="text-3xl font-black text-white mb-4 group-hover:text-blue-500 transition-colors uppercase tracking-tight">{t.name}</h3>
                 <div className="flex items-baseline gap-2 mb-10">
                   <span className="text-5xl font-black text-white">{t.price}</span>
                   {t.price !== 'Custom' && <span className="text-slate-500 text-lg">/ project</span>}
                 </div>

                 <ul className="space-y-6 mb-12">
                   {t.features.map((f, j) => (
                     <li key={j} className="flex gap-4 items-center group/item">
                       <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center group-hover/item:bg-blue-600 transition-all">
                         <Check size={14} className="text-blue-400 group-hover/item:text-white" />
                       </div>
                       <span className="text-slate-400 font-medium group-hover/item:text-white transition-colors">{f}</span>
                     </li>
                   ))}
                 </ul>

                 <button className={`w-full py-5 font-bold rounded-2xl transition-all shadow-xl active:scale-95 ${t.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'bg-white text-blue-900'}`}>
                   Select Plan
                 </button>
               </motion.div>
             );
           })}
        </div>

        {/* Custom Solution Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center p-20 glass rounded-[60px] border-blue-500/10 bg-gradient-to-r from-blue-950/20 to-purple-950/20"
        >
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Need a Custom Blueprint?</h2>
           <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
             We specialize in highly complex, large-scale systems that require a unique approach. Let's discuss your custom architecture today.
           </p>
           <a 
            href="/contact" 
            className="px-16 py-6 border-2 border-white/20 hover:border-white text-white font-bold rounded-full transition-all text-xl"
           >
             Schedule Consultation
           </a>
        </motion.div>
      </div>
    </div>
  );
}
