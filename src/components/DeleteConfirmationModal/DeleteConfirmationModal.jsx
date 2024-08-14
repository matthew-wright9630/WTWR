import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  handleCloseModal,
  handleCardDelete,
  selectedItem,
  buttonText,
}) {
  const handleDeleteClick = () => {
    handleCardDelete(selectedItem);
  };

  return (
    <div className={`modal modal_delete ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close-button"
        />
        <div className="modal__delete-section">
          <div className="modal__delete-text">
            <p className="modal__delete-paragraph">
              Are you sure you want to delete this item?
            </p>
            <p className="modal__delete-paragraph">
              This action is irreversible.
            </p>
          </div>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete-btn-confirm"
          >
            {buttonText}
          </button>
          <button
            onClick={handleCloseModal}
            type="button"
            className="modal__cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
