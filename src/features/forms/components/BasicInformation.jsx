import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
} from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';

const projectCategories = [
  'Web Development',
  'Mobile Development',
  'Data Analytics',
  'AI/ML',
  'Infrastructure',
  'Security',
  'DevOps',
  'Testing',
];

function BasicInformation({ formData, handleInputChange, errors }) {
  return (
    <Card elevation={2} sx={{ overflow: 'visible' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction='row' alignItems='center' spacing={1.5} sx={{ mb: 2 }}>
          <CodeIcon color='primary' sx={{ fontSize: 22 }} />
          <Typography variant='h6' color='primary' fontWeight={600}>
            Basic Information
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Project Name'
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              error={!!errors.projectName}
              helperText={errors.projectName}
              variant='outlined'
              required
              size='small'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              error={!!errors.category}
              required
              size='small'
            >
              <InputLabel>Project Category</InputLabel>
              <Select
                value={formData.category}
                label='Project Category'
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {projectCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography
                  variant='caption'
                  color='error'
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label='Project Description'
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              variant='outlined'
              required
              size='small'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BasicInformation;
