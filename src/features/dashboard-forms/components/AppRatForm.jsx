import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const AppRatForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  const calculatePercentage = () => {
    const base = formData.appRat?.sapMobilePlatform?.maintenanceBase || 0;
    const yearly = formData.appRat?.sapMobilePlatform?.yearlyMaintenance || 0;
    if (base > 0) {
      return ((yearly / base) * 100).toFixed(2);
    }
    return '0.00';
  };

  return (
    <Card>
      <CardHeader
        title='App Rationalization (AppRat)'
        subheader='Configure application rationalization savings and cost metrics'
      />
      <CardContent>
        <Grid container spacing={3}>
          {/* Total Savings Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                Total Financial Impact
              </Typography>
            </Box>
            <TextField
              label='Total Savings ($)'
              type='number'
              value={formData.appRat?.totalSavings || 0}
              onChange={handleInputChange('appRat.totalSavings')}
              error={!!errors['appRat.totalSavings']}
              helperText={
                errors['appRat.totalSavings'] ||
                'Total cost savings achieved in dollars'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* SAP Mobile Platform Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                SAP Mobile Platform Costs
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Maintenance Base ($)'
              type='number'
              value={formData.appRat?.sapMobilePlatform?.maintenanceBase || 0}
              onChange={handleInputChange(
                'appRat.sapMobilePlatform.maintenanceBase'
              )}
              error={!!errors['appRat.sapMobilePlatform.maintenanceBase']}
              helperText={
                errors['appRat.sapMobilePlatform.maintenanceBase'] ||
                'Total maintenance base cost'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Yearly Maintenance ($)'
              type='number'
              value={formData.appRat?.sapMobilePlatform?.yearlyMaintenance || 0}
              onChange={handleInputChange(
                'appRat.sapMobilePlatform.yearlyMaintenance'
              )}
              error={!!errors['appRat.sapMobilePlatform.yearlyMaintenance']}
              helperText={
                errors['appRat.sapMobilePlatform.yearlyMaintenance'] ||
                'Annual maintenance cost'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Percentage Value (%)'
              value={calculatePercentage()}
              error={!!errors['appRat.sapMobilePlatform.percentageValue']}
              helperText='Calculated as (Yearly Maintenance / Maintenance Base) × 100'
              fullWidth
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Decommissioned Instances'
              type='number'
              value={
                formData.appRat?.sapMobilePlatform?.decommissionedInstances || 0
              }
              onChange={handleInputChange(
                'appRat.sapMobilePlatform.decommissionedInstances'
              )}
              error={
                !!errors['appRat.sapMobilePlatform.decommissionedInstances']
              }
              helperText={
                errors['appRat.sapMobilePlatform.decommissionedInstances'] ||
                'Number of instances decommissioned'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* SAP CE Portal Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                SAP CE Portal Infrastructure
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Compute Cost ($)'
              type='number'
              value={formData.appRat?.sapCEPortal?.computeCost || 0}
              onChange={handleInputChange('appRat.sapCEPortal.computeCost')}
              error={!!errors['appRat.sapCEPortal.computeCost']}
              helperText={
                errors['appRat.sapCEPortal.computeCost'] ||
                'Annual compute infrastructure cost'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Decommissioned Instances'
              type='number'
              value={formData.appRat?.sapCEPortal?.decommissionedInstances || 0}
              onChange={handleInputChange(
                'appRat.sapCEPortal.decommissionedInstances'
              )}
              error={!!errors['appRat.sapCEPortal.decommissionedInstances']}
              helperText={
                errors['appRat.sapCEPortal.decommissionedInstances'] ||
                'Number of instances decommissioned'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* License Reduction Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                License Reduction
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Savings Amount ($)'
              type='number'
              value={formData.appRat?.licenseReduction?.savingsAmount || 0}
              onChange={handleInputChange(
                'appRat.licenseReduction.savingsAmount'
              )}
              error={!!errors['appRat.licenseReduction.savingsAmount']}
              helperText={
                errors['appRat.licenseReduction.savingsAmount'] ||
                'Total savings from license reduction'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Licenses Reduced'
              type='number'
              value={formData.appRat?.licenseReduction?.licensesReduced || 0}
              onChange={handleInputChange(
                'appRat.licenseReduction.licensesReduced'
              )}
              error={!!errors['appRat.licenseReduction.licensesReduced']}
              helperText={
                errors['appRat.licenseReduction.licensesReduced'] ||
                'Number of licenses reduced'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Summary Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 2, p: 2, borderRadius: 1 }}>
              <Typography variant='h6' gutterBottom>
                Financial Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Total Savings: $
                    {(formData.appRat?.totalSavings || 0).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Mobile Platform (Yearly): $
                    {(
                      formData.appRat?.sapMobilePlatform?.yearlyMaintenance || 0
                    ).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant='body2' color='text.secondary'>
                    CE Portal Cost: $
                    {(
                      formData.appRat?.sapCEPortal?.computeCost || 0
                    ).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant='body2' color='text.secondary'>
                    License Reduction: $
                    {(
                      formData.appRat?.licenseReduction?.savingsAmount || 0
                    ).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AppRatForm;
