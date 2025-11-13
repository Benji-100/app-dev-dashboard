import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';

export const AIIndexWidget = () => {
  const { data } = useDashboard();

  const { aiIndex } = data;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant='h6' gutterBottom sx={{ mb: 1.5 }}>
        AI Index
      </Typography>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: 'primary.main',
              }}
            >
              {aiIndex?.adoptionRate}%
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Adoption Rate
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: 'success.main',
              }}
            >
              {aiIndex?.hoursSaved?.toLocaleString()}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Hours Saved
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: 'warning.main',
              }}
            >
              {aiIndex?.dollarsSaved}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Total Dollars Saved
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: 'info.main',
              }}
            >
              {aiIndex?.useCases}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Use Cases
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
