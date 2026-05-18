// Portal Routes Configuration
export const portalRoutes = {
  employee: {
    path: '/portals/employee',
    title: 'Employee Portal',
    children: {
      hr: {
        path: '/hr-portal',
        title: 'HR Portal',
        children: {
          documents: '/document-management',
          marketing: '/marketing-portal',
        }
      },
      it: {
        path: '/it-employee-portal',
        title: 'IT Employee Portal',
        children: {
          security: '/security-portal',
          learning: '/learning-portal',
        }
      }
    }
  },
  client: {
    path: '/portals/client',
    title: 'Client Portal',
    children: {
      billing: {
        path: '/billing-portal',
        title: 'Billing Portal'
      },
      chat: {
        path: '/chat-portal',
        title: 'Chat Portal'
      },
      
    }
  },
  projectManagement: {
    path: '/portals/project',
    title: 'Project Management Portal',
    children: {
      crm: {
        path: '/crm-portal',
        title: 'CRM Portal'
      },
      finance: {
        path: '/finance-portal',
        title: 'Finance Portal'
      },
      communication: {
        path: '/communication-portal',
        title: 'Communication Portal'
      },
      
    }
  }
};

export const getAllPortals = () => {
  return [
    { id: 'employee', name: 'Employee Portal', path: portalRoutes.employee.path, icon: '👤' },
    { id: 'client', name: 'Client Portal', path: portalRoutes.client.path, icon: '🏢' },
    { id: 'projectManagement', name: 'Project Management', path: portalRoutes.projectManagement.path, icon: '📊' },
  ];
};
