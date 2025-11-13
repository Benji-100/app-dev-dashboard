import React, { createContext, useContext, useState } from 'react';
import { useDashboard } from '../../dashboard/context/DashboardContext';
import initialFormData from '../../../data/dashboardData.json';
import {
  getFormattedFormData,
  validateDashboardForm,
  updateFormField,
  updateRoadmapItem,
  addRoadmapItem,
  removeRoadmapItem,
  updateRoadmapDetail,
  addRoadmapDetail,
  removeRoadmapDetail,
  clearFieldError,
} from '../utils/dashboardFormsUtils';

const DashboardFormsContext = createContext();

export const useDashboardForms = () => {
  const context = useContext(DashboardFormsContext);
  if (!context) {
    throw new Error(
      'useDashboardForms must be used within a DashboardFormsProvider'
    );
  }
  return context;
};

export const DashboardFormsProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setDashboardData } = useDashboard();

  const updateField = (fieldPath, value) => {
    setFormData((prev) => updateFormField(prev, fieldPath, value));

    // Clear any errors for this field
    setErrors((prev) => clearFieldError(prev, fieldPath));
  };

  const updateProductRoadmapItem = (index, item) => {
    setFormData((prev) => updateRoadmapItem(prev, index, item));
  };

  const addProductRoadmapItem = (item) => {
    setFormData((prev) => addRoadmapItem(prev, item));
  };

  const removeProductRoadmapItem = (index) => {
    setFormData((prev) => removeRoadmapItem(prev, index));
  };

  const updateProductRoadmapDetail = (index, detail) => {
    setFormData((prev) => updateRoadmapDetail(prev, index, detail));
  };

  const addProductRoadmapDetail = (detail) => {
    setFormData((prev) => addRoadmapDetail(prev, detail));
  };

  const removeProductRoadmapDetail = (index) => {
    setFormData((prev) => removeRoadmapDetail(prev, index));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = validateDashboardForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Dashboard form submitted:', formData);

      // Format the data to match the expected dashboard format
      const formattedData = getFormattedFormData(formData);

      // Update the dashboard context with the formatted data
      setDashboardData(formattedData);

      return true;
    } catch (error) {
      console.error('Submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    formData,
    errors,
    isSubmitting,
    updateField,
    updateProductRoadmapItem,
    addProductRoadmapItem,
    removeProductRoadmapItem,
    updateProductRoadmapDetail,
    addProductRoadmapDetail,
    removeProductRoadmapDetail,
    resetForm,
    validateForm,
    submitForm,
  };

  return (
    <DashboardFormsContext.Provider value={value}>
      {children}
    </DashboardFormsContext.Provider>
  );
};
