import { Grid } from '@mui/material';

import { TechDebtWidget } from './TechDebtWidget';
import { AppRatWidget } from './AppRatWidget';
import { AIIndexWidget } from './AIIndexWidget';
import { VulnerabilitiesWidget } from './VulnerabilitiesWidget';
import { SQLOptimizationWidget } from './SQLOptimizationWidget';
import { ServiceScopesWidget } from './ServiceScopesWidget';
import { OperationMetricsWidget } from './OperationMetricsWidget';
import { ProductRoadmapWidget } from './ProductRoadmapWidget';
import { useUser } from '../../../shared/context/UserContext';

function Dashboard() {
  const { permissions } = useUser();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {/* First Row - Tech Debt Reduction, Vulnerabilities, Expensive SQL Optimization */}
      {(permissions.canViewTechDebt ||
        permissions.canViewVulnerabilities ||
        permissions.canViewSQLOptimization) && (
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {permissions.canViewTechDebt && (
              <Grid
                size={{
                  xs: 12,
                  md:
                    permissions.canViewVulnerabilities &&
                    permissions.canViewSQLOptimization
                      ? 3
                      : permissions.canViewVulnerabilities ||
                        permissions.canViewSQLOptimization
                      ? 4
                      : 12,
                }}
              >
                <TechDebtWidget />
              </Grid>
            )}
            {permissions.canViewVulnerabilities && (
              <Grid
                size={{
                  xs: 12,
                  md:
                    permissions.canViewTechDebt &&
                    permissions.canViewSQLOptimization
                      ? 5
                      : permissions.canViewTechDebt ||
                        permissions.canViewSQLOptimization
                      ? 8
                      : 12,
                }}
              >
                <VulnerabilitiesWidget />
              </Grid>
            )}
            {permissions.canViewSQLOptimization && (
              <Grid
                size={{
                  xs: 12,
                  md:
                    permissions.canViewTechDebt &&
                    permissions.canViewVulnerabilities
                      ? 4
                      : permissions.canViewTechDebt ||
                        permissions.canViewVulnerabilities
                      ? 8
                      : 12,
                }}
              >
                <SQLOptimizationWidget />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {/* Second Row - App Rat, Service Scopes, AI Index */}
      {(permissions.canViewAppRat ||
        permissions.canViewServiceScopes ||
        permissions.canViewAIIndex) && (
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {permissions.canViewAppRat && (
              <Grid
                size={{
                  xs: 12,
                  md: permissions.canViewAIIndex
                    ? 5
                    : permissions.canViewServiceScopes
                    ? 6
                    : 12,
                }}
              >
                <AppRatWidget />
              </Grid>
            )}
            {permissions.canViewServiceScopes && (
              <Grid
                size={{
                  xs: 12,
                  md: permissions.canViewAIIndex
                    ? 4
                    : permissions.canViewAppRat
                    ? 6
                    : 12,
                }}
              >
                <ServiceScopesWidget />
              </Grid>
            )}
            {permissions.canViewAIIndex && (
              <Grid size={{ xs: 12, md: 3 }}>
                <AIIndexWidget />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {/* Third Row - Product EOL/Roadmap, Operation Metrics */}
      {(permissions.canViewProductRoadmap ||
        permissions.canViewOperationMetrics) && (
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {permissions.canViewProductRoadmap && (
              <Grid
                size={{
                  xs: 12,
                  md: permissions.canViewOperationMetrics ? 8 : 12,
                }}
              >
                <ProductRoadmapWidget />
              </Grid>
            )}
            {permissions.canViewOperationMetrics && (
              <Grid
                size={{
                  xs: 12,
                  md: permissions.canViewProductRoadmap ? 4 : 12,
                }}
              >
                <OperationMetricsWidget />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Dashboard;
