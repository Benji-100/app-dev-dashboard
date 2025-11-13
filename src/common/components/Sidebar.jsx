import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  // Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },

    // {
    //   label: 'SQL Analytics',
    //   path: '/sql-analytics',
    //   icon: <AnalyticsIcon />,
    // },
    // {
    //   label: 'Vulnerability Details',
    //   path: '/vulnerability-details',
    //   icon: <SecurityIcon />,
    // },
  ];

  // Add admin-only navigation items
  if (user.role === 'admin') {
    navigationItems.push({
      label: 'Data Upload',
      path: '/data-upload',
      icon: <CloudUploadIcon />,
    });
    navigationItems.push({
      label: 'Dashboard Config',
      path: '/dashboard-forms',
      icon: <SettingsIcon />,
    });

    /*
    navigationItems.push({
      label: 'Role Settings',
      path: '/role-settings',
      icon: <SettingsIcon />,
    });
    */
  }

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    onClose();
  };

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Navigation
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight:
                        location.pathname === item.path ? 'bold' : 'normal',
                      color:
                        location.pathname === item.path
                          ? 'primary.main'
                          : 'inherit',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
