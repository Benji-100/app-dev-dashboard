// Format numbers for display
export const formatDisplayNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num?.toString() || '0';
};

// Parse formatted number back to numeric value
export const parseFormattedNumber = (formatted) => {
  if (typeof formatted === 'number') return formatted;
  if (!formatted || typeof formatted !== 'string') return 0;

  const numStr = formatted.replace(/[^\d.-]/g, '');
  const num = parseFloat(numStr);

  if (formatted.includes('M')) return Math.round(num * 1000000);
  if (formatted.includes('K')) return Math.round(num * 1000);
  return num || 0;
};

// Validate numeric input
export const validateNumericInput = (value, min = 0, max = Infinity) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

// Generate years array for dropdowns
export const generateYearOptions = (startYear = 2024, endYear = 2030) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }
  return years;
};

// Product roadmap type options
export const productRoadmapTypes = ['Re-Platform', 'Upgrade'];

// Product roadmap health options
export const productRoadmapHealthOptions = ['Green', 'Yellow', 'Red'];

// Product roadmap status options
export const productRoadmapStatusOptions = [
  'Completed',
  'Planning',
  'In Progress',
];

// Service scope types
export const serviceScopeTypes = ['Executions', 'Operations', 'Analysis'];

// AI Index types
// AI Index types removed - now using individual metrics

// Memory unit options
export const memoryUnits = ['GB', 'TB', 'MB'];

// Time unit options
export const timeUnits = ['Seconds', 'Minutes', 'Hours'];

// Default form validation messages
export const validationMessages = {
  required: 'This field is required',
  numeric: 'Must be a valid number',
  min: (min) => `Must be at least ${min}`,
  max: (max) => `Must be at most ${max}`,
  range: (min, max) => `Must be between ${min} and ${max}`,
};

// Helper to get nested object value by path
export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper to set nested object value by path
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};

export const getFormattedFormData = (formData) => {
  const formattedData = {
    ...formData,
    appRat: {
      ...formData.appRat,
      totalSavings: formData.appRat.totalSavings,
      sapMobilePlatform: {
        maintenanceBase: formData.appRat.sapMobilePlatform?.maintenanceBase,
        yearlyMaintenance: formData.appRat.sapMobilePlatform?.yearlyMaintenance,
        percentageValue: formData.appRat.sapMobilePlatform?.percentageValue,
        decommissionedInstances:
          formData.appRat.sapMobilePlatform?.decommissionedInstances,
      },
      sapCEPortal: {
        computeCost: formData.appRat.sapCEPortal?.computeCost,
        decommissionedInstances:
          formData.appRat.sapCEPortal?.decommissionedInstances,
      },
      licenseReduction: {
        savingsAmount: formData.appRat.licenseReduction?.savingsAmount,
        licensesReduced: formData.appRat.licenseReduction?.licensesReduced,
      },
    },
    serviceScopes: {
      ytd: {
        ricefs: formData.serviceScopes?.ytd?.ricefs,
        fioriApps: formData.serviceScopes?.ytd?.fioriApps,
        retrofits: formData.serviceScopes?.ytd?.retrofits,
        liveCompare: {
          count: formData.serviceScopes?.ytd?.liveCompare?.count,
          type: formData.serviceScopes?.ytd?.liveCompare?.type,
        },
      },
      overall: {
        ricefs: formData.serviceScopes?.overall?.ricefs,
        fioriApps: formData.serviceScopes?.overall?.fioriApps,
        retrofits: formData.serviceScopes?.overall?.retrofits,
        liveCompare: {
          count: formData.serviceScopes?.overall?.liveCompare?.count,
          type: formData.serviceScopes?.overall?.liveCompare?.type,
        },
      },
    },
    sqlOptimization: {
      ...formData.sqlOptimization,
      performance: {
        memoryReduction: {
          value: formatDisplayNumber(
            formData.sqlOptimization.performance.memoryReduction.value
          ),
          unit: formData.sqlOptimization.performance.memoryReduction.unit,
        },
        executionTimeReduction: {
          value: formatDisplayNumber(
            formData.sqlOptimization.performance.executionTimeReduction.value
          ),
          unit: formData.sqlOptimization.performance.executionTimeReduction
            .unit,
        },
      },
    },
  };
  return formattedData;
};

