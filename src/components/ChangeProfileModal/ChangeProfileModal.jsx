import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

function ChangeProfileModal({
  isOpen,
  onCloseModal,
  handleChangeProfile,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const handleReset = () => {
    setValues({ name: "", avatar: "" });
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: currentUser?.name, avatar: currentUser?.avatar });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonTitle="Save changes"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Saving..." : "Save changes"}
      handleSubmit={(evt) => {
        evt.preventDefault();
        handleChangeProfile(values, handleReset);
      }}
    >
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          onChange={handleChange}
          type="name"
          className="modal__input"
          name="name"
          id="changeProfileName"
          placeholder="Name"
          value={values.name}
          required={true}
        />
      </label>
      <label htmlFor="changeProfileAvatar" className="modal__label">
        Avatar *
        <input
          onChange={handleChange}
          type="url"
          className="modal__input"
          id="changeProfileAvatar"
          name="avatar"
          placeholder="avatar"
          value={values.avatar}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default ChangeProfileModal;
