import React from 'react';
import { Box, Paper, Typography, Button, Alert, Divider } from '@mui/material';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { useDataUpload } from '../context/DataUploadContext';
import { downloadJsonFile, getDataStatistics } from '../utils/dataUploadUtils';

const ConversionResultsSection = () => {
  const { file, jsonData, error, success, previewData, setError } =
    useDataUpload();

  const handleDownloadJson = () => {
    try {
      if (!jsonData || !file) return;
      downloadJsonFile(jsonData, file.name);
    } catch (err) {
      setError(`Error downloading file: ${err.message}`);
    }
  };

  const statistics = getDataStatistics(jsonData);

  return (
    <Paper sx={{ p: 3, height: 'fit-content' }}>
      <Typography variant='h6' gutterBottom>
        Conversion Results
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity='success' sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {jsonData && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              Total Records: <strong>{statistics.rowCount}</strong>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Columns: <strong>{statistics.columnCount}</strong>
            </Typography>
          </Box>

          <Button
            variant='contained'
            onClick={handleDownloadJson}
            startIcon={<FileDownloadIcon />}
            sx={{ mb: 2 }}
            fullWidth
          >
            Download JSON
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant='subtitle2' gutterBottom>
            Preview (First 5 rows):
          </Typography>

          <Box
            sx={{
              maxHeight: 300,
              overflow: 'auto',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
            }}
          >
            <pre
              style={{
                margin: 0,
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(previewData, null, 2)}
            </pre>
          </Box>
        </>
      )}

      {!jsonData && !error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant='body2' color='text.secondary'>
            Upload and convert a file to see results here
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ConversionResultsSection;
