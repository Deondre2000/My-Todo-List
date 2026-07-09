const API_BASE_URL = "http://localhost:3000";
const API_URL = API_BASE_URL + "/api/todos";

function toUiTodo(todo) {
  return {
    ...todo,
    text: todo.text || todo.title || "",
    dueDate: todo.dueDate || "",
  };
}

function toApiUpdates(updates) {
  const next = { ...updates };
  if (typeof next.text === "string") {
    next.title = next.text;
    delete next.text;
  }
  return next;
}

export async function fetchTodos() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to load todos");
  }
  const todos = await res.json();
  return todos.map(toUiTodo);
}

export async function createTodo(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  const todo = await res.json();
  return toUiTodo(todo);
}

export async function updateTodo(id, updates) {
  const res = await fetch(API_URL + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toApiUpdates(updates)),
  });
  if (!res.ok) {
    throw new Error("Failed to update todo");
  }
  const todo = await res.json();
  return toUiTodo(todo);
}

export async function deleteTodo(id) {
  const res = await fetch(API_URL + "/" + id, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}

