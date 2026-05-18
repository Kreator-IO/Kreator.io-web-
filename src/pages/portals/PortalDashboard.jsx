import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { 
  Settings, Users, User, Briefcase, 
  Target, LifeBuoy, DollarSign, CreditCard, 
  FileText, Database, MessageSquare, 
  BarChart2, TrendingUp, 
  Shield, Share2, Monitor, UserPlus, ArrowUpRight
} from 'lucide-react';

const portals = [
  { id: 'admin', name: 'Admin Portal', icon: <Settings size={24} />, description: 'Manage users, projects, and analytics', color: 'bg-red-500', roles: ['admin', 'administrator'] },
  { id: 'client', name: 'Client Portal', icon: <User size={24} />, description: 'Track projects, payments, and files', color: 'bg-blue-500', roles: ['admin', 'administrator', 'client'] },
  { id: 'employee', name: 'Employee Portal', icon: <Users size={24} />, description: 'Tasks, attendance, and salary info', color: 'bg-green-500', roles: ['admin', 'administrator', 'manager', 'team'] },
  { id: 'project', name: 'Project Management', icon: <Briefcase size={24} />, description: 'Manage tasks, Kanban, and progress', color: 'bg-purple-500', roles: ['admin', 'administrator', 'manager', 'team'] },
  { id: 'crm', name: 'CRM Portal', icon: <Target size={24} />, description: 'Leads, sales pipeline, and data', color: 'bg-yellow-500', roles: ['admin', 'administrator', 'manager'] },
  { id: 'support', name: 'Support / Ticket', icon: <LifeBuoy size={24} />, description: 'Customer tickets and live chat', color: 'bg-indigo-500', roles: ['admin', 'administrator', 'client', 'manager'] },
  { id: 'finance', name: 'Finance Portal', icon: <DollarSign size={24} />, description: 'Invoices, expenses, and reports', color: 'bg-emerald-500', roles: ['admin', 'administrator', 'manager'] },
  { id: 'billing', name: 'Billing Portal', icon: <CreditCard size={24} />, description: 'Subscriptions and payment gateway', color: 'bg-cyan-500', roles: ['admin', 'administrator', 'client', 'manager'] },
  { id: 'hr', name: 'HR Portal', icon: <UserPlus size={24} />, description: 'Records, payroll, and approvals', color: 'bg-orange-500', roles: ['admin', 'administrator', 'manager'] },
  { id: 'docs', name: 'Document Management', icon: <FileText size={24} />, description: 'File sharing and version control', color: 'bg-sky-500', roles: ['admin', 'administrator', 'client', 'manager', 'team'] },
  { id: 'communication', name: 'Communication Portal', icon: <MessageSquare size={24} />, description: 'Team chat and announcements', color: 'bg-teal-500', roles: ['admin', 'administrator', 'manager', 'team'] },
  { id: 'analytics', name: 'Analytics Dashboard', icon: <BarChart2 size={24} />, description: 'Business reports and KPIs', color: 'bg-rose-500', roles: ['admin', 'administrator', 'manager'] },
  { id: 'marketing', name: 'Marketing Portal', icon: <TrendingUp size={24} />, description: 'Campaigns and SEO reports', color: 'bg-fuchsia-500', roles: ['admin', 'administrator', 'manager'] },
  { id: 'partner', name: 'Partner Portal', icon: <Share2 size={24} />, description: 'Partner access and collaboration', color: 'bg-indigo-400', roles: ['admin', 'administrator', 'manager'] },
  { id: 'security', name: 'Security Portal', icon: <Shield size={24} />, description: 'Access control and logs', color: 'bg-slate-700', roles: ['admin', 'administrator'] },
  { id: 'monitor', name: 'System Monitor', icon: <Monitor size={24} />, description: 'System health and performance', color: 'bg-zinc-800', roles: ['admin', 'administrator'] },
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
