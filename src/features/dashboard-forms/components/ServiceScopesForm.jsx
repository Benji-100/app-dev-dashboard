import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';
import { serviceScopeTypes } from '../utils/dashboardFormsUtils';

const ServiceScopesForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  const handleLiveCompareTypeChange = (period) => (event) => {
    updateField(`serviceScopes.${period}.liveCompare.type`, event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title='Service Scopes'
        subheader='Configure service scope metrics and live compare settings'
      />
      <CardContent>
        {/* YTD Section */}
        <Typography variant='h6' gutterBottom>
          YTD (Year to Date)
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='RICEFs (YTD)'
              type='number'
              value={formData.serviceScopes?.ytd?.ricefs || 0}
              onChange={handleInputChange('serviceScopes.ytd.ricefs')}
              error={!!errors['serviceScopes.ytd.ricefs']}
              helperText={
                errors['serviceScopes.ytd.ricefs'] || 'RICEF count YTD'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Fiori Apps (YTD)'
              type='number'
              value={formData.serviceScopes?.ytd?.fioriApps || 0}
              onChange={handleInputChange('serviceScopes.ytd.fioriApps')}
              error={!!errors['serviceScopes.ytd.fioriApps']}
              helperText={
                errors['serviceScopes.ytd.fioriApps'] ||
                'Fiori applications count YTD'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Retrofits (YTD)'
              type='number'
              value={formData.serviceScopes?.ytd?.retrofits || 0}
              onChange={handleInputChange('serviceScopes.ytd.retrofits')}
              error={!!errors['serviceScopes.ytd.retrofits']}
              helperText={
                errors['serviceScopes.ytd.retrofits'] || 'Retrofit count YTD'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Live Compare Count (YTD)'
              type='number'
              value={formData.serviceScopes?.ytd?.liveCompare?.count || 0}
              onChange={handleInputChange(
                'serviceScopes.ytd.liveCompare.count'
              )}
              error={!!errors['serviceScopes.ytd.liveCompare.count']}
              helperText={
                errors['serviceScopes.ytd.liveCompare.count'] ||
                'Live compare count YTD'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Live Compare Type (YTD)</InputLabel>
              <Select
                value={
                  formData.serviceScopes?.ytd?.liveCompare?.type || 'Executions'
                }
                onChange={handleLiveCompareTypeChange('ytd')}
                label='Live Compare Type (YTD)'
              >
                {serviceScopeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Overall Section */}
        <Typography variant='h6' gutterBottom>
          Overall (Cumulative)
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='RICEFs (Overall)'
              type='number'
              value={formData.serviceScopes?.overall?.ricefs || 0}
              onChange={handleInputChange('serviceScopes.overall.ricefs')}
              error={!!errors['serviceScopes.overall.ricefs']}
              helperText={
                errors['serviceScopes.overall.ricefs'] || 'RICEF count Overall'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Fiori Apps (Overall)'
              type='number'
              value={formData.serviceScopes?.overall?.fioriApps || 0}
              onChange={handleInputChange('serviceScopes.overall.fioriApps')}
              error={!!errors['serviceScopes.overall.fioriApps']}
              helperText={
                errors['serviceScopes.overall.fioriApps'] ||
                'Fiori applications count Overall'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Retrofits (Overall)'
              type='number'
              value={formData.serviceScopes?.overall?.retrofits || 0}
              onChange={handleInputChange('serviceScopes.overall.retrofits')}
              error={!!errors['serviceScopes.overall.retrofits']}
              helperText={
                errors['serviceScopes.overall.retrofits'] ||
                'Retrofit count Overall'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Live Compare Count (Overall)'
              type='number'
              value={formData.serviceScopes?.overall?.liveCompare?.count || 0}
              onChange={handleInputChange(
                'serviceScopes.overall.liveCompare.count'
              )}
              error={!!errors['serviceScopes.overall.liveCompare.count']}
              helperText={
                errors['serviceScopes.overall.liveCompare.count'] ||
                'Live compare count Overall'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Live Compare Type (Overall)</InputLabel>
              <Select
                value={
                  formData.serviceScopes?.overall?.liveCompare?.type ||
                  'Executions'
                }
                onChange={handleLiveCompareTypeChange('overall')}
                label='Live Compare Type (Overall)'
              >
                {serviceScopeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ServiceScopesForm;
