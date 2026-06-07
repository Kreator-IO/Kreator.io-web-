import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert } from 'lucide-react';
import { UserContext } from '../context/UserContext';

const PORTAL_ROLES = ['administrator', 'admin', 'client', 'manager', 'team'];

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useContext(UserContext);
  const roles = (allowedRoles || PORTAL_ROLES).map(role => role.toLowerCase());

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">Loading...</div>;
  }

  if (!user || !roles.includes(user.role?.toLowerCase())) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600 selection:text-white overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative text-center max-w-xl"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-blue-400/30 bg-slate-900/80 shadow-2xl shadow-blue-500/20"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Lock size={64} className="text-blue-300" strokeWidth={1.7} />
                <motion.span
                  className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldAlert size={16} />
                </motion.span>
              </motion.div>
            </motion.div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-blue-300">Restricted Portal</p>
            <h1 className="mb-4 text-5xl font-black text-white md:text-7xl">Access Denied</h1>
            <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-slate-400">
              This portal is locked for your current account type. Please sign in with the correct role to continue.
            </p>
            <a href="/" className="inline-block rounded-2xl bg-blue-600 px-12 py-5 font-bold text-white shadow-xl transition-all hover:bg-blue-700 hover:shadow-blue-600/20">
              Back to Home
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return children;
}
