import React from "react";
import PropTypes from "prop-types";
import { useHistory, Prompt } from "react-router-dom";
import "./Header.css";

export default function Header({ header: { name } }) {
  const history = useHistory();

  const goHome = e => {
    e.stopPropagation();
    e.preventDefault();

    const wishToRedirect = window.confirm(
      "You are in the middle of completing your eCRC. If you leave, your changes will be lost. Are you sure you would like to leave?"
    );

    if (wishToRedirect) {
      sessionStorage.clear();
      history.push("/");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div
          className="container-fluid navbar-brand pointer"
          onClick={e => goHome(e)}
          role="button"
          onKeyDown={e => goHome(e)}
          tabIndex={0}
        >
          <img
            className="img-fluid d-none d-md-block"
            src="/criminalrecordcheck/images/bcid-logo-rev-en.svg"
            width="181"
            height="44"
            alt="B.C. Government Logo"
          />
          <img
            className="img-fluid d-md-none"
            src="/criminalrecordcheck/images/bcid-symbol-rev.svg"
            width="64"
            height="44"
            alt="B.C. Government Logo"
          />
          <div
            className="pointer navbar-brand nav-item nav-link"
            onClick={e => goHome(e)}
            role="button"
            onKeyDown={e => goHome(e)}
            tabIndex={0}
          >
            {name}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup" />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};
