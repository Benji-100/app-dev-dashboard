import { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboard } from '../context/DashboardContext';
import { generateServiceScopesData } from '../../../common/utils/dataGenerator';

export const ServiceScopesWidget = () => {
  const { data } = useDashboard();
  const [groupBy, setGroupBy] = useState('ytd');

  const { serviceScopes } = data;

  // Get the current data based on selected period
  const currentData = useMemo(
    () => serviceScopes?.[groupBy] || serviceScopes?.ytd || {},
    [groupBy, serviceScopes]
  );

  const serviceScopesData = useMemo(
    () => generateServiceScopesData(currentData),
    [currentData]
  );

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h6'>Service Scopes</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>Group By</InputLabel>
            <Select
              value={groupBy}
              label='Group By'
              onChange={handleGroupByChange}
            >
              <MenuItem value='ytd'>YTD</MenuItem>
              <MenuItem value='overall'>Overall</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Typography variant='h4' sx={{ color: serviceScopesData[0]?.color }}>
            {currentData?.ricefs?.toLocaleString() || '0'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            RICEFs
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant='h4' sx={{ color: serviceScopesData[1]?.color }}>
            {currentData?.retrofits?.toLocaleString() || '0'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Retrofits
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant='h4' sx={{ color: serviceScopesData[2]?.color }}>
            {currentData?.fioriApps?.toLocaleString() || '0'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Fiori Apps
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant='h4' sx={{ color: serviceScopesData[3]?.color }}>
            {currentData?.liveCompare?.count?.toLocaleString() || '0'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Live Compare
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
