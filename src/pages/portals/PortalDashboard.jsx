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
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
    </div>
  );
};

export default PortalDashboard;
