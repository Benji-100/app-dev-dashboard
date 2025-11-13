import React, { useState } from 'react';
import { Box, Grid, Snackbar, Alert } from '@mui/material';

// Import form components
// import FormHeader from './FormHeader';
import BasicInformation from './BasicInformation';
import TeamTechnology from './TeamTechnology';
import ProjectSettings from './ProjectSettings';
import RatingsAssessment from './RatingsAssessment';
import BudgetTimeline from './BudgetTimeline';
import ActionButtons from './ActionButtons';

function Forms() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    category: '',
    assignedTeam: [],
    priority: 'medium',
    projectRating: 0,
    technologies: [],
    budget: 50000,
    isActive: true,
    hasDocumentation: false,
    needsApproval: false,
    estimatedHours: [40, 120],
    clientFeedback: 3,
    projectType: 'internal',
    riskLevel: 2,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.assignedTeam.length === 0) {
      newErrors.assignedTeam = 'At least one team member must be assigned';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        setShowSuccess(true);
        // Here you would typically send data to an API
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      projectName: '',
      description: '',
      category: '',
      assignedTeam: [],
      priority: 'medium',
      projectRating: 0,
      technologies: [],
      budget: 50000,
      isActive: true,
      hasDocumentation: false,
      needsApproval: false,
      estimatedHours: [40, 120],
      clientFeedback: 3,
      projectType: 'internal',
      riskLevel: 2,
    });
    setErrors({});
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 1.5, md: 2 },
        mx: 'auto',
        bgcolor: 'background.default',
      }}
    >
      {/* Header Section */}
      {/* <FormHeader /> */}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Basic Information Card */}
          <Grid size={{ xs: 12 }}>
            <BasicInformation
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </Grid>

          {/* Team & Technology Card */}
          <Grid size={{ xs: 12 }}>
            <TeamTechnology
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </Grid>

          {/* Project Settings Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <ProjectSettings
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Grid>

          {/* Ratings & Assessment Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <RatingsAssessment
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Grid>

          {/* Budget & Timeline Card */}
          <Grid size={{ xs: 12 }}>
            <BudgetTimeline
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }}>
            <ActionButtons
              handleClear={handleClear}
              isSubmitting={isSubmitting}
            />
          </Grid>
        </Grid>
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
          Project form submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Forms;
