import React from "react";
import "../style/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Get in touch with our team</p>
          </div>
          <div className="footer-section">
            <h3>Cities Covered</h3>
            <p>We serve photographers across India</p>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <p>Photography booking platform</p>
          </div>
          <div className="footer-section">
            <h3>Privacy</h3>
            <p>Your data is safe with us</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Pixisphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
