import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const CostSummaryCard = ({ appRat }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom color='primary'>
            Platform Cost Summary
          </Typography>

          {/* SAP Mobile Platform Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
              SAP Mobile Platform
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant='body2'>Annual Cost:</Typography>
              <Typography
                variant='body2'
                fontWeight='bold'
                color='warning.main'
              >
                $
                {(
                  (appRat?.sapMobilePlatform?.yearlyMaintenance || 0) / 1000
                ).toFixed(0)}
                K
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2'>Decommissioned:</Typography>
              <Typography
                variant='body2'
                color='error.main'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                📱 {appRat?.sapMobilePlatform?.decommissionedInstances || 0}{' '}
                instances
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* SAP CE Portal Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
              SAP CE Portal
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant='body2'>Compute Cost:</Typography>
              <Typography variant='body2' fontWeight='bold' color='info.main'>
                ${((appRat?.sapCEPortal?.computeCost || 0) / 1000).toFixed(0)}K
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2'>Decommissioned:</Typography>
              <Typography
                variant='body2'
                color='error.main'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                🖥️ {appRat?.sapCEPortal?.decommissionedInstances || 0} instances
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Total Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
              backgroundColor: 'success.light',
              borderRadius: 1,
              opacity: 0.9,
            }}
          >
            <Typography variant='body1' fontWeight='bold'>
              Total Savings:
            </Typography>
            <Typography variant='body1' fontWeight='bold'>
              ${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CostSummaryCard;
