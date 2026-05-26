import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Linkedin, Github, Twitter } from 'lucide-react';
import { addData } from '../firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addData('consultations', {
        ...formData,
        status: 'initialized',
        submittedAt: new Date().toISOString(),
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://kreater-backend.onrender.com/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      console.log('Submission successful:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to send. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 transition-colors dark:bg-[#020617]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-16 glass rounded-[40px] max-w-xl w-full border-blue-500/20"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="text-green-500" size={48} />
          </div>
          <h2 className="text-4xl font-bold text-slate-950 mb-4 dark:text-white">Consultation Initialized!</h2>
          <p className="text-slate-600 text-lg mb-12 dark:text-slate-400">Thank you, {formData.name.split(' ')[0]}. Your detailed brief has been sent to the Project Manager team.</p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: '',
              });
            }}
            className="px-10 py-4 bg-white text-blue-900 font-bold rounded-2xl hover:bg-slate-100 transition-all"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 bg-slate-50 transition-colors dark:bg-[#020617]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-6 inline-block">Get In Touch</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-950 mb-12 dark:text-white">Let&apos;s Build <br /> <span className="text-blue-500">Something Great</span></h1>
            <p className="text-slate-600 text-xl max-w-lg mb-16 leading-relaxed dark:text-slate-400">
              Have a vision for a complex AI project or a next-gen web app?
              Drop us a line and let&apos;s discuss how we can bring it to life.
            </p>

            <div className="grid gap-10">
              <div className="flex gap-6 items-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all border-white/5">
                  <Mail className="text-blue-400 group-hover:text-white" size={30} />
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold text-sm uppercase mb-1 tracking-wider">Email Us</h4>
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">Kreator_IO@proton.me</p>
                </div>
              </div>
              <div className="flex gap-6 items-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all border-white/5">
                  <Phone className="text-blue-400 group-hover:text-white" size={30} />
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold text-sm uppercase mb-1 tracking-wider">Call Directly</h4>
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">+91 7535977315</p>
                </div>
              </div>
              <div className="flex gap-6 items-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all border-white/5">
                  <MapPin className="text-blue-400 group-hover:text-white" size={30} />
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold text-sm uppercase mb-1 tracking-wider">Visit Studio</h4>
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">Mohali , Punjab</p>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="mt-10 pt-10 border-t border-slate-200 flex gap-6 dark:border-white/5">
                <a href="https://www.linkedin.com/in/kreator-io-a97621400/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:bg-[#0077B5] hover:scale-110 transition-all">
                  <Linkedin className="text-white" size={24} />
                </a>
                <a href="https://x.com/IoKreator26102" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all">
                  <Twitter className="text-white" size={24} />
                </a>
                <a href="https://github.com/Kreator-IO" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:bg-[#24292e] hover:scale-110 transition-all">
                  <Github className="text-white" size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 md:p-16 glass border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full"></div>

            <h2 className="text-2xl font-bold text-slate-950 mb-10 relative z-10 dark:text-white">Send a Detailed Brief</h2>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    placeholder="Jane Cooper"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner dark:bg-slate-900 dark:border-white/10 dark:text-white"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner dark:bg-slate-900 dark:border-white/10 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner dark:bg-slate-900 dark:border-white/10 dark:text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner dark:bg-slate-900 dark:border-white/10 dark:text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Inquiry Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner appearance-none dark:bg-slate-900 dark:border-white/10 dark:text-white"
                >
                  <option value="">Select a subject...</option>
                  <option value="AI/ML Development">AI/ML Development</option>
                  <option value="Web Core Engineering">Web Core Engineering</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Custom Software">Custom Software</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-slate-600 font-bold text-xs uppercase tracking-widest pl-2 dark:text-slate-400">Brief Discussion</label>
                <textarea
                  name="message"
                  value={formData.message}
                  required
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about the project scope, timeline, and goals..."
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-950 focus:outline-none focus:border-blue-500 transition-all shadow-inner resize-none dark:bg-slate-900 dark:border-white/10 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 active:scale-95"
              >
                {isSubmitting ? 'Sending...' : 'Initialize Consultation'}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
