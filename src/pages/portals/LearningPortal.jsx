import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { Book, Play, Award, Clock, ChevronRight, Star, Users, Lock } from 'lucide-react';

const courses = [
  { id: 1, title: 'React Advanced Patterns', progress: 72, duration: '6h 30m', category: 'Development', instructor: 'John Smith', enrolled: 428 },
  { id: 2, title: 'UI/UX Design Fundamentals', progress: 100, duration: '4h 15m', category: 'Design', instructor: 'Lisa Chen', enrolled: 615 },
  { id: 3, title: 'Cloud Architecture on AWS', progress: 25, duration: '8h 45m', category: 'DevOps', instructor: 'Mark Taylor', enrolled: 312 },
  { id: 4, title: 'Leadership & Management', progress: 0, duration: '3h 20m', category: 'Business', instructor: 'Sarah Hall', enrolled: 189, locked: true },
];

const LearningPortal = () => {
  return (
    <PortalLayout title="Learning Portal (LMS)">
      <div className="space-y-8 animate-fade-in-up">
        {/* My Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Courses Enrolled</p><h3 className="text-3xl font-black text-white">12</h3></div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Completed</p><h3 className="text-3xl font-black text-emerald-400">7</h3></div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Hours Learned</p><h3 className="text-3xl font-black text-blue-400">48h</h3></div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Certificates</p><h3 className="text-3xl font-black text-yellow-400">3</h3></div>
        </div>

        {/* Resume / Continue Learning */}
        <div className="glass-dark rounded-3xl p-8 border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/30 flex-shrink-0">
            <Play size={36} className="text-white fill-white" />
          </div>
          <div className="flex-grow">
            <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1">Continue Learning</p>
            <h2 className="text-2xl font-black text-white mb-1">React Advanced Patterns</h2>
            <p className="text-slate-400 text-sm">Module 5 of 9 — Custom Hooks Deep Dive</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <span className="text-xs font-black text-white">72%</span>
            </div>
          </div>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex-shrink-0">
            Resume
          </button>
        </div>

        {/* Course Library */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">My Courses</h3>
            <button className="text-blue-400 text-sm font-bold hover:text-blue-300">Browse All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className={`glass-dark rounded-3xl border transition-all cursor-pointer group ${course.locked ? 'border-slate-800 opacity-60' : 'border-slate-800 hover:border-blue-500/40'}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">{course.category}</span>
                    {course.locked ? <Lock size={16} className="text-slate-600" /> : course.progress === 100 ? <Award size={18} className="text-yellow-400" /> : null}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{course.title}</h4>
                  <p className="text-xs text-slate-500 mb-4">by {course.instructor}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                    <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} />{course.enrolled} enrolled</span>
                  </div>
                  {!course.locked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progress</span>
                        <span className={`font-black ${course.progress === 100 ? 'text-emerald-400' : 'text-white'}`}>{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};
export default LearningPortal;
