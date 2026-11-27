import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import WbSunnyIcon    from '@mui/icons-material/WbSunny';
import CloudIcon      from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon     from '@mui/icons-material/AcUnit';

/**
 * WelcomeHero
 *
 * Shown ONLY when no search has happened yet (weatherData === null).
 * This is "conditional rendering" in action — App decides when to show it.
 *
 * Props:
 *   onSearch(city) — same handler from App; lets us trigger searches
 *                    when the user clicks a quick-pick chip
 */
function WelcomeHero({ onSearch }) {

  // Quick-pick cities — clicking any of these fires a real search
  const quickPicks = ['London', 'Tokyo', 'New York', 'Mumbai', 'Sydney', 'Paris'];

  // ── Shared glassmorphism card style ──────────────────────────────────────
  const glassCard = {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.25)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    color: 'white',
    p: { xs: 3, sm: 5 },
    mt: 4,
    textAlign: 'center',
    // Slide up and fade in
    animation: 'heroIn 0.6s ease',
    '@keyframes heroIn': {
      from: { opacity: 0, transform: 'translateY(32px)' },
      to:   { opacity: 1, transform: 'translateY(0)' },
    },
  };

  return (
    <Box sx={glassCard}>

      {/* ── Animated weather icons row ── */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        mb={3}
      >
        {/* Each icon has a gentle float animation with a different delay */}
        {[
          { Icon: WbSunnyIcon,      color: '#FFD200', delay: '0s'   },
          { Icon: CloudIcon,        color: '#cce0ff', delay: '0.2s' },
          { Icon: ThunderstormIcon, color: '#a0b4ff', delay: '0.4s' },
          { Icon: AcUnitIcon,       color: '#e0f4ff', delay: '0.6s' },
        ].map(({ Icon, color, delay }) => (
          <Icon
            key={delay}
            sx={{
              fontSize: 48,
              color,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              animation: `float 3s ease-in-out ${delay} infinite`,
              '@keyframes float': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%':     { transform: 'translateY(-8px)' },
              },
            }}
          />
        ))}
      </Stack>

      {/* ── Heading ── */}
      <Typography variant="h4" fontWeight={700} mb={1}>
        What's the weather like?
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
        Search any city above to get a live forecast
      </Typography>

      {/* ── Quick-pick city chips ── */}
      <Typography variant="caption" sx={{ opacity: 0.65, display: 'block', mb: 1.5 }}>
        Or try a popular city:
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={1}
      >
        {quickPicks.map((city, i) => (
          <Chip
            key={city}
            label={city}
            clickable
            onClick={() => onSearch(city)}
            sx={{
              background: 'rgba(255,255,255,0.18)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
              // Staggered fade-in for each chip
              animation: `chipIn 0.4s ease ${i * 0.07}s both`,
              '@keyframes chipIn': {
                from: { opacity: 0, transform: 'scale(0.8)' },
                to:   { opacity: 1, transform: 'scale(1)' },
              },
              '&:hover': {
                background: 'rgba(255,255,255,0.32)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </Stack>

    </Box>
  );
}

export default WelcomeHero;
