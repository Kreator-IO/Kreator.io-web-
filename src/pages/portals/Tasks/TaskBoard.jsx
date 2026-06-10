import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const formatDueDate = (value) => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
}).format(new Date(value));

export default function TaskBoard({ tasks, onTaskClick, onStatusChange }) {
  const columns = [
    { id: 'Todo', label: 'To Do', color: 'slate' },
    { id: 'InProgress', label: 'In Progress', color: 'blue' },
    { id: 'Review', label: 'Review', color: 'purple' },
    { id: 'Done', label: 'Done', color: 'emerald' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Low': return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onStatusChange) {
      onStatusChange(taskId, status);
    }
  };

  return (
    <div className="flex overflow-x-auto pb-8 gap-6 custom-scrollbar min-h-[600px]">
      {columns.map((col) => {
        const colTasks = tasks.filter(t => t.status === col.id);
        
        return (
          <div 
            key={col.id} 
            className="flex-shrink-0 w-[300px] flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className={`px-4 py-3 rounded-t-xl bg-${col.color}-500/10 border-t-4 border-${col.color}-500 mb-4 flex items-center justify-between`}>
              <h3 className={`font-bold text-${col.color}-400`}>{col.label}</h3>
              <span className={`bg-${col.color}-500/20 text-${col.color}-300 px-2 py-0.5 rounded text-xs font-bold`}>
                {colTasks.length}
              </span>
            </div>
            
            <div className="flex-1 space-y-4">
              {colTasks.map((task) => {
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
                    onClick={() => onTaskClick && onTaskClick(task)}
                    className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-4 cursor-grab active:cursor-grabbing transition shadow-lg"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.project && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-300 truncate max-w-[120px]">
                          {task.project.name}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-white text-sm mb-2">{task.title}</h4>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
                      <div className="flex items-center gap-2">
                        {task.assignedTo ? (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-500/20" title={task.assignedTo.name}>
                            {task.assignedTo.name.charAt(0)}
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-400" title="Unassigned">
                            ?
                          </div>
                        )}
                      </div>
                      
                      {task.dueDate && (
                        <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
                          {isOverdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
                          <span>{formatDueDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              
              {colTasks.length === 0 && (
                <div className="border-2 border-dashed border-slate-800 rounded-xl h-24 flex items-center justify-center">
                  <span className="text-xs text-slate-600">Drop tasks here</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
