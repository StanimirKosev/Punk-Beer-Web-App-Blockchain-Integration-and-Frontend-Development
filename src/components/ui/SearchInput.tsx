import { FC, useState } from "react";
import "../../styles/SearchInput.css";
import useDebounce from "../../hooks/useDebounce";

interface Props {
  onSearch: (value: string) => void;
}

const SearchInput: FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState<string>("");

  const debouncedCallback = useDebounce(() => onSearch(value));

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder="Search for beer..."
        onChange={(e) => {
          setValue(e.target.value);
          debouncedCallback();
        }}
      />
      <button className="search-button" onClick={() => onSearch(value)}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
