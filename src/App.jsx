import React, { useState } from 'react';
import {
  Box, Container, AppBar, Toolbar,
  Typography, Chip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Components
import SearchBar    from './components/SearchBar.jsx';
import WeatherCard  from './components/WeatherCard.jsx';
import WelcomeHero  from './components/WelcomeHero.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import ThemeToggle  from './components/ThemeToggle.jsx';

// API service
import { fetchWeather } from './services/weatherApi.js';

// Utilities — now takes (conditionId, weatherData) in Module 6
import { getBackgroundGradient } from './utils/backgroundGradient.js';

/**
 * App.jsx  (Module 6 — final polish)
 *
 * Changes from Module 5:
 *  • Imports and renders <WelcomeHero> for the empty state
 *  • Passes full weatherData to getBackgroundGradient so it can use
 *    the city's real sunrise/sunset times for night detection
 *  • Passes onSearch to WelcomeHero so quick-pick chips work
 */
function App({ themeMode, toggleTheme }) {

  // ── STATE ─────────────────────────────────────────────────────────────────
  const [weatherData,  setWeatherData]  = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [currentCity,  setCurrentCity]  = useState('');

  // ── BACKGROUND ───────────────────────────────────────────────────────────
  // Module 6: pass full weatherData → gradient uses city's sunrise/sunset
  const conditionId = weatherData?.weather?.[0]?.id ?? null;
  const bgGradient  = getBackgroundGradient(conditionId, weatherData);

  // ── SEARCH HANDLER ────────────────────────────────────────────────────────
  async function handleSearch(city) {
    setLoading(true);
    setError('');
    setWeatherData(null);
    setCurrentCity('');

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setCurrentCity(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <Box
      minHeight="100vh"
      sx={{ background: bgGradient, transition: 'background 1.2s ease' }}
    >

      {/* ── AppBar ── */}
      <AppBar position="static" elevation={0} sx={{ background: 'rgba(0,0,0,0.2)' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              🌤 Weather App
            </Typography>
            {currentCity && (
              <Chip
                icon={<LocationOnIcon sx={{ color: 'white !important' }} />}
                label={currentCity}
                size="small"
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  backdropFilter: 'blur(8px)',
                  animation: 'fadeIn 0.4s ease',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'scale(0.8)' },
                    to:   { opacity: 1, transform: 'scale(1)' },
                  },
                }}
              />
            )}
          </Box>
          <ThemeToggle mode={themeMode} onToggle={toggleTheme} />
        </Toolbar>
      </AppBar>

      {/* ── Main content ── */}
      {/*
        maxWidth="sm" keeps the layout readable on wide screens.
        On mobile it fills the full width with padding from Container.
      */}
      <Container maxWidth="sm" sx={{ pt: { xs: 3, sm: 5 }, pb: 6 }}>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/*
          CONDITIONAL RENDERING — four mutually exclusive states:
          1. Loading  → spinner
          2. Error    → error alert
          3. Success  → weather card
          4. Empty    → welcome hero (before any search)

          Each condition is a boolean expression followed by && component.
          React renders nothing for `false`, so this is clean and readable.
        */}
        {loading                            && <LoadingSpinner />}
        {!loading && error                  && <ErrorMessage message={error} />}
        {!loading && !error && weatherData  && <WeatherCard weatherData={weatherData} />}
        {!loading && !error && !weatherData && <WelcomeHero onSearch={handleSearch} />}

      </Container>
    </Box>
  );
}

export default App;
