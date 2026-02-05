import { displayWeather } from "./main.js";

const searchEl = document.querySelector("#search");
const currentUnit = document.querySelector("#temperature-unit").value;

export async function fetchWeather() {
  const city = searchEl.value.trim();

  try {
    let unitParams = "";
    if (currentUnit === "fahrenheit") {
      unitParams =
        "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";
    } else if (currentUnit === "celcius") {
      unitParams = "&temperature_unit=celcius";
    }

    const weatherUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const weatherResponse = await fetch(weatherUrl);

    const weatherData = await weatherResponse.json();
    if (!weatherData.results || weatherData.results.length === 0) {
      // weatherResult.innerHTML = "City not found, Please try another city!";
      return;
    }

    const { latitude, longitude, name, country } = weatherData.results[0];
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${unitParams}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&hourly=temperature_2m,weathercode`;

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
    throw new Error("Actual Error:", error);
  }
}
