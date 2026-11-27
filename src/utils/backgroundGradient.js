/**
 * backgroundGradient.js  (Module 6 — upgraded)
 *
 * CHANGE from Module 1: we now accept the full weatherData object so we can
 * use the CITY'S actual sunrise/sunset times to decide "is it night?"
 * instead of using the user's local machine clock.
 *
 * Example: it's 2 PM in India but you search for Los Angeles (8:30 AM there).
 * Old code: not night (Indian time is daytime) ✓ but coincidentally correct
 * This code: checks LA's actual sunrise/sunset from the API — always correct.
 *
 * OWM condition ID ranges:
 *   2xx = Thunderstorm  |  3xx + 5xx = Rain  |  6xx = Snow
 *   7xx = Atmosphere    |  800 = Clear        |  80x = Clouds
 */

export function getBackgroundGradient(conditionId, weatherData = null) {
  // ── Night detection ───────────────────────────────────────────────────────
  let isNight = false;

  if (weatherData) {
    // Use the city's actual sunrise/sunset  (all three are unix seconds in UTC)
    const { dt, sys } = weatherData;
    isNight = dt < sys.sunrise || dt > sys.sunset;
  } else {
    // Fallback: user's local clock (used before any search)
    const h = new Date().getHours();
    isNight = h >= 21 || h < 6;
  }

  // ── Night gradient (overrides all weather conditions) ─────────────────────
  if (isNight) {
    return 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)';
  }

  // ── No data yet ───────────────────────────────────────────────────────────
  if (!conditionId) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  // ── Daytime: pick by condition ID ─────────────────────────────────────────
  if (conditionId >= 200 && conditionId < 300) {
    // Thunderstorm — dramatic dark charcoal
    return 'linear-gradient(135deg, #232526 0%, #414345 100%)';
  }
  if (conditionId >= 300 && conditionId < 400) {
    // Drizzle — soft blue-grey
    return 'linear-gradient(135deg, #5f6f8f 0%, #8ea8c3 100%)';
  }
  if (conditionId >= 500 && conditionId < 600) {
    // Rain — stormy blue
    return 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)';
  }
  if (conditionId >= 600 && conditionId < 700) {
    // Snow — clean icy white-blue
    return 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)';
  }
  if (conditionId >= 700 && conditionId < 800) {
    // Atmosphere / mist / fog — muted pewter
    return 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)';
  }
  if (conditionId === 800) {
    // Clear sky — warm sunny amber-gold
    return 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)';
  }
  if (conditionId === 801) {
    // Few clouds — still sunny but soft
    return 'linear-gradient(135deg, #f4a94e 0%, #80d0c7 100%)';
  }
  // 802-804: Partly to fully cloudy — cool steel blue
  return 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)';
}
