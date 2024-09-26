import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: null,
  });

  const handleReset = () => {
    setValues({ name: "", imageUrl: "", weather: null });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonTitle="Add garment"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      handleSubmit={(evt) => {
        evt.preventDefault();
        onAddItem(values, handleReset);
      }}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          onChange={handleChange}
          type="text"
          className="modal__input"
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          required={true}
          minLength={2}
        />
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          onChange={handleChange}
          type="url"
          className="modal__input"
          id="image"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          required={true}
        />
      </label>
      <fieldset className="modal__fieldset_radio" required={true}>
        <legend className="modal__legend">Select the weather type:</legend>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            className="modal__input_radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
          />
          <label htmlFor="hot" className="modal__label_radio">
            Hot
          </label>
        </div>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            className="modal__input_radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
          />
          <label htmlFor="warm" className="modal__label_radio">
            Warm
          </label>
        </div>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            className="modal__input_radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
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
