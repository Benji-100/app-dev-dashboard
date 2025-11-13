import React from 'react';
import { Box, Typography } from '@mui/material';
import TechDebtProgressBar from './TechDebtProgressBar';

function TechDebtReductionProgress({ status, percentage, reductionAchieved }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          flex: 1,
          height: 8,
        }}
      >
        <TechDebtProgressBar status={status} percentage={percentage} />
      </Box>

      {/* Achievement percentage with context */}
      <Box sx={{ textAlign: 'right', minWidth: '60px' }}>
        <Typography
          variant='caption'
          sx={{
            fontWeight: 600,
          }}
        >
          {reductionAchieved || 0}%
        </Typography>
        <Typography
          variant='caption'
          sx={{
            display: 'block',
            fontSize: '9px',
            color: 'text.secondary',
            lineHeight: 1,
          }}
        >
          reduction achieved
        </Typography>
      </Box>
    </Box>
  );
}

export default TechDebtReductionProgress;
