import { weatherImageOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const filteredWeatherOptions = weatherImageOptions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filteredWeatherOptions[0]?.imageUrl;

  return (
    <section className="weather">
      <p className="weather__text">{weatherData.temp.F}&deg; F</p>
      <img
        src={weatherOption}
        alt={weatherData.condition}
        className="weather__image"
      />
    </section>
  );
}

export default WeatherCard;
