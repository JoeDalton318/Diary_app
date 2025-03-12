import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchbar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Rechercher un utilisateur ou un hashtag..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleSearch}
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
