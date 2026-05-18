import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Portals', href: '/portals' },
    { label: 'Contact', href: '/contact' },
  ];

  const { user, updateUser } = useContext(UserContext);

  const handleLogout = () => updateUser(null);

  return (
    <header className="fixed w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white font-extrabold text-2xl tracking-wider">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded">kreator.io</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-slate-100">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-cyan-400 transition-all font-medium">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-200">{user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-600 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href} 
                className="py-2 px-3 rounded-md text-slate-100 hover:bg-slate-800 transition" 
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 text-center font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
