import { fetchWeather } from "./api.js";

const unitEl = document.querySelector(".unit");
const searchEl = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const displayWeather = document.querySelector(".weather-display");
const dailyForecast = document.querySelector(".hourly-forecast");
const hourlyForecast = document.querySelector(".hourly-weather");
const weatherMetrics = document.querySelector(".tempt-cta");
const weekDayForecast = document.querySelector(".daily-forecast-grid");

searchBtn.addEventListener("click", async () => {
  const searchInput = searchEl.value.toLowerCase().trim();
  console.log(searchInput);
});
