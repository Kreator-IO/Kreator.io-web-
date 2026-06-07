import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';

const terms = [
  {
    title: 'Use of Our Services',
    body: 'You agree to use our website, software, and services only for lawful purposes and in a way that does not disrupt, damage, or misuse our systems.',
  },
  {
    title: 'Project Engagements',
    body: 'Specific project scope, timelines, pricing, deliverables, and ownership terms should be confirmed in a separate written proposal, statement of work, invoice, or contract.',
  },
  {
    title: 'Client Responsibilities',
    body: 'Clients are responsible for providing accurate information, timely feedback, required access, and approvals needed for us to deliver services effectively.',
  },
  {
    title: 'Intellectual Property',
    body: 'Unless a separate agreement states otherwise, pre-existing tools, frameworks, templates, and internal know-how remain the property of their original owners.',
  },
  {
    title: 'Payments',
    body: 'Fees, payment schedules, taxes, refunds, and late payment terms are handled according to the applicable invoice, proposal, or written service agreement.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the maximum extent permitted by law, VexquorAI is not liable for indirect, incidental, special, consequential, or punitive damages arising from website or service use.',
  },
];

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 px-4 pb-24 pt-32 transition-colors dark:bg-[#020617]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <FileText size={34} />
          </div>
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Legal
          </span>
          <h1 className="mb-6 text-4xl font-bold text-slate-950 md:text-6xl dark:text-white">
            Terms of Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            These Terms of Service outline the general rules for using the VexquorAI website, services, and portals.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Last updated: June 2, 2026
          </p>
        </motion.div>

        <div className="space-y-6">
          {terms.map((term, index) => (
            <motion.section
              key={term.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[28px] border border-slate-200 bg-white/80 p-8 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
                {term.title}
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {term.body}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-blue-200 bg-blue-50 p-8 dark:border-cyan-400/20 dark:bg-cyan-400/5">
          <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
            Questions
          </h2>
          <p className="mb-5 leading-relaxed text-slate-600 dark:text-slate-400">
            Contact us if you have questions about these terms or a specific project agreement.
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
