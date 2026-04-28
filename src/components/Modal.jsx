import "../blocks/Modal.css";
import { useState } from "react";

function Modal({ onClose, onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddTodo(inputValue);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Add Todo</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            className="modal__input"
            type="text"
            placeholder="Enter todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="modal__submit" type="submit">
            Add
          </button>
        </form>
        <button className="modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
