import React, { useMemo } from "react";
import "../style/FilterSidebar.css"

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  photographers,
}) => {
  // Extract unique values from photographers data
  const { cities, styles } = useMemo(() => {
    const uniqueCities = [
      ...new Set(photographers.map((p) => p.city).filter(Boolean)),
    ].sort();
    const uniqueStyles = [
      ...new Set(photographers.flatMap((p) => p.styles).filter(Boolean)),
    ].sort();

    return {
      cities: uniqueCities,
      styles: uniqueStyles,
    };
  }, [photographers]);

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange({ priceRange: newRange });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ minRating: rating });
  };

  const handleStyleChange = (style) => {
    const newStyles = filters.selectedStyles.includes(style)
      ? filters.selectedStyles.filter((s) => s !== style)
      : [...filters.selectedStyles, style];
    onFilterChange({ selectedStyles: newStyles });
  };

  const handleCityChange = (city) => {
    onFilterChange({ selectedCity: city });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ sortBy });
  };

  const resetFilters = () => {
    onFilterChange({
      priceRange: [0, 25000],
      minRating: 0,
      selectedStyles: [],
      selectedCity: "",
      sortBy: "rating-high",
    });
  };

  return (
    <>
      <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
        <div className="filter-header">
          <h3>Filter</h3>
          <button className="close-filter mobile-only" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="filter-content">
          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Price</h4>
            <div className="price-inputs">
              <div className="price-input-group">
                <label>Min</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  min="0"
                  max="50000"
                  step="1000"
                />
              </div>
              <div className="price-input-group">
                <label>Max</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  min="0"
                  max="50000"
                  step="1000"
                />
              </div>
            </div>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="25000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="price-slider"
              />
              <input
                type="range"
                min="0"
                max="25000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="price-slider"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Ratings</h4>
            <div className="rating-options">
              {[4, 3, 2, 1, 0].map((rating) => (
                <label key={rating} className="rating-option">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <span className="rating-label">
                    {rating > 0 ? `${rating}+ Stars` : "All Ratings"}
                  </span>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= rating ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Styles Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Styles</h4>
            <div className="checkbox-group">
              {styles.map((style) => (
                <label key={style} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedStyles.includes(style)}
                    onChange={() => handleStyleChange(style)}
                  />
                  <span className="checkbox-label">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="filter-section">
            <h4 className="filter-title">City</h4>
            <select
              value={filters.selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="city-select"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="filter-section">
            <h4 className="filter-title">Sorting</h4>
            <div className="sort-options">
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "price-low"}
                  onChange={() => handleSortChange("price-low")}
                />
                <span>Price: Low to High</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "price-high"}
                  onChange={() => handleSortChange("price-high")}
                />
                <span>Price: High to Low</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "rating-high"}
                  onChange={() => handleSortChange("rating-high")}
                />
                <span>Rating: High to Low</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "rating-low"}
                  onChange={() => handleSortChange("rating-low")}
                />
                <span>Rating: Low to High</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "recent"}
                  onChange={() => handleSortChange("recent")}
                />
                <span>Recently Added</span>
              </label>
            </div>
          </div>

          {/* Reset Filters */}
          <div className="filter-actions">
            <button className="reset-filters-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
