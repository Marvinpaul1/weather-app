// export async function fetchWeather() {
// const searchInput = searchEl.value.toLowerCase().trim();
//   if (!city) {
//     weatherResult.innerHTML = "Please enter a city name!";
//     return;
//   }

//   const weatherUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

//   const weatherResponse = await fetch(weatherUrl);

//   const weatherData = await response.json();
//   if (weatherResponse.results && weatherData.results > 0) {
//     const { latitude, longitude } = weatherData.results[0];
//     return { latitude, longitude };
//   } else {
//     throw new Error("City not found!. Please try another name.");
//   }
// }
