
const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`;

export async function fetchWeather() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const temp = data.current_weather.temperature;
  } catch (error) {
    console.error("Failed to get weather:", error);
  }
}
