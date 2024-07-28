import config from "../config/apikey.js";

const weather = document.querySelector(".weather");
const weatherConditon = new Map();
weatherConditon.set("Smoke", "💨");
weatherConditon.set("Clouds", "🌥️");
weatherConditon.set("Rain", "🌧️");
weatherConditon.set("Snow", "🌨️");
weatherConditon.set("Sun", "🌞");



function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apikey = config.weatherApiKey;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weather.innerText = `${data.name}, ${weatherConditon.get(data.weather[0].main)} ${Math.round(data.main.temp)}°C`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


