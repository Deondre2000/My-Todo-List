import "../blocks/Header.css";
import addIcon from "../assets/add.png";

function Header({ onAddClick }) {
  return (
    <header className="header">
      <h1 className="Title">To Do List</h1>
      <button type="button" className="Headeradd__Todo" onClick={onAddClick}>
        <img className="Headeradd__Icon" src={addIcon} alt="Add Todo" />
        Add Todo
      </button>
    </header>
  );
}

export default Header;
