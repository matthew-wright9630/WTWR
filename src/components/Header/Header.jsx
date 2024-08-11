import { Link } from "react-router-dom";
import logo from "../../assets/WTWR-logo.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";

function Header({
  handleAddButtonClick,
  weatherData,
  isMobileMenuOpen,
  toggleMobileMenu,
}) {
  return (
    <header className={`header`}>
      <div className="header__information">
        <Link className="header__link" to="se_project_react/">
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
        <Link className="header__profile-link" to="se_project_react/profile">
          <p className="header__profile-name">Terrence Tegene</p>
          <img
            src={avatar}
            alt="Proflie Avatar"
            className="header__profile-avatar"
          />
        </Link>
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
