import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Upload as UploadIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import all form forms
import TechDebtForm from './TechDebtForm';
import AppRatForm from './AppRatForm';
import AIIndexForm from './AIIndexForm';
import VulnerabilitiesForm from './VulnerabilitiesForm';
import ServiceScopesForm from './ServiceScopesForm';
import SQLOptimizationForm from './SQLOptimizationForm';
import OperationMetricsForm from './OperationMetricsForm';
import ProductRoadmapForm from './ProductRoadmapForm';

import { useDashboardForms } from '../context/DashboardFormsContext';

const DashboardForms = () => {
  const { formData, errors, isSubmitting, resetForm, submitForm } =
    useDashboardForms();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const formSections = [
    { label: 'Tech Debt', component: TechDebtForm, icon: '🔧' },
    { label: 'Vulnerabilities', component: VulnerabilitiesForm, icon: '🛡️' },
    {
      label: 'SQL Optimization',
      component: SQLOptimizationForm,
      icon: '🚀',
    },
    { label: 'App Rationalization', component: AppRatForm, icon: '📱' },
    { label: 'Service Scopes', component: ServiceScopesForm, icon: '🎯' },
    { label: 'AI Index', component: AIIndexForm, icon: '🤖' },
    {
      label: 'Operation Metrics',
      component: OperationMetricsForm,
      icon: '📊',
    },
    { label: 'Product Roadmap', component: ProductRoadmapForm, icon: '🗺️' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await submitForm();
    if (success) {
      setShowSuccess(true);
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000); // Wait 2 seconds to show success message
    } else {
      setShowError(true);
    }
  };

  const handleReset = () => {
    resetForm();
    setCurrentTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getErrorCount = () => {
    return Object.keys(errors).length;
  };

  const exportFormData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-form-data-${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const CurrentFormSectionComponent = formSections[currentTab].component;

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DashboardIcon
              sx={{ mr: 2, fontSize: 40, color: 'primary.main' }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h4' component='h1' gutterBottom>
                Dashboard Configuration Forms
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Configure all dashboard metrics and data points for
                comprehensive reporting
              </Typography>
            </Box>

            {/* Status Indicators */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`${formSections.length} Sections`}
                color='info'
                size='small'
              />
              {getErrorCount() > 0 && (
                <Chip
                  label={`${getErrorCount()} Errors`}
                  color='error'
                  size='small'
                />
              )}
              <Chip
                label={`${formData.productRoadmap.items.length} Roadmap Items`}
                color='success'
                size='small'
              />
            </Box>
          </Box>

          {/* Progress Bar */}
          {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant='contained'
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              disabled={isSubmitting}
              color='primary'
            >
              {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </Button>

            <Button
              variant='outlined'
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset All
            </Button>

            <Button
              variant='outlined'
              startIcon={<UploadIcon />}
              onClick={exportFormData}
              disabled={isSubmitting}
            >
              Export Data
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant='scrollable'
          scrollButtons='auto'
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {formSections.map((section, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                  {/* Show error indicator if this section has errors */}
                  {Object.keys(errors).some(
                    (key) =>
                      key.includes(
                        section.label.toLowerCase().replace(/\s+/g, '')
                      ) ||
                      (section.label === 'Tech Debt' &&
                        key.includes('techDebt')) ||
                      (section.label === 'App Rationalization' &&
                        key.includes('appRat')) ||
                      (section.label === 'AI Index' &&
                        key.includes('aiIndex')) ||
                      (section.label === 'Vulnerabilities' &&
                        key.includes('vulnerabilities')) ||
                      (section.label === 'Service Scopes' &&
                        key.includes('serviceScopes')) ||
                      (section.label === 'SQL Optimization' &&
                        key.includes('sqlOptimization')) ||
                      (section.label === 'Operation Metrics' &&
                        key.includes('operationMetrics')) ||
                      (section.label === 'Product Roadmap' &&
                        key.includes('productRoadmap'))
                  ) && (
                    <Chip
                      size='small'
                      color='error'
                      label='!'
                      sx={{ ml: 1, minWidth: 20, height: 20 }}
                    />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Card>

      {/* Current Form Section */}
      <form onSubmit={handleSubmit}>
        <CurrentFormSectionComponent />

        {/* Bottom Actions */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='outlined'
              onClick={() => setCurrentTab(Math.max(0, currentTab - 1))}
              disabled={currentTab === 0}
            >
              Previous
            </Button>
            <Button
              variant='outlined'
              onClick={() =>
                setCurrentTab(Math.min(formSections.length - 1, currentTab + 1))
              }
              disabled={currentTab === formSections.length - 1}
            >
              Next
            </Button>
          </Box>

          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={isSubmitting}
            size='large'
          >
            {isSubmitting ? 'Saving Configuration...' : 'Save All Changes'}
          </Button>
        </Box>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Dashboard configuration saved successfully! All metrics have been
          updated. Redirecting to dashboard...
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={8000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Please fix the errors in the form before saving. Check all sections
          for validation errors.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardForms;
