import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';

const CostAnalysisCard = ({ appRat }) => {
  const maintenanceBase = appRat?.sapMobilePlatform?.maintenanceBase || 0;
  const yearlyMaintenance = appRat?.sapMobilePlatform?.yearlyMaintenance || 0;
  const percentageValue = appRat?.sapMobilePlatform?.percentageValue || 0;
  const licenseReduction = appRat?.licenseReduction || {};

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom color='primary'>
            Detailed Cost Analysis
          </Typography>

          {/* SAP Mobile Platform Analysis */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
              SAP Mobile Platform
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Typography variant='body2'>Maintenance Base:</Typography>
                <Typography variant='body2' fontWeight='bold'>
                  ${(maintenanceBase / 1000).toFixed(0)}K
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2'>Yearly Cost:</Typography>
                <Typography
                  variant='body2'
                  fontWeight='bold'
                  color='warning.main'
                >
                  ${(yearlyMaintenance / 1000).toFixed(0)}K
                </Typography>
              </Box>

              {/* Progress Bar for Cost Ratio */}
              <Box sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5,
                  }}
                >
                  <Typography variant='caption'>Cost Ratio</Typography>
                  <Typography variant='caption' fontWeight='bold'>
                    {percentageValue}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={Math.min(percentageValue, 100)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        percentageValue > 20 ? 'warning.main' : 'success.main',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* License Reduction Section */}
          <Box
            sx={{
              p: 2,
              backgroundColor: 'info.light',
              borderRadius: 1,
              opacity: 0.9,
            }}
          >
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
              License Reduction Impact
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant='body2'>Licenses Reduced:</Typography>
              <Chip
                label={`${licenseReduction.licensesReduced || 0} licenses`}
                size='small'
                color='info'
                variant='filled'
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body2'>Additional Savings:</Typography>
              <Typography variant='body2' fontWeight='bold'>
                ${((licenseReduction.savingsAmount || 0) / 1000).toFixed(0)}K
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CostAnalysisCard;
