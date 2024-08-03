import { weatherImageOptions } from "./constants";

function getWeather(latitude, longitude, apiKey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function filterWeatherData(data) {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = setWeatherType(data.main.temp);
  result.condition = setWeatherCondition(data.weather);
  result.isDay = setisDay(data.sys);

  return result;
}

function setWeatherType(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function setWeatherCondition(weather) {
  if (weather[0].main === "Clouds") {
    return "cloudy";
  } else if (weather[0].main === "Clear") {
    return "sunny";
  } else if (weather[0].main === "Rain") {
    return "rain";
  } else if (weather[0].main === "Thunderstorm") {
    return "storm";
  } else if (weather[0].main === "Snow") {
    return "snow";
  } else {
    return "fog";
  }
}

function setisDay(data) {
  const dateInSeconds = Date.now() / 1000;
  if (dateInSeconds > data.sunrise && dateInSeconds < data.sunset) {
    return true;
  } else {
    return false;
  }
}

export { getWeather, filterWeatherData, setWeatherType };
