import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * ThemeToggle
 * Props:
 *   mode       — current theme mode: 'light' | 'dark'
 *   onToggle   — function to call when the button is clicked
 *
 * Shows a sun icon in dark mode (click to go light)
 * Shows a moon icon in light mode (click to go dark)
 */
function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {/* aria-label gives screen readers a meaningful description */}
      <IconButton
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{ color: 'white' }}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
