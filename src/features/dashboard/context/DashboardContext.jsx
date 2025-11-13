import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { generateDashboardData } from '../../../common/utils/dataGenerator';
import { formatNumber } from '../../../common/utils/commonUtils';
import initialDashboardData from '../../../data/dashboardData.json';

const DashboardContext = createContext();
const UPDATE_INTERVAL = 5000; // 5 seconds

// Transform raw JSON data to expected format with formatted numbers
const transformDashboardData = (rawData) => {
  return {
    ...rawData,
    appRat: {
      ...rawData.appRat,
      totalSavings: rawData.appRat.totalSavings,
      sapMobilePlatform: {
        maintenanceBase: rawData.appRat.sapMobilePlatform.maintenanceBase,
        yearlyMaintenance: rawData.appRat.sapMobilePlatform.yearlyMaintenance,
        percentageValue: rawData.appRat.sapMobilePlatform.percentageValue,
        decommissionedInstances:
          rawData.appRat.sapMobilePlatform.decommissionedInstances,
      },
      sapCEPortal: {
        computeCost: rawData.appRat.sapCEPortal.computeCost,
        decommissionedInstances:
          rawData.appRat.sapCEPortal.decommissionedInstances,
      },
    },
    sqlOptimization: {
      ...rawData.sqlOptimization,
      performance: {
        memoryReduction: {
          value: formatNumber(
            rawData.sqlOptimization.performance.memoryReduction.value
          ),
          unit: rawData.sqlOptimization.performance.memoryReduction.unit,
        },
        executionTimeReduction: {
          value: formatNumber(
            rawData.sqlOptimization.performance.executionTimeReduction.value
          ),
          unit: rawData.sqlOptimization.performance.executionTimeReduction.unit,
        },
      },
    },
    aiIndex: {
      ...rawData.aiIndex,
      dollarsSaved: formatNumber(rawData.aiIndex.dollarsSaved),
    },
  };
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState(() =>
    transformDashboardData(initialDashboardData)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const toggleLive = () => {
    setIsLive((prev) => !prev);
  };

  const updateData = useCallback(() => {
    try {
      // Use data generator for live updates to simulate real-time changes
      const newData = generateDashboardData();
      setData(newData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const setDashboardData = useCallback((newData) => {
    try {
      setData(newData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Initial data is loaded from JSON file directly
  // No need for initial data load effect

  // Set up real-time updates
  useEffect(() => {
    let intervalId;

    if (isLive) {
      intervalId = setInterval(() => {
        updateData();
      }, UPDATE_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLive, updateData]);

  return (
    <DashboardContext.Provider
      value={{
        data,
        loading,
        error,
        isLive,
        toggleLive,
        updateData,
        setDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
