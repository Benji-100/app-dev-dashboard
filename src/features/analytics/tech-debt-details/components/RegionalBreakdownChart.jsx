import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const RegionalBreakdownChart = ({ techDebt }) => {
  // Prepare data from actual techDebt prop
  const regions = Object.keys(techDebt || {}).map((sector) =>
    sector === 'MENA' ? 'MENA+' : sector
  );

  const reductionAchieved = Object.values(techDebt || {}).map(
    (sector) => sector.reductionAchieved || 0
  );

  const overallCompletion = Object.values(techDebt || {}).map(
    (sector) => sector.percentage || 0
  );

  const decommissionProgress = Object.values(techDebt || {}).map(
    (sector) => sector.objectDecommission?.percentage || 0
  );

  return (
    <Paper sx={{ p: 3, height: '450px' }}>
      <Typography variant='h6' gutterBottom>
        Regional Breakdown - Tech Debt Metrics
      </Typography>
      <BarChart
        width={undefined}
        height={350}
        series={[
          {
            data: reductionAchieved,
            label: 'Reduction Achieved (%)',
            color: '#2196f3',
          },
          {
            data: overallCompletion,
            label: 'Overall Completion (%)',
            color: '#4caf50',
          },
          {
            data: decommissionProgress,
            label: 'Decommission Progress (%)',
            color: '#ff9800',
          },
        ]}
        xAxis={[
          {
            data: regions,
            scaleType: 'band',
            label: 'Region',
          },
        ]}
        yAxis={[
          {
            max: 100,
            label: 'Percentage (%)',
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

export default RegionalBreakdownChart;
