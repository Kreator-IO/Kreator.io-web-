import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-100 via-blue-50 to-white text-slate-700 py-12 border-t border-slate-200 transition-colors dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:text-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">kreonix.io</h3>
            <p className="text-slate-600 dark:text-blue-100">
              Leading provider of AI/ML, Web, Android, and Cloud Database solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-600 dark:text-blue-100">
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-600 dark:hover:text-white transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-600 dark:text-blue-100">
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-white transition">
                  AI/ML Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-white transition">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-white transition">
                  Android Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-white transition">
                  Cloud Database
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://www.linkedin.com/in/kreator-io-a97621400/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-200 transition">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Kreator-IO" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-200 transition">
                <Github size={24} />
              </a>
              <a href="https://x.com/IoKreator26102" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-200 transition">
                <Twitter size={24} />
              </a>
              <a href="mailto:Kreator_IO@proton.me" className="hover:text-blue-600 dark:hover:text-blue-200 transition">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-slate-600 dark:text-blue-100">Kreator_IO@proton.me</p>
          </div>
        </div>

        <div className="border-t border-blue-200 pt-8 dark:border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-blue-100">
            <p>&copy; 2026 kreonix.io. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600 dark:hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
