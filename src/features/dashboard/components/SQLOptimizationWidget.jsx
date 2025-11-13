import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';
import { useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from 'react-router-dom';

import { generateSQLQueryData } from '../../../common/utils/dataGenerator';

const donutSettings = {
  margin: { right: 5 },
  width: 180,
  height: 150,
};

export const SQLOptimizationWidget = () => {
  const { data } = useDashboard();
  const navigate = useNavigate();

  const { sqlOptimization } = data;

  const sqlQueryData = useMemo(
    () => generateSQLQueryData(sqlOptimization.queries),
    [sqlOptimization.queries]
  );

  const handleClick = () => {
    navigate('/sql-analytics');
  };

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
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
      <Typography variant='h6' gutterBottom sx={{ mb: 1 }}>
        Expensive SQL Optimization
      </Typography>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <PieChart
          series={[
            {
              innerRadius: 40,
              outerRadius: 70,
              data: sqlQueryData,
              arcLabel: 'value',
            },
          ]}
          {...donutSettings}
        />
        {/* Center overlay for Total Analyzed */}
        <Box
          sx={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant='h4'
            color='primary'
            sx={{ lineHeight: 1, fontWeight: 'bold' }}
          >
            {sqlOptimization?.queries?.analyzed || 0}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ fontSize: '0.7rem' }}
          >
            Analyzed
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={2} sx={{ mt: 'auto' }}>
        <Grid size={{ xs: 6 }}>
          {/* <Typography variant='h4' sx={{ lineHeight: 1 }}>
            {sqlOptimization?.performance?.memoryReduction?.value}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Memory Usage Reduction/day
          </Typography>
          <Typography variant='caption' color='text.secondary' display='block'>
            {sqlOptimization?.performance?.memoryReduction?.unit}
          </Typography> */}
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant='h4' sx={{ lineHeight: 1 }}>
            {sqlOptimization?.performance?.executionTimeReduction?.value}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Execution Time Reduction/day
          </Typography>
          <Typography variant='caption' color='text.secondary' display='block'>
            {sqlOptimization?.performance?.executionTimeReduction?.unit}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
