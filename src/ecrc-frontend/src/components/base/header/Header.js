/* eslint-disable no-alert */
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./Header.css";

export const goHome = (e, history) => {
  e.stopPropagation();
  e.preventDefault();

  if (
    history.location &&
    history.location.pathname &&
    history.location.pathname === "/criminalrecordcheck"
  ) {
    return false;
  }

  if (history.location.pathname === "/criminalrecordcheck/error") {
    sessionStorage.clear();
    history.push("/");
    return true;
  }

  const warningMessage =
    history.location.pathname === "/criminalrecordcheck/success"
      ? "Are you sure you would like to leave this page?"
      : "You are in the middle of completing your eCRC. If you leave, your changes will be lost. Are you sure you would like to leave?";
  const wishToRedirect = window.confirm(warningMessage);

  if (wishToRedirect) {
    sessionStorage.clear();
    history.push("/");
  }

  return true;
};

export default function Header({ header: { name } }) {
  const history = useHistory();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div
          className="container-fluid navbar-brand pointer"
          onClick={e => goHome(e, history)}
          role="button"
          onKeyDown={e => goHome(e, history)}
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
            onClick={e => goHome(e, history)}
            role="button"
            onKeyDown={e => goHome(e, history)}
            tabIndex={0}
          >
            {name}
          </div>
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
