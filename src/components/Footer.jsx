import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, X } from 'lucide-react';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    bullets: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    bullets: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Integer nec odio praesent libero sed cursus ante dapibus.',
      'Nam quam nunc blandit vel luctus pulvinar hendrerit id lorem.',
      'Maecenas nec odio et ante tincidunt tempus donec vitae sapien.',
      'Aenean vulputate eleifend tellus aenean leo ligula porttitor eu.',
    ],
  },
};

export default function Footer() {
  const [activeLegal, setActiveLegal] = useState(null);

  const toggleLegalPanel = (panel) => {
    setActiveLegal((current) => (current === panel ? null : panel));
  };

  return (
    <footer className="bg-gradient-to-t from-slate-100 via-blue-50 to-white text-slate-700 py-12 border-t border-slate-200 shadow-[0_-18px_60px_rgba(15,23,42,0.08)] transition-colors dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:text-slate-100 dark:border-cyan-400/20 dark:shadow-[0_-24px_80px_rgba(8,47,73,0.35)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">kreonix.io</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Leading provider of AI/ML, Web, Android, and Cloud Database solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  AI/ML Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Android Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-200 transition">
                  Cloud Database
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://www.linkedin.com/in/kreator-io-a97621400/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition dark:text-slate-300 dark:hover:text-cyan-200">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Kreator-IO" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition dark:text-slate-300 dark:hover:text-cyan-200">
                <Github size={24} />
              </a>
              <a href="https://x.com/IoKreator26102" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition dark:text-slate-300 dark:hover:text-cyan-200">
                <Twitter size={24} />
              </a>
              <a href="mailto:Kreator_IO@proton.me" className="text-slate-600 hover:text-blue-600 transition dark:text-slate-300 dark:hover:text-cyan-200">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-slate-600 dark:text-slate-300">Kreator_IO@proton.me</p>
          </div>
        </div>

        <div className="border-t border-blue-200 pt-8 dark:border-cyan-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-slate-300">
            <p>&copy; 2026 kreonix.io. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <div className="flex gap-6">
                <div className="relative">
                  {activeLegal === 'privacy' && (
                    <div className="absolute bottom-full left-0 z-20 mb-4 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-blue-200/80 bg-white/95 p-4 text-left shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-cyan-400/20 dark:bg-slate-950/95">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 dark:text-cyan-300">Legal</p>
                          <h5 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{legalContent.privacy.title}</h5>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveLegal(null)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-cyan-200"
                          aria-label={`Close ${legalContent.privacy.title}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {legalContent.privacy.bullets.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleLegalPanel('privacy')}
                    className="hover:text-blue-600 dark:hover:text-cyan-200 transition"
                  >
                    Privacy Policy
                  </button>
                </div>

                <div className="relative">
                  {activeLegal === 'terms' && (
                    <div className="absolute bottom-full right-0 z-20 mb-4 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-blue-200/80 bg-white/95 p-4 text-left shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-cyan-400/20 dark:bg-slate-950/95">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 dark:text-cyan-300">Legal</p>
                          <h5 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{legalContent.terms.title}</h5>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveLegal(null)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-cyan-200"
                          aria-label={`Close ${legalContent.terms.title}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {legalContent.terms.bullets.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleLegalPanel('terms')}
                    className="hover:text-blue-600 dark:hover:text-cyan-200 transition"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
