import React from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { generateDecommissionPieData } from '../utils/techDebt.utils';

const DecommissionProgressChart = ({ techDebt }) => {
  const completed = techDebt?.objectDecommission?.completed || 1884;
  const total = techDebt?.objectDecommission?.total || 6434;

  const data = generateDecommissionPieData(completed, total);

  return (
    <Paper sx={{ p: 3, height: '400px' }}>
      <Typography variant='h6' gutterBottom>
        Object Decommission Progress
      </Typography>
      <PieChart
        series={[
          {
            data,
          },
        ]}
        height={300}
        colors={['#4caf50', '#ff9800']}
      />
    </Paper>
  );
};

export default DecommissionProgressChart;
