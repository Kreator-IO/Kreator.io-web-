import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { UserContext } from '../../../context/UserContext';

export default function TaskForm({ task, projectId, onClose, onSave }) {
  const { authFetch } = useContext(UserContext);
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    project: task?.project?._id || task?.project || projectId || '',
    assignedTo: task?.assignedTo?._id || task?.assignedTo || '',
    status: task?.status || 'Todo',
    priority: task?.priority || 'Medium',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  });
  
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch projects and team members for dropdowns
    const fetchOptions = async () => {
      try {
        const [projRes, usersRes] = await Promise.all([
          authFetch('/projects'),
          authFetch('/users?role=Team')
        ]);
        
        if (projRes.ok) {
          const pData = await projRes.json();
          setProjects(pData.data);
        }
        if (usersRes.ok) {
          const uData = await usersRes.json();
          setTeam(uData.data);
        }
      } catch (error) {
        console.error('Failed to fetch options', error);
      }
    };
    
    fetchOptions();
  }, [authFetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = task ? `/tasks/${task._id}` : '/tasks';
      const method = task ? 'PUT' : 'POST';
      
      const payload = { ...form };
      if (!payload.project) delete payload.project;
      if (!payload.assignedTo) delete payload.assignedTo;
      if (!payload.dueDate) delete payload.dueDate;
      
      const response = await authFetch(path, {
        method,
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (response.ok) {
        onSave(data.data);
      } else {
        alert(data.error || 'Failed to save task');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">{task ? 'Edit Task' : 'Create Task'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">Task Title</label>
            <input type="text" required value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">Description</label>
            <textarea rows={3} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 resize-none"></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Project</label>
              <select value={form.project} onChange={e=>setForm({...form, project: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="">No Project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Assign To</label>
              <select value={form.assignedTo} onChange={e=>setForm({...form, assignedTo: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="">Unassigned</option>
                {team.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Status</label>
              <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="Todo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Priority</label>
              <select value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-bold uppercase">Due Date</label>
              <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 [color-scheme:dark]" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
