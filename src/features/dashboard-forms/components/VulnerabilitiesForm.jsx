import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const VulnerabilitiesForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  return (
    <Card>
      <CardHeader
        title='Vulnerabilities'
        subheader='Configure vulnerability analysis and remediation metrics'
      />
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Custom Code Vulnerabilities
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Detected'
              type='number'
              value={formData.vulnerabilities.customCode.detected}
              onChange={handleInputChange(
                'vulnerabilities.customCode.detected'
              )}
              error={!!errors['vulnerabilities.customCode.detected']}
              helperText={
                errors['vulnerabilities.customCode.detected'] ||
                'Vulnerabilities detected'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Remediated'
              type='number'
              value={formData.vulnerabilities.customCode.remediated}
              onChange={handleInputChange(
                'vulnerabilities.customCode.remediated'
              )}
              error={!!errors['vulnerabilities.customCode.remediated']}
              helperText={
                errors['vulnerabilities.customCode.remediated'] ||
                'Vulnerabilities remediated'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Remaining'
              type='number'
              value={formData.vulnerabilities.customCode.remaining}
              onChange={handleInputChange(
                'vulnerabilities.customCode.remaining'
              )}
              error={!!errors['vulnerabilities.customCode.remaining']}
              helperText={
                errors['vulnerabilities.customCode.remaining'] ||
                'Vulnerabilities remaining'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant='h6' gutterBottom>
          SAP Portal Vulnerabilities
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Total'
              type='number'
              value={formData.vulnerabilities.sapPortal.total}
              onChange={handleInputChange('vulnerabilities.sapPortal.total')}
              error={!!errors['vulnerabilities.sapPortal.total']}
              helperText={
                errors['vulnerabilities.sapPortal.total'] ||
                'Total vulnerabilities'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Remediated'
              type='number'
              value={formData.vulnerabilities.sapPortal.remediated}
              onChange={handleInputChange(
                'vulnerabilities.sapPortal.remediated'
              )}
              error={!!errors['vulnerabilities.sapPortal.remediated']}
              helperText={
                errors['vulnerabilities.sapPortal.remediated'] ||
                'Vulnerabilities remediated'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Remaining'
              type='number'
              value={formData.vulnerabilities.sapPortal.remaining}
              onChange={handleInputChange(
                'vulnerabilities.sapPortal.remaining'
              )}
              error={!!errors['vulnerabilities.sapPortal.remaining']}
              helperText={
                errors['vulnerabilities.sapPortal.remaining'] ||
                'Vulnerabilities remaining'
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

export default VulnerabilitiesForm;
