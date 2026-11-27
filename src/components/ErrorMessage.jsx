import React from 'react';
import { Alert, Box } from '@mui/material';

/**
 * ErrorMessage
 * Props:
 *   message — the string to display (passed down from App.jsx)
 *
 * Uses MUI <Alert severity="error"> which is already styled and accessible.
 */
function ErrorMessage({ message }) {
  if (!message) return null; // render nothing if there's no error

  return (
    <Box mt={3} px={2}>
      <Alert
        severity="error"
        variant="filled"
        sx={{ borderRadius: 3 }}
        // role="alert" is built into MUI Alert, so screen readers announce it
      >
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorMessage;
