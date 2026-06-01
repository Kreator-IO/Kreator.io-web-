import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { fallbackPortfolioProjects, normalizeProject } from '../config/portfolioProjects';

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackPortfolioProjects.map(normalizeProject));

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://kreater-backend.onrender.com/api'}/portfolio`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const mapped = result.data.map(normalizeProject);
            setProjects(mapped);
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="pt-32 pb-40 bg-slate-50 transition-colors dark:bg-[#020617]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="text-blue-500 font-bold tracking-[0.25em] uppercase text-sm mb-6 inline-block">Our Portfolio</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 mb-8 dark:text-white">
            Masterpieces Of <br />
            <span className="text-blue-500">Digital Craftsmanship</span>
          </h1>
          <p className="text-slate-600 text-2xl max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
            Take a look at some of our most innovative projects that have transformed industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug || p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-[28px] border border-slate-200/70 shadow-xl shadow-slate-950/10 transition dark:border-white/5"
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:translate-y-0 md:translate-y-4">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> {p.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{p.title}</h3>
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-300">{p.desc}</p>
                  </div>
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:flex md:translate-y-8">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </div>
                <Link
                  to={`/portfolio/${p.slug}`}
                  className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-700"
                >
                  View Project
                  <ArrowRight size={17} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center p-20 glass rounded-[60px] border-blue-500/10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-slate-950 mb-8 dark:text-white">Ready to Add Your Vision?</h2>
          <p className="text-slate-600 text-xl max-w-xl mx-auto mb-12 dark:text-slate-400">
            We treat every project as a flagship. Let&apos;s make yours next.
          </p>
          <a
            href="/contact"
            className="px-16 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all text-xl shadow-2xl"
          >
            Initialize Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
}
