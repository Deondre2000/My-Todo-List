import "../blocks/Content.css";

function formatDueDate(dueDate) {
  if (!dueDate) {
    return "No due date";
  }

  const [year, month, day] = dueDate.split("-").map(Number);
  if (!year || !month || !day) {
    return dueDate;
  }

  const parsedDate = new Date(year, month - 1, day);
  if (Number.isNaN(parsedDate.getTime())) {
    return dueDate;
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDueDateClass(dueDate) {
  if (!dueDate) {
    return "";
  }
  const today = new Date();
  const due = new Date(`${dueDate}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  const diffInMs = due - today;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return "Content__TodoDate--overdue";
  }

  if (diffInDays <= 1) {
    return "Content__TodoDate--urgent";
  }

  if (diffInDays <= 5) {
    return "Content__TodoDate--soon";
  }

  return "Content__TodoDate--normal";
}

function Content({ todos, onDeleteTodo, onToggleTodo }) {
  return (
    <main className="Content">
      <ol>
        {todos.map((todo, index) => (
          <li className="Content__item" key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodo(index)}
            />
            <div className="Content__body">
              <p
                className={`Content__TodoDate ${getDueDateClass(todo.dueDate)}`}
              >
                {formatDueDate(todo.dueDate)}
              </p>
              <span
                className={`Content__text ${todo.completed ? "Content__text--done" : ""}`}
              >
                {todo.text}
              </span>
            </div>
            <button
              type="button"
              className="Content__delete"
              onClick={() => onDeleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </main>
  );
}

export default Content;
