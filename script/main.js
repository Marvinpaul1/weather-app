// import { fetchWeather } from "./api.js";

const unitEl = document.querySelector(".unit");
const searchEl = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const weatherResult = document.querySelector(".weather-display");
const dailyForecast = document.querySelector(".hourly-forecast");
const hourlyForecast = document.querySelector(".hourly-weather");
const weatherMetrics = document.querySelector(".tempt-cta");
const weekDayForecast = document.querySelector(".daily-forecast-grid");

async function fetchWeather() {
  const city = searchEl.value.trim();

  try {
    const weatherUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const weatherResponse = await fetch(weatherUrl);

    const weatherData = await weatherResponse.json();
    if (!weatherData.results || weatherData.results.length === 0) {
      // weatherResult.innerHTML = "City not found, Please try another city!";
      return;
    }

    const { latitude, longitude, name, country } = weatherData.results[0];
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    console.log(forecastResponse.ok);
    console.log("forecast Data:", forecastData);

    // const temp = forecastData.current_weather.temperature;
    // weatherResult.innerHTML = `${cityName}, ${country} ${temp}`;
    displayWeather(forecastData, name, country);
    return { latitude, longitude };
  } catch (error) {
    console.log("Actual Error:", error);
    throw new Error("Error fetching waether data. Please try again.");
  }
}

searchBtn.addEventListener("click", fetchWeather);

function displayWeather(data, cityName, country) {
  const current = data.current;
  const daily = data.daily;

  // const currentWeather = getWeatherInfo(current.weatherCode);
  const date = new Date(daily.time[0]);

  let html = `
  <div class='country-date'>
  <h4 class='country'>${cityName}, ${country}</h4>
  <p class='date'>${date.toLocaleDateString("en-UK", { weekday: "long", month: "short", year: "numeric" })}</p>
  </div>
  <h2 class='deg-num'>${Math.round(daily.temperature_2m_max[0])}\u00B0C
  <div>
  `;

  const displayContainer = document.querySelector(".weather-display-container");

  weatherResult.innerHTML = html;

  // displayContainer.appendChild(weatherResult);
}
console.log(fetchWeather());
