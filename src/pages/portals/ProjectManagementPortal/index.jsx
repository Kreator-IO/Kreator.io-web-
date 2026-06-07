import React, { useCallback, useContext, useEffect, useState } from 'react';
import PortalLayout from '../../../components/PortalLayout';
import { UserContext } from '../../../context/UserContext';
import { Briefcase, CheckCircle, Clock, Plus, LayoutGrid, List } from 'lucide-react';
import TaskBoard from '../Tasks/TaskBoard';
import TaskForm from '../Tasks/TaskForm';

const ProjectManagementPortal = () => {
  const { authFetch } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, todo: 0, review: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('pipeline');
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        authFetch('/tasks'),
        authFetch('/tasks/stats')
      ]);
      
      if (tasksRes.ok) {
        const data = await tasksRes.json();
        setTasks(data.data);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const response = await authFetch(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  return (
    <PortalLayout title="Project Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Tasks</p>
                <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
              </div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</p>
                <h3 className="text-2xl font-bold text-white">{stats.completed}</h3>
              </div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">In Progress</p>
                <h3 className="text-2xl font-bold text-white">{stats.inProgress}</h3>
              </div>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-red-400/80 text-xs font-bold uppercase tracking-wider">Overdue</p>
                <h3 className="text-2xl font-bold text-red-400">{stats.overdue}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button 
              onClick={() => setView('pipeline')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${view === 'pipeline' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid size={16} /> Board
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${view === 'list' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List size={16} /> List
            </button>
          </div>
          
          <button 
            onClick={() => { setSelectedTask(null); setShowTaskForm(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading tasks...</div>
        ) : view === 'pipeline' ? (
          <TaskBoard 
            tasks={tasks} 
            onTaskClick={(t) => { setSelectedTask(t); setShowTaskForm(true); }}
            onStatusChange={handleTaskStatusChange}
          />
        ) : (
          <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Task</th>
                    <th className="px-6 py-4 font-bold">Project</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Priority</th>
                    <th className="px-6 py-4 font-bold">Assigned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tasks.map(task => (
                    <tr 
                      key={task._id}
                      onClick={() => { setSelectedTask(task); setShowTaskForm(true); }}
                      className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{task.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{task.project?.name || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{task.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded border ${task.priority==='Urgent'?'border-red-500 text-red-400':task.priority==='High'?'border-orange-500 text-orange-400':task.priority==='Medium'?'border-blue-500 text-blue-400':'border-slate-500 text-slate-400'}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{task.assignedTo?.name || 'Unassigned'}</td>
                    </tr>
                  ))}
                  {tasks.length === 0 && (
                    <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">No tasks found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showTaskForm && (
        <TaskForm 
          task={selectedTask}
          onClose={() => { setShowTaskForm(false); setSelectedTask(null); }}
          onSave={() => { setShowTaskForm(false); fetchTasks(); }}
        />
      )}
    </PortalLayout>
  );
};

export default ProjectManagementPortal;
