const permissionMap = {
  Admin: ['users:read', 'users:write', 'leads:read', 'leads:write', 'tasks:read', 'tasks:write'],
  Manager: ['leads:read', 'leads:write', 'tasks:read', 'tasks:write'],
  Team: ['leads:read', 'tasks:read', 'tasks:write'],
  Client: ['profile:read', 'profile:write']
};

export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    const permissions = permissionMap[req.user.role] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }

    next();
  };
};

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: `User role ${req.user.role} is not authorized to access this route` 
      });
    }

    next();
  };
};

export default roleMiddleware;
