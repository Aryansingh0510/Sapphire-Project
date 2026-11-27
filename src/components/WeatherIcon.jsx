import React from 'react';
import { Box } from '@mui/material';

/**
 * WeatherIcon
 *
 * Props:
 *   iconCode  — the 3-character code from the API, e.g. "01d", "10n"
 *   size      — pixel width/height (defaults to 100)
 *   alt       — description text for screen readers
 *
 * OpenWeatherMap gives us an icon code like "10d" (rain, daytime).
 * We just slot it into their free icon URL — no MUI icon mapping needed.
 *
 * URL format: https://openweathermap.org/img/wn/{code}@2x.png
 *   @2x = double resolution (100×100px), looks sharp on retina screens.
 */
function WeatherIcon({ iconCode, size = 100, alt = 'Weather icon' }) {
  // Don't render anything if the API hasn't given us a code yet
  if (!iconCode) return null;

  const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Box
      component="img"
      src={url}
      alt={alt}
      // Drop shadow makes the icon pop against the gradient background
      sx={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        // Subtle entrance animation
        animation: 'fadeIn 0.6s ease',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'scale(0.8)' },
          to:   { opacity: 1, transform: 'scale(1)' },
        },
      }}
    />
  );
}

export default WeatherIcon;