// Validate a single field value by path
export const validateField = (formData, fieldPath) => {
  const keys = fieldPath.split('.');
  let value = formData;

  try {
    keys.forEach((key) => {
      value = value?.[key];
    });

    // Check if value is undefined, null, empty string, or not a valid number
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }

    // For numeric fields, check if it's a valid number
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'This field must be a valid number';
    }

    return null;
  } catch (error) {
    return 'This field is required';
  }
};

// Validate percentage field (0-100)
export const validatePercentage = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid number';
  if (num < 0 || num > 100) return 'Must be between 0 and 100';
  return null;
};

// Validate positive number
export const validatePositiveNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid number';
  if (num < 0) return 'Must be a positive number';
  return null;
};

// Validate required string field
export const validateRequiredString = (value) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    return 'This field is required';
  }
  return null;
};

// Validate year field (2024-2030)
export const validateYear = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid year';
  if (num < 2024 || num > 2030) return 'Year must be between 2024 and 2030';
  return null;
};

// Validate completion year specifically
export const validateCompletionYear = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid year';
  const currentYear = new Date().getFullYear();
  if (num < currentYear || num > 2030)
    return `Year must be between ${currentYear} and 2030`;
  return null;
};

/**
 * Validate a single product roadmap item
 * @param {Object} item - The roadmap item to validate
 * @param {number} index - The index of the item in the array
 * @returns {Object} Object containing validation errors for the item
 */
export const validateRoadmapItem = (item, index) => {
  const errors = {};

  if (!item.name?.trim()) {
    errors[`productRoadmap.items.${index}.name`] = 'Item name is required';
  }
  if (!item.year?.trim()) {
    errors[`productRoadmap.items.${index}.year`] = 'Year is required';
  }
  if (!item.type?.trim()) {
    errors[`productRoadmap.items.${index}.type`] = 'Type is required';
  }

  return errors;
};

/**
 * Main form validation function for dashboard forms
 * @param {Object} formData - The complete form data object
 * @returns {Object} Object containing validation errors with field paths as keys
 */
