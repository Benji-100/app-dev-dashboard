// Status types for roadmap items
export const STATUS_TYPES = ['Completed', 'Planning', 'In Progress'];

// Status color mapping
export const STATUS_COLORS = {
  completed: 'success',
  planning: 'warning',
  'in progress': 'info',
  default: 'default',
};

// Health color mapping
export const HEALTH_COLORS = {
  green: 'success',
  yellow: 'warning',
  red: 'error',
  default: 'success', // Default to green as mentioned in requirements
};

// Overview card configurations
export const OVERVIEW_CARD_CONFIGS = [
  {
    key: 'total',
    title: 'Total Roadmap Items',
    color: 'primary.main',
    bgColor: 'primary.light',
  },
  {
    key: 'completed',
    title: 'Completed',
    color: 'success.main',
    bgColor: 'success.light',
  },
  {
    key: 'planning',
    title: 'In Planning',
    color: 'warning.main',
    bgColor: 'warning.light',
  },
  {
    key: 'completionRate',
    title: 'Completion Rate',
    color: 'info.main',
    bgColor: 'info.light',
  },
];

// Default sort configuration
export const DEFAULT_SORT = {
  field: 'goLive',
  direction: 'asc',
};

// Filter options
export const FILTER_ALL_OPTION = 'All';
