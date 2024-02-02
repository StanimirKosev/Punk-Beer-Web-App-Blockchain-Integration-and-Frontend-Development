import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header: FC = () => {
  return (
    <div className="header">
      <h1 className="header__title">Beans Love Beers</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
