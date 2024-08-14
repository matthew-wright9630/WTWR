import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const handleWeatherTypeChange = (event) => {
    setWeather(event.target.value);
  };
  const handleReset = () => {
    setName("");
    setImageUrl("");
    setWeather(null);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonTitle="Add garment"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      handleSubmit={(evt) => {
        onAddItem(evt, { name, imageUrl, weather });
        handleReset();
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
          value={name}
          required
          minLength={2}
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
          value={imageUrl}
          required
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
            checked={weather === "hot"}
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
            checked={weather === "warm"}
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
            checked={weather === "cold"}
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
