import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { TECH_DEBT_COLORS } from '../constants';

const UnusedObjectsStatusCard = ({ techDebt }) => {
  const percentage = techDebt?.unusedObjectsDecommissioning?.percentage || 100;
  const status = techDebt?.unusedObjectsDecommissioning?.status || 'Complete';

  return (
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Unused Objects Decommissioning
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: TECH_DEBT_COLORS.successLight,
              borderRadius: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircle
                sx={{ color: TECH_DEBT_COLORS.successDark, fontSize: 40 }}
              />
              <Box>
                <Typography
                  variant='h4'
                  color={TECH_DEBT_COLORS.successDark}
                  fontWeight='bold'
                >
                  {percentage}%
                </Typography>
                <Typography
                  variant='body1'
                  color={TECH_DEBT_COLORS.successDark}
                >
                  Unused Objects Decommissioning
                </Typography>
              </Box>
            </Box>

            <Chip
              label={status}
              color='success'
              variant='filled'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                px: 2,
                py: 1,
              }}
            />
          </Box>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
            All unused objects have been successfully identified and
            decommissioned, resulting in improved system performance and reduced
            maintenance overhead.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UnusedObjectsStatusCard;
