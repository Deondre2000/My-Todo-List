import "../blocks/App.css";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Modal from "./Modal.jsx";
import { useState, useEffect } from "react";
import background from "../assets/app-background.webp";
import Footer from "./Footer.jsx";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos.js";
import Nav from "./nav.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadTodos() {
      try {
        const apiTodos = await fetchTodos();
        if (!ignore) {
          setTodos(apiTodos);
        }
      } catch {
        if (!ignore) {
          setError("Could not load todos from backend.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadTodos();

    return () => {
      ignore = true;
    };
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  /*Add a new todo to the list */

  async function addTodo(newTodoText, dueDate) {
    const trimmedText = newTodoText.trim();
    if (!trimmedText) {
      return false;
    }

    try {
      const createdTodo = await createTodo(trimmedText);
      const withDueDate = dueDate
        ? await updateTodo(createdTodo.id, { dueDate })
        : createdTodo;
      setTodos((prevTodos) => [...prevTodos, withDueDate]);
      setError("");
      return true;
    } catch {
      setError("Could not create todo.");
      return false;
    }
  }

  /*Delete a todo from the list */

  async function handleDeleteTodo(todoId) {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      setError("");
    } catch {
      setError("Could not delete todo.");
    }
  }

  async function toggleTodo(todoId) {
    const currentTodo = todos.find((todo) => todo.id === todoId);
    if (!currentTodo) {
      return;
    }

    try {
      const updatedTodo = await updateTodo(todoId, {
        completed: !currentTodo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo)),
      );
      setError("");
    } catch {
      setError("Could not update todo.");
    }
  }

  return (
    <div className="App">
      <img className="App__background" src={background} alt="Background" />
      <Nav />

      <Header onAddClick={openModal} />
      {isLoading && <p>Loading todos...</p>}
      {!isLoading && error && <p>{error}</p>}
      <Content
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={toggleTodo}
      />
      {isModalOpen && <Modal onClose={closeModal} onAddTodo={addTodo} />}
      <Footer />
    </div>
  );
}

export default App;
