import React, { useEffect } from "react";

import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  title,
  buttonTitle,
  handleCloseModal,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close-button"
        />
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
