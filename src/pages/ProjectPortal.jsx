import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { getProjectBySlug } from '../config/portfolioProjects';

export default function ProjectPortal() {
  const { projectSlug } = useParams();
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return (
      <div className="px-4 py-40 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-500">Project Portal</p>
        <h1 className="mt-5 text-5xl font-black text-slate-950 dark:text-white">Project Not Found</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          This project view is not available yet. Return to the portfolio to browse active case studies.
        </p>
        <Link
          to="/portfolio"
          className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pb-32 pt-28 transition-colors dark:bg-[#020617]">
      <section className="relative min-h-[78vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-blue-950/40" />

        <div className="container relative z-10 mx-auto flex min-h-[78vh] items-end px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link
              to="/portfolio"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Portfolio
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
              <Sparkles size={16} />
              {project.category}
            </p>
            <h1 className="text-5xl font-black uppercase tracking-tight text-white md:text-8xl">{project.title}</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-200">{project.desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Layers size={26} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500">Project View</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">What We Built</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Challenge</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Solution</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{project.solution}</p>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/10 dark:border-white/10"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
              <ShieldCheck size={26} />
            </div>
            <h2 className="text-3xl font-black">Impact</h2>
            <div className="mt-7 space-y-4">
              {project.impact.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/7 p-4">
                  <CheckCircle className="mt-0.5 shrink-0 text-cyan-300" size={20} />
                  <span className="font-semibold text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500">Stack</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-slate-100">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-blue-500/20 bg-blue-600 p-8 text-white shadow-xl shadow-blue-950/20">
            <h2 className="text-3xl font-black">Want a portal like {project.title}?</h2>
            <p className="mt-4 max-w-2xl text-blue-50">
              We can turn this kind of project into a working client portal, dashboard, app, or automation flow for your business.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 font-bold text-blue-700 transition hover:bg-slate-100"
            >
              Start a Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
