import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, Users } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import GoogleLogin from '../components/Login';
import GoogleRecaptchaGate from '../components/GoogleRecaptchaGate';
import { verifyRecaptchaToken } from '../utils/recaptcha';

const roleOptions = [
  { label: 'Client', value: 'Client' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Team', value: 'Team' },
];

export default function Login() {
  const { login, setFirebaseSession } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Client');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getRedirectPath = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return '/portals/admin';
      case 'client': return '/portals/client';
      case 'manager': return '/portals/project';
      case 'team': return '/portals/employee';
      default: return '/portals';
    }
  };

  const handleGoogleLogin = async (firebaseUser) => {
    if (!recaptchaToken) {
      setMessage('Complete reCAPTCHA before Google login.');
      return;
    }

    try {
      await verifyRecaptchaToken(recaptchaToken, 'login');
      const loggedInUser = await setFirebaseSession(firebaseUser, role);
      navigate(getRedirectPath(loggedInUser.role));
    } catch (error) {
      setMessage(error.message || 'reCAPTCHA verification failed.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!recaptchaToken) {
      setMessage('Complete reCAPTCHA before login.');
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyRecaptchaToken(recaptchaToken, 'login');
      const loggedInUser = await login({ email, password, role });
      navigate(getRedirectPath(loggedInUser.role));
    } catch (error) {
      const message = ['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password'].includes(error.code)
        ? 'Invalid email or password.'
        : error.message || 'Firebase login failed. Please try again.';
      setMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-slate-50 px-4 transition-colors dark:from-[#071028] dark:to-[#020617]">
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
          className="hidden md:flex flex-col justify-center px-8 rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-xl text-white"
        >
          <h2 className="text-4xl font-extrabold mb-2">Welcome Back</h2>
          <p className="text-slate-100/90">Sign in to manage projects, review work, and access your workspace.</p>
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
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Login</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Access your VexquorAI account</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="hidden" name="g-recaptcha-response" value={recaptchaToken} />
            <label className="block text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-slate-100 rounded p-2 dark:bg-white/5">
                <Mail className="text-slate-500 dark:text-slate-300" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-950 placeholder:text-slate-500 dark:text-white"
                  required
                />
              </div>
            </label>

            <label className="block text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-slate-100 rounded p-2 dark:bg-white/5">
                <Lock className="text-slate-500 dark:text-slate-300" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-950 placeholder:text-slate-500 dark:text-white"
                  required
                />
              </div>
            </label>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Users size={16} />
                Access
              </div>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`rounded border px-3 py-2 text-sm font-semibold transition ${
                      role === option.value
                        ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                        : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <GoogleRecaptchaGate action="login" onToken={setRecaptchaToken} />

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded text-slate-950 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Shield className="mr-2 inline" size={16} />
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>
              <Link to="/register" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white">Create account</Link>
            </div>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
            <span className="text-xs uppercase tracking-widest text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
          </div>

          <GoogleLogin
            disabled={!recaptchaToken}
            onSuccess={handleGoogleLogin}
            onError={() => setMessage('Google login failed. Please try again.')}
          />

          {message && <p className="mt-4 text-sm text-red-300">{message}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
}