export const validateDashboardForm = (formData) => {
  const newErrors = {};

  // Define all required numeric fields
  const numericFields = [
    'techDebt.MENA.reductionAchieved',
    'techDebt.MENA.percentage',
    'techDebt.MENA.completionYear',
    'techDebt.MENA.objectDecommission.completed',
    'techDebt.MENA.objectDecommission.total',
    'techDebt.MENA.objectDecommission.percentage',
    'techDebt.MENA.unusedObjectsDecommissioning.percentage',
    'techDebt.APAC.reductionAchieved',
    'techDebt.APAC.percentage',
    'techDebt.APAC.completionYear',
    'techDebt.APAC.objectDecommission.completed',
    'techDebt.APAC.objectDecommission.total',
    'techDebt.APAC.objectDecommission.percentage',
    'techDebt.APAC.unusedObjectsDecommissioning.percentage',
    'techDebt.LATAM.reductionAchieved',
    'techDebt.LATAM.percentage',
    'techDebt.LATAM.completionYear',
    'techDebt.LATAM.objectDecommission.completed',
    'techDebt.LATAM.objectDecommission.total',
    'techDebt.LATAM.objectDecommission.percentage',
    'techDebt.LATAM.unusedObjectsDecommissioning.percentage',
    'appRat.totalSavings',
    'appRat.sapMobilePlatform.maintenanceBase',
    'appRat.sapMobilePlatform.yearlyMaintenance',
    'appRat.sapCEPortal.computeCost',
    'appRat.sapMobilePlatform.decommissionedInstances',
    'appRat.sapCEPortal.decommissionedInstances',
    'appRat.licenseReduction.savingsAmount',
    'appRat.licenseReduction.licensesReduced',
    'aiIndex.adoptionRate',
    'aiIndex.hoursSaved',
    'aiIndex.dollarsSaved',
    'aiIndex.useCases',
    'vulnerabilities.customCode.detected',
    'vulnerabilities.customCode.remediated',
    'vulnerabilities.customCode.remaining',
    'vulnerabilities.sapPortal.total',
    'vulnerabilities.sapPortal.remediated',
    'vulnerabilities.sapPortal.remaining',
    'serviceScopes.ytd.ricefs',
    'serviceScopes.ytd.fioriApps',
    'serviceScopes.ytd.retrofits',
    'serviceScopes.ytd.liveCompare.count',
    'serviceScopes.overall.ricefs',
    'serviceScopes.overall.fioriApps',
    'serviceScopes.overall.retrofits',
    'serviceScopes.overall.liveCompare.count',
    'sqlOptimization.queries.analyzed',
    'sqlOptimization.queries.dispositioned',
    'sqlOptimization.queries.inProgress',
    'sqlOptimization.queries.optimized',
    'sqlOptimization.performance.memoryReduction.value',
    'sqlOptimization.performance.executionTimeReduction.value',
    'operationMetrics.created',
    'operationMetrics.active',
    'operationMetrics.closed',
  ];

  // Validate numeric fields
  numericFields.forEach((fieldPath) => {
    const error = validateField(formData, fieldPath);
    if (error) {
      newErrors[fieldPath] = error;
    }
  });

  // Validate percentage fields specifically
  const percentageFields = [
    'techDebt.MENA.reductionAchieved',
    'techDebt.MENA.percentage',
    'techDebt.APAC.reductionAchieved',
    'techDebt.APAC.percentage',
    'techDebt.LATAM.reductionAchieved',
    'techDebt.LATAM.percentage',
    'techDebt.MENA.objectDecommission.percentage',
    'techDebt.APAC.objectDecommission.percentage',
    'techDebt.LATAM.objectDecommission.percentage',
    'techDebt.MENA.unusedObjectsDecommissioning.percentage',
    'techDebt.APAC.unusedObjectsDecommissioning.percentage',
    'techDebt.LATAM.unusedObjectsDecommissioning.percentage',
  ];

  percentageFields.forEach((fieldPath) => {
    const value = getNestedValue(formData, fieldPath);
    if (value !== undefined && value !== null && value !== '') {
      const error = validatePercentage(value);
      if (error && !newErrors[fieldPath]) {
        newErrors[fieldPath] = error;
      }
    }
  });

  // Validate completion year fields
  const yearFields = [
    'techDebt.MENA.completionYear',
    'techDebt.APAC.completionYear',
    'techDebt.LATAM.completionYear',
  ];

  yearFields.forEach((fieldPath) => {
    const value = getNestedValue(formData, fieldPath);
    if (value !== undefined && value !== null && value !== '') {
      const error = validateCompletionYear(value);
      if (error && !newErrors[fieldPath]) {
        newErrors[fieldPath] = error;
      }
    }
  });

  // Validate product roadmap items
  if (
    !formData.productRoadmap?.items ||
    formData.productRoadmap.items.length === 0
  ) {
    newErrors['productRoadmap.items'] =
      'At least one product roadmap item is required';
  } else {
    formData.productRoadmap.items.forEach((item, index) => {
      const itemErrors = validateRoadmapItem(item, index);
      Object.assign(newErrors, itemErrors);
    });
  }

  // Validate product roadmap details
  if (
    formData.productRoadmap?.details &&
    formData.productRoadmap.details.length > 0
  ) {
    formData.productRoadmap.details.forEach((detail, index) => {
      const detailErrors = validateRoadmapDetail(detail, index);
      Object.assign(newErrors, detailErrors);
    });
  }

  return newErrors;
};

/**
 * Update a nested field in form data immutably
 * @param {Object} formData - Current form data
 * @param {string} fieldPath - Dot-notation path to the field (e.g., 'appRat.totalSavings')
 * @param {any} value - New value to set
 * @returns {Object} New form data object with updated field
 */
