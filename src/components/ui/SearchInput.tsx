import { FC } from "react";
import "../../styles/SearchInput.css";

const SearchInput: FC = () => {
  return (
    <div className="search-input-container">
      <input className="search-input" placeholder="Search for beer..." />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchInput;
