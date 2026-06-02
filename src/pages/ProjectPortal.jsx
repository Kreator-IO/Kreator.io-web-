import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Layers, Sparkles } from 'lucide-react';
import { getCategoryGithubProjects, getProjectBySlug } from '../config/portfolioProjects';

export default function ProjectPortal() {
  const { projectSlug } = useParams();
  const project = getProjectBySlug(projectSlug);
  const githubProjects = project ? getCategoryGithubProjects(project.category) : [];

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
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 font-bold text-blue-700 shadow-xl shadow-blue-950/20 transition hover:bg-slate-100"
              >
                Live Demo
                <ExternalLink size={18} />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-8">
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

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-8 text-center text-white shadow-xl shadow-slate-950/10 dark:border-white/10">
            <h2 className="text-3xl font-black md:text-5xl">Want a portal like {project.title}?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              We treat every project as a flagship. Let&apos;s make yours next.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-blue-600 px-10 font-bold text-white transition hover:bg-blue-700"
            >
              Start Project
              <ArrowRight size={18} />
            </Link>
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-0 mt-4 inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 font-bold text-white transition hover:bg-white/10 sm:ml-4 sm:mt-8"
              >
                Live Demo
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Github size={24} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500">GitHub Projects</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{project.category} Demo Projects</h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              Explore five project demos related to this category, including frontend, backend, automation, and admin portal examples.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {githubProjects.map((item) => (
              <a
                key={item.githubUrl}
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[230px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white hover:shadow-lg hover:shadow-blue-950/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <Github className="text-slate-500 transition group-hover:text-blue-500 dark:text-slate-300" size={22} />
                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300">
                  View GitHub
                  <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
