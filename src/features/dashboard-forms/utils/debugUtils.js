/**
 * Debug utility for dashboard forms validation
 * Use this to debug validation issues
 */

export const debugFormValidation = (formData, errors) => {
  console.group('🔍 Dashboard Form Debug Info');

  console.log('📋 Form Data Structure:', {
    appRat: formData.appRat,
    hasAppRat: !!formData.appRat,
    hasAppRatSapMobile: !!formData.appRat?.sapMobilePlatform,
    hasAppRatSapCE: !!formData.appRat?.sapCEPortal,
  });

  console.log('❌ Current Errors:', errors);

  // Check App Rat specific fields
  const appRatErrors = Object.keys(errors).filter((key) =>
    key.startsWith('appRat.')
  );
  if (appRatErrors.length > 0) {
    console.log('🚨 App Rat Validation Errors:', appRatErrors);
    appRatErrors.forEach((errorKey) => {
      console.log(`  - ${errorKey}: ${errors[errorKey]}`);
    });
  }

  // Check if all required App Rat fields exist
  const requiredAppRatFields = [
    'appRat.totalSavings',
    'appRat.sapMobilePlatform.maintenanceBase',
    'appRat.sapMobilePlatform.yearlyMaintenance',
    'appRat.sapCEPortal.computeCost',
  ];

  requiredAppRatFields.forEach((fieldPath) => {
    const keys = fieldPath.split('.');
    let value = formData;
    let exists = true;

    try {
      keys.forEach((key) => {
        if (value === undefined || value === null) {
          exists = false;
          return;
        }
        value = value[key];
      });

      console.log(`📊 ${fieldPath}:`, {
        exists,
        value,
        type: typeof value,
        isValid: value !== undefined && value !== null && !isNaN(value),
      });
    } catch (error) {
      console.log(`❌ ${fieldPath}:`, { exists: false, error: error.message });
    }
  });

  console.groupEnd();
};

export const debugFieldUpdate = (fieldPath, oldValue, newValue) => {
  console.log('🔄 Field Update:', {
    field: fieldPath,
    from: oldValue,
    to: newValue,
    type: typeof newValue,
  });
};
