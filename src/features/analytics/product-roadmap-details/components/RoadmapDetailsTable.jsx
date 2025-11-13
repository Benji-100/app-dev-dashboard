import React, { useState, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
  MenuItem,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TableSortLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import {
  getStatusColor,
  getStatusIcon,
  getHealthColor,
  filterRoadmapItems,
  sortRoadmapItems,
  getUniqueValues,
} from '../utils';
import { DEFAULT_SORT, FILTER_ALL_OPTION } from '../constants';

const RoadmapDetailsTable = ({ productRoadmap }) => {
  const { details = [] } = productRoadmap;

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_OPTION);
  const [healthFilter, setHealthFilter] = useState(FILTER_ALL_OPTION);
  const [sortField, setSortField] = useState(DEFAULT_SORT.field);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT.direction);

  // Sort handler
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filteredData = filterRoadmapItems(
      details,
      searchTerm,
      statusFilter,
      healthFilter
    );
    return sortRoadmapItems(filteredData, sortField, sortDirection);
  }, [
    details,
    searchTerm,
    statusFilter,
    healthFilter,
    sortField,
    sortDirection,
  ]);

  // Get unique values for filters
  const uniqueStatuses = getUniqueValues(details, 'currentStatus');
  const uniqueHealthStatuses = getUniqueValues(details, 'health');

  if (!details || details.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='body1' color='text.secondary'>
          No roadmap details available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      {/* Search and Filter Controls */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by scope, region, or summary...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label='Status'
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value={FILTER_ALL_OPTION}>All Statuses</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Health</InputLabel>
              <Select
                value={healthFilter}
                label='Health'
                onChange={(e) => setHealthFilter(e.target.value)}
              >
                <MenuItem value={FILTER_ALL_OPTION}>All Health Status</MenuItem>
                {uniqueHealthStatuses.map((health) => (
                  <MenuItem key={health} value={health}>
                    {health}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <FilterListIcon sx={{ mr: 1 }} />
              <Typography variant='body2'>
                {filteredAndSortedData.length} of {details.length} items
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortField === 'goLive'}
                  direction={sortField === 'goLive' ? sortDirection : 'asc'}
                  onClick={() => handleSort('goLive')}
                >
                  Go-Live
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortField === 'scope'}
                  direction={sortField === 'scope' ? sortDirection : 'asc'}
                  onClick={() => handleSort('scope')}
                >
                  Scope
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortField === 'health'}
                  direction={sortField === 'health' ? sortDirection : 'asc'}
                  onClick={() => handleSort('health')}
                >
                  Health
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortField === 'currentStatus'}
                  direction={
                    sortField === 'currentStatus' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('currentStatus')}
                >
                  Current Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Overall Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant='body1' color='text.secondary'>
                    No items match the current filters
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
                        {item.goLive}
                      </Typography>
                      {item.region && (
                        <Typography variant='caption' color='text.secondary'>
                          {item.region}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
                        {item.scope}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size='small'
                      color={getHealthColor(item.health)}
                      label={item.health || 'Green'}
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      size='small'
                      icon={getStatusIcon(item.currentStatus)}
                      color={getStatusColor(item.currentStatus)}
                      label={item.currentStatus}
                      variant='filled'
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography
                      variant='body2'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.overallSummary}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RoadmapDetailsTable;
