import React from 'react';
import { Paper, Button, Stack } from '@mui/material';
import { Save as SaveIcon, Clear as ClearIcon } from '@mui/icons-material';

function ActionButtons({ handleClear, isSubmitting = false }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        justifyContent='center'
        alignItems='center'
      >
        <Button
          variant='outlined'
          color='primary'
          startIcon={<ClearIcon fontSize='small' />}
          onClick={handleClear}
          size='medium'
          disabled={isSubmitting}
          sx={{
            minWidth: { xs: '100%', sm: 160 },
            py: 1,
            borderWidth: 1.5,
            '&:hover': { borderWidth: 1.5 },
            fontSize: '0.875rem',
          }}
        >
          Clear Form
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          startIcon={<SaveIcon fontSize='small' />}
          size='medium'
          disabled={isSubmitting}
          sx={{
            minWidth: { xs: '100%', sm: 160 },
            py: 1,
            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            // '&:hover': {
            //   background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
            // },
            fontSize: '0.875rem',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </Button>
      </Stack>
    </Paper>
  );
}

export default ActionButtons;
