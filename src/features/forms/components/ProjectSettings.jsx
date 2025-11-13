import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Checkbox,
  Switch,
  FormGroup,
  Stack,
} from '@mui/material';
import { Speed as SpeedIcon } from '@mui/icons-material';

function ProjectSettings({ formData, handleInputChange }) {
  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction='row' alignItems='center' spacing={1.5} sx={{ mb: 2 }}>
          <SpeedIcon color='primary' sx={{ fontSize: 22 }} />
          <Typography variant='h6' color='primary' fontWeight={600}>
            Project Settings
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <FormControl component='fieldset' size='small'>
            <FormLabel
              component='legend'
              sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}
            >
              Project Priority
            </FormLabel>
            <RadioGroup
              row
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
            >
              <FormControlLabel
                value='low'
                control={<Radio size='small' />}
                label='Low'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <FormControlLabel
                value='medium'
                control={<Radio size='small' />}
                label='Medium'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <FormControlLabel
                value='high'
                control={<Radio size='small' />}
                label='High'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <FormControlLabel
                value='critical'
                control={<Radio size='small' />}
                label='Critical'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl component='fieldset' size='small'>
            <FormLabel
              component='legend'
              sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}
            >
              Project Type
            </FormLabel>
            <RadioGroup
              row
              value={formData.projectType}
              onChange={(e) => handleInputChange('projectType', e.target.value)}
            >
              <FormControlLabel
                value='internal'
                control={<Radio size='small' />}
                label='Internal'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <FormControlLabel
                value='client'
                control={<Radio size='small' />}
                label='Client'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <FormControlLabel
                value='research'
                control={<Radio size='small' />}
                label='Research'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange('isActive', e.target.checked)
                }
                color='primary'
                size='small'
              />
            }
            label='Project Active'
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.hasDocumentation}
                  onChange={(e) =>
                    handleInputChange('hasDocumentation', e.target.checked)
                  }
                  size='small'
                />
              }
              label='Has Documentation'
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.needsApproval}
                  onChange={(e) =>
                    handleInputChange('needsApproval', e.target.checked)
                  }
                  size='small'
                />
              }
              label='Needs Approval'
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
          </FormGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectSettings;
