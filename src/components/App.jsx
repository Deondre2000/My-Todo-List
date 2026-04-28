import "../blocks/app.css";
import Header from "./header.jsx";
import Content from "./Content.jsx";
import "../blocks/App.css";
import Modal from "./Modal.jsx";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { text: "do hair", completed: false },
          { text: "brush teeth", completed: false },
          { text: "do laundry", completed: false },
          { text: "take out trash", completed: false },
        ];
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

  function addTodo(newTodoText) {
    const trimmedText = newTodoText.trim();
    if (!trimmedText) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { text: trimmedText, completed: false },
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
      <Header onAddClick={openModal} />
      <Content
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />
      {isModalOpen && <Modal onClose={closeModal} onAddTodo={addTodo} />}
    </div>
  );
}

export default App;
