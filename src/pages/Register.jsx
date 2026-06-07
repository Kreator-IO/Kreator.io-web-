import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { User, Mail, Lock } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export default function Register() {
  const { register } = useContext(UserContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { 
      setMessage('Fill all fields'); 
      return; 
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await register(form);
      navigate('/portals');
    } catch (error) {
      setMessage(error.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-slate-50 transition-colors dark:from-[#071028] dark:to-[#020617]">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="hidden md:flex flex-col justify-center px-8 rounded-2xl bg-gradient-to-br from-green-700 to-teal-500 shadow-xl text-white"
        >
          <h2 className="text-4xl font-extrabold mb-2">Create Account</h2>
          <p className="text-slate-100/90">Join VexquorAI to manage projects, access portals, and start consultations.</p>
          <div className="mt-6 text-sm text-white/80">Already registered? Login to continue.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-white/85 backdrop-blur p-8 rounded-2xl shadow-lg border border-slate-200 dark:bg-slate-900/70 dark:border-white/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold">K</div>
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Create your account</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sign up to get started with VexquorAI</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-slate-100 rounded p-2 dark:bg-white/5">
                <User className="text-slate-500 dark:text-slate-300" size={18} />
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full bg-transparent outline-none text-slate-950 placeholder:text-slate-500 dark:text-white" />
              </div>
            </label>

            <label className="block text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-slate-100 rounded p-2 dark:bg-white/5">
                <Mail className="text-slate-500 dark:text-slate-300" size={18} />
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full bg-transparent outline-none text-slate-950 placeholder:text-slate-500 dark:text-white" />
              </div>
            </label>

            <label className="block text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-slate-100 rounded p-2 dark:bg-white/5">
                <Lock className="text-slate-500 dark:text-slate-300" size={18} />
                <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="w-full bg-transparent outline-none text-slate-950 placeholder:text-slate-500 dark:text-white" />
              </div>
            </label>

            <div className="flex items-center justify-between mt-6">
              <button disabled={isSubmitting} className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 rounded text-slate-900 font-semibold disabled:opacity-50">
                {isSubmitting ? 'Registering...' : 'Register & Login'}
              </button>
              <Link to="/login" className="text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-white">Already have an account?</Link>
            </div>
          </form>

          {message && <p className="mt-4 text-sm text-red-400">{message}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
}
