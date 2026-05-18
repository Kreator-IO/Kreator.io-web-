import { motion } from 'framer-motion';
import { Target, Eye, Heart, ShieldCheck, Github, Linkedin, Twitter } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Target, title: 'Mission', text: 'To empower organizations by building world-class technology solutions that solve real-world problems.' },
    { icon: Eye, title: 'Vision', text: 'To become the global leader in providing AI-driven products and software services.' },
    { icon: Heart, title: 'Passion', text: 'We love what we do, and we pour our passion into every line of code we write.' },
    { icon: ShieldCheck, title: 'Integrity', text: 'Honesty and transparency are the pillars of every client relationship we build.' },
  ];

  const team = [
    {
      name: 'Vansh Bhushan',
      role: 'Founder & MD',
      bio: 'Visionary technologist and entrepreneur who founded kreator.io with a mission to deliver world-class digital innovation.',
      gradient: 'from-blue-600 to-cyan-500',
      initials: 'VB',
      social: {
        linkedin: 'https://www.linkedin.com/in/vansh-bhushan-vats-b5bb94250/',
        github: 'https://github.com/Bhushanvatsji',
        twitter: 'https://x.com/Vanshbhush6424',
      },
    },
    {
      name: 'Aaryan Sharma',
      role: 'Co-Founder & CEO',
      bio: 'Full-stack architect and engineering leader driving the technical strategy and product roadmap at kreator.io.',
      gradient: 'from-purple-600 to-indigo-500',
      initials: 'AS',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#',
      },
    },
    {
      name: 'Aashish',
      role: 'CTO  & Project Manager ',
      bio: 'Dedicated operations lead ensuring every project is delivered on time, within scope, and beyond client expectations.',
      gradient: 'from-emerald-600 to-teal-500',
      initials: 'AA',
      social: {
        linkedin: 'https://www.linkedin.com/in/ashish-sarswat-a5b522255/',
        github: '#',
        twitter: 'https://x.com/A010001001110?s=20',
      },
    },
  ];

  return (
    <div className="pt-32 bg-[#020617] pb-32">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">Our Story</span>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8">
            Pioneering Technology <br />
            <span className="text-blue-500">Since Day One</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Founded with a bold dream, kreator.io has grown into a powerhouse of digital innovation,
            serving clients across the globe with cutting-edge software engineering.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[32px] glass hover:bg-white/10 transition-all border-white/5"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8">
                  <Icon className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{v.title}</h3>
                <p className="text-slate-400 leading-relaxed">{v.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Meet the Team */}
        <div className="mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">The Minds Behind It</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet the <span className="text-blue-500">Founding Team</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              The passionate leaders who built kreator.io from the ground up.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative p-10 rounded-[40px] glass border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden text-center"
              >
                {/* Glow background */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-700`}></div>

                {/* Avatar */}
                <div className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-white font-black text-2xl">{member.initials}</span>
                </div>

                {/* Role badge */}
                <span className={`inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-gradient-to-r ${member.gradient} text-white mb-4`}>
                  {member.role}
                </span>

                <h3 className="text-2xl font-black text-white mb-3">{member.name}</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8">{member.bio}</p>

                {/* Social links */}
                <div className="flex justify-center gap-4">
                  {member.social.linkedin !== '#' && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-[#0077B5] hover:scale-110 transition-all"
                    >
                      <Linkedin className="text-white" size={16} />
                    </a>
                  )}
                  {member.social.github !== '#' && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-[#24292e] hover:scale-110 transition-all"
                    >
                      <Github className="text-white" size={16} />
                    </a>
                  )}
                  {member.social.twitter !== '#' && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all"
                    >
                      <Twitter className="text-white" size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="mt-40 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] overflow-hidden aspect-video bg-gradient-to-br from-blue-500 to-indigo-800 p-8 flex items-end shadow-2xl"
          >
            <h4 className="text-white text-3xl font-bold">Built with Purpose, Driven by Results</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              World-Class Engineers Focused on One Goal: <span className="text-blue-500">Your Success</span>
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              At kreator.io, we believe that the best products are built by people who care.
              Our team consists of senior architects, talented designers, and strategic thinkers
              who collaborate across time zones to bring your vision to life.
            </p>
            <div className="grid grid-cols-2 gap-8 text-white">
              <div>
                <p className="text-4xl font-bold mb-2">100+</p>
                <p className="text-slate-400 font-medium tracking-wide">Projects Delivered</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-slate-400 font-medium tracking-wide">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
