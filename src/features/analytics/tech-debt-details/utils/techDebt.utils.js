/**
 * Calculate the percentage of objects decommissioned
 * @param {number} completed - Number of completed objects
 * @param {number} total - Total number of objects
 * @returns {number} Percentage rounded to 1 decimal place
 */
export const calculateDecommissionPercentage = (completed, total) => {
  if (!total || total === 0) return 0;
  return Math.round((completed / total) * 1000) / 10; // Round to 1 decimal
};

/**
 * Calculate remaining objects
 * @param {number} total - Total number of objects
 * @param {number} completed - Number of completed objects
 * @returns {number} Number of remaining objects
 */
export const calculateRemainingObjects = (total, completed) => {
  return Math.max(0, (total || 0) - (completed || 0));
};

/**
 * Format number for display with K suffix for thousands
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatDisplayNumber = (value) => {
  if (!value || value === 0) return '0';
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Get status color based on percentage
 * @param {number} percentage - Percentage value
 * @returns {string} Color code
 */
export const getStatusColor = (percentage) => {
  if (percentage >= 80) return '#4caf50'; // Green
  if (percentage >= 60) return '#8bc34a'; // Light green
  if (percentage >= 40) return '#ffc107'; // Yellow
  if (percentage >= 20) return '#ff9800'; // Orange
  return '#f44336'; // Red
};

/**
 * Get progress status text based on percentage
 * @param {number} percentage - Percentage value
 * @returns {string} Status text
 */
export const getProgressStatus = (percentage) => {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 70) return 'Good';
  if (percentage >= 50) return 'Average';
  if (percentage >= 30) return 'Needs Improvement';
  return 'Critical';
};

/**
 * Generate pie chart data for MUI X-Charts
 * @param {number} completed - Completed objects
 * @param {number} total - Total objects
 * @returns {Array} Array of data objects for MUI X-Charts PieChart
 */
export const generateDecommissionPieData = (completed = 0, total = 0) => {
  const remaining = calculateRemainingObjects(total, completed);

  return [
    { id: 0, value: completed, label: 'Decommissioned' },
    { id: 1, value: remaining, label: 'Remaining' },
  ];
};
