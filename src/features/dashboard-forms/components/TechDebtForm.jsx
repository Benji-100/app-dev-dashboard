import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Slider,
  Box,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const TechDebtForm = () => {
  const { formData, errors, updateField } = useDashboardForms();
  const [currentSector, setCurrentSector] = React.useState('MENA');

  const handleSectorChange = (event) => {
    setCurrentSector(event.target.value);
  };

  const handlePercentageChange = (event, newValue) => {
    updateField(`techDebt.${currentSector}.reductionAchieved`, newValue);
  };

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    const fullField = `techDebt.${currentSector}.${field}`;
    if (field === 'reductionAchieved') {
      updateField(fullField, Math.min(100, Math.max(0, value)));
    } else {
      updateField(fullField, value);
    }
  };

  const handleSelectChange = (field) => (event) => {
    const fullField = `techDebt.${currentSector}.${field}`;
    updateField(fullField, event.target.value);
  };

  // Get current sector data
  const currentData = formData.techDebt?.[currentSector] || {};

  return (
    <Card>
      <CardHeader
        title='Tech Debt Reduction'
        subheader='Configure technical debt reduction metrics and object decommission scope'
      />
      <CardContent>
        {/* Sector Selection */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Sector Configuration
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Sector</InputLabel>
              <Select
                value={currentSector}
                onChange={handleSectorChange}
                label='Sector'
              >
                <MenuItem value='MENA'>MENA+</MenuItem>
                <MenuItem value='APAC'>APAC</MenuItem>
                <MenuItem value='LATAM'>LATAM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Overall Reduction Progress */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          {currentSector === 'MENA' ? 'MENA+' : currentSector} - Overall
          Progress
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>
            Reduction Achieved: {currentData?.reductionAchieved || 0}%
          </Typography>
          <Slider
            value={currentData?.reductionAchieved || 0}
            onChange={handlePercentageChange}
            min={0}
            max={100}
            step={1}
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
            sx={{ mt: 2 }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Reduction Achieved (%)'
              type='number'
              value={currentData?.reductionAchieved || 0}
              onChange={handleInputChange('reductionAchieved')}
              error={!!errors[`techDebt.${currentSector}.reductionAchieved`]}
              helperText={errors[`techDebt.${currentSector}.reductionAchieved`]}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Overall Completion (%)'
              type='number'
              value={currentData?.percentage || 0}
              onChange={handleInputChange('percentage')}
              error={!!errors[`techDebt.${currentSector}.percentage`]}
              helperText={errors[`techDebt.${currentSector}.percentage`]}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentData?.status || 'Not Started'}
                onChange={handleSelectChange('status')}
                label='Status'
              >
                <MenuItem value='Completed'>Completed</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Not Started'>Not Started</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Completion Year'
              type='number'
              value={currentData?.completionYear || new Date().getFullYear()}
              onChange={handleInputChange('completionYear')}
              error={!!errors[`techDebt.${currentSector}.completionYear`]}
              helperText={errors[`techDebt.${currentSector}.completionYear`]}
              inputProps={{ min: 2024, max: 2030 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Object Decommission Scope */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          {currentSector === 'MENA' ? 'MENA+' : currentSector} - Object
          Decommission Scope
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Completed Objects'
              type='number'
              value={currentData?.objectDecommission?.completed || 0}
              onChange={handleInputChange('objectDecommission.completed')}
              error={
                !!errors[
                  `techDebt.${currentSector}.objectDecommission.completed`
                ]
              }
              helperText={
                errors[`techDebt.${currentSector}.objectDecommission.completed`]
              }
              inputProps={{ min: 0 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Total Objects'
              type='number'
              value={currentData?.objectDecommission?.total || 0}
              onChange={handleInputChange('objectDecommission.total')}
              error={
                !!errors[`techDebt.${currentSector}.objectDecommission.total`]
              }
              helperText={
                errors[`techDebt.${currentSector}.objectDecommission.total`]
              }
              inputProps={{ min: 0 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Percentage (%)'
              type='number'
              value={currentData?.objectDecommission?.percentage || 0}
              onChange={handleInputChange('objectDecommission.percentage')}
              error={
                !!errors[
                  `techDebt.${currentSector}.objectDecommission.percentage`
                ]
              }
              helperText={
                errors[
                  `techDebt.${currentSector}.objectDecommission.percentage`
                ]
              }
              inputProps={{ min: 0, max: 100, step: 0.1 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Unused Objects Decommissioning */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          {currentSector === 'MENA' ? 'MENA+' : currentSector} - Unused Objects
          Decommissioning
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Decommissioning Percentage'
              type='number'
              value={currentData?.unusedObjectsDecommissioning?.percentage || 0}
              onChange={handleInputChange(
                'unusedObjectsDecommissioning.percentage'
              )}
              error={
                !!errors[
                  `techDebt.${currentSector}.unusedObjectsDecommissioning.percentage`
                ]
              }
              helperText={
                errors[
                  `techDebt.${currentSector}.unusedObjectsDecommissioning.percentage`
                ]
              }
              inputProps={{ min: 0, max: 100 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Decommissioning Status</InputLabel>
              <Select
                value={
                  currentData?.unusedObjectsDecommissioning?.status ||
                  'Not Started'
                }
                onChange={handleSelectChange(
                  'unusedObjectsDecommissioning.status'
                )}
                label='Decommissioning Status'
              >
                <MenuItem value='Complete'>Complete</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Not Started'>Not Started</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TechDebtForm;
