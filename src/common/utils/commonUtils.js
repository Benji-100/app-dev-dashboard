export const formatNumber = (num) => {
  // Handle undefined, null, or non-numeric values
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }

  const numValue = Number(num);
  if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)} MM`;
  if (numValue >= 1000) return `${(numValue / 1000).toFixed(0)}K`;
  return numValue.toString();
};

export const getRoadMapChipColor = (type) => {
  let color = 'default';
  switch (type) {
    case 'Upgrade':
      color = 'success';
      break;
    case 'Re-Platform':
      color = 'primary';
      break;
    default:
      color = 'default';
  }
  return color;
};

export const getColorFromColorPath = (colorPath) => {
  const colorMap = {
    'success.main': '#2e7d32',
    'info.main': '#0288d1',
    'warning.main': '#ed6c02',
    'error.main': '#d32f2f',
    'primary.main': '#1976d2',
  };
  return colorMap[colorPath] || colorMap['primary.main'];
};

export const getColorFromPath = (theme, colorPath) => {
  const [palette, shade] = colorPath.split('.');
  return theme.palette[palette][shade];
};

export const getGaugeColor = (value, type = 'completion') => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (type === 'completion') {
    // For completion percentages (higher is better)
    if (numValue >= 80) return 'success.main'; // Green for high completion
    if (numValue >= 60) return 'warning.main'; // Orange for medium completion
    if (numValue >= 40) return 'info.main'; // Blue for low-medium completion
    return 'error.main'; // Red for low completion
  } else if (type === 'debt') {
    // For tech debt reduction (higher reduction is better)
    if (numValue >= 70) return 'success.main'; // Green for high reduction
    if (numValue >= 50) return 'info.main'; // Blue for medium reduction
    if (numValue >= 30) return 'warning.main'; // Orange for low reduction
    return 'error.main'; // Red for very low reduction
  }

  // Default fallback
  return 'primary.main';
};
