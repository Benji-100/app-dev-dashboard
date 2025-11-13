import React from 'react';
import { Grid, Box } from '@mui/material';
import { useDashboard } from '../../../dashboard/context/DashboardContext';
import CostAnalysisCard from './CostAnalysisCard';
import CostSummaryCard from './CostSummaryCard';

function AppRatMetrics() {
  const { data } = useDashboard();
  const { appRat } = data;

  return (
    <Box>
      {/* Additional Calculation Details */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <CostAnalysisCard appRat={appRat} />
          <CostSummaryCard appRat={appRat} />
        </Grid>
      </Box>
    </Box>
  );
}

export default AppRatMetrics;
