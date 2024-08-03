import { useState } from "react";
import React, { useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { apiKey, latitude, longitude } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0 },
    city: "",
    condition: "",
    isDay: "",
    weatherImage: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [isMobileMenuOpen, setMobilMenuOpen] = useState(false);

  const handleAddButtonClick = () => {
    setActiveModal("add-garment-modal");
  };

  const handleItemClick = (item) => {
    setActiveModal("item-modal");
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen === true) {
      setMobilMenuOpen(false);
    } else {
      setMobilMenuOpen(true);
    }
  };

  useEffect(() => {
    getWeather(latitude, longitude, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddButtonClick={handleAddButtonClick}
          weatherData={weatherData}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <Main weatherData={weatherData} handleItemClick={handleItemClick} />
        <Footer />
        <ModalWithForm
          title="New garment"
          buttonTitle="Add garment"
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="image" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="image"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__fieldset_radio" required>
            <legend className="modal__legend">Select the weather type:</legend>
            <div>
              <input
                type="radio"
                className="modal__input_radio"
                id="hot"
                name="weather-type"
              />
              <label htmlFor="hot" className="modal__label_radio">
                Hot
              </label>
            </div>
            <div>
              <input
                type="radio"
                className="modal__input_radio"
                id="warm"
                name="weather-type"
              />
              <label htmlFor="warm" className="modal__label_radio">
                Warm
              </label>
            </div>
            <div>
              <input
                type="radio"
                className="modal__input_radio"
                id="cold"
                name="weather-type"
              />
              <label htmlFor="cold" className="modal__label_radio">
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          selectedItem={selectedItem}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default App;
