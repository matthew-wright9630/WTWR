import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  selectedItem,
  handleCloseModal,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = selectedItem.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;

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
          <button
            onClick={openConfirmationModal}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
