import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';

function FormHeader() {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 2,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <BusinessIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{ fontWeight: 300 }}
      >
        Project Dashboard Form
      </Typography>
      <Typography variant='subtitle1' sx={{ opacity: 0.9, fontWeight: 300 }}>
        Create and manage project information with comprehensive details
      </Typography>
    </Paper>
  );
}

export default FormHeader;
