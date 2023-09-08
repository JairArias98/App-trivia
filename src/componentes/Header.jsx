import { Link } from "react-router-dom";
import logo from "./logo-trivia.png";

export const Header = () => {
  return (
    <>
      <header className="header">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={80} height={80} className="logo" />
        </Link>
        <nav className="nav-main">
          <Link to={"/Main"} className="iniciar">
            INICIAR
          </Link>
        </nav>
      </header>
    </>
  );
};
