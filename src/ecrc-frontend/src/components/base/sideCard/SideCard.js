import React from "react";
import PropTypes from "prop-types";

import "./SideCard.css";

export default function SideCard({
  sideCard: { heading, content, type, image, imageLink }
}) {
  return (
    <div className="dashboard-spacing" style={{ position: "relative" }}>
      <div className="row">
        <div
          className="col-12"
          style={{ position: "relative", paddingTop: "30px" }}
        >
          <p />
          {type === "notice" && (
            <section
              id="notice-section"
              className="submit-container"
              style={{
                backgroundColor: "#F2F2F2",
                color: "#000",
                border: "none"
              }}
            >
              <h2 style={{ color: "#000" }}>{heading}</h2>
              <div className="submit-content">
                <p>{content}</p>
              </div>
            </section>
          )}
          {type === "blue" && (
            <section id="blue-section" className="submit-container">
              <h2 className="heading-style">{heading}</h2>
              <div className="submit-content">
                <p>{content}</p>
                {image && (
                  <a href={imageLink}>
                    <img
                      src={image}
                      alt="imagelink"
                      height="65px"
                      width="310px"
                    />
                  </a>
                )}
              </div>
            </section>
          )}
          {type === "bluegrey" && (
            <section id="bluegrey-section" className="bluegrey-container">
              <div className="container-background bluegrey-heading">
                <h2 className="heading-style">{heading}</h2>
              </div>
              <div className="bluegrey-content">
                <p className="content-style">{content}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

SideCard.propTypes = {
  sideCard: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageLink: PropTypes.string
  }).isRequired
};
