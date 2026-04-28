import "../blocks/app.css";
import Header from "./header.jsx";
import Content from "./Content.jsx";
import "../blocks/App.css";
import Modal from "./modal.jsx";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    "do hair",
    "brush teeth",
    "do laundry",
    "take out trash",
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <Header onAddClick={openModal} />
      <Content todos={todos} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
