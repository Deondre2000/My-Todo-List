import "../blocks/Content.css";

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
            <span
              className={`Content__text ${todo.completed ? "Content__text--done" : ""}`}
            >
              {todo.text}
            </span>
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
