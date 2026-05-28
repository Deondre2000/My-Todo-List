import "../blocks/Modal.css";
import { useState } from "react";
import reborn from "../assets/reborn.avif";

function Modal({ onClose, onAddTodo }) {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddTodo(inputValue, dueDate);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <img
          className="modal__background"
          src={reborn}
          alt="Modal background"
        />
        <h2 className="modal__title">Add Todo</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            className="modal__input"
            type="text"
            placeholder="Enter todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <label>
            <p className="modal__dueDate">Due date</p>
            <input
              className="modal__date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
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