export const updateFormField = (formData, fieldPath, value) => {
  const newData = { ...formData };
  const keys = fieldPath.split('.');
  let current = newData;

  // Navigate to the parent of the target field, creating objects as needed
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    // Create a copy of nested objects to maintain immutability
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }

  // Set the value
  current[keys[keys.length - 1]] = value;

  // Auto-calculate App Rat percentage when maintenance base or yearly maintenance changes
  if (fieldPath.includes('appRat.sapMobilePlatform')) {
    const appRat = newData.appRat || {};
    const sapMobilePlatform = appRat.sapMobilePlatform || {};
    const base = sapMobilePlatform.maintenanceBase || 0;
    const yearly = sapMobilePlatform.yearlyMaintenance || 0;

    if (base > 0) {
      newData.appRat = {
        ...appRat,
        sapMobilePlatform: {
          ...sapMobilePlatform,
          percentageValue: parseFloat(((yearly / base) * 100).toFixed(2)),
        },
      };
    }
  }

  return newData;
};

/**
 * Update a product roadmap item immutably
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the item to update
 * @param {Object} item - New item data
 * @returns {Object} New form data object with updated roadmap item
 */
export const updateRoadmapItem = (formData, index, item) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: formData.productRoadmap.items.map((existing, i) =>
        i === index ? item : existing
      ),
    },
  };
};

/**
 * Add a new product roadmap item
 * @param {Object} formData - Current form data
 * @param {Object} item - New item to add
 * @returns {Object} New form data object with added roadmap item
 */
export const addRoadmapItem = (formData, item) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: [...formData.productRoadmap.items, item],
    },
  };
};

/**
 * Remove a product roadmap item
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the item to remove
 * @returns {Object} New form data object with removed roadmap item
 */
export const removeRoadmapItem = (formData, index) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: formData.productRoadmap.items.filter((_, i) => i !== index),
    },
  };
};

/**
 * Validate a single product roadmap detail
 * @param {Object} detail - The roadmap detail to validate
 * @param {number} index - Index of the detail
 * @returns {Object} Object containing any validation errors
 */
export const validateRoadmapDetail = (detail, index) => {
  const errors = {};

  if (!detail.goLive?.trim()) {
    errors[`productRoadmap.details.${index}.goLive`] =
      'Go-Live date is required';
  }
  if (!detail.scope?.trim()) {
    errors[`productRoadmap.details.${index}.scope`] = 'Scope is required';
  }
  if (!detail.region?.trim()) {
    errors[`productRoadmap.details.${index}.region`] = 'Region is required';
  }
  if (!detail.currentStatus?.trim()) {
    errors[`productRoadmap.details.${index}.currentStatus`] =
      'Current status is required';
  }
  if (!detail.overallSummary?.trim()) {
    errors[`productRoadmap.details.${index}.overallSummary`] =
      'Overall summary is required';
  }

  return errors;
};

/**
 * Update a product roadmap detail immutably
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the detail to update
 * @param {Object} detail - New detail data
 * @returns {Object} New form data object with updated roadmap detail
 */
export const updateRoadmapDetail = (formData, index, detail) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      details: formData.productRoadmap.details.map((existing, i) =>
        i === index ? detail : existing
      ),
    },
  };
};

/**
 * Add a new product roadmap detail
 * @param {Object} formData - Current form data
 * @param {Object} detail - New detail to add
 * @returns {Object} New form data object with added roadmap detail
 */
export const addRoadmapDetail = (formData, detail) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      details: [...(formData.productRoadmap.details || []), detail],
    },
  };
};

/**
 * Remove a product roadmap detail
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the detail to remove
 * @returns {Object} New form data object with removed roadmap detail
 */
export const removeRoadmapDetail = (formData, index) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      details: formData.productRoadmap.details.filter((_, i) => i !== index),
    },
  };
};

/**
 * Clear error for a specific field path
 * @param {Object} errors - Current errors object
 * @param {string} fieldPath - Field path to clear error for
 * @returns {Object} New errors object with cleared field error
 */
export const clearFieldError = (errors, fieldPath) => {
  if (!errors[fieldPath]) return errors;

  const newErrors = { ...errors };
  delete newErrors[fieldPath];
  return newErrors;
};
