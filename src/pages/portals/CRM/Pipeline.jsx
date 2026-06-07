import { useCallback, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../../context/UserContext';

export default function Pipeline({ onLeadClick }) {
  const { authFetch } = useContext(UserContext);
  const [pipeline, setPipeline] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPipeline = useCallback(async () => {
    try {
      const response = await authFetch('/leads/pipeline');
      const data = await response.json();
      if (response.ok) {
        setPipeline(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  if (loading) return <div className="text-center py-20 text-slate-400">Loading pipeline...</div>;
  if (!pipeline) return <div className="text-center py-20 text-slate-400">Failed to load pipeline.</div>;

  const columns = [
    { id: 'New', label: 'New Lead', color: 'blue' },
    { id: 'Contacted', label: 'Contacted', color: 'yellow' },
    { id: 'Qualified', label: 'Qualified', color: 'emerald' },
    { id: 'Negotiation', label: 'Negotiation', color: 'purple' },
    { id: 'Won', label: 'Closed Won', color: 'green' }
  ];

  return (
    <div className="flex overflow-x-auto pb-8 gap-6 custom-scrollbar min-h-[600px]">
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-80 flex flex-col">
          <div className={`px-4 py-3 rounded-t-xl bg-${col.color}-500/10 border-t-4 border-${col.color}-500 mb-4 flex items-center justify-between`}>
            <h3 className={`font-bold text-${col.color}-400`}>{col.label}</h3>
            <span className={`bg-${col.color}-500/20 text-${col.color}-300 px-2 py-0.5 rounded text-xs font-bold`}>
              {pipeline[col.id]?.length || 0}
            </span>
          </div>
          
          <div className="flex-1 space-y-4">
            {pipeline[col.id]?.map((lead) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={lead._id}
                onClick={() => onLeadClick(lead._id)}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl p-4 cursor-pointer transition shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                  {lead.priority === 'Hot' && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                </div>
                <p className="text-xs text-slate-400 mb-3">{lead.company || lead.email}</p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
                  <span className="text-xs text-slate-500">{lead.source}</span>
                  <span className="text-sm font-bold text-white">${lead.value?.toLocaleString() || 0}</span>
                </div>
              </motion.div>
            ))}
            
            {(!pipeline[col.id] || pipeline[col.id].length === 0) && (
              <div className="border-2 border-dashed border-slate-800 rounded-xl h-24 flex items-center justify-center">
                <span className="text-xs text-slate-600">No leads</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
