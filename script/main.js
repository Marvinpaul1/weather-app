import { fetchWeather } from "./api.js";
import { getWeatherInfo } from "./weather-info.js";

const unitEl = document.querySelector(".unit");
const searchEl = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const weatherResult = document.querySelector(".weather-display");
const dailyHourlyForecast = document.querySelector("#days-of-week");
const hourlyForecast = document.querySelector(".hourly-weather-container");
const weatherMetricsEL = document.querySelector(".tempt-cta");
const weekDaysForecastEl = document.querySelector(".daily-forecast-grid");
const dailyWeatherEl = document.querySelector(".daily-forecast");

searchBtn.addEventListener("click", fetchWeather);

export function displayWeather(data, cityName, country) {
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
  let daysOfWeekHtml = "";
  let newData = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date(daily.time[i]);
    const dayName =
      i === 0
        ? "Today"
        : date.toLocaleDateString("en-US", { weekday: "short" });
    const weatherInfo = getWeatherInfo(daily.weathercode[i]);

    newData += `
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

    weekDaysForecastEl.innerHTML = newData;

    daysOfWeekHtml += `
      <div class="daily-forecast">
          <option>${dayName}</option>
      </div>`;

    dailyHourlyForecast.innerHTML = daysOfWeekHtml;
    // console.log(daysOfWeekHtml);
  }

  function displayHoursForDay(data, dayIndex) {
    let hourlyHtml = "";

    const selectedIndex = document.querySelector(".daily-forecast");

    // const currentHour = new Date().getHours();

    // if (selectedIndex === 0) {

    // }
    const hourly = data.hourly;

    const start = dayIndex * 24 + 15;
    const end = dayIndex * 24 + 22;

    for (let i = start; i <= end; i++) {
      const time = new Date(hourly.time[i]);
      const info = getWeatherInfo(hourly.weathercode[i]);

      const hourlyLabel = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      hourlyHtml += `
    <div class='hourly-weather'>
      <div class='info-icon'>${info.icon}</div>
      <p>${hourlyLabel}</p>
      <span class='deg'>${Math.round(hourly.temperature_2m[i])}\u00B0</span>
    </div>
    `;
      hourlyForecast.innerHTML = hourlyHtml;
      console.log(hourlyHtml);
    }
  }
  displayHoursForDay(data, 0);
}
