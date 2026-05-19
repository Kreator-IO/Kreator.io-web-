import React, { useEffect, useState } from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Plus, MoreVertical, Calendar, 
  MessageSquare, Paperclip, Users,
  List, Layout, CheckCircle2
} from 'lucide-react';
import axios from 'axios';

const ProjectManagementPortal = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setColumns(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <PortalLayout title="Project Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Alpha Project Sprint</h2>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 text-sm"><Calendar size={16} /> Ends in 12 days</span>
              <span className="flex items-center gap-1.5 text-sm"><Users size={16} /> 8 Team Members</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-6 border-b border-slate-800 pb-1">
          <button className="flex items-center gap-2 px-1 py-4 text-blue-400 border-b-2 border-blue-400 font-semibold transition-all">
            <Layout size={18} /> Board
          </button>
          <button className="flex items-center gap-2 px-1 py-4 text-slate-400 hover:text-white transition-all">
            <List size={18} /> List
          </button>
          <button className="flex items-center gap-2 px-1 py-4 text-slate-400 hover:text-white transition-all">
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
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1 text-[10px]"><MessageSquare size={12} /> 2</span>
                        <span className="flex items-center gap-1 text-[10px]"><Paperclip size={12} /> 5</span>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2].slice(0, task.members).map(m => (
                          <div key={m} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 rounded-xl border border-dashed border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-all text-sm flex items-center justify-center gap-2">
                  <Plus size={16} /> Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
};

export default ProjectManagementPortal;
