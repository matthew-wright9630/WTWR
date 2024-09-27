import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onCloseModal,
  handleLogin,
  isLoading,
  handleSignUpClick,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleReset = () => {
    setValues({ email: "", password: "" });
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
      <label className="modal__label">
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
          autoComplete="username"
        />
      </label>
      <label className="modal__label">
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
      <button
        type="button"
        onClick={handleSignUpClick}
        className="modal__signup-btn"
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
