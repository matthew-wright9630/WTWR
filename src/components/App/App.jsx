import { useState } from "react";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { apiKey, latitude, longitude } from "../../utils/constants";
import {
  addClothingItem,
  deleteClothingItem,
  getClothingItems,
} from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (evt, values, resetForm) => {
    evt.preventDefault();
    setIsLoading(true);
    addClothingItem(values)
      .then((data) => {
        setIsLoading(true);
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
        resetForm();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = (itemToDelete) => {
    setIsLoading(true);
    deleteClothingItem(itemToDelete)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id)
        );
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const openConfirmationModal = () => {
    setActiveModal("card-delete-modal");
  };

  const isGarmentModalOpen = activeModal === "add-garment-modal";
  const isConfirmationModalOpen = activeModal === "card-delete-modal";

  useEffect(() => {
    if (!activeModal) return;

    const handleEscPress = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("modal_opened")) {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscPress);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal]);

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

    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddButtonClick={handleAddButtonClick}
            weatherData={weatherData}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleItemClick={handleItemClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddButtonClick={handleAddButtonClick}
                  handleItemClick={handleItemClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>
          <Footer />
          <AddItemModal
            onCloseModal={handleCloseModal}
            onAddItem={handleAddItemSubmit}
            isOpen={isGarmentModalOpen}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            openConfirmationModal={openConfirmationModal}
            isConfirmationModalOpen={isConfirmationModalOpen}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            isOpen={isConfirmationModalOpen}
            handleCloseModal={handleCloseModal}
            handleCardDelete={handleCardDelete}
            selectedItem={selectedItem}
            buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
