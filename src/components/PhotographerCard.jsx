import React from "react";
import {Link} from "react-router-dom";
import "../style/PhotographerCard.css"

const PhotographerCard = ({ photographer }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>,
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ★
          </span>,
        );
      }
    }
    return stars;
  };

  return (
    <div className="photographer-card">
      <div className="card-image">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="profile-pic"
          loading="lazy"
        />
        {!photographer.availability && (
          <div className="unavailable-badge">Unavailable</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="photographer-name">{photographer.name}</h3>
          <div className="rating-section">
            <div className="stars">{renderStars(photographer.rating)}</div>
            <span className="rating-number">({photographer.rating})</span>
          </div>
        </div>

        <div className="location">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {photographer.location}
        </div>

        <div className="price-section">
          <span className="price-label">Starting price:</span>
          <span className="price">{formatPrice(photographer.price)}</span>
        </div>

        <div className="tags-section">
          {photographer.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          {photographer.tags.length > 3 && (
            <span className="tag more-tags">
              +{photographer.tags.length - 3}
            </span>
          )}
        </div>

        <div className="styles-section">
          <div className="styles">
            {photographer.styles.slice(0, 2).map((style, index) => (
              <span key={index} className="style-badge">
                {style}
              </span>
            ))}
            {photographer.styles.length > 2 && (
              <span className="style-badge more-styles">
                +{photographer.styles.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <Link
          to={`/photographer/${photographer.id}`}
          className="view-profile-btn"
        >
          View Profile
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </Link>
      </div>

      {/* Quick info overlay on hover */}
      <div className="quick-info-overlay">
        <div className="quick-info">
          <div className="experience">
            <strong>{photographer.experience} years</strong>
            <span>Experience</span>
          </div>
          <div className="response-time">
            <strong>{photographer.responseTime}</strong>
            <span>Response time</span>
          </div>
          <div className="total-shots">
            <strong>{photographer.totalShots}+</strong>
            <span>Photos delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerCard;
