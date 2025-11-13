import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Slider,
  Stack,
  Box,
} from '@mui/material';
import { Assessment as AssessmentIcon } from '@mui/icons-material';

function RatingsAssessment({ formData, handleInputChange }) {
  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction='row' alignItems='center' spacing={1.5} sx={{ mb: 2 }}>
          <AssessmentIcon color='primary' sx={{ fontSize: 22 }} />
          <Typography variant='h6' color='primary' fontWeight={600}>
            Ratings & Assessment
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <Box>
            <Typography
              component='legend'
              sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}
            >
              Project Rating
            </Typography>
            <Rating
              value={formData.projectRating}
              onChange={(event, newValue) =>
                handleInputChange('projectRating', newValue)
              }
              size='medium'
              precision={0.5}
            />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ display: 'block', mt: 0.5, fontSize: '0.75rem' }}
            >
              Rate the overall project quality
            </Typography>
          </Box>

          <Box>
            <Typography
              component='legend'
              sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}
            >
              Client Feedback Rating
            </Typography>
            <Rating
              value={formData.clientFeedback}
              onChange={(event, newValue) =>
                handleInputChange('clientFeedback', newValue)
              }
              size='medium'
              max={5}
            />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ display: 'block', mt: 0.5, fontSize: '0.75rem' }}
            >
              Client satisfaction rating
            </Typography>
          </Box>

          <Box>
            <Typography
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            >
              Risk Level: {formData.riskLevel}/5
            </Typography>
            <Slider
              value={formData.riskLevel}
              onChange={(event, newValue) =>
                handleInputChange('riskLevel', newValue)
              }
              min={1}
              max={5}
              step={1}
              valueLabelDisplay='auto'
              marks={[
                { value: 1, label: 'Low' },
                { value: 3, label: 'Medium' },
                { value: 5, label: 'High' },
              ]}
              sx={{ mt: 1, '& .MuiSlider-markLabel': { fontSize: '0.75rem' } }}
              size='small'
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RatingsAssessment;
