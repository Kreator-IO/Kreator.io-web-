import { useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
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

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route 
            path="/" 
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <PageLayout>
                <About />
              </PageLayout>
            } 
          />
          <Route 
            path="/services" 
            element={
              <PageLayout>
                <Services />
              </PageLayout>
            } 
          />
          <Route 
            path="/portfolio" 
            element={
              <PageLayout>
                <Portfolio />
              </PageLayout>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PageLayout>
                <Login />
              </PageLayout>
            }
          />
          <Route 
            path="/register" 
            element={
              <PageLayout>
                <Register />
              </PageLayout>
            }
          />
          <Route 
            path="/pricing" 
            element={
              <PageLayout>
                <Pricing />
              </PageLayout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PageLayout>
                <Contact />
              </PageLayout>
            } 
          />
          <Route 
            path="/portals" 
            element={
              <ProtectedRoute>
                <PageLayout>
                  <PortalDashboard />
                </PageLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/admin" 
            element={
              <ProtectedRoute>
                <AdminPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/client" 
            element={
              <ProtectedRoute>
                <ClientPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/employee" 
            element={
              <ProtectedRoute>
                <EmployeePortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/project" 
            element={
              <ProtectedRoute>
                <ProjectManagementPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/crm" 
            element={
              <ProtectedRoute>
                <CRMPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/support" 
            element={
              <ProtectedRoute>
                <SupportPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/finance" 
            element={
              <ProtectedRoute>
                <FinancePortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/billing" 
            element={
              <ProtectedRoute>
                <BillingPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/hr" 
            element={
              <ProtectedRoute>
                <HRPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/marketing" 
            element={
              <ProtectedRoute>
                <MarketingPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/partner" 
            element={
              <ProtectedRoute>
                <PartnerPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/security" 
            element={
              <ProtectedRoute>
                <SecurityPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/monitor" 
            element={
              <ProtectedRoute>
                <SystemMonitorPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/learning" 
            element={
              <ProtectedRoute>
                <LearningPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/docs" 
            element={
              <ProtectedRoute>
                <DocumentManagementPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/communication" 
            element={
              <ProtectedRoute>
                <CommunicationPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*" 
            element={
              <PageLayout>
                <div className="pt-60 pb-80 text-center">
                  <h1 className="text-9xl font-black text-white/5 absolute left-1/2 -top-20 -translate-x-1/2 select-none pointer-events-none">404</h1>
                  <h2 className="text-6xl font-bold text-white mb-6 relative z-10">Lost in the Matrix?</h2>
                  <p className="text-slate-400 text-xl mb-12 relative z-10">The digital coordinate you're looking for doesn't exist.</p>
                  <a href="/" className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl relative z-10">Back to Origin</a>
                </div>
              </PageLayout>
            } 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
