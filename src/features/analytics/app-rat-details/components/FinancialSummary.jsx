import React from 'react';
import { Grid, Paper, Typography, Box, Divider } from '@mui/material';
import { SUMMARY_COLORS } from '../constants';

const FinancialSummary = ({ appRat }) => {
  const totalDecommissionedInstances =
    (appRat?.sapMobilePlatform?.decommissionedInstances || 0) +
    (appRat?.sapCEPortal?.decommissionedInstances || 0);

  const summaryMetrics = [
    {
      value: `$${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K`,
      label: '💰 Total Annual Savings',
      bgColor: SUMMARY_COLORS.successLight,
      textColor: SUMMARY_COLORS.successDark,
      icon: '💰',
    },
    {
      value: `${appRat?.sapMobilePlatform?.percentageValue || 0}%`,
      label: '📊 Maintenance Cost Ratio',
      bgColor: SUMMARY_COLORS.primaryLight,
      textColor: SUMMARY_COLORS.primaryDark,
      icon: '📊',
    },
    {
      value: `${totalDecommissionedInstances}`,
      label: '🗂️ Total Decommissioned Instances',
      bgColor: SUMMARY_COLORS.warningLight,
      textColor: SUMMARY_COLORS.warningDark,
      icon: '🗂️',
    },
  ];

  const platformBreakdown = [
    {
      platform: 'SAP Mobile Platform',
      cost: `$${(
        (appRat?.sapMobilePlatform?.yearlyMaintenance || 0) / 1000
      ).toFixed(0)}K`,
      instances: `${
        appRat?.sapMobilePlatform?.decommissionedInstances || 0
      } instances`,
      icon: '📱',
      color: 'warning.main',
    },
    {
      platform: 'SAP CE Portal',
      cost: `$${((appRat?.sapCEPortal?.computeCost || 0) / 1000).toFixed(0)}K`,
      instances: `${
        appRat?.sapCEPortal?.decommissionedInstances || 0
      } instances`,
      icon: '🖥️',
      color: 'info.main',
    },
    {
      platform: 'License Reduction',
      cost: `$${((appRat?.licenseReduction?.savingsAmount || 0) / 1000).toFixed(
        0
      )}K`,
      instances: `${appRat?.licenseReduction?.licensesReduced || 0} licenses`,
      icon: '📄',
      color: 'success.main',
    },
  ];

  return (
    <Grid size={{ xs: 12 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Financial Summary & Key Metrics
        </Typography>

        {/* Summary Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryMetrics.map((metric, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: metric.bgColor,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: metric.bgColor,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Typography
                  variant='h3'
                  color={metric.textColor}
                  sx={{ mb: 1 }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant='body2'
                  color={metric.textColor}
                  sx={{ fontWeight: 500 }}
                >
                  {metric.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Platform Breakdown */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Platform-wise Breakdown
        </Typography>
        <Grid container spacing={2}>
          {platformBreakdown.map((platform, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  {platform.icon} {platform.platform}
                </Typography>
                <Typography
                  variant='h5'
                  color={platform.color}
                  fontWeight='bold'
                  sx={{ mb: 0.5 }}
                >
                  {platform.cost}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {platform.instances}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FinancialSummary;
