/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";

import "./SideCard.css";

export default function SideCard({
  sideCard: { heading, content, type, image, imageLink, isWide }
}) {
  let sideCardCss = "dashboard-spacing";
  if (isWide) sideCardCss = "wide-dashboard-spacing";

  return (
    <div className={sideCardCss} style={{ position: "relative" }}>
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
          {type === "contact" && (
            <section id="blue-section" className="submit-container">
              <h2 className="heading-style">{heading}</h2>
              <div className="submit-content">
                <div style={{ fontSize: "16px" }}>
                  For question about criminal record checks, contact the
                  Criminal Records Review Program Monday to Friday, 8:30 a.m. -
                  4:30 p.m.
                </div>
                <div style={{ paddingTop: "20px" }}>
                  <div>
                    <span className="contact-title">Fax: </span> 250 356-1889
                  </div>
                  <div>
                    <span className="contact-title">Office: </span>
                    Toll free - 1 855 587-0185 (press option 2)
                  </div>
                  <div>
                    <span className="contact-title">Email: </span>
                    criminalrecords@gov.bc.ca
                  </div>
                </div>
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
    imageLink: PropTypes.string,
    isWide: PropTypes.bool
  }).isRequired
};
