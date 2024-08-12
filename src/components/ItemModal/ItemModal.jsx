import React, { useEffect } from "react";

import "./ItemModal.css";

function ItemModal({ activeModal, selectedItem, handleCloseModal, openConfirmationModal }) {
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
          src={selectedItem.imageUrl}
          alt={selectedItem.name}
          className="modal__image"
        />
        <div className="modal__item-description">
          <div className="modal__caption">
            <h2 className="modal__item-name">{selectedItem.name}</h2>
            <p className="modal__weather-type">
              Weather: {selectedItem.weather}
            </p>
          </div>
          <button onClick={openConfirmationModal} type="button" className="modal__delete-btn">Delete Item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
