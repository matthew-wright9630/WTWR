import { useContext } from "react";
import { weatherImageOptions } from "../../utils/constants";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const currentTemp = useContext(CurrentTemperatureUnitContext);
  const filteredWeatherOptions = weatherImageOptions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filteredWeatherOptions[0]?.imageUrl;

  return (
    <section className="weather">
      <p className="weather__text">
        {weatherData.temp[currentTemp.currentTemperatureUnit]}&deg;{" "}
        {currentTemp.currentTemperatureUnit}
      </p>
      <img
        src={weatherOption}
        alt={weatherData.condition}
        className="weather__image"
      />
    </section>
  );
}

export default WeatherCard;
