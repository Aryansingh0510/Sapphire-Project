import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon        from '@mui/icons-material/WaterDrop';
import AirIcon              from '@mui/icons-material/Air';
import ArrowUpwardIcon      from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon    from '@mui/icons-material/ArrowDownward';

import WeatherIcon from './WeatherIcon.jsx';

/**
 * WeatherCard  (Module 6 — upgraded)
 *
 * Changes from Module 4:
 *  • Staggered entrance animation on each StatItem (index-based delay)
 *  • Better responsive font sizes via breakpoint values in `sx`
 *  • Semantic <section> element with aria-label for screen readers
 *  • Sunrise / sunset display using the API data
 *
 * Props:
 *   weatherData — full OWM current-weather response object
 */
function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const { name, sys, weather, main, wind, dt, timezone } = weatherData;
  const { country, sunrise, sunset }     = sys;
  const { icon, description }            = weather[0];
  const { temp, feels_like, temp_min, temp_max, humidity } = main;

  // ── Helpers ───────────────────────────────────────────────────────────────

  // Format a unix timestamp (seconds) into local time HH:MM for the searched city
  function cityTime(unixSec) {
    const d = new Date((unixSec + timezone) * 1000);
    return `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
  }

  const celsius = (v) => `${Math.round(v)}°`;
  const desc    = description.charAt(0).toUpperCase() + description.slice(1);
  const localTime  = cityTime(dt);
  const sunriseStr = cityTime(sunrise);
  const sunsetStr  = cityTime(sunset);

  // ── Shared glass card style ───────────────────────────────────────────────
  const cardSx = {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
    color: 'white',
    p: { xs: 3, sm: 4 },
    mt: 4,
    animation: 'cardIn 0.5s cubic-bezier(0.22,1,0.36,1)',
    '@keyframes cardIn': {
      from: { opacity: 0, transform: 'translateY(28px) scale(0.97)' },
      to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
    },
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    /*
     * <section> with aria-label is a semantic landmark.
     * Screen reader users can jump directly to it ("weather results region").
     * Box component="section" renders a <section> HTML tag, not a <div>.
     */
    <Box component="section" aria-label="Weather results" sx={cardSx}>

      {/* ── HEADER ── */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            lineHeight={1.1}
            sx={{ fontSize: { xs: '1.6rem', sm: '2.1rem' } }}
          >
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.75, mt: 0.3 }}>
            {country}
          </Typography>
        </Box>

        {/* Local time + sun times stacked on the right */}
        <Box textAlign="right">
          <Typography variant="h6" fontWeight={600}>
            {localTime}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.65, display: 'block' }}>
            🌅 {sunriseStr} &nbsp;🌇 {sunsetStr}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />

      {/* ── TEMPERATURE + ICON ── */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          {/* Large temperature — biggest element on the card */}
          <Typography
            variant="h2"
            fontWeight={700}
            lineHeight={1}
            sx={{ fontSize: { xs: '4.5rem', sm: '6rem' } }}
            aria-label={`Temperature: ${Math.round(temp)} degrees Celsius`}
          >
            {celsius(temp)}C
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.85, mt: 0.5, textTransform: 'capitalize' }}
          >
            {desc}
          </Typography>
        </Box>

        <WeatherIcon iconCode={icon} size={130} alt={desc} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />

      {/* ── STAT CHIPS — staggered entrance ── */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(90px, 1fr))"
        gap={1.5}
        role="list"
        aria-label="Weather statistics"
      >
        <StatItem delay={0}    icon={<DeviceThermostatIcon fontSize="small" />} label="Feels like" value={`${celsius(feels_like)}C`} />
        <StatItem delay={0.07} icon={<ArrowUpwardIcon      fontSize="small" />} label="High"       value={`${celsius(temp_max)}C`}   />
        <StatItem delay={0.14} icon={<ArrowDownwardIcon    fontSize="small" />} label="Low"        value={`${celsius(temp_min)}C`}   />
        <StatItem delay={0.21} icon={<WaterDropIcon        fontSize="small" />} label="Humidity"   value={`${humidity}%`}            />
        <StatItem delay={0.28} icon={<AirIcon              fontSize="small" />} label="Wind"       value={`${wind.speed} m/s`}       />
      </Box>

    </Box>
  );
}

// ── StatItem (private to this file) ─────────────────────────────────────────
/**
 * Props:
 *   icon  — MUI icon element
 *   label — string below the value
 *   value — formatted string
 *   delay — CSS animation-delay in seconds (creates the stagger effect)
 */
function StatItem({ icon, label, value, delay = 0 }) {
  return (
    <Box
      role="listitem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: { xs: 1, sm: 1.5 },
        gap: 0.4,
        // Each chip fades + rises in with a unique delay
        animation: `statIn 0.45s ease ${delay}s both`,
        '@keyframes statIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        '&:hover': {
          background: 'rgba(255,255,255,0.18)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease',
        },
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
    >
      <Box sx={{ opacity: 0.75 }}>{icon}</Box>
      <Typography variant="body2" fontWeight={700} sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>
        {label}
      </Typography>
    </Box>
  );
}

export default WeatherCard;
