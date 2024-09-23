import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleItemClick, clothingItems, handleCardLike }) {
  const currentTemp = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="clothing">
        <p className="clothing__paragraph">
          Today is {weatherData.temp[currentTemp.currentTemperatureUnit]}&deg;{" "}
          {currentTemp.currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="clothing__list">
          {clothingItems
            ?.filter((item) => {
              return item.weather === weatherData.type;
            })
            ?.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onItemClick={handleItemClick}
                  handleCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
