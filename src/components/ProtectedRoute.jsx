import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PORTAL_ROLES = ['administrator', 'admin', 'client', 'manager', 'team'];

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(UserContext);
  const roles = (allowedRoles || PORTAL_ROLES).map(role => role.toLowerCase());

  if (!user || !roles.includes(user.role?.toLowerCase())) {
    return (
      <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600 selection:text-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-20">
            <h1 className="text-8xl font-black text-white/10 mb-6">403</h1>
            <h2 className="text-5xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-slate-400 text-xl mb-8">Please log in with a portal account to continue.</p>
            <a href="/" className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl inline-block">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
