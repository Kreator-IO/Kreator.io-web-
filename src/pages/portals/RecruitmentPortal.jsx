import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  Briefcase, Users, Calendar, Clock, 
  MapPin, Mail, Phone, ChevronRight, 
  Plus, Search, Star, CheckCircle2
} from 'lucide-react';

const jobPostings = [
  { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote', applicants: 48, posted: '2 days ago', status: 'Active' },
  { id: 2, title: 'Product Designer (UX/UI)', department: 'Design', location: 'New York', applicants: 31, posted: '5 days ago', status: 'Active' },
  { id: 3, title: 'Marketing Manager', department: 'Marketing', location: 'London', applicants: 22, posted: '1 week ago', status: 'Paused' },
];

const candidates = [
  { id: 1, name: 'Jordan Lee', role: 'React Developer', stage: 'Technical Interview', score: 9.2 },
  { id: 2, name: 'Sam Rivera', role: 'UX Designer', stage: 'Portfolio Review', score: 8.5 },
  { id: 3, name: 'Morgan Chen', role: 'Marketing Mgr', stage: 'Final Round', score: 9.8 },
];

const RecruitmentPortal = () => {
  return (
    <PortalLayout title="Recruitment">
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Open Roles</p>
            <h3 className="text-3xl font-black text-white">24</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Applicants</p>
            <h3 className="text-3xl font-black text-blue-400">284</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Interviews This Week</p>
            <h3 className="text-3xl font-black text-purple-400">18</h3>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Avg. Time to Hire</p>
            <h3 className="text-3xl font-black text-emerald-400">18d</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Postings */}
          <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Job Postings</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all">
                <Plus size={14} /> New Job
              </button>
            </div>
            <div className="divide-y divide-slate-800">
              {jobPostings.map((job) => (
                <div key={job.id} className="p-6 hover:bg-slate-800/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                      <div className="flex gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {job.posted}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-500'
                    }`}>{job.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">{job.department}</span>
                    <span className="text-xs font-bold text-slate-400"><Users size={12} className="inline mr-1" />{job.applicants} applicants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Candidates */}
          <div className="space-y-6">
            <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Top Candidates</h3>
              </div>
              <div className="divide-y divide-slate-800">
                {candidates.map((c) => (
                  <div key={c.id} className="p-6 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{c.name}</h4>
                        <p className="text-xs text-slate-500">{c.role} • {c.stage}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-black text-yellow-400">{c.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="glass-dark rounded-3xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-blue-400" /> Today's Schedule</h3>
              <div className="space-y-3">
                <div className="flex gap-4 p-3 rounded-xl bg-slate-800/50">
                  <div className="text-right min-w-[40px]">
                    <p className="text-xs font-black text-blue-400">11am</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Jordan Lee — Technical Round</p>
                    <p className="text-xs text-slate-500">Senior React Developer • Zoom</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-xl bg-slate-800/50">
                  <div className="text-right min-w-[40px]">
                    <p className="text-xs font-black text-blue-400">3pm</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Morgan Chen — Final Round</p>
                    <p className="text-xs text-slate-500">Marketing Manager • In-Person</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default RecruitmentPortal;
