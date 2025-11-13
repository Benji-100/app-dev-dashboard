import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { TECH_DEBT_COLORS } from '../constants';
import { calculateDecommissionPercentage } from '../utils/techDebt.utils';

const ObjectDecommissionCard = ({ techDebt }) => {
  const completed = techDebt?.objectDecommission?.completed || 1884;
  const total = techDebt?.objectDecommission?.total || 6434;
  const percentage = calculateDecommissionPercentage(completed, total);
  const remaining = total - completed;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Object Decommission Scope
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2'>Progress</Typography>
            <Typography variant='body2' fontWeight='bold'>
              {completed.toLocaleString()} / {total.toLocaleString()} (
              {percentage}%)
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: TECH_DEBT_COLORS.primaryLight,
              '& .MuiLinearProgress-bar': {
                backgroundColor:
                  percentage >= 50
                    ? TECH_DEBT_COLORS.successDark
                    : TECH_DEBT_COLORS.warningDark,
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h5' color='success.main' fontWeight='bold'>
                {completed.toLocaleString()}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Decommissioned
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h5' color='warning.main' fontWeight='bold'>
                {remaining.toLocaleString()}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Remaining
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h5' color='primary.main' fontWeight='bold'>
                {total.toLocaleString()}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Total Objects
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ObjectDecommissionCard;
