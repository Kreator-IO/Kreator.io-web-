import { motion } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We may collect contact details, project information, account details, and messages you send through our website, consultation forms, or client portals.',
  },
  {
    title: 'How We Use Information',
    body: 'We use information to respond to inquiries, provide services, manage projects, improve our website, protect our systems, and communicate important updates.',
  },
  {
    title: 'Cookies and Analytics',
    body: 'Our website may use essential cookies, analytics tools, or similar technologies to understand performance, improve reliability, and maintain a secure user experience.',
  },
  {
    title: 'Data Sharing',
    body: 'We do not sell personal information. We may share limited information with trusted service providers when needed to operate our website, deliver services, or comply with legal obligations.',
  },
  {
    title: 'Data Security',
    body: 'We use reasonable technical and organizational safeguards to protect information. No online service can guarantee absolute security, but we work to reduce risk.',
  },
  {
    title: 'Your Choices',
    body: 'You may contact us to request access, correction, deletion, or other available privacy choices related to your personal information.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 px-4 pb-24 pt-32 transition-colors dark:bg-[#020617]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <ShieldCheck size={34} />
          </div>
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Legal
          </span>
          <h1 className="mb-6 text-4xl font-bold text-slate-950 md:text-6xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            This Privacy Policy explains how VexquorAI collects, uses, and protects information when you use our website, services, and portals.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Last updated: June 2, 2026
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[28px] border border-slate-200 bg-white/80 p-8 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
                {section.title}
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {section.body}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-blue-200 bg-blue-50 p-8 dark:border-cyan-400/20 dark:bg-cyan-400/5">
          <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-5 leading-relaxed text-slate-600 dark:text-slate-400">
            For privacy questions or requests, contact the VexquorAI team.
          </p>
          <a
            href="mailto:VexquorAI@proton.me"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Mail size={18} />
            VexquorAI@proton.me
          </a>
        </div>
      </div>
    </div>
  );
}
