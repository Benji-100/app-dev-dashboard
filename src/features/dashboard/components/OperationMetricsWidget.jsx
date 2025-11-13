import { Box, Paper, Typography, Grid } from '@mui/material';

import { useDashboard } from '../context/DashboardContext';
import { PieChart } from '@mui/x-charts';
import { useMemo } from 'react';
import { generateOperationMetricsData } from '../../../common/utils/dataGenerator';

export const OperationMetricsWidget = () => {
  const { data } = useDashboard();

  const { operationMetrics } = data;

  const operationMetricsData = useMemo(
    () => generateOperationMetricsData(operationMetrics),
    [operationMetrics]
  );

  return (
    <Paper
      sx={{
        p: 2,
        // height: '100%'
      }}
    >
      <Typography variant='h6' gutterBottom>
        Operation Metrics - ServiceNow Request
      </Typography>
      <Box>
        <PieChart
          series={[
            {
              data: operationMetricsData,
            },
          ]}
          width={200}
          height={200}
        />
      </Box>

      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid size={{ xs: 4 }}>
          <Typography variant='h4' color='primary'>
            {operationMetrics?.created?.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Created
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant='h4' color='warning'>
            {operationMetrics?.active?.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Active
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant='h4' color='success'>
            {operationMetrics?.closed?.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Closed
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
