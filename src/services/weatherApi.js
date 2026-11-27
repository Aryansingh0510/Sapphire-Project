/**
 * weatherApi.js — the ONLY place in the app that talks to OpenWeatherMap.
 *
 * Rules we follow here:
 *   1. API key comes from .env — never hardcoded.
 *   2. Every error is caught and re-thrown as a plain English message
 *      so the UI can display it without knowing about HTTP status codes.
 *   3. Components call these functions; they never call fetch() themselves.
 */

// Vite exposes .env variables through import.meta.env
// Any variable starting with VITE_ is safe to use in browser code
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: guard against a missing or placeholder API key
// ─────────────────────────────────────────────────────────────────────────────
function checkApiKey() {
  if (!API_KEY || API_KEY === 'your_openweathermap_api_key_here') {
    throw new Error(
      'API key not set. Create a .env file and add: VITE_WEATHER_API_KEY=your_key'
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: turn an HTTP error status into a friendly message
// ─────────────────────────────────────────────────────────────────────────────
function handleHttpError(status, city) {
  if (status === 401) {
    throw new Error(
      'Invalid API key. Check your .env file — the key may also need a few minutes to activate.'
    );
  }
  if (status === 404) {
    throw new Error(
      `City "${city}" not found. Check the spelling or try adding the country code (e.g. "Springfield, US").`
    );
  }
  if (status === 429) {
    throw new Error('Too many requests. You have hit the free-tier limit — wait a minute and try again.');
  }
  throw new Error(`Unexpected server error (${status}). Please try again later.`);
}

// ─────────────────────────────────────────────────────────────────────────────
// fetchWeather(city) — current weather by city name
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Returns a weather object shaped like:
 * {
 *   name: "London",
 *   sys:  { country: "GB" },
 *   weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
 *   main: { temp: 15, feels_like: 13, temp_min: 11, temp_max: 17, humidity: 72 },
 *   wind: { speed: 5.1 },
 *   timezone: 0,       ← seconds offset from UTC (used for local time)
 *   dt: 1700000000     ← unix timestamp of the reading
 * }
 *
 * Throws an Error with a user-friendly message on any failure.
 */
export async function fetchWeather(city) {
  checkApiKey();

  // encodeURIComponent handles spaces and special characters in city names
  const url =
    `${BASE_URL}/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}` +
    `&units=metric`;   // ← metric = Celsius; use 'imperial' for Fahrenheit

  let response;

  try {
    // fetch() throws only on a true network failure (no internet, DNS error…)
    // A 404 or 401 response does NOT throw — that's what the status check below is for
    response = await fetch(url);
  } catch {
    // This catch block only runs when there's no network at all
    throw new Error('Network error — please check your internet connection.');
  }

  // OWM always returns JSON, even for errors, so we can parse it safely
  const data = await response.json();

  // response.ok is true for 200-299 status codes
  if (!response.ok) {
    handleHttpError(response.status, city);
  }

  return data; // ← the full weather object described above
}

// ─────────────────────────────────────────────────────────────────────────────
// fetchForecast(city) — 5-day / 3-hour forecast  [Capstone Module 7]
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchForecast(city) {
  checkApiKey();

  const url =
    `${BASE_URL}/forecast` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}` +
    `&units=metric`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Network error — please check your internet connection.');
  }

  const data = await response.json();
  if (!response.ok) handleHttpError(response.status, city);

  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// fetchWeatherByCoords(lat, lon) — geolocation search  [Capstone Module 8]
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchWeatherByCoords(lat, lon) {
  checkApiKey();

  const url =
    `${BASE_URL}/weather` +
    `?lat=${lat}&lon=${lon}` +
    `&appid=${API_KEY}` +
    `&units=metric`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Network error — please check your internet connection.');
  }

  const data = await response.json();
  if (!response.ok) handleHttpError(response.status, `(${lat}, ${lon})`);

  return data;
}
