import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const RoleComparisonTable = ({ permissionLabels }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Comparison
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Compare permissions between admin and user roles
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Permission
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Admin
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  User
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permissionLabels).map((key) => (
                <tr key={key}>
                  <td
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    {permissionLabels[key]}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Chip
                      label='✓'
                      color='success'
                      size='small'
                      variant='filled'
                    />
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Chip
                      label={
                        [
                          'canViewAIIndex',
                          'canViewProductRoadmap',
                          'canViewOperationMetrics',
                        ].includes(key)
                          ? '✗'
                          : '✓'
                      }
                      color={
                        [
                          'canViewAIIndex',
                          'canViewProductRoadmap',
                          'canViewOperationMetrics',
                        ].includes(key)
                          ? 'error'
                          : 'success'
                      }
                      size='small'
                      variant='filled'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoleComparisonTable;
