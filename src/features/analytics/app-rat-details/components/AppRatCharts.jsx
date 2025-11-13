import React from 'react';
import { Grid } from '@mui/material';
import { useDashboard } from '../../../dashboard/context/DashboardContext';
import FinancialSummary from './FinancialSummary';

function AppRatCharts() {
  const { data } = useDashboard();
  const { appRat } = data;

  return (
    <Grid container spacing={3}>
      {/* Financial Summary */}
      <FinancialSummary appRat={appRat} />
    </Grid>
  );
}

export default AppRatCharts;
