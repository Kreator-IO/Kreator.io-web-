import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import { User, Mail, Lock } from 'lucide-react';
import { auth } from '../firebase';

export default function Register() {
  const { updateUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loadUsers = () => {
    try { return JSON.parse(localStorage.getItem('users') || '[]'); } catch { return []; }
  };

  const saveUsers = (arr) => localStorage.setItem('users', JSON.stringify(arr));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setMessage('Fill all fields'); return; }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });

      updateUser({ name: form.name, email: form.email, role: 'Client' });
      navigate('/portals/client');
    } catch (error) {
      const users = loadUsers();
      if (users.find(u => u.email === form.email)) { setMessage('Email already used'); return; }
      const newUser = { name: form.name, email: form.email, password: form.password, role: 'Client' };
      users.push(newUser);
      saveUsers(users);
      updateUser({ name: newUser.name, email: newUser.email, role: newUser.role });
      navigate('/portals/client');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071028] to-[#020617]">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="hidden md:flex flex-col justify-center px-8 rounded-2xl bg-gradient-to-br from-green-700 to-teal-500 shadow-xl text-white">
          <h2 className="text-4xl font-extrabold mb-2">Create Account</h2>
          <p className="text-slate-100/90">Join Kreator to manage projects, access portals, and start consultations.</p>
          <div className="mt-6 text-sm text-white/80">Already registered? Login to continue.</div>
        </div>

        <div className="bg-slate-900/70 backdrop-blur p-8 rounded-2xl shadow-lg border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold">K</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Create your account</h1>
              <p className="text-sm text-slate-400">Sign up to get started with Kreator</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 rounded p-2">
                <User className="text-slate-300" size={18} />
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full bg-transparent outline-none text-white placeholder:text-slate-500" />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 rounded p-2">
                <Mail className="text-slate-300" size={18} />
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full bg-transparent outline-none text-white placeholder:text-slate-500" />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 rounded p-2">
                <Lock className="text-slate-300" size={18} />
                <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="w-full bg-transparent outline-none text-white placeholder:text-slate-500" />
              </div>
            </label>

            <div className="flex items-center justify-between">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 rounded text-slate-900 font-semibold">Register & Login</button>
              <Link to="/login" className="text-sm text-slate-400 hover:text-white">Already have an account?</Link>
            </div>
          </form>

          {message && <p className="mt-4 text-sm text-blue-300">{message}</p>}
        </div>
      </div>
    </div>
  );
}
