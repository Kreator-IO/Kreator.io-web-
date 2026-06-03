import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import { auth } from '../firebase';
import KreonixLogo from './KreonixLogo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
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
    <header className="fixed w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800 transition-colors">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-lg transition duration-300 hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] sm:text-xl"
          aria-label="kreonix.io home"
        >
          <KreonixLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-slate-100">
          <Link
            to="/"
            className="hover:text-cyan-400 transition-all font-medium"
          >
            Home
          </Link>
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-cyan-400 transition-all font-medium">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-200">{user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-600 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="inline-flex h-12 items-center rounded-full bg-slate-800 px-6 text-lg font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-700">Login</Link>
              <Link to="/register" className="inline-flex h-12 items-center rounded-full bg-sky-400 px-7 text-lg font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-sky-300">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/"
              className="py-2 px-3 rounded-md text-slate-100 hover:bg-slate-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
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
            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-2 px-3 rounded-md bg-red-600 text-white text-center font-semibold"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="rounded-full bg-slate-800 px-5 py-3 text-center text-base font-bold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-sky-400 px-5 py-3 text-center text-base font-bold text-slate-950"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
