import { FC, useEffect, useState } from "react";
import "../../styles/SearchInput.css";
import useDebounce from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";

interface Props {
  onSearch: (value: string) => void;
}

const SearchInput: FC<Props> = ({ onSearch }) => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();
  const [value, setValue] = useState<string>("");

  const debouncedCallback = useDebounce(() => onSearch(value));

  useEffect(() => {
    setValue("");
  }, [dashboardView]);

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder="Search for beer..."
        value={value}
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
