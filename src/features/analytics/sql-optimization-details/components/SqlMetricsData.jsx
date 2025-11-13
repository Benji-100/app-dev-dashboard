import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
// import { Sparkline } from '@mui/x-charts';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function SqlMetricsData() {
  // Generate different data patterns for each sparkline
  const queryResponseData = Array.from(
    { length: 30 },
    (_, i) => Math.sin(i / 4) * 30 + 150 // Query response times
  );
  const connectionPoolData = Array.from(
    { length: 30 },
    (_, i) => Math.cos(i / 5) * 20 + 85 // Connection pool usage
  );
  const indexHitRateData = Array.from({ length: 30 }, (_, i) => {
    const base = 92 + Math.sin(i / 6) * 5; // Index hit rate around 92%
    return Math.max(85, Math.min(98, base + Math.random() * 2));
  });
  const deadlockData = Array.from(
    { length: 30 },
    (_, i) => Math.floor(Math.random() * 5) + 1 // Deadlock occurrences
  );
  const bufferCacheData = Array.from(
    { length: 30 },
    (_, i) => 88 + Math.sin(i / 7) * 8 // Buffer cache hit ratio
  );
  const blockingSessionsData = Array.from(
    { length: 30 },
    (_, i) => Math.floor(Math.random() * 15) + 2 // Blocking sessions
  );
  const lockWaitTimeData = Array.from(
    { length: 30 },
    (_, i) => Math.floor(Math.random() * 200) + 50 // Lock wait time in ms
  );
  const transactionLogSizeData = Array.from(
    { length: 30 },
    (_, i) => 2.5 + Math.sin(i / 8) * 0.8 + Math.random() * 0.3 // Transaction log size in GB
  );

  const cards = [
    {
      title: 'Avg Query Response',
      value: '147ms',
      trend: '-8%',
      data: queryResponseData,
      color: 'primary.main',
    },
    {
      title: 'Connection Pool Usage',
      value: '82%',
      trend: '+3%',
      data: connectionPoolData,
      color: 'success.main',
    },
    {
      title: 'Index Hit Rate',
      value: '94.2%',
      trend: '+2%',
      data: indexHitRateData,
      color: 'info.main',
    },
    {
      title: 'Deadlocks/Day',
      value: '3',
      trend: '-15%',
      data: deadlockData,
      color: 'error.main',
    },
    {
      title: 'Buffer Cache Hit',
      value: '91.5%',
      trend: '+1%',
      data: bufferCacheData,
      color: 'warning.main',
    },
    {
      title: 'Blocking Sessions',
      value: '8',
      trend: '-12%',
      data: blockingSessionsData,
      color: 'secondary.main',
    },
    {
      title: 'Lock Wait Time',
      value: '125ms',
      trend: '+5%',
      data: lockWaitTimeData,
      color: 'error.main',
    },
    {
      title: 'Transaction Log Size',
      value: '2.8GB',
      trend: '+8%',
      data: transactionLogSizeData,
      color: 'warning.main',
    },
  ];
  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {card.title}
              </Typography>
              <Typography variant='h4' sx={{ my: 1 }}>
                {card.value}
              </Typography>
              <Typography
                variant='body2'
                color={
                  card.trend.startsWith('+') ? 'success.main' : 'error.main'
                }
                sx={{ mb: 2 }}
              >
                {card.trend}
              </Typography>
              <SparkLineChart
                data={card.data}
                curve='natural'
                area={true}
                colors={[card.color]}
                showTooltip
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default SqlMetricsData;
