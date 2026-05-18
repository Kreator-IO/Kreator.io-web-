import { Link } from 'react-router-dom';
import { Code2, Brain, Smartphone, Cloud, ArrowRight, CheckCircle, Zap, Users, TrendingUp, Award } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { number: '100+', label: 'Projects Delivered', icon: Award },
    { number: '50+', label: 'Team Members', icon: Users },
    { number: '15+', label: 'Years Experience', icon: TrendingUp },
    { number: '98%', label: 'Client Satisfaction', icon: Zap },
  ];

  const testimonials = [
    {
      name: 'Rahul Singh',
      company: 'TechStart India',
      text: 'kretor.Io transformed our vision into a world-class platform. Highly professional and results-driven!',
      role: 'CEO',
    },
    {
      name: 'Priya Desai',
      company: 'CloudFlow Solutions',
      text: 'Outstanding team with exceptional technical expertise. They delivered our project ahead of schedule.',
      role: 'Product Manager',
    },
    {
      name: 'Amit Kumar',
      company: 'FinTech Plus',
      text: 'Best investment in technology partners we made. Responsive, innovative, and committed to excellence.',
      role: 'Founder',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#020617]">
          {/* Gradients */}
          <div className="absolute top-0 -left-[10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 -right-[10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-1000"></div>
          
          {/* Tech Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-md border border-blue-400/20 rounded-full px-6 py-2 mb-8"
            >
              <Zap size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-200">🚀 Pioneering Digital Innovation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Empowering Businesses with
              <span className="block mt-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Intelligence & Innovation
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              We deliver world-class AI/ML, Web, Android, and Cloud solutions that drive real results.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link 
                to="/services" 
                className="group relative px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center gap-2"
              >
                Our Services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 rounded-xl font-bold text-white glass hover:bg-white/20 transition-all duration-300"
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-slate-500 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-800 bg-[#020617]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-blue-400" size={32} />
                  </div>
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.number}</div>
                  <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative bg-[#020617]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block"
            >
              Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Enterprise-Grade Solutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-xl max-w-2xl mx-auto"
            >
              We combine deep technical expertise with industry insights to deliver scalable digital products.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI/ML Solutions',
                description: 'Build predictive models and intelligent automation systems that learn and adapt.',
                color: 'from-purple-500/10 to-purple-500/0',
              },
              {
                icon: Code2,
                title: 'Web Engineering',
                description: 'Scalable cloud-native web applications built with React, Next.js, and modern backends.',
                color: 'from-blue-500/10 to-blue-500/0',
              },
              {
                icon: Smartphone,
                title: 'Mobile Ecosystems',
                description: 'Native and cross-platform mobile experiences that users love across Android and iOS.',
                color: 'from-emerald-500/10 to-emerald-500/0',
              },
              {
                icon: Cloud,
                title: 'Cloud & DevOps',
                description: 'Robust infrastructure management and automated deployment pipelines on AWS/Azure.',
                color: 'from-cyan-500/10 to-cyan-500/0',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 border-t border-slate-900 bg-[#020617]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">Values</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Why Industry Leaders <br />
                <span className="text-blue-500">Trust kretor.Io</span>
              </h2>

              <div className="space-y-8">
                {[
                  { title: 'Technical Excellence', desc: 'Our team comprises experts with deep knowledge in distributed systems and AI.' },
                  { title: 'Agile Delivery', desc: 'We value transparency and rapid iteration to ensure your product hits the market faster.' },
                  { title: 'Scalable Design', desc: 'Architecture built to handle millions of users from day one.' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <CheckCircle size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
              <div className="relative glass border-white/5 rounded-[40px] p-2 aspect-square flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Users className="text-white" size={48} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Team of 50+ Experts</h4>
                  <p className="text-slate-400">Committed to your success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-[#020617] border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">
              Clients
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Trusted by Innovators
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Don't just take our word for it — hear what our partners say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-10 rounded-[32px] glass border-white/5 hover:border-blue-500/20 transition-all"
              >
                <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-slate-500 text-sm">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Let's collaborate to build software that defines the next generation of your industry.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <Link 
                  to="/contact" 
                  className="px-10 py-5 rounded-2xl font-bold text-blue-900 bg-white hover:bg-blue-50 transition-all shadow-xl"
                >
                  Start Your Project
                </Link>
                <Link 
                  to="/services" 
                  className="px-10 py-5 rounded-2xl font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
