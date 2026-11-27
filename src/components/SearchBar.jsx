import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * SearchBar — Module 2: Controlled Form
 *
 * Props:
 *   onSearch(city)  — called by App.jsx when user submits a valid city name
 *   loading         — boolean; disables the button while API is running
 *
 * Key React concept: CONTROLLED INPUT
 *   React owns the value at all times through `city` state.
 *   Every keystroke updates state → React re-renders → input shows new value.
 *   This is the opposite of an "uncontrolled" input where the DOM owns
 *   the value and you have to use a ref to read it.
 */
function SearchBar({ onSearch, loading }) {
  // `city` mirrors exactly what the user has typed in the box
  const [city, setCity] = useState('');

  // ── Handlers ──────────────────────────────────────────────────────────────

  /**
   * handleChange fires on every single keystroke.
   * e.target.value is the full current text in the box.
   */
  function handleChange(e) {
    setCity(e.target.value);
  }

  /**
   * handleClear wipes the input — clicking the ✕ icon calls this.
   */
  function handleClear() {
    setCity('');
  }

  /**
   * handleSubmit fires when the form is submitted (button click OR Enter key).
   * e.preventDefault() stops the page from refreshing (default HTML behaviour).
   * .trim() removes accidental leading/trailing spaces before we pass to App.
   */
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedCity = city.trim();

    // Guard: do nothing if the box is empty or only spaces
    if (!trimmedCity) return;

    // Hand the city name up to App.jsx
    onSearch(trimmedCity);
  }

  // ── Shared glassmorphism style (used by TextField and Button) ─────────────
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    /*
     * We wrap everything in an HTML <form> so that pressing Enter
     * naturally triggers onSubmit — no extra keydown listener needed.
     */
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={1.5}
      sx={{ width: '100%', mt: 2 }}
      // aria-label gives screen readers a name for this landmark
      aria-label="City weather search"
    >
      <TextField
        // --- Controlled: value always comes from state ---
        value={city}
        onChange={handleChange}

        // --- Accessibility ---
        label="Enter city name"
        // id + htmlFor pair links the label to the input for screen readers
        id="city-search-input"
        inputProps={{ 'aria-label': 'City name' }}
        placeholder="e.g. London, Tokyo, New York"

        // --- Behaviour ---
        autoComplete="off"
        autoFocus          // cursor lands here on page load
        disabled={loading} // lock the box while fetching

        // --- Layout ---
        fullWidth          // stretches to fill remaining row space
        variant="outlined"
        size="medium"

        // --- Clear button inside the input (only shown when there's text) ---
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </InputAdornment>
          ),
          endAdornment: city ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search"
                onClick={handleClear}
                edge="end"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}

        // --- Glassmorphism styling via the `sx` prop ---
        sx={{
          ...glassStyle,
          // Style the text the user types
          '& input': { color: 'white' },
          // Style the floating label
          '& label': { color: 'rgba(255,255,255,0.8)' },
          '& label.Mui-focused': { color: 'white' },
          // Style the border
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        // Disabled when: input is empty/whitespace OR fetch is in progress
        disabled={!city.trim() || loading}
        sx={{
          ...glassStyle,
          px: 3,
          fontWeight: 700,
          color: 'white',
          // Override MUI's disabled grey so the glass style still shows faintly
          '&.Mui-disabled': {
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.15)',
          },
          // Hover glow effect
          '&:hover': {
            background: 'rgba(255,255,255,0.28)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          },
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          minWidth: 100,
        }}
        aria-label="Search weather"
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
