import React, { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TextField, Box, Typography } from '@mui/material';

function createData(
  queryId,
  queryDescription,
  executionTime,
  cpuTime,
  ioReads,
  executionCount
) {
  return {
    queryId,
    queryDescription,
    executionTime,
    cpuTime,
    ioReads,
    executionCount,
  };
}

const rows = [
  createData(
    'Q001',
    'Customer Order Join Query - Retrieve orders with customer details since 2023',
    2500,
    1800,
    15000,
    245
  ),
  createData(
    'Q002',
    'Electronics Price Update - Bulk price increase for electronics category',
    3200,
    2100,
    8500,
    78
  ),
  createData(
    'Q003',
    'Transaction Count with Account Join - Count transactions with account details',
    1850,
    1200,
    12000,
    156
  ),
  createData(
    'Q004',
    'Audit Log Insert - Add user action to audit trail',
    450,
    280,
    1200,
    892
  ),
  createData(
    'Q005',
    'Temp Data Cleanup - Delete temporary data older than 30 days',
    4100,
    3200,
    22000,
    12
  ),
  createData(
    'Q006',
    'Product Category Join - Retrieve products with category names',
    1650,
    980,
    9800,
    324
  ),
  createData(
    'Q007',
    'User Session Update - Update last activity timestamp for session',
    680,
    420,
    2100,
    1245
  ),
  createData(
    'Q008',
    'Payment Average Calculation - Calculate average payment amount for date range',
    2200,
    1650,
    11500,
    89
  ),
  createData(
    'Q009',
    'Bulk Notification Insert - Send notifications to all active users',
    3800,
    2900,
    18000,
    24
  ),
  createData(
    'Q010',
    'Complex Order Product Join - Retrieve order details with product information',
    5200,
    4100,
    28000,
    67
  ),
];

function SqlDenseTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('queryId');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    let filteredData = [...rows];

    // Filter by search term (query description)
    if (searchTerm) {
      filteredData = filteredData.filter((query) =>
        query.queryDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered data
    return filteredData.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle different data types
      if (
        orderBy === 'executionTime' ||
        orderBy === 'cpuTime' ||
        orderBy === 'ioReads' ||
        orderBy === 'executionCount'
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [order, orderBy, searchTerm]);
  return (
    <Paper>
      {/* Header with Search Control */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6'>SQL Query Performance</Typography>

        <TextField
          size='small'
          label='Search by query description'
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'queryId'}
                  direction={orderBy === 'queryId' ? order : 'asc'}
                  onClick={() => handleRequestSort('queryId')}
                >
                  Query ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'queryDescription'}
                  direction={orderBy === 'queryDescription' ? order : 'asc'}
                  onClick={() => handleRequestSort('queryDescription')}
                >
                  Query Description
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'executionTime'}
                  direction={orderBy === 'executionTime' ? order : 'asc'}
                  onClick={() => handleRequestSort('executionTime')}
                >
                  Execution Time (ms)
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'cpuTime'}
                  direction={orderBy === 'cpuTime' ? order : 'asc'}
                  onClick={() => handleRequestSort('cpuTime')}
                >
                  CPU Time (ms)
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'ioReads'}
                  direction={orderBy === 'ioReads' ? order : 'asc'}
                  onClick={() => handleRequestSort('ioReads')}
                >
                  IO Reads
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'executionCount'}
                  direction={orderBy === 'executionCount' ? order : 'asc'}
                  onClick={() => handleRequestSort('executionCount')}
                >
                  Execution Count
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.queryId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.queryId}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.queryDescription}
                </TableCell>
                <TableCell align='right'>{row.executionTime}</TableCell>
                <TableCell align='right'>{row.cpuTime}</TableCell>
                <TableCell align='right'>{row.ioReads}</TableCell>
                <TableCell align='right'>{row.executionCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default SqlDenseTable;
