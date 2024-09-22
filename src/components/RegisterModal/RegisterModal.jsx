import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onCloseModal,
  handleRegistration,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleReset = () => {
    setValues({ email: "", password: "", name: "", avatar: "" });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonTitle="Sign Up"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Registering..." : "Sign Up"}
      handleSubmit={(evt) => {
        evt.preventDefault();
        handleRegistration(values, handleReset);
      }}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          onChange={handleChange}
          type="email"
          className="modal__input"
          name="email"
          id="email"
          placeholder="email"
          value={values.email}
          required={true}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          onChange={handleChange}
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="password"
          value={values.password}
          required={true}
          autoComplete="current-password"
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Name *
        <input
          onChange={handleChange}
          type="text"
          className="modal__input"
          id="username"
          name="name"
          placeholder="username"
          value={values.name}
          required={true}
          autoComplete="username"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          onChange={handleChange}
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="avatar"
          value={values.avatar}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
