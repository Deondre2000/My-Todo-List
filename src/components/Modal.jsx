import "../blocks/modal.css";
import { useState } from "react";

function Modal({ onClose }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputValue);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Add Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
