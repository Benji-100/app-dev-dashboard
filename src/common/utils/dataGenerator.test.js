import {
  generateDashboardData,
  generateOperationMetricsData,
  generateSQLQueryData,
  generateVulnerabilityData,
  generateServiceScopesData,
} from './dataGenerator';

describe('dataGenerator', () => {
  describe('generateDashboardData', () => {
    it('should generate dashboard data with expected structure and value ranges', () => {
      const data = generateDashboardData();
      expect(typeof data.techDebt.reductionAchieved).toBe('number');
      expect(data.techDebt.reductionAchieved).toBeGreaterThanOrEqual(15);
      expect(data.techDebt.reductionAchieved).toBeLessThanOrEqual(35);
      expect(typeof data.appRat.totalSavings).toBe('string');
      expect(typeof data.aiIndex.adoptionRate).toBe('number');
      expect(data.aiIndex.adoptionRate).toBeGreaterThanOrEqual(5);
      expect(data.aiIndex.adoptionRate).toBeLessThanOrEqual(15);
      expect(typeof data.aiIndex.hoursSaved).toBe('number');
      expect(data.aiIndex.hoursSaved).toBeGreaterThanOrEqual(1500);
      expect(data.aiIndex.hoursSaved).toBeLessThanOrEqual(2500);
      expect(typeof data.aiIndex.dollarsSaved).toBe('number');
      expect(data.aiIndex.dollarsSaved).toBeGreaterThanOrEqual(0.2);
      expect(data.aiIndex.dollarsSaved).toBeLessThanOrEqual(0.7);
      expect(typeof data.aiIndex.useCases).toBe('number');
      expect(data.aiIndex.useCases).toBeGreaterThanOrEqual(2);
      expect(data.aiIndex.useCases).toBeLessThanOrEqual(5);
      expect(typeof data.vulnerabilities.customCode.detected).toBe('number');
      expect(typeof data.serviceScopes.ricefs).toBe('number');
      expect(typeof data.sqlOptimization.queries.analyzed).toBe('number');
      expect(typeof data.operationMetrics.created).toBe('number');
      expect(typeof data.operationMetrics.active).toBe('number');
      expect(typeof data.operationMetrics.closed).toBe('number');
      expect(Array.isArray(data.productRoadmap.items)).toBe(true);
    });
  });

  describe('generateOperationMetricsData', () => {
    it('should generate correct operation metrics data array', () => {
      const input = { created: 13287, active: 779, closed: 13275 };
      const result = generateOperationMetricsData(input);
      expect(result).toEqual([
        { id: 0, value: 13287, label: 'Created', color: '#90caf9' },
        { id: 1, value: 779, label: 'Active', color: '#ffa726' },
        { id: 2, value: 13275, label: 'Closed', color: '#66bb6a' },
      ]);
    });
  });

  describe('generateSQLQueryData', () => {
    it('should generate correct SQL query data array', () => {
      const input = {
        analyzed: 10,
        dispositioned: 5,
        inProgress: 3,
        optimized: 2,
      };
      const result = generateSQLQueryData(input);
      expect(result).toEqual([
        { id: 0, value: 10, label: 'Queries Analyzed' },
        { id: 1, value: 5, label: 'Queries Dispositioned' },
        { id: 3, value: 3, label: 'In Progress' },
        {
          id: 4,
          value: 2,
          label: 'High Memory/time Intensive queries optimized so far',
        },
      ]);
    });
  });

  describe('generateVulnerabilityData', () => {
    it('should generate correct vulnerability data structure', () => {
      const input = {
        customCode: { detected: 100, remediated: 50, remaining: 50 },
        sapPortal: { total: 12, remediated: 10, remaining: 2 },
      };
      const result = generateVulnerabilityData(input);
      expect(result.customCode).toEqual([
        { id: 0, value: 100, label: 'Detected', color: '#1976d2' },
        { id: 1, value: 50, label: 'Remediated', color: '#2e7d32' },
        { id: 2, value: 50, label: 'Remaining', color: '#ed6c02' },
      ]);
      expect(result.sapPortal).toEqual([
        { id: 0, value: 12, label: 'Total', color: '#1976d2' },
        { id: 1, value: 10, label: 'Remediated', color: '#2e7d32' },
        { id: 2, value: 2, label: 'Remaining', color: '#ed6c02' },
      ]);
    });
  });

  describe('generateServiceScopesData', () => {
    it('should generate correct service scopes data array', () => {
      const input = {
        ricefs: 1,
        retrofits: 2,
        fioriApps: 3,
        liveCompare: { count: 4, type: 'Executions' },
      };
      const result = generateServiceScopesData(input);
      expect(result).toEqual([
        { id: 0, value: 1, label: 'RICEFs' },
        { id: 1, value: 2, label: 'Retrofits' },
        { id: 3, value: 3, label: 'Fiori Apps' },
        { id: 4, value: 4, label: 'Live Compare' },
      ]);
    });
  });
});
