import "../blocks/App.css";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Modal from "./Modal.jsx";
import { useState, useEffect } from "react";
import background from "../assets/app-background.webp";
import Footer from "./Footer.jsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  /*Add a new todo to the list */

  function addTodo(newTodoText, dueDate) {
    const trimmedText = newTodoText.trim();
    if (!trimmedText) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { text: trimmedText, completed: false, dueDate: dueDate || "" },
    ]);
    closeModal();
  }

  /*Delete a todo from the list */

  function deleteTodo(indexToDelete) {
    setTodos((prevTodos) =>
      prevTodos.filter((_, index) => index !== indexToDelete),
    );
  }

  function toggleTodo(indexToToggle) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === indexToToggle
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  return (
    <div className="App">
      <img className="App__background" src={background} alt="Background" />
      <Header onAddClick={openModal} />
      <Content
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />
      {isModalOpen && <Modal onClose={closeModal} onAddTodo={addTodo} />}
      <Footer />
    </div>
  );
}

export default App;
