import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { UserContext } from '../context/UserContext';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
const ROLE_OPTIONS = [
  { id: 'admin', label: 'Admin', role: 'Admin', email: 'admin@kreator.com', password: 'admin123', path: '/portals' },
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
    return '/portals';
  }

  return '/portfolio';
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

  const handleRoleSelect = (roleOption) => {
    setSelectedRole(roleOption);
    setEmail(roleOption.email);
    setPassword(roleOption.password);
    setMessage('');
  };

  const handleDemoLogin = (roleOption = selectedRole) => {
    updateUser({
      name: `${roleOption.label} User`,
      email: roleOption.email,
      role: roleOption.role,
    });
    navigate(roleOption.path);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

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
    } catch (error) {
      if (!loginWithLocalUser()) {
        setMessage('Unable to reach the login server. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071028] to-[#020617] px-4">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="hidden md:flex flex-col justify-center px-8 rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-xl text-white">
          <h2 className="text-4xl font-extrabold mb-2">Welcome Back</h2>
          <p className="text-slate-100/90">Sign in to manage projects, review work, and access your workspace.</p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {ROLE_OPTIONS.map(roleOption => (
              <button
                key={roleOption.id}
                type="button"
                onClick={() => handleDemoLogin(roleOption)}
                className="rounded-lg bg-white/15 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-white/25 transition-colors"
              >
                {roleOption.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/70 backdrop-blur p-8 rounded-2xl shadow-lg border border-white/5">
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
              <button
                type="button"
                onClick={() => handleDemoLogin()}
                className="text-sm font-semibold text-cyan-300 hover:text-white"
              >
                Demo access
              </button>
              <Link to="/register" className="text-sm text-slate-400 hover:text-white">Create account</Link>
            </div>
          </form>

          {message && <p className="mt-4 text-sm text-red-300">{message}</p>}
        </div>
      </div>
    </div>
  );
}
