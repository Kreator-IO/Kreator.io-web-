import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebase';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Portals', href: '/portals' },
    { label: 'Contact', href: '/contact' },
  ];

  const { user, updateUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Local/demo sessions do not always have a Firebase user to sign out.
    }

    updateUser(null);
    localStorage.removeItem('token');
  };

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-colors dark:bg-slate-900/70 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-950 font-extrabold text-2xl tracking-wider dark:text-white">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded">kreator.io</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-slate-700 dark:text-slate-100">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-cyan-400 transition-all font-medium">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <span className="text-slate-700 dark:text-slate-200">{user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-600 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition dark:bg-white/5 dark:text-white dark:hover:bg-white/10">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-t border-slate-200 dark:bg-slate-900/95 dark:border-slate-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href} 
                className="py-2 px-3 rounded-md text-slate-700 hover:bg-slate-100 transition dark:text-slate-100 dark:hover:bg-slate-800" 
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
