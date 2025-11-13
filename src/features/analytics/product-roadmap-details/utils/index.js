import React from 'react';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { STATUS_COLORS, HEALTH_COLORS } from '../constants';

/**
 * Get status color based on status string
 */
export const getStatusColor = (status) => {
  return STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.default;
};

/**
 * Get status icon based on status string
 */
export const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return <CheckCircleIcon fontSize='small' />;
    case 'planning':
      return <EventIcon fontSize='small' />;
    case 'in progress':
      return <ScheduleIcon fontSize='small' />;
    default:
      return <ScheduleIcon fontSize='small' />;
  }
};

/**
 * Get health color based on health string
 */
export const getHealthColor = (health) => {
  return HEALTH_COLORS[health?.toLowerCase()] || HEALTH_COLORS.default;
};

/**
 * Get overview card icon based on card key
 */
export const getOverviewCardIcon = (cardKey) => {
  const iconMap = {
    total: <TimelineIcon />,
    completed: <CheckCircleIcon />,
    planning: <ScheduleIcon />,
    completionRate: <CheckCircleIcon />,
  };
  return iconMap[cardKey] || <TimelineIcon />;
};

/**
 * Convert date string to sortable format for goLive field
 */
export const getDateValue = (dateStr) => {
  if (dateStr.includes('May')) {
    return dateStr.includes('4th') ? '2025-05-04' : '2025-05-10';
  }
  if (dateStr.includes('Q1 2026')) return '2026-03-31';
  if (dateStr.includes('Q3 2026')) return '2026-09-30';
  return dateStr;
};

/**
 * Extract year from goLive date string
 */
export const extractYearFromGoLive = (goLiveStr) => {
  if (!goLiveStr) return null;

  // Check for explicit year in the string (e.g., "Q1 2026", "Q3 2026")
  const yearMatch = goLiveStr.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return yearMatch[1];
  }

  // Handle dates without explicit year (assume current context)
  if (goLiveStr.includes('May')) {
    return '2025'; // Based on the data, May dates are in 2025
  }

  return null;
};

/**
 * Filter roadmap items based on search term, status, and health
 */
export const filterRoadmapItems = (
  items,
  searchTerm,
  statusFilter,
  healthFilter
) => {
  return items.filter((item) => {
    // Search filter
    const matchesSearch =
      item.scope?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.overallSummary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.goLive?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === 'All' || item.currentStatus === statusFilter;

    // Health filter
    const matchesHealth =
      healthFilter === 'All' || item.health === healthFilter;

    return matchesSearch && matchesStatus && matchesHealth;
  });
};

/**
 * Sort roadmap items by field and direction
 */
export const sortRoadmapItems = (items, sortField, sortDirection) => {
  return [...items].sort((a, b) => {
    let aValue = a[sortField] || '';
    let bValue = b[sortField] || '';

    // Handle date sorting for goLive field
    if (sortField === 'goLive') {
      aValue = getDateValue(aValue);
      bValue = getDateValue(bValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Get unique values from array of objects for a specific field
 */
export const getUniqueValues = (items, field) => {
  return [...new Set(items.map((item) => item[field]).filter(Boolean))];
};

/**
 * Calculate roadmap metrics from details
 */
export const calculateRoadmapMetrics = (details) => {
  const completedItems = details.filter(
    (item) => item.currentStatus === 'Completed'
  ).length;
  const planningItems = details.filter(
    (item) => item.currentStatus === 'Planning'
  ).length;
  const totalItems = details.length;
  const completionRate =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalItems,
    completedItems,
    planningItems,
    completionRate,
  };
};

/**
 * Generate overview cards with metrics data
 */
export const generateOverviewCards = (metrics, cardConfigs) => {
  const { totalItems, completedItems, planningItems, completionRate } = metrics;

  return cardConfigs.map((config) => {
    let value;
    switch (config.key) {
      case 'total':
        value = totalItems;
        break;
      case 'completed':
        value = completedItems;
        break;
      case 'planning':
        value = planningItems;
        break;
      case 'completionRate':
        value = `${completionRate}%`;
        break;
      default:
        value = 0;
    }

    return {
      ...config,
      value,
      icon: getOverviewCardIcon(config.key),
    };
  });
};
