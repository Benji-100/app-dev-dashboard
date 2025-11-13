import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Slider,
  Grid,
  Stack,
} from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

function BudgetTimeline({ formData, handleInputChange }) {
  return (
    <Card elevation={2}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction='row' alignItems='center' spacing={1.5} sx={{ mb: 2 }}>
          <SecurityIcon color='primary' sx={{ fontSize: 22 }} />
          <Typography variant='h6' color='primary' fontWeight={600}>
            Budget & Timeline
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            >
              Budget: ${formData.budget.toLocaleString()}
            </Typography>
            <Slider
              value={formData.budget}
              onChange={(event, newValue) =>
                handleInputChange('budget', newValue)
              }
              min={10000}
              max={500000}
              step={5000}
              valueLabelDisplay='auto'
              valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              marks={[
                { value: 10000, label: '$10K' },
                { value: 100000, label: '$100K' },
                { value: 250000, label: '$250K' },
                { value: 500000, label: '$500K' },
              ]}
              sx={{
                mt: 1,
                '& .MuiSlider-markLabel': { fontSize: '0.75rem' },
              }}
              size='small'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            >
              Estimated Hours: {formData.estimatedHours[0]} -{' '}
              {formData.estimatedHours[1]} hours
            </Typography>
            <Slider
              value={formData.estimatedHours}
              onChange={(event, newValue) =>
                handleInputChange('estimatedHours', newValue)
              }
              min={20}
              max={500}
              step={10}
              valueLabelDisplay='auto'
              valueLabelFormat={(value) => `${value}h`}
              marks={[
                { value: 20, label: '20h' },
                { value: 100, label: '100h' },
                { value: 250, label: '250h' },
                { value: 500, label: '500h' },
              ]}
              sx={{
                mt: 1,
                '& .MuiSlider-markLabel': { fontSize: '0.75rem' },
              }}
              size='small'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BudgetTimeline;
