import { lazy, Suspense, useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundAnimation from './components/BackgroundAnimation';
import AIAssistantWidget from './components/AIAssistantWidget';
import Home from './pages/home-pages/Home';
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
const Home4 = lazy(() => import('./pages/home-pages/Home4'));

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomeRedirect() {
  return <Navigate to="/home1" replace />;
}

const autoSwitchHomeRoutes = ['/home2', '/home1', '/home4'];

function AutoSwitchHome() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentIndex = autoSwitchHomeRoutes.indexOf(pathname);
    if (currentIndex === -1) return undefined;

    const timer = window.setTimeout(() => {
      const nextRoute = autoSwitchHomeRoutes[(currentIndex + 1) % autoSwitchHomeRoutes.length];
      navigate(nextRoute);
    }, 15000);

    return () => window.clearTimeout(timer);
  }, [navigate, pathname]);

  return null;
}

function PageLayout({ children }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white transition-colors duration-300 dark:bg-[#020617] dark:text-slate-100">
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
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <AutoSwitchHome />
          <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#020617]" />}>
          <Routes>
          <Route 
            path="/" 
            element={<HomeRedirect />}
          />
          <Route
            path="/home1"
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            }
          />
          <Route
            path="/home2"
            element={
              <PageLayout>
                <ClassicHome />
              </PageLayout>
            }
          />
          <Route
            path="/classic-home"
            element={
              <PageLayout>
                <ClassicHome />
              </PageLayout>
            }
          />
          <Route
            path="/home4"
            element={
              <PageLayout>
                <Home4 />
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
            path="/portfolio/:projectSlug"
            element={
              <PageLayout>
                <ProjectPortal />
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
            path="/privacy-policy"
            element={
              <PageLayout>
                <PrivacyPolicy />
              </PageLayout>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageLayout>
                <PrivacyPolicy />
              </PageLayout>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <PageLayout>
                <TermsOfService />
              </PageLayout>
            }
          />
          <Route
            path="/terms"
            element={
              <PageLayout>
                <TermsOfService />
              </PageLayout>
            }
          />
          <Route
            path="/slop-scanner"
            element={
              <PageLayout>
                <SlopScanner />
              </PageLayout>
            } 
          />
          <Route 
            path="/portals" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Administrator', 'Client', 'Manager', 'Team']}>
                <PageLayout>
                  <PortalDashboard />
                </PageLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/admin" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                <AdminPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/client" 
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <ClientPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/employee" 
            element={
              <ProtectedRoute allowedRoles={['Team']}>
                <EmployeePortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/project" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ProjectManagementPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/crm" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <CRMPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/support" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <SupportPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/finance" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <FinancePortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/billing" 
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <BillingPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/hr" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <HRPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/marketing" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <MarketingPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/partner" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <PartnerPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/security" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <SecurityPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/monitor" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <SystemMonitorPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/learning" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <LearningPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/docs" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <DocumentManagementPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/communication" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <CommunicationPortal />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portals/analytics" 
            element={
              <ProtectedRoute allowedRoles={['__disabled__']}>
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*" 
            element={
              <PageLayout>
                <NotFound />
              </PageLayout>
            } 
          />
          </Routes>
          </Suspense>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
