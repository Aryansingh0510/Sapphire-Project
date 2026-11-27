# 🌤 Realtime Weather App

A clean, modern weather application built with **React + Vite** and **Material UI**. Search any city to get live weather data powered by the OpenWeatherMap API.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔍 **City search** — controlled form with empty-search guard and clear button
- 🌡️ **Weather card** — temperature, feels like, high/low, humidity, wind speed, description and icon
- 🌈 **Dynamic background** — gradient changes with the weather condition (sunny, cloudy, rainy, snowy, thunderstorm, night)
- 🌙 **Light / Dark mode** — toggle with one click; night is detected from the city's actual sunrise/sunset
- 💎 **Glassmorphism UI** — frosted-glass cards with smooth entrance animations
- ⚡ **Quick-pick cities** — welcome screen with one-click popular cities
- 📍 **City chip in navbar** — always shows which city you're viewing
- ❌ **Full error handling** — city not found, invalid API key, rate limit, network errors
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard focus rings, screen-reader regions
- 📱 **Fully responsive** — works on mobile, tablet and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (functional components, hooks) |
| Build tool | Vite 5 |
| UI library | Material UI v5 + Emotion |
| API | OpenWeatherMap REST API (`/weather` endpoint) |
| HTTP | Native `fetch` with `async/await` |
| Styling | MUI `sx` prop + CSS-in-JS keyframe animations |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aryansingh0510/Sapphire-Project.git
cd Sapphire-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a free API key

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to **My API Keys** and copy your key
3. New keys take **up to 10 minutes** to activate

### 4. Set up your environment file

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your real key:

```
VITE_WEATHER_API_KEY=your_actual_key_here
```

> ⚠️ **Never commit `.env`** — it is listed in `.gitignore` and will never be pushed to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Controlled search form
│   ├── WeatherCard.jsx     # Main weather display
│   ├── WeatherIcon.jsx     # OWM icon renderer
│   ├── WelcomeHero.jsx     # Empty-state welcome screen
│   ├── LoadingSpinner.jsx  # Circular progress indicator
│   ├── ErrorMessage.jsx    # Error alert
│   └── ThemeToggle.jsx     # Light/dark mode button
├── services/
│   └── weatherApi.js       # All API calls (fetch + error handling)
├── theme/
│   └── theme.js            # MUI theme config (light & dark)
├── utils/
│   └── backgroundGradient.js  # Weather condition → CSS gradient
├── App.jsx                 # State hub (state lifting pattern)
└── main.jsx                # Entry point, ThemeProvider
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_WEATHER_API_KEY` | Your OpenWeatherMap API key |

Copy `.env.example` → `.env` and fill in your key. The `.env` file is **git-ignored** and will never be committed.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## 📄 License

MIT © [Aryansingh0510](https://github.com/Aryansingh0510)
