import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { calculateRoadmapMetrics, generateOverviewCards } from '../utils';
import { OVERVIEW_CARD_CONFIGS } from '../constants';

const RoadmapOverviewCards = ({ productRoadmap }) => {
  const { details = [] } = productRoadmap;

  // Calculate metrics from details
  const metrics = calculateRoadmapMetrics(details);

  // Generate cards with metrics
  const cards = generateOverviewCards(metrics, OVERVIEW_CARD_CONFIGS);

  return (
    <>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: card.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                '& svg': {
                  color: card.color,
                  fontSize: 28,
                },
              }}
            >
              {card.icon}
            </Box>
            <Typography
              variant='h4'
              component='div'
              sx={{ mb: 1, fontWeight: 'bold' }}
            >
              {card.value}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {card.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default RoadmapOverviewCards;
