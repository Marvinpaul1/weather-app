// import { fetchWeather } from "./api.js";

const unitEl = document.querySelector(".unit");
const searchEl = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const weatherResult = document.querySelector(".weather-display");
const dailyForecast = document.querySelector(".hourly-forecast");
const hourlyForecast = document.querySelector(".hourly-weather");
const weatherMetricsEL = document.querySelector(".tempt-cta");
const weekDaysForecastEl = document.querySelector(".daily-forecast-grid");
const weekDayWeatherEl = document.querySelector(".daily-weather-forecast");

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

searchBtn.addEventListener("click", () => {
  // const hideWeekDay = e.target.closest(".daily-forecast-container");
  // const weekDayWeather = document.querySelector(".daily-forecast-grid");

  // if (!hideWeekDay) {
  //   weekDayWeather.style.display = "none";
  // }
  // if (weekDayWeather && weekDayWeather === hideWeekDay) {
  //   weekDayWeather.style.display = "none";
  // }

  fetchWeather();
});

function displayWeather(data, cityName, country) {
  const current = data.current;
  const daily = data.daily;

  const currentWeather = getWeatherInfo(current.weathercode);
  const date = new Date(daily.time[0]);

  let html = `
  <div class='country-date'>
  <h4 class='country'>${cityName}, ${country}</h4>
  <p class='date'>${date.toLocaleDateString("en-UK", { day: "numeric", month: "short", weekday: "long", year: "numeric" })}</p>
  </div>
  <div class='deg-display'>
  <span class='weather-icon'>${currentWeather.icon}</span> 
  <h2 class='deg-num'>${Math.round(daily.temperature_2m_max[0])}\u00B0C
  <div>
  `;

  weatherResult.innerHTML = html;

  let tempResult = `
  <div class='temp-weather'>
    <h6>Feels Like</h6>
    <p class="tempt-cta-deg">${Math.round(current.apparent_temperature)}\u00B0C</p>
  </div>
  <div class="temp-weather">
    <h6>Humidity</h6>
    <p class="tempt-cta-deg">${current.relative_humidity_2m}%</p>
  </div>
  <div class="temp-weather">
    <h6>Wind</h6>
    <p class="tempt-cta-deg">${Math.round(current.windspeed_10m)} mph</p>
  </div>
  <div class="temp-weather">
    <h6>Precipitation</h6>
    <p class="tempt-cta-deg">${daily.precipitation_probability_max[0]} in</p>
  </div>
  `;

  weatherMetricsEL.innerHTML = tempResult;

  // Add  7-day forecast

  for (let i = 0; i < 7; i++) {
    const date = new Date(daily.time[i]);
    const dayName =
      i === 0
        ? "Today"
        : date.toLocaleDateString("en-US", { weekday: "short" });
    const weatherInfo = getWeatherInfo(daily.weathercode[i]);

    let weekDaysForecast = `
    <div class="daily-forecast">
      <h6>${dayName}</h6>
      <div class="icon">
        ${weatherInfo.icon}
      </div>
      <div class="deg">
        <p>${Math.round(daily.temperature_2m_max[i])}</p>
        <p>${Math.round(daily.temperature_2m_min[i])}</p>
      </div>
    </div>
    `;
    weekDayWeatherEl.innerHTML += weekDaysForecast;

    let dailyHourForecast = `
    
    `
  }



}



function getWeatherInfo(code) {
  const weatherInfo = {
    0: { description: "Clear sky", icon: "☀️" },
    1: { description: "Mainly clear", icon: "🌤️" },
    2: { description: "Partly cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Foggy", icon: "🌫️" },
    48: { description: "Foggy", icon: "🌫️" },
    51: { description: "Light drizzle", icon: "🌦️" },
    53: { description: "Moderate drizzle", icon: "🌦️" },
    55: { description: "Dense drizzle", icon: "🌧️" },
    56: { description: "Freezing drizzle", icon: "🌧️" },
    57: { description: "Freezing drizzle", icon: "🌧️" },
    61: { description: "Slight rain", icon: "🌧️" },
    63: { description: "Moderate rain", icon: "🌧️" },
    65: { description: "Heavy rain", icon: "⛈️" },
    66: { description: "Freezing rain", icon: "🌧️" },
    67: { description: "Freezing rain", icon: "🌧️" },
    71: { description: "Slight snow", icon: "🌨️" },
    73: { description: "Moderate snow", icon: "❄️" },
    75: { description: "Heavy snow", icon: "❄️" },
    77: { description: "Snow grains", icon: "🌨️" },
    80: { description: "Slight rain showers", icon: "🌦️" },
    81: { description: "Moderate rain showers", icon: "🌧️" },
    82: { description: "Violent rain showers", icon: "⛈️" },
    85: { description: "Slight snow showers", icon: "🌨️" },
    86: { description: "Heavy snow showers", icon: "❄️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
    96: { description: "Thunderstorm with hail", icon: "⛈️" },
    99: { description: "Thunderstorm with hail", icon: "⛈️" },
  };
  return weatherInfo[code] || { description: "Unknown", icon: "❓" };
}
