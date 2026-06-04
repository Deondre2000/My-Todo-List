const API_URL = "http://localhost:3000/todos";

export async function fetchTodos() {
  const res = await fetch(API_URL + "/api/todos");
  if (!res.ok) {
    throw new Error("Failed to load todos");
  }
  return res.json();
}

export async function createTodo(title) {
  const res = await fetch(API_URL + "/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  return res.json();
}

export async function updateTodo(id, updates) {
  const res = await fetch(API_URL + "/api/todos/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error("Failed to update todo");   
  }
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(API_URL + "/api/todos/" + id, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
