import React, { useEffect } from "react";

import "./ItemModal.css";

function ItemModal({ activeModal, selectedItem, handleCloseModal }) {
  useEffect(() => {
    function handleEscPress(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    }

    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("modal_opened")) {
        handleCloseModal();
      }
    }

    if (activeModal === "item-modal") {
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
      className={`modal ${activeModal === "item-modal" ? "modal_opened" : ""}`}
    >
      <div className="modal__container modal__container_item">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close-button"
        ></button>
        <img
          src={selectedItem.link}
          alt={selectedItem.name}
          className="modal__image"
        />
        <div className="modal__caption">
          <h2 className="modal__item-name">{selectedItem.name}</h2>
          <p className="modal__weather-type">Weather: {selectedItem.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
