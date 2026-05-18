import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, Users, User, Briefcase,
  ChevronLeft, Menu, X, Bell, Search, LogOut
} from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const portalLinks = [
  { id: 'admin', name: 'Admin', icon: <Settings size={20} />, path: '/portals/admin', roles: ['admin', 'administrator'] },
  { id: 'client', name: 'Client', icon: <User size={20} />, path: '/portals/client', roles: ['client'] },
  { id: 'employee', name: 'Team', icon: <Users size={20} />, path: '/portals/employee', roles: ['team'] },
  { id: 'project', name: 'Manager', icon: <Briefcase size={20} />, path: '/portals/project', roles: ['manager'] },
];

const PortalLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, settings } = useContext(UserContext);
  const userRole = user?.role?.toLowerCase();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Enterprise
            </Link>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
          {portalLinks.map((link) => {
            if (!link.roles.includes(userRole)) return null;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors`}>
                  {link.icon}
                </div>
                {isSidebarOpen && <span className="font-medium text-sm">{link.name}</span>}
                {!isSidebarOpen && (
                  <div className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {link.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link
            to="/portals"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Exit Portals</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-1.5 gap-2 focus-within:border-blue-500 transition-colors">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-slate-300 w-48"
              />
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500">{user?.role || 'Guest'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
