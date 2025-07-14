import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-meta">
          <div className="skeleton-line skeleton-rating"></div>
          <div className="skeleton-line skeleton-location"></div>
        </div>
        <div className="skeleton-line skeleton-price"></div>
        <div className="skeleton-tags">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
        <div className="skeleton-styles">
          <div className="skeleton-tag skeleton-style"></div>
          <div className="skeleton-tag skeleton-style"></div>
        </div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="skeleton-list-item">
      <div className="skeleton-list-image"></div>
      <div className="skeleton-list-content">
        <div className="skeleton-list-header">
          <div className="skeleton-line skeleton-list-title"></div>
          <div className="skeleton-line skeleton-list-price"></div>
        </div>
        <div className="skeleton-list-meta">
          <div className="skeleton-line skeleton-list-rating"></div>
          <div className="skeleton-line skeleton-list-location"></div>
        </div>
        <div className="skeleton-line skeleton-list-description"></div>
        <div className="skeleton-list-tags">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
      </div>
    </div>
  );

  const renderFilterSkeleton = () => (
    <div className="skeleton-filter">
      <div className="skeleton-filter-section">
        <div className="skeleton-line skeleton-filter-title"></div>
        <div className="skeleton-filter-options">
          <div className="skeleton-line skeleton-filter-option"></div>
          <div className="skeleton-line skeleton-filter-option"></div>
          <div className="skeleton-line skeleton-filter-option"></div>
        </div>
      </div>
      <div className="skeleton-filter-section">
        <div className="skeleton-line skeleton-filter-title"></div>
        <div className="skeleton-range"></div>
      </div>
      <div className="skeleton-filter-section">
        <div className="skeleton-line skeleton-filter-title"></div>
        <div className="skeleton-filter-options">
          <div className="skeleton-line skeleton-filter-option"></div>
          <div className="skeleton-line skeleton-filter-option"></div>
        </div>
      </div>
    </div>
  );

  const renderSearchSkeleton = () => (
    <div className="skeleton-search">
      <div className="skeleton-search-bar"></div>
      <div className="skeleton-search-results">
        <div className="skeleton-line skeleton-results-count"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "list":
        return renderListSkeleton();
      case "filter":
        return renderFilterSkeleton();
      case "search":
        return renderSearchSkeleton();
      case "card":
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
