import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const RoleManagementCard = ({ user, onRoleSwitch }) => {
  const handleRoleSwitch = (newRole) => {
    onRoleSwitch(newRole);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Management
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Switch between roles to test different permission levels
        </Typography>

        <Stack direction='row' spacing={2}>
          <Button
            variant={user.role === 'admin' ? 'contained' : 'outlined'}
            color='error'
            startIcon={<AdminIcon />}
            onClick={() => handleRoleSwitch('admin')}
            disabled={user.role === 'admin'}
          >
            Admin
          </Button>
          <Button
            variant={user.role === 'user' ? 'contained' : 'outlined'}
            color='primary'
            startIcon={<PersonIcon />}
            onClick={() => handleRoleSwitch('user')}
            disabled={user.role === 'user'}
          >
            User
          </Button>
        </Stack>

        <Alert severity='info' sx={{ mt: 2 }}>
          Role changes take effect immediately and will update the dashboard
          visibility.
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RoleManagementCard;
