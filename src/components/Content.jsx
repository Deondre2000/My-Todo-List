import "../blocks/Content.css";

function Content({ todos }) {
  return (
    <main className="Content">
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </main>
  );
}

export default Content;
