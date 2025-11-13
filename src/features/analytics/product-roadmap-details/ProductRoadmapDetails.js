import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDashboard } from '../../dashboard/context/DashboardContext';

// Import components
import { RoadmapOverviewCards, RoadmapDetailsTable } from './components';

const ProductRoadmapDetails = () => {
  const { data } = useDashboard();
  const { productRoadmap } = data;

  return (
    <Box sx={{ py: 2 }}>
      {/* Overview Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Product EOL/Roadmap Overview
          </Typography>
        </Grid>

        <RoadmapOverviewCards productRoadmap={productRoadmap} />
      </Grid>

      {/* Details Table Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Roadmap Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RoadmapDetailsTable productRoadmap={productRoadmap} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductRoadmapDetails;
