import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Smartphone, Cloud, Layers, Database, Palette, Settings } from 'lucide-react';

const iconMap = {
  Brain, Code2, Smartphone, Cloud, Layers, Database, Palette, Settings
};

export default function Services() {
  const [allServices, setAllServices] = useState([
    { icon: Brain, title: 'AI & Machine Learning', desc: 'Custom machine learning models, predictive analysis, and intelligent automated workflows for enterprises.' },
    { icon: Code2, title: 'Web App Engineering', desc: 'Secure, scalable React-based web products that offer smooth experiences across any browser and device.' },
    { icon: Smartphone, title: 'Android Ecosystems', desc: 'Deeply integrated Android app development using Kotlin and cutting-edge mobile architecture patterns.' },
    { icon: Cloud, title: 'Cloud Data Architecture', desc: 'Building and managing high-availability cloud infrastructure on AWS, Azure, and Google Cloud.' },
    { icon: Layers, title: 'Microservices Design', desc: 'Migrating monolithic backends to modern, decoupled microservices architectures that scale effortlessly.' },
    { icon: Database, title: 'Big Data Processing', desc: 'Real-time data streaming and processing using industry-standard tools like Spark, Flink, and Kafka.' },
    { icon: Palette, title: 'UX/UI Design Systems', desc: 'High-fidelity design systems and user-centric interfaces built with Figma and meticulous attention to detail.' },
    { icon: Settings, title: 'DevOps & CI/CD', desc: 'Automating the software lifecycle with zero-downtime deployments and robust monitoring systems.' },
  ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://kreater-backend.onrender.com/api'}/services`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Map icons from string to component if backend returns them as strings
            const mapped = result.data.map(s => ({
              ...s,
              icon: iconMap[s.icon] || Code2,
              desc: s.description // backend uses description
            }));
            setAllServices(mapped);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="pt-32 bg-slate-50 pb-40 transition-colors dark:bg-[#020617]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="text-blue-500 font-bold tracking-[0.25em] uppercase text-sm mb-6 inline-block">Our Solutions</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 mb-8 dark:text-white">
            Advanced Engineering <br />
            <span className="gradient-text bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">For the Modern Web</span>
          </h1>
          <p className="text-slate-600 text-2xl max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
            We solve hard technical problems so you can focus on building your business. 
            From AI to Cloud, we have the team to lead your project.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {allServices.map((s, i) => {
             const Icon = s.icon;
             return (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative h-80 p-10 rounded-[32px] glass hover:bg-white transition-all border-slate-200 overflow-hidden border hover:border-blue-500/20 dark:border-white/5 dark:hover:bg-white/10"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                 <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                   <Icon className="text-blue-400" size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-950 mb-4 dark:text-white">{s.title}</h3>
                 <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">{s.desc}</p>
               </motion.div>
             );
           })}
        </div>

        {/* Tech Stack Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
           <h4 className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm mb-12">Built with Industry Standards</h4>
           <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
              {['React', 'Next.js', 'Typescript', 'Node.js', 'Python', 'AWS', 'TensorFlow', 'PostgreSQL'].map(tech => (
                <span key={tech} className="text-3xl font-black text-slate-950 dark:text-white">{tech}</span>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
