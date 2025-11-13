import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useDashboard } from '../../../dashboard/context/DashboardContext';

const RegionMetricCard = ({ sector }) => {
  const { data } = useDashboard();
  const sectorData = data?.techDebt?.[sector] || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Not Started':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant='h6' gutterBottom color='primary'>
            {sector === 'MENA' ? 'MENA+' : sector} Region
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant='h3' fontWeight='bold' color='success.main'>
              {sectorData.reductionAchieved || 0}%
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Reduction Achieved
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Overall Completion: {sectorData.percentage || 0}%
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Target Year: {sectorData.completionYear || 'TBD'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Chip
            label={sectorData.status || 'Unknown'}
            color={getStatusColor(sectorData.status)}
            size='medium'
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegionMetricCard;
