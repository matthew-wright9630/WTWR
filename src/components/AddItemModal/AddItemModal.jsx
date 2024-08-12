import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [inputName, setInputName] = useState(" ");
  const [inputUrl, setInputUrl] = useState(" ");
  const [inputWeatherType, setInputWeatherType] = useState("");

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };
  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };
  const handleWeatherTypeChange = (event) => {
    setInputWeatherType(event.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonTitle="Add garment"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      handleSubmit={(evt) => {
        onAddItem(evt, { inputName, inputUrl, inputWeatherType });
      }}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          onChange={handleNameChange}
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={inputName}
        />
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          onChange={handleUrlChange}
          type="url"
          className="modal__input"
          id="image"
          placeholder="Image URL"
          value={inputUrl}
        />
      </label>
      <fieldset className="modal__fieldset_radio" required>
        <legend className="modal__legend">Select the weather type:</legend>
        <div>
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            className="modal__input_radio"
            id="hot"
            name="weather-type"
            value="hot"
          />
          <label htmlFor="hot" className="modal__label_radio">
            Hot
          </label>
        </div>
        <div>
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            className="modal__input_radio"
            id="warm"
            name="weather-type"
            value="warm"
          />
          <label htmlFor="warm" className="modal__label_radio">
            Warm
          </label>
        </div>
        <div>
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            className="modal__input_radio"
            id="cold"
            name="weather-type"
            value="cold"
          />
          <label htmlFor="cold" className="modal__label_radio">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
