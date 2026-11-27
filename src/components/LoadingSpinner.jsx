import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * LoadingSpinner
 * Shown while we wait for the API to respond.
 * No props needed — it always looks the same.
 */
function LoadingSpinner() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
      // aria-live tells screen readers to announce when this appears
      aria-live="polite"
      aria-label="Loading weather data"
    >
      <CircularProgress sx={{ color: 'white' }} size={56} />
      <Typography sx={{ color: 'white', opacity: 0.8 }}>
        Fetching weather…
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;
