import { getWeather } from './services/wheather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';

const ISTANBUL = {
  lat: 41.01,
  lon: 28.97,
  timezone: 'Europe/Istanbul',
  countryCode: 'TR'
};

async function loadDashboard() {
  try {
    const [weather, time, country] = await Promise.all([
      getWeather(ISTANBUL.lat, ISTANBUL.lon),
      getTime(ISTANBUL.timezone),
      getCountry(ISTANBUL.countryCode)
    ]);

    renderWeather(weather);
    renderTime(time);
    renderCountry(country[0]);

  } catch (error) {
    console.error('Dashboard yüklenirken hata oluştu:', error);
  }
}

/* ------------------ RENDER FUNCTIONS ------------------ */

function renderWeather(weather) {
  const weatherCard = document.getElementById('weather-card');
  const { temperature, windspeed } = weather.current_weather;

  const weatherClass = windspeed > 20 ? 'weather-wind' : 'weather-sunny';

  // ❗ card class'ını BOZMADAN sadece weather durumunu değiştir
  weatherCard.classList.remove('weather-sunny', 'weather-rain', 'weather-wind');
  weatherCard.classList.add(weatherClass);

  weatherCard.innerHTML = `
    <h3>☀️ Hava Durumu</h3>
    <p>Sıcaklık: ${temperature}°C</p>
    <p>Rüzgar: ${windspeed} km/h</p>
  `;
}

function renderTime(time) {
  const timeCard = document.getElementById('time-card');
  timeCard.classList.add('card');

  timeCard.innerHTML = `
    <h3>🕒 Yerel Saat</h3>
    <p>${time.datetime.slice(11, 19)}</p>
    <p>${time.timezone}</p>
  `;
}

function renderCountry(country) {
  const countryCard = document.getElementById('country-card');
  countryCard.classList.add('card');

  const currency = Object.keys(country.currencies)[0];

  countryCard.innerHTML = `
    <h3>🏳️ Ülke Bilgisi</h3>
    <img src="${country.flags.png}" width="80" alt="${country.name.common} bayrağı" />
    <p>${country.name.common}</p>
    <p>Para Birimi: ${currency}</p>
  `;
}

loadDashboard();
