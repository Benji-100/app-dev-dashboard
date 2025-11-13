import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useDashboard } from '../../../dashboard/context/DashboardContext';
import AppRatMetrics from './AppRatMetrics';
import AppRatCharts from './AppRatCharts';

function AppRatDetails() {
  const { data } = useDashboard();
  const { appRat } = data;

  return (
    <Box sx={{ py: 2 }}>
      {/* Header with Total Dollar Savings - Enhanced */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
          border: '1px solid',
          borderColor: 'success.light',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant='body1'
          color='success.dark'
          sx={{
            mb: 2,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          💰 App Rat - Total Dollar Savings Overview
        </Typography>
        <Typography
          variant='h2'
          color='success.main'
          sx={{
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            mb: 1,
          }}
        >
          ${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K
        </Typography>
        <Typography variant='h6' color='success.dark' sx={{ opacity: 0.8 }}>
          Annual Cost Savings from Application Rationalization
        </Typography>
      </Paper>

      {/* App Rat Charts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
          Cost Analytics & Savings Visualization
        </Typography>
        <AppRatCharts />
      </Box>

      {/* App Rat Metrics - Financial Overview */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
          Detailed Financial Metrics
        </Typography>
        <AppRatMetrics />
      </Box>
    </Box>
  );
}

export default AppRatDetails;
