import React from 'react';
import PortalLayout from '../../components/PortalLayout';
import { 
  File, FileText, Image, Film, 
  MoreHorizontal, Download, Share2, 
  Trash2, Plus, Search, Filter, 
  Folder, ChevronRight, Clock, Shield
} from 'lucide-react';

const recentFiles = [
  { id: 1, name: 'Brand_Guidelines_2024.pdf', type: 'PDF', size: '12.4 MB', modified: '2h ago', owner: 'Sarah L.', icon: <FileText className="text-red-400" /> },
  { id: 2, name: 'Q1_Financial_Report.xlsx', type: 'XLSX', size: '2.1 MB', modified: '5h ago', owner: 'Mike R.', icon: <File className="text-emerald-400" /> },
  { id: 3, name: 'Project_Alpha_Presentation.pptx', type: 'PPTX', size: '45.8 MB', modified: '1d ago', owner: 'John D.', icon: <File className="text-orange-400" /> },
  { id: 4, name: 'Main_Hero_Video.mp4', type: 'MP4', size: '1.2 GB', modified: '2d ago', owner: 'Chris P.', icon: <Film className="text-purple-400" /> },
];

const folders = [
  { name: 'Legal Docs', count: 12, size: '45MB' },
  { name: 'Assets', count: 156, size: '4.2GB' },
  { name: 'Reports', count: 42, size: '120MB' },
  { name: 'Archive', count: 890, size: '12GB' },
];

const DocumentManagementPortal = () => {
  return (
    <PortalLayout title="Document Management">
      <div className="space-y-8 animate-fade-in-up">
        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Storage Used</h4>
              <span className="text-blue-400 text-xs font-bold">75%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-blue-500 w-[75%]"></div>
            </div>
            <p className="text-white text-lg font-bold">750 GB <span className="text-slate-500 text-sm font-normal">of 1 TB</span></p>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <h4 className="text-slate-400 text-sm font-medium mb-4">Total Files</h4>
            <h3 className="text-3xl font-black text-white">12,482</h3>
            <p className="text-emerald-400 text-xs mt-1 font-bold">+128 this week</p>
          </div>
          <div className="glass-dark p-6 rounded-3xl border border-slate-800">
            <h4 className="text-slate-400 text-sm font-medium mb-4">Shared with Me</h4>
            <h3 className="text-3xl font-black text-white">245</h3>
            <p className="text-blue-400 text-xs mt-1 font-bold">12 new requests</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search files and folders..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2">
              <Filter size={18} /> Filter
            </button>
            <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
              <Plus size={18} /> Upload
            </button>
          </div>
        </div>

        {/* Folders Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {folders.map((folder, i) => (
            <div key={i} className="glass-dark p-6 rounded-3xl border border-slate-800 hover:border-blue-500/30 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <Folder size={40} className="text-blue-500 fill-blue-500/20 group-hover:scale-110 transition-transform" />
                <button className="text-slate-600 hover:text-white"><MoreHorizontal size={18} /></button>
              </div>
              <h4 className="text-white font-bold mb-1">{folder.name}</h4>
              <p className="text-slate-500 text-xs font-medium">{folder.count} files • {folder.size}</p>
            </div>
          ))}
        </div>

        {/* Recent Files Table */}
        <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Files</h3>
            <button className="text-blue-400 text-sm font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Size</th>
                  <th className="px-8 py-4">Last Modified</th>
                  <th className="px-8 py-4">Owner</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {file.icon}
                        </div>
                        <span className="text-sm font-bold text-white">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-400">{file.size}</td>
                    <td className="px-8 py-5 text-sm text-slate-400">{file.modified}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                        <span className="text-sm text-slate-300">{file.owner}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"><Download size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"><Share2 size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default DocumentManagementPortal;
