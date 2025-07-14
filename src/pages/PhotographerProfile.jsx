import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PhotographerProfile.css";

const PhotographerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });

    useEffect(() => {
    fetchPhotographer();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchPhotographer = async () => {
    try {
      const response = await fetch(`/photographers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPhotographer(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching photographer:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleInquiryChange = (e) => {
    setInquiry({
      ...inquiry,
      [e.target.name]: e.target.value,
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry submitted:", inquiry);
    setShowInquiryModal(false);
    setInquiry({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      message: "",
    });
    alert("Inquiry sent successfully! The photographer will contact you soon.");
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading photographer profile...</p>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="error-container">
        <h2>Photographer not found</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="photographer-profile">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-content">
          <div className="photographer-info">
            <img
              src={photographer.profilePic}
              alt={photographer.name}
              className="profile-picture"
            />
            <div className="basic-info">
              <h1>{photographer.name}</h1>
              <div className="location-rating">
                <span className="location">📍 {photographer.location}</span>
                <div className="rating">
                  <span className="stars">
                    {renderStars(photographer.rating)}
                  </span>
                  <span className="rating-value">
                    {photographer.rating} ({photographer.reviews.length}{" "}
                    reviews)
                  </span>
                </div>
              </div>
              <div className="price-info">
                <span className="starting-price">
                  Starting from ₹{photographer.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button
              className="inquiry-btn primary"
              onClick={() => setShowInquiryModal(true)}
            >
              Send Inquiry
            </button>
            <button className="contact-btn secondary">📞 Quick Call</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <div className="content-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* About Section */}
            <section className="about-section">
              <h2>About</h2>
              <p>{photographer.bio}</p>

              <div className="quick-stats">
                <div className="stat">
                  <div className="stat-value">{photographer.experience}+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{photographer.responseTime}</div>
                  <div className="stat-label">Response Time</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{photographer.totalShots}+</div>
                  <div className="stat-label">Photos Delivered</div>
                </div>
              </div>
            </section>

            {/* Specialties */}
            <section className="specialties-section">
              <h2>Specialties</h2>
              <div className="tags-container">
                <div className="styles">
                  <h3>Photography Styles</h3>
                  <div className="tags">
                    {photographer.styles.map((style, index) => (
                      <span key={index} className="tag style-tag">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="categories">
                  <h3>Event Categories</h3>
                  <div className="tags">
                    {photographer.tags.map((tag, index) => (
                      <span key={index} className="tag category-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews-section">
              <h2>Reviews & Testimonials</h2>
              <div className="reviews-overview">
                <div className="overall-rating">
                  <div className="rating-number">{photographer.rating}</div>
                  <div className="rating-stars">
                    {renderStars(photographer.rating)}
                  </div>
                  <div className="rating-count">
                    Based on {photographer.reviews.length} reviews
                  </div>
                </div>
              </div>

              <div className="reviews-list">
                {photographer.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <h4>{review.name}</h4>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="review-date">
                        {formatDate(review.date)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Portfolio Gallery */}
          <div className="right-column">
            <section className="portfolio-section">
              <h2>Portfolio</h2>

              {/* Main Image Display */}
              <div className="main-image-container">
                <img
                  src={photographer.portfolio[selectedImage]}
                  alt={`Portfolio ${selectedImage + 1}`}
                  className="main-portfolio-image"
                />
                <div className="image-counter">
                  {selectedImage + 1} / {photographer.portfolio.length}
                </div>

                {/* Navigation Arrows */}
                <button
                  className="nav-arrow prev"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === 0
                        ? photographer.portfolio.length - 1
                        : selectedImage - 1,
                    )
                  }
                >
                  ‹
                </button>
                <button
                  className="nav-arrow next"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === photographer.portfolio.length - 1
                        ? 0
                        : selectedImage + 1,
                    )
                  }
                >
                  ›
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="thumbnail-gallery">
                {photographer.portfolio.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Portfolio thumbnail ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowInquiryModal(false)}
        >
          <div className="inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send Inquiry to {photographer.name}</h2>
              <button
                className="close-modal"
                onClick={() => setShowInquiryModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={inquiry.name}
                    onChange={handleInquiryChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={inquiry.email}
                    onChange={handleInquiryChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={inquiry.phone}
                    onChange={handleInquiryChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={inquiry.eventDate}
                    onChange={handleInquiryChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="eventType"
                  value={inquiry.eventType}
                  onChange={handleInquiryChange}
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="maternity">Maternity</option>
                  <option value="newborn">Newborn</option>
                  <option value="birthday">Birthday</option>
                  <option value="family">Family Portrait</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={inquiry.message}
                  onChange={handleInquiryChange}
                  rows="4"
                  placeholder="Tell us about your event, specific requirements, location, etc."
                ></textarea>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerProfile;
