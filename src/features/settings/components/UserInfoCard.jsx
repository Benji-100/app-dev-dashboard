import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const UserInfoCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Current User
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Name
          </Typography>
          <Typography variant='body1'>{user.name}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Email
          </Typography>
          <Typography variant='body1'>{user.email}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Role
          </Typography>
          <Chip
            icon={user.role === 'admin' ? <AdminIcon /> : <PersonIcon />}
            label={user.role.toUpperCase()}
            color={user.role === 'admin' ? 'error' : 'primary'}
            variant='filled'
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
