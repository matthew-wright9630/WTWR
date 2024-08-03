import React, { useEffect } from "react";

import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  title,
  buttonTitle,
  activeModal,
  handleCloseModal,
}) {
  useEffect(() => {
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

    if (activeModal === "add-garment-modal") {
      document.addEventListener("keydown", handleEscPress);
      document.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscPress),
        document.removeEventListener("mousedown", handleOverlayClick);
    };
  });

  return (
    <div
      className={`modal ${
        activeModal === "add-garment-modal" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close-button"
        ></button>
        <form className="modal__form">
          {children}
          <button type="button" className="modal__submit-button">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
