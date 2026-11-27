import { createTheme } from '@mui/material/styles';

/**
 * theme.js  (Module 6 — upgraded)
 *
 * Changes from Module 1:
 *  • Proper dark mode palette that looks great against gradient backgrounds
 *  • Visible keyboard focus ring for accessibility (WCAG 2.1 §2.4.7)
 *  • Smoother MUI component defaults (transitions, border-radius)
 */
export function getTheme(mode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#90caf9' : '#6C63FF',
      },
      secondary: {
        main: '#FF6584',
      },
      background: {
        // CssBaseline sets the page background to this.
        // We use a gradient on top anyway, but this ensures a sensible
        // fallback for any unstyled area.
        default: isDark ? '#121212' : '#f0f4ff',
        paper:   isDark ? '#1e1e2e' : '#ffffff',
      },
      text: {
        primary:   isDark ? '#e0e0e0' : '#1a1a2e',
        secondary: isDark ? '#a0a0b8' : '#555577',
      },
    },

    typography: {
      fontFamily: 'Roboto, sans-serif',
      h2: { fontWeight: 700 },
      h4: { fontWeight: 600 },
    },

    shape: {
      borderRadius: 16,
    },

    components: {
      // ── Keyboard focus ring (accessibility) ──────────────────────────────
      // By default MUI hides the focus ring on mouse click but shows it on Tab.
      // We enhance it to be a crisp 2px white outline, visible on any background.
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '2px solid white',
              outlineOffset: '3px',
            },
          },
        },
      },

      // ── TextField focus ring ──────────────────────────────────────────────
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '2px solid white',
              outlineOffset: '2px',
            },
          },
        },
      },

      // ── Chip ─────────────────────────────────────────────────────────────
      MuiChip: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '2px solid white',
              outlineOffset: '2px',
            },
          },
        },
      },

      // ── Smooth global transition on colour mode switch ────────────────────
      MuiCssBaseline: {
        styleOverrides: {
          '*, *::before, *::after': {
            // Let colour/background transitions animate when dark mode toggles
            transition: 'background-color 0.3s ease, color 0.2s ease',
          },
          // Thin, styled scrollbar (Chrome/Edge)
          '::-webkit-scrollbar': { width: '6px' },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
          },
        },
      },
    },
  });
}
