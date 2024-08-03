import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleItemClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="clothing">
        <p className="clothing__paragraph">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="clothing__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onItemClick={handleItemClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
