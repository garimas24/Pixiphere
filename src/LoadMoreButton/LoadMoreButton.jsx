import React from "react";
import "./LoadMoreButton.css";

const LoadMoreButton = ({ onClick, loading, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="load-more-container">
      <button className="load-more-btn" onClick={onClick} disabled={loading}>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            Loading...
          </div>
        ) : (
          "Load More Photographers"
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
