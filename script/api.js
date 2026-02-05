import { displayWeather } from "./main.js";

const searchEl = document.querySelector("#search");
const weatherResult = document.querySelector(".weather-display");

const loader = document.querySelector("#loader");

const weatherHidden = document.querySelector(".weather-hidden");

export async function fetchWeather() {
  const city = searchEl.value.trim();
  const currentUnit = document.querySelector("#temperature-unit").value;

  loader.classList.remove("hidden");
  weatherHidden.style.display = "none";

  if (!city) return;

  try {
    let tempUnit = "celsius";
    let windUnit = "kmh";
    let precipUnit = "mm";
    if (currentUnit === "fahrenheit") {
      tempUnit = "fahrenheit";
      windUnit = "mph";
      precipUnit = "inch";
    } else if (currentUnit === "mph") {
      windUnit = "mph";
    } else if (currentUnit === "milimeters") {
      precipUnit = "mm";
    }

    const weatherUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const weatherResponse = await fetch(weatherUrl);

    const weatherData = await weatherResponse.json();
    if (!weatherData.results || weatherData.results.length === 0) {
      weatherResult.innerHTML = "City not found, Please try another city!";
      return;
    }

    const { latitude, longitude, name, country } = weatherData.results[0];
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&hourly=temperature_2m,weathercode`;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    console.log(forecastResponse.ok);
    console.log("forecast Data:", forecastData);

    if (forecastResponse) {
      weatherResult.textContent = "Loading....";
    }

    displayWeather(forecastData, name, country);
    return { latitude, longitude };
  } catch (error) {
    console.log("Actual Error:", error);
    throw new Error(`Actual Error: ${error}`);
  } finally {
    loader.classList.add("hidden");
    weatherHidden.style.display = "flex";
  }
}
