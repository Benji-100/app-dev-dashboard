import React from 'react';
import { Box, Typography } from '@mui/material';

// import Media from './Media';
// import DenseTable from './DenseTable';
import SqlMetricsData from './SqlMetricsData';
import SqlDenseTable from './SqlDenseTable';
import SQLQueryCharts from './SQLQueryCharts';

function SqlOptimizationDetails() {
	return (
		<Box sx={{ py: 2 }}>
			{/* SQL Metrics Data - Horizontal Layout (3 items per row) */}
			<Box sx={{ mb: 4 }}>
				<Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
					SQL Metrics Overview
				</Typography>
				<SqlMetricsData />
			</Box>

			{/* SQL Query Charts */}
			<Box sx={{ mb: 4 }}>
				<Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
					Query Analytics
				</Typography>
				<SQLQueryCharts />
			</Box>

			{/* SQL Dense Table */}
			<Box>
				<Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
					Query Details Table
				</Typography>
				<SqlDenseTable />
			</Box>
		</Box>
	);
}

export default SqlOptimizationDetails;
