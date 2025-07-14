import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import PhotographerCard from "../components/PhotographerCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import "./CategoryListing.css"
import "../db.json"

const CategoryListing = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 25000],
    minRating: 0,
    selectedStyles: [],
    selectedCity: "",
    sortBy: "rating-high",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);


    useEffect(() => {
    fetch("/db")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setPhotographers(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);



  // Filter and sort photographers
  const filteredPhotographers = useMemo(() => {
    let filtered = [...photographers];

    // Apply search filter
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (photographer) =>
          photographer.name.toLowerCase().includes(query) ||
          photographer.location.toLowerCase().includes(query) ||
          photographer.bio.toLowerCase().includes(query) ||
          photographer.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          photographer.styles.some((style) =>
            style.toLowerCase().includes(query),
          ),
      );
    }

    // Apply filters
    filtered = filtered.filter((photographer) => {
      // Price range filter
      if (
        photographer.price < filters.priceRange[0] ||
        photographer.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (photographer.rating < filters.minRating) {
        return false;
      }

      // Styles filter
      if (
        filters.selectedStyles.length > 0 &&
        !filters.selectedStyles.some((style) =>
          photographer.styles.includes(style),
        )
      ) {
        return false;
      }

      // City filter
      if (filters.selectedCity && photographer.city !== filters.selectedCity) {
        return false;
      }

      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "recent":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [photographers, debouncedQuery, filters]);

  // Paginated photographers
  const paginatedPhotographers = useMemo(() => {
    return filteredPhotographers.slice(0, currentPage * itemsPerPage);
  }, [filteredPhotographers, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMore = paginatedPhotographers.length < filteredPhotographers.length;

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-listing">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Maternity Photographers in Bengaluru</h1>
          <p className="page-subtitle">
            Find the perfect photographer for your special moments
          </p>
        </div>

        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />

        <div className="content-wrapper">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            photographers={photographers}
          />

          <div className="main-content">
            <div className="content-header">
              <div className="results-info">
                <span className="results-count">
                  {filteredPhotographers.length} photographer
                  {filteredPhotographers.length !== 1 ? "s" : ""} found
                </span>
                <button
                  className="filter-toggle-btn mobile-only"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <span className="filter-icon">⚙️</span>
                  Filters
                </button>
              </div>
            </div>

            {loading ? (
              <SkeletonLoader count={8} />
            ) : (
              <>
                {paginatedPhotographers.length > 0 ? (
                  <>
                    <div className="photographers-grid">
                      {paginatedPhotographers.map((photographer) => (
                        <PhotographerCard
                          key={photographer.id}
                          photographer={photographer}
                        />
                      ))}
                    </div>

                    {hasMore && <LoadMoreButton onLoadMore={handleLoadMore} />}
                  </>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No photographers found</h3>
                    <p>
                      Try adjusting your search criteria or filters to find more
                      results.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {isFilterOpen && (
        <div
          className="filter-overlay mobile-only"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoryListing;
