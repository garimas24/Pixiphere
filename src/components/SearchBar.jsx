import React from "react";
import "../style/SearchBar.css"

const SearchBar = ({ onSearch, searchQuery }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <div className="search-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search photographers by name, location, or specialty..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => onSearch("")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;