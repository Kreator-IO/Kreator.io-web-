import React, { useCallback, useContext, useEffect, useState } from 'react';
import PortalLayout from '../../../components/PortalLayout';
import { UserContext } from '../../../context/UserContext';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TaskBoard from '../Tasks/TaskBoard';
import TaskForm from '../Tasks/TaskForm';

const EmployeePortal = () => {
  const { authFetch } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, todo: 0, review: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchMyTasks = useCallback(async () => {
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
    fetchMyTasks();
  }, [fetchMyTasks]);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const response = await authFetch(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchMyTasks();
      }
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  return (
    <PortalLayout title="My Workspace">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">To Do</p>
                <h3 className="text-2xl font-bold text-white">{stats.todo}</h3>
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
          <div className="glass-dark p-6 rounded-3xl border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-red-400/80 text-xs font-bold uppercase tracking-wider">Overdue</p>
                <h3 className="text-2xl font-bold text-red-400">{stats.overdue}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">My Tasks</h2>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading your tasks...</div>
        ) : (
          <TaskBoard 
            tasks={tasks} 
            onTaskClick={(t) => { setSelectedTask(t); setShowTaskForm(true); }}
            onStatusChange={handleTaskStatusChange}
          />
        )}
      </div>

      {showTaskForm && (
        <TaskForm 
          task={selectedTask}
          onClose={() => { setShowTaskForm(false); setSelectedTask(null); }}
          onSave={() => { setShowTaskForm(false); fetchMyTasks(); }}
        />
      )}
    </PortalLayout>
  );
};

export default EmployeePortal;
