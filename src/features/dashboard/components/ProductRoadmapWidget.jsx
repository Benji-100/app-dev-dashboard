import {
  Divider,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import {
  generateProductRoadmapBarData,
  generateProductRoadmapByTypeData,
} from '../../../common/utils/dataGenerator';
import { useMemo, useState } from 'react';
import { getRoadMapChipColor } from '../../../common/utils/commonUtils';

export const ProductRoadmapWidget = () => {
  const { data } = useDashboard();
  const { productRoadmap } = data;
  const [groupBy, setGroupBy] = useState('year');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product-roadmap-details');
  };

  const productRoadmapDataByYear = useMemo(
    () => generateProductRoadmapBarData(productRoadmap?.items),
    [productRoadmap?.items]
  );

  const productRoadmapDataByType = useMemo(
    () => generateProductRoadmapByTypeData(productRoadmap?.items),
    [productRoadmap?.items]
  );

  const handleGroupByChange = (event) => {
    event.stopPropagation();
    setGroupBy(event.target.value);
  };

  const isGroupedByType = groupBy === 'type';
  // Fix: When grouping by type, use type data generator
  // When grouping by year, use year data generator
  const currentData = isGroupedByType
    ? productRoadmapDataByType // X-axis: types, series: years
    : productRoadmapDataByYear; // X-axis: years, series: types

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h6'>Product EOL/Roadmap</Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>Group By</InputLabel>
            <Select
              value={groupBy}
              label='Group By'
              onChange={handleGroupByChange}
            >
              <MenuItem value='type'>Type</MenuItem>
              <MenuItem value='year'>Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <BarChart
        xAxis={[
          {
            id: isGroupedByType ? 'types' : 'years',
            data: isGroupedByType ? currentData.types : currentData.years,
            label: isGroupedByType ? 'Type' : 'Year',
          },
        ]}
        series={
          isGroupedByType
            ? // When grouping by type: X-axis = types, series = years
              currentData.years.map((year, idx) => ({
                data: currentData.barData[idx].data,
                label: year,
                stack: 'total',
                color: currentData.barData[idx].color,
              }))
            : // When grouping by year: X-axis = years, series = types
              currentData.types.map((type, idx) => ({
                data: currentData.barData[idx].data,
                label: type,
                stack: 'total',
                color: currentData.barData[idx].color,
              }))
        }
        height={250}
        width={350}
        legend={{ position: { vertical: 'top', horizontal: 'right' } }}
      />
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
          {isGroupedByType
            ? // Group by Type view - show types as main categories
              currentData.types.map((type) => (
                <Box key={type} sx={{ minWidth: 120 }}>
                  <Typography
                    variant='subtitle2'
                    color='text.secondary'
                    sx={{ mb: 0.5 }}
                  >
                    {type}
                  </Typography>
                  <Stack spacing={0.5}>
                    {productRoadmap.items
                      .filter((item) => item.type === type)
                      .map((item) => (
                        <Chip
                          key={item.name + item.type + item.year}
                          label={`${item.name} (${item.year})`}
                          color={getRoadMapChipColor(item.type)}
                          size='small'
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                  </Stack>
                </Box>
              ))
            : // Group by Year view - show years as main categories (original)
              currentData.years.map((year) => (
                <Box key={year} sx={{ minWidth: 90 }}>
                  <Typography
                    variant='subtitle2'
                    color='text.secondary'
                    sx={{ mb: 0.5 }}
                  >
                    {year}
                  </Typography>
                  <Stack spacing={0.5}>
                    {productRoadmap.items
                      .filter((item) => item.year === year)
                      .map((item) => (
                        <Chip
                          key={item.name + item.type + item.year}
                          label={`${item.name} (${item.type})`}
                          color={getRoadMapChipColor(item.type)}
                          size='small'
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                  </Stack>
                </Box>
              ))}
        </Stack>
      </Box>
    </Paper>
  );
};
