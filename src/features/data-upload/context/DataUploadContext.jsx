import React, { createContext, useContext, useState } from 'react';

const DataUploadContext = createContext();

export const useDataUpload = () => {
  const context = useContext(DataUploadContext);
  if (!context) {
    throw new Error('useDataUpload must be used within a DataUploadProvider');
  }
  return context;
};

export const DataUploadProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewData, setPreviewData] = useState(null);

  const resetState = () => {
    setFile(null);
    setJsonData(null);
    setError('');
    setSuccess('');
    setPreviewData(null);
    setLoading(false);

    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const setFileData = (uploadedFile) => {
    setFile(uploadedFile);
    setError('');
    setSuccess('');
    setJsonData(null);
    setPreviewData(null);
  };

  const setConversionResults = (data, preview, successMessage) => {
    setJsonData(data);
    setPreviewData(preview);
    setSuccess(successMessage);
    setError('');
  };

  const setErrorMessage = (errorMessage) => {
    setError(errorMessage);
    setSuccess('');
  };

  const value = {
    // State
    file,
    jsonData,
    loading,
    error,
    success,
    previewData,

    // Actions
    setFile: setFileData,
    setJsonData,
    setLoading,
    setError: setErrorMessage,
    setSuccess,
    setPreviewData,
    setConversionResults,
    resetState,
  };

  return (
    <DataUploadContext.Provider value={value}>
      {children}
    </DataUploadContext.Provider>
  );
};
