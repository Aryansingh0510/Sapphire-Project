import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme.js';
import App from './App.jsx';

/**
 * Root entry point.
 *
 * ThemeProvider  — makes our MUI theme available to every child component.
 * CssBaseline    — like a CSS reset; removes browser default margin/padding
 *                  and sets the background colour from the theme.
 *
 * We keep `themeMode` state here so we can pass a toggle function into <App>
 * and let the user switch between light and dark.
 */
function Root() {
  // 'light' is the default mode
  const [themeMode, setThemeMode] = useState('light');

  // useMemo avoids rebuilding the theme object on every render
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  function toggleTheme() {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies background & text colour from the theme */}
      <CssBaseline />
      <App themeMode={themeMode} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
