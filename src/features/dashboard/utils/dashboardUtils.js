export const getCompletionPercentage = (operationMetrics) => {
  const total =
    operationMetrics.created +
    operationMetrics.active +
    operationMetrics.closed;
  if (total === 0) return 0;
  return Math.round((operationMetrics.closed / total) * 100);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'In Progress':
      return 'warning';
    case 'Planned':
      return 'inherit';
    default:
      return 'inherit';
  }
};
