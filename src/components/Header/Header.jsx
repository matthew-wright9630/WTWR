import { Link } from "react-router-dom";
import logo from "../../assets/WTWR-logo.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddButtonClick,
  weatherData,
  isMobileMenuOpen,
  toggleMobileMenu,
  handleSignUpClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <header className={`header`}>
      <div className="header__information">
        <Link className="header__link" to="/">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__container ${
          isMobileMenuOpen === true ? "header__container_open" : ""
        }`}
      >
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__profile-info">
            <button
              onClick={() => {
                handleAddButtonClick();
                toggleMobileMenu();
              }}
              type="button"
              className="header__add-button"
            >
              + Add clothes
            </button>
            <Link className="header__profile-link" to="/profile">
              <p className="header__profile-name">{user.name}</p>
              <img
                src={user.avatar}
                alt="Proflie Avatar"
                className="header__profile-avatar"
              />
            </Link>
          </div>
        ) : (
          <div className="header__auth">
            <button
              onClick={handleSignUpClick}
              type="button"
              className="header__sign-up-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__log-in-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
      <button
        onClick={toggleMobileMenu}
        type="button"
        className="header__menu-button"
      ></button>
      <button
        onClick={toggleMobileMenu}
        type="button"
        className={`header__menu-close-button ${
          isMobileMenuOpen === true ? "header__menu-close-button_open" : ""
        }`}
      ></button>
    </header>
  );
}

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export default Header;
