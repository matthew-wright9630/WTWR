import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
  editProfileInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import { checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    setActiveModal("add-garment-modal");
  };

  const handleItemClick = (item) => {
    setActiveModal("item-modal");
    setSelectedItem(item);
  };

  const handleSignUpClick = () => {
    setActiveModal("registration-modal");
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
  };

  const handleChangeProfileClick = () => {
    setActiveModal("edit-profile-modal");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddItemSubmit = (values, resetForm) => {
    const makeRequest = () => {
      return addClothingItem(values, {
        token: localStorage.getItem("jwt"),
      }).then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardDelete = (itemToDelete) => {
    const makeRequest = () => {
      return deleteClothingItem(itemToDelete, {
        token: localStorage.getItem("jwt"),
      }).then((prev) => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id)
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }, resetForm) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          handleCloseModal();
          resetForm();
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({ email, password, name, avatar }, resetForm) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        navigate("/");
        handleLogin(email, password);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleChangeProfile = (values, resetForm) => {
    const makeRequest = () => {
      return editProfileInfo(values, {
        token: localStorage.getItem("jwt"),
      }).then((profile) => {
        console.log(profile, "Response from the server");
        setUserData({
          name: profile.name,
          avatar: profile.avatar,
          email: profile.email,
          _id: profile._id,
        });
        setCurrentUser(profile);
        resetForm();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");

    const updateCardLikes = (updatedCard) => {
      setClothingItems((cards) => {
        return cards.map((item) => (item._id === id ? updatedCard : item));
      });
    };

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          updateCardLikes(updatedCard);
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          updateCardLikes(updatedCard);
        })
        .catch(console.error);
    }
  }

  const openConfirmationModal = () => {
    setActiveModal("card-delete-modal");
  };

  const isGarmentModalOpen = activeModal === "add-garment-modal";
  const isConfirmationModalOpen = activeModal === "card-delete-modal";
  const isRegistrationModalOpen = activeModal === "registration-modal";
  const isLoginModalOpen = activeModal === "login-modal";
  const isChangeProfileModalOpen = activeModal === "edit-profile-modal";

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
      .then((cards) => {
        setClothingItems(cards.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleItemClick={handleItemClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddButtonClick={handleAddButtonClick}
                      handleItemClick={handleItemClick}
                      clothingItems={clothingItems}
                      handleChangeProfileClick={handleChangeProfileClick}
                      handleLogout={handleLogout}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
            <RegisterModal
              isOpen={isRegistrationModalOpen}
              onCloseModal={handleCloseModal}
              handleRegistration={handleRegistration}
              isLoading={isLoading}
              handleLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onCloseModal={handleCloseModal}
              handleLogin={handleLogin}
              isLoading={isLoading}
              handleSignUpClick={handleSignUpClick}
            />
            <ChangeProfileModal
              isOpen={isChangeProfileModalOpen}
              onCloseModal={handleCloseModal}
              handleChangeProfile={handleChangeProfile}
              isLoading={isLoading}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
