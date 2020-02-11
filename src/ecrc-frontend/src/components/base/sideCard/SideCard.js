import React from "react";

import "./SideCard.css";

export default function SideCard({ sideCard: { heading, content } }) {
  return (
    <div className="dashboard-spacing" style={{ position: "relative" }}>
      <div className="row">
        <div
          className="col-lg-4 col-sm-12"
          style={{ position: "relative", paddingTop: "30px" }}
        >
          <p></p>
          <section className="submit-container">
            <h2 style={{ paddingLeft: "10px" }}>{heading}</h2>
            <div className="submit-content">
              <p>{content}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
