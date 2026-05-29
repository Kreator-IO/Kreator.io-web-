import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { 
  Settings, Users, User, Briefcase, 
  ArrowUpRight
} from 'lucide-react';

const portals = [
  { id: 'admin', name: 'Admin Portal', icon: <Settings size={24} />, description: 'Manage users, projects, and analytics', color: 'bg-red-500', roles: ['admin', 'administrator'] },
  { id: 'client', name: 'Client Portal', icon: <User size={24} />, description: 'Track projects, payments, and files', color: 'bg-blue-500', roles: ['client'] },
  { id: 'employee', name: 'Team Portal', icon: <Users size={24} />, description: 'Tasks, attendance, and team updates', color: 'bg-green-500', roles: ['team'] },
  { id: 'project', name: 'Manager Portal', icon: <Briefcase size={24} />, description: 'Manage tasks, Kanban, and project progress', color: 'bg-purple-500', roles: ['manager'] },
];

const PortalDashboard = () => {
  const { user } = useContext(UserContext);
  const userRole = user?.role?.toLowerCase();

  const visiblePortals = portals.filter(portal => portal.roles.includes(userRole));

  return (
    <div className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          PREMIUM CINEMATIC BACKGROUND EFFECTS
          Stripe / Linear / Raycast / Vercel inspired
          ═══════════════════════════════════════════════════════════════ */}

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
          type="video/mp4"
        />
      </video>

      {/* Deep dark base overlay - removed to show full video color */}
      {/* <div className="absolute inset-0 z-0 bg-[#020617]/60" /> */}

      {/* Primary radial gradient — core ambient light - reduced opacity for text readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(15, 23, 42, 0.1) 0%, rgba(2, 6, 23, 0.4) 100%)',
        }}
      />

      {/* ─── Large Blurred Glow Orbs ─── */}

      {/* Top-left cyan glow */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Top-right purple glow */}
      <div
        className="absolute -top-20 -right-40 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, transparent 70%)',
        }}
      />

      {/* Center ambient mesh — soft blue light patch */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10 blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
        }}
      />

      {/* Bottom-left floating purple patch */}
      <div
        className="absolute bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 65%)',
        }}
      />

      {/* Bottom-right soft cyan accent */}
      <div
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.14] blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 65%)',
        }}
      />

      {/* ─── Floating Animated Light Patches ─── */}

      {/* Slow-floating cyan orb */}
      <div
        className="absolute top-[15%] left-[20%] w-[350px] h-[350px] rounded-full opacity-[0.08] blur-3xl z-0 pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)',
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />

      {/* Slow-floating purple orb */}
      <div
        className="absolute top-[60%] right-[15%] w-[300px] h-[300px] rounded-full opacity-[0.07] blur-3xl z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
          animation: 'float-slow-reverse 25s ease-in-out infinite',
        }}
      />

      {/* ─── Vignette Edge Effect ─── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(2, 6, 23, 0.7) 100%)',
        }}
      />

      {/* ─── Subtle Noise Grain Overlay ─── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          ORIGINAL CONTENT — FULLY PRESERVED
          ═══════════════════════════════════════════════════════════════ */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Enterprise Ecosystem</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Access all company portals from a single unified dashboard. Secure, integrated, and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visiblePortals.map((portal, index) => (
            <Link 
              key={portal.id} 
              to={`/portals/${portal.id}`}
              className="group relative glass-dark rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${portal.color} flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {portal.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{portal.name}</h3>
              <p className="text-slate-400 text-sm">{portal.description}</p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Inline keyframe animations for floating orbs */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 30px) scale(0.97); }
          75% { transform: translate(15px, 15px) scale(1.03); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25px, 15px) scale(1.04); }
          50% { transform: translate(20px, -25px) scale(0.96); }
          75% { transform: translate(-10px, -10px) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default PortalDashboard;
