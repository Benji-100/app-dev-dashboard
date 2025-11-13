import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState({
    id: '1',
    name: 'Ajay Girija',
    email: 'ajay.girija@company.com',
    role: 'admin', // 'admin' or 'user'
  });

  // Define permissions based on role
  const permissions = {
    admin: {
      canViewTechDebt: true,
      canViewVulnerabilities: true,
      canViewSQLOptimization: true,
      canViewAppRat: true,
      canViewServiceScopes: true,
      canViewAIIndex: true,
      canViewProductRoadmap: true,
      canViewOperationMetrics: true,
    },
    user: {
      canViewTechDebt: false,
      canViewVulnerabilities: false,
      canViewSQLOptimization: false,
      canViewAppRat: true,
      canViewServiceScopes: true,
      canViewAIIndex: true, // Hidden for regular users
      canViewProductRoadmap: false, // Hidden for regular users
      canViewOperationMetrics: false, // Hidden for regular users
    },
  };

  const userPermissions = permissions[user.role] || permissions.user;

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const value = {
    user,
    permissions: userPermissions,
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
