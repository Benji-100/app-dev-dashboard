import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { TechDebtAchievement } from './TechDebtAchievement';

export const TechDebtWidget = () => {
  const { data } = useDashboard();
  const { techDebt } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tech-debt-details');
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant='h6' gutterBottom sx={{ mb: 1.5 }}>
        Tech Debt Reduction
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {Object.entries(techDebt || {}).map(([sector, sectorData]) => (
          <TechDebtAchievement key={sector} sector={sector} data={sectorData} />
        ))}
      </Box>
    </Paper>
  );
};
