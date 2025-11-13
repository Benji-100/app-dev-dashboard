import { Box, Typography, Chip } from '@mui/material';
import TechDebtReductionProgress from './TechDebtReductionProgress';
import { useMemo } from 'react';
import { getStatusColor } from '../../utils/dashboardUtils';

export const TechDebtAchievement = ({ sector, data }) => {
  const statusColor = useMemo(() => getStatusColor(data.status), [data.status]);
  console.log('TechDebtAchievement Data:', data);

  return (
    <Box>
      {/* Sector header with status and year */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {sector === 'MENA' ? 'MENA+' : sector}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            ({data.completionYear || 'TBD'})
          </Typography>
        </Box>
        <Chip
          label={data.status}
          color={statusColor}
          size='small'
          sx={{ fontSize: '0.65rem', height: '18px' }}
        />
      </Box>

      <TechDebtReductionProgress
        status={data.status}
        reductionAchieved={data.reductionAchieved}
        percentage={data.percentage}
      />
    </Box>
  );
};

export default TechDebtAchievement;
