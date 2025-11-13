import * as XLSX from 'xlsx';

/**
 * Validates if the uploaded file is a supported format
 * @param {File} file - The uploaded file
 * @returns {Object} - Validation result with isValid and errorMessage
 */
export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, errorMessage: 'No file selected' };
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const supportedFormats = ['xlsx', 'xls', 'csv'];

  if (!supportedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      errorMessage:
        'Please upload a valid Excel file (.xlsx, .xls) or CSV file',
    };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * Converts Excel/CSV file to JSON format
 * @param {File} file - The file to convert
 * @returns {Promise<Object>} - Conversion result with data or error
 */
export const convertFileToJson = async (file) => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(fileBuffer, { type: 'array' });

    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Convert to JSON
    const jsonResult = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
    });

    // Convert array of arrays to array of objects with proper headers
    if (jsonResult.length > 0) {
      const headers = jsonResult[0];
      const dataRows = jsonResult.slice(1);

      const formattedData = dataRows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });

      return {
        success: true,
        data: formattedData,
        preview: formattedData.slice(0, 5), // First 5 rows for preview
        message: `Successfully converted ${formattedData.length} rows to JSON format`,
      };
    } else {
      return {
        success: false,
        error: 'The uploaded file appears to be empty',
      };
    }
  } catch (err) {
    return {
      success: false,
      error: `Error converting file: ${err.message}`,
    };
  }
};

/**
 * Downloads JSON data as a file
 * @param {Array} jsonData - The JSON data to download
 * @param {string} fileName - Original file name for naming the download
 */
export const downloadJsonFile = (jsonData, fileName) => {
  if (!jsonData || !jsonData.length) {
    throw new Error('No data to download');
  }

  const dataStr = JSON.stringify(jsonData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName.split('.')[0]}_converted.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Formats file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets file extension from filename
 * @param {string} fileName - The file name
 * @returns {string} - File extension in uppercase
 */
export const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toUpperCase();
};

/**
 * Gets statistics about the converted JSON data
 * @param {Array} jsonData - The JSON data array
 * @returns {Object} - Statistics object with rowCount and columnCount
 */
export const getDataStatistics = (jsonData) => {
  if (!jsonData || !jsonData.length) {
    return { rowCount: 0, columnCount: 0 };
  }

  return {
    rowCount: jsonData.length,
    columnCount: Object.keys(jsonData[0] || {}).length,
  };
};
