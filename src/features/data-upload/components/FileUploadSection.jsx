import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useDataUpload } from '../context/DataUploadContext';
import {
  validateFile,
  convertFileToJson,
  formatFileSize,
  getFileExtension,
} from '../utils/dataUploadUtils';

const FileUploadSection = () => {
  const {
    file,
    loading,
    setFile,
    setLoading,
    setConversionResults,
    setError,
    resetState,
  } = useDataUpload();

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const validation = validateFile(uploadedFile);
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    setFile(uploadedFile);
  };

  const handleConvertToJson = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);

    const result = await convertFileToJson(file);

    if (result.success) {
      setConversionResults(result.data, result.preview, result.message);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, height: 'fit-content' }}>
      <Typography variant='h6' gutterBottom>
        File Upload
      </Typography>

      <Box
        sx={{
          border: '2px dashed',
          borderColor: file ? 'success.main' : 'grey.300',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          backgroundColor: file ? 'success.light' : 'grey.50',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'primary.light',
          },
        }}
      >
        <input
          accept='.xlsx,.xls,.csv'
          style={{ display: 'none' }}
          id='file-upload'
          type='file'
          onChange={handleFileUpload}
        />
        <label htmlFor='file-upload'>
          <IconButton
            color='primary'
            aria-label='upload file'
            component='span'
            sx={{ mb: 2 }}
          >
            <CloudUploadIcon sx={{ fontSize: 48 }} />
          </IconButton>
          <Typography variant='h6' gutterBottom>
            {file ? 'File Selected' : 'Choose File'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Drag and drop or click to select Excel/CSV files
          </Typography>
        </label>
      </Box>

      {file && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {file.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <Box>
                <Chip
                  label={getFileExtension(file.name)}
                  color='primary'
                  size='small'
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={resetState} color='error' size='small'>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant='contained'
          onClick={handleConvertToJson}
          disabled={!file || loading}
          startIcon={<VisibilityIcon />}
          fullWidth
        >
          {loading ? 'Converting...' : 'Convert to JSON'}
        </Button>
        <Button
          variant='outlined'
          onClick={resetState}
          disabled={loading}
          startIcon={<DeleteIcon />}
        >
          Reset
        </Button>
      </Box>

      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Paper>
  );
};

export default FileUploadSection;
