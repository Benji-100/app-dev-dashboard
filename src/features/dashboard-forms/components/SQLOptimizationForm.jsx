import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';
import { memoryUnits, timeUnits } from '../utils/dashboardFormsUtils';

const SQLOptimizationForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  const handleUnitChange = (field) => (event) => {
    updateField(field, event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title='SQL Optimization'
        subheader='Configure SQL query optimization metrics and performance improvements'
      />
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Query Analysis
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Queries Analyzed'
              type='number'
              value={formData.sqlOptimization.queries.analyzed}
              onChange={handleInputChange('sqlOptimization.queries.analyzed')}
              error={!!errors['sqlOptimization.queries.analyzed']}
              helperText={
                errors['sqlOptimization.queries.analyzed'] ||
                'Total queries analyzed'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Queries Dispositioned'
              type='number'
              value={formData.sqlOptimization.queries.dispositioned}
              onChange={handleInputChange(
                'sqlOptimization.queries.dispositioned'
              )}
              error={!!errors['sqlOptimization.queries.dispositioned']}
              helperText={
                errors['sqlOptimization.queries.dispositioned'] ||
                'Queries dispositioned'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='In Progress'
              type='number'
              value={formData.sqlOptimization.queries.inProgress}
              onChange={handleInputChange('sqlOptimization.queries.inProgress')}
              error={!!errors['sqlOptimization.queries.inProgress']}
              helperText={
                errors['sqlOptimization.queries.inProgress'] ||
                'Queries in progress'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Queries Optimized'
              type='number'
              value={formData.sqlOptimization.queries.optimized}
              onChange={handleInputChange('sqlOptimization.queries.optimized')}
              error={!!errors['sqlOptimization.queries.optimized']}
              helperText={
                errors['sqlOptimization.queries.optimized'] ||
                'Queries optimized'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant='h6' gutterBottom>
          Performance Improvements
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='subtitle2' gutterBottom>
              Memory Reduction
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8 }}>
                <TextField
                  label='Memory Reduction Value'
                  type='number'
                  value={
                    formData.sqlOptimization.performance.memoryReduction.value
                  }
                  onChange={handleInputChange(
                    'sqlOptimization.performance.memoryReduction.value'
                  )}
                  error={
                    !!errors[
                      'sqlOptimization.performance.memoryReduction.value'
                    ]
                  }
                  helperText={
                    errors['sqlOptimization.performance.memoryReduction.value']
                  }
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={
                      formData.sqlOptimization.performance.memoryReduction.unit
                    }
                    onChange={handleUnitChange(
                      'sqlOptimization.performance.memoryReduction.unit'
                    )}
                    label='Unit'
                  >
                    {memoryUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='subtitle2' gutterBottom>
              Execution Time Reduction
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8 }}>
                <TextField
                  label='Execution Time Reduction Value'
                  type='number'
                  value={
                    formData.sqlOptimization.performance.executionTimeReduction
                      .value
                  }
                  onChange={handleInputChange(
                    'sqlOptimization.performance.executionTimeReduction.value'
                  )}
                  error={
                    !!errors[
                      'sqlOptimization.performance.executionTimeReduction.value'
                    ]
                  }
                  helperText={
                    errors[
                      'sqlOptimization.performance.executionTimeReduction.value'
                    ]
                  }
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={
                      formData.sqlOptimization.performance
                        .executionTimeReduction.unit
                    }
                    onChange={handleUnitChange(
                      'sqlOptimization.performance.executionTimeReduction.unit'
                    )}
                    label='Unit'
                  >
                    {timeUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SQLOptimizationForm;
