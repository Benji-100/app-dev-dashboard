import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const OperationMetricsForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  // Calculate completion percentage
  const completionPercent =
    formData.operationMetrics.created > 0
      ? (formData.operationMetrics.closed / formData.operationMetrics.created) *
        100
      : 0;

  const activePercent =
    formData.operationMetrics.created > 0
      ? (formData.operationMetrics.active / formData.operationMetrics.created) *
        100
      : 0;
  const closedPercent = completionPercent;

  return (
    <Card>
      <CardHeader
        title='Operation Metrics'
        subheader='Configure operational metrics and completion tracking'
      />
      <CardContent>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Created'
              type='number'
              value={formData.operationMetrics.created}
              onChange={handleInputChange('operationMetrics.created')}
              error={!!errors['operationMetrics.created']}
              helperText={
                errors['operationMetrics.created'] || 'Total items created'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Active'
              type='number'
              value={formData.operationMetrics.active}
              onChange={handleInputChange('operationMetrics.active')}
              error={!!errors['operationMetrics.active']}
              helperText={
                errors['operationMetrics.active'] || 'Currently active items'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Closed'
              type='number'
              value={formData.operationMetrics.closed}
              onChange={handleInputChange('operationMetrics.closed')}
              error={!!errors['operationMetrics.closed']}
              helperText={
                errors['operationMetrics.closed'] ||
                'Items that have been closed'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        {formData.operationMetrics.created > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant='h6' gutterBottom>
              Metrics Overview
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Created: {formData.operationMetrics.created.toLocaleString()}{' '}
                (Base)
              </Typography>
              <LinearProgress
                variant='determinate'
                value={100}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Active: {formData.operationMetrics.active.toLocaleString()} (
                {activePercent.toFixed(1)}% of created)
              </Typography>
              <LinearProgress
                variant='determinate'
                value={activePercent}
                color='warning'
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Closed: {formData.operationMetrics.closed.toLocaleString()} (
                {closedPercent.toFixed(1)}% completion rate)
              </Typography>
              <LinearProgress
                variant='determinate'
                value={closedPercent}
                color='success'
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OperationMetricsForm;
