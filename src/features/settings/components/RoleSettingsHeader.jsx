import React from 'react';
import { Typography, Box } from '@mui/material';

const RoleSettingsHeader = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h4' gutterBottom>
        Role Settings
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Manage role-based authentication and user permissions
      </Typography>
    </Box>
  );
};

export default RoleSettingsHeader;
