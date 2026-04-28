import "../blocks/Header.css";
import addIcon from "../assets/add.png";

function Header({ onAddClick }) {
  return (
    <header className="header">
      <h1 className="Title">To Do List</h1>
      <button type="button" className="add__Todo" onClick={onAddClick}>
        <img className="add__Icon" src={addIcon} alt="Add Todo" />
        Add Todo
      </button>
    </header>
  );
}

export default Header;
