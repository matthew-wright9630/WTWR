import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onCloseModal, handleLogin, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    loginEmail: "",
    password: "",
  });

  const handleReset = () => {
    setValues({ loginEmail: "", password: "" });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonTitle="Log In"
      handleCloseModal={onCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Loginging..." : "Log In"}
      handleSubmit={(evt) => {
        evt.preventDefault();
        handleLogin(values, handleReset);
      }}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          onChange={handleChange}
          type="email"
          className="modal__input"
          name="email"
          id="loginEmail"
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
          id="loginPassword"
          name="password"
          placeholder="password"
          value={values.password}
          required={true}
          autoComplete="current-password"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
