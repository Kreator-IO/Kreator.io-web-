import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Star } from 'lucide-react';
import { UserContext } from '../context/UserContext';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([
    { title: 'Nexus AI Engine', category: 'AI/ML', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', desc: 'Enterprise-grade neural processing engine for predictive supply chain analytics.' },
    { title: 'Quantum Pay', category: 'Web App', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', desc: 'Decentralized payment gateway with sub-second finality and multi-chain support.' },
    { title: 'SkyNet OS', category: 'Cloud', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', desc: 'Distributed operating system for edge computing and low-latency IoT networks.' },
    { title: 'BioTrace App', category: 'Android', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', desc: 'Native health monitoring application utilizing advanced biometric sensor data.' },
    { title: 'Titan ERP', category: 'Web App', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', desc: 'Modular enterprise resource planning system for manufacturing automation.' },
    { title: 'Neural Vision', category: 'AI/ML', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', desc: 'Real-time computer vision system for autonomous industrial quality control.' },
  ]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Map backend data to frontend structure
            const mapped = result.data.map(p => ({
              ...p,
              image: p.image.includes('[') ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' : p.image, // Placeholder if it's mock text
              desc: p.description
            }));
            setProjects(mapped);
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="pt-32 pb-40 bg-[#020617]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="text-blue-500 font-bold tracking-[0.25em] uppercase text-sm mb-6 inline-block">Our Portfolio</span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8">
            Masterpieces Of <br />
            <span className="text-blue-500">Digital Craftsmanship</span>
          </h1>
          <p className="text-slate-400 text-2xl max-w-2xl mx-auto leading-relaxed">
            Take a look at some of our most innovative projects that have transformed industries.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {projects.map((p, i) => (
             <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden border border-white/5 cursor-pointer"
             >
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-10 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex justify-between items-end">
                      <div>
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-1">
                          <Star size={12} fill="currentColor" /> {p.category}
                        </span>
                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{p.title}</h3>
                      </div>
                      <div className="w-16 h-16 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-10 group-hover:translate-y-0 duration-700">
                        <ExternalLink className="text-white" size={24} />
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center p-20 glass rounded-[60px] border-blue-500/10"
        >
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Add Your Vision?</h2>
           <p className="text-slate-400 text-xl max-w-xl mx-auto mb-12">
             We treat every project as a flagship. Let's make yours next.
           </p>
           <a 
            href="/contact" 
            className="px-16 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all text-xl shadow-2xl"
           >
             Start Your Journey
           </a>
        </motion.div>

        {/* Authentication + Consultation */}
        <motion.div className="mt-12 p-8 glass rounded-2xl border border-white/5 max-w-4xl mx-auto" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
          <AuthAndConsultation />
        </motion.div>
      </div>
    </div>
  );
}

function AuthAndConsultation() {
  const { user, updateUser, updateSharedData } = useContext(UserContext);
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [consultForm, setConsultForm] = useState({ subject: '', details: '' });
  const [message, setMessage] = useState('');

  useEffect(() => { setMessage(''); }, [user, mode]);

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem('users');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  };

  const saveUsers = (arr) => localStorage.setItem('users', JSON.stringify(arr));

  const handleRegister = (e) => {
    e.preventDefault();
    const users = loadUsers();
    if (!registerForm.email || !registerForm.password || !registerForm.name) {
      setMessage('Please fill all registration fields.');
      return;
    }
    if (users.find(u => u.email === registerForm.email)) {
      setMessage('An account with that email already exists.');
      return;
    }
    const newUser = { name: registerForm.name, email: registerForm.email, password: registerForm.password, role: 'client' };
    users.push(newUser);
    saveUsers(users);
    updateUser({ name: newUser.name, email: newUser.email, role: newUser.role });
    setMessage('Registration successful — you are now logged in.');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const found = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    if (!found) {
      setMessage('Invalid credentials.');
      return;
    }
    updateUser({ name: found.name, email: found.email, role: found.role });
    setMessage('Login successful.');
  };

  const handleLogout = () => {
    updateUser(null);
    setMessage('Logged out.');
  };

  const handleInitConsult = (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be logged in to initialize a consultation.');
      return;
    }
    if (!consultForm.subject || !consultForm.details) {
      setMessage('Please provide subject and details.');
      return;
    }
    const consultationsRaw = localStorage.getItem('consultations');
    const consultations = consultationsRaw ? JSON.parse(consultationsRaw) : [];
    const consult = {
      id: `c_${Date.now()}`,
      user: { name: user.name, email: user.email, role: user.role },
      subject: consultForm.subject,
      details: consultForm.details,
      status: 'initialized',
      createdAt: new Date().toISOString()
    };
    consultations.push(consult);
    localStorage.setItem('consultations', JSON.stringify(consultations));
    // share to global store for other components
    updateSharedData && updateSharedData({ lastConsultation: consult });
    setConsultForm({ subject: '', details: '' });
    setMessage('Your consultation has been sent to the Project Manager team. You will receive a response within 24 hours. Your portal will be opened after approval.');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Account</h3>
        {user ? (
          <div className="text-left text-slate-300">
            <p className="mb-2">Signed in as <strong>{user.name}</strong> ({user.role})</p>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded text-white">Logout</button>
            <p className="mt-4 text-sm text-slate-400">You can initialize a consultation on the right.</p>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setMode('login')} className={`px-4 py-2 rounded ${mode==='login'? 'bg-blue-600 text-white':'bg-white/5 text-slate-300'}`}>Login</button>
              <button onClick={() => setMode('register')} className={`px-4 py-2 rounded ${mode==='register'? 'bg-blue-600 text-white':'bg-white/5 text-slate-300'}`}>Register</button>
            </div>
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-3 text-left">
                <input value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} placeholder="Email" className="w-full p-3 rounded bg-white/5 text-white" />
                <input value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} placeholder="Password" type="password" className="w-full p-3 rounded bg-white/5 text-white" />
                <button type="submit" className="px-6 py-3 bg-blue-600 rounded text-white">Login</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-left">
                <input value={registerForm.name} onChange={e=>setRegisterForm({...registerForm,name:e.target.value})} placeholder="Full name" className="w-full p-3 rounded bg-white/5 text-white" />
                <input value={registerForm.email} onChange={e=>setRegisterForm({...registerForm,email:e.target.value})} placeholder="Email" className="w-full p-3 rounded bg-white/5 text-white" />
                <input value={registerForm.password} onChange={e=>setRegisterForm({...registerForm,password:e.target.value})} placeholder="Password" type="password" className="w-full p-3 rounded bg-white/5 text-white" />
                <button type="submit" className="px-6 py-3 bg-green-600 rounded text-white">Register & Login</button>
              </form>
            )}
          </div>
        )}
        {message && <p className="mt-4 text-sm text-blue-300">{message}</p>}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Initialize Consultation</h3>
        <form onSubmit={handleInitConsult} className="space-y-3 text-left">
          <input value={consultForm.subject} onChange={e=>setConsultForm({...consultForm,subject:e.target.value})} placeholder="Consultation subject" className="w-full p-3 rounded bg-white/5 text-white" />
          <textarea value={consultForm.details} onChange={e=>setConsultForm({...consultForm,details:e.target.value})} placeholder="Describe your needs, timeline, and budget" rows={6} className="w-full p-3 rounded bg-white/5 text-white" />
          <div className="flex items-center gap-3">
            <button type="submit" className="px-6 py-3 bg-blue-600 rounded text-white" disabled={!user}>Initialize Consultation</button>
            {!user && <span className="text-sm text-slate-400">Please login to enable this.</span>}
          </div>
        </form>
        <p className="mt-3 text-sm text-slate-400">After initialization, the consultation is stored and shared to the app store for admins to pick up.</p>
      </div>
    </div>
  );
}
