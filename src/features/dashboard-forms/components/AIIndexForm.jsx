import React from 'react';
import { Card, CardContent, CardHeader, TextField, Grid } from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const AIIndexForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleAdoptionRateChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    updateField('aiIndex.adoptionRate', value);
  };

  const handleHoursSavedChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField('aiIndex.hoursSaved', value);
  };

  const handleDollarsSavedChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    updateField('aiIndex.dollarsSaved', value);
  };

  const handleUseCasesChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField('aiIndex.useCases', value);
  };

  return (
    <Card>
      <CardHeader
        title='AI Index'
        subheader='Configure AI adoption and impact metrics'
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Adoption Rate (%)'
              type='number'
              value={formData.aiIndex.adoptionRate}
              onChange={handleAdoptionRateChange}
              error={!!errors['aiIndex.adoptionRate']}
              helperText={
                errors['aiIndex.adoptionRate'] ||
                'AI adoption rate as a percentage'
              }
              fullWidth
              inputProps={{ min: 0, max: 100, step: 0.01 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Hours Saved'
              type='number'
              value={formData.aiIndex.hoursSaved}
              onChange={handleHoursSavedChange}
              error={!!errors['aiIndex.hoursSaved']}
              helperText={
                errors['aiIndex.hoursSaved'] || 'Total hours saved through AI'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Dollars Saved (in Millions)'
              type='number'
              value={formData.aiIndex.dollarsSaved}
              onChange={handleDollarsSavedChange}
              error={!!errors['aiIndex.dollarsSaved']}
              helperText={
                errors['aiIndex.dollarsSaved'] || 'Dollar savings in millions'
              }
              fullWidth
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Use Cases'
              type='number'
              value={formData.aiIndex.useCases}
              onChange={handleUseCasesChange}
              error={!!errors['aiIndex.useCases']}
              helperText={
                errors['aiIndex.useCases'] ||
                'Number of AI use cases implemented'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AIIndexForm;
