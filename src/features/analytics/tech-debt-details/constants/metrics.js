export const TECH_DEBT_METRICS = {
  region: 'MENA+',
  objectDecommission: {
    completed: 1884,
    total: 6434,
    percentage: 29.2,
  },
  unusedObjectsDecommissioning: {
    percentage: 100,
    status: 'Complete',
  },
  reductionProgress: {
    currentProgress: 75, // Overall tech debt reduction progress
    targetProgress: 100,
  },
};

export const METRIC_LABELS = {
  region: 'Region',
  objectDecommissionScope: 'Object Decommission Scope',
  unusedObjectsStatus: 'Unused Objects Decommissioning',
  overallProgress: 'Overall Tech Debt Reduction',
  completedObjects: 'Decommissioned Objects',
  totalObjects: 'Total Objects',
  remainingObjects: 'Remaining Objects',
};

export const STATUS_INDICATORS = {
  complete: {
    label: 'Complete',
    color: '#4caf50',
    icon: '✓',
  },
  inProgress: {
    label: 'In Progress',
    color: '#ff9800',
    icon: '⏳',
  },
  pending: {
    label: 'Pending',
    color: '#f44336',
    icon: '⏸',
  },
};
