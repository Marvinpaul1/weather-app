// c:\Users\paulm\Desktop\Developer-app\weather-app-main\script\main.js

```diff
--- c:\Users\paulm\Desktop\Developer-app\weather-app-main\script\main.js
+++ c:\Users\paulm\Desktop\Developer-app\weather-app-main\script\main.js
@@ -11,6 +11,8 @@
 const weekDaysForecastEl = document.querySelector(".daily-forecast-grid");
 const dailyWeatherEl = document.querySelector(".daily-forecast");
 
+let currentWeatherData = null;
+
 searchBtn.addEventListener("click", fetchWeather);
 
 export function displayWeather(data, cityName, country) {
@@ -18,6 +20,7 @@
   const daily = data.daily;
 
   const currentWeather = getWeatherInfo(current.weathercode);
+  currentWeatherData = data;
   const date = new Date(daily.time[0]);
 
   let html = `
@@ -81,47 +84,41 @@
     weekDaysForecastEl.innerHTML = newData;
 
-    daysOfWeekHtml += `
-      <div class="daily-forecast">
-          <option>${dayName}</option>
-      </div>`;
+    daysOfWeekHtml += `<option value="${i}">${dayName}</option>`;
 
     dailyHourlyForecast.innerHTML = daysOfWeekHtml;
     // console.log(daysOfWeekHtml);
   }
 
-  function displayHoursForDay(data, dayIndex) {
-    const hourly = data.hourly;
-    let hourlyHtml = "";
-
-    const currentHour = new Date().getHours();
-    const start = dayIndex === 0 ? currentHour : dayIndex * 24;
-    const end = start + 10;
-
-    for (let i = start; i < end && i < hourly.time.length; i++) {
-      const time = new Date(hourly.time[i]);
-      const info = getWeatherInfo(hourly.weathercode[i]);
-
-      const hourlyLabel = time.toLocaleTimeString("en-US", {
-        hour: "numeric",
-        hour12: true,
-      });
-
-      hourlyHtml += `
-    <div class='hourly-weather'>
-      <div class='info-icon'>${info.icon}</div>
-      <p>${hourlyLabel}</p>
-      <span class='deg'>${Math.round(hourly.temperature_2m[i])}\u00B0</span>
-    </div>
-    `;
-    }
-    hourlyForecast.innerHTML = hourlyHtml;
-  }
-
   displayHoursForDay(data, 0);
 }
 
+function displayHoursForDay(data, dayIndex) {
+  const hourly = data.hourly;
+  let hourlyHtml = "";
+
+  const currentHour = new Date().getHours();
+  const start = dayIndex === 0 ? currentHour : dayIndex * 24;
+  const end = start + 10;
+
+  for (let i = start; i < end && i < hourly.time.length; i++) {
+    const time = new Date(hourly.time[i]);
+    const info = getWeatherInfo(hourly.weathercode[i]);
+
+    const hourlyLabel = time.toLocaleTimeString("en-US", {
+      hour: "numeric",
+      hour12: true,
+    });
+
+    hourlyHtml += `
+  <div class='hourly-weather'>
+    <div class='info-icon'>${info.icon}</div>
+    <p>${hourlyLabel}</p>
+    <span class='deg'>${Math.round(hourly.temperature_2m[i])}\u00B0</span>
+  </div>
+  `;
+  }
+  hourlyForecast.innerHTML = hourlyHtml;
+}
+
 const selecDays = document.querySelector("#days-of-week");
 
-selecDays.addEventListener("click", (e) => {
-  const dayIndex = Array.from(selecDays.children).indexOf(
-    e.target.closest(".daily-forecast"),
-  );
-  displayHoursForDay(data, dayIndex);
+selecDays.addEventListener("change", (e) => {
+  const dayIndex = parseInt(e.target.value);
+  if (currentWeatherData) {
+    displayHoursForDay(currentWeatherData, dayIndex);
+  }
 });
