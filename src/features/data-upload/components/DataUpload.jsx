import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { DataUploadProvider } from '../context/DataUploadContext';
import FileUploadSection from './FileUploadSection';
import ConversionResultsSection from './ConversionResultsSection';

const DataUploadContent = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Data Upload & Conversion
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Upload Excel files (.xlsx, .xls) or CSV files and convert them to JSON
        format for dashboard integration.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FileUploadSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ConversionResultsSection />
        </Grid>
      </Grid>
    </Box>
  );
};

const DataUpload = () => {
  return (
    <DataUploadProvider>
      <DataUploadContent />
    </DataUploadProvider>
  );
};

export default DataUpload;
