import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import GoogleLogin from '../components/Login';
import { auth } from '../firebase';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
const ROLE_OPTIONS = [
  { id: 'admin', label: 'Admin', role: 'Admin', email: 'admin@kreator.com', password: 'admin123', path: '/portals/admin' },
  { id: 'client', label: 'Client', role: 'Client', email: 'client@kreator.com', password: 'client123', path: '/portals/client' },
  { id: 'manager', label: 'Manager', role: 'Manager', email: 'manager@kreator.com', password: 'manager123', path: '/portals/project' },
  { id: 'team', label: 'Team', role: 'Team', email: 'team@kreator.com', password: 'team123', path: '/portals/employee' },
];

function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch {
    return [];
  }
}

function getRedirectPath(role) {
  const normalizedRole = role?.toLowerCase();
  const roleOption = ROLE_OPTIONS.find(option => option.id === normalizedRole || option.role.toLowerCase() === normalizedRole);

  if (roleOption) {
    return roleOption.path;
  }

  if (normalizedRole === 'administrator') {
    return '/portals/admin';
  }

  return '/portfolio';
}

function getAuthErrorMessage(error) {
  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password. Create the user in Firebase Authentication first.';
    case 'auth/operation-not-allowed':
      return 'Email/Password login is not enabled in Firebase Authentication.';
    case 'auth/too-many-requests':
      return 'Too many login attempts. Please wait a moment and try again.';
    default:
      return error.message || 'Login failed. Please try again.';
  }
}

export default function Login() {
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const loginWithLocalUser = () => {
    const localUser = getLocalUsers().find(
      user => user.email === email && user.password === password
    ) || ROLE_OPTIONS.find(
      user => user.email === email && user.password === password
    );

    if (!localUser) {
      return false;
    }

    updateUser({
      name: localUser.name,
      email: localUser.email,
      role: localUser.role,
    });
    navigate(getRedirectPath(localUser.role));
    return true;
  };

  const hasLocalUser = () => {
    return Boolean(
      getLocalUsers().find(user => user.email === email && user.password === password) ||
      ROLE_OPTIONS.find(user => user.email === email && user.password === password)
    );
  };

  const handleRoleSelect = (roleOption) => {
    setSelectedRole(roleOption);
    setMessage('');
  };

  const handleGoogleLogin = (firebaseUser) => {
    updateUser({
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Google User',
      email: firebaseUser.email,
      role: selectedRole.role,
    });
    navigate(getRedirectPath(selectedRole.role));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (hasLocalUser()) {
      loginWithLocalUser();
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      updateUser({
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email,
        role: selectedRole.role,
      });
      navigate(getRedirectPath(selectedRole.role));
    } catch (firebaseError) {
      try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole.role }),
      });

      const data = await response.json();

      if (response.ok) {
        const loggedInUser = {
          name: data.name || email.split('@')[0],
          email,
          role: data.role,
        };

        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        updateUser(loggedInUser);
        navigate(getRedirectPath(data.role));
        return;
      }

      if (!loginWithLocalUser()) {
        setMessage(data.message || data.error || 'Invalid email or password.');
      }
      } catch (apiError) {
        if (!loginWithLocalUser()) {
          setMessage(getAuthErrorMessage(firebaseError));
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071028] to-[#020617] px-4">
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
          <p className="mt-6 text-sm text-white/80">Choose your role, then sign in with your own account credentials.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-slate-900/70 backdrop-blur p-8 rounded-2xl shadow-lg border border-white/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold">K</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Login</h1>
              <p className="text-sm text-slate-400">Access your Kreator account</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {ROLE_OPTIONS.map(roleOption => (
              <button
                key={roleOption.id}
                type="button"
                onClick={() => handleRoleSelect(roleOption)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  selectedRole.id === roleOption.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {roleOption.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 rounded p-2">
                <Mail className="text-slate-300" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 rounded p-2">
                <Lock className="text-slate-300" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </label>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded text-slate-950 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>
              <Link to="/register" className="text-sm text-slate-400 hover:text-white">Create account</Link>
            </div>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs uppercase tracking-widest text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setMessage('Google login failed. Please try again.')}
          />

          {message && <p className="mt-4 text-sm text-red-300">{message}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
}
