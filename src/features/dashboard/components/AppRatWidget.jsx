import { Grid, Paper, Typography } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';
import { useNavigate } from 'react-router-dom';

export const AppRatWidget = () => {
  const { data } = useDashboard();
  const navigate = useNavigate();

  const { appRat } = data;

  const handleClick = () => {
    navigate('/app-rat-details');
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant='h6' gutterBottom>
        App Rat
      </Typography>

      {/* Total Dollar Savings - Enhanced Visual */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 2,
          textAlign: 'center',
          // background: 'transparent',
          opacity: 0.9,
        }}
      >
        <Typography
          variant='body2'
          color='success.dark'
          sx={{
            mb: 1,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          💰 Total Dollar Savings
        </Typography>
        <Typography
          variant='h4'
          color='success.main'
          sx={{
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          ${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K
        </Typography>
      </Paper>
      {/* Platform Details */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 1, fontWeight: 500 }}
          >
            SAP Mobile Platform
          </Typography>
          <Typography variant='h6' color='warning.main' sx={{ mb: 1 }}>
            $
            {(
              (appRat?.sapMobilePlatform?.yearlyMaintenance || 0) / 1000
            ).toFixed(0)}
            K
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Decommissioned Instances
          </Typography>
          <Typography
            variant='body2'
            color='error.main'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 500,
            }}
          >
            📱 {appRat?.sapMobilePlatform?.decommissionedInstances || 0}{' '}
            instances
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 1, fontWeight: 500 }}
          >
            SAP CE Portal
          </Typography>
          <Typography variant='h6' color='info.main' sx={{ mb: 1 }}>
            ${((appRat?.sapCEPortal?.computeCost || 0) / 1000).toFixed(0)}K
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Decommissioned Instances
          </Typography>
          <Typography
            variant='body2'
            color='error.main'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 500,
            }}
          >
            🖥️ {appRat?.sapCEPortal?.decommissionedInstances || 0} instances
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
