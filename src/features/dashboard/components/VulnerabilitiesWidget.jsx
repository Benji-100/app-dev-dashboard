import { Box, Paper, Typography, Grid } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';
import { useNavigate } from 'react-router-dom';

import { useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

import { generateVulnerabilityData } from '../../../common/utils/dataGenerator';

const chartSettings = {
  width: 160,
  height: 100,
};

export const VulnerabilitiesWidget = () => {
  const { data } = useDashboard();
  const navigate = useNavigate();

  const { vulnerabilities } = data;
  const vulnerabilityData = useMemo(
    () => generateVulnerabilityData(vulnerabilities),
    [vulnerabilities]
  );

  const handleClick = () => {
    navigate('/vulnerability-details');
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant='h6' gutterBottom>
        Vulnerabilities
      </Typography>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Custom Code Vulnerabilities Row */}
        <Box>
          <Typography variant='body2' color='text.secondary'>
            Custom Code Vulnerabilities
          </Typography>
          <Grid container spacing={0.5} alignItems='center'>
            <Grid size={{ xs: 12, sm: 6 }}>
              {/* Horizontal layout for metrics */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant='h4' color='primary'>
                    {vulnerabilities?.customCode?.detected}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Total
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h4' color='success.main'>
                    {vulnerabilities?.customCode?.remediated}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Remediated
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h4' color='warning.main'>
                    {vulnerabilities?.customCode?.remaining}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Remaining
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      startAngle: -90,
                      endAngle: 90,
                      paddingAngle: 3,
                      innerRadius: 35,
                      outerRadius: 55,
                      cy: '75%',
                      data: vulnerabilityData.customCode,
                    },
                  ]}
                  {...chartSettings}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* SAP Portal Vulnerabilities Row */}
        <Box>
          <Typography variant='body2' color='text.secondary'>
            SAP Portal Vulnerabilities
          </Typography>
          <Grid container spacing={0.5} alignItems='center'>
            <Grid size={{ xs: 12, sm: 6 }}>
              {/* Horizontal layout for metrics */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant='h4' color='primary'>
                    {vulnerabilities?.sapPortal?.total}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Total
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h4' color='success.main'>
                    {vulnerabilities?.sapPortal?.remediated}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Remediated
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h4' color='warning.main'>
                    {vulnerabilities?.sapPortal?.remaining}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Remaining
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      startAngle: -90,
                      endAngle: 90,
                      paddingAngle: 3,
                      innerRadius: 35,
                      outerRadius: 55,
                      cy: '75%',
                      data: vulnerabilityData.sapPortal,
                    },
                  ]}
                  {...chartSettings}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
