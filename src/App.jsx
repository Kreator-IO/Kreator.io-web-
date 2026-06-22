import { lazy, Suspense, useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundAnimation from './components/BackgroundAnimation';
import AIAssistantWidget from './components/AIAssistantWidget';
import LeadCaptureWidget from './components/LeadCaptureWidget';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectPortal from './pages/ProjectPortal';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import SlopScanner from './pages/SlopScanner';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PortalDashboard from './pages/portals/PortalDashboard';
import AdminPortal from './pages/portals/AdminPortal';
import ClientPortal from './pages/portals/ClientPortal/index.jsx';
import EmployeePortal from './pages/portals/EmployeePortal/index.jsx';
import ProjectManagementPortal from './pages/portals/ProjectManagementPortal/index.jsx';
import CRMPortal from './pages/portals/CRMPortal';
import SupportPortal from './pages/portals/SupportPortal';
import FinancePortal from './pages/portals/FinancePortal';
import BillingPortal from './pages/portals/BillingPortal';
import MarketingPortal from './pages/portals/MarketingPortal';
import DocumentManagementPortal from './pages/portals/DocumentManagementPortal';
import CommunicationPortal from './pages/portals/CommunicationPortal';
import AnalyticsDashboard from './pages/portals/AnalyticsDashboard';
import HRPortal from './pages/portals/HRPortal';
import PartnerPortal from './pages/portals/PartnerPortal';
import SecurityPortal from './pages/portals/SecurityPortal';
import SystemMonitorPortal from './pages/portals/SystemMonitorPortal';
import LearningPortal from './pages/portals/LearningPortal';

const ClassicHome = lazy(() => import('./pages/home-pages/ClassicHome'));

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomeRedirect() {
  return <Navigate to="/home2" replace />;
}

function PageLayout({ children }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-[#020617] text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <BackgroundAnimation />
      <Header />
      <main className="relative z-10 flex-grow">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <div className="relative z-20">
        <AIAssistantWidget />
        <LeadCaptureWidget />
      </div>
    </div>
  );
}

function PortalCodeGate({ children, storageKey }) {
  const isUnlocked = typeof window !== 'undefined' && window.sessionStorage.getItem(storageKey) === 'unlocked';

  if (!isUnlocked) {
    return <Navigate to="/portals" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
          <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="*" element={<PageLayout><ClassicHome /></PageLayout>} />
          <Route path="/classic-home" element={<PageLayout><ClassicHome /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/services" element={<PageLayout><Services /></PageLayout>} />
          <Route path="/portfolio" element={<PageLayout><Portfolio /></PageLayout>} />
          <Route path="/portfolio/:projectSlug" element={<PageLayout><ProjectPortal /></PageLayout>} />
          <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
          <Route path="/register" element={<PageLayout><Register /></PageLayout>} />
          <Route path="/pricing" element={<PageLayout><Pricing /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
          <Route path="/privacy" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
          <Route path="/terms-of-service" element={<PageLayout><TermsOfService /></PageLayout>} />
          <Route path="/terms" element={<PageLayout><TermsOfService /></PageLayout>} />
          <Route path="/slop-scanner" element={<PageLayout><SlopScanner /></PageLayout>} />
          
          <Route path="/portals" element={<ProtectedRoute allowedRoles={['Admin', 'Administrator', 'Client', 'Manager', 'Team']}><PageLayout><PortalDashboard /></PageLayout></ProtectedRoute>} />
          <Route path="/portals/admin" element={<ProtectedRoute allowedRoles={['Admin', 'Administrator']}><AdminPortal /></ProtectedRoute>} />
          <Route path="/portals/client" element={<ProtectedRoute allowedRoles={['Client']}><ClientPortal /></ProtectedRoute>} />
          <Route path="/portals/employee" element={<ProtectedRoute allowedRoles={['Team']}><PortalCodeGate storageKey="portal-it-unlocked"><EmployeePortal /></PortalCodeGate></ProtectedRoute>} />
          <Route path="/portals/project" element={<ProtectedRoute allowedRoles={['Manager']}><PortalCodeGate storageKey="portal-manager-unlocked"><ProjectManagementPortal /></PortalCodeGate></ProtectedRoute>} />
          <Route path="/portals/crm" element={<ProtectedRoute allowedRoles={['Admin', 'Administrator', 'Manager', 'Team']}><CRMPortal /></ProtectedRoute>} />
          <Route path="/portals/support" element={<ProtectedRoute allowedRoles={['__disabled__']}><SupportPortal /></ProtectedRoute>} />
          <Route path="/portals/finance" element={<ProtectedRoute allowedRoles={['__disabled__']}><FinancePortal /></ProtectedRoute>} />
          <Route path="/portals/billing" element={<ProtectedRoute allowedRoles={['Client']}><BillingPortal /></ProtectedRoute>} />
          <Route path="/portals/hr" element={<ProtectedRoute allowedRoles={['Team']}><PortalCodeGate storageKey="portal-hr-unlocked"><HRPortal /></PortalCodeGate></ProtectedRoute>} />
          <Route path="/portals/marketing" element={<ProtectedRoute allowedRoles={['__disabled__']}><MarketingPortal /></ProtectedRoute>} />
          <Route path="/portals/partner" element={<ProtectedRoute allowedRoles={['__disabled__']}><PartnerPortal /></ProtectedRoute>} />
          <Route path="/portals/security" element={<ProtectedRoute allowedRoles={['__disabled__']}><SecurityPortal /></ProtectedRoute>} />
          <Route path="/portals/monitor" element={<ProtectedRoute allowedRoles={['__disabled__']}><SystemMonitorPortal /></ProtectedRoute>} />
          <Route path="/portals/learning" element={<ProtectedRoute allowedRoles={['__disabled__']}><LearningPortal /></ProtectedRoute>} />
          <Route path="/portals/docs" element={<ProtectedRoute allowedRoles={['__disabled__']}><DocumentManagementPortal /></ProtectedRoute>} />
          <Route path="/portals/communication" element={<ProtectedRoute allowedRoles={['__disabled__']}><CommunicationPortal /></ProtectedRoute>} />
          <Route path="/portals/analytics" element={<ProtectedRoute allowedRoles={['__disabled__']}><AnalyticsDashboard /></ProtectedRoute>} />
          
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
          </Routes>
          </Suspense>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
