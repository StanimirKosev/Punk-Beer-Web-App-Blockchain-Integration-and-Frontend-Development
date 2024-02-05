import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Account from "./Account";

const Header: FC = () => {
  return (
    <div className="header">
      <h1 className="header__title">Beans Love Beers</h1>
      <div style={{ display: "flex", gap: 10 }}>
        <Account />
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
    </div>
  );
};

export default Header;
