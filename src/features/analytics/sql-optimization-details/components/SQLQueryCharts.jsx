import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

function SQLQueryCharts() {
	// Mock data for SQL query metrics
	const queryExecutionData = [
		{ database: 'SQL Server', avgTime: 2.5 },
		{ database: 'Oracle', avgTime: 3.2 },
		{ database: 'PostgreSQL', avgTime: 1.8 },
		{ database: 'MongoDB', avgTime: 1.4 },
		{ database: 'MySQL', avgTime: 2.1 },
	];

	const queryTrendData = Array.from({ length: 30 }, (_, i) => ({
		day: i + 1,
		queries: Math.floor(Math.random() * 500) + 200,
	}));

	const queryTypeDistribution = [
		{ id: 0, value: 35, label: 'SELECT' },
		{ id: 1, value: 25, label: 'INSERT' },
		{ id: 2, value: 20, label: 'UPDATE' },
		{ id: 3, value: 15, label: 'DELETE' },
		{ id: 4, value: 5, label: 'Others' },
	];

	const queryPerformanceByHour = Array.from({ length: 24 }, (_, i) => ({
		hour: i,
		avgResponseTime: Math.random() * 2 + 0.5 + (i >= 9 && i <= 17 ? 1 : 0), // Higher during business hours
	}));

	return (
		<Grid container spacing={3}>
			{/* Query Execution Time by Database */}
			<Grid size={{ xs: 12, md: 6 }}>
				<Card sx={{ height: '100%' }}>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							Avg Query Execution Time (ms)
						</Typography>
						<Box sx={{ height: 300, mt: 2 }}>
							<BarChart
								xAxis={[
									{
										scaleType: 'band',
										data: queryExecutionData.map((item) => item.database),
									},
								]}
								series={[
									{
										data: queryExecutionData.map((item) => item.avgTime),
										color: '#ff6b35',
									},
								]}
								// width={350}
								// height={250}
							/>
						</Box>
						<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
							Average execution time across different databases
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			{/* Query Volume Trend */}
			<Grid size={{ xs: 12, md: 6 }}>
				<Card sx={{ height: '100%' }}>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							Query Volume Trend (30 Days)
						</Typography>
						<Box sx={{ height: 300, mt: 2 }}>
							<LineChart
								xAxis={[
									{
										data: queryTrendData.map((item) => item.day),
									},
								]}
								series={[
									{
										data: queryTrendData.map((item) => item.queries),
										label: 'Queries',
										color: '#4caf50',
										curve: 'natural',
									},
								]}
								// width={350}
								// height={250}
							/>
						</Box>
						<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
							Daily query volume over the last 30 days
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			{/* Query Type Distribution */}
			<Grid size={{ xs: 12, md: 6 }}>
				<Card sx={{ height: '100%' }}>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							Query Type Distribution
						</Typography>
						<Box
							sx={{
								height: 300,
								mt: 2,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<PieChart
								series={[
									{
										data: queryTypeDistribution,
										innerRadius: 30,
										outerRadius: 100,
										paddingAngle: 2,
										cornerRadius: 5,
									},
								]}
								// width={350}
								// height={250}
							/>
						</Box>
						<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
							Distribution of query types in the system
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			{/* Query Performance by Hour */}
			<Grid size={{ xs: 12, md: 6 }}>
				<Card sx={{ height: '100%' }}>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							Query Performance by Hour
						</Typography>
						<Box sx={{ height: 300, mt: 2 }}>
							<LineChart
								xAxis={[
									{
										data: queryPerformanceByHour.map(
											(item) => `${item.hour}:00`
										),
										scaleType: 'point',
									},
								]}
								series={[
									{
										data: queryPerformanceByHour.map(
											(item) => item.avgResponseTime
										),
										label: 'Avg Response Time (ms)',
										color: '#9c27b0',
										curve: 'natural',
										area: true,
									},
								]}
								// width={350}
								// height={250}
							/>
						</Box>
						<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
							Average query response time throughout the day
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default SQLQueryCharts;
