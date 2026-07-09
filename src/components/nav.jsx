import "../blocks/nav.css";
import stopwatch from "../assets/stopwatch.png";
import github from "../assets/github.png";
import linkedin from "../assets/linked-in.webp";

function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav__list">
        <li className="Nav__item">
          <img className="Nav__timer" src={stopwatch} alt="Logo" />
          Focus Timer
        </li>
        <li className="Nav__Github">
          <a href="https://github.com/Deondre2000">
            <img className="Nav__github" src={github} alt="GitHub" />
          </a>
          Github
        </li>
        <li className="Nav__Linked-in">
          <a href="https://www.linkedin.com/in/deondre-butler-7b88b6214/">
            <img className="Nav__linkedin" src={linkedin} alt="LinkedIn" />
          </a>
          linkedIn
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
