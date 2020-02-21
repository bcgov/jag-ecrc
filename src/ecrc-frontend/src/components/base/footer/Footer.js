import React from "react";

export default function Footer({ isSmallPage }) {
  // used for pages with less content to keep footer attached to bottom of screen
  let customStyling = {};

  if (isSmallPage) {
    customStyling.position = "fixed";
    customStyling.left = 0;
    customStyling.bottom = 0;
    customStyling.width = "100%";
    customStyling.textAlign = "center";
  }

  return (
    <footer className="footer" style={customStyling}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www2.gov.bc.ca/gov/content/home/disclaimer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Disclaimer
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www2.gov.bc.ca/gov/content/home/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www2.gov.bc.ca/gov/content/home/accessibility"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accessibility
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www2.gov.bc.ca/gov/content/home/copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copyright
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www2.gov.bc.ca/gov/content/home/contact-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
