import React, { useMemo } from 'react';
import { LinearProgress } from '@mui/material';
import { getStatusColor } from '../../utils/dashboardUtils';

function TechDebtProgressBar({ status, percentage }) {
  const statusColor = useMemo(() => getStatusColor(status), [status]);
  switch (status) {
    case 'Completed':
      return (
        <LinearProgress
          variant='determinate'
          value={percentage}
          color={statusColor}
        />
      );
    case 'In Progress':
      return (
        <LinearProgress
          variant='indeterminate'
          value={percentage}
          color={statusColor}
        />
      );
    case 'Not Started':
      return (
        <LinearProgress
          variant='determinate'
          value={percentage}
          color={statusColor}
        />
      );
    default:
      return (
        <LinearProgress variant='determinate' value={0} color={statusColor} />
      );
  }
}

export default TechDebtProgressBar;
