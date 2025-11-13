import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboard } from '../../dashboard/context/DashboardContext';

// Import components
import {
  RegionMetricCard,
  ObjectDecommissionCard,
  UnusedObjectsStatusCard,
  DecommissionProgressChart,
  TechDebtTrendChart,
  RegionalBreakdownChart,
} from './components';

const TechDebtDetails = () => {
  const { data } = useDashboard();
  const { techDebt } = data;
  const [selectedSector, setSelectedSector] = useState('MENA');

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  // Filter data based on selected sector
  const currentSectorData =
    techDebt?.[selectedSector] || techDebt?.['MENA'] || {};

  return (
    <Box sx={{ py: 2 }}>
      {/* Header with Sector Selector */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Tech Debt Details
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sector</InputLabel>
          <Select
            value={selectedSector}
            label='Sector'
            onChange={handleSectorChange}
          >
            <MenuItem value='MENA'>MENA+</MenuItem>
            <MenuItem value='LATAM'>LATAM</MenuItem>
            <MenuItem value='APAC'>APAC</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Key Metrics
          </Typography>
        </Grid>

        <Grid container size={{ xs: 12 }} spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <RegionMetricCard sector={selectedSector} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <ObjectDecommissionCard
              techDebt={currentSectorData}
              sector={selectedSector}
            />
          </Grid>
        </Grid>

        <UnusedObjectsStatusCard
          techDebt={currentSectorData}
          sector={selectedSector}
        />
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Visualization & Analytics -{' '}
            {selectedSector === 'MENA' ? 'MENA+' : selectedSector}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DecommissionProgressChart
            techDebt={currentSectorData}
            sector={selectedSector}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TechDebtTrendChart
            techDebt={currentSectorData}
            sector={selectedSector}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <RegionalBreakdownChart
            techDebt={techDebt}
            selectedSector={selectedSector}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TechDebtDetails;
