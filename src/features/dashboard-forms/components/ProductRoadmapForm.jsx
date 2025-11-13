import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDashboardForms } from '../context/DashboardFormsContext';
import {
  productRoadmapTypes,
  productRoadmapHealthOptions,
  productRoadmapStatusOptions,
  generateYearOptions,
} from '../utils/dashboardFormsUtils';

const ProductRoadmapForm = () => {
  const {
    formData,
    errors,
    addProductRoadmapItem,
    removeProductRoadmapItem,
    updateProductRoadmapItem,
    addProductRoadmapDetail,
    removeProductRoadmapDetail,
    updateProductRoadmapDetail,
  } = useDashboardForms();

  const [newItem, setNewItem] = useState({
    name: '',
    year: '2025',
    type: 'Re-Platform',
  });

  const [newDetail, setNewDetail] = useState({
    goLive: '',
    scope: '',
    region: '',
    health: 'Green',
    currentStatus: 'Planning',
    overallSummary: '',
  });

  const yearOptions = generateYearOptions(2024, 2030);

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      addProductRoadmapItem({ ...newItem });
      setNewItem({
        name: '',
        year: '2025',
        type: 'Re-Platform',
      });
    }
  };

  const handleUpdateItem = (index, field, value) => {
    const updatedItem = {
      ...formData.productRoadmap.items[index],
      [field]: value,
    };
    updateProductRoadmapItem(index, updatedItem);
  };

  const handleNewItemChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDetail = () => {
    if (
      newDetail.goLive.trim() &&
      newDetail.scope.trim() &&
      newDetail.region.trim() &&
      newDetail.overallSummary.trim()
    ) {
      addProductRoadmapDetail({ ...newDetail });
      setNewDetail({
        goLive: '',
        scope: '',
        region: '',
        health: 'Green',
        currentStatus: 'Planning',
        overallSummary: '',
      });
    }
  };

  const handleUpdateDetail = (index, field, value) => {
    const updatedDetail = {
      ...formData.productRoadmap.details[index],
      [field]: value,
    };
    updateProductRoadmapDetail(index, updatedDetail);
  };

  const handleNewDetailChange = (field, value) => {
    setNewDetail((prev) => ({ ...prev, [field]: value }));
  };

  // Group items by year for better visualization
  const itemsByYear = formData.productRoadmap.items.reduce(
    (acc, item, index) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push({ ...item, originalIndex: index });
      return acc;
    },
    {}
  );

  const sortedYears = Object.keys(itemsByYear).sort();

  return (
    <Card>
      <CardHeader
        title='Product Roadmap'
        subheader='Manage product roadmap items with timeline and categorization'
      />
      <CardContent>
        {/* Add New Item Form */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 1 }}>
          <Typography variant='h6' gutterBottom>
            Add New Roadmap Item
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Item Name'
                value={newItem.name}
                onChange={(e) => handleNewItemChange('name', e.target.value)}
                fullWidth
                placeholder='e.g., Live Compare'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={newItem.year}
                  onChange={(e) => handleNewItemChange('year', e.target.value)}
                  label='Year'
                >
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newItem.type}
                  onChange={(e) => handleNewItemChange('type', e.target.value)}
                  label='Type'
                >
                  {productRoadmapTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            disabled={!newItem.name.trim()}
          >
            Add Item
          </Button>
        </Box>

        {/* Error Display */}
        {errors['productRoadmap.items'] && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errors['productRoadmap.items']}
          </Alert>
        )}

        {/* Current Items Display */}
        <Typography variant='h6' gutterBottom>
          Current Roadmap Items ({formData.productRoadmap.items.length})
        </Typography>

        {formData.productRoadmap.items.length === 0 ? (
          <Alert severity='info' sx={{ mt: 2 }}>
            No roadmap items added yet. Add your first item above.
          </Alert>
        ) : (
          sortedYears.map((year) => (
            <Box key={year} sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ mb: 2, color: 'primary.main' }}>
                {year}
              </Typography>

              <Grid container spacing={2}>
                {itemsByYear[year].map((item) => (
                  <Grid size={{ xs: 12 }} key={item.originalIndex}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Grid container spacing={2} alignItems='center'>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <TextField
                            label='Item Name'
                            value={item.name}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.originalIndex,
                                'name',
                                e.target.value
                              )
                            }
                            error={
                              !!errors[
                                `productRoadmap.items.${item.originalIndex}.name`
                              ]
                            }
                            helperText={
                              errors[
                                `productRoadmap.items.${item.originalIndex}.name`
                              ]
                            }
                            fullWidth
                            size='small'
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                          <FormControl fullWidth size='small'>
                            <InputLabel>Year</InputLabel>
                            <Select
                              value={item.year}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.originalIndex,
                                  'year',
                                  e.target.value
                                )
                              }
                              label='Year'
                            >
                              {yearOptions.map((yearOption) => (
                                <MenuItem key={yearOption} value={yearOption}>
                                  {yearOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                          <FormControl fullWidth size='small'>
                            <InputLabel>Type</InputLabel>
                            <Select
                              value={item.type}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.originalIndex,
                                  'type',
                                  e.target.value
                                )
                              }
                              label='Type'
                            >
                              {productRoadmapTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                          <Chip
                            label={item.type}
                            color={
                              item.type === 'Re-Platform'
                                ? 'primary'
                                : item.type === 'Upgrade'
                                ? 'success'
                                : 'warning'
                            }
                            size='small'
                            sx={{ mr: 1 }}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 1 }}>
                          <IconButton
                            color='error'
                            onClick={() =>
                              removeProductRoadmapItem(item.originalIndex)
                            }
                            size='small'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}

        {/* Roadmap Details Section */}
        <Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
          Roadmap Details
        </Typography>

        {/* Add New Detail Form */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 1 }}>
          <Typography variant='h6' gutterBottom>
            Add New Roadmap Detail
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label='Go-Live Date'
                value={newDetail.goLive}
                onChange={(e) =>
                  handleNewDetailChange('goLive', e.target.value)
                }
                fullWidth
                placeholder='e.g., May 4th, Q1 2026'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label='Scope'
                value={newDetail.scope}
                onChange={(e) => handleNewDetailChange('scope', e.target.value)}
                fullWidth
                placeholder='e.g., Portal, SSAM'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label='Region'
                value={newDetail.region}
                onChange={(e) =>
                  handleNewDetailChange('region', e.target.value)
                }
                fullWidth
                placeholder='e.g., Americas, LATAM'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Health</InputLabel>
                <Select
                  value={newDetail.health}
                  onChange={(e) =>
                    handleNewDetailChange('health', e.target.value)
                  }
                  label='Health'
                >
                  {productRoadmapHealthOptions.map((health) => (
                    <MenuItem key={health} value={health}>
                      {health}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Current Status</InputLabel>
                <Select
                  value={newDetail.currentStatus}
                  onChange={(e) =>
                    handleNewDetailChange('currentStatus', e.target.value)
                  }
                  label='Current Status'
                >
                  {productRoadmapStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Overall Summary'
                value={newDetail.overallSummary}
                onChange={(e) =>
                  handleNewDetailChange('overallSummary', e.target.value)
                }
                fullWidth
                multiline
                rows={3}
                placeholder='Describe the current status and progress...'
              />
            </Grid>
          </Grid>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddDetail}
            disabled={
              !newDetail.goLive.trim() ||
              !newDetail.scope.trim() ||
              !newDetail.region.trim() ||
              !newDetail.overallSummary.trim()
            }
          >
            Add Detail
          </Button>
        </Box>

        {/* Current Details Display */}
        <Typography variant='h6' gutterBottom>
          Current Roadmap Details (
          {(formData.productRoadmap.details || []).length})
        </Typography>

        {!formData.productRoadmap.details ||
        formData.productRoadmap.details.length === 0 ? (
          <Alert severity='info' sx={{ mt: 2 }}>
            No roadmap details added yet. Add your first detail above.
          </Alert>
        ) : (
          formData.productRoadmap.details.map((detail, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: 1,
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Grid container spacing={2} alignItems='center'>
                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label='Go-Live'
                    value={detail.goLive}
                    onChange={(e) =>
                      handleUpdateDetail(index, 'goLive', e.target.value)
                    }
                    error={!!errors[`productRoadmap.details.${index}.goLive`]}
                    helperText={
                      errors[`productRoadmap.details.${index}.goLive`]
                    }
                    fullWidth
                    size='small'
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label='Scope'
                    value={detail.scope}
                    onChange={(e) =>
                      handleUpdateDetail(index, 'scope', e.target.value)
                    }
                    error={!!errors[`productRoadmap.details.${index}.scope`]}
                    helperText={errors[`productRoadmap.details.${index}.scope`]}
                    fullWidth
                    size='small'
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label='Region'
                    value={detail.region}
                    onChange={(e) =>
                      handleUpdateDetail(index, 'region', e.target.value)
                    }
                    error={!!errors[`productRoadmap.details.${index}.region`]}
                    helperText={
                      errors[`productRoadmap.details.${index}.region`]
                    }
                    fullWidth
                    size='small'
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 1 }}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>Health</InputLabel>
                    <Select
                      value={detail.health}
                      onChange={(e) =>
                        handleUpdateDetail(index, 'health', e.target.value)
                      }
                      label='Health'
                    >
                      {productRoadmapHealthOptions.map((health) => (
                        <MenuItem key={health} value={health}>
                          {health}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={detail.currentStatus}
                      onChange={(e) =>
                        handleUpdateDetail(
                          index,
                          'currentStatus',
                          e.target.value
                        )
                      }
                      label='Status'
                      error={
                        !!errors[
                          `productRoadmap.details.${index}.currentStatus`
                        ]
                      }
                    >
                      {productRoadmapStatusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label='Summary'
                    value={detail.overallSummary}
                    onChange={(e) =>
                      handleUpdateDetail(
                        index,
                        'overallSummary',
                        e.target.value
                      )
                    }
                    error={
                      !!errors[`productRoadmap.details.${index}.overallSummary`]
                    }
                    helperText={
                      errors[`productRoadmap.details.${index}.overallSummary`]
                    }
                    fullWidth
                    multiline
                    rows={2}
                    size='small'
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={detail.health}
                      color={
                        detail.health === 'Green'
                          ? 'success'
                          : detail.health === 'Yellow'
                          ? 'warning'
                          : 'error'
                      }
                      size='small'
                    />
                    <IconButton
                      color='error'
                      onClick={() => removeProductRoadmapDetail(index)}
                      size='small'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ProductRoadmapForm;
