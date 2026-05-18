import React, { useState } from 'react';
import PortalLayout from '../../../components/PortalLayout';
import { 
  Plus, MoreVertical, Calendar, 
  MessageSquare, Paperclip, Users,
  List, Layout, CheckCircle2, BarChart3, AlertCircle, Zap
} from 'lucide-react';

const columns = [
  { id: 'todo', name: 'To Do', count: 4, tasks: [
    { id: 101, title: 'UI Mockups for Mobile App', priority: 'High', tags: ['Design'], members: 2 },
    { id: 102, title: 'Market Research Analysis', priority: 'Medium', tags: ['Research'], members: 1 },
  ]},
  { id: 'inprogress', name: 'In Progress', count: 3, tasks: [
    { id: 201, title: 'Backend API Integration', priority: 'High', tags: ['Dev'], members: 3 },
  ]},
  { id: 'review', name: 'In Review', count: 2, tasks: [
    { id: 301, title: 'Landing Page Copy', priority: 'Low', tags: ['Content'], members: 1 },
  ]},
  { id: 'done', name: 'Completed', count: 12, tasks: [
    { id: 401, title: 'Sprint 4 Planning', priority: 'Medium', tags: ['Mgmt'], members: 4 },
  ]},
];

const ProjectManagementPortal = () => {
  const [activeTab, setActiveTab] = useState('board');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'board':
        return (
          <div className="space-y-8 animate-fade-in-up">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Alpha Project Sprint</h2>
                <div className="flex items-center gap-4 text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm"><Calendar size={16} /> Ends in 12 days</span>
                  <span className="flex items-center gap-1.5 text-sm"><Users size={16} /> 8 Team Members</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                      M{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    +4
                  </div>
                </div>
                <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-6 border-b border-slate-800 pb-1 overflow-x-auto">
              <button className="flex items-center gap-2 px-1 py-4 text-blue-400 border-b-2 border-blue-400 font-semibold transition-all whitespace-nowrap">
                <Layout size={18} /> Board
              </button>
              <button className="flex items-center gap-2 px-1 py-4 text-slate-400 hover:text-white transition-all whitespace-nowrap">
                <List size={18} /> List
              </button>
              <button className="flex items-center gap-2 px-1 py-4 text-slate-400 hover:text-white transition-all whitespace-nowrap">
                <CheckCircle2 size={18} /> Timeline
              </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-h-[600px]">
              {columns.map((column) => (
                <div key={column.id} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{column.name}</h4>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400">{column.count}</span>
                    </div>
                    <button className="text-slate-500 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {column.tasks.map((task) => (
                      <div key={task.id} className="glass-dark p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg">
                        <div className="flex justify-between mb-3">
                          <div className="flex gap-2">
                            {task.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${
                            task.priority === 'High' ? 'text-red-400' : 
                            task.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <h5 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors mb-4">{task.title}</h5>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                          <div className="flex -space-x-2">
                            {Array(task.members).fill(0).map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 text-[10px] flex items-center justify-center text-white font-bold">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <button className="text-slate-500 hover:text-blue-400 transition-colors">
                            <MessageSquare size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={24} className="text-blue-500" />
                CRM Portal
              </h3>
              <p className="text-slate-400 mb-6">Manage customer relationships and sales pipeline</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Total Leads</p>
                  <p className="text-3xl font-bold text-white">245</p>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Active Deals</p>
                  <p className="text-3xl font-bold text-white">18</p>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Pipeline Value</p>
                  <p className="text-3xl font-bold text-white">$2.4M</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={24} className="text-green-500" />
                Finance Portal
              </h3>
              <p className="text-slate-400 mb-6">Project budgets, expenses, and financial reports</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Total Budget</p>
                  <p className="text-3xl font-bold text-white">$150K</p>
                  <p className="text-xs text-slate-500 mt-2">For this project</p>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Spent</p>
                  <p className="text-3xl font-bold text-white">$89.5K</p>
                  <p className="text-xs text-green-400 mt-2">59.7% of budget</p>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm mb-2">Remaining</p>
                  <p className="text-3xl font-bold text-white">$60.5K</p>
                  <p className="text-xs text-slate-500 mt-2">40.3% available</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="glass-dark rounded-3xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={24} className="text-cyan-500" />
                Communication Portal
              </h3>
              <p className="text-slate-400 mb-6">Team collaboration and project updates</p>
              <div className="space-y-4">
                <div className="glass-dark rounded-2xl p-6 border border-slate-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">PM</div>
                    <div>
                      <h4 className="text-white font-bold">Project Manager</h4>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-slate-300">Sprint planning session completed. All tasks assigned. Check Jira for details.</p>
                </div>
              </div>
            </div>
          </div>
        );

      

      default:
        return null;
    }
  };

  return (
    <PortalLayout title="Project Management">
      {/* Tab Navigation */}
      <div className="mb-8 flex gap-4 border-b border-slate-800 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('board')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all ${
            activeTab === 'board'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Board
        </button>
        <button
          onClick={() => setActiveTab('crm')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'crm'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users size={18} /> CRM
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'finance'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 size={18} /> Finance
        </button>
        <button
          onClick={() => setActiveTab('communication')}
          className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'communication'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare size={18} /> Chat
        </button>
        
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </PortalLayout>
  );
};

export default ProjectManagementPortal;
