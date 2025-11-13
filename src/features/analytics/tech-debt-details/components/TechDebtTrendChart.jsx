import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { TECH_DEBT_TREND_DATA } from '../constants';

const TechDebtTrendChart = ({ techDebt }) => {
  const xLabels = TECH_DEBT_TREND_DATA.months;
  const data = TECH_DEBT_TREND_DATA.values;

  return (
    <Paper sx={{ p: 3, height: '400px' }}>
      <Typography variant='h6' gutterBottom>
        Tech Debt Reduction Trend
      </Typography>
      <LineChart
        width={undefined}
        height={300}
        series={[
          {
            data,
            label: 'Objects Decommissioned',
            area: true,
            color: '#9c27b0',
          },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[
          {
            label: 'Objects Decommissioned',
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
          },
        }}
      />
    </Paper>
  );
};

export default TechDebtTrendChart;
