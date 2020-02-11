import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
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
